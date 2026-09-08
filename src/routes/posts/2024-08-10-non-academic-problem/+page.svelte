<script>
  import Post from '$lib/Post.svelte';
  import { posts } from '$lib/posts.js';
  import content from './content.html?raw';

  const post = posts.find((item) => item.slug === '2024-08-10-non-academic-problem');
</script>

<Post {post} {content} />
