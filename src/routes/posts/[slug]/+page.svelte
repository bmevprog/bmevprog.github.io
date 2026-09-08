<script>export let data;</script>
<article><h1>{data.item.title}</h1><p class="date">{data.item.date}</p><div class="content">{@html data.item.html}</div></article>

<style lang="scss">
  article { margin: 1rem; }
</style>
