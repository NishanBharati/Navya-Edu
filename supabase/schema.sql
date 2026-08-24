-- Navya Ed Tech — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query → paste → Run).
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / OR REPLACE / DROP ... IF EXISTS).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- updated_at auto-touch trigger
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  "shortDescription" text not null default '',
  description text not null default '',
  "heroImage" text default '',
  duration text default '',
  level text default '',
  mode text default '',
  featured boolean not null default false,
  "upcomingBatch" jsonb not null default '{}'::jsonb,
  fee text default '',
  technologies text[] not null default '{}',
  "targetAudience" text[] not null default '{}',
  prerequisites text[] not null default '{}',
  outcomes text[] not null default '{}',
  projects jsonb not null default '[]'::jsonb,
  curriculum jsonb not null default '[]'::jsonb,
  "careerPaths" text[] not null default '{}',
  instructor jsonb not null default '{}'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  "seoTitle" text default '',
  "seoDescription" text default '',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

drop trigger if exists courses_set_updated_at on courses;
create trigger courses_set_updated_at before update on courses
  for each row execute function set_updated_at();

alter table courses enable row level security;

drop policy if exists "Public can read courses" on courses;
create policy "Public can read courses" on courses for select using (true);

drop policy if exists "Admins can manage courses" on courses;
create policy "Admins can manage courses" on courses for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- programs
-- ---------------------------------------------------------------------------
create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  tagline text default '',
  description text default '',
  duration text default '',
  format text default '',
  eligibility text default '',
  "whoItsFor" text[] not null default '{}',
  "whatItIncludes" text[] not null default '{}',
  "expectedOutcome" text[] not null default '{}',
  "coursesIncluded" text[] not null default '{}',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

drop trigger if exists programs_set_updated_at on programs;
create trigger programs_set_updated_at before update on programs
  for each row execute function set_updated_at();

alter table programs enable row level security;

drop policy if exists "Public can read programs" on programs;
create policy "Public can read programs" on programs for select using (true);

drop policy if exists "Admins can manage programs" on programs;
create policy "Admins can manage programs" on programs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- student_projects
-- ---------------------------------------------------------------------------
create table if not exists student_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  technologies text[] not null default '{}',
  description text default '',
  image text default '',
  "completionContext" text default '',
  highlights text[] not null default '{}',
  "isPlaceholder" boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

drop trigger if exists student_projects_set_updated_at on student_projects;
create trigger student_projects_set_updated_at before update on student_projects
  for each row execute function set_updated_at();

alter table student_projects enable row level security;

drop policy if exists "Public can read student projects" on student_projects;
create policy "Public can read student projects" on student_projects for select using (true);

drop policy if exists "Admins can manage student projects" on student_projects;
create policy "Admins can manage student projects" on student_projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- insights
-- ---------------------------------------------------------------------------
create table if not exists insights (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  category text not null,
  date text default '',
  "readTime" text default '',
  author jsonb not null default '{}'::jsonb,
  "coverImage" text default '',
  content text[] not null default '{}',
  tags text[] not null default '{}',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

drop trigger if exists insights_set_updated_at on insights;
create trigger insights_set_updated_at before update on insights
  for each row execute function set_updated_at();

alter table insights enable row level security;

drop policy if exists "Public can read insights" on insights;
create policy "Public can read insights" on insights for select using (true);

drop policy if exists "Admins can manage insights" on insights;
create policy "Admins can manage insights" on insights for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- inquiries (admissions leads from the Contact page / Advisor modal)
-- ---------------------------------------------------------------------------
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  "fullName" text not null,
  email text not null,
  phone text default '',
  "interestedCourse" text default '',
  "preferredMode" text default '',
  message text default '',
  status text not null default 'New' check (status in ('New', 'Contacted', 'Enrolled', 'Closed')),
  source text default '',
  notes text default '',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

drop trigger if exists inquiries_set_updated_at on inquiries;
create trigger inquiries_set_updated_at before update on inquiries
  for each row execute function set_updated_at();

alter table inquiries enable row level security;

-- Anyone (anon visitors) can submit an inquiry, but cannot read, edit, or delete any.
drop policy if exists "Anyone can submit an inquiry" on inquiries;
create policy "Anyone can submit an inquiry" on inquiries for insert
  with check (true);

drop policy if exists "Admins can read inquiries" on inquiries;
create policy "Admins can read inquiries" on inquiries for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admins can update inquiries" on inquiries;
create policy "Admins can update inquiries" on inquiries for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admins can delete inquiries" on inquiries;
create policy "Admins can delete inquiries" on inquiries for delete
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Helpful indexes
-- ---------------------------------------------------------------------------
create index if not exists idx_courses_category on courses (category);
create index if not exists idx_inquiries_status on inquiries (status);
create index if not exists idx_inquiries_created_at on inquiries ("createdAt" desc);

-- ---------------------------------------------------------------------------
-- Storage bucket for public media (Courses, Student Work, Blogs/Insights)
-- ---------------------------------------------------------------------------
-- 1. Create or update the 'media' public bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880, -- 5 MB limit per image
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Row Level Security policies for storage.objects
-- Anyone (public website visitors) can view / download images from the public media bucket
drop policy if exists "Public can read media assets" on storage.objects;
create policy "Public can read media assets" on storage.objects
  for select
  using (bucket_id = 'media');

-- Authenticated admins can upload media
drop policy if exists "Admins can upload media assets" on storage.objects;
create policy "Admins can upload media assets" on storage.objects
  for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- Authenticated admins can update media
drop policy if exists "Admins can update media assets" on storage.objects;
create policy "Admins can update media assets" on storage.objects
  for update
  using (bucket_id = 'media' and auth.role() = 'authenticated')
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- Authenticated admins can delete media
drop policy if exists "Admins can delete media assets" on storage.objects;
create policy "Admins can delete media assets" on storage.objects
  for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

