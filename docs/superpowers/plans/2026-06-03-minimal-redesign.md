# Minimal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework maxlibin.com into a clean, monochrome, ReadCV-style minimal site (Inter font, narrow centered column, two-column rows, light + dark) across the whole site.

**Architecture:** Introduce semantic color tokens as CSS variables in `global.css`, mapped into Tailwind via `tailwind.config.js`, so components use `bg-bg`/`text-fg`/`text-muted`/`text-faint`/`border-line` with no `dark:` duplication. Load Inter via `gatsby-ssr.js`. Then restyle the shared shell, rebuild the homepage into a résumé structure, and restyle blog/post/vibe/homeworkai pages to the tokens.

**Tech Stack:** Gatsby 5, React 18, Tailwind 3 (`darkMode: 'class'`, class on `<html>`), Emotion (unused here), WordPress source. Package manager: Yarn 4.

**Testing note:** No test framework exists in this repo and these changes are presentational. Each task is verified by `yarn build` (must compile) and a manual visual check in `yarn develop` (both light and dark mode). Toggle theme with the header button.

---

## File map

- `src/styles/global.css` — token variables (`:root` / `.dark`), body font, prose cleanup. *Modify.*
- `tailwind.config.js` — map tokens to Tailwind colors. *Modify.*
- `gatsby-ssr.js` — inject Inter font links. *Modify.*
- `gatsby-config.js` — manifest theme/background color. *Modify.*
- `src/components/layout.tsx` — tokens + narrow column + `wide` prop. *Modify.*
- `src/components/header.tsx` — quiet monochrome nav. *Modify.*
- `src/components/social.tsx` — tokens. *Modify.*
- `src/components/toggler.tsx` — tokens. *Modify.*
- `src/components/sectionRow.tsx` — small shared row + section-label primitives. *Create.*
- `src/components/projects.tsx` — clean two-column projects list (keeps JSON-LD). *Modify.*
- `static/avatar.jpg` — committed neutral placeholder. *Create.*
- `src/pages/index.tsx` — résumé homepage. *Modify.*
- `src/pages/blog.tsx` — clean writing list, drop embedded Projects. *Modify.*
- `src/templates/blog-post.tsx` — clean article, neutral ToC/code/lead, drop embedded Projects. *Modify.*
- `src/pages/vibe-code-to-glory.tsx` — fully monochrome. *Modify.*
- `src/pages/homeworkai/{index,privacy,terms,support}.tsx` — tokens + Inter, neutral accents. *Modify.*

---

## Task 1: Color tokens + Tailwind mapping + Inter + prose cleanup

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tailwind.config.js`
- Modify: `gatsby-ssr.js`

- [ ] **Step 1: Add token variables and font to `global.css`**

Replace the top of `src/styles/global.css` (the `@tailwind` lines through the `h1..h6`/`h3`/`h4` blocks, lines 1–33) with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #f8f8f7;
  --surface: #ffffff;
  --fg: #111111;
  --muted: #555555;
  --faint: #999999;
  --line: rgba(0, 0, 0, 0.08);
}

.dark {
  --bg: #0c0a09;
  --surface: #171513;
  --fg: #fafaf9;
  --muted: #a8a29e;
  --faint: #78716c;
  --line: rgba(255, 255, 255, 0.1);
}

html,
body,
#___gatsby,
#gatsby-focus-wrapper {
  height: 100%;
}

body {
  margin: 0px;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

(The old global `h1..h6 { font-weight: bold }`, `h3 { font-size: 2rem }`, and `h4 { font-size: 1.5rem }` rules are removed — prose sizing lives under `.post` already.)

- [ ] **Step 2: Update prose accents in `global.css` to tokens**

In `src/styles/global.css`, replace the link color rules:

```css
.post a {
  color: var(--fg);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: var(--line);
}

.post a:hover {
  text-decoration-color: var(--fg);
}
```

And replace the inline-code rule (`p code, li code { ... }`) with:

```css
p code,
li code {
  background: var(--surface);
  color: var(--fg);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--line);
  font-size: 0.9em;
}
```

- [ ] **Step 3: Map tokens in `tailwind.config.js`**

Replace `theme: { extend: {} }` in `tailwind.config.js` with:

```js
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "40rem",
      },
    },
  },
