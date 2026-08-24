import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, Settings, ChevronDown, Inbox } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import type { Course, Program, StudentProject, InsightArticle, Inquiry } from '../../types';
import { useOnClickOutside } from '../lib/useOnClickOutside';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
}

interface SearchResult {
  label: string;
  meta: string;
  href: string;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileSidebar }) => {
  const navigate = useNavigate();
  const { account, logout } = useAdminAuth();
  const { items: courses } = useSupabaseTable<Course>('courses');
  const { items: programs } = useSupabaseTable<Program>('programs');
  const { items: projects } = useSupabaseTable<StudentProject>('student_projects');
  const { items: insights } = useSupabaseTable<InsightArticle>('insights');
  const { items: inquiries } = useSupabaseTable<Inquiry>('inquiries');

  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef, () => setIsSearchOpen(false));
  useOnClickOutside(notifRef, () => setIsNotifOpen(false));
  useOnClickOutside(userRef, () => setIsUserOpen(false));

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const items: SearchResult[] = [];
    courses.forEach((c) => c.title.toLowerCase().includes(q) && items.push({ label: c.title, meta: 'Course', href: '/admin/courses' }));
    programs.forEach((p) => p.title.toLowerCase().includes(q) && items.push({ label: p.title, meta: 'Program', href: '/admin/programs' }));
    projects.forEach((p) => p.title.toLowerCase().includes(q) && items.push({ label: p.title, meta: 'Student Work', href: '/admin/student-work' }));
    insights.forEach((i) => i.title.toLowerCase().includes(q) && items.push({ label: i.title, meta: 'Insight', href: '/admin/insights' }));
    inquiries.forEach(
      (i) =>
        (i.fullName.toLowerCase().includes(q) || i.email.toLowerCase().includes(q)) &&
        items.push({ label: i.fullName, meta: `Inquiry · ${i.email}`, href: '/admin/inquiries' })
    );
    return items.slice(0, 8);
  }, [query, courses, programs, projects, insights, inquiries]);

  const newInquiries = inquiries.filter((i) => i.status === 'New').slice(0, 5);
  const initials = (account?.name || 'Admin')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const goTo = (href: string) => {
    navigate(href);
    setQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-[#E8E4DA] flex items-center gap-3 px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileSidebar}
        aria-label="Open menu"
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#171A1F] hover:bg-[#F4F1EA]"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Quick search */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C939E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search courses, inquiries, insights…"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F4F1EA] border border-transparent text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white focus:border-[#D8D2C6] transition-colors"
          />
        </div>
        {isSearchOpen && query.trim() && (
          <div className="absolute top-full mt-2 left-0 w-full sm:w-96 bg-white rounded-xl border border-[#E8E4DA] shadow-lg py-2 max-h-80 overflow-y-auto animate-fade-in">
            {results.length === 0 ? (
              <p className="px-4 py-3 text-xs text-[#8C939E]">No matches for "{query}"</p>
            ) : (
              results.map((result, index) => (
                <button
                  key={`${result.href}-${index}`}
                  type="button"
                  onClick={() => goTo(result.href)}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F4F1EA] transition-colors flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-[#171A1F] truncate">{result.label}</span>
                  <span className="text-[10px] uppercase tracking-wide text-[#8C939E] shrink-0">{result.meta}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#5F6670] hover:bg-[#F4F1EA] hover:text-[#171A1F] transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            {newInquiries.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C88A3D] ring-2 ring-white" />
            )}
          </button>
          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E8E4DA] shadow-lg py-2 animate-fade-in">
              <div className="px-4 py-2 flex items-center justify-between border-b border-[#EFECE5]">
                <span className="text-xs font-bold uppercase tracking-wide text-[#171A1F]">New Inquiries</span>
                <span className="text-[11px] text-[#8C939E]">{newInquiries.length} unread</span>
              </div>
              {newInquiries.length === 0 ? (
                <p className="px-4 py-6 text-xs text-[#8C939E] text-center">No new inquiries right now.</p>
              ) : (
                newInquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    type="button"
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigate('/admin/inquiries');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F1EA] transition-colors flex items-start gap-2.5"
                  >
                    <Inbox className="w-3.5 h-3.5 text-[#356A9A] mt-0.5 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm text-[#171A1F] truncate">{inquiry.fullName}</span>
                      <span className="block text-[11px] text-[#8C939E] truncate">{inquiry.interestedCourse}</span>
                    </span>
                  </button>
                ))
              )}
              <div className="px-4 pt-2 mt-1 border-t border-[#EFECE5]">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/admin/inquiries');
                  }}
                  className="text-xs font-semibold text-[#356A9A] hover:text-[#17324D]"
                >
                  View all inquiries
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button
            type="button"
            onClick={() => setIsUserOpen((v) => !v)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-lg hover:bg-[#F4F1EA] transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-[#17324D] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </span>
            <span className="hidden sm:block text-left">
              <span className="block text-xs font-semibold text-[#171A1F] leading-tight max-w-[120px] truncate">
                {account?.name || 'Admin'}
              </span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C939E] hidden sm:block" />
          </button>
          {isUserOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-[#E8E4DA] shadow-lg py-1.5 animate-fade-in">
              <div className="px-3.5 py-2.5 border-b border-[#EFECE5]">
                <p className="text-sm font-semibold text-[#171A1F] truncate">{account?.name}</p>
                <p className="text-xs text-[#8C939E] truncate">{account?.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsUserOpen(false);
                  navigate('/admin/settings');
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#171A1F] hover:bg-[#F4F1EA] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#5F6670]" />
                Account Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
