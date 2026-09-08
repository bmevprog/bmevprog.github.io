<footer>
  <div class="footer-content">
    <a class="author" href="https://cs.bme.hu/~nemkin/">Viktória Nemkin</a>
    <nav aria-label="VProg links">
      <a href="https://vprog.hu/discord" aria-label="Discord" title="Discord">
        <img src="/icons/discord.svg" alt="" />
      </a>
      <a href="https://github.com/bmevprog" aria-label="GitHub" title="GitHub">
        <img src="/icons/github.png" alt="" />
      </a>
      <a href="https://www.youtube.com/@bmevprog" aria-label="YouTube" title="YouTube">
        <img src="/icons/youtube.png" alt="" />
      </a>
    </nav>
  </div>
</footer>

<style>
  footer {
    margin-top: 4rem;
    padding: 1.5rem 1rem;
    border-top: 1px solid #ddd;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 72rem;
    margin: 0 auto;
    gap: 1.5rem;
  }

  .author { font-weight: 600; }
  nav {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  nav a {
    display: flex;
    flex: 0 0 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    align-items: center;
    justify-content: center;
  }

  nav img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  @media (max-width: 36rem) {
    .footer-content { flex-direction: column; }
    nav { flex-wrap: wrap; }
  }
</style>
