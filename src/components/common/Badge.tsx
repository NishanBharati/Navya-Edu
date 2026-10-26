import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'navy' | 'blue' | 'sage' | 'amber' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-wide uppercase gap-1.5',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3 py-1.5 font-semibold gap-2',
  };

  const variantStyles = {
    default: 'bg-paper-alt text-navy border border-border',
    navy: 'bg-navy/10 text-navy border border-navy/25',
    blue: 'bg-blue/10 text-blue border border-blue/25',
    sage: 'bg-sage-light text-sage-ink border border-sage/30',
    amber: 'bg-amber-light text-amber-dark border border-amber/30',
    neutral: 'bg-paper-alt text-ink-muted border border-border',
    success: 'bg-success-bg text-success border border-success-border',
    warning: 'bg-warning-bg text-warning border border-warning-border',
    error: 'bg-error-bg text-error border border-error-border',
  };

  const dotColors = {
    default: 'bg-navy',
    navy: 'bg-navy',
    blue: 'bg-blue',
    sage: 'bg-sage',
    amber: 'bg-amber',
    neutral: 'bg-ink-muted',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg whitespace-nowrap select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
