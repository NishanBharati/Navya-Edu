import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

type Tone = 'navy' | 'blue' | 'amber' | 'sage' | 'neutral';

const toneStyles: Record<Tone, string> = {
  navy: 'bg-[#17324D]/10 text-[#17324D]',
  blue: 'bg-[#356A9A]/10 text-[#356A9A]',
  amber: 'bg-[#C88A3D]/10 text-[#966324]',
  sage: 'bg-[#718C7A]/15 text-[#3D5644]',
  neutral: 'bg-stone-100 text-stone-600',
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
  href?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, tone = 'navy', hint, href }) => {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${toneStyles[tone]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-heading font-bold text-[#171A1F] tabular-nums">{value}</p>
        <p className="text-xs font-medium text-[#5F6670] mt-1">{label}</p>
        {hint && <p className="text-[11px] text-[#8C939E] mt-1.5">{hint}</p>}
      </div>
    </>
  );

  const className =
    'bg-white rounded-2xl border border-[#E8E4DA] p-5 shadow-sm transition-all duration-200 h-full';

  if (href) {
    return (
      <Link to={href} className={`${className} block hover:shadow-md hover:border-[#D8D2C6] group`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
};
