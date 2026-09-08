<script>
  import Post from '$lib/Post.svelte';
  import { posts } from '$lib/posts.js';
  import content from './content.html?raw';

  const post = posts.find((item) => item.slug === '2024-10-11-intro-week-2-solutions');
</script>

<Post {post} {content} />
