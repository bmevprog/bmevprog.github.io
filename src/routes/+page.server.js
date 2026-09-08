import { posts } from '$lib/content.js';
export function load() { return { posts: posts() }; }
