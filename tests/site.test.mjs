import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import matter from 'gray-matter';
import { slug } from 'github-slugger';
import config from '../astro.config.mjs';
import { postUrl } from '../src/lib/blog.mjs';

const dist = resolve('dist');
const read = (path) => readFileSync(join(dist, path), 'utf8');
const content = resolve('src/content/blog');

function filesWithExtension(directory, extension) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesWithExtension(path, extension) : path.endsWith(extension) ? [path] : [];
  });
}

// Follow the same filename/slug rules as Astro's glob loader. Assertions adapt
// when sample posts are removed, new posts are added, or drafts are published.
const posts = filesWithExtension(content, '.md').map((path) => {
  const { data } = matter(readFileSync(path, 'utf8'));
  const fileId = relative(content, path).replace(/\.md$/, '').split(sep).map((segment) => slug(segment)).join('/').replace(/\/index$/, '');
  return { id: data.slug ? String(data.slug) : fileId, draft: data.draft === true };
});
const published = posts.filter((post) => !post.draft);
const drafts = posts.filter((post) => post.draft);

test('the build outputs the homepage, about, subscribe, and 404 pages', () => {
  for (const path of ['index.html', 'about/index.html', 'subscribe/index.html', '404.html']) {
    const html = read(path);
    assert.match(html, /<html[^>]*lang="en"/);
    assert.match(html, /name="description"/);
    assert.match(html, /Skip to content/);
    assert.match(html, /rel="canonical"/);
  }
});
test('published posts have routes and draft posts are never exposed', () => {
  const html = read('index.html');
  for (const post of published) {
    assert.ok(existsSync(join(dist, 'blog', post.id, 'index.html')), `Missing article: ${post.id}`);
    assert.ok(html.includes(`href="${postUrl(post.id)}"`), `Missing homepage link: ${post.id}`);
  }
  for (const post of drafts) {
    assert.ok(!existsSync(join(dist, 'blog', post.id, 'index.html')), `Draft exposed: ${post.id}`);
    assert.ok(!html.includes(`href="${postUrl(post.id)}"`), `Draft linked: ${post.id}`);
  }
});
test('RSS and sitemap contain published routes, not drafts', () => {
  const rss = read('rss.xml');
  const sitemap = read('sitemap.xml');
  assert.equal((rss.match(/<item>/g) || []).length, published.length);
  assert.ok(sitemap.includes(new URL('/about/', config.site).href));
  for (const post of published) {
    const url = new URL(postUrl(post.id), config.site).href;
    assert.ok(rss.includes(url), `RSS missing article: ${post.id}`);
    assert.ok(sitemap.includes(url), `Sitemap missing article: ${post.id}`);
  }
  for (const post of drafts) {
    const url = new URL(postUrl(post.id), config.site).href;
    assert.ok(!rss.includes(url), `RSS includes draft: ${post.id}`);
    assert.ok(!sitemap.includes(url), `Sitemap includes draft: ${post.id}`);
  }
});
test('every generated page points to existing local pages and assets', () => {
  for (const path of filesWithExtension(dist, '.html')) {
    const html = readFileSync(path, 'utf8');
    for (const [, attribute] of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)) {
      const url = new URL(attribute.replaceAll('&amp;', '&'), config.site);
      const target = join(dist, decodeURIComponent(url.pathname));
      const file = url.pathname.endsWith('/') ? join(target, 'index.html') : target;
      assert.ok(existsSync(file), `Missing local target ${url.pathname} in ${path}`);
    }
  }
});