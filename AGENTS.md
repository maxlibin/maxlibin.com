# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro-based personal site. Content is file-based; there is no external CMS.

- `content/blog/<slug>.md`: blog posts (frontmatter: `title`, `date`, `modified`, `excerpt`, optional `cover`). Images for a post sit in `content/blog/<slug>/` and are referenced relatively.
- `content/projects.json`, `content/challenges.json`: data for the homepage Projects section and the Vibe Code to Glory page; their images live in `content/projects/` and `content/challenges/`.
- `src/content.config.ts`: collection schemas (zod) for the three collections above.
- `src/pages/`: routes (`index.astro`, `blog.astro`, `[slug].astro` for posts at the site root, `vibe-code-to-glory.astro`, `forward-deployed-engineer.astro`, `homeworkai/*`). `*.md.ts` endpoints emit the Markdown-for-Agents variants.
- `src/layouts/Base.astro`: `<head>` (SEO meta + JSON-LD, theme/favicon bootstrap scripts, GA), header and main column.
- `src/components/`: `.astro` UI components; client behaviour is plain `<script>` blocks, no UI framework.
- `src/lib/`: site metadata, SEO helpers, collection queries, Markdown-for-Agents text.
- `src/styles/global.css`: Tailwind v4 entry, design tokens, `.post` prose styles.
- `public/`: static files copied as-is (icons, `avatar.jpg`, `robots.txt`, `llms.txt`, `files/` attachments).
- `netlify/edge-functions/markdown.ts`, `netlify.toml`: serves `index.md` on `Accept: text/markdown`, redirects, headers.
- `scripts/import-wordpress.mjs`: the one-off importer that produced `content/blog/` from the old WordPress site.
- `.github/workflows/build.yml`: CI that runs `yarn install --immutable`, `yarn astro check` and `yarn build` on PRs and pushes to `master`.
- `dist/`: generated build output (do not edit manually).

## Build, Test, and Development Commands
Use Yarn (the repo declares `yarn@4.12.0`). Node 22+ is required.

- `yarn`: install dependencies.
- `yarn dev`: run local dev server with hot reload.
- `yarn build`: create a production build in `dist/`.
- `yarn preview`: serve the production build locally.
- `yarn astro check`: type-check `.astro` and `.ts` files.
- `yarn format`: format `src/**/*.{astro,ts,css}` with Prettier.

## Coding Style & Naming Conventions
- Formatting is controlled by `.prettierrc`: 2-space tabs, no semicolons, double quotes, trailing commas (`es5`), LF line endings.
- Components and layouts are PascalCase `.astro` files; pages are kebab-case; `src/lib` modules are camelCase.
- Keep Tailwind utility usage readable and grouped logically in `class`.
- Astro 7 uses JSX-style whitespace: add `{" "}` where a space between inline elements matters.

## Testing Guidelines
There is no automated test framework configured.

- Before opening a PR, run `yarn astro check` and `yarn build` to catch type and build issues.
- Manually verify key routes in `yarn dev` (home, blog, a post with a ToC, Vibe Code to Glory, homeworkai pages).

## Commit & Pull Request Guidelines
- Keep commit messages short, imperative, and specific, matching existing history: `Add ...`, `Update ...`, `Improve ...`, `Remove ...`.
- PRs should include:
  - concise description of what changed and why,
  - linked issue (if applicable),
  - screenshots or short recordings for visible UI/content changes,
  - confirmation that `yarn build` succeeds locally.
