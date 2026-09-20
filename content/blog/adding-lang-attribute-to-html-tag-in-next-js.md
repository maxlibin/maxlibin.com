---
title: "Adding lang attribute to html tag in Next.js"
date: 2023-02-19T04:01:48Z
modified: 2023-02-19T04:01:48Z
excerpt: "The lang attribute in HTML specifies the language of the content of a web page. It is important to have the lang attribute set correctly on a web page for the following reasons: Accessibility: The lang attribute helps screen readers and other assistive technologies identify the language of the content and read it correctly for"
---

The `lang` attribute in HTML specifies the language of the content of a web page. It is important to have the `lang` attribute set correctly on a web page for the following reasons:

**Accessibility**: The `lang` attribute helps screen readers and other assistive technologies identify the language of the content and read it correctly for users with different languages and reading preferences.

**SEO (Search Engine Optimization)**: Search engines use the `lang` attribute to identify the language of the content of a web page. This helps them to provide more accurate search results for users searching in specific languages.

Translation: The `lang` attribute can also help translation tools and services to identify the language of the content and translate it correctly, which can be useful for websites with international audiences.

**Localization**: The `lang` attribute is an important part of internationalization and localization efforts. By setting the `lang` attribute correctly, web developers can ensure that their content is displayed correctly for users in different regions and with different language preferences.

To add the `lang` attribute to the HTML tag in Next.js, you can add the attribute to the Document component. Here's how you can do it:

Create a custom Document component if you don't already have one. To do this, create a new file called `_document.js` in the pages directory (if it doesn't exist already) and add the following code:

```
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

or add i18n to your `next.config.js` file:

```
module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};
```
