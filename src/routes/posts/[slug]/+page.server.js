import { error } from '@sveltejs/kit';
import { post, posts } from '$lib/content.js';
export function entries() { return posts().map((item) => ({ slug: `${item.date}-${item.slug}` })); }
export function load({ params }) {
  const item = post(params.slug);
  if (!item) error(404, 'Post not found');
  return { item };
}
