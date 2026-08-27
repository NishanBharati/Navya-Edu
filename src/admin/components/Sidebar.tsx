import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Layers,
  FolderKanban,
  Newspaper,
  Inbox,
  Settings,
  ArrowUpRight,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import type { Inquiry } from '../../types';
import { Logo } from '../../components/common/Logo';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  end?: boolean;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { items: inquiries } = useSupabaseTable<Inquiry>('inquiries');
  const newInquiryCount = inquiries.filter((inquiry) => inquiry.status === 'New').length;

  const sections: NavSection[] = [
    {
      label: 'Overview',
      items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true }],
    },
    {
      label: 'Content',
      items: [
        { label: 'Courses', href: '/admin/courses', icon: GraduationCap },
        { label: 'Programs', href: '/admin/programs', icon: Layers },
        { label: 'Student Work', href: '/admin/student-work', icon: FolderKanban },
        { label: 'Insights', href: '/admin/insights', icon: Newspaper },
      ],
    },
    {
      label: 'Admissions',
      items: [{ label: 'Inquiries', href: '/admin/inquiries', icon: Inbox, badge: newInquiryCount }],
    },
    {
      label: 'Account',
      items: [{ label: 'Settings', href: '/admin/settings', icon: Settings }],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy text-white">
      <div className="flex items-center justify-between px-5 h-20 shrink-0 border-b border-white/10">
        <NavLink to="/admin" className="group focus:outline-none" onClick={onCloseMobile}>
          <Logo
            variant="dark"
            size="sm"
            subtitle="Admin Console"
          />
        </NavLink>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-mist hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-2.5 mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7690A8]">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-2 px-2.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'text-mist hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </span>
                  {!!item.badge && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-amber text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3.5 border-t border-white/10 shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 px-2.5 py-2.5 rounded-lg text-xs font-medium text-mist hover:bg-white/5 hover:text-white transition-colors"
        >
          <span>View Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 fixed inset-y-0 left-0 z-30">{sidebarContent}</aside>

      {/* Mobile sidebar drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onCloseMobile} aria-hidden="true" />
          <div className="relative w-64 h-full shadow-2xl animate-slide-in-left">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
