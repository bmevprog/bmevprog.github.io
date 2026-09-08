<script>
  import PostList from '$lib/PostList.svelte';
  export let data;
</script>

<svelte:head><title>{data.name} | Categories | VProg</title></svelte:head>

<main>
  <h1>Category: {data.name}</h1>
  <PostList items={data.items} />
</main>
