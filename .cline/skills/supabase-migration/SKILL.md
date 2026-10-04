---
name: supabase-migration
description: Create or change Seeker AI's Supabase/Postgres schema — new tables, columns, indexes, RLS policies, grants, and triggers — as an idempotent SQL migration. Use whenever a task involves the database, tables, policies, or Supabase types.
---
# Supabase Migration

Create a new file: `supabase/migrations/YYYYMMDDHHMMSS_<snake_case_description>.sql`.

## Rules (non-negotiable)
- **Idempotent:** `create table if not exists`, `drop policy if exists` before
  `create policy`, `create or replace function`, `drop trigger if exists`.
- **RLS is mandatory** on every new table:
  `alter table public.<t> enable row level security;`
- Policies scoped `to authenticated`, owner-scoped rows filter on
  `(select auth.uid())`; use `with check` for insert/update.
- Grant only what's needed: `grant select, insert, update, delete on table public.<t> to authenticated;`
- Add `comment on table public.<t> is '...';`
- Trigger functions: `language plpgsql security definer set search_path = public`
  and `revoke execute on function public.<fn>() from public, anon, authenticated;`.

## Steps
1. Read the latest file in `supabase/migrations/` to match style.
2. Start from [templates/migration.sql](templates/migration.sql).
3. Write the migration.
4. Remind the user to apply it (`supabase db push` or run it in the SQL editor).
5. Regenerate types: `supabase gen types typescript --local > lib/database.types.ts`.
6. Update `memory-bank/techContext.md` and `memory-bank/progress.md`.

## Checklist
- [ ] Timestamped filename
- [ ] Idempotent statements
- [ ] RLS enabled + policies + grants
- [ ] Table comment
- [ ] Types regenerated
- [ ] Memory Bank updated
