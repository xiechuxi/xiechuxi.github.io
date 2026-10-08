---
title: "Small tools, thoughtfully built"
description: "The best side project might be the tiny thing that makes an ordinary day a little easier."
pubDate: 2026-10-06
category: "Building"
tags: ["code", "projects", "simplicity"]
artwork: "code"
---

Not every useful project needs to be a platform. Sometimes it can be a script, a single page, or a shortcut that removes one annoying step.

A small tool has a useful advantage: you can understand the whole thing. The problem, the solution, and the compromises are all close enough to hold in your head.

## Begin with a real annoyance

A good starting point is something repetitive:

- Renaming a batch of files.
- Turning a list of notes into a readable index.
- Checking a collection of links.
- Converting a format that one application exports into a format another one accepts.

Write the problem in one sentence before writing the code. If the sentence needs several paragraphs, the first version probably has too much to do.

## Keep the first version boring

Consider a tool that normalizes a little list of tags. The smallest useful implementation might look like this:

```js
function cleanTags(tags) {
  return [...new Set(
    tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
  )];
}

cleanTags([' JavaScript ', 'notes', 'javascript', '']);
// ['javascript', 'notes']
```

There is no dashboard, account system, or settings screen. There is just a clear input and a clear output.

## Know when to stop

A tool is not better just because it does more. Each new option becomes something to explain, test, and maintain.

Before adding a feature, ask: **does this make the original task simpler?**

If the answer is no, it can wait. Small, dependable, and understandable is a good place to land.