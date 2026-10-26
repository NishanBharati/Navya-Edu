import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost' | 'amber' | 'blue' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'group inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    // Primary: Authoritative Deep Navy with crisp contrast & tactile lift
    primary: 'bg-navy text-white hover:bg-navy-deep active:bg-[#0D1D2E] shadow-sm hover:shadow-lg hover:shadow-navy/20',
    // Secondary: Soft warm ivory/paper-alt tone with crisp border & subtle elevation
    secondary: 'bg-paper-alt text-ink hover:bg-[#EAE5DA] border border-border-warm hover:border-navy/30 hover:shadow-md hover:shadow-navy/5',
    // Outline: Deep Navy crisp line
    outline: 'bg-transparent text-navy border border-navy/30 hover:border-navy hover:bg-navy/5 active:bg-navy/10 hover:shadow-xs',
    // Outline White: Contrast outline for dark navy sections
    'outline-white': 'bg-white/10 text-white border border-white/30 hover:border-white hover:bg-white/20 active:bg-white/15 backdrop-blur-xs hover:shadow-md hover:shadow-black/20',
    // Blue / Electric Tech Accent
    blue: 'bg-blue text-white hover:bg-[#184972] active:bg-[#123654] shadow-sm hover:shadow-lg hover:shadow-blue/25',
    // Ghost: Subtle hover text
    ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-black/5 hover:scale-100',
    // Warm Amber: Restrained highlight for featured calls to action
    amber: 'bg-amber text-white hover:bg-[#854D12] shadow-sm hover:shadow-lg hover:shadow-amber/25',
    // Danger: Error/destructive action
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-lg hover:shadow-red-600/20',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">{rightIcon}</span>}
    </>
  );

  if (href && !disabled && !isLoading) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
