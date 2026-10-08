import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { postUrl } from '../lib/blog.mjs';
import { site } from '../config';

export async function GET(context: APIContext) {
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postUrl(post.id),
      categories: [post.data.category, ...post.data.tags],
    })),
    stylesheet: '/feed.xsl',
    customData: '<language>en-us</language>',
  });
}