# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

`@gfazioli/mantine-lens-select` — A Mantine 9 fisheye/lens magnification select component for React. Displays items with a macOS Dock-like magnification effect on hover. Supports count mode (`count` prop), range mode (`min`/`max`/`step`), and custom data arrays.

## Commands

| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package (Rollup + DTS + CSS extraction) |
| `yarn test` | Full test suite: syncpack → prettier → typecheck → lint → jest |
| `yarn jest` | Run only Jest unit tests |
| `yarn jest --testPathPattern=LensSelect` | Run tests for a single component |
| `yarn dev` | Start docs dev server at http://localhost:9281 |
| `yarn storybook` | Start Storybook at http://localhost:8271 |
| `yarn docgen` | Generate `docs/docgen.json` from component TypeScript types |
| `yarn docs:build` | Run docgen + build Next.js static site |
| `yarn docs:deploy` | Build docs + deploy to GitHub Pages |
| `yarn prettier:write` | Auto-fix formatting (run this if prettier check fails after template propagation) |
| `yarn release:patch` | Bump patch version, publish to npm, deploy docs |
| `diny yolo` | AI-assisted git commit (stages all, generates message, commits + pushes) |

## Architecture

**Monorepo with two Yarn workspaces:**

- `package/` — The publishable npm package. Source lives in `package/src/`. Built artifacts go to `package/dist/` (ESM `.mjs`, CJS `.cjs`, `.d.ts`, `styles.css`).
- `docs/` — Next.js 15 static site with MDX support. Uses `workspace:*` to reference the local package. Deployed to GitHub Pages via `gh-pages`.

**Build pipeline** (`yarn build`):
1. Rollup bundles `package/src/index.ts` → ESM + CJS with `preserveModules`
2. `scripts/generate-dts.ts` produces `.d.ts` and `.d.mts` declarations
3. `scripts/prepare-css.ts` extracts CSS into `styles.css` and `styles.layer.css`

CSS class names are hashed with the prefix `me` via `hash-css-selector`. Non-index chunks get a `'use client';` banner automatically.

## Component Authoring Pattern

Every component follows Mantine's Styles API pattern. Use the LED component (`package/src/LensSelect.tsx`) as the canonical reference:

1. **Factory type** — Define a `PolymorphicFactory` type specifying props, default element, stylesNames, variants, and CSS variables.
2. **Props interface** — Extend `BoxProps` + your base props + `StylesApiProps<YourFactory>`.
3. **Default props** — Declare a `defaultProps` partial object.
4. **CSS Variables resolver** — Use `createVarsResolver<YourFactory>()` to map props to CSS custom properties.
5. **Component body** — Use `polymorphicFactory()` with `useProps()` and `useStyles()` hooks. Render via Mantine's `Box` with `getStyles('partName')` and `mod` for data attributes.
6. **Attach classes** — Set `Component.classes = classes` and `Component.displayName`.

### Exports pattern (`package/src/index.ts`)
Export the component and its public types (base props, CSS variables type, factory type). Do not export internal types.

### CSS Modules (`Component.module.css`)
- Use CSS custom properties (`--component-*`) for all dynamic values
- Define sizes via `--component-size-{xs,sm,md,lg,xl}`
- Use `[data-attribute]` selectors for state/variant styling
- Animations go in `@keyframes` within the module

### Testing (`Component.test.tsx`)
- Import `render` from `@mantine-tests/core` (not directly from `@testing-library/react`)
- Test: renders without crashing, forwards ref, data attributes for props/variants/states
- Jest with jsdom; CSS modules are mocked via `identity-obj-proxy`

### Storybook (`Component.story.tsx`)
Stories live alongside source. Storybook runs on port 8271.

## Documentation Site

- `docs/data.ts` — Package metadata (name, description, repo URL, author)
- `docs/docs.mdx` — Main documentation content
- `docs/demos/` — Interactive demos using `@mantinex/demo`
- `docs/pages/index.tsx` — Assembles Shell, PageHeader, DocsTabs, and the MDX content
- `docs/styles-api/` — Styles API data for the documentation table
- `docs/docgen.json` — Auto-generated from TypeScript types (don't edit manually)

The `next.config.mjs` dynamically sets `basePath` from the repository field in `package/package.json`.

## Code Style

- oxfmt: 100 char width, single quotes, trailing commas, sorted imports (styles → react → third-party → @mantine → local)
- oxlint for linting
- Stylelint: `stylelint-config-standard-scss` (relaxed)
- Syncpack enforces consistent dependency versions across workspaces

## Tech Stack

- **Mantine 9.x**, **React 19**, **TypeScript 6**
- **Yarn 4** (node-modules linker, not PnP)
- **Rollup** for package builds, **esbuild** for transpilation
- **Next.js 15** with static export for docs
- **Jest 29** with jsdom for tests
- **Storybook 8** with React-Vite framework
