<script>
  let { rules } = $props();
</script>

<section class="page-section" id="rules">
  <div class="container rules-grid">
    <div class="section-head">
      <span class="section-kicker">Как играть</span>
      <h2 class="section-title">Правила игры в доббль</h2>
      <p class="section-text">
        Все варианты строятся на одном принципе: если взять две любые карточки из колоды, то у них совпадёт только один символ. нужно быстрее остальных найти  и назвать его.
      </p>
    </div>

    <div class="rules-list">
    <h2>Варианты игры:</h2>
      {#each rules as rule, index}
        <article class="rule-card">
          <span>{index + 1}</span>
          <div>
            <h3>{rule.title}</h3>
            <p>{@html rule.text}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .rules-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.75fr) minmax(320px, 1fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }

  .rules-list {
    display: grid;
    gap: 1rem;
  }

  .rule-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--card);
    box-shadow: var(--shadow);
  }

  .rule-card span {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    background: var(--accent);
    font-weight: var(--font-weight-bold);
  }

  h3 {
    margin-bottom: 0.35rem;
    font-size: 1.08rem;
  }

  p {
    color: var(--fg-muted);
  }

  @media (max-width: 860px) {
    .rules-grid {
      grid-template-columns: 1fr;
    }
  }
</style>