# Repository Guidelines

## Project Structure & Module Organization

This is a React Router 7 SSR portfolio and blog deployed to Cloudflare Pages.
Application code lives in `app/`: components in `app/components/`, route modules
in `app/routes/`, shared helpers in `app/lib/`, and Tailwind 4 tokens in
`app/app.css`. Register routes explicitly in `app/routes.ts`; this project does
not use file-based routing. Blog posts are MDX files in `content/blog/`, loaded
at build time through `virtual:blog-posts`. Static assets belong in `public/`,
and the Worker entry is `workers/app.ts`.

## Build, Test, and Development Commands

Use `pnpm` only.

- `pnpm install` installs dependencies and refreshes Cloudflare type bindings.
- `pnpm run dev` starts the local React Router dev server at
  `http://localhost:5173`.
- `pnpm run build` creates a production build.
- `pnpm run lint` runs `oxlint` against `app/`.
- `pnpm run format` formats the repository with `oxfmt`.
- `pnpm run typecheck` regenerates Cloudflare and React Router types, then runs `tsc -b`.
- `pnpm run preview` builds and serves the production output with Vite.
- `pnpm run deploy` builds and deploys with Wrangler.

## Coding Style & Naming Conventions

Target Node.js 24 or newer. TypeScript, React, and MDX files use tabs, single
quotes, semicolons, trailing commas, and an 80-column print width via `oxfmt`.
Name components with PascalCase, such as `Hero.tsx`; name route files with React
Router conventions, such as `blog.$slug.tsx`. Use the `~/` alias for imports
from `app/`. Keep animations on presets from `app/lib/animations.ts`, and use
Tailwind theme tokens instead of inline design values.

## Testing Guidelines

No test framework is currently configured. Before opening a pull request, run
`pnpm run lint`, `pnpm run typecheck`, and `pnpm run build`. For UI changes,
also run `pnpm run dev` and manually verify affected routes, responsive layouts,
MDX rendering, and OG image routes such as `/og-image-home`.

## Commit & Pull Request Guidelines

Recent history uses short imperative subjects, often with Conventional Commit
prefixes such as `feat:`. Prefer examples like `feat: add blog metadata` or
`refactor: simplify project cards`. Pull requests should include a summary,
validation commands, linked issues when applicable, and screenshots for visible
UI changes.

## Architecture & Configuration Notes

The request path is `workers/app.ts` to React Router's request handler, then
`app/routes.ts`, route loaders, `app/entry.server.tsx`, and `app/root.tsx`.
Runtime code must not read blog content from Node `fs`; content access belongs
in the build-time Vite plugin. Keep the Vite plugin order intact: Cloudflare,
Tailwind, blog posts, MDX, React Router, then tsconfig paths.
