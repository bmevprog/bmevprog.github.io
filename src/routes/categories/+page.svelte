<script>
  import { base } from '$app/paths';
  import { groupPosts } from '$lib/posts.js';
  const groups = groupPosts('categories');
</script>

<svelte:head><title>Categories | VProg</title></svelte:head>

<main>
  <h1>Categories</h1>
  <ul>
    {#each groups as [name, items]}
      <li><a href={`${base}/categories/${name}/`}>{name}</a> ({items.length})</li>
    {/each}
  </ul>
</main>
