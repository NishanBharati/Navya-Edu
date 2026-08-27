import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[10px]';

  const sizeStyles = {
    sm: 'text-xs font-semibold px-3.5 py-1.5 gap-1.5',
    md: 'text-sm font-semibold px-5 py-2.5 gap-2',
    lg: 'text-base font-semibold px-6 py-3.5 gap-2.5'
  };

  const variantStyles = {
    // Primary: Deep Navy with high contrast white text
    primary: 'bg-navy text-white hover:bg-navy-deep active:bg-[#0D1D2E] shadow-sm',
    // Secondary: Soft ivory/slate tone
    secondary: 'bg-paper-alt text-ink hover:bg-[#EAE5DA] border border-border-warm',
    // Outline: Deep Navy or charcoal outline for light backgrounds
    outline: 'bg-transparent text-navy border border-navy/30 hover:border-navy hover:bg-navy/5 active:bg-navy/10',
    // Outline White: Glassmorphic outline with high-contrast text for dark backgrounds
    'outline-white': 'bg-white/10 text-white border border-white/30 hover:border-white hover:bg-white/20 active:bg-white/15 backdrop-blur-xs',
    // Ghost: Clean text with subtle hover
    ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-black/5',
    // Warm Amber: restrained highlight
    amber: 'bg-amber text-white hover:bg-[#B37930] shadow-sm'
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
