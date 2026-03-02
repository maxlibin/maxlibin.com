# Repository Guidelines

## Project Structure & Module Organization
This repository is a Gatsby-based personal site.

- `src/pages/`: route-level pages (for example `index.tsx`, `blog.tsx`).
- `src/components/`: reusable UI and content components.
- `src/templates/`: Gatsby page templates (for example `blog-post.tsx`).
- `src/hooks/`: shared React hooks (`use-site-metadata.tsx`).
- `src/styles/`: global styles (`global.css`).
- `src/assets/`: static source assets and manifest.
- `public/`: generated build output (do not edit manually).
- Root config: `gatsby-config.js`, `gatsby-node.js`, `tailwind.config.js`, `netlify.toml`.

## Build, Test, and Development Commands
Use Yarn (the repo declares `yarn@4.12.0`).

- `yarn`: install dependencies.
- `yarn develop`: run local dev server with hot reload.
- `yarn start`: alias for `yarn develop`.
- `yarn build`: create a production build in `public/`.
- `yarn serve`: serve the production build locally.
- `yarn format`: format `src/**/*.{js,jsx}` with Prettier.

## Coding Style & Naming Conventions
- Formatting is controlled by `.prettierrc`: 2-space tabs, no semicolons, double quotes, trailing commas (`es5`), LF line endings.
- Follow existing React/Gatsby patterns: functional components and default exports for page/template components where already used.
- Component and page files use lower camel case or kebab-like naming already present in repo (examples: `latestPosts.tsx`, `blog-post.tsx`); keep naming consistent with nearby files.
- Keep Tailwind utility usage readable and grouped logically in `className`.

## Testing Guidelines
There is no automated test framework configured yet (no Jest/Vitest/Cypress setup).

- Before opening a PR, run `yarn build` to catch compile/runtime build issues.
- Manually verify key routes in `yarn develop` (home, blog, side-project pages).
- If you add automated tests, place them near source files (for example `Component.test.tsx`) and document the command in `package.json`.

## Commit & Pull Request Guidelines
- Keep commit messages short, imperative, and specific, matching existing history: `Add ...`, `Update ...`, `Improve ...`, `Remove ...`.
- PRs should include:
  - concise description of what changed and why,
  - linked issue (if applicable),
  - screenshots or short recordings for visible UI/content changes,
  - confirmation that `yarn build` succeeds locally.
