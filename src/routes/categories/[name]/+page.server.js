import { error } from '@sveltejs/kit';
import { groupPosts } from '$lib/posts.js';

export function entries() {
  return groupPosts('categories').map(([name]) => ({ name }));
}

export function load({ params }) {
  const group = groupPosts('categories').find(([name]) => name === params.name);
  if (!group) error(404, 'Category not found');
  return { name: group[0], items: group[1] };
}
