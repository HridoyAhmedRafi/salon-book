<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# salon-book

Single-package Next.js 16 (App Router) app, currently an empty scaffold: `src/app/page.tsx` renders placeholder text. Use npm (`package-lock.json`); the README is untouched create-next-app boilerplate and is not authoritative.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack is the default in Next 16; do not add `--turbopack`)
- `npm run lint` — `eslint` over the repo via `eslint.config.mjs`. There is no `next lint` in v16.
- `npx tsc --noEmit` — type check. No `typecheck` or `test` script exists, and there is no test runner.
- `npm run build` — production build; also runs the full type check. Run it when `tsc` alone is not enough (e.g. route type errors).
- `npx next typegen` — regenerate route types (`.next/types`, `.next/dev/types`) without building, which `PageProps`/`LayoutProps` depend on.

## Toolchain facts worth knowing

- Path alias `@/*` → `src/*` (see `tsconfig.json`).
- Tailwind v4 is wired through Turbopack, not PostCSS: `next.config.ts` loads `@tailwindcss/turbopack` for `*.css`, and `src/app/globals.css` is just `@import "tailwindcss";`. There is intentionally no `tailwind.config.*` or `postcss.config.*` — don't add one.
- React Compiler is enabled (`reactCompiler: true` + `babel-plugin-react-compiler`). Skip manual `useMemo`/`useCallback` and don't add a Babel config.
- `PageProps<'/route'>`, `LayoutProps<'/route'>`, and `RouteContext` are generated globals — no import needed (see `src/app/layout.tsx`). They only exist after dev/build/typegen has run.

## Next 16 API differences that bite

- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are async — await them.
- Middleware is the `proxy.ts` file convention, not `middleware.ts`.
- When unsure about an API or file convention, check `node_modules/next/dist/docs/` rather than memory; `01-app/02-guides/upgrading/version-16.md` lists the breaking changes.

## Repo state

- No CI, no pre-commit hooks, no OpenCode config, no committed env files (`.env*` is gitignored).
- Only two commits on `main`; expect to create directories, routes, and conventions from scratch as features land.
