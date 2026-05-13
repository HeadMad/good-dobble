import { NodeSSH } from 'node-ssh';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs/promises';

const ssh = new NodeSSH();

// Корень проекта.
// Важно запускать скрипт из корня проекта.
const projectRoot = process.cwd();

const config = {
    host: process.env.VDS_HOST,
    username: process.env.VDS_USER,
    password: process.env.VDS_PASSWORD,
    remotePath: process.env.VDS_PATH,
};

// Файлы и папки указываются от корня проекта
const uploadItems = [
    {
        from: 'build',
        to: '.',
    },

    // Примеры:
    // {
    //     from: 'static/robots.txt',
    //     to: 'robots.txt',
    // },
    // {
    //     from: 'static/images',
    //     to: 'images',
    // },
];

// Удалять старую версию файла/папки перед загрузкой
const cleanBeforeUpload = true;

function escapeShellArg(arg) {
    return `'${String(arg).replace(/'/g, `'\\''`)}'`;
}

function toRemotePath(...parts) {
    return path.posix.join(...parts);
}

async function pathExists(localPath) {
    try {
        await fs.access(localPath);
        return true;
    } catch {
        return false;
    }
}

function normalizeUploadItem(item) {
    if (typeof item === 'string') {
        return {
            from: item,
            to: item,
        };
    }

    return item;
}

async function uploadFile(localPath, remotePath) {
    const remoteDir = path.posix.dirname(remotePath);

    await ssh.execCommand(`mkdir -p ${escapeShellArg(remoteDir)}`);
    await ssh.putFile(localPath, remotePath);

    console.log(`✅ Загружен файл: ${remotePath}`);
}

async function uploadDirectory(localPath, remotePath) {
    await ssh.execCommand(`mkdir -p ${escapeShellArg(remotePath)}`);

    const success = await ssh.putDirectory(localPath, remotePath, {
        recursive: true,
        concurrency: 10,

        tick(localFilePath, remoteFilePath, error) {
            if (error) {
                console.error(`❌ Ошибка загрузки: ${localFilePath}`);
                return;
            }

            console.log(`✅ Загружено: ${remoteFilePath}`);
        },
    });

    if (!success) {
        throw new Error(`Не удалось загрузить папку: ${localPath}`);
    }
}

async function deploy() {
    console.log('🚀 Начинаем деплой...');

    if (!config.host) {
        console.error('❌ Ошибка: Не указан VDS_HOST');
        process.exit(1);
    }

    if (!config.username) {
        console.error('❌ Ошибка: Не указан VDS_USER');
        process.exit(1);
    }

    if (!config.password) {
        console.error('❌ Ошибка: Не указан VDS_PASSWORD');
        process.exit(1);
    }

    if (!config.remotePath) {
        console.error('❌ Ошибка: Не указан VDS_PATH');
        process.exit(1);
    }

    console.log('🛠 Собираем проект...');
    try {
        execSync('pnpm run build', { stdio: 'inherit' });
    } catch {
        console.error('❌ Ошибка сборки');
        process.exit(1);
    }

    console.log('🔌 Подключаемся к VDS...');
    await ssh.connect({
        host: config.host,
        username: config.username,
        password: config.password,
        tryKeyboard: true,
    });

    console.log('📁 Проверяем папку на сервере...');
    await ssh.execCommand(`mkdir -p ${escapeShellArg(config.remotePath)}`);

    console.log('📦 Начинаем загрузку файлов...');

    for (const rawItem of uploadItems) {
        const item = normalizeUploadItem(rawItem);

        if (!item.from || !item.to) {
            console.warn('⚠️ Пропущен некорректный элемент:', item);
            continue;
        }

        const localItemPath = path.resolve(projectRoot, item.from);
        const remoteItemPath = toRemotePath(config.remotePath, item.to);

        const exists = await pathExists(localItemPath);

        if (!exists) {
            console.warn(`⚠️ Пропущено, не найдено: ${item.from}`);
            continue;
        }

        const stat = await fs.stat(localItemPath);

        if (cleanBeforeUpload) {
            console.log(`🧹 Удаляем старую версию: ${remoteItemPath}`);
            await ssh.execCommand(`rm -rf ${escapeShellArg(remoteItemPath)}`);
        }

        if (stat.isDirectory()) {
            console.log(`📁 Загружаем папку: ${item.from} → ${remoteItemPath}`);
            await uploadDirectory(localItemPath, remoteItemPath);
        } else if (stat.isFile()) {
            console.log(`📄 Загружаем файл: ${item.from} → ${remoteItemPath}`);
            await uploadFile(localItemPath, remoteItemPath);
        } else {
            console.warn(`⚠️ Пропущено, не файл и не папка: ${item.from}`);
        }
    }

    console.log('✅ Деплой успешно завершен!');

    ssh.dispose();
}

deploy().catch(err => {
    console.error('❌ Ошибка:', err);
    ssh.dispose();
    process.exit(1);
});