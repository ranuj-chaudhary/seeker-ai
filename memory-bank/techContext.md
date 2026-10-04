# Tech Context

## Technologies
- **Next.js 16.3.5** (App Router, React 19, Turbopack) — TypeScript strict
- **Tailwind CSS v4** (CSS-first, `app/globals.css`; no JS config)
- **shadcn/ui** (`base-mira` style, RSC enabled) + **hugeicons** (`@hugeicons/react`)
- **Supabase**: `@supabase/ssr`, `@supabase/supabase-js` (auth + Postgres, RLS)
- **Google Gemini**: `@google/genai` (model `gemini-flash-latest`)

## Development setup
- Install: `npm install`
- Dev: `npm run dev` (Next.js dev may rewrite `AGENTS.md` — leave that block alone)
- Build: `npm run build` · Lint: `npm run lint` · Types: `npx tsc --noEmit`

## Environment variables (`.env` / `.env.local`)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `GEMINI_API_KEY` (server-only)

## Constraints & notes
- Middleware lives in `proxy.ts` (function `proxy`), not `middleware.ts`.
- Supabase session reads use `auth.getClaims()`; the server client swallows cookie
  writes from Server Components (session refresh happens in `lib/supabase/proxy.ts`).
- Path alias `@/*` maps to the project root.
