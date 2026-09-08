<script>export let data;</script>
{#if data.kind === 'html'}
  {@html data.html}
{:else}
  <article class="content page-content">
    <h1>{data.title}</h1>
    {@html data.html}
  </article>
{/if}

<style lang="scss">
  article { margin: 1rem; }
</style>
