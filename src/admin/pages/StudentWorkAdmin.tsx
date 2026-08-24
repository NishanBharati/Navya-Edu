import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, FolderKanban, Loader2 } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import type { StudentProject } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, ListField, Toggle } from '../components/ui/Field';
import { ImageUpload } from '../components/ui/ImageUpload';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ImagePlaceholder } from '../../components/common/ImagePlaceholder';

const CATEGORIES: StudentProject['category'][] = ['Web', 'Mobile', 'AI', 'UI/UX', 'Data'];

const emptyProject = (): StudentProject => ({
  id: '',
  title: '',
  category: 'Web',
  technologies: [''],
  description: '',
  image: '',
  completionContext: '',
  highlights: [''],
  isPlaceholder: false,
});

export const StudentWorkAdmin: React.FC = () => {
  const { items: projects, isLoading, error, add, update, remove } = useSupabaseTable<StudentProject>('student_projects', { orderBy: 'title', ascending: true });
  const [search, setSearch] = useState('');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: StudentProject } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StudentProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [projects, search]);

  const openCreate = () => {
    setSaveError(null);
    setDrawerState({ mode: 'create', draft: emptyProject() });
  };
  const openEdit = (project: StudentProject) => {
    setSaveError(null);
    setDrawerState({ mode: 'edit', draft: { ...project } });
  };

  const handleSave = async () => {
    if (!drawerState) return;
    const draft = drawerState.draft;
    if (!draft.title.trim()) return;

    const cleaned: StudentProject = {
      ...draft,
      technologies: draft.technologies.filter((s) => s.trim()),
      highlights: draft.highlights.filter((s) => s.trim()),
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
      setSaveError(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete project.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Student Work"
        description="Capstone and portfolio projects featured on the live Student Work showcase."
        actions={
          <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
            Add Project
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm p-4 mb-5">
        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-[#8C939E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student work…"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F4F1EA] text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm flex items-center justify-center gap-2 py-14 text-sm text-[#8C939E]">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading student work…
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm px-5 py-10 text-center text-sm text-red-600">
          Failed to load student work: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm">
          <EmptyState icon={FolderKanban} title="No projects found" description="Try a different search term, or add a new project." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden group">
              <ImagePlaceholder src={project.image} alt={project.title} aspectRatio="video" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="sage" size="sm">{project.category}</Badge>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(project)}
                      aria-label={`Edit ${project.title}`}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5F6670] hover:bg-[#F4F1EA] hover:text-[#17324D] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(project)}
                      aria-label={`Delete ${project.title}`}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5F6670] hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#171A1F] mt-2.5 line-clamp-2">{project.title}</h3>
                <p className="text-xs text-[#8C939E] mt-1 line-clamp-2">{project.completionContext}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F4F1EA] text-[#5F6670]">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-medium px-2 py-0.5 text-[#8C939E]">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        isOpen={!!drawerState}
        onClose={() => setDrawerState(null)}
        title={drawerState?.mode === 'create' ? 'Add Student Project' : 'Edit Student Project'}
        description="Portfolio project details as shown on the live Student Work page."
        widthClass="max-w-2xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDrawerState(null)}
              className="px-3.5 py-2 text-sm font-semibold text-[#5F6670] hover:text-[#171A1F]"
            >
              Cancel
            </button>
            <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : drawerState?.mode === 'create' ? 'Add Project' : 'Save Changes'}
            </Button>
          </>
        }
      >
        {drawerState && (
          <div className="space-y-5">
            {saveError && (
              <div className="px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700">
                {saveError}
              </div>
            )}
            <Field label="Project Title" required>
              <TextInput
                value={drawerState.draft.title}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, title: e.target.value } })}
                placeholder="e.g. RemitFlow: Cross-Border Remittance Portal"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Select
                  value={drawerState.draft.category}
                  onChange={(e) =>
                    setDrawerState({ ...drawerState, draft: { ...drawerState.draft, category: e.target.value as StudentProject['category'] } })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Completion Context">
                <TextInput
                  value={drawerState.draft.completionContext}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, completionContext: e.target.value } })}
                  placeholder="e.g. MERN Stack Capstone Project"
                />
              </Field>
            </div>

            <Field label="Cover Image">
              <ImageUpload
                value={drawerState.draft.image}
                onChange={(url) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, image: url } })}
                folder="student-work"
                hint="Portfolio screenshot or project preview image."
              />
            </Field>

            <Field label="Description">
              <TextArea
                rows={3}
                value={drawerState.draft.description}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, description: e.target.value } })}
              />
            </Field>

            <Field label="Technologies">
              <ListField
                items={drawerState.draft.technologies}
                onChange={(items) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, technologies: items } })}
                placeholder="e.g. React"
                addLabel="Add technology"
              />
            </Field>

            <Field label="Highlights">
              <ListField
                items={drawerState.draft.highlights}
                onChange={(items) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, highlights: items } })}
                placeholder="e.g. JWT Authentication with refresh token rotation"
                addLabel="Add highlight"
              />
            </Field>

            <Toggle
              checked={!!drawerState.draft.isPlaceholder}
              onChange={(checked) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, isPlaceholder: checked } })}
              label="Mark as placeholder project"
              description="Flags this entry as sample content rather than a verified student submission."
            />
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this project?"
        description={`"${deleteTarget?.title}" will be removed from the live Student Work page. This cannot be undone.`}
        confirmLabel="Delete Project"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
