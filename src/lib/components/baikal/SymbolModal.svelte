<script>
import pullDirection from '$lib/utils/attachments/pull-direction.js';
  let {
    symbols, 
    currentIndex,
    close,
  } = $props();



  let totalLength = symbols.length;
  let activeIndex = $state(currentIndex);
  let symbol = $derived(symbols[activeIndex]);
  let direction = $state('next');

  function next() {
    activeIndex = (activeIndex + 1) % totalLength;
    direction = 'next';
  }

  function prev() {
    activeIndex = (totalLength + (activeIndex - 1)) % totalLength;
    direction = 'prev';
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  }


  function pullHandle({dx, dy, direction, event}) {
    if (direction === 'left') 
    next();
    
    else if (direction === 'right') 
    prev();
    
  }
</script>


<svelte:window onkeydown={handleKeydown} />

<div class="modal-wrapper">
<div class="modal-backdrop" role="presentation" onclick={close}>
</div>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="symbol-modal-title"
  >
    <button class="close-button" type="button" aria-label="Закрыть окно" onclick={close}>
      ×
    </button>

    <button
      class="nav-button nav-button--prev"
      type="button"
      aria-label="Предыдущий символ"
      onclick={prev}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M30 10L16 24L30 38" />
      </svg>
    </button>

    <button
      class="nav-button nav-button--next"
      type="button"
      aria-label="Следующий символ"
      onclick={next}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M18 10L32 24L18 38" />
      </svg>
    </button>

    {#key activeIndex}
      <div class={`modal-stage modal-stage--${direction}`}>
        <div class="modal-image" {@attach pullDirection(pullHandle, {threshold: 15})}>
          <img
            src={symbol.image}
            alt={`${symbol.title} — символ игры Добрый Доббль Байкал`}
            loading="eager"
            decoding="async"
            width="520"
            height="520"
          />
        </div>

        <div class="modal-content">
          <div class="modal-topline">
            <span class="badge">Символ № {symbol.id}</span>
            <span class="counter">{activeIndex + 1} / {totalLength}</span>
          </div>

          <h2 id="symbol-modal-title">{symbol.title}</h2>

          <p>
            {symbol.fullDescription || symbol.description}
          </p>

        </div>
      </div>
    {/key}
  </div>
</div>

<style>
.modal-wrapper {
    position: fixed;
    display: flex;
    inset: 0;
    z-index: 100;
    padding: 1rem;
}
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(30, 27, 24, 0.56);
    backdrop-filter: blur(6px);
  }

  .modal {
    margin: auto;
    align-self: center;
    position: relative;
    width: min(100%, 920px);
    max-height: min(760px, calc(100vh - 2rem));
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--card);
    box-shadow: var(--shadow-floating);
    touch-action: pan-y;
  }

  .modal-stage {
    display: grid;
    grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1fr);
    max-height: min(760px, calc(100vh - 2rem));
    overflow: auto;
    will-change: transform, opacity;
    overscroll-behavior: contain;
  }

  .modal-stage--next {
    animation: card-next 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .modal-stage--prev {
    animation: card-prev 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes card-next {
    from {
      opacity: 0;
      transform: translateX(34px) scale(0.985);
    }

    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes card-prev {
    from {
      opacity: 0;
      transform: translateX(-34px) scale(0.985);
    }

    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  .close-button {
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    z-index: 4;
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 50%;
    color: var(--fg);
    background: rgba(255, 255, 255, 0.5);
    font-size: 1.7rem;
    line-height: 1;
    box-shadow: 0 12px 28px rgba(30, 27, 24, 0.14);
    cursor: pointer;

  }

  .close-button:hover,
  .close-button:focus-visible {
    color: #fff;
    background: var(--accent);
  }

  .nav-button {
    position: absolute;
    top: 50%;
    z-index: 4;
    width: 42px;
    height: 42px;
    padding: 0;
    border: 0;
    color: #000;
    background: transparent;
    opacity: 0.05;
    cursor: pointer;
    transform: translateY(-50%);
  }

  .nav-button svg {
    width: 100%;
    height: 100%;
    overflow: visible;
 
  }

  .nav-button path {
    fill: none;
    stroke: currentColor;
    stroke-width: 4.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .nav-button--prev {
    left: 1rem;
  }

  .nav-button--next {
    right: 1rem;
  }

  .nav-button:hover,
  .nav-button:focus-visible {
    opacity: .2;
  }


  .modal-image {
    min-height: 420px;
    padding: 1.5rem;
    background:
      radial-gradient(circle at 32% 24%, rgba(207, 232, 247, 0.95), transparent 9rem),
      radial-gradient(circle at 70% 68%, rgba(241, 216, 183, 0.95), transparent 10rem),
      var(--bg-alt);
  }

  .modal-image img {
    width: min(100%, 340px);
    max-height: 380px;
    object-fit: contain;
    filter: drop-shadow(0 18px 28px rgba(45, 42, 38, 0.12));
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
    margin: auto;
  }

  .modal-content {
    display: grid;
    align-content: center;
    gap: 1.1rem;
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  .modal-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .counter {
    color: var(--fg-muted);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3.25rem);
  }

  p {
    color: var(--fg-muted);
    font-size: var(--font-size-lg);
  }

  @media (max-width: 760px) {
    .modal-stage {
      grid-template-columns: 1fr;
    }

    .modal-image {
      min-height: 280px;
      padding-top: 4rem;
    }

    .modal-image img {
      max-height: 240px;
    }

    .nav-button {
      top: 190px;
      width: 38px;
      height: 58px;
    }

    .nav-button path {
      stroke-width: 4;
    }

    .mobile-hint {
      display: block;
    }
  }

  @media (max-width: 460px) {
    .modal-backdrop {
      padding: 0.65rem;
    }

    .modal {
      max-height: calc(100vh - 1.3rem);
      border-radius: var(--radius-lg);
    }

    .modal-stage {
      max-height: calc(100vh - 1.3rem);
    }

    .modal-content {
      padding: 1.25rem;
    }

    .nav-button {
      width: 34px;
      height: 52px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modal-stage--next,
    .modal-stage--prev {
      animation: none;
    }

    .close-button,
    .nav-button {
      transition: none;
    }

    .close-button:hover,
    .close-button:focus-visible {
      transform: none;
    }

    .nav-button,
    .nav-button:active {
      transform: translateY(-50%);
    }
  }
</style>