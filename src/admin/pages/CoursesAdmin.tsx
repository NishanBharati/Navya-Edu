import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, GraduationCap, Star, Loader2 } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { slugify } from '../../lib/storage';
import type { Course, CurriculumModule, ProjectExample, FAQItem } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, ListField, TagsField, Toggle } from '../components/ui/Field';
import { ImageUpload } from '../components/ui/ImageUpload';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const CATEGORIES: Course['category'][] = ['Development', 'Data & AI', 'Design', 'Cloud & DevOps', 'Cybersecurity', 'Digital Skills'];
const LEVELS: Course['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Intermediate', 'Intermediate to Advanced'];
const MODES: Course['mode'][] = ['Classroom / In-Person', 'Online Live', 'Hybrid (Classroom & Online)'];

type TabId = 'overview' | 'batch' | 'curriculum' | 'content' | 'instructor' | 'seo';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'batch', label: 'Batch & Fee' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'content', label: 'Audience & Outcomes' },
  { id: 'instructor', label: 'Instructor' },
  { id: 'seo', label: 'SEO' },
];

const emptyCourse = (): Course => ({
  id: '',
  slug: '',
  title: '',
  category: 'Development',
  shortDescription: '',
  description: '',
  heroImage: '',
  duration: '',
  level: 'Beginner to Intermediate',
  mode: 'Classroom / In-Person',
  featured: false,
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

export const CoursesAdmin: React.FC = () => {
  const { items: courses, isLoading, error, add, update, remove } = useSupabaseTable<Course>('courses', { orderBy: 'title', ascending: true });
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: Course; tab: TabId } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
      alert(err instanceof Error ? err.message : 'Failed to delete course.');
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
          <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
            Add Course
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#EFECE5] flex flex-col sm:flex-row gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="w-4 h-4 text-[#8C939E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F4F1EA] text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#F4F1EA] text-sm text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-colors sm:max-w-[180px]"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-[#8C939E]">
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
                <tr className="text-left text-[10px] uppercase tracking-wider text-[#8C939E] border-b border-[#EFECE5]">
                  <th className="px-5 py-2.5 font-semibold">Course</th>
                  <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Duration</th>
                  <th className="px-5 py-2.5 font-semibold hidden lg:table-cell">Level</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course) => (
                  <tr key={course.id} className="border-b border-[#F4F1EA] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {course.featured && <Star className="w-3.5 h-3.5 text-[#C88A3D] fill-[#C88A3D] shrink-0" />}
                        <div className="min-w-0">
                          <p className="font-medium text-[#171A1F] truncate max-w-[260px]">{course.title}</p>
                          <p className="text-xs text-[#8C939E] truncate max-w-[260px]">{course.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge variant="navy" size="sm">{course.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-[#5F6670]">{course.duration}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-[#5F6670]">{course.level}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEdit(course)}
                          aria-label={`Edit ${course.title}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5F6670] hover:bg-[#F4F1EA] hover:text-[#17324D] transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(course)}
                          aria-label={`Delete ${course.title}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5F6670] hover:bg-red-50 hover:text-red-600 transition-colors"
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
              className="mr-auto px-3.5 py-2 text-sm font-semibold text-[#5F6670] hover:text-[#171A1F]"
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
            <div className="flex flex-wrap gap-1.5 mb-6 border-b border-[#E8E4DA] -mt-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDrawerState({ ...drawerState, tab: tab.id })}
                  className={`px-3 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors ${
                    drawerState.tab === tab.id
                      ? 'border-[#17324D] text-[#17324D]'
                      : 'border-transparent text-[#8C939E] hover:text-[#171A1F]'
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
                    placeholder="e.g. MERN Stack Web Development"
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
                    placeholder="e.g. React 18+"
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
                onModulesChange={(curriculum) => setDraft((d) => ({ ...d, curriculum }))}
                onProjectsChange={(projects) => setDraft((d) => ({ ...d, projects }))}
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

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this course?"
        description={`"${deleteTarget?.title}" will be removed from the live Courses page and all listings. This cannot be undone.`}
        confirmLabel="Delete Course"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

interface CurriculumTabProps {
  modules: CurriculumModule[];
  projects: ProjectExample[];
  onModulesChange: (modules: CurriculumModule[]) => void;
  onProjectsChange: (projects: ProjectExample[]) => void;
}

const CurriculumTab: React.FC<CurriculumTabProps> = ({ modules, projects, onModulesChange, onProjectsChange }) => {
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
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8C939E]">Curriculum Modules</p>
          <button type="button" onClick={addModule} className="text-xs font-semibold text-[#356A9A] hover:text-[#17324D]">
            + Add Module
          </button>
        </div>
        {modules.length === 0 ? (
          <p className="text-xs text-[#8C939E] py-6 text-center border border-dashed border-[#D8D2C6] rounded-xl">No modules yet.</p>
        ) : (
          <div className="space-y-3">
            {modules.map((module, index) => (
              <div key={index} className="rounded-xl border border-[#E8E4DA] p-4 space-y-3 bg-[#FAFAF8]">
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
                    className="shrink-0 w-9 h-9 rounded-lg border border-[#D8D2C6] text-[#8C939E] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
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
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8C939E]">Project Examples</p>
          <button type="button" onClick={addProject} className="text-xs font-semibold text-[#356A9A] hover:text-[#17324D]">
            + Add Project
          </button>
        </div>
        {projects.length === 0 ? (
          <p className="text-xs text-[#8C939E] py-6 text-center border border-dashed border-[#D8D2C6] rounded-xl">No project examples yet.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index} className="rounded-xl border border-[#E8E4DA] p-4 space-y-3 bg-[#FAFAF8]">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <TextInput value={project.title} onChange={(e) => updateProject(index, { title: e.target.value })} placeholder="Project title" />
                    <TextInput value={project.type || ''} onChange={(e) => updateProject(index, { type: e.target.value })} placeholder="Project type" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    aria-label="Remove project"
                    className="shrink-0 w-9 h-9 rounded-lg border border-[#D8D2C6] text-[#8C939E] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
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
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8C939E]">Frequently Asked Questions</p>
        <button type="button" onClick={addFaq} className="text-xs font-semibold text-[#356A9A] hover:text-[#17324D]">
          + Add FAQ
        </button>
      </div>
      {faqs.length === 0 ? (
        <p className="text-xs text-[#8C939E] py-6 text-center border border-dashed border-[#D8D2C6] rounded-xl">No FAQs yet.</p>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-[#E8E4DA] p-4 space-y-2.5 bg-[#FAFAF8]">
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
                  className="shrink-0 w-9 h-9 rounded-lg border border-[#D8D2C6] text-[#8C939E] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
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
