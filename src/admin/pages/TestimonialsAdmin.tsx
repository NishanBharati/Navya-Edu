import React, { useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Quote,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Star,
  Loader2,
  FileCheck,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import type { Testimonial, TestimonialStatus } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, Toggle } from '../components/ui/Field';
import { ImageUpload } from '../components/ui/ImageUpload';
import { Toast, useToast } from '../components/ui/Toast';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const emptyTestimonial = (): Testimonial => ({
  id: '',
  studentName: '',
  cohortOrCourse: '',
  role: '',
  company: '',
  avatar: '',
  quote: '',
  rating: 5,
  consentConfirmed: false,
  consentDate: new Date().toISOString().split('T')[0],
  verificationNotes: '',
  status: 'Pending Approval',
  featured: false,
});

export const TestimonialsAdmin: React.FC = () => {
  const { items: testimonials, isLoading, error, add, update, remove } = useSupabaseTable<Testimonial>('testimonials', {
    orderBy: 'createdAt',
  });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TestimonialStatus | 'All'>('All');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: Testimonial } | null>(null);
  const [viewTarget, setViewTarget] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return testimonials.filter((t) => {
      const matchesQuery =
        !q ||
        t.studentName.toLowerCase().includes(q) ||
        t.cohortOrCourse.toLowerCase().includes(q) ||
        (t.company && t.company.toLowerCase().includes(q)) ||
        t.quote.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [testimonials, search, statusFilter]);

  const counts = useMemo(() => {
    const map = { All: testimonials.length, 'Pending Approval': 0, Approved: 0, Hidden: 0 };
    testimonials.forEach((t) => {
      if (t.status in map) {
        map[t.status as TestimonialStatus]++;
      }
    });
    return map;
  }, [testimonials]);

  const openCreate = () => {
    setSaveError(null);
    setDrawerState({ mode: 'create', draft: emptyTestimonial() });
  };

  const openEdit = (t: Testimonial) => {
    setSaveError(null);
    setDrawerState({ mode: 'edit', draft: { ...t } });
  };

  const handleApprove = async (t: Testimonial) => {
    if (!t.consentConfirmed) {
      showToast('Cannot approve: Signed student consent record must be confirmed first.');
      return;
    }
    try {
      await update(t.id, { status: 'Approved' });
      showToast(`Testimonial by "${t.studentName}" is now Approved and visible on site.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to approve testimonial.');
    }
  };

  const handleHide = async (t: Testimonial) => {
    try {
      await update(t.id, { status: 'Hidden' });
      showToast(`Testimonial by "${t.studentName}" has been hidden from site.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to hide testimonial.');
    }
  };

  const handleSave = async () => {
    if (!drawerState) return;
    const draft = drawerState.draft;

    if (!draft.studentName.trim()) {
      setSaveError('Student/Graduate Name is required.');
      return;
    }
    if (!draft.quote.trim()) {
      setSaveError('Testimonial Quote is required.');
      return;
    }
    if (!draft.cohortOrCourse.trim()) {
      setSaveError('Cohort or Course reference is required.');
      return;
    }
    if (draft.status === 'Approved' && !draft.consentConfirmed) {
      setSaveError('Institutional Policy: Testimonials cannot be set to "Approved" without confirming signed student consent on file.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    try {
      const payload: Partial<Testimonial> = {
        ...draft,
        studentName: draft.studentName.trim(),
        cohortOrCourse: draft.cohortOrCourse.trim(),
        role: draft.role?.trim() || '',
        company: draft.company?.trim() || '',
        quote: draft.quote.trim(),
        verificationNotes: draft.verificationNotes?.trim() || '',
      };

      if (drawerState.mode === 'create') {
        const { id: _omit, ...toInsert } = payload;
        await add(toInsert);
        showToast('Testimonial recorded successfully.');
      } else {
        await update(draft.id, payload);
        showToast('Testimonial updated successfully.');
      }
      setDrawerState(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save testimonial.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      showToast('Testimonial removed successfully.');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete testimonial.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Testimonials & Verification"
        description="Authentic student reflections and graduate feedback verified with signed student consent."
        actions={
          <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
            Add Testimonial
          </Button>
        }
      />

      {/* Institutional Policy Notice */}
      <div className="mb-6 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-navy flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-navy block text-sm">
            Strict Authentic Testimonial Standard
          </strong>
          <p className="text-ink-soft leading-relaxed">
            In compliance with Navya Ed Tech institutional policy, fabricated reviews and artificial ratings are prohibited.
            Only graduate feedback with verified capstone defense and documented written consent can be published on public landing pages.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 pt-3 pb-1 border-b border-border-soft overflow-x-auto text-xs">
          {(['All', 'Pending Approval', 'Approved', 'Hidden'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                statusFilter === status
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-ink-soft hover:bg-paper-alt hover:text-ink'
              }`}
            >
              <span>{status === 'All' ? 'All Records' : status}</span>
              <span
                className={`text-xs px-1.5 py-0.2 rounded-full ${
                  statusFilter === status ? 'bg-white/20 text-white' : 'bg-paper-alt text-ink-faint'
                }`}
              >
                {counts[status]}
              </span>
            </button>
          ))}
        </div>

        <div className="p-4 border-b border-border-soft flex flex-col sm:flex-row gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, company, quote…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper-alt text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-ink-faint">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading testimonials…
          </div>
        ) : error ? (
          <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load testimonials: {error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Quote}
            title="No testimonials found"
            description="Add an authentic graduate review with signed consent to showcase student outcomes."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink-faint border-b border-border-soft">
                  <th className="px-5 py-2.5 font-semibold">Student / Graduate</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Quote Snippet</th>
                  <th className="px-5 py-2.5 font-semibold">Consent Status</th>
                  <th className="px-5 py-2.5 font-semibold">Review Status</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-paper-alt last:border-0 hover:bg-paper transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-navy/10 text-navy border border-navy/20 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                          {t.avatar ? (
                            <img src={t.avatar} alt={t.studentName} className="w-full h-full object-cover" />
                          ) : (
                            t.studentName.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-ink truncate max-w-[200px] flex items-center gap-1.5">
                            {t.studentName}
                            {t.featured && <Star className="w-3 h-3 text-amber fill-amber shrink-0" />}
                          </p>
                          <p className="text-xs text-ink-faint truncate max-w-[200px]">
                            {t.role && t.company ? `${t.role} @ ${t.company}` : t.cohortOrCourse}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-xs text-ink-soft max-w-sm">
                      <p className="line-clamp-2 italic">&ldquo;{t.quote}&rdquo;</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {t.consentConfirmed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <FileCheck className="w-3 h-3" /> Signed Consent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                          <AlertTriangle className="w-3 h-3" /> Missing Consent
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {t.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {t.status === 'Pending Approval' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Pending Review
                        </span>
                      )}
                      {t.status === 'Hidden' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                          <EyeOff className="w-3 h-3" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Approval / Hide Action Toggle */}
                        {t.status !== 'Approved' ? (
                          <button
                            type="button"
                            onClick={() => handleApprove(t)}
                            disabled={!t.consentConfirmed}
                            title={t.consentConfirmed ? 'Approve testimonial for live site' : 'Requires signed consent first'}
                            className={`px-2 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                              t.consentConfirmed
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" /> Approve
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleHide(t)}
                            title="Hide testimonial from live site"
                            className="px-2 py-1 rounded text-xs font-medium text-ink-faint hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                          >
                            Hide
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setViewTarget(t)}
                          aria-label={`Preview ${t.studentName}`}
                          title="Preview testimonial"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-paper-alt hover:text-blue transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(t)}
                          aria-label={`Edit ${t.studentName}`}
                          title="Edit testimonial"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-paper-alt hover:text-navy transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(t)}
                          aria-label={`Delete ${t.studentName}`}
                          title="Delete testimonial"
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

      {/* Create / Edit Drawer */}
      <Drawer
        isOpen={!!drawerState}
        onClose={() => setDrawerState(null)}
        title={drawerState?.mode === 'create' ? 'Record Authentic Testimonial' : 'Edit Testimonial'}
        description="Institutional record requiring graduate consent verification."
        widthClass="max-w-2xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDrawerState(null)}
              className="px-3.5 py-2 text-sm font-semibold text-ink-soft hover:text-ink cursor-pointer"
            >
              Cancel
            </button>
            <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Testimonial'}
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

            <Field label="Student / Graduate Name" required>
              <TextInput
                value={drawerState.draft.studentName}
                onChange={(e) =>
                  setDrawerState({
                    ...drawerState,
                    draft: { ...drawerState.draft, studentName: e.target.value },
                  })
                }
                placeholder="e.g. Aarav Sharma"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Cohort or Course Track" required>
                <TextInput
                  value={drawerState.draft.cohortOrCourse}
                  onChange={(e) =>
                    setDrawerState({
                      ...drawerState,
                      draft: { ...drawerState.draft, cohortOrCourse: e.target.value },
                    })
                  }
                  placeholder="e.g. Python Advance 2026 Batch"
                />
              </Field>
              <Field label="Current Role & Organization">
                <TextInput
                  value={drawerState.draft.role}
                  onChange={(e) =>
                    setDrawerState({
                      ...drawerState,
                      draft: { ...drawerState.draft, role: e.target.value },
                    })
                  }
                  placeholder="e.g. Junior Frontend Developer"
                />
              </Field>
            </div>

            <Field label="Hiring Partner / Company">
              <TextInput
                value={drawerState.draft.company}
                onChange={(e) =>
                  setDrawerState({
                    ...drawerState,
                    draft: { ...drawerState.draft, company: e.target.value },
                  })
                }
                placeholder="e.g. CloudTech Solutions Nepal"
              />
            </Field>

            <Field label="Student Photo / Avatar">
              <ImageUpload
                value={drawerState.draft.avatar}
                onChange={(url) =>
                  setDrawerState({
                    ...drawerState,
                    draft: { ...drawerState.draft, avatar: url },
                  })
                }
                folder="testimonials"
                hint="Authentic photograph of the graduate (PNG/JPG)."
              />
            </Field>

            <Field label="Authentic Quote / Learning Reflection" required>
              <TextArea
                rows={4}
                value={drawerState.draft.quote}
                onChange={(e) =>
                  setDrawerState({
                    ...drawerState,
                    draft: { ...drawerState.draft, quote: e.target.value },
                  })
                }
                placeholder="Detailed testimonial on mentor code reviews, capstone defense, and career outcome..."
              />
            </Field>

            {/* Mandatory Signed Consent & Institutional Verification Box */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                <FileCheck className="w-4 h-4 text-blue" />
                <span>Verification & Signed Consent Audit Record</span>
              </div>

              <div className="space-y-3">
                <Toggle
                  checked={drawerState.draft.consentConfirmed}
                  onChange={(checked) =>
                    setDrawerState({
                      ...drawerState,
                      draft: { ...drawerState.draft, consentConfirmed: checked },
                    })
                  }
                  label="Signed Student Consent Document Confirmed"
                  description="Required before any review can be published. Graduate has given written authorization to share their reflection."
                />

                <Field label="Consent Confirmation Date">
                  <TextInput
                    type="date"
                    value={drawerState.draft.consentDate || ''}
                    onChange={(e) =>
                      setDrawerState({
                        ...drawerState,
                        draft: { ...drawerState.draft, consentDate: e.target.value },
                      })
                    }
                  />
                </Field>

                <Field label="Verification Audit Notes" hint="Record mentor panel defense details, cohort exam score, or GitHub link.">
                  <TextInput
                    value={drawerState.draft.verificationNotes || ''}
                    onChange={(e) =>
                      setDrawerState({
                        ...drawerState,
                        draft: { ...drawerState.draft, verificationNotes: e.target.value },
                      })
                    }
                    placeholder="e.g. Capstone project defended on August 2026 before mentor panel."
                  />
                </Field>
              </div>
            </div>

            {/* Status & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-paper-alt border border-border">
              <Field label="Publication Status">
                <Select
                  value={drawerState.draft.status}
                  onChange={(e) =>
                    setDrawerState({
                      ...drawerState,
                      draft: { ...drawerState.draft, status: e.target.value as TestimonialStatus },
                    })
                  }
                >
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Approved">Approved (Public)</option>
                  <option value="Hidden">Hidden (Unlisted)</option>
                </Select>
              </Field>

              <div className="pt-2">
                <Toggle
                  checked={drawerState.draft.featured ?? false}
                  onChange={(checked) =>
                    setDrawerState({
                      ...drawerState,
                      draft: { ...drawerState.draft, featured: checked },
                    })
                  }
                  label="Featured Review"
                  description="Highlight on homepage outcomes section."
                />
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Read-Only Preview Drawer */}
      <Drawer
        isOpen={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Testimonial Verification Preview"
        description={viewTarget?.studentName || ''}
        widthClass="max-w-xl"
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
              Edit Testimonial
            </Button>
          </>
        }
      >
        {viewTarget && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-border space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
                  {viewTarget.avatar ? (
                    <img src={viewTarget.avatar} alt={viewTarget.studentName} className="w-full h-full object-cover" />
                  ) : (
                    viewTarget.studentName.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">{viewTarget.studentName}</h3>
                  <p className="text-xs text-ink-soft">
                    {viewTarget.role && viewTarget.company
                      ? `${viewTarget.role} @ ${viewTarget.company}`
                      : viewTarget.cohortOrCourse}
                  </p>
                  <p className="text-xs text-ink-faint">{viewTarget.cohortOrCourse}</p>
                </div>
              </div>

              <blockquote className="text-sm text-ink-soft italic leading-relaxed border-l-2 border-navy pl-3 py-1">
                &ldquo;{viewTarget.quote}&rdquo;
              </blockquote>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-ink-faint">
                <span className="flex items-center gap-1">
                  {Array.from({ length: viewTarget.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber fill-amber" />
                  ))}
                </span>
                <span>{viewTarget.status}</span>
              </div>
            </div>

            {/* Consent Audit Box */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-navy">
                <ShieldCheck className="w-4 h-4 text-blue" />
                <span>Institutional Consent Record</span>
              </div>
              <p className="text-ink-soft">
                Consent Confirmed:{' '}
                <strong className={viewTarget.consentConfirmed ? 'text-emerald-700' : 'text-red-700'}>
                  {viewTarget.consentConfirmed ? 'Yes (Signed on File)' : 'No'}
                </strong>
              </p>
              {viewTarget.consentDate && (
                <p className="text-ink-soft">Date Authorized: {viewTarget.consentDate}</p>
              )}
              {viewTarget.verificationNotes && (
                <p className="text-ink-soft">Audit Notes: {viewTarget.verificationNotes}</p>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this testimonial?"
        description={`The review by "${deleteTarget?.studentName}" will be permanently removed.`}
        confirmLabel="Delete Testimonial"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};
