import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, FolderKanban, Loader2, Eye } from 'lucide-react';
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
import { Toast, useToast } from '../components/ui/Toast';

const CATEGORIES: StudentProject['category'][] = ['Web Development', 'Python Engineering', 'Data Science', 'Kids Coding'];

const emptyProject = (): StudentProject => ({
  id: '',
  title: '',
  category: 'Web Development',
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
  const [viewTarget, setViewTarget] = useState<StudentProject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StudentProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

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
      showToast(err instanceof Error ? err.message : 'Failed to delete project.');
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

      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 mb-5">
        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student work…"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper-alt text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-border shadow-sm flex items-center justify-center gap-2 py-14 text-sm text-ink-faint">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading student work…
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-border shadow-sm px-5 py-10 text-center text-sm text-red-600">
          Failed to load student work: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border shadow-sm">
          <EmptyState icon={FolderKanban} title="No projects found" description="Try a different search term, or add a new project." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
              <ImagePlaceholder src={project.image} alt={project.title} aspectRatio="video" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="sage" size="sm">{project.category}</Badge>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewTarget(project)}
                      aria-label={`View details for ${project.title}`}
                      title="View project details"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-soft hover:bg-[#F0F5FA] hover:text-blue transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(project)}
                      aria-label={`Edit ${project.title}`}
                      title="Edit project"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-soft hover:bg-paper-alt hover:text-navy transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(project)}
                      aria-label={`Delete ${project.title}`}
                      title="Delete project"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-soft hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-ink mt-2.5 line-clamp-2">{project.title}</h3>
                <p className="text-xs text-ink-faint mt-1 line-clamp-2">{project.completionContext}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-paper-alt text-ink-soft">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-medium px-2 py-0.5 text-ink-faint">
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
              className="px-3.5 py-2 text-sm font-semibold text-ink-soft hover:text-ink"
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
                  placeholder="e.g. Web Development Capstone Project"
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
                placeholder="e.g. JavaScript"
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

      {/* In-Dashboard Read-Only Student Project Inspection Drawer */}
      <Drawer
        isOpen={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Student Project Overview"
        description={viewTarget?.title || ''}
        widthClass="max-w-2xl"
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
              Edit This Project
            </Button>
          </>
        }
      >
        {viewTarget && (
          <div className="space-y-6">
            {/* Banner Preview */}
            <div className="rounded-2xl overflow-hidden border border-border bg-white">
              <ImagePlaceholder src={viewTarget.image} alt={viewTarget.title} aspectRatio="video" />
            </div>

            {/* Header Telemetry */}
            <div className="p-5 rounded-2xl bg-navy text-white space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="sage" size="sm">{viewTarget.category}</Badge>
                {viewTarget.isPlaceholder && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200 border border-amber-500/30">
                    Sample / Placeholder
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{viewTarget.title}</h3>
              {viewTarget.completionContext && (
                <p className="text-xs text-navy-mist font-medium">{viewTarget.completionContext}</p>
              )}
              <p className="text-xs text-white/80 leading-relaxed">{viewTarget.description}</p>
            </div>

            {/* Links */}
            {(viewTarget.liveUrl || viewTarget.githubUrl) && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border">
                {viewTarget.liveUrl && (
                  <a
                    href={viewTarget.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue hover:underline"
                  >
                    View Live Deployment ↗
                  </a>
                )}
                {viewTarget.liveUrl && viewTarget.githubUrl && <span className="text-input-border">|</span>}
                {viewTarget.githubUrl && (
                  <a
                    href={viewTarget.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-navy hover:underline"
                  >
                    Source Code (GitHub) ↗
                  </a>
                )}
              </div>
            )}

            {/* Technologies */}
            {viewTarget.technologies && viewTarget.technologies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.technologies.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-input-border text-xs font-mono text-navy">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {viewTarget.highlights && viewTarget.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Project Highlights & Achievements</h4>
                <ul className="text-xs text-ink-soft space-y-1.5 pl-3">
                  {viewTarget.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};
