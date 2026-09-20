---
title: "optional chaining in javascript"
date: 2018-08-15T13:27:22Z
modified: 2023-02-01T13:29:01Z
excerpt: "Imaging if you need to access deep level of property and you are not sure that if such properties exists deep down, you are doing something like books && books.book && books.book.authors && books.book.authors.author This is really difficult to read and understand sometime. there is something called optional chaining in javascript proposal which you can"
---

Imaging if you need to access deep level of property and you are not sure that if such properties exists deep down, you are doing something like

```
books && books.book && books.book.authors && books.book.authors.author
```

This is really difficult to read and understand sometime. there is something called optional chaining in javascript proposal which you can use if you include in [babel-plugin-proposal-optional-chaining](https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining.html " babel-plugin-proposal-optional-chaining") to your babebl.

The sytax is really easy using

```
?.
```

```
books?.book?.authors?.author
```

all you need is chain the child properties, now everything is so much easier to read.
