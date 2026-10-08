export const categories = ['All posts', 'Building', 'Learning', 'Life & thoughts'];

/** @param {string} body */
export function readingTime(body = '') {
  // Count CJK characters separately so Chinese posts get useful estimates too.
  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu;
  const characters = (body.match(cjk) || []).length;
  const words = body.replace(cjk, ' ').trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220 + characters / 400));
}

/** @param {Date} date */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

/** @param {string} id */
export function postUrl(id) {
  return `/blog/${id.split('/').map(encodeURIComponent).join('/')}/`;
}

/**
 * @template {{ data: { draft: boolean, pubDate: Date } }} T
 * @param {T[]} posts
 * @returns {T[]}
 */
export function publishedPosts(posts) {
  return posts.filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * @param {{title: string, description: string, category: string, tags: string[]}} post
 * @param {string} query
 * @param {string} category
 */
export function matchesPost(post, query, category) {
  const searchable = [post.title, post.description, post.category, ...post.tags].join(' ').toLocaleLowerCase();
  const terms = query.trim().toLocaleLowerCase().split(/\s+/u).filter(Boolean);
  return (category === 'All posts' || post.category === category)
    && terms.every((term) => searchable.includes(term));
}