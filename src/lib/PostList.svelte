<script>
  import { base } from '$app/paths';
  export let items;
</script>

<div class="post-list">
  {#each items as post}
    <a class="post-card" href={base + post.url}>
      <h2>{post.title}</h2>
      <div class="date">{post.date}</div>
      {#if post.summary}<p class="summary">{post.summary}</p>{/if}
    </a>
  {/each}
</div>
