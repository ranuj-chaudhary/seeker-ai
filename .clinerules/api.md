---
paths:
  - "app/api/**"
  - "app/auth/**"
---
# Backend — Route Handlers & Server Actions

## Route handlers (`app/api/**/route.ts`)
- **Authenticate first:**
  ```ts
  const supabase = await createClient(); // @/lib/supabase/server
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) return Response.json({ error: "..." }, { status: 401 });
  ```
- Validate **all** input defensively with type guards; return
  `Response.json({ error: "..." }, { status })` using correct codes
  (400 invalid input, 401 unauthenticated, 502 upstream failure, 503 not configured).
- Wrap external calls in `try/catch`; `console.error` the real error and return a
  safe, user-friendly message — never leak internals or stack traces.
- Environment secrets are read from `process.env.*` **server-side only**; never import
  server secrets into a `"use client"` component.

## Server Actions (follow `app/auth/actions.ts`)
- File starts with `"use server";`.
- Accept `FormData`, trim fields with a small helper, then `redirect(...)` with
  `?error=` / `?message=` query params.
- **`redirect()` throws** — call it as the final statement, never inside `try/catch`.
- Validate: password length (>= 8), sanitize redirect targets with `safeNextPath`
  (must start with `/` but not `//`).
- Keep error copy consistent with existing pages.
