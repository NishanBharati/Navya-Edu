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
  status text not null default 'published' check (status in ('published', 'draft', 'archived', 'upcoming')),
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- Upgrade an older courses table: add any missing columns
alter table courses add column if not exists slug text;
alter table courses add column if not exists title text;
alter table courses add column if not exists category text;
alter table courses add column if not exists "shortDescription" text not null default '';
alter table courses add column if not exists description text not null default '';
alter table courses add column if not exists "heroImage" text default '';
alter table courses add column if not exists duration text default '';
alter table courses add column if not exists level text default '';
alter table courses add column if not exists mode text default '';
alter table courses add column if not exists featured boolean not null default false;
alter table courses add column if not exists "upcomingBatch" jsonb not null default '{}'::jsonb;
alter table courses add column if not exists fee text default '';
alter table courses add column if not exists technologies text[] not null default '{}';
alter table courses add column if not exists "targetAudience" text[] not null default '{}';
alter table courses add column if not exists prerequisites text[] not null default '{}';
alter table courses add column if not exists outcomes text[] not null default '{}';
alter table courses add column if not exists projects jsonb not null default '[]'::jsonb;
alter table courses add column if not exists curriculum jsonb not null default '[]'::jsonb;
alter table courses add column if not exists "careerPaths" text[] not null default '{}';
alter table courses add column if not exists instructor jsonb not null default '{}'::jsonb;
alter table courses add column if not exists faqs jsonb not null default '[]'::jsonb;
alter table courses add column if not exists "seoTitle" text default '';
alter table courses add column if not exists "seoDescription" text default '';
alter table courses add column if not exists status text not null default 'published';
alter table courses add column if not exists "createdAt" timestamptz not null default now();
alter table courses add column if not exists "updatedAt" timestamptz not null default now();

drop trigger if exists courses_set_updated_at on courses;
create trigger courses_set_updated_at before update on courses
  for each row execute function set_updated_at();

alter table courses enable row level security;

drop policy if exists "Public can read courses" on courses;
drop policy if exists "Public can read published courses" on courses;
create policy "Public can read published courses" on courses for select
  using (status = 'published' or status = 'upcoming' or status is null or auth.role() = 'authenticated');

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

-- Upgrade an older programs table: add any missing columns
alter table programs add column if not exists slug text;
alter table programs add column if not exists title text;
alter table programs add column if not exists category text;
alter table programs add column if not exists tagline text default '';
alter table programs add column if not exists description text default '';
alter table programs add column if not exists duration text default '';
alter table programs add column if not exists format text default '';
alter table programs add column if not exists eligibility text default '';
alter table programs add column if not exists "whoItsFor" text[] not null default '{}';
alter table programs add column if not exists "whatItIncludes" text[] not null default '{}';
alter table programs add column if not exists "expectedOutcome" text[] not null default '{}';
alter table programs add column if not exists "coursesIncluded" text[] not null default '{}';
alter table programs add column if not exists "createdAt" timestamptz not null default now();
alter table programs add column if not exists "updatedAt" timestamptz not null default now();

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

-- Upgrade an older student_projects table: add any missing columns
alter table student_projects add column if not exists title text;
alter table student_projects add column if not exists category text;
alter table student_projects add column if not exists technologies text[] not null default '{}';
alter table student_projects add column if not exists description text default '';
alter table student_projects add column if not exists image text default '';
alter table student_projects add column if not exists "completionContext" text default '';
alter table student_projects add column if not exists highlights text[] not null default '{}';
alter table student_projects add column if not exists "isPlaceholder" boolean not null default false;
alter table student_projects add column if not exists "createdAt" timestamptz not null default now();
alter table student_projects add column if not exists "updatedAt" timestamptz not null default now();

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
  status text not null default 'published' check (status in ('published', 'draft', 'archived')),
  "seoTitle" text default '',
  "seoDescription" text default '',
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- Upgrade an older insights table: add any missing columns
alter table insights add column if not exists slug text;
alter table insights add column if not exists title text;
alter table insights add column if not exists excerpt text default '';
alter table insights add column if not exists category text;
alter table insights add column if not exists date text default '';
alter table insights add column if not exists "readTime" text default '';
alter table insights add column if not exists author jsonb not null default '{}'::jsonb;
alter table insights add column if not exists "coverImage" text default '';
alter table insights add column if not exists content text[] not null default '{}';
alter table insights add column if not exists tags text[] not null default '{}';
alter table insights add column if not exists status text not null default 'published';
alter table insights add column if not exists "seoTitle" text default '';
alter table insights add column if not exists "seoDescription" text default '';
alter table insights add column if not exists "createdAt" timestamptz not null default now();
alter table insights add column if not exists "updatedAt" timestamptz not null default now();

drop trigger if exists insights_set_updated_at on insights;
create trigger insights_set_updated_at before update on insights
  for each row execute function set_updated_at();

alter table insights enable row level security;

