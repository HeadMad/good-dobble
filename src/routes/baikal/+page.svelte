<script>
  import GameHero from '$lib/components/baikal/GameHero.svelte';
  import BaikalSwitcher from '$lib/components/baikal/BaikalSwitcher.svelte';
  import BaikalAbout from '$lib/components/baikal/BaikalAbout.svelte';
  import SymbolsGrid from '$lib/components/baikal/SymbolsGrid.svelte';

  let { data } = $props();

  const game = data.game;

  $effect(() => {
    console.log('LOAD PAGE')
  });

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: game.title,
      description: game.description,
      image: game.image,
      url: game.url,
      brand: {
        '@type': 'Brand',
        name: 'Good Dobble'
      },
      category: 'Настольная игра'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Символы игры ${game.title}`,
      description: 'Список символов тематической игры Добрый Доббль «Байкал».',
      numberOfItems: game.symbols.length,
      itemListElement: game.symbols.map((symbol, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: symbol.title,
          description: symbol.description,
          image: `https://good-dobble.ru${symbol.image}`
        }
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
          name: game.title,
          item: game.url
        }
      ]
    }
  ]);
</script>

<svelte:head>
  <title>{game.title} — символы Байкала | Good Dobble</title>
  <meta name="description" content={game.description} />
  <meta name="keywords" content={game.keywords.join(', ')} />
  <link rel="canonical" href={game.url} />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:site_name" content="Good Dobble" />
  <meta property="og:title" content={`${game.title} — символы игры`} />
  <meta property="og:description" content={game.description} />
  <meta property="og:url" content={game.url} />
  <meta property="og:image" content={game.image} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${game.title} — символы игры`} />
  <meta name="twitter:description" content={game.description} />
  <meta name="twitter:image" content={game.image} />

  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<GameHero
    backgroundImage="/images/baikal/hero-baikal.webp"
    title="Добрый Доббль"
    titleImage="/images/baikal/title-baikal.webp"
  />

<BaikalSwitcher active="symbols" />

<SymbolsGrid symbols={game.symbols} />