```

- [ ] **Step 4: Inject Inter in `gatsby-ssr.js`**

In `gatsby-ssr.js`, add font links to the `setHeadComponents([...])` array (alongside the existing darkmode `<script>`):

```js
    <link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gf-preconnect2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="inter"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    />,
```

- [ ] **Step 5: Build and verify**

Run: `yarn build`
Expected: build completes with no CSS/JS errors. (Tokens aren't used by components yet; this just verifies config compiles.)

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css tailwind.config.js gatsby-ssr.js
git commit -m "Add monochrome color tokens, Inter font, prose cleanup"
```

---

## Task 2: Shared shell — layout, header, social, toggler

**Files:**
- Modify: `src/components/layout.tsx`
- Modify: `src/components/header.tsx`
- Modify: `src/components/social.tsx`
- Modify: `src/components/toggler.tsx`

- [ ] **Step 1: Rewrite `layout.tsx` with tokens + `wide` prop**

Replace the entire contents of `src/components/layout.tsx` with:

```tsx
import React from "react"

import Header from "./header"

const Layout = ({ children, wide = false }) => (
  <div className="min-h-full bg-bg text-muted px-6">
    <div
      className={`mx-auto flex flex-col min-h-full ${
        wide ? "max-w-5xl" : "max-w-content"
      }`}
    >
      <Header />
      <main className="pb-24">{children}</main>
    </div>
  </div>
)

export default Layout
```

- [ ] **Step 2: Rewrite `header.tsx` quiet + monochrome**

Replace the entire contents of `src/components/header.tsx` with:

```tsx
import React from "react"
import { Link } from "gatsby"

import Social from "./social"
import ThemeToggle from "./toggler"

type link = {
  label: string
  href: string
}

const links: Array<link> = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Vibe Code to Glory", href: "/vibe-code-to-glory" },
]

const Header = () => (
  <header className="py-8 flex items-center gap-6">
    <nav aria-label="Main navigation">
      <ul className="flex gap-5 text-sm">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              to={href}
              className="text-faint hover:text-fg transition-colors"
              activeClassName="!text-fg"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="ml-auto flex items-center gap-4">
      <Social />
      <ThemeToggle />
    </div>
  </header>
)

export default Header
```

- [ ] **Step 3: Rewrite `social.tsx` with tokens**

Replace the `Social` component's `<ul>`/`<li>` markup in `src/components/social.tsx` (lines 26–45) with:

```tsx
const Social = () => (
  <ul className="flex items-center gap-3 pr-4 border-r border-line">
    {socials.map(({ href, label, icon }) => (
      <li
        key={label}
        className="text-faint hover:text-fg transition-colors text-lg"
        title={label}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Max Li Bin on ${label}`}
        >
          {icon}
        </a>
      </li>
    ))}
  </ul>
)
```

- [ ] **Step 4: Update `toggler.tsx` button styling to tokens**

In `src/components/toggler.tsx`, replace the `<button ...>` opening tag's `className` (line 20) with:

```tsx
    <button type="button" aria-label="Color Mode" className="flex justify-center p-2 text-faint hover:text-fg transition-colors rounded-md focus:outline-none" onClick={ThemeToggle}>
```

- [ ] **Step 5: Build and verify**

Run: `yarn build`
Expected: build completes. Then `yarn develop` → header is a quiet single row, narrow centered column, off-white (light) / near-black (dark); toggle flips both.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout.tsx src/components/header.tsx src/components/social.tsx src/components/toggler.tsx
git commit -m "Restyle shell: narrow column, quiet monochrome header"
```

---

## Task 3: Shared row primitives

**Files:**
- Create: `src/components/sectionRow.tsx`

- [ ] **Step 1: Create `sectionRow.tsx`**

Create `src/components/sectionRow.tsx` with:

