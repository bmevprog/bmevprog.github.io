import { posts } from '$lib/posts.js';

export const prerender = true;

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const items = posts
    .filter((post) => !post.hidden)
    .map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://vprog.hu${post.url}</link>
      <guid>https://vprog.hu${post.url}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>VProg</title>
    <link>https://vprog.hu/</link>
    <description>Competitive programming student club at BME</description>
    ${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
