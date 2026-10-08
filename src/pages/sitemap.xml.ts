import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { postUrl } from '../lib/blog.mjs';

export async function GET(context: APIContext) {
  const paths = ['/', '/about/', '/subscribe/', ...(await getPosts()).map((post) => postUrl(post.id))];
  const urls = paths.map((path) => `<url><loc>${new URL(path, context.site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}