```tsx
import React from "react"

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-medium uppercase tracking-wider text-faint mb-3">
    {children}
  </h2>
)

type RowProps = {
  left: React.ReactNode
  right?: React.ReactNode
}

export const Row = ({ left, right }: RowProps) => (
  <div className="flex items-baseline justify-between gap-6 py-2.5 border-b border-line last:border-b-0">
    <div className="text-[15px] text-fg min-w-0">{left}</div>
    {right != null && (
      <div className="text-[13px] text-faint whitespace-nowrap tabular-nums shrink-0">
        {right}
      </div>
    )}
  </div>
)

export const Section = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <section className="mt-14">
    <SectionLabel>{label}</SectionLabel>
    <div>{children}</div>
  </section>
)
```

- [ ] **Step 2: Build and verify**

Run: `yarn build`
Expected: build completes (component compiles even though not yet imported anywhere).

- [ ] **Step 3: Commit**

```bash
git add src/components/sectionRow.tsx
git commit -m "Add Section/Row/SectionLabel primitives"
```

---

## Task 4: Projects component → clean two-column list

**Files:**
- Modify: `src/components/projects.tsx`

- [ ] **Step 1: Replace the `Projects` render with a clean list**

In `src/components/projects.tsx`, keep the `projects` data array and imports, but replace the `Projects` component (from `const Projects = () => {` to the end of its `return (...)`, lines 55–154) with:

```tsx
import { Section, Row } from "./sectionRow"

const Projects = () => {
  return (
    <Section label="Projects">
      {projects.map(project => (
        <Row
          key={project.id}
          left={
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg hover:text-muted transition-colors"
            >
              {project.title}
              <span className="text-faint ml-1">↗</span>
            </a>
          }
          right={`${project.category} · ${project.platform}`}
        />
      ))}

      {/* Per-project schema for SEO/GEO */}
      {projects.map(project => (
        <script
          key={`schema-${project.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: project.title,
              description: project.description.split("\n")[0],
              applicationCategory: project.category,
              operatingSystem: project.platform === "iOS" ? "iOS" : "Web",
              url: project.url,
              author: { "@type": "Person", name: "Max Li Bin" },
            }),
          }}
        />
      ))}
    </Section>
  )
}
```

Notes: add the `import { Section, Row } from "./sectionRow"` line to the top imports of the file (next to the image imports), and remove the now-unused `useState` import (change `import React, { useState } from "react"` to `import React from "react"`). The unused image imports (`aiBananaFlow`, etc.) are referenced by the `projects` data array `coverUrl` fields — keep them.

- [ ] **Step 2: Build and verify**

Run: `yarn build`
Expected: build completes, no unused-import or type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/projects.tsx
git commit -m "Rework Projects into clean two-column list"
```

---

## Task 5: Avatar placeholder

**Files:**
- Create: `static/avatar.jpg`

- [ ] **Step 1: Create a neutral placeholder image**

Run (creates a 400x400 neutral gray JPEG placeholder via the `sharp` module already in `node_modules`):

```bash
node -e "const sharp=require('sharp');sharp({create:{width:400,height:400,channels:3,background:{r:228,g:228,b:226}}}).jpeg().toFile('static/avatar.jpg').then(()=>console.log('done'))"
```

Expected: prints `done` and `static/avatar.jpg` exists.

- [ ] **Step 2: Commit**

```bash
git add static/avatar.jpg
git commit -m "Add avatar placeholder (replace with real headshot)"
```

---

## Task 6: Homepage — résumé structure

**Files:**
- Modify: `src/pages/index.tsx`

- [ ] **Step 1: Rewrite `index.tsx`**

Replace the entire contents of `src/pages/index.tsx` with:

