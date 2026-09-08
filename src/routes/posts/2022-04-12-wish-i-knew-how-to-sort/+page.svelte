<script>
  import Post from '$lib/Post.svelte';
  import { posts } from '$lib/posts.js';
  import content from './content.html?raw';

  const post = posts.find((item) => item.slug === '2022-04-12-wish-i-knew-how-to-sort');
</script>

<Post {post} {content} />
