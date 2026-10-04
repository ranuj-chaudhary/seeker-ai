---
name: job-search-feature
description: Scaffold an end-to-end Seeker AI job-search capability — data model, AI endpoint, server action, and dashboard UI — by chaining the supabase-migration, gemini-endpoint, server-action, and shadcn-component skills. Use when building a new job/company/match feature or vertical slice.
---
# Job-Search Feature (end-to-end)

Use this to add a complete vertical slice for the job-search platform. Work in the
order below so each layer is consistent.

## 0. Context
- Re-read `memory-bank/` first, then confirm the requirement in one sentence.
- For anything larger than a small change, propose a short plan before editing.

## 1. Data model — use skill `supabase-migration`
- New table(s): e.g. `jobs`, `companies`, `saved_jobs`, `job_matches`.
- Owner-scoped columns (`user_id uuid references auth.users`), RLS, grants, comments.
- Regenerate `lib/database.types.ts`.

## 2. AI logic — use skill `gemini-endpoint`
- Add `app/api/jobs/<action>/route.ts` (search, match, summarize).
- Auth-gate, validate input, request **structured JSON**, validate the shape.
- Cache embeddings; batch calls; never trust model output as SQL/HTML.

## 3. Mutations — use skill `server-action`
- `app/jobs/actions.ts`: save job, unsave, update application status.
- Validate input, auth via `getClaims()`, redirect with `?error=`/`?message=`.

## 4. UI — use skill `shadcn-component`
- Feature components in `components/jobs/` (e.g. `job-card.tsx`, `job-list.tsx`,
  `match-badge.tsx`).
- Page in `app/dashboard/jobs/page.tsx` (Server Component) fetching via
  `@/lib/supabase/server`.
- Loading/empty/error states; accessible markup; Tailwind tokens only.

## 5. Wrap up
- Run `npm run lint` and `npx tsc --noEmit`.
- Update `memory-bank/activeContext.md`, `systemPatterns.md`, and `progress.md`.

## Definition of done
- [ ] Migration applied + types regenerated
- [ ] AI endpoint auth-gated and validated
- [ ] Server action(s) safe and idempotent
- [ ] UI with loading/empty/error states
- [ ] Lint + types clean
- [ ] Memory Bank updated
