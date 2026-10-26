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
  // Press feedback is a 0.97 scale on :active; hover changes colour and elevation only.
  const baseStyles =
    'group relative inline-flex items-center justify-center font-semibold tracking-[-0.01em] rounded-xl select-none cursor-pointer ' +
    'transition-[background-color,border-color,color,box-shadow,translate,scale,rotate] duration-180 ease-out active:scale-[0.97] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeStyles = {
    sm: 'h-9 text-[13px] px-3.5 gap-1.5',
    md: 'h-11 text-sm px-5 gap-2',
    lg: 'h-12 sm:h-13 text-[15px] px-6 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-navy text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(23_50_77/0.2)] hover:bg-navy-light hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_6px_16px_-4px_rgb(23_50_77/0.35)]',
    secondary:
      'bg-white text-ink border border-border-warm shadow-xs hover:border-navy/35 hover:shadow-sm',
    outline:
      'bg-transparent text-navy border border-navy/25 hover:border-navy/60 hover:bg-navy/[0.04]',
    'outline-white':
      'bg-white/[0.06] text-white border border-white/25 hover:border-white/60 hover:bg-white/10',
    blue:
      'bg-blue text-white shadow-xs hover:bg-[#184972] hover:shadow-md',
    ghost:
      'bg-transparent text-ink-soft hover:text-ink hover:bg-ink/5',
    amber:
      'bg-amber text-white shadow-xs hover:bg-amber-dark hover:shadow-md',
    danger:
      'bg-error text-white shadow-xs hover:bg-red-800 hover:shadow-md',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0 inline-flex">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0 inline-flex transition-transform duration-240 ease-out group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
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
