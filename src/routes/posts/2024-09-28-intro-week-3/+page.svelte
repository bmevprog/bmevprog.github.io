<script>
  import Post from '$lib/Post.svelte';
  import { posts } from '$lib/posts.js';
  import content from './content.html?raw';

  const post = posts.find((item) => item.slug === '2024-09-28-intro-week-3');
</script>

<Post {post} {content} />
