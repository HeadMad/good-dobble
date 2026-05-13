<script>
  import '../app.css';
  // import SiteHeader from '$lib/components/site/SiteHeader.svelte';
  import SiteFooter from '$lib/components/site/SiteFooter.svelte';

  let { children } = $props();
</script>

<!-- <SiteHeader /> -->

<main>
  {@render children()}
</main>

<SiteFooter />