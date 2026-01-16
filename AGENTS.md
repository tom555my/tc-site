# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-16
**Commit:** b79161b
**Branch:** main

## OVERVIEW

Personal portfolio + blog. React Router 7 SSR on Cloudflare Pages with Tailwind CSS 4, Framer Motion animations.

## STRUCTURE

```
tc-site/
├── app/
│   ├── components/     # Hero, Experience, Projects, Skills, OgImage
│   ├── lib/            # blog.server.ts (virtual module), animations.ts
│   ├── routes/         # 3 content + 3 OG image generation routes
│   ├── app.css         # Tailwind 4 @theme tokens, prose styles
│   ├── entry.server.tsx
│   ├── root.tsx        # Layout, fonts, error boundary
│   └── routes.ts       # Explicit route config (not file-based)
├── content/blog/       # MDX posts with gray-matter frontmatter
├── workers/app.ts      # Cloudflare Worker entry → React Router
├── vite.config.ts      # Plugin chain + custom blogPostsPlugin
└── wrangler.jsonc      # Cloudflare deployment
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add route | `app/routes.ts` + new file in `app/routes/` | Explicit config, not file-based |
| Add blog post | `content/blog/*.mdx` | Frontmatter: title, date, excerpt, tags |
| Design tokens | `app/app.css` @theme block | Colors, shadows, easing, fonts |
| Animation presets | `app/lib/animations.ts` | springs, fadeInUp, staggerContainer |
| OG image styling | `app/components/OgImage.tsx` | workers-og with Google Fonts |
| Cloudflare env vars | `wrangler.jsonc` vars | Accessed via context.cloudflare.env |
| Add component | `app/components/` | PascalCase, Framer Motion pattern |

## REQUEST FLOW

```
HTTP → workers/app.ts → createRequestHandler → routes.ts
     → loader() → entry.server.tsx → root.tsx → RouteComponent
```

## CONVENTIONS

### Package Manager
- **pnpm ONLY** (not npm, not yarn)
- **Node.js >= 24** (.nvmrc, .node-version, engines)

### Tooling (Rust-based)
- `pnpm run lint` → oxlint (app/ only)
- `pnpm run format` → oxfmt (tabs, single quotes, trailing comma)
- `pnpm run typecheck` → cf-typegen + react-router typegen + tsc -b

### Vite Plugin Order (CRITICAL)
1. cloudflare (SSR env)
2. tailwindcss
3. blogPostsPlugin (virtual:blog-posts)
4. mdx + rehype-pretty-code
5. reactRouter
6. tsconfigPaths

### Animation Pattern
```tsx
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>{/* ... */}</motion.div>
  ))}
</motion.div>
```
- Always use presets from `app/lib/animations.ts`
- `viewport={{ once: true, margin: '-50px' }}`

### Route Meta
Every route exports `meta()` with: title, description, og:image, twitter:card

### Typography
- Section headers: `text-sm font-semibold text-primary uppercase tracking-widest`
- Body: `text-sm text-muted/80`
- Dates: `text-xs text-muted/60 font-mono italic`

### Links Pattern
```ts
links?: { demo?: string; github?: string }  // ExternalLink or GitHub icon
```

### Status Colors
- Green (`bg-accent-green`): Live/Completed
- Orange (`bg-accent-orange`): In Progress

## ANTI-PATTERNS

- ❌ npm/yarn (pnpm only)
- ❌ File-based routing (use explicit routes.ts)
- ❌ Node.js fs in runtime (content via virtual module only)
- ❌ Custom animation configs (use presets)
- ❌ Inline styles for design tokens (use Tailwind theme)

## UNIQUE PATTERNS

### Virtual Blog Module
Content read at BUILD time via custom Vite plugin:
```ts
import allPosts from 'virtual:blog-posts';  // in blog.server.ts
```
Works on Cloudflare Workers where fs doesn't exist.

### OG Images as Routes
`/og-image-home`, `/og-image/:slug` return ImageResponse, not HTML.
Component: `OgImage.tsx` with workers-og.

### Dual TypeScript Configs
- `tsconfig.cloudflare.json` → app + workers (bundler module resolution)
- `tsconfig.node.json` → vite.config.ts only

### Path Alias
`~/` → `./app/` (tsconfig.cloudflare.json)

## COMMANDS

```bash
pnpm run dev        # localhost:5173
pnpm run build      # production build
pnpm run deploy     # build + wrangler deploy
pnpm run typecheck  # full type check pipeline
pnpm run lint       # oxlint
pnpm run format     # oxfmt
```

## NOTES

- **No tests** - testing framework not configured
- **No CI/CD** - deployment is manual via `pnpm run deploy`
- **postinstall** runs `cf-typegen` → generates worker-configuration.d.ts
- `any` types in vite.config.ts (rehype callbacks) and animations.ts are intentional for external libs
- SSR waits for `allReady` on bots (isbot detection)
