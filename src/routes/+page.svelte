<script>export let data;</script>
<main class="main">
  <h2>VProg</h2>
  <p>Competitive programming student club at BME. ICPC, Codeforces, LeetCode, and more.</p>
  <div class="post-list">
    {#each data.posts as item}
      <a class="post-card" href={item.url}>
        <h2>{item.title}</h2><div class="date">{item.date}</div>
        {#if item.summary}<p class="summary">{item.summary}</p>{/if}
      </a>
    {/each}
  </div>
</main>

<style lang="scss">
  main { margin: 1rem; }
</style>
