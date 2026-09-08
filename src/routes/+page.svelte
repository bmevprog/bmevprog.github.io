<script>
  import PostList from '$lib/PostList.svelte';
  import { posts } from '$lib/posts.js';
</script>

<main>
  <h2>VProg</h2>
  <p>Competitive programming student club at BME. ICPC, Codeforces, LeetCode, and more.</p>
  <PostList items={posts.filter((post) => !post.hidden)} />
</main>
