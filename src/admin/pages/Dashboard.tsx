import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Layers,
  FolderKanban,
  Newspaper,
  Inbox,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { Course, Program, StudentProject, InsightArticle, Inquiry } from '../../types';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../../components/common/Button';

export const Dashboard: React.FC = () => {
  const { account } = useAdminAuth();
  const { items: courses } = useSupabaseTable<Course>('courses');
  const { items: programs } = useSupabaseTable<Program>('programs');
  const { items: projects } = useSupabaseTable<StudentProject>('student_projects');
  const { items: insights } = useSupabaseTable<InsightArticle>('insights');
  const { items: inquiries } = useSupabaseTable<Inquiry>('inquiries');

  const newInquiryCount = inquiries.filter((i) => i.status === 'New').length;

  const recentInquiries = useMemo(
    () =>
      [...inquiries]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
    [inquiries]
  );

  const inquiriesByCourse = useMemo(() => {
    const counts = new Map<string, number>();
    inquiries.forEach((inquiry) => {
      const course = courses.find((c) => c.slug === inquiry.interestedCourse);
      const label = course?.title || inquiry.interestedCourse || 'Other / General';
      counts.set(label, (counts.get(label) || 0) + 1);
    });
    const max = Math.max(1, ...Array.from(counts.values()));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, count]) => ({ label, count, pct: Math.round((count / max) * 100) }));
  }, [inquiries, courses]);

  const firstName = account?.name?.split(' ')[0] || 'there';

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Courses" value={courses.length} icon={GraduationCap} tone="navy" href="/admin/courses" hint={`${new Set(courses.map((c) => c.category)).size} categories`} />
        <StatCard label="Career Programs" value={programs.length} icon={Layers} tone="blue" href="/admin/programs" />
        <StatCard label="Portfolio Projects" value={projects.length} icon={FolderKanban} tone="sage" href="/admin/student-work" />
        <StatCard label="Published Insights" value={insights.length} icon={Newspaper} tone="neutral" href="/admin/insights" />
        <StatCard label="New Inquiries" value={newInquiryCount} icon={Inbox} tone="amber" href="/admin/inquiries" hint={`${inquiries.length} total`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent inquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E4DA] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFECE5]">
            <h2 className="text-sm font-bold text-[#171A1F]">Recent Admissions Inquiries</h2>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-[#356A9A] hover:text-[#17324D] inline-flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No inquiries yet"
              description="Submissions from the site's Contact page and Advisor modal will appear here automatically."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-[#8C939E] border-b border-[#EFECE5]">
                    <th className="px-5 py-2.5 font-semibold">Name</th>
                    <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Interested Course</th>
                    <th className="px-5 py-2.5 font-semibold">Status</th>
                    <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-[#F4F1EA] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium text-[#171A1F] truncate max-w-[160px]">{inquiry.fullName}</p>
                        <p className="text-xs text-[#8C939E] truncate max-w-[160px]">{inquiry.email}</p>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell text-[#5F6670] truncate max-w-[200px]">
                        {courses.find((c) => c.slug === inquiry.interestedCourse)?.title || inquiry.interestedCourse}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={inquiry.status} size="sm" />
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell text-xs text-[#8C939E] whitespace-nowrap">
                        {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Inquiries by course */}
        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-sm p-5">
          <h2 className="text-sm font-bold text-[#171A1F] mb-4">Inquiries by Course</h2>
          {inquiriesByCourse.length === 0 ? (
            <p className="text-xs text-[#8C939E] py-6 text-center">No inquiry data yet.</p>
          ) : (
            <div className="space-y-3.5">
              {inquiriesByCourse.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#171A1F] font-medium truncate pr-2">{row.label}</span>
                    <span className="text-[#5F6670] tabular-nums shrink-0">{row.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#F4F1EA] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#356A9A]"
                      style={{ width: `${Math.max(row.pct, 6)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-5 bg-white rounded-2xl border border-[#E8E4DA] shadow-sm p-5">
        <h2 className="text-sm font-bold text-[#171A1F] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" href="/admin/courses" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Course
          </Button>
          <Button variant="secondary" size="sm" href="/admin/programs" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Program
          </Button>
          <Button variant="secondary" size="sm" href="/admin/student-work" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Add Student Project
          </Button>
          <Button variant="secondary" size="sm" href="/admin/insights" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Publish Insight
          </Button>
        </div>
      </div>
    </div>
  );
};
