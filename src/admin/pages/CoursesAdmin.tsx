import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, GraduationCap, Star, Loader2, FileText, Eye, RotateCcw } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { COURSES, LEGACY_COURSE_SLUGS } from '../../data/courses';
import { slugify } from '../../lib/storage';
import type { Course, CurriculumModule, ProjectExample, FAQItem } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, ListField, TagsField, Toggle } from '../components/ui/Field';
import { ImageUpload } from '../components/ui/ImageUpload';
import { PdfUpload } from '../components/ui/PdfUpload';
import { Toast, useToast } from '../components/ui/Toast';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const CATEGORIES: Course['category'][] = ['Programming', 'Web Development', 'Kids Coding', 'Data & AI', 'Development', 'Design', 'Cloud & DevOps', 'Cybersecurity', 'Digital Skills'];
const LEVELS: Course['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Intermediate', 'Intermediate to Advanced'];
const MODES: Course['mode'][] = ['Classroom / In-Person', 'Online Live', 'Hybrid (Classroom & Online)'];

type TabId = 'overview' | 'batch' | 'curriculum' | 'content' | 'instructor' | 'seo';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'batch', label: 'Batch & Fee' },
  { id: 'curriculum', label: 'Curriculum & PDF' },
  { id: 'content', label: 'Audience & Outcomes' },
  { id: 'instructor', label: 'Instructor' },
  { id: 'seo', label: 'SEO' },
];

const emptyCourse = (): Course => ({
  id: '',
  slug: '',
  title: '',
  category: 'Programming',
  shortDescription: '',
  description: '',
  heroImage: '',
  duration: '',
  level: 'Beginner to Intermediate',
  mode: 'Classroom / In-Person',
  featured: false,
  syllabusPdfUrl: '',
  upcomingBatch: {
    startDate: 'Next batch starting soon [Inquire for exact schedule]',
    classDays: 'Sunday – Friday',
    classTime: '',
    seatsStatus: 'Admissions Open',
    location: 'Kathmandu Campus / Online Live',
  },
  fee: 'Contact for current fee & batch structure (NPR)',
  technologies: [],
  targetAudience: [''],
  prerequisites: [''],
  outcomes: [''],
  projects: [],
  curriculum: [],
  careerPaths: [''],
  instructor: { name: '', role: '', experience: '', specialization: '', isPlaceholder: true },
  faqs: [],
  seoTitle: '',
  seoDescription: '',
});

function stripGeneratedFields(rows: Course[]) {
  return rows.map(({ id: _id, ...rest }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const copy = { ...rest } as any;
    delete copy.whyChooseThis;
    delete copy.upcomingClasses;
    return copy;
  });
}

