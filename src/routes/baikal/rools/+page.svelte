<script>
  import GameHero from '$lib/components/baikal/GameHero.svelte';
  import RulesSection from '$lib/components/baikal/RulesSection.svelte';
  import BaikalSwitcher from '$lib/components/baikal/BaikalSwitcher.svelte';

  let { data } = $props();

  const page = data.page;

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: page.url,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Good Dobble',
        url: 'https://good-dobble.ru/'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `Как играть в ${page.gameTitle}`,
      description: page.description,
      step: page.rules.map((rule, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: rule.title,
        text: rule.text
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Good Dobble',
          item: 'https://good-dobble.ru/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.gameTitle,
          item: page.gameUrl
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Правила игры',
          item: page.url
        }
      ]
    }
  ]);
</script>

<svelte:head>
  <title>{page.title} | Good Dobble</title>
  <meta name="description" content={page.description} />
  <meta name="keywords" content={page.keywords.join(', ')} />
  <link rel="canonical" href={page.url} />

  <meta property="og:type" content="article" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:site_name" content="Good Dobble" />
  <meta property="og:title" content={page.title} />
  <meta property="og:description" content={page.description} />
  <meta property="og:url" content={page.url} />
  <meta property="og:image" content={page.image} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={page.title} />
  <meta name="twitter:description" content={page.description} />
  <meta name="twitter:image" content={page.image} />

  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<GameHero
    backgroundImage="/images/baikal/hero-baikal.webp"
    title="Добрый Доббль"
    titleImage="/images/baikal/title-baikal.webp"
  />

<BaikalSwitcher active="rules" />
<RulesSection rules={page.rules} />