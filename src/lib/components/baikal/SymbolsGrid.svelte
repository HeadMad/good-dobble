<script>
  import SymbolCard from './SymbolCard.svelte';
  import SymbolModal from './SymbolModal.svelte';

  let { symbols } = $props();

  let selectedIndex = $state(null);

  function openSymbol(index) {
    selectedIndex = index;
  }

  function closeSymbol() {
    selectedIndex = null;
  }
</script>

<section class="symbols-section" id="symbols">
  <div class="container">
    <div class="symbols-grid">
      {#each symbols as symbol, index}
        <SymbolCard {symbol} onOpen={() => openSymbol(index)} />
      {/each}
    </div>
  </div>
</section>

{#if selectedIndex !== null}
  <SymbolModal {symbols} currentIndex={selectedIndex} close={closeSymbol} />
{/if}

<style>
  .symbols-section {
    padding-bottom: clamp(2.5rem, 7vw, 5rem);
  }

  .symbols-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: 1100px) {
    .symbols-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 760px) {
    .symbols-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 520px) {
    .symbols-grid {
      grid-template-columns: 1fr;
    }
  }
</style>