export const CoursesAdmin: React.FC = () => {
  const { items: courses, isLoading, error, add, update, remove, replaceAll } = useSupabaseTable<Course>('courses', { orderBy: 'title', ascending: true });
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: Course; tab: TabId } | null>(null);
  const [viewTarget, setViewTarget] = useState<Course | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [confirmSyncOpen, setConfirmSyncOpen] = useState(false);
  const { toast, showToast, dismissToast } = useToast();

  const hasLegacyCourses = useMemo(() => {
    return courses.some((c) => LEGACY_COURSE_SLUGS.has(c.slug));
  }, [courses]);

  const handleSyncDefaults = async () => {
    setIsSyncing(true);
    try {
      await replaceAll(stripGeneratedFields(COURSES));
      showToast('Successfully replaced courses with the 6 new courses!');
      setConfirmSyncOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to sync courses to database.');
    } finally {
      setIsSyncing(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesQuery = !q || c.title.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [courses, search, categoryFilter]);

  const openCreate = () => {
    setSaveError(null);
    setDrawerState({ mode: 'create', draft: emptyCourse(), tab: 'overview' });
  };
  const openEdit = (course: Course) => {
    setSaveError(null);
    setDrawerState({
      mode: 'edit',
      draft: JSON.parse(JSON.stringify(course)),
      tab: 'overview',
    });
  };

  const setDraft = (updater: (draft: Course) => Course) => {
    setDrawerState((prev) => (prev ? { ...prev, draft: updater(prev.draft) } : prev));
  };

  const handleSave = async () => {
    if (!drawerState) return;
    const draft = drawerState.draft;
    if (!draft.title.trim()) return;

    const cleaned: Course = {
      ...draft,
      slug: draft.slug || slugify(draft.title),
      targetAudience: draft.targetAudience.filter((s) => s.trim()),
      prerequisites: draft.prerequisites.filter((s) => s.trim()),
      outcomes: draft.outcomes.filter((s) => s.trim()),
      careerPaths: draft.careerPaths.filter((s) => s.trim()),
      technologies: draft.technologies.filter((s) => s.trim()),
    };

    setIsSaving(true);
    setSaveError(null);
    try {
      if (drawerState.mode === 'create') {
        const { id: _omit, ...payload } = cleaned;
        await add(payload);
      } else {
        await update(draft.id, cleaned);
      }
      setDrawerState(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save course.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete course.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Courses"
        description="Individual technical courses shown on the live Courses page and detail pages."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmSyncOpen(true)}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Sync 6 Default Courses
            </Button>
            <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
              Add Course
            </Button>
          </div>
        }
      />

      {hasLegacyCourses && (
        <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <span>⚠️</span> Legacy Courses Found in Supabase Database
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
              Your remote database contains legacy records. Click below to sync and replace them with your 6 active courses (Python Beginner, Python Advance, Web Development, Scratch Beginner, Scratch Advanced, Data Science).
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setConfirmSyncOpen(true)}
            isLoading={isSyncing}
            className="shrink-0"
          >
            Sync 6 New Courses Now
          </Button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border-soft flex flex-col sm:flex-row gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper-alt text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-paper-alt text-sm text-ink focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors sm:max-w-[180px]"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-ink-faint">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading courses…
          </div>
        ) : error ? (
          <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load courses: {error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={GraduationCap} title="No courses found" description="Try a different search term or category, or add a new course." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-ink-faint border-b border-border-soft">
                  <th className="px-5 py-2.5 font-semibold">Course</th>
                  <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Duration</th>
                  <th className="px-5 py-2.5 font-semibold hidden lg:table-cell">Level</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course) => (
                  <tr key={course.id} className="border-b border-paper-alt last:border-0 hover:bg-paper transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {course.featured && <Star className="w-3.5 h-3.5 text-amber fill-amber shrink-0" />}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-ink truncate max-w-[260px]">{course.title}</p>
                            {course.syllabusPdfUrl && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-navy border border-blue-200 shrink-0" title="Custom syllabus PDF attached">
                                <FileText className="w-3 h-3 text-blue" /> PDF
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-ink-faint truncate max-w-[260px]">{course.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge variant="navy" size="sm">{course.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-ink-soft">{course.duration}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-ink-soft">{course.level}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewTarget(course)}
                          aria-label={`View details for ${course.title}`}
                          title="View course details"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-[#F0F5FA] hover:text-blue transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(course)}
                          aria-label={`Edit ${course.title}`}
                          title="Edit course"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-paper-alt hover:text-navy transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(course)}
                          aria-label={`Delete ${course.title}`}
                          title="Delete course"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Drawer
        isOpen={!!drawerState}
        onClose={() => setDrawerState(null)}
        title={drawerState?.mode === 'create' ? 'Add Course' : 'Edit Course'}
        description={drawerState?.draft.title || 'Complete course content as shown on the live course detail page.'}
        widthClass="max-w-3xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDrawerState(null)}
              className="mr-auto px-3.5 py-2 text-sm font-semibold text-ink-soft hover:text-ink"
            >
              Cancel
            </button>
            <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : drawerState?.mode === 'create' ? 'Create Course' : 'Save Changes'}
            </Button>
          </>
        }
      >
        {drawerState && (
          <div>
            {saveError && (
              <div className="mb-5 px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700">
                {saveError}
              </div>
            )}
            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-6 border-b border-border -mt-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDrawerState({ ...drawerState, tab: tab.id })}
                  className={`px-3 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                    drawerState.tab === tab.id
                      ? 'border-navy text-navy'
                      : 'border-transparent text-ink-faint hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {drawerState.tab === 'overview' && (
              <div className="space-y-5">
                <Field label="Course Title" required>
                  <TextInput
                    value={drawerState.draft.title}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                    placeholder="e.g. Modern Web Development"
                  />
                </Field>

                <div className="grid grid-cols-3 gap-4">
                  <Field label="Category">
                    <Select
                      value={drawerState.draft.category}
                      onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value as Course['category'] }))}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Level">
                    <Select value={drawerState.draft.level} onChange={(e) => setDraft((d) => ({ ...d, level: e.target.value as Course['level'] }))}>
                      {LEVELS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Mode">
                    <Select value={drawerState.draft.mode} onChange={(e) => setDraft((d) => ({ ...d, mode: e.target.value as Course['mode'] }))}>
                      {MODES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <Field label="Duration">
                  <TextInput
                    value={drawerState.draft.duration}
                    onChange={(e) => setDraft((d) => ({ ...d, duration: e.target.value }))}
                    placeholder="e.g. 4 Months"
                  />
                </Field>

                <Field label="Short Description" hint="Shown on course cards and listings.">
                  <TextArea
                    rows={2}
                    value={drawerState.draft.shortDescription}
                    onChange={(e) => setDraft((d) => ({ ...d, shortDescription: e.target.value }))}
                  />
                </Field>

                <Field label="Full Description" hint="Shown on the course detail hero.">
                  <TextArea
                    rows={4}
                    value={drawerState.draft.description}
                    onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  />
                </Field>

                <Field label="Hero Image">
                  <ImageUpload
                    value={drawerState.draft.heroImage}
                    onChange={(url) => setDraft((d) => ({ ...d, heroImage: url }))}
                    folder="courses"
                    hint="Featured banner shown on the course details page."
                  />
                </Field>

                <Field label="Technologies" hint="Shown in the tech stack strip on the course page.">
                  <TagsField
                    tags={drawerState.draft.technologies}
                    onChange={(tags) => setDraft((d) => ({ ...d, technologies: tags }))}
                    placeholder="e.g. JavaScript ES6+"
                  />
                </Field>

                <Toggle
                  checked={!!drawerState.draft.featured}
                  onChange={(checked) => setDraft((d) => ({ ...d, featured: checked }))}
                  label="Feature this course"
                  description="Featured courses are highlighted first on the live Courses page."
                />
              </div>
            )}

            {drawerState.tab === 'batch' && (
              <div className="space-y-5">
                <Field label="Batch Start" hint="e.g. 'Next batch starting soon [Inquire for exact schedule]'">
                  <TextInput
                    value={drawerState.draft.upcomingBatch.startDate}
                    onChange={(e) => setDraft((d) => ({ ...d, upcomingBatch: { ...d.upcomingBatch, startDate: e.target.value } }))}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Class Days">
                    <TextInput
                      value={drawerState.draft.upcomingBatch.classDays}
                      onChange={(e) => setDraft((d) => ({ ...d, upcomingBatch: { ...d.upcomingBatch, classDays: e.target.value } }))}
                    />
                  </Field>
                  <Field label="Class Time">
                    <TextInput
                      value={drawerState.draft.upcomingBatch.classTime}
                      onChange={(e) => setDraft((d) => ({ ...d, upcomingBatch: { ...d.upcomingBatch, classTime: e.target.value } }))}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Seats Status">
                    <TextInput
                      value={drawerState.draft.upcomingBatch.seatsStatus}
                      onChange={(e) => setDraft((d) => ({ ...d, upcomingBatch: { ...d.upcomingBatch, seatsStatus: e.target.value } }))}
                      placeholder="e.g. Admissions Open"
                    />
                  </Field>
                  <Field label="Location">
                    <TextInput
                      value={drawerState.draft.upcomingBatch.location}
                      onChange={(e) => setDraft((d) => ({ ...d, upcomingBatch: { ...d.upcomingBatch, location: e.target.value } }))}
                    />
                  </Field>
                </div>
                <Field label="Fee" hint="Displayed as-is; typically directs students to contact admissions.">
                  <TextInput value={drawerState.draft.fee} onChange={(e) => setDraft((d) => ({ ...d, fee: e.target.value }))} />
                </Field>
              </div>
            )}

            {drawerState.tab === 'curriculum' && (
              <CurriculumTab
                modules={drawerState.draft.curriculum}
                projects={drawerState.draft.projects}
                syllabusPdfUrl={drawerState.draft.syllabusPdfUrl}
                onModulesChange={(curriculum) => setDraft((d) => ({ ...d, curriculum }))}
                onProjectsChange={(projects) => setDraft((d) => ({ ...d, projects }))}
                onSyllabusPdfChange={(syllabusPdfUrl) => setDraft((d) => ({ ...d, syllabusPdfUrl }))}
              />
            )}

            {drawerState.tab === 'content' && (
              <div className="space-y-5">
                <Field label="Who This Course Is For">
                  <ListField
                    items={drawerState.draft.targetAudience}
                    onChange={(items) => setDraft((d) => ({ ...d, targetAudience: items }))}
                    addLabel="Add audience"
                  />
                </Field>
                <Field label="Prerequisites">
                  <ListField
                    items={drawerState.draft.prerequisites}
                    onChange={(items) => setDraft((d) => ({ ...d, prerequisites: items }))}
                    addLabel="Add prerequisite"
                  />
                </Field>
                <Field label="Learning Outcomes">
                  <ListField
                    items={drawerState.draft.outcomes}
                    onChange={(items) => setDraft((d) => ({ ...d, outcomes: items }))}
                    addLabel="Add outcome"
                  />
                </Field>
                <Field label="Career Paths">
                  <ListField
                    items={drawerState.draft.careerPaths}
                    onChange={(items) => setDraft((d) => ({ ...d, careerPaths: items }))}
                    addLabel="Add career path"
                  />
                </Field>
                <FaqTab faqs={drawerState.draft.faqs} onChange={(faqs) => setDraft((d) => ({ ...d, faqs }))} />
              </div>
            )}

            {drawerState.tab === 'instructor' && (
              <div className="space-y-5">
                <Field label="Instructor Name">
                  <TextInput
                    value={drawerState.draft.instructor.name}
                    onChange={(e) => setDraft((d) => ({ ...d, instructor: { ...d.instructor, name: e.target.value } }))}
                    placeholder="e.g. Senior Software Engineer at Navya EdTech"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Role">
                    <TextInput
                      value={drawerState.draft.instructor.role}
                      onChange={(e) => setDraft((d) => ({ ...d, instructor: { ...d.instructor, role: e.target.value } }))}
                    />
                  </Field>
                  <Field label="Experience">
                    <TextInput
                      value={drawerState.draft.instructor.experience}
                      onChange={(e) => setDraft((d) => ({ ...d, instructor: { ...d.instructor, experience: e.target.value } }))}
                      placeholder="e.g. 6+ years in commercial web applications"
                    />
                  </Field>
                </div>
                <Field label="Specialization">
                  <TextInput
                    value={drawerState.draft.instructor.specialization}
                    onChange={(e) => setDraft((d) => ({ ...d, instructor: { ...d.instructor, specialization: e.target.value } }))}
                  />
                </Field>
                <Toggle
                  checked={!!drawerState.draft.instructor.isPlaceholder}
                  onChange={(checked) => setDraft((d) => ({ ...d, instructor: { ...d.instructor, isPlaceholder: checked } }))}
                  label="Placeholder instructor profile"
                  description="Uncheck once a real instructor has been assigned and confirmed."
                />
              </div>
            )}

            {drawerState.tab === 'seo' && (
              <div className="space-y-5">
                <Field label="SEO Title">
                  <TextInput value={drawerState.draft.seoTitle} onChange={(e) => setDraft((d) => ({ ...d, seoTitle: e.target.value }))} />
                </Field>
                <Field label="SEO Description">
                  <TextArea rows={3} value={drawerState.draft.seoDescription} onChange={(e) => setDraft((d) => ({ ...d, seoDescription: e.target.value }))} />
                </Field>
                <Field label="URL Slug" hint="Auto-generated from the title if left blank.">
                  <TextInput
                    value={drawerState.draft.slug}
                    onChange={(e) => setDraft((d) => ({ ...d, slug: slugify(e.target.value) }))}
                    placeholder={slugify(drawerState.draft.title) || 'course-slug'}
                  />
                </Field>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* In-Dashboard Read-Only Course Inspection Drawer */}
      <Drawer
        isOpen={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Course Overview & Syllabus"
        description={viewTarget?.title || ''}
        widthClass="max-w-3xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setViewTarget(null)}
              className="px-4 py-2 text-sm font-semibold text-ink-soft hover:text-ink cursor-pointer"
            >
              Close
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                if (viewTarget) {
                  const target = viewTarget;
                  setViewTarget(null);
                  openEdit(target);
                }
              }}
              leftIcon={<Pencil className="w-4 h-4" />}
            >
              Edit This Course
            </Button>
          </>
        }
      >
        {viewTarget && (
          <div className="space-y-6">
            {/* Header Telemetry */}
            <div className="p-5 rounded-2xl bg-navy text-white space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">
                  {viewTarget.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/90">
                  {viewTarget.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/90">
                  {viewTarget.mode}
                </span>
                {viewTarget.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber text-white flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white">{viewTarget.title}</h3>
              <p className="text-xs text-white/80 leading-relaxed">{viewTarget.description || viewTarget.shortDescription}</p>

              <div className="pt-2 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-navy-mist block">Duration</span>
                  <span className="font-semibold text-white">{viewTarget.duration || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-navy-mist block">Fee Structure</span>
                  <span className="font-semibold text-white">{viewTarget.fee || 'Contact Admissions'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-navy-mist block">Cohort Status</span>
                  <span className="font-semibold text-white">{viewTarget.upcomingBatch?.seatsStatus || 'Open'}</span>
                </div>
              </div>
            </div>

            {/* Attached Syllabus PDF Section */}
            <div className="p-4 rounded-2xl border border-blue-mist bg-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue" /> Syllabus PDF Status
              </span>
              {viewTarget.syllabusPdfUrl ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-navy" />
                    <span className="text-xs font-semibold text-navy">Custom Official PDF Attached</span>
                  </div>
                  <a
                    href={viewTarget.syllabusPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue hover:underline"
                  >
                    Open Document
                  </a>
                </div>
              ) : (
                <p className="text-xs text-ink-soft">
                  Automated Verified Vector PDF is active for direct student downloads.
                </p>
              )}
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                Curriculum Modules ({viewTarget.curriculum.length})
              </h4>
              <div className="space-y-2.5">
                {viewTarget.curriculum.map((mod, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border bg-paper space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-ink">
                        {mod.moduleNumber || `Module ${idx + 1}`}: {mod.title}
                      </strong>
                      {mod.duration && <span className="text-[10px] text-ink-faint font-mono">{mod.duration}</span>}
                    </div>
                    {mod.topics && mod.topics.length > 0 && (
                      <ul className="text-xs text-ink-soft space-y-1 pl-3">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx}>• {t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            {viewTarget.technologies && viewTarget.technologies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Technologies & Toolchain</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.technologies.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-input-border text-xs font-mono text-navy">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this course?"
        description={`"${deleteTarget?.title}" will be removed from the live Courses page and all listings. This cannot be undone.`}
        confirmLabel="Delete Course"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        isOpen={confirmSyncOpen}
        title="Sync 6 New Courses to Database?"
        description="This will remove the 7 legacy courses from your Supabase database and insert the 6 updated courses (Python Beginner, Python Advance, Web Development, Scratch Beginner, Scratch Advanced, and Data Science). Are you sure?"
        confirmLabel="Sync & Replace Now"
        onConfirm={handleSyncDefaults}
        onCancel={() => setConfirmSyncOpen(false)}
      />

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};

interface CurriculumTabProps {
  modules: CurriculumModule[];
  projects: ProjectExample[];
  syllabusPdfUrl?: string;
  onModulesChange: (modules: CurriculumModule[]) => void;
  onProjectsChange: (projects: ProjectExample[]) => void;
  onSyllabusPdfChange: (url: string) => void;
}

const CurriculumTab: React.FC<CurriculumTabProps> = ({
  modules,
  projects,
  syllabusPdfUrl,
  onModulesChange,
  onProjectsChange,
  onSyllabusPdfChange,
}) => {
  const updateModule = (index: number, patch: Partial<CurriculumModule>) => {
    onModulesChange(modules.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  };
  const addModule = () =>
    onModulesChange([
      ...modules,
      { moduleNumber: `Module ${String(modules.length + 1).padStart(2, '0')}`, title: '', topics: [''], practicalExercise: '', expectedOutcome: '' },
    ]);
  const removeModule = (index: number) => onModulesChange(modules.filter((_, i) => i !== index));

  const updateProject = (index: number, patch: Partial<ProjectExample>) => {
    onProjectsChange(projects.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  };
  const addProject = () => onProjectsChange([...projects, { title: '', technologies: [], description: '', type: '' }]);
  const removeProject = (index: number) => onProjectsChange(projects.filter((_, i) => i !== index));

  return (
    <div className="space-y-8">
      {/* 1. Official Syllabus PDF Upload Section */}
      <div className="rounded-2xl border border-blue-mist p-5 bg-[#F8FAFC] space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue" />
            <span>Official Syllabus PDF Attachment</span>
          </p>
          <p className="text-xs text-ink-soft leading-relaxed">
            Upload a custom PDF syllabus brochure. When attached, students clicking &quot;Download Syllabus (PDF)&quot; on the course page will directly download this official file. If left blank, our automated verified PDF generator will be used.
          </p>
        </div>

        <PdfUpload
          value={syllabusPdfUrl || ''}
          onChange={onSyllabusPdfChange}
          folder="syllabi"
          hint="Supports PDF documents up to 25MB or direct document URLs."
        />
      </div>

      {/* 2. Structured Curriculum Modules */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Curriculum Modules</p>
          <button type="button" onClick={addModule} className="text-xs font-semibold text-blue hover:text-navy cursor-pointer">
            + Add Module
          </button>
        </div>
        {modules.length === 0 ? (
          <p className="text-xs text-ink-faint py-6 text-center border border-dashed border-input-border rounded-xl">No modules yet.</p>
        ) : (
          <div className="space-y-3">
            {modules.map((module, index) => (
              <div key={index} className="rounded-xl border border-border p-4 space-y-3 bg-paper">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <TextInput
                      value={module.moduleNumber}
                      onChange={(e) => updateModule(index, { moduleNumber: e.target.value })}
                      placeholder="Module 01"
                    />
                    <TextInput
                      value={module.title}
                      onChange={(e) => updateModule(index, { title: e.target.value })}
                      placeholder="Module title"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    aria-label="Remove module"
                    className="shrink-0 w-9 h-9 rounded-lg border border-input-border text-ink-faint hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
                <ListField
                  items={module.topics}
                  onChange={(topics) => updateModule(index, { topics })}
                  placeholder="Topic covered in this module"
                  addLabel="Add topic"
                />
                <TextArea
                  rows={2}
                  value={module.practicalExercise}
                  onChange={(e) => updateModule(index, { practicalExercise: e.target.value })}
                  placeholder="Practical exercise for this module"
                />
                <TextArea
                  rows={2}
                  value={module.expectedOutcome}
                  onChange={(e) => updateModule(index, { expectedOutcome: e.target.value })}
                  placeholder="Expected outcome for this module"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Project Examples</p>
          <button type="button" onClick={addProject} className="text-xs font-semibold text-blue hover:text-navy">
            + Add Project
          </button>
        </div>
        {projects.length === 0 ? (
          <p className="text-xs text-ink-faint py-6 text-center border border-dashed border-input-border rounded-xl">No project examples yet.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index} className="rounded-xl border border-border p-4 space-y-3 bg-paper">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <TextInput value={project.title} onChange={(e) => updateProject(index, { title: e.target.value })} placeholder="Project title" />
                    <TextInput value={project.type || ''} onChange={(e) => updateProject(index, { type: e.target.value })} placeholder="Project type" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    aria-label="Remove project"
                    className="shrink-0 w-9 h-9 rounded-lg border border-input-border text-ink-faint hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
                <TagsField
                  tags={project.technologies}
                  onChange={(technologies) => updateProject(index, { technologies })}
                  placeholder="Technology used"
                />
                <TextArea
                  rows={2}
                  value={project.description}
                  onChange={(e) => updateProject(index, { description: e.target.value })}
                  placeholder="Project description"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FaqTab: React.FC<{ faqs: FAQItem[]; onChange: (faqs: FAQItem[]) => void }> = ({ faqs, onChange }) => {
  const update = (index: number, patch: Partial<FAQItem>) => onChange(faqs.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  const addFaq = () => onChange([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index: number) => onChange(faqs.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Frequently Asked Questions</p>
        <button type="button" onClick={addFaq} className="text-xs font-semibold text-blue hover:text-navy">
          + Add FAQ
        </button>
      </div>
      {faqs.length === 0 ? (
        <p className="text-xs text-ink-faint py-6 text-center border border-dashed border-input-border rounded-xl">No FAQs yet.</p>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-border p-4 space-y-2.5 bg-paper">
              <div className="flex items-start gap-2">
                <TextInput
                  value={faq.question}
                  onChange={(e) => update(index, { question: e.target.value })}
                  placeholder="Question"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  aria-label="Remove FAQ"
                  className="shrink-0 w-9 h-9 rounded-lg border border-input-border text-ink-faint hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
              <TextArea rows={2} value={faq.answer} onChange={(e) => update(index, { answer: e.target.value })} placeholder="Answer" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
