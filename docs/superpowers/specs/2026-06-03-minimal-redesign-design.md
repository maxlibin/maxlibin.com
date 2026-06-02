# maxlibin.com — Clean/Minimal Redesign

**Date:** 2026-06-03
**Status:** Approved design, pending implementation plan

## Goal

Rework the personal site into a cleaner, modern, minimal style inspired by
[mince-sign-gig.figma.site](https://mince-sign-gig.figma.site/) (ReadCV template)
and [williambout.me](https://williambout.me/). Move away from the current busy
6xl-bold hero + colorful indigo/gradient look toward a quiet, monochrome,
whitespace-driven résumé aesthetic.

## Reference DNA

Shared traits to adopt from both references:

- Narrow, centered single column (~640px)
- Avatar + name + short intro at the top
- Tiny uppercase section labels (`EXPERIENCE`, `FEATURES`, etc.)
- Two-column "title left / meta right" rows with thin dividers
- Small, restrained type (name ~18–20px, body 14–16px)
- Monochrome / warm-neutral palette, generous whitespace
- Inter font (Figma ref uses it exactly)

## Decisions (locked)

- **Scope:** whole site at once.
- **Theme:** keep light/dark toggle, but monochrome in both — no indigo, no gradients.
- **Font:** Inter.
- **Homepage:** restructure into ReadCV résumé format (drops GitHub repo cards,
  contribution calendar, interactive project selector).
- **Avatar:** real photo. Served from `static/avatar.jpg` (runtime path, no build-time
  import) with a committed neutral placeholder; user drops their headshot over it.
- **Vibe Code to Glory:** fully monochrome (keep grid + progress + modal behavior).
- **HomeworkAI pages:** in scope — apply tokens + Inter, neutralize accents, keep structure.
- `side-project-to-glory.tsx` is just a redirect → leave untouched.

## Design System

### Color — semantic CSS variables wired into Tailwind

Define variables in `src/styles/global.css` (`:root` and `.dark`) and map them in
`tailwind.config.js` `theme.extend.colors` so components use `text-fg`, `bg-bg`,
`border-line`, etc. — no `dark:` duplication.

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f8f8f7` | `#0c0a09` | page background |
| `surface` | `#ffffff` | `#171513` | cards |
| `fg` | `#111111` | `#fafaf9` | headings, emphasis, links |
| `muted` | `#555555` | `#a8a29e` | body text |
| `faint` | `#999999` | `#78716c` | dates, meta, section labels |
| `line` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.10)` | dividers, borders |

Dark mode continues to use the existing `class` strategy driven by `window.__theme`
(`gatsby-ssr.js` / toggler).

### Typography — Inter

- Load Inter via `gatsby-ssr.js` `<Head>` (preconnect + Google Fonts stylesheet).
  No new npm dependency.
- Set `body` font-family to Inter in `global.css`.
- Scale:
  - Home name: ~18px, weight 500
  - Section labels: 11px, uppercase, `tracking-wider`, `faint`, weight 500
  - Row title: 14–15px `fg`; row meta/date: 13px `faint`, right-aligned, tabular-nums
  - Body: 15–16px `muted`, relaxed leading
  - Post `h1`: ~30–36px, tight tracking (down from 6xl)
- Remove heavy global `h1..h6 { font-weight: bold }` and `h3 { font-size: 2rem }`
  defaults; scope prose typography under `.post`.

### Layout / spacing

- Centered column `max-w-2xl` (~640px), `px-6`, generous vertical rhythm
  (sections ~`mt-16`, rows `py-3` with `line` dividers).
- `Layout` accepts an optional `wide` prop (`max-w-5xl`) for the grid-heavy Vibe page.

## Components & Pages

### Shared shell

- **`layout.tsx`** — `bg-bg text-muted`, narrow centered column, optional `wide` prop,
  more breathing room.
- **`header.tsx`** — quiet top bar: small muted nav (Home · Blog · Vibe Code to Glory)
  left; social icons + theme toggle right; neutral with `fg` hover.
- **`social.tsx` / `toggler.tsx`** — restyled to tokens, monochrome.

### Homepage (`src/pages/index.tsx`) — résumé structure

1. **Top:** circular avatar (`/avatar.jpg`) → **Max Li Bin** → role line
   "Software Developer & Vibe Coder · Singapore" → 2–3 line intro including the
   "24 apps in 12 months" line linking to `/vibe-code-to-glory`.
2. **PROJECTS** — two-column rows: app name (left, external link with small `↗`) +
   category/platform (right, faint). From the apps in the `Projects` component data.
3. **WRITING** — two-column rows: post title (left) + date (right, faint), latest ~7
   from WordPress, then "All writing →".
4. **CONTACT** — username-style rows: X, GitHub, Email.

Dropped: GitHub repo cards, contribution calendar, interactive selector.
`react-github-calendar` dependency stays installed but unused (remove usage only).

### Blog list (`src/pages/blog.tsx`)

Narrow column, "Writing" heading. Each post = title (`fg`) + date (`faint`) with a
one-line muted excerpt, thin dividers between. Embedded `Projects` showcase removed.

### Blog post (`src/templates/blog-post.tsx`)

- Narrow reading column. Date → tight `h1` → clean monochrome prose
  (underlined `fg` links, neutral `blockquote`).
- Indigo "Key Takeaways" box → quiet neutral lead note.
- ToC sidebar kept, restyled monochrome (faint uppercase label, neutral hover).
- Code blocks keep syntax highlighting but switch to a neutral hljs theme + neutral
  left border (drop purple `#6611e2`). Update inline `p code` styling to neutral.
- Embedded `Projects` showcase removed; giscus comments kept, restyled
  (`data-theme` stays `preferred_color_scheme`).

### Vibe Code to Glory (`src/pages/vibe-code-to-glory.tsx`) — fully monochrome

- Gradient title → plain `fg` bold; subtitle/intro neutral.
- Progress bar: `fg` fill on `line` track.
- 24-slot grid cards restyled neutral (image + neutral overlay; neutral "Shipped"
  state; dashed empty slots in `line`).
- Modal restyled monochrome (drop pink/green/indigo badges and indigo buttons →
  neutral `fg`/`surface`/`line`).
- Grid / modal / progress behavior unchanged. Uses `Layout wide`.

### `Projects` component (`src/components/projects.tsx`)

Reworked into the clean two-column **projects list** used on the homepage; keeps the
per-project JSON-LD `SoftwareApplication` schema. No longer embedded on blog/post.

### HomeworkAI pages (`src/pages/homeworkai/{index,privacy,terms,support}.tsx`)

Apply Inter + monochrome tokens, neutralize accent colors, keep existing
structure/content. (Files to be read during implementation.)

### Misc

- `gatsby-config.js` manifest: `theme_color` and `background_color` updated from
  indigo `#6366f1` / `#111827` to the new neutral palette (`#111111` / `#0c0a09`).

## Out of scope

- `side-project-to-glory.tsx` (redirect only).
- Removing unused dependencies (`react-github-calendar`) — leave installed.
- New content/copywriting beyond restructuring existing content.

## Verification

- `yarn build` succeeds.
- `yarn develop` — manually verify: home, blog, a blog post, vibe page, homeworkai
  pages — in both light and dark mode.
- Visual check against references for spacing/type/monochrome feel.
