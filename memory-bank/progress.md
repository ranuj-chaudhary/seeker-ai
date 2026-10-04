# Progress

## What works
- [x] Next.js 16 + TypeScript + Tailwind v4 project scaffolded.
- [x] shadcn/ui configured (base-mira, hugeicons).
- [x] Supabase auth: email/password, Google OAuth, callback route.
- [x] `public.profiles` table with RLS + `auth.users` sync trigger.
- [x] Protected `/dashboard` with session guard via `proxy.ts`.
- [x] Gemini chat: `POST /api/chat` (auth-gated) + `GeminiChat` client component.
- [x] Cline setup: `.clineignore`, `.clinerules/`, `.cline/skills/`, `memory-bank/`.

## What's left to build
- [ ] Job data model + migrations (jobs, companies, saved_jobs, matches).
- [ ] Job search / ingest pipeline.
- [ ] AI matching (profile ↔ job) endpoint + UI.
- [ ] Profile editor (skills, experience, preferences).
- [ ] Tests and CI.

## Current status
Early-stage MVP. Auth foundation complete; core job-search + AI features pending.

## Known issues
- `AGENTS.md` is rewritten by `next dev`; its managed block must not be edited by hand.
- `.env.example` lists keys but real values live in `.env` (git-ignored).

## Evolution of decisions
- Kept a single `/api/chat` endpoint for AI; will add dedicated endpoints per feature.
