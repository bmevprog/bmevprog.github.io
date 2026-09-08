<script>
  import Post from '$lib/Post.svelte';
  import { posts } from '$lib/posts.js';
  import content from './content.html?raw';

  const post = posts.find((item) => item.slug === '2021-04-16-google-code-jam-qualification-round');
</script>

<Post {post} {content} />
