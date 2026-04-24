# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**supreme-visual-effects** is a Vue 3 component library providing 17+ visual effect components (particles, parallax, text animations, 3D carousel, etc.) with GPU-accelerated performance and automatic fallbacks.

## Essential Commands

```bash
pnpm i              # Install dependencies
pnpm dev            # Start playground (Vite HMR)
pnpm build          # Build library (Vite → Rollup)
pnpm build:lib      # Build library (Rollup directly, produces CJS + ESM + DTS)
pnpm test           # Run Vitest in watch mode
pnpm test:run       # Run Vitest once (CI-friendly)
pnpm test:coverage  # Run tests with coverage (v8 provider, ≥80% thresholds)
pnpm lint           # ESLint --fix for .vue/.js/.ts/.tsx
pnpm format         # Prettier --write
pnpm docs:dev       # VitePress docs dev server
pnpm docs:build     # Build static docs
pnpm release        # Changesets publish to npm
```

## Architecture

### Entry Point

`src/index.ts` is the library entry. It exports:

- `createSupremeEffects(options)` — Vue plugin factory; auto-registers all components and directives via `app.use()`
- All 17 components individually (for tree-shaking)
- All composables from `src/composables/`
- `VRipple` directive
- Default export: a pre-configured plugin instance

### Directory Structure

```
src/
  index.ts                  # Library entry + Vue plugin
  composables/              # Shared reactive utilities
    useBrowser.ts           # Browser detection, rAF helpers
    useAnimation.ts         # Animation engine with 20+ easings
    useIntersectionObserver.ts  # Scroll visibility composable
    useResizeObserver.ts    # Element resize detection
    useReducedMotion.ts     # Accessibility: prefers-reduced-motion
  components/               # All V-prefixed Vue SFCs
  directives/               # v-ripple.ts
  styles/themes.css         # CSS variable theme system (light/dark/high-contrast/purple)
  test/                     # Test files mirroring src/ structure
    components/             # Per-component .test.ts files
    composables/            # Per-composable .test.ts files
    directives/             # Directive tests
    setup.ts                # Vitest global setup
```

### Build System

Two build pipelines coexist:

- **Vite** (`vite build`) — used by `pnpm build`, outputs from `src/index.ts`
- **Rollup** (`rollup.config.ts`) — used by `pnpm build:lib`, produces CJS + ESM + DTS bundles

Both externalize `vue` as a peer dependency.

### Testing

- **Framework**: Vitest + jsdom + @vue/test-utils
- **Config**: `vitest.config.ts` — globals enabled, v8 coverage provider
- **Thresholds**: 80% for branches, functions, lines, statements
- **Setup**: `src/test/setup.ts` — global test utilities

### Conventions

- **Commit messages**: Conventional Commits via commitlint (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `chore:`, etc.)
- **Husky + lint-staged**: Pre-commit hooks auto-format staged files
- **Components**: Vue 3 SFCs (`.vue`), prefixed with `V`, using `<script setup>` or Options API
- **Composables**: `use*` naming convention, return reactive refs/objects
- **Theming**: CSS custom properties on `:root` / `[data-sve-theme]` via `themes.css`
- **Path alias**: `@/*` maps to `src/*`
