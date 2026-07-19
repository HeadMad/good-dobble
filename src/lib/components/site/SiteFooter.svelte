<footer class="site-footer">
  <div class="container footer-center">
    <span class="center-brand">Добрый Доббль</span>
    <p class="center-tagline">Настольная игра, в которую играют сердцем</p>

    <div class="center-divider" aria-hidden="true">
      <span></span>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span></span>
    </div>

    <ul class="center-contacts">
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <a href="mailto:info@dobry-dobble.ru">info@dobry-dobble.ru</a>
      </li>
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
        </svg>
        <a href="tel:+79001234567">+7 (900) 123-45-67</a>
      </li>
      <li>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.5 4.3 18.2 20c-.2 1-.9 1.3-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2L5.6 13.2l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6l19.1-7.4c.9-.3 1.7.2 1.5 1.6z" />
        </svg>
        <a href="https://t.me/dobry_dobble" target="_blank" rel="noopener noreferrer">@dobry_dobble</a>
      </li>
      <li>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.8 17.3c-5.7 0-9-3.9-9.1-10.4h2.9c.1 4.8 2.2 6.8 3.9 7.2V6.9h2.7v4.2c1.6-.2 3.3-2 3.9-4.2h2.7c-.4 2.7-2.2 4.5-3.4 5.2 1.2.6 3.3 2.2 4.1 5.2h-3c-.6-2-2.2-3.5-4.3-3.7v3.7h-.4z" />
        </svg>
        <a href="https://vk.com/dobry_dobble" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
      </li>
    </ul>

    <a href="/baikal" class="center-nav">Байкал</a>
  </div>

  <div class="container center-copy">
    © {new Date().getFullYear()} Добрый Доббль · Все права защищены
  </div>
</footer>

<style>
  .site-footer {
    margin-top: auto;
    border-top: 1px solid var(--border);
    background: rgba(253, 248, 244, 0.95);
  }
  .footer-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-block: 2.5rem;
    gap: 0.5rem;
  }
  .center-brand {
    font-size: 1.6rem;
    font-weight: var(--font-weight-bold);
    color: var(--fg, inherit);
  }
  .center-tagline {
    margin: 0;
    color: var(--fg-muted);
    font-size: var(--font-size-sm);
  }
  .center-divider {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    max-width: 320px;
    margin: 1rem 0 0.5rem;
  }
  .center-divider span {
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .center-divider svg {
    width: 0.8rem;
    height: 0.8rem;
    color: var(--accent-dark);
  }
  .center-contacts {
    list-style: none;
    margin: 0.5rem 0 1rem;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem 1.8rem;
  }
  .center-contacts li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--font-size-sm);
  }
  .center-contacts svg {
    width: 1rem;
    height: 1rem;
    color: var(--accent-dark);
  }
  .center-contacts a {
    color: var(--fg-muted);
    text-decoration: none;
    transition: color 0.15s;
  }
  .center-contacts a:hover { color: var(--accent-dark); }
  .center-nav {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1.4rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--fg, inherit);
    text-decoration: none;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-sm);
    transition: all 0.15s;
  }
  .center-nav:hover {
    border-color: var(--accent-dark);
    color: var(--accent-dark);
  }
  .center-copy {
    padding-block: 0.7rem;
    border-top: 1px solid var(--border);
    text-align: center;
    font-size: var(--font-size-xs);
    color: var(--fg-muted);
  }
</style>