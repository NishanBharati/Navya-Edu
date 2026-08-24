import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'navy' | 'blue' | 'sage' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium tracking-wide uppercase',
    md: 'text-xs px-3 py-1 font-medium'
  };

  const variantStyles = {
    default: 'bg-[#F4F1EA] text-[#17324D] border border-[#E8E4DA]',
    navy: 'bg-[#17324D]/10 text-[#17324D] border border-[#17324D]/20',
    blue: 'bg-[#356A9A]/10 text-[#356A9A] border border-[#356A9A]/20',
    sage: 'bg-[#718C7A]/15 text-[#3D5644] border border-[#718C7A]/30',
    amber: 'bg-[#C88A3D]/10 text-[#966324] border border-[#C88A3D]/25',
    neutral: 'bg-stone-100 text-stone-700 border border-stone-200'
  };

  return (
    <span
      className={`inline-flex items-center rounded-md whitespace-nowrap select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
