<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# salon-book

Single npm package: Next.js 16 App Router salon-booking app with public pages, customer and admin dashboards, and Better Auth. The README is untouched create-next-app boilerplate; trust `package.json` and the source.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack is the default in Next 16; do not add `--turbopack`).
- `npm run lint` — flat `eslint` config in `eslint.config.mjs`. There is no `next lint` in v16.
- `npx tsc --noEmit` — type check (currently clean).
- `npm run build` — production build; also runs the full type check. Use it for route-type errors that `tsc` alone misses.
- `npx next typegen` — regenerate route types (`.next/types`, `.next/dev/types`) without building; `PageProps`/`LayoutProps` need this or a dev/build run first.
- No test runner and no `test` script exists. Don't invent one.

## Environment and data sources

`.env` is gitignored but required. Verified keys: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_BASE_URL`.

- Better Auth persists users in MongoDB database `salon-book-db` (hard-coded in `src/lib/auth.ts`).
- Services and appointments are **not** in this Next app: they come from a separate external API at `NEXT_PUBLIC_BASE_URL`. All domain calls live in `src/lib/apis/{get,mutation}`. The only Next route handler is the Better Auth catch-all at `src/app/api/auth/[...all]/route.ts` — don't move domain data into Next routes without confirming.
- Server components read the session with `auth.api.getSession({ headers: await headers() })`; client code uses `authClient`/`useSession` from `src/lib/auth-client.ts`.
- `role` and `isBlocked` are Better Auth `additionalFields` with `input: false`, so sign-up always creates `role: "customer"`. Create an admin by editing the user document in MongoDB.
- Home and `/services` render server-side from the external API with `cache: "no-store"`; they fail if that API is unreachable. `getServices`/`getServiceById` return JSON without checking `res.ok`; `getAppointmentByUserId` throws on non-OK.

## Auth and routing conventions

- `src/app/dashboard/admin/layout.tsx` and `src/app/dashboard/customer/layout.tsx` call `requiredRole("admin" | "customer")`, which redirects to `/unauthorized`. `DashboardSidebar` separately redirects missing roles to `/sign-in`.
- Dashboard URL is role-driven: `/dashboard/${role}` (see `NavbarActions`).
- Admin menu items exist for manage-services, manage-appointments, manage-users, transactions, and profile, but only add-service and the list placeholder are implemented; most admin pages are stubs.

## Architecture notes

- Routes: `/`, `/services`, `/services/[id]`, `(auth)/sign-in|sign-up`, `/dashboard/{admin,customer}/...`, `/unauthorized`, and the auth API catch-all.
- Components are grouped by feature (`home`, `shared`, `browse-services`, `Appointment`, `dashboard`); generated shadcn primitives live in `src/components/ui`.
- The appointments API returns capitalized `Status`, `PaymentStatus`, and `postedAt`; `getAppointmentByUserId` normalizes these to `status`, `paymentStatus`, `createdAt`. Use the normalized `IAppointmentPost` in UI, not `IAppointmentDocument`.
- Customer rules live in `appointment-rules.ts`: cancel only when `Pending`; pay only when `Confirmed` and `Unpaid`.
- Prices are Bangladeshi Taka: use `formatPrice` from `src/lib/format.ts` (৳) and `formatDate` for UTC-safe date-only display.

## Toolchain quirks

- Path alias `@/*` → `src/*` (see `tsconfig.json`).
- Tailwind v4 is wired through Turbopack, not PostCSS: `next.config.ts` loads `@tailwindcss/turbopack` for `*.css`, and `globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`. There is intentionally no `tailwind.config.*` or `postcss.config.*` — don't add one.
- UI primitives are shadcn `base-nova` components built on `@base-ui/react`, **not Radix**. Use the `render` prop for polymorphism (e.g. `<Button render={<Link href="..." />}>`); `asChild` does not exist here. `cn` is re-exported from `@/lib/utils`, backed by the `cn` package.
- React Compiler is enabled (`reactCompiler: true` + `babel-plugin-react-compiler`). Skip manual `useMemo`/`useCallback` and don't add a Babel config.
- `images.remotePatterns` allows any HTTPS host, so `next/image` accepts arbitrary service image URLs.
- Theming uses `next-themes` with the `.dark` class; color tokens (`bg-primary`, `text-muted-foreground`, etc.) come from `globals.css`. Some older components hard-code brand hexes (`#d2a01f`, `#d1234c`) instead.

## Next 16 API differences that bite

- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are async — await them.
- Middleware is the `proxy.ts` file convention, not `middleware.ts` (none exists yet).
- `PageProps<'/route'>`, `LayoutProps<'/route'>`, and `RouteContext` are generated globals — no import needed, and only available after dev/build/typegen.
- When unsure about an API or file convention, check `node_modules/next/dist/docs/` rather than memory; `01-app/02-guides/upgrading/version-16.md` lists the breaking changes.

## Repo state

- No CI, no pre-commit hooks, no OpenCode config, no committed env files.
- Dashboard/profile pages are largely placeholders, so expect to build features from scratch rather than extend existing patterns there.
