import { getCollection } from 'astro:content';
import { publishedPosts } from './blog.mjs';

export async function getPosts() {
  return publishedPosts(await getCollection('blog'));
}