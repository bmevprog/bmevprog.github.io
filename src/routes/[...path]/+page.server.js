import { error, redirect } from '@sveltejs/kit';
import { redirects } from '$lib/redirects.js';

export function entries() {
  return Object.keys(redirects).map((path) => ({ path }));
}

export function load({ params }) {
  const destination = redirects[params.path.replace(/^\/+|\/+$/g, '')];
  if (!destination) error(404, 'Page not found');
  redirect(308, destination);
}