```tsx
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"
import { Section, Row } from "../components/sectionRow"

const description =
  "Software Developer & Vibe Coder based in Singapore. Currently building 24 revenue-generating apps in 12 months. Let's talk about React, TypeScript, AI, and Vibe Coding."

const keywords =
  "vibe coding, software developer, singapore, react, typescript, ai, indie maker, 24 apps challenge, max li bin"

const contacts = [
  { label: "X / Twitter", value: "@maxlibin", href: "https://twitter.com/maxlibin" },
  { label: "GitHub", value: "maxlibin", href: "https://github.com/maxlibin" },
  { label: "Email", value: "me@maxlibin.com", href: "mailto:me@maxlibin.com" },
]

const Index = ({ data }) => {
  return (
    <Layout>
      <div className="mt-4">
        <img
          src="/avatar.jpg"
          alt="Max Li Bin"
          width={72}
          height={72}
          className="w-18 h-18 rounded-full object-cover"
          style={{ width: 72, height: 72 }}
        />
        <h1 className="mt-5 text-lg font-medium text-fg">Max Li Bin</h1>
        <p className="text-[15px] text-faint">
          Software Developer &amp; Vibe Coder · Singapore
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          Independent software developer based in Singapore, building with React,
          TypeScript, and AI. I'm on a{" "}
          <Link
            to="/vibe-code-to-glory"
            className="text-fg underline decoration-line underline-offset-2 hover:decoration-fg"
          >
            Vibe Code to Glory
          </Link>{" "}
          journey — shipping 24 revenue-ready apps in 12 months.
        </p>
      </div>

      <Projects />

      <Section label="Writing">
        {data.allWpPost.nodes.map(({ slug, title, date }) => (
          <Row
            key={slug}
            left={
              <Link
                to={`/${slug}`}
                className="text-fg hover:text-muted transition-colors"
              >
                {title}
              </Link>
            }
            right={date}
          />
        ))}
        <div className="pt-4">
          <Link
            to="/blog"
            className="text-[13px] text-faint hover:text-fg transition-colors"
          >
            All writing →
          </Link>
        </div>
      </Section>

      <Section label="Contact">
        {contacts.map(({ label, value, href }) => (
          <Row
            key={label}
            left={
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-muted transition-colors"
              >
                {value}
                <span className="text-faint ml-1">↗</span>
              </a>
            }
            right={label}
          />
        ))}
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(limit: 7, sort: { fields: date, order: DESC }) {
      nodes {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default Index

export const Head = () => <SEO description={description} keywords={keywords} />
```

Notes: this drops the `allGithubRepos` query, `GitHubCalendar`, `GithubRepo`, and `LatestPosts` usages. The `w-18 h-18` utilities don't exist in default Tailwind, so the inline `style={{ width: 72, height: 72 }}` guarantees sizing.

- [ ] **Step 2: Build and verify**

Run: `yarn build`
Expected: build completes. The removed GraphQL field `allGithubRepos` is no longer queried here — confirm no other page errors. Then `yarn develop` → homepage shows avatar, name, intro, Projects list, Writing list, Contact list, in both themes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.tsx
git commit -m "Rebuild homepage into minimal résumé structure"
```

---

## Task 7: Blog list

**Files:**
- Modify: `src/pages/blog.tsx`

- [ ] **Step 1: Rewrite `blog.tsx`**

Replace the entire contents of `src/pages/blog.tsx` with:

```tsx
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SectionLabel } from "../components/sectionRow"

interface node {
  date: string
  excerpt: string
  slug: string
  title: string
}

interface post {
  data: {
    allWpPost: {
      nodes: Array<node>
    }
  }
}

