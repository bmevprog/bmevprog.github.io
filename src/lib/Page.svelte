<script>
  export let title;
  export let content;
</script>

<svelte:head><title>{title} | VProg</title></svelte:head>

<article>
  <h1>{title}</h1>
  <div class="content">{@html content}</div>
</article>
