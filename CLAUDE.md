# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: This project uses `pnpm` exclusively.

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:5173)
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Deploy to Cloudflare Pages
pnpm run deploy

# Linting (uses oxlint - Rust-based linter)
pnpm run lint

# Formatting (uses oxfmt - Rust-based formatter)
pnpm run format

# Type checking
pnpm run typecheck

# Generate Cloudflare types
pnpm run cf-typegen
```

**Node Version**: This project requires Node.js >= 24. Use `nvm use` to switch to the correct version.

## Architecture Overview

### Framework & Routing

- **React Router 7** with SSR enabled (`react-router.config.ts` sets `ssr: true`)
- Single-page architecture with all content on the home route (`app/routes/home.tsx`)
- Root layout in `app/root.tsx` handles global HTML structure, font preloading, and error boundaries
- Future flag enabled: `v8_viteEnvironmentApi`

### Styling System

**Tailwind CSS 4** with custom design tokens defined in `app/app.css`:

- Color palette: Background (`#000000`), Foreground (`#d0d0d0`), Muted (`#a3a3a3`), Primary (`#e36414` - orange accent)
- Custom fonts: Inter (sans), Geist Mono (monospace), Gloria Hallelujah (handwritten)
- Global radial gradient background centered at top with primary color glow
- Utility class: `.section-container` (max-w-2xl, centered, padding)
- Utility class: `.text-handwritten` (Gloria Hallelujah font)

### Component Structure

All major components are in `app/components/`:

- **Hero.tsx**: Header with name, title, bio, and social links (Globe, Mail, Github, Linkedin)
- **Experience.tsx**: Work history with company, role, location, dates
- **Projects.tsx**: Project showcase with title, description, status indicators, tags, and links (demo/github)
- **Skills.tsx**: Technical skills organized by category

**Animation Pattern**: Components use Framer Motion with:

- `initial={{ opacity: 0, y: 10 }}` or `x: 10`
- `animate` or `whileInView` with `viewport={{ once: true }}`
- Staggered delays for list items (`delay: index * 0.1`)

### Page Structure

The home page (`app/routes/home.tsx`) follows this section order:

1. Hero (no header)
2. Experience (with "EXPERIENCE" header)
3. Projects (with "PROJECTS" header)
4. Skills (with "SKILLS" header)
5. Footer with copyright and tech credits

Section headers use: `text-sm font-semibold text-primary uppercase tracking-widest border-b border-white/5`

### Deployment

- Deployed to **Cloudflare Pages** using Wrangler
- Worker entry point: `workers/app.ts`
- Configuration in `wrangler.jsonc` with compatibility date `2025-04-04`
- SSR rendered on Cloudflare's edge network

## Key Patterns

### Data Structure for Links

Projects and social links use a consistent pattern with `links` object containing optional `demo` and `github` properties:

```typescript
links: {
  demo?: string;    // External link icon
  github?: string;  // GitHub icon
}
```

### Status Indicators

Projects use color-coded status dots:

- Green (`bg-accent-green`): "Live" or "Completed"
- Orange (`bg-accent-orange`): In progress or other states

### Typography Hierarchy

- Page title: `text-3xl font-bold tracking-tight`
- Section headers: `text-sm font-semibold text-primary uppercase tracking-widest`
- Subsection titles: `text-white font-semibold group-hover:text-primary`
- Body text: `text-sm text-muted/80`

## Type Generation

The project uses automatic type generation:

- `postinstall` hook runs `cf-typegen` to generate Cloudflare Worker types
- `typecheck` runs both Cloudflare and React Router type generation before checking

## Vite Configuration

Build pipeline uses these Vite plugins (in order):

1. `@cloudflare/vite-plugin` - Cloudflare Pages integration with SSR environment
2. `@tailwindcss/vite` - Tailwind CSS 4
3. `@react-router/dev/vite` - React Router 7
4. `vite-tsconfig-paths` - Path aliases from tsconfig
