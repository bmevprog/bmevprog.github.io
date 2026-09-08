import { content } from './content-data.js';
import fs from 'node:fs';
import path from 'node:path';

const decode = (encoded) => Buffer.from(encoded, 'base64').toString('utf8');

export function posts() {
  return Object.entries(content.posts).map(([slug, item]) => ({ ...item, slug: slug.replace(/^\d{4}-\d{2}-\d{2}-/, ''), url: `/posts/${slug}/`, html: decode(item.html) }));
}

export function post(slug) {
  const key = Object.keys(content.posts).find((item) => item === slug || item.replace(/^\d{4}-\d{2}-\d{2}-/, '') === slug);
  return key ? { ...content.posts[key], ...posts().find((item) => item.url === `/posts/${key}/`), html: decode(content.posts[key].html) } : null;
}

export function staticEntries() {
  return Object.keys(content.pages).filter((route) => !['calendar', 'rss', 'intro', 'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].includes(route));
}

export function page(route) {
  if (['calendar', 'rss', 'intro', 'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].includes(route.replace(/^\//, '').replace(/\/$/, ''))) return null;
  const item = content.pages[route.replace(/^\//, '').replace(/\/$/, '')];
  if (!item) return null;
  let html = decode(item.html);
  if (route.replace(/^\//, '').replace(/\/$/, '') === 'join') {
    html = '<p><a href="/discord/">Say hello on Discord</a></p>';
  }
  if (route.replace(/^\//, '').replace(/\/$/, '') === 'contact') {
    html = html.replace(/<h2 id="follow-us-on-social-media">[\s\S]*?<\/ul>/i, '');
    html = html.replace(/<li>[\s\S]*?(?:facebook|instagram|twitter|linkedin|tiktok)[\s\S]*?<\/li>/gi, '');
  }
  return { ...item, html };
}

export function analyze() {
  const source = fs.readFileSync(path.join(process.cwd(), 'analyze', 'index.html'), 'utf8');
  return source.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? source;
}
