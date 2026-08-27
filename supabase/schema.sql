-- Run this once in Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  company text,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text not null,
  budget text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  plan text not null,
  status text not null default 'planning',
  site_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  subject text not null,
  message text not null,
  status text not null default 'open',
  priority text not null default 'normal',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.inquiries enable row level security;
alter table public.projects enable row level security;
alter table public.support_tickets enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "projects_select_own" on public.projects for select using (auth.uid() = user_id);
create policy "tickets_select_own" on public.support_tickets for select using (auth.uid() = user_id);
create policy "tickets_insert_own" on public.support_tickets for insert with check (auth.uid() = user_id);
create policy "public_can_submit_inquiry" on public.inquiries for insert to anon, authenticated with check (char_length(name) >= 2 and char_length(message) >= 15);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, company)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'company')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
