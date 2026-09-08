import { error } from '@sveltejs/kit';
import { groupPosts } from '$lib/posts.js';

export function entries() {
  return groupPosts('tags').map(([name]) => ({ name }));
}

export function load({ params }) {
  const group = groupPosts('tags').find(([name]) => name === params.name);
  if (!group) error(404, 'Tag not found');
  return { name: group[0], items: group[1] };
}
