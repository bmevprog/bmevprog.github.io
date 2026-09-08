<script>
  import { base } from '$app/paths';

  export let expanded = true;
  function toggle() {
    const visible_class = 'visible';
    document.getElementById('main-menu').classList.toggle(visible_class);
    document.getElementById('menu-button').classList.toggle(visible_class);
    expanded = !expanded;
  }
</script>

<header>
  <a class="brand" href="{base}/">
    <img
      class="logo"
      src="{base}/img/balloons-cartoon.png"
      loading="lazy"
      width="153"
      height="153"
      alt="VProg balloons logo"
    />
    <div class="title">
      <h1>VProg</h1>
      <p>Competitive programming at BME VIK SZIT</p>
    </div>
  </a>

  <nav class="menu" aria-label="Main navigation">
    <button id="menu-button" aria-controls="main-menu" aria-expanded={expanded} aria-label="Toggle navigation menu" class="visible" on:click={toggle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="16px" height="16px">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
    <ul id="main-menu" class="visible">
      <li><a href="{base}/">Home</a></li>
      <li><a href="{base}/join">Join</a></li>
      <li><a href="{base}/icpc">ICPC</a></li>
    </ul>
  </nav>
</header>

<style lang="scss">
  $mobile-breakpoint: 45rem;

  * {
    margin: 0;
    padding: 0;
  }

  .brand {
    display: flex;
    @media (max-width: $mobile-breakpoint) { flex-direction: column; }

    margin: 1rem;
    gap: 1rem;
    color: inherit;

    &:hover { opacity: 0.8; }
    .logo { max-width: 100%; height: auto; }
    .title {
      display: flex;
      flex-direction: column;
      margin-top: auto;
      gap: 0.5rem;
    }
  }

  .menu {
    background: #af2f20;
    color: #f7f7f8;

    display: flex;
    @media (max-width: $mobile-breakpoint) { flex-direction: column; }

    button {
      display: none;
      border: none;
      cursor: pointer;
      color: inherit;

      padding: 1rem;
      &.visible { padding: 1rem 1rem 0.5rem 1rem; }

      svg {
        $icon-size: 1rem;
        width: $icon-size;
        height: $icon-size;
        display: block;
        color: inherit;
      }

      @media (max-width: $mobile-breakpoint) { display: block; }
    }

    ul {
      display: flex;
      list-style: none;
      color: inherit;
      @media (max-width: $mobile-breakpoint) {
        flex-direction: column;
        display: none;
        &.visible { display: flex; }
      }

      a {
        display: block;
        padding: 1rem;
        @media (max-width: $mobile-breakpoint) { padding: 0.5rem 1rem; }

        text-decoration: none;
        color: inherit;
        font-weight: 500;

        &:hover { opacity: 0.8; }
      }

      li:last-child a {
        @media (max-width: $mobile-breakpoint) { padding: 0.5rem 1rem 1rem 1rem; }
      }
    }
  }
</style>
