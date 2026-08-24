/**
 * One-time migration helper: converts the site's static data files
 * (src/data/*.ts) into a SQL seed script for the Supabase database.
 *
 * Usage: npx tsx scripts/generate-seed-sql.ts
 * Output: supabase/seed.sql (run it in the Supabase SQL Editor after schema.sql)
 */
import { writeFileSync } from 'fs';
import { COURSES } from '../src/data/courses';
import { PROGRAMS } from '../src/data/programs';
import { STUDENT_PROJECTS } from '../src/data/studentProjects';
import { INSIGHTS } from '../src/data/insights';

function sqlStr(value: string | undefined | null): string {
  if (value === undefined || value === null) return 'NULL';
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlBool(value: boolean | undefined): string {
  return value ? 'TRUE' : 'FALSE';
}

function sqlTextArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'";
  return `ARRAY[${arr.map((s) => `'${s.replace(/'/g, "''")}'`).join(', ')}]`;
}

function sqlJsonb(value: unknown): string {
  const json = JSON.stringify(value ?? {});
  return `'${json.replace(/'/g, "''")}'::jsonb`;
}

const lines: string[] = [];
lines.push('-- Auto-generated seed data for Navya Ed Tech.');
lines.push('-- Run this in the Supabase SQL Editor AFTER schema.sql.');
lines.push('-- Regenerate with: npx tsx scripts/generate-seed-sql.ts');
lines.push('');

lines.push('-- ============ courses ============');
for (const c of COURSES) {
  lines.push(
    `INSERT INTO courses (slug, title, category, "shortDescription", description, "heroImage", duration, level, mode, featured, "upcomingBatch", fee, technologies, "targetAudience", prerequisites, outcomes, projects, curriculum, "careerPaths", instructor, faqs, "seoTitle", "seoDescription") VALUES (` +
      [
        sqlStr(c.slug),
        sqlStr(c.title),
        sqlStr(c.category),
        sqlStr(c.shortDescription),
        sqlStr(c.description),
        sqlStr(c.heroImage),
        sqlStr(c.duration),
        sqlStr(c.level),
        sqlStr(c.mode),
        sqlBool(c.featured),
        sqlJsonb(c.upcomingBatch),
        sqlStr(c.fee),
        sqlTextArray(c.technologies),
        sqlTextArray(c.targetAudience),
        sqlTextArray(c.prerequisites),
        sqlTextArray(c.outcomes),
        sqlJsonb(c.projects),
        sqlJsonb(c.curriculum),
        sqlTextArray(c.careerPaths),
        sqlJsonb(c.instructor),
        sqlJsonb(c.faqs),
        sqlStr(c.seoTitle),
        sqlStr(c.seoDescription),
      ].join(', ') +
      ') ON CONFLICT (slug) DO NOTHING;'
  );
}

lines.push('');
lines.push('-- ============ programs ============');
for (const p of PROGRAMS) {
  lines.push(
    `INSERT INTO programs (slug, title, category, tagline, description, duration, format, eligibility, "whoItsFor", "whatItIncludes", "expectedOutcome", "coursesIncluded") VALUES (` +
      [
        sqlStr(p.slug),
        sqlStr(p.title),
        sqlStr(p.category),
        sqlStr(p.tagline),
        sqlStr(p.description),
        sqlStr(p.duration),
        sqlStr(p.format),
        sqlStr(p.eligibility),
        sqlTextArray(p.whoItsFor),
        sqlTextArray(p.whatItIncludes),
        sqlTextArray(p.expectedOutcome),
        sqlTextArray(p.coursesIncluded),
      ].join(', ') +
      ') ON CONFLICT (slug) DO NOTHING;'
  );
}

lines.push('');
lines.push('-- ============ student_projects ============');
for (const sp of STUDENT_PROJECTS) {
  lines.push(
    `INSERT INTO student_projects (title, category, technologies, description, image, "completionContext", highlights, "isPlaceholder") VALUES (` +
      [
        sqlStr(sp.title),
        sqlStr(sp.category),
        sqlTextArray(sp.technologies),
        sqlStr(sp.description),
        sqlStr(sp.image),
        sqlStr(sp.completionContext),
        sqlTextArray(sp.highlights),
        sqlBool(sp.isPlaceholder),
      ].join(', ') +
      ');'
  );
}

lines.push('');
lines.push('-- ============ insights ============');
for (const i of INSIGHTS) {
  lines.push(
    `INSERT INTO insights (slug, title, excerpt, category, date, "readTime", author, "coverImage", content, tags) VALUES (` +
      [
        sqlStr(i.slug),
        sqlStr(i.title),
        sqlStr(i.excerpt),
        sqlStr(i.category),
        sqlStr(i.date),
        sqlStr(i.readTime),
        sqlJsonb(i.author),
        sqlStr(i.coverImage),
        sqlTextArray(i.content),
        sqlTextArray(i.tags),
      ].join(', ') +
      ') ON CONFLICT (slug) DO NOTHING;'
  );
}

writeFileSync('supabase/seed.sql', lines.join('\n') + '\n', 'utf-8');
console.log(`Wrote supabase/seed.sql with ${COURSES.length} courses, ${PROGRAMS.length} programs, ${STUDENT_PROJECTS.length} student projects, ${INSIGHTS.length} insights.`);
