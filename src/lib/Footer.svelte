<script>
  import { base } from '$app/paths';
</script>

<footer>
  <nav aria-label="VProg links">
    <a href="https://vprog.hu/discord">Discord</a>
    <a href="https://github.com/bmevprog">GitHub</a>
    <a href="https://www.youtube.com/@bmevprog">YouTube</a>
    <a href="{base}/feed.xml">RSS</a>
  </nav>
</footer>

<style>
  footer {
    margin-top: 4rem;
    padding: 1.5rem 1rem;
    border-top: 1px solid #ddd;
    text-align: center;
  }
  nav { display: flex; justify-content: center; gap: 1.25rem; }
</style>
