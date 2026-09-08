<script>
  export let post;
  export let content;
</script>

<svelte:head>
  <title>{post.title} | VProg</title>
  {#if post.summary}<meta name="description" content={post.summary} />{/if}
</svelte:head>

<article>
  <h1>{post.title}</h1>
  <p class="date">{post.date}</p>
  <div class="content">{@html content}</div>
</article>
