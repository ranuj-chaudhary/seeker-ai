# Seeker AI — Project Instructions

You are working on **Seeker AI**, an AI-powered job-search platform built with
Next.js (App Router), Supabase, and Google Gemini.

## Working agreement
- **Read `memory-bank/` before starting any task.** It is the source of truth for
  context; only read additional files that the task actually requires.
- Keep changes small and focused. Match existing patterns instead of inventing new ones.
- Never hardcode secrets — use environment variables.
- Before finishing non-trivial work run: `npm run lint` and `npx tsc --noEmit`.
- Ask before adding a new dependency or changing the framework configuration.

## IMPORTANT: this is Next.js 16 (App Router) — not what you remember
APIs and conventions may differ from your training data. Before writing Next.js
code, consult the bundled guide at `node_modules/next/dist/docs/`. Notes:
- Middleware is defined in **`proxy.ts`** (exported function is `proxy`) — not `middleware.ts`.
- Use `LayoutProps<"/">` / route typing helpers as already used in `app/layout.tsx`.
- Supabase auth sessions are read with `supabase.auth.getClaims()` (not `getUser()`).

## Stack
- Next.js 16.3.5 · React 19 · TypeScript (strict) · Turbopack
- Tailwind CSS v4 (CSS-first, configured in `app/globals.css`) — no `tailwind.config`
- shadcn/ui (`base-mira` style, `hugeicons` icon library) in `components/ui/`
- Supabase (`@supabase/ssr`, `supabase-js`) — auth + Postgres with RLS on every table
- Google Gemini via `@google/genai`

## Project layout
```
app/
  api/chat/route.ts        # Gemini chat endpoint (auth-gated)
  auth/actions.ts          # server actions: sign in/up/out, Google OAuth
  auth/callback/route.ts   # OAuth/email confirm callback
  dashboard/page.tsx       # protected page
  login/ · signup/         # auth pages
  layout.tsx · page.tsx · globals.css
components/
  auth/ · dashboard/       # feature components
  ui/                      # shadcn primitives
lib/
  supabase/client.ts       # browser client
  supabase/server.ts       # server client
  supabase/proxy.ts        # session refresh + route guards
  database.types.ts        # generated DB types
  utils.ts                 # `cn` helper
supabase/migrations/       # SQL migrations (timestamped)
memory-bank/               # persistent project context (see memory-bank rule)
```

## Conventions
- Import with the `@/` alias (e.g. `@/lib/supabase/server`).
- TypeScript strict — no `any`; prefer explicit types and `type` over `interface` for props.
- Named exports for components and helpers (no default exports except pages/layouts).
- Formatting: 2-space indent, double quotes, semicolons, trailing commas.

## Commands
- `npm run dev` — start dev server (auto-rewrites `AGENTS.md`; leave that block alone)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check
