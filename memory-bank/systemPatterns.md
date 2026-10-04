# System Patterns

## Architecture
- **App Router** with Server Components by default; client components only where
  interactivity is needed (`components/dashboard/gemini-chat.tsx`).
- **Auth flow:** Supabase SSR clients — browser (`lib/supabase/client.ts`),
  server (`lib/supabase/server.ts`), and session refresh/route guard
  (`lib/supabase/proxy.ts`) invoked from `proxy.ts` (middleware).
- **Data access:** Server Components and route handlers query Supabase directly
  with the typed `Database` client; RLS enforces row ownership.
- **AI access:** a single authenticated route handler (`app/api/chat/route.ts`)
  proxies requests to Gemini so the API key stays server-side.

## Key patterns
- **Server actions** for mutations/auth (`app/auth/actions.ts`) returning via
  `redirect()` with `?error=` / `?message=` params.
- **Auth guard in route handlers:** `supabase.auth.getClaims()` → `claims.sub`.
- **Defensive validation** with type guards before trusting input.
- **Consistent error responses:** `Response.json({ error }, { status })` with
  400/401/502/503 codes.
- **RLS-first schema:** owner-scoped policies using `(select auth.uid())`, plus an
  `auth.users` → `public.profiles` sync trigger.

## Component relationships
```
proxy.ts (middleware)
  └─ lib/supabase/proxy.ts  → refresh session + guard /dashboard & auth routes

app/dashboard/page.tsx (Server Component)
  ├─ lib/supabase/server.ts → getClaims + profiles query
  └─ components/dashboard/gemini-chat.tsx ("use client")
        └─ POST /api/chat → app/api/chat/route.ts → @google/genai
```

## Critical paths
- `proxy.ts` → `lib/supabase/proxy.ts` (all request routing/auth).
- `app/api/chat/route.ts` (the Gemini integration point).
- `supabase/migrations/*` + `lib/database.types.ts` (schema source of truth).
