-- Template: idempotent Supabase migration for Seeker AI
-- Rename to supabase/migrations/YYYYMMDDHHMMSS_<description>.sql

create table if not exists public.<table> (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- ...columns...
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.<table> is '<description>';

alter table public.<table> enable row level security;

drop policy if exists "Users can view their own <table>" on public.<table>;
create policy "Users can view their own <table>"
  on public.<table>
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own <table>" on public.<table>;
create policy "Users can insert their own <table>"
  on public.<table>
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own <table>" on public.<table>;
create policy "Users can update their own <table>"
  on public.<table>
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own <table>" on public.<table>;
create policy "Users can delete their own <table>"
  on public.<table>
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on table public.<table> to authenticated;

drop trigger if exists set_updated_at on public.<table>;
-- create trigger set_updated_at before update on public.<table>
--   for each row execute function ...;
