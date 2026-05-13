<footer class="site-footer">
  <div class="container footer-inner">
    <span>© Добрый Доббль</span>
    <a href="/baikal">Байкал</a>
  </div>
</footer>

<style>
  .site-footer {
    margin-top: auto;
    border-top: 1px solid var(--border);
    background: rgba(253, 248, 244, 0.82);
  }

  .footer-inner {
    display: flex;
    min-height: 58px;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: var(--fg-muted);
    font-size: var(--font-size-sm);
  }

  .footer-inner a {
    color: var(--fg-muted);
    font-weight: var(--font-weight-bold);
  }

  .footer-inner a:hover {
    color: var(--accent-dark);
  }

  @media (max-width: 520px) {
    .footer-inner {
      min-height: 54px;
      font-size: var(--font-size-xs);
    }
  }
</style>