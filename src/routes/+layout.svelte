<script>
  import { afterNavigate } from '$app/navigation';
  import Header from '$lib/Header.svelte';
  import '../global.scss';

  let lastTrackedPath = '';

  afterNavigate(() => {
    const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (path === lastTrackedPath) return;
    lastTrackedPath = path;
    let attempts = 0;
    const track = () => {
      if (typeof window.goatcounter?.count === 'function') {
        window.goatcounter.count({ path: window.location.host + path });
      } else if (attempts++ < 100) {
        setTimeout(track, 50);
      }
    };
    track();
  });
</script>

<svelte:head>
  <title>VProg</title>
  <meta name="description" content="Competitive programming student club at BME" />
</svelte:head>

<Header />
<slot />
