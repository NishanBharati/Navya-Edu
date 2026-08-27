import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Layers, Loader2, FileText, Eye } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { slugify } from '../../lib/storage';
import type { Program } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, ListField } from '../components/ui/Field';
import { PdfUpload } from '../components/ui/PdfUpload';
import { Toast, useToast } from '../components/ui/Toast';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const CATEGORIES: Program['category'][] = ['Career Programs', 'Professional Programs', 'Short Courses', 'Internship Programs'];

const emptyProgram = (): Program => ({
  id: '',
  slug: '',
  title: '',
  category: 'Career Programs',
  tagline: '',
  description: '',
  duration: '',
  format: '',
  eligibility: '',
  syllabusPdfUrl: '',
  whoItsFor: [''],
  whatItIncludes: [''],
  expectedOutcome: [''],
  coursesIncluded: [''],
});

export const ProgramsAdmin: React.FC = () => {
  const { items: programs, isLoading, error, add, update, remove } = useSupabaseTable<Program>('programs', { orderBy: 'title', ascending: true });
  const [search, setSearch] = useState('');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: Program } | null>(null);
  const [viewTarget, setViewTarget] = useState<Program | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return programs;
    return programs.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [programs, search]);

  const openCreate = () => {
    setSaveError(null);
    setDrawerState({ mode: 'create', draft: emptyProgram() });
  };
  const openEdit = (program: Program) => {
    setSaveError(null);
    setDrawerState({ mode: 'edit', draft: { ...program } });
  };

  const handleSave = async () => {
    if (!drawerState) return;
    const draft = drawerState.draft;
    if (!draft.title.trim()) return;

    const cleaned: Program = {
      ...draft,
      slug: draft.slug || slugify(draft.title),
      whoItsFor: draft.whoItsFor.filter((s) => s.trim()),
      whatItIncludes: draft.whatItIncludes.filter((s) => s.trim()),
      expectedOutcome: draft.expectedOutcome.filter((s) => s.trim()),
      coursesIncluded: draft.coursesIncluded?.filter((s) => s.trim()),
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
      setSaveError(err instanceof Error ? err.message : 'Failed to save program.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete program.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Programs"
        description="Career, professional and internship programs shown on the live Programs page."
        actions={
          <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
            Add Program
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border-soft">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper-alt text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-ink-faint">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading programs…
          </div>
        ) : error ? (
          <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load programs: {error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Layers} title="No programs found" description="Try a different search term, or add a new program." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-ink-faint border-b border-border-soft">
                  <th className="px-5 py-2.5 font-semibold">Program</th>
                  <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Duration</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((program) => (
                  <tr key={program.id} className="border-b border-paper-alt last:border-0 hover:bg-paper transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ink">{program.title}</p>
                        {program.syllabusPdfUrl && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-navy border border-blue-200 shrink-0" title="Custom syllabus PDF attached">
                            <FileText className="w-3 h-3 text-blue" /> PDF
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-faint truncate max-w-[280px]">{program.tagline}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge variant="blue" size="sm">{program.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-ink-soft">{program.duration}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewTarget(program)}
                          aria-label={`View details for ${program.title}`}
                          title="View program details"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-[#F0F5FA] hover:text-blue transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(program)}
                          aria-label={`Edit ${program.title}`}
                          title="Edit program"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-paper-alt hover:text-navy transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(program)}
                          aria-label={`Delete ${program.title}`}
                          title="Delete program"
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
        title={drawerState?.mode === 'create' ? 'Add Program' : 'Edit Program'}
        description="Career or professional program details as shown on the live Programs page."
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
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : drawerState?.mode === 'create' ? 'Create Program' : 'Save Changes'}
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
            <Field label="Title" required>
              <TextInput
                value={drawerState.draft.title}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, title: e.target.value } })}
                placeholder="e.g. Full Stack Engineering Career Program"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Select
                  value={drawerState.draft.category}
                  onChange={(e) =>
                    setDrawerState({ ...drawerState, draft: { ...drawerState.draft, category: e.target.value as Program['category'] } })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Duration">
                <TextInput
                  value={drawerState.draft.duration}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, duration: e.target.value } })}
                  placeholder="e.g. 6 Months (24 Weeks)"
                />
              </Field>
            </div>

            <Field label="Tagline">
              <TextInput
                value={drawerState.draft.tagline}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, tagline: e.target.value } })}
              />
            </Field>

            <Field label="Description">
              <TextArea
                rows={3}
                value={drawerState.draft.description}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, description: e.target.value } })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Format">
                <TextInput
                  value={drawerState.draft.format}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, format: e.target.value } })}
                  placeholder="e.g. Classroom Immersion"
                />
              </Field>
              <Field label="Eligibility">
                <TextInput
                  value={drawerState.draft.eligibility}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, eligibility: e.target.value } })}
                />
              </Field>
            </div>

            <Field label="Who It's For">
              <ListField
                items={drawerState.draft.whoItsFor}
                onChange={(items) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, whoItsFor: items } })}
                placeholder="e.g. Fresh graduates seeking their first developer role"
                addLabel="Add audience"
              />
            </Field>

            <Field label="What It Includes">
              <ListField
                items={drawerState.draft.whatItIncludes}
                onChange={(items) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, whatItIncludes: items } })}
                placeholder="e.g. Advanced Database Architecture & REST API Design"
                addLabel="Add inclusion"
              />
            </Field>

            <Field label="Expected Outcome">
              <ListField
                items={drawerState.draft.expectedOutcome}
                onChange={(items) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, expectedOutcome: items } })}
                placeholder="e.g. Ability to build and deploy full-stack applications"
                addLabel="Add outcome"
              />
            </Field>

            <Field label="Courses Included" hint="Course titles bundled into this program.">
              <ListField
                items={drawerState.draft.coursesIncluded || []}
                onChange={(items) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, coursesIncluded: items } })}
                placeholder="e.g. MERN Stack Web Development"
                addLabel="Add course"
              />
            </Field>

            <Field label="Official Program Brochure / Syllabus PDF">
              <PdfUpload
                value={drawerState.draft.syllabusPdfUrl || ''}
                onChange={(url) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, syllabusPdfUrl: url } })}
                folder="syllabi"
                hint="Upload official Career Fellowship / Program Syllabus PDF (max. 25MB)."
              />
            </Field>
          </div>
        )}
      </Drawer>

      {/* In-Dashboard Read-Only Program Inspection Drawer */}
      <Drawer
        isOpen={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Program Overview & Curriculum"
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
              Edit This Program
            </Button>
          </>
        }
      >
        {viewTarget && (
          <div className="space-y-6">
            {/* Header Telemetry */}
            <div className="p-5 rounded-2xl bg-navy text-white space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="blue" size="sm">{viewTarget.category}</Badge>
                {viewTarget.format && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/90">
                    {viewTarget.format}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{viewTarget.title}</h3>
              {viewTarget.tagline && <p className="text-xs text-navy-mist font-medium">{viewTarget.tagline}</p>}
              <p className="text-xs text-white/80 leading-relaxed">{viewTarget.description}</p>

              <div className="pt-2 border-t border-white/15 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-navy-mist block">Duration</span>
                  <span className="font-semibold text-white">{viewTarget.duration || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-navy-mist block">Eligibility</span>
                  <span className="font-semibold text-white">{viewTarget.eligibility || 'Open Admission'}</span>
                </div>
              </div>
            </div>

            {/* Attached Syllabus PDF Section */}
            {viewTarget.syllabusPdfUrl && (
              <div className="p-4 rounded-2xl border border-blue-mist bg-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue" /> Official Program Brochure / PDF
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-navy" />
                    <span className="text-xs font-semibold text-navy">Official Brochure Attached</span>
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
              </div>
            )}

            {/* Courses Included */}
            {viewTarget.coursesIncluded && viewTarget.coursesIncluded.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Courses Included in Program</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.coursesIncluded.map((c, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-input-border text-xs font-medium text-navy">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* What It Includes */}
            {viewTarget.whatItIncludes && viewTarget.whatItIncludes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Curriculum Modules & Inclusions</h4>
                <ul className="text-xs text-ink-soft space-y-1.5 pl-3">
                  {viewTarget.whatItIncludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Audience & Outcomes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {viewTarget.whoItsFor && viewTarget.whoItsFor.length > 0 && (
                <div className="p-4 rounded-xl bg-paper border border-border space-y-2">
                  <h5 className="text-xs font-bold text-ink">Who It&apos;s For</h5>
                  <ul className="text-xs text-ink-soft space-y-1">
                    {viewTarget.whoItsFor.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {viewTarget.expectedOutcome && viewTarget.expectedOutcome.length > 0 && (
                <div className="p-4 rounded-xl bg-paper border border-border space-y-2">
                  <h5 className="text-xs font-bold text-ink">Expected Outcomes</h5>
                  <ul className="text-xs text-ink-soft space-y-1">
                    {viewTarget.expectedOutcome.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this program?"
        description={`"${deleteTarget?.title}" will be removed from the live Programs page. This cannot be undone.`}
        confirmLabel="Delete Program"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};
