# laza-portfolio

Ariel Lázaro's single-page portfolio, rebuilt from a static `index.html` into a typed component architecture on **Astro 7** + **Tailwind CSS 4** (via `@tailwindcss/vite`).

## Commands

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Start dev server at `localhost:4321`      |
| `npm run build`   | Build the static site to `./dist/`        |
| `npm run preview` | Preview the production build locally      |

## How it fits together

- **`src/layouts/Layout.astro`** — document shell: meta, fonts, `is:inline` anti-flash script (restores saved theme + language from `localStorage` before first paint) and the client behavior entry point.
- **`src/components/`** — one component per section: `StatusBar`, `Nav`, `Rail`, `Hero`, `About`, `Projects`, `Stack`, `Experience`, `Code`, `Contact`, `Footer`.
- **`src/data/`** — typed content modules — `projects.ts`, `stack.ts`, `repos.ts` — and `i18n.ts`, the full EN/ES copy dictionary (English values double as the server-rendered defaults).
- **`src/scripts/app.ts`** — the single client script: theme switch, language swap, mobile menu, project filters, stack tabs, copy-to-clipboard, the demo contact form with live issue preview, activity grid, reveal-on-scroll, scroll-spy and footer clock.
- **`src/styles/global.css`** — Tailwind entry (`@import "tailwindcss"`) plus the design tokens. Runtime theme tokens live on `:root` / `html[data-theme="light"]` and are mapped to Tailwind utilities with `@theme inline` (`text-accent`, `font-display`, …) so `data-theme` attribute switching keeps working. Component classes (`.btn`, `.case`, `.gitlog`, …) sit in `@layer components`; Tailwind utilities can still override them per-element.

## Behavior notes

- The page is a single route. Language (EN/ES) and theme (dark/light) are client-side, persisted under `al.lang` / `al.theme`, auto-detected from `navigator.language` / `prefers-color-scheme` on first visit — identical to the original static file.
- Interactive sections (filters, tabs, form) are progressively enhanced with plain DOM scripts; the static HTML carries all content, so the page renders fully with scripts disabled.
- The remaining custom styling is intentional: the design system is token-driven (`oklch` colors per theme, `color-mix` blends, gradients), which utilities would only re-encode; utilities are used for one-off overrides (spacing, sizing) that the original did with inline styles.
