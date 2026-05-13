<script>
 import { stickyDock } from '$lib/utils/attachments/sticky-dock.js';
  let { active = 'symbols' } = $props();
</script>

<section
  class="baikal-switcher-wrap"
  aria-label="Навигация по разделу Байкал" 
  {@attach stickyDock({ offset: 16})}
>
  <div class="container">
    <nav class="baikal-switcher">
      <a class:active={active === 'symbols'} href="/baikal">
        Символы
      </a>

      <a class:active={active === 'rules'} href="/baikal/rools">
        Правила
      </a>
    </nav>
  </div>
</section>

<style>
  .baikal-switcher-wrap {
    position: relative;
    margin-top: -1.5rem;
    padding-bottom: clamp(1.5rem, 4vw, 2.5rem);
    transition: top 0.2s ease, bottom 0.2s ease;
	z-index: 10;
  }

  .baikal-switcher {
    display: flex;
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    padding: 0.35rem;
    border: 1px solid rgba(232, 223, 213, 0.82);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 18px 42px rgba(45, 42, 38, 0.12);
    backdrop-filter: blur(16px);
  }

  .baikal-switcher a {
    display: inline-flex;
    min-width: 132px;
    min-height: 42px;
    align-items: center;
    justify-content: center;
    padding: 0 1.2rem;
    border-radius: 999px;
    color: var(--fg-muted);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    white-space: nowrap;
    transition:
      color var(--transition-fast),
      background var(--transition-fast),
      box-shadow var(--transition-fast),
      transform var(--transition-fast);
  }

  .baikal-switcher a:hover {
    color: var(--accent-dark);
    background: rgba(229, 71, 23, 0.08);
  }

  .baikal-switcher a.active {
    color: #fff;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    box-shadow: 0 12px 28px var(--accent-glow);
  }

  .baikal-switcher a.active:hover {
    color: #fff;
    transform: translateY(-1px);
  }

  @media (max-width: 520px) {
    .baikal-switcher-wrap {
      margin-top: -1.25rem;
    }

    .baikal-switcher {
      width: 100%;
    }

    .baikal-switcher a {
      flex: 1;
      min-width: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .baikal-switcher a {
      transition: none;
    }

    .baikal-switcher a.active:hover {
      transform: none;
    }
  }
</style>