const Blog = ({ data }: post) => {
  return (
    <Layout>
      <div className="mt-4">
        <SectionLabel>Writing</SectionLabel>
        <div className="-mt-1">
          {data.allWpPost.nodes.map(({ slug, title, excerpt, date }) => (
            <Link
              to={`/${slug}`}
              key={slug}
              className="group block py-4 border-b border-line"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-[15px] text-fg group-hover:text-muted transition-colors">
                  {title}
                </h3>
                <span className="text-[13px] text-faint whitespace-nowrap tabular-nums shrink-0">
                  {date}
                </span>
              </div>
              <div
                className="mt-1 text-[13px] text-faint line-clamp-1"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date], order: DESC }) {
      nodes {
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`

export default Blog

export const Head = () => (
  <SEO
    title="Blog | Insights, Tutorials, and Guides for Developers"
    description="Explore our blog for the latest insights, tutorials, and guides on web development, vibe coding, AI-powered tools, and innovative technologies. Stay updated with expert knowledge and practical tips."
    pathname="/blog"
    breadcrumbs={[
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
    ]}
  />
)
```

Notes: drops the `Projects` import/usage and the 6xl heading. `line-clamp-1` is built into Tailwind 3.3+; if the installed Tailwind lacks it, the excerpt simply wraps — acceptable.

- [ ] **Step 2: Build and verify**

Run: `yarn build`
Expected: build completes. `yarn develop` → `/blog` shows a clean dated list, thin dividers, no project showcase.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog.tsx
git commit -m "Restyle blog list, drop embedded Projects"
```

---

## Task 8: Blog post template

**Files:**
- Modify: `src/templates/blog-post.tsx`
- Modify: `src/styles/global.css` (blockquote/hr already token-friendly; verify)

- [ ] **Step 1: Neutralize heading classes in the parser**

In `src/templates/blog-post.tsx`, the `h2`/`h3` parser branch sets classes `"text-4xl font-bold mt-12 mb-6"` / `"text-2xl font-bold mt-8 mb-4"` (lines ~90–94). Replace those two class strings with:

```tsx
                domNode.tagName === "h2"
                  ? "text-2xl font-semibold text-fg mt-12 mb-5"
                  : "text-xl font-semibold text-fg mt-8 mb-3"
```

- [ ] **Step 2: Switch code block theme to neutral**

In `src/templates/blog-post.tsx`, change the syntax highlighter import (line 6) from:

```tsx
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs"
```

to:

```tsx
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
```

Then in the `<SyntaxHighlighter ...>` usage (lines ~107–118), set `style={atomOneDark}` and replace `customStyle` with:

```tsx
              customStyle={{
                padding: "20px",
                backgroundColor: "#171513",
                borderRadius: "8px",
                marginBottom: "28px",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: "14px",
              }}
```

- [ ] **Step 3: Replace the indigo "Key Takeaways" box with a neutral lead**

In `src/templates/blog-post.tsx`, replace the Key Takeaways `<div className="bg-indigo-50 ...">...</div>` block (lines ~163–170) with:

```tsx
            <div className="border-l-2 border-line pl-4 mb-12 text-[15px] italic text-muted">
              {plainExcerpt}...
            </div>
```

- [ ] **Step 4: Neutralize the header, content wrapper, and ToC**

In `src/templates/blog-post.tsx`:

Replace the title block (lines ~148–155) with:

```tsx
        <div className="py-8">
          <div className="text-[13px] text-faint mb-2">{date}</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg leading-tight">
            {title}
          </h1>
        </div>
```

Replace the main content wrapper `<div className="text-gray-900 dark:text-gray-300 text-xl md:max-w-4xl leading-relaxed">` (line ~172) with:

```tsx
            <div className="text-[16px] text-muted leading-relaxed">
```

Replace the ToC sidebar inner container `<div className="sticky top-8 p-6 ...">` (line ~178) with:

```tsx
            <div className="sticky top-8">
```

Replace the ToC label `<div className="text-[11px] font-black uppercase tracking-[2px] text-indigo-500 ...">` (line ~179) with:

```tsx
              <div className="text-[11px] font-medium uppercase tracking-wider text-faint mb-5">
```

Replace the two ToC `<a>` class branches (lines ~196–205) — the whole `className={\`...\`}` — with:

```tsx
                        className={`
                          block text-[13px] leading-snug transition-colors
                          ${
                            h.level === 2
                              ? "text-muted hover:text-fg"
                              : "text-faint hover:text-muted"
                          }
                          relative pl-3 border-l border-line
                        `}
```

- [ ] **Step 5: Drop the embedded Projects showcase and neutralize the footer divider**

In `src/templates/blog-post.tsx`, remove the import `import Projects from "../components/projects"` (line 9) and replace the block (lines ~219–225):

```tsx
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <Projects />
        </div>

        <div className="mt-8 text-gray-900 dark:text-gray-300 text-xl md:max-w-4xl">
          <div className="giscus" />
        </div>
```

with:

```tsx
        <div className="mt-16 pt-8 border-t border-line">
          <div className="giscus" />
        </div>
```

- [ ] **Step 6: Confirm global prose dividers use tokens**

In `src/styles/global.css`, update `.post blockquote` and `.post hr` and table borders to tokens:

```css
.post th,
.post td {
  @apply border border-line p-2;
}

.post th {
  @apply font-semibold text-left;
  background: var(--surface);
}

.post blockquote {
  @apply border-l-2 border-line pl-4 italic my-6;
}

.post hr {
  @apply my-8 border-line;
}
```

(Replace the existing `.post th/td`, `.post th`, `.post blockquote`, `.post hr` rules accordingly.)

- [ ] **Step 7: Build and verify**

Run: `yarn build`
Expected: build completes. `yarn develop` → open any blog post: tight monochrome title, neutral lead, underlined `fg` links, neutral ToC, neutral code blocks, no project showcase, giscus present. Check light + dark.

- [ ] **Step 8: Commit**

```bash
git add src/templates/blog-post.tsx src/styles/global.css
git commit -m "Restyle blog post: monochrome article, neutral ToC and code"
```

---

## Task 9: Vibe Code to Glory — fully monochrome

**Files:**
- Modify: `src/pages/vibe-code-to-glory.tsx`

- [ ] **Step 1: Use the wide layout and neutral header**

In `src/pages/vibe-code-to-glory.tsx`, change `<Layout>` to `<Layout wide>` (line ~154).

Replace the gradient title `<h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">` (line ~160) with:

```tsx
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg mb-3">
```

Replace the subtitle `<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">` (line ~163) with:

```tsx
          <h2 className="text-[15px] font-medium text-faint uppercase tracking-wider mb-3">
```

Replace the intro `<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">` (line ~166) with:

```tsx
          <p className="text-[15px] leading-relaxed text-muted max-w-content">
```

Replace the header wrapper border `<div className="py-8 border-b border-gray-200 dark:border-gray-800 mb-8">` (line ~159) with:

```tsx
        <div className="py-8 border-b border-line mb-8">
```

- [ ] **Step 2: Neutralize the progress bar**

Replace the progress label row `<div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">` (line ~173) with:

```tsx
            <div className="flex justify-between text-[13px] text-faint mb-2">
```

Replace the track `<div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">` (line ~181) with:

```tsx
            <div className="w-full bg-line rounded-full h-2 overflow-hidden">
```

Replace the fill `<div className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full ...">` (line ~183) with:

```tsx
              <div
                className="bg-fg h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(shippedCount / TOTAL_SLOTS) * 100}%` }}
              ></div>
```

- [ ] **Step 3: Neutralize the grid cards**

Replace the card wrapper className (the filled/empty conditional, lines ~196–199) with:

```tsx
              className={`relative group rounded-xl border transition-all duration-300 ${
                project
                  ? "border-line bg-surface hover:shadow-lg cursor-pointer"
                  : "border-line bg-surface/50 border-dashed"
              } overflow-hidden min-h-[350px] flex flex-col`}
```

Replace the empty-image fallback `<div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 z-0" />` (line ~215) with:

```tsx
                    <div className="absolute inset-0 bg-surface z-0" />
```

Replace the platform badge `<div className="bg-black/50 backdrop-blur-md border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-white/90">` (line ~222) with:

```tsx
                      <div className="bg-black/40 backdrop-blur-md text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider text-white/90">
```

Replace the number badge `<div className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20">` (line ~225) with:

```tsx
                      <div className="bg-white/15 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full">
```

Replace the card title `<h3 className="text-2xl font-extrabold text-white mb-2 leading-tight group-hover:text-pink-400 transition-colors">` (line ~231) with:

```tsx
                      <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
```

Replace the status badge `<span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-300 border border-green-500/30">` (line ~239) with:

```tsx
                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-white/15 text-white/90">
```

Replace the "Visit Site" link `<a ... className="text-sm font-bold text-white hover:text-pink-400 flex items-center gap-1 transition-colors">` (line ~247) with:

```tsx
                          className="text-[13px] font-medium text-white/90 hover:text-white flex items-center gap-1 transition-colors"
```

Replace the empty-slot number `<div className="text-6xl font-black text-gray-200 dark:text-gray-700 mb-4 select-none">` (line ~258) with:

```tsx
                  <div className="text-5xl font-semibold text-line mb-4 select-none">
```

Replace the empty-slot heading `<h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-1">` (line ~261) with:

```tsx
                  <h3 className="text-[15px] font-medium text-faint mb-1">
```

Replace the empty-slot subtext `<p className="text-xs text-gray-400 dark:text-gray-500">` (line ~264) with:

```tsx
                  <p className="text-[13px] text-faint">
```

- [ ] **Step 4: Neutralize the modal**

In `src/pages/vibe-code-to-glory.tsx`:

Replace the modal container `<div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ... border border-gray-100 dark:border-gray-800">` (line ~280) with:

```tsx
            <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col border border-line">
```

Replace the modal empty-image fallback `<div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900" />` (line ~295) with:

```tsx
                  <div className="absolute inset-0 bg-surface" />
```

Replace the "Project #" badge `<span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">` (line ~302) with:

```tsx
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wider">
```

Replace the modal title `<h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 shadow-sm">` (line ~310) and its inner link `className="hover:text-pink-400 transition-colors"` (line ~316) with, respectively:

```tsx
                      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
```
```tsx
                            className="hover:text-white/80 transition-colors"
```

Replace the three "About the Project" / "Vibe Stack" section labels `<h3 className="text-sm font-bold uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-wider ...">` (lines ~347, ~363) with:

```tsx
                    <h3 className="text-[11px] font-medium uppercase text-faint mb-3 tracking-wider">
```

(For the "Vibe Stack" one keep its inner `<span>✨ Vibe Stack</span>` content; only the `<h3>` class changes — drop the `flex items-center gap-2` too.)

Replace the excerpt callout `<div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded-r italic text-gray-600 dark:text-gray-400">` (line ~354) with:

```tsx
                    <div className="border-l-2 border-line pl-4 italic text-muted">
```

Replace the tech pills `<span ... className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">` (line ~368) with:

```tsx
                        <span key={tech} className="px-3 py-1 bg-bg text-muted rounded-full text-[13px] border border-line">
```

Replace the "Launch App" button `<a ... className="flex-1 ... text-white bg-indigo-600 hover:bg-indigo-700 ...">` (line ~383) with:

```tsx
                      className="flex-1 inline-flex justify-center items-center px-6 py-3 text-[15px] font-medium rounded-xl text-bg bg-fg hover:opacity-90 transition-opacity"
```

(and change its text `Launch App 🚀` → `Launch App ↗`.)

Replace the "Read Full Story" button `<a ... className="flex-1 ... border border-gray-300 dark:border-gray-600 ... text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 ...">` (line ~393) with:

```tsx
                      className="flex-1 inline-flex justify-center items-center px-6 py-3 text-[15px] font-medium rounded-xl text-fg border border-line bg-surface hover:bg-bg transition-colors"
```

(and change its text `Read Full Story 📖` → `Read the story`.)

- [ ] **Step 5: Neutralize the footer CTA**

Replace the footer wrapper `<div className="mt-16 text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">` (line ~409) with:

```tsx
        <div className="mt-16 text-center p-8 bg-surface rounded-2xl border border-line">
```

Replace the footer heading `<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">` (line ~410) with:

```tsx
          <h3 className="text-xl font-semibold text-fg mb-3">
```

Replace the footer paragraph `<p className="text-gray-600 dark:text-gray-400 mb-6">` (line ~413) with:

```tsx
          <p className="text-[15px] text-muted mb-6">
```

Replace the Twitter button `<a ... className="inline-flex items-center px-6 py-3 ... text-white bg-blue-600 hover:bg-blue-700 ...">` (line ~417) with:

```tsx
            className="inline-flex items-center px-6 py-3 text-[15px] font-medium rounded-xl text-bg bg-fg hover:opacity-90 transition-opacity"
```

- [ ] **Step 6: Build and verify**

Run: `yarn build`
Expected: build completes. `yarn develop` → `/vibe-code-to-glory`: no gradients/indigo/pink/green anywhere; monochrome grid, progress, modal, footer. Open a card → modal is monochrome. Check light + dark.

- [ ] **Step 7: Commit**

```bash
git add src/pages/vibe-code-to-glory.tsx
git commit -m "Make Vibe Code to Glory fully monochrome"
```

---

## Task 10: HomeworkAI pages

**Files:**
- Modify: `src/pages/homeworkai/index.tsx`
- Modify: `src/pages/homeworkai/privacy.tsx`
- Modify: `src/pages/homeworkai/terms.tsx`
- Modify: `src/pages/homeworkai/support.tsx`

- [ ] **Step 1: Read all four files**

Run: `sed -n '1,400p' src/pages/homeworkai/index.tsx` and likewise for `privacy.tsx`, `terms.tsx`, `support.tsx` — or open them with the editor — to inventory the accent colors and hardcoded backgrounds in use.

- [ ] **Step 2: Apply token replacements**

In each of the four files, perform these class replacements (these are the standard accent/neutral utilities to neutralize; apply every occurrence found):

- `text-indigo-600` / `text-indigo-500` / `text-indigo-400` → `text-fg`
- `bg-indigo-600` / `bg-indigo-500` → `bg-fg`, and pair text on it → `text-bg`
- `hover:bg-indigo-700` / `hover:bg-indigo-600` → `hover:opacity-90`
- `border-indigo-*` → `border-line`
- `bg-indigo-50` / `bg-indigo-900/20` → `bg-surface`
- `text-gray-900 dark:text-white` (headings) → `text-fg`
- `text-gray-600 dark:text-gray-400` / `text-gray-700 dark:text-gray-300` (body) → `text-muted`
- `text-gray-500 dark:text-gray-500` (meta) → `text-faint`
- `bg-white dark:bg-gray-900` / `bg-gray-50 dark:bg-gray-900` (surfaces) → `bg-surface`
- `border-gray-200 dark:border-gray-800` / `border-gray-100 dark:border-gray-700` → `border-line`
- Any `bg-gradient-to-*` with purple/pink/blue/indigo `from-*`/`to-*` → remove the gradient classes and use `bg-fg` (for solid buttons) or `text-fg` (for gradient text).

Keep all structure, copy, links, and the octopus mascot / Apple icon imagery intact. Only colors/typography classes change. The page already renders through its own structure (these are standalone pages, not necessarily using `Layout` — leave their wrappers but swap hardcoded `bg-white`/`bg-gray-*` page backgrounds to `bg-bg`).

- [ ] **Step 3: Build and verify**

Run: `yarn build`
Expected: build completes. `yarn develop` → `/homeworkai/`, `/homeworkai/privacy`, `/homeworkai/terms`, `/homeworkai/support`: monochrome, Inter, no indigo/gradient accents, structure unchanged. Check light + dark.

- [ ] **Step 4: Commit**

```bash
git add src/pages/homeworkai
git commit -m "Restyle HomeworkAI pages to monochrome tokens"
```

---

## Task 11: Manifest colors + final verification

**Files:**
- Modify: `gatsby-config.js`

- [ ] **Step 1: Update manifest colors**

In `gatsby-config.js`, in the `gatsby-plugin-manifest` options, change:

```js
        background_color: `#111827`,
        theme_color: `#6366f1`,
```

to:

```js
        background_color: `#0c0a09`,
        theme_color: `#111111`,
```

- [ ] **Step 2: Full build**

Run: `yarn build`
Expected: build completes with no errors across all pages.

- [ ] **Step 3: Full manual pass in dev**

Run: `yarn develop`. Verify in BOTH light and dark mode:
- `/` — avatar, name, intro, Projects, Writing, Contact
- `/blog` — clean dated list
- one blog post — monochrome article, neutral ToC + code
- `/vibe-code-to-glory` — monochrome grid + modal + progress
- `/homeworkai/` and its sub-pages — monochrome, structure intact
- header nav active states, theme toggle, social links

- [ ] **Step 4: Commit**

```bash
git add gatsby-config.js
git commit -m "Update manifest to neutral theme colors"
```

---

## Self-review notes

- **Spec coverage:** tokens (T1), Inter (T1), prose cleanup (T1), shell/layout/header/social/toggler (T2), row primitives (T3), Projects list + schema (T4), avatar (T5), résumé homepage (T6), blog list (T7), blog post incl. ToC/code/Key-Takeaways/drop-Projects (T8), vibe monochrome (T9), homeworkai (T10), manifest (T11). All spec sections mapped.
- **Out of scope confirmed:** `side-project-to-glory.tsx` untouched; `react-github-calendar` left installed (usage removed in T6).
- **Type/name consistency:** `Section`/`Row`/`SectionLabel` defined in T3 and consumed in T4/T6/T7/T8 with matching signatures (`Row` takes `left`/`right`; `Section` takes `label`/`children`).
- **Line numbers** are from the current files at planning time and are guidance — match on the quoted class strings, which are unique.