drop policy if exists "Public can read insights" on insights;
drop policy if exists "Public can read published insights" on insights;
create policy "Public can read published insights" on insights for select
  using (status = 'published' or status is null or auth.role() = 'authenticated');

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

-- Upgrade an older inquiries table: add any missing columns
alter table inquiries add column if not exists "fullName" text;
alter table inquiries add column if not exists email text;
alter table inquiries add column if not exists phone text default '';
alter table inquiries add column if not exists "interestedCourse" text default '';
alter table inquiries add column if not exists "preferredMode" text default '';
alter table inquiries add column if not exists message text default '';
alter table inquiries add column if not exists status text not null default 'New';
alter table inquiries add column if not exists source text default '';
alter table inquiries add column if not exists notes text default '';
alter table inquiries add column if not exists "createdAt" timestamptz not null default now();
alter table inquiries add column if not exists "updatedAt" timestamptz not null default now();

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
-- testimonials (authentic student reflections with signed consent record)
-- ---------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  "studentName" text not null,
  "cohortOrCourse" text not null default '',
  role text default '',
  company text default '',
  avatar text default '',
  quote text not null,
  rating int default 5,
  "consentConfirmed" boolean not null default false,
  "consentDate" text default '',
  "verificationNotes" text default '',
  status text not null default 'Pending Approval' check (status in ('Pending Approval', 'Approved', 'Hidden')),
  featured boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- Upgrade an older testimonials table: add any missing columns
alter table testimonials add column if not exists "studentName" text;
alter table testimonials add column if not exists "cohortOrCourse" text not null default '';
alter table testimonials add column if not exists role text default '';
alter table testimonials add column if not exists company text default '';
alter table testimonials add column if not exists avatar text default '';
alter table testimonials add column if not exists quote text;
alter table testimonials add column if not exists rating int default 5;
alter table testimonials add column if not exists "consentConfirmed" boolean not null default false;
alter table testimonials add column if not exists "consentDate" text default '';
alter table testimonials add column if not exists "verificationNotes" text default '';
alter table testimonials add column if not exists status text not null default 'Pending Approval';
alter table testimonials add column if not exists featured boolean not null default false;
alter table testimonials add column if not exists "createdAt" timestamptz not null default now();
alter table testimonials add column if not exists "updatedAt" timestamptz not null default now();

drop trigger if exists testimonials_set_updated_at on testimonials;
create trigger testimonials_set_updated_at before update on testimonials
  for each row execute function set_updated_at();

alter table testimonials enable row level security;

-- Public can ONLY read approved testimonials with verified student consent
drop policy if exists "Public can read approved testimonials" on testimonials;
create policy "Public can read approved testimonials" on testimonials for select
  using ((status = 'Approved' and "consentConfirmed" = true) or auth.role() = 'authenticated');

-- Authenticated admins can manage all testimonials
drop policy if exists "Admins can manage testimonials" on testimonials;
create policy "Admins can manage testimonials" on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Older tables may carry extra NOT NULL columns the website never fills
-- (e.g. inquiries.name). Make those optional so inserts do not fail.
-- Columns the website uses keep their constraints; no data is changed.
-- ---------------------------------------------------------------------------
do $$
declare
  c record;
begin
  for c in
    select table_name, column_name
    from information_schema.columns
    where table_schema = 'public'
      and is_nullable = 'NO'
      and column_default is null
      and column_name <> 'id'
      and (table_name, column_name) not in (
        ('courses', 'slug'), ('courses', 'title'), ('courses', 'category'),
        ('programs', 'slug'), ('programs', 'title'), ('programs', 'category'),
        ('student_projects', 'title'), ('student_projects', 'category'),
        ('insights', 'slug'), ('insights', 'title'), ('insights', 'category'),
        ('inquiries', 'fullName'), ('inquiries', 'email'),
        ('testimonials', 'studentName'), ('testimonials', 'quote')
      )
      and table_name in ('courses', 'programs', 'student_projects', 'insights', 'inquiries', 'testimonials')
  loop
    execute format('alter table public.%I alter column %I drop not null', c.table_name, c.column_name);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Helpful indexes
-- ---------------------------------------------------------------------------
create unique index if not exists courses_slug_unique on courses (slug);
create unique index if not exists programs_slug_unique on programs (slug);
create unique index if not exists insights_slug_unique on insights (slug);
create index if not exists idx_courses_category on courses (category);
create index if not exists idx_inquiries_status on inquiries (status);
create index if not exists idx_inquiries_created_at on inquiries ("createdAt" desc);
create index if not exists idx_testimonials_status on testimonials (status);

-- ---------------------------------------------------------------------------
-- Storage bucket for public media (Courses, Student Work, Blogs/Insights)
-- ---------------------------------------------------------------------------
-- 1. Create or update the 'media' public bucket (supports images and official syllabus PDFs)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  26214400, -- 25 MB limit for comprehensive syllabi and high-res media
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 26214400,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];

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

