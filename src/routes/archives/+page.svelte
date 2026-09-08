<script>
  import PostList from '$lib/PostList.svelte';
  import { posts } from '$lib/posts.js';
  const items = posts.filter((post) => !post.hidden);
</script>

<svelte:head><title>Archives | VProg</title></svelte:head>

<main>
  <h1>Archives</h1>
  <PostList {items} />
</main>
