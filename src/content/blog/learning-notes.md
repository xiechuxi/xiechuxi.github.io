---
title: "Learning in public, one note at a time"
description: "A simple way to turn the things you’re figuring out into a trail you can find again."
pubDate: 2026-10-04
category: "Learning"
tags: ["learning", "notes", "writing"]
artwork: "garden"
---

Understanding something and remembering it later are two different things. A short note can bridge the gap.

Learning notes are not textbooks. They are records of a particular question, a particular attempt, and the part that finally clicked.

## A useful shape for a note

Try answering four questions:

1. **What was I trying to understand?** Name the question in ordinary language.
2. **What did I try?** Include the example, experiment, or source that helped.
3. **What changed my understanding?** Write down the distinction that mattered.
4. **What is still unclear?** Keep the next question visible.

This structure is small enough to use regularly and specific enough to be useful later.

## Examples are better than vague reminders

“Read more about dates” is difficult to act on. “A date-only string can appear as the previous day when formatted in another time zone” gives you something concrete to investigate.

A tiny reproducible example is often worth more than several pages of copied definitions.

```js
const date = new Date('2026-10-08');

new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
}).format(date);
// Oct 8, 2026
```

Keep the context next to the example. Future you will appreciate knowing why it exists.

## Let the notes grow

A note can change. Add a better example, correct an explanation, or link to the next piece of the puzzle.

Think of the collection as a garden rather than an archive: some ideas are seedlings, some are growing, and a few are ready to share.