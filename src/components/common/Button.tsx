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
  // Buttons are blocks: bevelled bottom edge as material, lift on hover, 0.97 press.
  const bevel = 'shadow-[inset_0_-7px_9px_-6px_rgb(15_22_64/0.32),inset_0_1px_0_rgb(255_255_255/0.28)]';
  const baseStyles =
    'group relative inline-flex items-center justify-center font-display font-bold tracking-[-0.01em] rounded-xl select-none cursor-pointer ' +
    'transition-[background-color,border-color,color,box-shadow,translate,scale] duration-180 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ' +
    'focus:outline-none focus-visible:ring-[3px] focus-visible:ring-block-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100';

  const sizeStyles = {
    sm: 'h-10 text-sm px-4 gap-1.5',
    md: 'h-12 text-[15px] px-5 gap-2',
    lg: 'h-14 text-base sm:text-[17px] px-7 gap-2.5',
  };

  const variantStyles = {
    primary: `bg-block-orange text-ink ${bevel} hover:bg-[#FF8B33]`,
    blue: `bg-block-blue text-white ${bevel} hover:bg-block-blue-deep`,
    secondary: 'bg-white text-ink border-2 border-ink/12 hover:border-ink/30 shadow-xs',
    outline: 'bg-transparent text-ink border-2 border-ink/20 hover:border-ink/45 hover:bg-ink/[0.03]',
    'outline-white': 'bg-transparent text-white border-2 border-white/45 hover:border-white hover:bg-white/10',
    ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-ink/5 hover:translate-y-0',
    amber: `bg-block-yellow text-ink ${bevel} hover:bg-[#FFCB3D]`,
    danger: `bg-error text-white ${bevel} hover:bg-[#A3122F]`,
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
