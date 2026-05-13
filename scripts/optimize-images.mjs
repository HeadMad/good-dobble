import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".tiff",
  ".tif",
]);

const DEFAULT_OPTIONS = {
  dir: "public/images",
  outDir: null,
  width: null,
  height: null,
  quality: 80,
  recursive: false,
  removeOriginal: false,
};

function parseBoolean(value) {
  if (value === undefined) {
    return true;
  }

  return value === "true" || value === "1" || value === "yes";
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = { ...DEFAULT_OPTIONS };

  for (const arg of args) {
    const normalizedArg = arg.replace(/^--/, "");
    const [key, value] = normalizedArg.split("=");

    if (key === "dir") {
      options.dir = value;
    }

    if (key === "out-dir" || key === "outDir") {
      options.outDir = value;
    }

    if (key === "width") {
      options.width = Number(value);
    }

    if (key === "height") {
      options.height = Number(value);
    }

    if (key === "quality") {
      options.quality = Number(value);
    }

    if (key === "recursive") {
      options.recursive = parseBoolean(value);
    }

    if (key === "remove-original" || key === "removeOriginal") {
      options.removeOriginal = parseBoolean(value);
    }
  }

  if (!options.dir) {
    throw new Error("Не указан путь до папки. Используй --dir=public/images");
  }

  if (options.width !== null && (!Number.isFinite(options.width) || options.width <= 0)) {
    throw new Error("width должен быть положительным числом");
  }

  if (options.height !== null && (!Number.isFinite(options.height) || options.height <= 0)) {
    throw new Error("height должен быть положительным числом");
  }

  if (!Number.isFinite(options.quality) || options.quality <= 0 || options.quality > 100) {
    throw new Error("quality должен быть числом от 1 до 100");
  }

  return options;
}

async function getImageFiles(dir, recursive = false) {
  const result = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (recursive) {
        const nestedFiles = await getImageFiles(fullPath, recursive);
        result.push(...nestedFiles);
      }

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (SUPPORTED_EXTENSIONS.has(ext)) {
      result.push(fullPath);
    }
  }

  return result;
}

function getResizeOptions(metadata, targetWidth, targetHeight) {
  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  if (!originalWidth || !originalHeight) {
    return null;
  }

  /**
   * Если размеры не заданы — не меняем размер.
   * Итоговый .webp будет с оригинальной шириной и высотой.
   */
  if (!targetWidth && !targetHeight) {
    return null;
  }

  /**
   * Если задан только width,
   * height будет рассчитан пропорционально.
   */
  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      withoutEnlargement: true,
    };
  }

  /**
   * Если задан только height,
   * width будет рассчитан пропорционально.
   */
  if (!targetWidth && targetHeight) {
    return {
      height: targetHeight,
      withoutEnlargement: true,
    };
  }

  /**
   * Если заданы оба размера:
   * изображение вписывается в рамки width x height.
   *
   * Пропорции сохраняются.
   * За указанные размеры изображение не выйдет.
   * Приоритет у меньшего масштаба.
   */
  return {
    width: targetWidth,
    height: targetHeight,
    fit: "inside",
    withoutEnlargement: true,
  };
}

function getOutputPath(filePath, inputDir, options) {
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);

  /**
   * Если outDir не задан,
   * сохраняем результат рядом с исходным файлом.
   */
  if (!options.outDir) {
    return path.join(path.dirname(filePath), `${baseName}.webp`);
  }

  const relativePath = path.relative(inputDir, filePath);
  const relativeDir = path.dirname(relativePath);

  /**
   * Если включена рекурсия и задан outDir,
   * сохраняем структуру вложенных папок.
   *
   * Например:
   * input:  src/images/catalog/photo.jpg
   * outDir: dist/images
   * output: dist/images/catalog/photo.webp
   */
  if (options.recursive) {
    return path.join(options.outDir, relativeDir, `${baseName}.webp`);
  }

  /**
   * Если рекурсия выключена,
   * все результаты складываются прямо в outDir.
   */
  return path.join(options.outDir, `${baseName}.webp`);
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimizeImage(filePath, inputDir, options) {
  const ext = path.extname(filePath).toLowerCase();

  const outputPath = getOutputPath(filePath, inputDir, options);
  const outputDir = path.dirname(outputPath);

  await fs.mkdir(outputDir, { recursive: true });

  const image = sharp(filePath, {
    animated: true,
  });

  const metadata = await image.metadata();
  const resizeOptions = getResizeOptions(metadata, options.width, options.height);

  let pipeline = image.rotate();

  if (resizeOptions) {
    pipeline = pipeline.resize(resizeOptions);
  }

  /**
   * Если входной и выходной файл совпадают,
   * нельзя писать напрямую в тот же файл.
   * Поэтому используем временный файл.
   */
  const isSameFile = path.resolve(filePath) === path.resolve(outputPath);
  const tempOutputPath = path.join(
    outputDir,
    `${path.basename(outputPath, ".webp")}.tmp.webp`,
  );

  const targetPath = isSameFile ? tempOutputPath : outputPath;

  await pipeline
    .webp({
      quality: options.quality,
      effort: 6,
    })
    .toFile(targetPath);

  if (isSameFile) {
    await fs.rename(tempOutputPath, outputPath);
  }

  /**
   * Удаляем оригинал только если:
   * - включена опция removeOriginal;
   * - исходник не совпадает с результатом.
   */
  if (options.removeOriginal && !isSameFile) {
    const outputExists = await pathExists(outputPath);

    if (outputExists) {
      await fs.unlink(filePath);
    }
  }

  return {
    input: filePath,
    output: outputPath,
  };
}

async function main() {
  const options = parseArgs();

  const absoluteInputDir = path.resolve(process.cwd(), options.dir);
  const absoluteOutDir = options.outDir
    ? path.resolve(process.cwd(), options.outDir)
    : null;

  const normalizedOptions = {
    ...options,
    dir: absoluteInputDir,
    outDir: absoluteOutDir,
  };

  console.log("Оптимизация изображений");
  console.log("-----------------------");
  console.log(`Папка с исходниками: ${absoluteInputDir}`);
  console.log(`Папка результата: ${absoluteOutDir ?? "рядом с исходными файлами"}`);
  console.log(`Рекурсивно: ${normalizedOptions.recursive ? "да" : "нет"}`);
  console.log(`Width: ${normalizedOptions.width ?? "не задан"}`);
  console.log(`Height: ${normalizedOptions.height ?? "не задан"}`);
  console.log(`Quality: ${normalizedOptions.quality}`);
  console.log(`Удалять оригиналы: ${normalizedOptions.removeOriginal ? "да" : "нет"}`);
  console.log("");

  const files = await getImageFiles(absoluteInputDir, normalizedOptions.recursive);

  if (files.length === 0) {
    console.log("Изображения не найдены");
    return;
  }

  console.log(`Найдено изображений: ${files.length}`);
  console.log("");

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const result = await optimizeImage(file, absoluteInputDir, normalizedOptions);

      successCount += 1;

      console.log(
        `Готово: ${path.relative(process.cwd(), result.input)} -> ${path.relative(
          process.cwd(),
          result.output,
        )}`,
      );
    } catch (error) {
      errorCount += 1;

      console.error(`Ошибка: ${path.relative(process.cwd(), file)}`);
      console.error(error.message);
    }
  }

  console.log("");
  console.log("Результат");
  console.log("---------");
  console.log(`Успешно: ${successCount}`);
  console.log(`Ошибок: ${errorCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});