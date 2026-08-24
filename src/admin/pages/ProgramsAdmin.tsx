import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Layers, Loader2 } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { slugify } from '../../lib/storage';
import type { Program } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, ListField } from '../components/ui/Field';
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
  whoItsFor: [''],
  whatItIncludes: [''],
  expectedOutcome: [''],
  coursesIncluded: [''],
});

export const ProgramsAdmin: React.FC = () => {
  const { items: programs, isLoading, error, add, update, remove } = useSupabaseTable<Program>('programs', { orderBy: 'title', ascending: true });
  const [search, setSearch] = useState('');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: Program } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
      alert(err instanceof Error ? err.message : 'Failed to delete program.');
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

      <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#EFECE5]">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-[#8C939E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programs…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F4F1EA] text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-[#8C939E]">
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
                <tr className="text-left text-[10px] uppercase tracking-wider text-[#8C939E] border-b border-[#EFECE5]">
                  <th className="px-5 py-2.5 font-semibold">Program</th>
                  <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Duration</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((program) => (
                  <tr key={program.id} className="border-b border-[#F4F1EA] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#171A1F]">{program.title}</p>
                      <p className="text-xs text-[#8C939E] mt-0.5 max-w-md truncate">{program.tagline}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge variant="blue" size="sm">{program.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-[#5F6670]">{program.duration}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEdit(program)}
                          aria-label={`Edit ${program.title}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5F6670] hover:bg-[#F4F1EA] hover:text-[#17324D] transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(program)}
                          aria-label={`Delete ${program.title}`}
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
        title={drawerState?.mode === 'create' ? 'Add Program' : 'Edit Program'}
        description="Career or professional program details as shown on the live Programs page."
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
    </div>
  );
};
