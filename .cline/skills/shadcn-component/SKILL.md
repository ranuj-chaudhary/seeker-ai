---
name: shadcn-component
description: Build or add shadcn/ui + Tailwind v4 React components for Seeker AI (client or server components, feature components in components/<domain>, primitives in components/ui). Use when creating or styling UI, forms, cards, or dashboard widgets.
---
# shadcn / UI Component

## Where things go
- UI primitives (from shadcn) → `components/ui/` (e.g. `button.tsx`).
- Feature components → `components/<domain>/` (e.g. `components/dashboard/`, `components/auth/`).

## Conventions
- **Named exports**, no default exports: `export function JobCard() {}`.
- Server Component by default; add `"use client";` only for state/effects/handlers.
- Import via `@/` alias. Compose classes with `cn()` from `@/lib/utils`.
- Styling = Tailwind v4 utilities + design tokens only:
  `bg-card`, `text-card-foreground`, `text-muted-foreground`, `border-border`,
  `bg-primary`, `text-primary-foreground`, `text-destructive`, `ring-ring`.
- Icons: `@hugeicons/react`.
- Type props with a local `type XProps = { ... }`.
- Patterns to mirror: `components/dashboard/gemini-chat.tsx`,
  `components/auth/login-form.tsx`, `components/ui/button.tsx`.

## Adding a shadcn primitive
Run the CLI from the project root (don't hand-write vendored primitives unless needed):
```
npx shadcn@latest add <component>
```
`components.json` is already configured (base-mira, hugeicons, RSC).

## Accessibility
- Use `htmlFor`/`id` for inputs; `sr-only` labels for icon-only buttons.
- `aria-live="polite"` for async content; `role="alert"` for errors.
- Preserve focus-visible styles.

## Checklist
- [ ] Correct folder + named export
- [ ] `"use client"` only if required
- [ ] Tokens only (no hardcoded colors); `cn()` for conditionals
- [ ] Accessible labels/ARIA
- [ ] `npm run lint` clean
