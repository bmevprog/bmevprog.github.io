<script>
  import { base } from '$app/paths';
  import { groupPosts } from '$lib/posts.js';
  const groups = groupPosts('tags');
</script>

<svelte:head><title>Tags | VProg</title></svelte:head>

<main>
  <h1>Tags</h1>
  <ul>
    {#each groups as [name, items]}
      <li><a href={`${base}/tags/${name}/`}>{name}</a> ({items.length})</li>
    {/each}
  </ul>
</main>
