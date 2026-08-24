import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'amber';
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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17324D] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[10px]';

  const sizeStyles = {
    sm: 'text-xs font-semibold px-3.5 py-1.5 gap-1.5',
    md: 'text-sm font-semibold px-5 py-2.5 gap-2',
    lg: 'text-base font-semibold px-6 py-3.5 gap-2.5'
  };

  const variantStyles = {
    // Primary: Deep Navy with high contrast white text
    primary: 'bg-[#17324D] text-white hover:bg-[#12283E] active:bg-[#0D1D2E] shadow-sm',
    // Secondary: Soft ivory/slate tone
    secondary: 'bg-[#F4F1EA] text-[#171A1F] hover:bg-[#EAE5DA] border border-[#E5DFD4]',
    // Outline: Deep Navy or charcoal outline
    outline: 'bg-transparent text-[#17324D] border border-[#17324D]/30 hover:border-[#17324D] hover:bg-[#17324D]/5',
    // Ghost: Clean text with subtle hover
    ghost: 'bg-transparent text-[#5F6670] hover:text-[#171A1F] hover:bg-black/5',
    // Warm Amber: restrained highlight
    amber: 'bg-[#C88A3D] text-white hover:bg-[#B37930] shadow-sm'
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
