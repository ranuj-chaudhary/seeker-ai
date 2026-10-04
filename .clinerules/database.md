---
paths:
  - "supabase/**"
  - "lib/database.types.ts"
---
# Database — Supabase / Postgres

- All schema changes are **timestamped SQL migrations** in `supabase/migrations/`:
  `YYYYMMDDHHMMSS_snake_case_description.sql`.
- **Migrations must be idempotent:** `create table if not exists`,
  `drop policy if exists` before `create policy`, `create or replace function`.
- **RLS is mandatory** on every new table:
  ```sql
  alter table public.<t> enable row level security;
  create policy "<desc>" on public.<t>
    for select to authenticated
    using ((select auth.uid()) = <owner_col>);
  ```
- Add explicit `grant` statements only for the roles that need access.
- Owner-scoped rows filter on `(select auth.uid())`; use `with check` on
  insert/update policies.
- Document tables with `comment on table ...`.
- Trigger functions: `language plpgsql security definer set search_path = public`,
  and `revoke execute ... from public, anon, authenticated;`.
- Keep `lib/database.types.ts` in sync — regenerate after schema changes:
  `supabase gen types typescript --local > lib/database.types.ts`.
- Sync `auth.users` → `public.profiles` via the existing trigger pattern
  (`handle_user_profile`).
