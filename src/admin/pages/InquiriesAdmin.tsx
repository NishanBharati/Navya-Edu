import React, { useMemo, useState } from 'react';
import { Search, Trash2, Inbox, Mail, Phone, Calendar, BookOpen, MonitorSmartphone, Tag, Loader2 } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import type { Course, Inquiry, InquiryStatus } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextArea } from '../components/ui/Field';
import { StatusBadge, STATUS_OPTIONS } from '../components/ui/StatusBadge';
import { Button } from '../../components/common/Button';

export const InquiriesAdmin: React.FC = () => {
  const { items: inquiries, isLoading, error, update, remove } = useSupabaseTable<Inquiry>('inquiries', { orderBy: 'createdAt' });
  const { items: courses } = useSupabaseTable<Course>('courses');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'All'>('All');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);

  const courseTitle = (slug: string) => courses.find((c) => c.slug === slug)?.title || slug;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...inquiries]
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
  }, [inquiries, search, statusFilter, courses]);

  const statusCounts = useMemo(() => {
    const counts: Record<InquiryStatus | 'All', number> = { All: inquiries.length, New: 0, Contacted: 0, Enrolled: 0, Closed: 0 };
    inquiries.forEach((i) => {
      counts[i.status] += 1;
    });
    return counts;
  }, [inquiries]);

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
      alert(err instanceof Error ? err.message : 'Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    try {
      await update(activeInquiry.id, { notes: notesDraft });
      setActiveInquiry({ ...activeInquiry, notes: notesDraft });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save notes.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      if (activeInquiry?.id === deleteTarget.id) setActiveInquiry(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete inquiry.');
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

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(['All', ...STATUS_OPTIONS] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              statusFilter === status
                ? 'bg-[#17324D] text-white border-[#17324D]'
                : 'bg-white text-[#5F6670] border-[#E8E4DA] hover:border-[#D8D2C6]'
            }`}
          >
            {status} <span className="opacity-70">({statusCounts[status]})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#EFECE5]">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-[#8C939E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, course…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F4F1EA] text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-[#8C939E]">
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
                <tr className="text-left text-[10px] uppercase tracking-wider text-[#8C939E] border-b border-[#EFECE5]">
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
                    className="border-b border-[#F4F1EA] last:border-0 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#171A1F]">{inquiry.fullName}</p>
                      <p className="text-xs text-[#8C939E]">{inquiry.email}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-[#5F6670] max-w-[200px] truncate">
                      {courseTitle(inquiry.interestedCourse)}
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-[#5F6670]">{inquiry.source}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={inquiry.status} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-xs text-[#8C939E] whitespace-nowrap">
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
                className="px-3.5 py-2 text-sm font-semibold text-[#5F6670] hover:text-[#171A1F]"
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
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C939E] mb-2">Status</p>
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

            <div className="grid grid-cols-1 gap-3.5 bg-[#FAFAF8] border border-[#E8E4DA] rounded-xl p-4">
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-[#356A9A] shrink-0" />
                <span className="text-[#171A1F]">{activeInquiry.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-[#356A9A] shrink-0" />
                <span className="text-[#171A1F]">{activeInquiry.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <BookOpen className="w-4 h-4 text-[#356A9A] shrink-0" />
                <span className="text-[#171A1F]">{courseTitle(activeInquiry.interestedCourse)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MonitorSmartphone className="w-4 h-4 text-[#356A9A] shrink-0" />
                <span className="text-[#171A1F]">{activeInquiry.preferredMode}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Tag className="w-4 h-4 text-[#356A9A] shrink-0" />
                <span className="text-[#171A1F]">{activeInquiry.source}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Calendar className="w-4 h-4 text-[#356A9A] shrink-0" />
                <span className="text-[#171A1F]">
                  {new Date(activeInquiry.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>

            {activeInquiry.message && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C939E] mb-2">Message</p>
                <p className="text-sm text-[#171A1F] leading-relaxed bg-white border border-[#E8E4DA] rounded-xl p-4">
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
    </div>
  );
};
