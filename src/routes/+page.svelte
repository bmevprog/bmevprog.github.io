<script>
  import { base } from '$app/paths';
  import { posts } from '$lib/posts.js';

  const pageSize = 5;
  const entries = posts.filter((post) => !post.hidden);
  const pageCount = Math.ceil(entries.length / pageSize);
  let currentPage = 1;
  $: visibleEntries = entries.slice((currentPage - 1) * pageSize, currentPage * pageSize);
</script>

<svelte:head>
  <title>VProg | Competitive programming at BME</title>
  <meta
    name="description"
    content="Notes about algorithms, problem solving, and competitive programming at BME."
  />
</svelte:head>

<main>
  <section aria-label="Blog entries">
    {#if pageCount > 1}
      <nav class="pagination" aria-label="Blog pages">
        <button disabled={currentPage === 1} on:click={() => currentPage -= 1}>newer</button>
        {#each Array(pageCount) as _, index}
          <button
            class:current={currentPage === index + 1}
            aria-current={currentPage === index + 1 ? 'page' : undefined}
            on:click={() => currentPage = index + 1}
          >
            {index + 1}
          </button>
        {/each}
        <button disabled={currentPage === pageCount} on:click={() => currentPage += 1}>older</button>
      </nav>
    {/if}

    <div class="list-header" aria-hidden="true">
      <span>date</span>
      <span>entry</span>
    </div>

    <div class="entries">
      {#each visibleEntries as post}
        <a class="entry" href={base + post.url}>
          <time datetime={post.date}>{post.date}</time>
          <span class="entry-copy">
            <strong>{post.title}</strong>
            {#if post.summary}<span class="summary">{post.summary}</span>{/if}
          </span>
        </a>
      {/each}
    </div>

  </section>
</main>

<style lang="scss">
  $mobile-breakpoint: 42rem;

  main {
    max-width: none;
    margin: 0;
    padding: 1rem;
  }

  .list-header,
  .entry {
    display: grid;
    grid-template-columns: 7.5rem minmax(0, 1fr);
    gap: 1rem;
  }

  .list-header {
    padding: 0.4rem 0;
    border-bottom: 1px solid #aaa;
    color: #777;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .entry {
    align-items: start;
    padding: 0.75rem 0;
    border-bottom: 1px solid #ddd;
    color: inherit;
    line-height: 1.25;

    &:hover {
      background: #faf4f5;
      text-decoration: none;
    }

    time {
      color: #777;
      font-size: 0.76rem;
      font-variant-numeric: tabular-nums;
    }
  }

  .entry-copy {
    display: grid;
    gap: 0.2rem;
  }

  .entry-copy strong { color: #852318; }

  .summary {
    color: #656565;
    font-size: 0.86rem;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .pagination button {
    padding: 0.3rem 0.55rem;
    border: 1px solid #aaa;
    color: #242424;
    cursor: pointer;
    font: inherit;
    font-size: 0.76rem;

    &.current {
      border-color: #852318;
      background: #852318;
      color: white;
    }

    &:disabled {
      cursor: default;
      opacity: 0.35;
    }
  }

  @media (max-width: $mobile-breakpoint) {
    .list-header { display: none; }

    .entry {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.35rem 0.75rem;
    }

    .entry time { grid-column: 1; }
    .entry-copy { grid-column: 1; }
  }
</style>
