# Active Context

## Current focus
- Establishing project conventions and Cline setup (rules, skills, memory bank)
  before building the core AI job-search features.
- Branch: `feature/setting-up-supabase`.

## Recent changes
- Added Cline configuration: `.clineignore`, `.clinerules/`, `.cline/skills/`,
  and this `memory-bank/`.
- Auth (email/password + Google OAuth) and profile sync trigger are in place.
- Dashboard with a Gemini chat assistant (`/api/chat`) is working.

## Next steps (candidate)
1. Define the job data model (jobs, companies, saved jobs, matches) via migrations.
2. Add job search/ingest + AI matching endpoints using the `gemini-endpoint` skill.
3. Build dashboard UI for jobs and matches.
4. Persist user profile skills/experience and feed them into AI prompts.

## Active decisions
- Keep Gemini server-side only; never expose `GEMINI_API_KEY` to the client.
- Prefer structured JSON output from the model for anything written to the DB.
- Develop token-consciously: rely on rules/skills/memory bank instead of re-reading files.

## Open questions
- Job data source: external API, scraping, or user-supplied?
- Embeddings-based matching vs. prompt-only matching for v1?
