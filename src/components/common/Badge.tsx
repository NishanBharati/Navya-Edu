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
    default: 'bg-paper-alt text-navy border border-border',
    navy: 'bg-navy/10 text-navy border border-navy/20',
    blue: 'bg-blue/10 text-blue border border-blue/20',
    sage: 'bg-sage/15 text-sage-ink border border-sage/30',
    amber: 'bg-amber/10 text-[#966324] border border-amber/25',
    neutral: 'bg-paper-alt text-ink-soft border border-border'
  };

  return (
    <span
      className={`inline-flex items-center rounded-md whitespace-nowrap select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
