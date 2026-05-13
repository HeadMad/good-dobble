<script>
  let {
    backgroundImage,
    title = 'Добрый Доббль',
    titleImage = '/images/baikal/title-baikal.webp',
  } = $props();
</script>

<section class="hero" aria-labelledby="hero-title" style="background-image: url({backgroundImage})">
  <div class="hero-overlay"></div>
  <div style="flex-grow: 1"></div>
  

  <img class="hero-title-image" src={titleImage} alt="Байкал">


<h1 id="hero-title" class="hero-title">
  {title}
  <span class="sr-only">Байкал</span>
</h1>

<div style="height: max(2.5rem, 8vw)"></div>
</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    display: flex;
    background-size: cover;
    flex-direction: column;
    aspect-ratio: 1920 / 1080;
    align-items: center;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.20);
    pointer-events: none;
  }


  .hero-title {
    position: relative;
    margin: auto;
    color: #fff;
    font-family: var(--font-family-heading);
    font-size: 4vw;
    font-weight: var(--font-weight-bold);
    line-height: 0.92;
    letter-spacing: -0.075em;
    text-shadow: 0 18px 48px rgba(0, 0, 0, 0.38);
  }



  .hero-title-image {
    position: relative;
    width: min(50vw, 600px);
  }


  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }

  @media (max-width: 640px) {

    .hero-title {
      font-size: 1.3rem;
    }

    .hero-title-image {
      width: max(55vw, 200px);
    }
  }
</style>