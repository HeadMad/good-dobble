<script>
  let { symbol, onOpen } = $props();
</script>

<article class="symbol-card">
  <button
    class="symbol-button"
    type="button"
    aria-label={`Открыть описание символа ${symbol.title}`}
    onclick={onOpen}
  >
    <div class="symbol-image">
      <img
        src={symbol.image}
        alt={`${symbol.title} — символ игры Добрый Доббль Байкал`}
        loading="lazy"
        decoding="async"
        width="320"
        height="220"
      />
    </div>

    <div class="symbol-body">
      <span class="symbol-number">№ {symbol.id}</span>
      <h3>{symbol.title}</h3>
      <p>{symbol.description}</p>
    </div>
  </button>
</article>

<style>
  .symbol-card {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--card);
    box-shadow: var(--shadow);
    transition:
      transform var(--transition-fast),
      box-shadow var(--transition-fast),
      border-color var(--transition-fast);

    /*
      Оптимизация: браузер не будет тратить много ресурсов
      на отрисовку карточек далеко за пределами экрана.
    */
    content-visibility: auto;
    contain-intrinsic-size: 340px;
  }

  .symbol-card:hover {
    border-color: rgba(229, 71, 23, 0.35);
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
  }

  .symbol-button {
    display: grid;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  .symbol-image {
    display: grid;
    min-height: 168px;
    place-items: center;
    border-bottom: 1px solid var(--border);
    background:
      radial-gradient(circle at 30% 20%, rgba(207, 232, 247, 0.9), transparent 7rem),
      radial-gradient(circle at 72% 60%, rgba(241, 216, 183, 0.9), transparent 8rem),
      var(--bg);
  }

  .symbol-image img {
    width: 100%;
    height: 168px;
    object-fit: contain;
    padding: 1rem;
    transition: transform var(--transition-base);
  }

  .symbol-card:hover .symbol-image img {
    transform: scale(1.04) rotate(-1deg);
  }

  .symbol-body {
    display: grid;
    gap: 0.55rem;
    padding: 1rem;
  }

  .symbol-number {
    color: var(--accent);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
  }

  h3 {
    font-size: 1rem;
    letter-spacing: -0.04em;
  }

  p {
    display: -webkit-box;
    overflow: hidden;
    color: var(--fg-muted);
    font-size: var(--font-size-sm);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .open-hint {
    margin-top: 0.25rem;
    color: var(--accent-dark);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
  }

  @media (prefers-reduced-motion: reduce) {
    .symbol-card,
    .symbol-image img {
      transition: none;
    }

    .symbol-card:hover,
    .symbol-card:hover .symbol-image img {
      transform: none;
    }
  }
</style>