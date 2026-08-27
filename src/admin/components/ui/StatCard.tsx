import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

type Tone = 'navy' | 'blue' | 'amber' | 'sage' | 'neutral';

const toneStyles: Record<Tone, string> = {
  navy: 'bg-navy/10 text-navy',
  blue: 'bg-blue/10 text-blue',
  amber: 'bg-amber/10 text-[#966324]',
  sage: 'bg-sage/15 text-sage-ink',
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
        <p className="text-2xl font-heading font-bold text-ink tabular-nums">{value}</p>
        <p className="text-xs font-medium text-ink-soft mt-1">{label}</p>
        {hint && <p className="text-[11px] text-ink-faint mt-1.5">{hint}</p>}
      </div>
    </>
  );

  const className =
    'bg-white rounded-2xl border border-border p-5 shadow-sm transition-all duration-200 h-full';

  if (href) {
    return (
      <Link to={href} className={`${className} block hover:shadow-md hover:border-input-border group`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
};
