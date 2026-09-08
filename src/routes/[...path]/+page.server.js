import { error, redirect } from '@sveltejs/kit';
import { analyze, page, staticEntries } from '$lib/content.js';
export function entries() { return [...staticEntries().map((path) => ({ path })), { path: 'analyze' }]; }
export function load({ params }) {
  const route = params.path.replace(/^\/+|\/+$/g, '');
  if (route === 'analyze') return { kind: 'html', html: analyze() };
  const item = page(route);
  if (!item) error(404, 'Page not found');
  if (item.redirect) redirect(308, item.redirect);
  return { kind: 'markdown', ...item };
}
