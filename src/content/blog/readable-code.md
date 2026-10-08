---
title: "A small case for readable code"
description: "Good names and clear boundaries are small acts of kindness for the next person reading your work."
pubDate: 2026-09-28
category: "Building"
tags: ["code", "javascript", "craft"]
artwork: "code"
---

Code is written for a computer, but it is also read by people. Often, the next person reading it is you, a few months later, with most of the context forgotten.

Readable code helps that person reconstruct the intent without having to reverse-engineer every detail.

## Give the idea a name

A condition can be correct and still be hard to understand. A name turns it into something you can talk about.

```js
const isPublished = (post) => !post.draft;
const newestFirst = (a, b) => b.date - a.date;

const recentPosts = posts
  .filter(isPublished)
  .sort(newestFirst);
```

These names are not clever. That is the point. They tell you what each step is supposed to do.

## Keep boundaries visible

A small function with a clear input and output is easier to test than a large function that knows about everything.

For example, deciding whether a post matches a search should not require knowing how the page draws its cards. The search rule can be tested on its own; the page can focus on displaying the result.

## Explain the reason, not the obvious

A comment that repeats the code adds another sentence to maintain. A comment that explains a surprising choice preserves context.

Compare “sort the posts” with “sort explicitly because collection order is not guaranteed.” The second explains why the step is needed.

Clear code is not a style competition. It is a way to make future changes less uncertain.