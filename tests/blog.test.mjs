import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categories, formatDate, matchesPost, postUrl, publishedPosts, readingTime } from '../src/lib/blog.mjs';

const post = { title: 'Small tools', description: 'Thoughtful JavaScript projects', category: 'Building', tags: ['code', 'simplicity'] };

test('empty search includes all posts', () => {
  assert.equal(matchesPost(post, '', 'All posts'), true);
});
test('search matches titles, descriptions, and tags without case sensitivity', () => {
  for (const term of ['TOOLS', 'javascript', 'simplicity']) assert.equal(matchesPost(post, term, 'All posts'), true);
  assert.equal(matchesPost(post, 'unrelated', 'All posts'), false);
});
test('all search words must match and whitespace is ignored', () => {
  assert.equal(matchesPost(post, '  small   code  ', 'All posts'), true);
  assert.equal(matchesPost(post, 'small missing', 'All posts'), false);
});
test('category and query filters work together', () => {
  assert.equal(matchesPost(post, 'tools', 'Building'), true);
  assert.equal(matchesPost(post, 'tools', 'Learning'), false);
  assert.deepEqual(categories, ['All posts', 'Building', 'Learning', 'AI & technology', 'Life & thoughts']);
});
test('reading time has a one-minute minimum and handles longer posts', () => {
  assert.equal(readingTime(''), 1);
  assert.equal(readingTime('a short note'), 1);
  assert.equal(readingTime('word '.repeat(440)), 2);
});
test('reading time supports CJK and mixed-language content', () => {
  assert.equal(readingTime('学'.repeat(800)), 2);
  assert.equal(readingTime('word '.repeat(220) + '学'.repeat(400)), 2);
});
test('dates are consistently displayed in UTC', () => {
  assert.equal(formatDate(new Date('2026-10-08')), 'Oct 8, 2026');
});
test('post URLs support nested paths and encode special characters', () => {
  assert.equal(postUrl('hello-world'), '/blog/hello-world/');
  assert.equal(postUrl('notes/my idea'), '/blog/notes/my%20idea/');
});
test('draft posts are excluded and published posts are newest first', () => {
  const posts = [
    { id: 'older', data: { draft: false, pubDate: new Date('2026-01-01') } },
    { id: 'draft', data: { draft: true, pubDate: new Date('2026-12-01') } },
    { id: 'newer', data: { draft: false, pubDate: new Date('2026-10-01') } },
  ];
  assert.deepEqual(publishedPosts(posts).map((entry) => entry.id), ['newer', 'older']);
  assert.equal(posts[0].id, 'older', 'the original input array is not reordered');
});