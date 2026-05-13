<svelte:head>
  <title>Good Dobble — тематические игры доббль</title>
  <meta
    name="description"
    content="Good Dobble — тематические игры доббль для семьи, детей, школ, путешествий и событий."
  />
  <link rel="canonical" href="https://good-dobble.ru/" />
</svelte:head>

<section class="home">
  <div class="container home-inner">
    <span class="badge">Good Dobble</span>
    <h1>Тематические игры доббль</h1>
    <p>
      Собираем серии игр с понятными правилами, красивыми символами и образовательной ценностью.
      Первая игра — «Добрый Доббль “Байкал”».
    </p>
    <a class="btn" href="/baikal">Открыть игру «Байкал»</a>
  </div>
</section>

<style>
  .home {
    display: grid;
    min-height: calc(100vh - var(--header-height));
    place-items: center;
    padding: 5rem 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(207, 232, 247, 0.95), transparent 26rem),
      radial-gradient(circle at 80% 70%, rgba(241, 216, 183, 0.9), transparent 26rem),
      var(--bg);
  }

  .home-inner {
    display: grid;
    max-width: 820px;
    gap: 1.25rem;
    text-align: center;
    justify-items: center;
  }

  h1 {
    font-size: var(--font-size-4xl);
  }

  p {
    color: var(--fg-muted);
    font-size: var(--font-size-lg);
  }
</style>