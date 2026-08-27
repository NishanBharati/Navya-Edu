import React, { useState } from 'react';
import { Download, RotateCcw, Info, ShieldCheck, Loader2 } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { useAdminAuth } from '../context/AdminAuthContext';
import { COURSES } from '../../data/courses';
import { PROGRAMS } from '../../data/programs';
import { STUDENT_PROJECTS } from '../../data/studentProjects';
import { INSIGHTS } from '../../data/insights';
import type { Course, Program, StudentProject, InsightArticle, Inquiry } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Strips the id (and any other DB-generated columns) so seed rows can be freshly inserted. */
function stripGeneratedFields<T extends { id: string }>(rows: T[]): Partial<T>[] {
  return rows.map(({ id: _id, ...rest }) => rest as Partial<T>);
}

interface DataRowProps {
  label: string;
  count: number;
  isLoading: boolean;
  isBusy: boolean;
  onExport: () => void;
  onReset: () => void;
  resetLabel?: string;
}

const DataRow: React.FC<DataRowProps> = ({ label, count, isLoading, isBusy, onExport, onReset, resetLabel = 'Reset to Defaults' }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border-soft last:border-0">
    <div>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <p className="text-xs text-ink-faint">{isLoading ? 'Loading…' : `${count} ${count === 1 ? 'record' : 'records'} in the database`}</p>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={onExport}
        disabled={isLoading || isBusy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-input-border text-xs font-semibold text-ink hover:bg-paper-alt transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-3.5 h-3.5" />
        Export
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={isLoading || isBusy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-input-border text-xs font-semibold text-ink-soft hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
        {resetLabel}
      </button>
    </div>
  </div>
);

export const SettingsAdmin: React.FC = () => {
  const { account } = useAdminAuth();

  const { items: courses, isLoading: coursesLoading, replaceAll: replaceCourses } = useSupabaseTable<Course>('courses');
  const { items: programs, isLoading: programsLoading, replaceAll: replacePrograms } = useSupabaseTable<Program>('programs');
  const { items: projects, isLoading: projectsLoading, replaceAll: replaceProjects } = useSupabaseTable<StudentProject>('student_projects');
  const { items: insights, isLoading: insightsLoading, replaceAll: replaceInsights } = useSupabaseTable<InsightArticle>('insights');
  const { items: inquiries, isLoading: inquiriesLoading, replaceAll: replaceInquiries } = useSupabaseTable<Inquiry>('inquiries');

  const [resetTarget, setResetTarget] = useState<{ label: string; action: () => Promise<void> } | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleConfirmReset = async () => {
    if (!resetTarget) return;
    setIsResetting(true);
    setResetError(null);
    try {
      await resetTarget.action();
      setResetTarget(null);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : 'Failed to reset section.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" description="Admin account and database management." />

      <div className="space-y-5">
        {/* Account */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldCheck className="w-4 h-4 text-blue" />
            <h2 className="text-sm font-bold text-ink">Admin Account</h2>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
              {(account?.name || 'Admin').slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{account?.name}</p>
              <p className="text-xs text-ink-faint">{account?.email}</p>
            </div>
          </div>
          <p className="text-xs text-ink-faint mt-4 leading-relaxed">
            Signed in via Supabase Auth. Manage admin users from your Supabase project's Authentication dashboard.
          </p>
        </div>

        {/* Data management */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6">
          <h2 className="text-sm font-bold text-ink mb-1">Data Management</h2>
          <p className="text-xs text-ink-faint mb-2">Export the live database as JSON, or reset a section back to its original seed content.</p>
          {resetError && (
            <div className="mb-3 px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700">
              {resetError}
            </div>
          )}
          <div>
            <DataRow
              label="Courses"
              count={courses.length}
              isLoading={coursesLoading}
              isBusy={isResetting && resetTarget?.label === 'Courses'}
              onExport={() => downloadJSON('navya-courses.json', courses)}
              onReset={() =>
                setResetTarget({ label: 'Courses', action: () => replaceCourses(stripGeneratedFields(COURSES)) })
              }
            />
            <DataRow
              label="Programs"
              count={programs.length}
              isLoading={programsLoading}
              isBusy={isResetting && resetTarget?.label === 'Programs'}
              onExport={() => downloadJSON('navya-programs.json', programs)}
              onReset={() =>
                setResetTarget({ label: 'Programs', action: () => replacePrograms(stripGeneratedFields(PROGRAMS)) })
              }
            />
            <DataRow
              label="Student Work"
              count={projects.length}
              isLoading={projectsLoading}
              isBusy={isResetting && resetTarget?.label === 'Student Work'}
              onExport={() => downloadJSON('navya-student-work.json', projects)}
              onReset={() =>
                setResetTarget({ label: 'Student Work', action: () => replaceProjects(stripGeneratedFields(STUDENT_PROJECTS)) })
              }
            />
            <DataRow
              label="Insights"
              count={insights.length}
              isLoading={insightsLoading}
              isBusy={isResetting && resetTarget?.label === 'Insights'}
              onExport={() => downloadJSON('navya-insights.json', insights)}
              onReset={() =>
                setResetTarget({ label: 'Insights', action: () => replaceInsights(stripGeneratedFields(INSIGHTS)) })
              }
            />
            <DataRow
              label="Admissions Inquiries"
              count={inquiries.length}
              isLoading={inquiriesLoading}
              isBusy={isResetting && resetTarget?.label === 'Admissions Inquiries'}
              onExport={() => downloadJSON('navya-inquiries.json', inquiries)}
              onReset={() => setResetTarget({ label: 'Admissions Inquiries', action: () => replaceInquiries([]) })}
              resetLabel="Clear All"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue/5 border border-blue/15">
          <Info className="w-4 h-4 text-blue shrink-0 mt-0.5" />
          <p className="text-xs text-ink-soft leading-relaxed">
            This console reads and writes directly to your Supabase database &mdash; changes made here (or through
            the live site's Contact form) take effect immediately for every visitor.
          </p>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!resetTarget}
        title={`Reset ${resetTarget?.label}?`}
        description={
          resetTarget?.label === 'Admissions Inquiries'
            ? 'This permanently deletes every stored inquiry from the database. This cannot be undone.'
            : `This deletes every current "${resetTarget?.label}" row and restores the site's original seed content. This cannot be undone.`
        }
        confirmLabel={resetTarget?.label === 'Admissions Inquiries' ? 'Clear All' : 'Reset Section'}
        onConfirm={handleConfirmReset}
        onCancel={() => setResetTarget(null)}
      />
    </div>
  );
};
