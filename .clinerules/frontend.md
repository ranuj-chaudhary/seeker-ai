---
paths:
  - "app/**"
  - "components/**"
---
# Frontend — React / Next.js App Router

- **Server Components by default.** Add `"use client"` only when you need state,
  effects, refs, or event handlers (e.g. `components/dashboard/gemini-chat.tsx`).
- **Named exports** for components: `export function GeminiChat()` — no default exports.
- Import via the `@/` alias (e.g. `@/components/ui/button`).
- UI primitives live in `components/ui/`; feature components are grouped by domain
  (`components/auth`, `components/dashboard`).
- **Styling:** Tailwind v4 utility classes only. Compose conditional classes with
  `cn()` from `@/lib/utils`.
- Use design tokens, never hardcoded colors: `bg-card`, `text-muted-foreground`,
  `border-border`, `text-destructive`, `bg-primary`, `ring-ring`.
- **Icons:** use `@hugeicons/react` (this is the configured icon library).
- **Accessibility:** associate labels (`htmlFor`/`id`), use `aria-live="polite"` for
  async regions, `role="alert"` for errors, and `sr-only` labels for icon-only controls.
- **Images:** use `next/image`; whitelist any remote host in `next.config.ts`.
- Pages are `async` and authenticate via `createClient()` from
  `@/lib/supabase/server` + `supabase.auth.getClaims()`; redirect to
  `/login?next=<path>` when unauthenticated.
- Use `LayoutProps<"/...">` typing for route layouts (see `app/layout.tsx`).
