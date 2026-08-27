import React from 'react';
import logoSrc from '../../assets/logo.webp';

export interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showBadge?: boolean;
  subtitle?: string;
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showText = true,
  showBadge = true,
  subtitle,
  className = '',
  imgClassName = '',
  textClassName = '',
}) => {
  const isDark = variant === 'dark';

  const sizeClasses = {
    sm: {
      img: 'w-7 h-7 sm:w-8 sm:h-8',
      container: 'w-8 h-8 rounded-lg p-1',
      title: 'text-sm sm:text-base font-bold',
      badge: 'text-[9px] px-1 py-0.2',
      subtitle: 'text-[10px]',
    },
    md: {
      img: 'w-8 h-8 sm:w-9 sm:h-9',
      container: 'w-10 h-10 rounded-xl p-1.5',
      title: 'text-base sm:text-lg font-bold',
      badge: 'text-[10px] px-1.5 py-0.5',
      subtitle: 'text-[11px]',
    },
    lg: {
      img: 'w-10 h-10 sm:w-11 sm:h-11',
      container: 'w-12 h-12 rounded-xl p-2',
      title: 'text-lg sm:text-xl font-bold',
      badge: 'text-[11px] px-2 py-0.5',
      subtitle: 'text-xs',
    },
    xl: {
      img: 'w-14 h-14 sm:w-16 sm:h-16',
      container: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2.5',
      title: 'text-2xl sm:text-3xl font-extrabold',
      badge: 'text-xs px-2.5 py-1',
      subtitle: 'text-sm',
    },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Emblem Container */}
      <div
        className={`flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          sizeClasses.container
        } ${
          isDark
            ? 'bg-white/10 border border-white/15 shadow-inner backdrop-blur-sm'
            : 'bg-navy shadow-sm'
        }`}
      >
        <img
          src={logoSrc}
          alt="Navya Ed Tech Logo"
          className={`w-full h-full object-contain ${
            isDark ? 'drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]' : 'brightness-110 contrast-115'
          } ${imgClassName}`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading tracking-tight ${sizeClasses.title} ${
                isDark ? 'text-white' : 'text-ink'
              }`}
            >
              NAVYA
            </span>
            {showBadge && (
              <span
                className={`font-heading font-semibold tracking-wider uppercase rounded ${
                  sizeClasses.badge
                } ${
                  isDark
                    ? 'text-navy-mist bg-white/10'
                    : 'text-blue bg-blue/10'
                }`}
              >
                ED TECH
              </span>
            )}
          </div>
          {subtitle && (
            <span
              className={`tracking-wide font-normal -mt-0.5 ${sizeClasses.subtitle} ${
                isDark ? 'text-navy-mist' : 'text-ink-soft'
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
