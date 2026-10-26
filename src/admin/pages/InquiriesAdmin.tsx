import React, { useMemo, useState } from 'react';
import { Search, Trash2, Inbox, Mail, Phone, Calendar, BookOpen, MonitorSmartphone, Tag, Loader2, AlertTriangle, Download, Database, ShieldCheck, Archive, Clock } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { getLocalInquiries, removeLocalInquiry, LocalQueuedInquiry } from '../../lib/inquiryService';
import type { Course, Inquiry, InquiryStatus } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextArea } from '../components/ui/Field';
import { StatusBadge, STATUS_OPTIONS } from '../components/ui/StatusBadge';
import { Toast, useToast } from '../components/ui/Toast';
import { Button } from '../../components/common/Button';

export const InquiriesAdmin: React.FC = () => {
  const { items: inquiries, isLoading, error, update, remove } = useSupabaseTable<Inquiry>('inquiries', { orderBy: 'createdAt' });
  const { items: courses } = useSupabaseTable<Course>('courses');
  const { toast, showToast, dismissToast } = useToast();

  const [localInquiries, setLocalInquiries] = useState<LocalQueuedInquiry[]>(() => getLocalInquiries());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'All'>('All');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
  const [isPurging, setIsPurging] = useState(false);
  const [confirmPurgeOpen, setConfirmPurgeOpen] = useState(false);

  const courseTitle = (slug: string) => courses.find((c) => c.slug === slug)?.title || slug;

  // Unified list combining Supabase inquiries + offline/locally queued inquiries
  const combinedInquiries = useMemo(() => {
    const map = new Map<string, Inquiry>();
    inquiries.forEach((item) => map.set(item.id, item));
    localInquiries.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  }, [inquiries, localInquiries]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...combinedInquiries]
      .filter((i) => statusFilter === 'All' || i.status === statusFilter)
      .filter(
        (i) =>
          !q ||
          i.fullName.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          courseTitle(i.interestedCourse).toLowerCase().includes(q)
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedInquiries, search, statusFilter, courses]);

  const statusCounts = useMemo(() => {
    const counts: Record<InquiryStatus | 'All', number> = { All: combinedInquiries.length, New: 0, Contacted: 0, Enrolled: 0, Closed: 0 };
    combinedInquiries.forEach((i) => {
      counts[i.status] += 1;
    });
    return counts;
  }, [combinedInquiries]);

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(combinedInquiries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `navya-inquiries-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${combinedInquiries.length} inquiries to JSON.`, 'success');
  };

  // Retention compliance: Closed inquiries older than 90 days
  const oldClosedInquiries = useMemo(() => {
    const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
    return combinedInquiries.filter(
      (i) => i.status === 'Closed' && new Date(i.createdAt).getTime() < ninetyDaysAgo
    );
  }, [combinedInquiries]);

  const handlePurgeClosed = async () => {
    setIsPurging(true);
    try {
      let count = 0;
      for (const inq of oldClosedInquiries) {
        if (inq.id.startsWith('inq_loc_')) {
          removeLocalInquiry(inq.id);
        } else {
          await remove(inq.id);
        }
        count++;
      }
      setLocalInquiries(getLocalInquiries());
      showToast(`Purged ${count} closed inquiries past the 90-day retention threshold.`, 'success');
      setConfirmPurgeOpen(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to purge inquiries.');
    } finally {
      setIsPurging(false);
    }
  };


  const openInquiry = (inquiry: Inquiry) => {
    setActiveInquiry(inquiry);
    setNotesDraft(inquiry.notes || '');
  };

  const handleStatusChange = async (status: InquiryStatus) => {
    if (!activeInquiry) return;
    const previous = activeInquiry;
    setActiveInquiry({ ...activeInquiry, status });
    try {
      await update(activeInquiry.id, { status });
    } catch (err) {
      setActiveInquiry(previous);
      showToast(err instanceof Error ? err.message : 'Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    try {
      await update(activeInquiry.id, { notes: notesDraft });
      setActiveInquiry({ ...activeInquiry, notes: notesDraft });
      showToast('Notes saved.', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save notes.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.id.startsWith('inq_loc_')) {
        removeLocalInquiry(deleteTarget.id);
        setLocalInquiries(getLocalInquiries());
        showToast('Local inquiry removed from browser queue.', 'success');
      } else {
        await remove(deleteTarget.id);
        showToast('Inquiry deleted from database.', 'success');
      }
      if (activeInquiry?.id === deleteTarget.id) setActiveInquiry(null);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete inquiry.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Admissions Inquiries"
        description="Leads captured from the Contact page and Advisor modal on the live site."
      />

      {/* Cloud Status / Local Queue Notice */}
      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <strong className="font-bold block text-sm mb-1">
              Supabase Environment Unconfigured on Host
            </strong>
            <p className="text-amber-800 leading-relaxed mb-3">
              <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> are not set in this deployment. Inquiries are safely preserved in the local browser queue ({localInquiries.length} local records). To enable real-time cloud synchronization, configure your Supabase keys in <code>.env.local</code> or hosting provider settings.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded-lg transition-colors border border-amber-300"
              >
                <Download className="w-3.5 h-3.5" />
                Export Inquiries (JSON)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Retention & Privacy Policy Banner */}
      <div className="mb-5 p-4 rounded-xl bg-paper-alt border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-navy shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-ink-soft">
            <strong className="text-ink font-semibold">Institutional Retention Policy: </strong>
            Prospective student leads in &quot;Closed&quot; status older than 90 days should be periodically purged to minimize personal data storage while honoring student privacy.
          </div>
        </div>
        {oldClosedInquiries.length > 0 && (
          <button
            type="button"
            onClick={() => setConfirmPurgeOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-semibold transition-colors cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5" />
            Purge {oldClosedInquiries.length} Closed (&gt;90d)
          </button>
        )}
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {(['All', ...STATUS_OPTIONS] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                statusFilter === status
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-ink-soft border-border hover:border-input-border'
              }`}
            >
              {status} <span className="opacity-70">({statusCounts[status]})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {oldClosedInquiries.length > 0 && (
            <button
              type="button"
              onClick={() => setConfirmPurgeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              Purge Closed ({oldClosedInquiries.length})
            </button>
          )}
          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-ink hover:bg-paper-alt transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-ink-faint" />
            Export All ({combinedInquiries.length})
          </button>
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border-soft">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, course…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper-alt text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-ink-faint">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading inquiries…
          </div>
        ) : error ? (
          <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load inquiries: {error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No inquiries found"
            description={
              inquiries.length === 0
                ? "Submissions from the site's Contact page and Advisor modal will appear here automatically."
                : 'Try a different search term or status filter.'
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink-faint border-b border-border-soft">
                  <th className="px-5 py-2.5 font-semibold">Contact</th>
                  <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Interested Course</th>
                  <th className="px-5 py-2.5 font-semibold hidden lg:table-cell">Source</th>
                  <th className="px-5 py-2.5 font-semibold">Status</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Received</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    onClick={() => openInquiry(inquiry)}
                    className="border-b border-paper-alt last:border-0 hover:bg-paper transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-ink">{inquiry.fullName}</p>
                      <p className="text-xs text-ink-faint">{inquiry.email}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-ink-soft max-w-[200px] truncate">
                      {courseTitle(inquiry.interestedCourse)}
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-ink-soft">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>{inquiry.source}</span>
                        {inquiry.id.startsWith('inq_loc_') && (
                          <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Local Queue
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={inquiry.status} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-xs text-ink-faint whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(inquiry);
                          }}
                          aria-label={`Delete inquiry from ${inquiry.fullName}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-red-50 hover:text-red-600 transition-colors"
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
        isOpen={!!activeInquiry}
        onClose={() => setActiveInquiry(null)}
        title={activeInquiry?.fullName || ''}
        description="Admissions inquiry detail"
        footer={
          activeInquiry && (
            <>
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(activeInquiry);
                }}
                className="mr-auto px-3.5 py-2 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Delete Inquiry
              </button>
              <button
                type="button"
                onClick={() => setActiveInquiry(null)}
                className="px-3.5 py-2 text-sm font-semibold text-ink-soft hover:text-ink"
              >
                Close
              </button>
              <Button variant="primary" size="md" onClick={handleSaveNotes}>
                Save Notes
              </Button>
            </>
          )
        }
      >
        {activeInquiry && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusChange(status)}
                    className={`transition-transform ${activeInquiry.status === status ? 'scale-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <StatusBadge status={status} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 bg-paper border border-border rounded-xl p-4">
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-blue shrink-0" />
                <span className="text-ink">{activeInquiry.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-blue shrink-0" />
                <span className="text-ink">{activeInquiry.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <BookOpen className="w-4 h-4 text-blue shrink-0" />
                <span className="text-ink">{courseTitle(activeInquiry.interestedCourse)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MonitorSmartphone className="w-4 h-4 text-blue shrink-0" />
                <span className="text-ink">{activeInquiry.preferredMode}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Tag className="w-4 h-4 text-blue shrink-0" />
                <span className="text-ink">{activeInquiry.source}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Calendar className="w-4 h-4 text-blue shrink-0" />
                <span className="text-ink">
                  {new Date(activeInquiry.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>

            {activeInquiry.message && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">Message</p>
                <p className="text-sm text-ink leading-relaxed bg-white border border-border rounded-xl p-4">
                  {activeInquiry.message}
                </p>
              </div>
            )}

            <Field label="Internal Notes" hint="Visible to admin staff only.">
              <TextArea
                rows={4}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Add follow-up notes, call outcomes, or next steps…"
              />
            </Field>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this inquiry?"
        description={`The inquiry from "${deleteTarget?.fullName}" will be permanently removed.`}
        confirmLabel="Delete Inquiry"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        isOpen={confirmPurgeOpen}
        title="Purge Old Closed Inquiries?"
        description={`This will permanently remove ${oldClosedInquiries.length} inquiries in 'Closed' status that are older than 90 days. Ensure you have exported a JSON backup if historical records are needed.`}
        confirmLabel={isPurging ? 'Purging…' : `Purge ${oldClosedInquiries.length} Inquiries`}
        onConfirm={handlePurgeClosed}
        onCancel={() => setConfirmPurgeOpen(false)}
      />

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};
