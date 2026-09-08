<script>
  import Post from '$lib/Post.svelte';
  import { posts } from '$lib/posts.js';
  import content from './content.html?raw';

  const post = posts.find((item) => item.slug === '2023-09-01-vprog-start');
</script>

<Post {post} {content} />
