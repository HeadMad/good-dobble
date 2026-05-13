<script>
  let hidden = $state(false);
  let scrolled = $state(false);

  let lastScrollY = 0;
  let ticking = false;

  function updateHeaderState() {
    const currentScrollY = window.scrollY || 0;
    const delta = currentScrollY - lastScrollY;

    scrolled = currentScrollY > 8;

    if (Math.abs(delta) > 8) {
      hidden = currentScrollY > 120 && delta > 0;
      lastScrollY = currentScrollY;
    }

    ticking = false;
  }

  function handleScroll() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateHeaderState);
  }

  $effect(() => {
    lastScrollY = window.scrollY || 0;

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header class="site-header" class:hidden class:scrolled>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="Good Dobble — на главную">
      <span class="brand-mark">✺</span>
      <span class="brand-text">
        <strong>Good Dobble</strong>
        <small>тематические игры</small>
      </span>
    </a>

    <nav class="nav" aria-label="Основная навигация">
      <a href="/baikal">Карточки</a>
      <a href="/baikal#symbols">Символы</a>
      <a href="/baikal/rools">Правила</a>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: var(--z-header);
    padding: 0.65rem 0;
    background: rgba(253, 248, 244, 0.72);
    border-bottom: 1px solid rgba(232, 223, 213, 0.52);
    backdrop-filter: blur(18px);
    transform: translateY(0);
    transition:
      transform 220ms ease,
      background 220ms ease,
      box-shadow 220ms ease,
      border-color 220ms ease;
  }

  .site-header.hidden {
    transform: translateY(-110%);
  }

  .site-header.scrolled {
    background: rgba(253, 248, 244, 0.9);
    border-color: rgba(232, 223, 213, 0.82);
    box-shadow: 0 14px 34px rgba(45, 42, 38, 0.08);
  }

  .header-inner {
    display: flex;
    min-height: 58px;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.35rem 0.5rem 0.35rem 0.35rem;
    border-radius: 999px;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast);
  }

  .brand:hover {
    background: rgba(255, 255, 255, 0.62);
    transform: translateY(-1px);
  }

  .brand-mark {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    background:
      radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.32), transparent 32%),
      linear-gradient(135deg, var(--accent), var(--accent-light));
    box-shadow: 0 12px 28px var(--accent-glow);
    font-size: 1.3rem;
  }

  .brand-text {
    display: grid;
    line-height: 1.05;
  }

  .brand strong {
    font-family: var(--font-family-heading);
    letter-spacing: -0.05em;
  }

  .brand small {
    color: var(--fg-muted);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem;
    border: 1px solid rgba(232, 223, 213, 0.78);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.58);
    box-shadow: 0 12px 32px rgba(45, 42, 38, 0.06);
  }

  .nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 0 0.9rem;
    border-radius: 999px;
    color: var(--fg-muted);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    white-space: nowrap;
    transition:
      color var(--transition-fast),
      background var(--transition-fast),
      transform var(--transition-fast);
  }

  .nav a:hover {
    color: var(--accent-dark);
    background: rgba(229, 71, 23, 0.09);
    transform: translateY(-1px);
  }

  @media (max-width: 720px) {
    .site-header {
      padding: 0.5rem 0;
    }

    .header-inner {
      min-height: auto;
      align-items: stretch;
      flex-direction: column;
      gap: 0.55rem;
    }

    .brand {
      align-self: flex-start;
    }

    .nav {
      width: 100%;
      justify-content: space-between;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .nav::-webkit-scrollbar {
      display: none;
    }

    .nav a {
      flex: 1 0 auto;
      padding: 0 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .site-header,
    .brand,
    .nav a {
      transition: none;
    }

    .brand:hover,
    .nav a:hover {
      transform: none;
    }
  }
</style>