import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

export interface MeshCTABannerProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

/**
 * 2026 Ambient Mesh Gradient CTA Banner.
 * Breaks repetitive dark-navy card monotony with dynamic layered mesh glows,
 * refined glass borders, and authoritative product-company typography.
 */
export const MeshCTABanner: React.FC<MeshCTABannerProps> = ({
  badgeText,
  badgeIcon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={prefersReducedMotion ? undefined : fadeUp}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative overflow-hidden rounded-3xl bg-navy-deep text-white border border-white/10 shadow-2xl ${className}`}
    >
      {/* Dynamic Ambient Gradient Mesh Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-blue-electric/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-0 w-[420px] h-[420px] rounded-full bg-sage/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 rounded-full bg-navy-light/40 blur-2xl"
      />

      {/* Subtle fine geometric grid overlay for technical product vibe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3.5 max-w-2xl">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-light uppercase tracking-wider">
              {badgeIcon}
              <span>{badgeText}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-blue-mist/90 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Call to Actions */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {primaryAction.href ? (
            <a
              href={primaryAction.href}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-navy font-bold text-xs sm:text-sm hover:bg-paper-alt active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              <span>{primaryAction.label}</span>
              {primaryAction.icon}
            </a>
          ) : (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-navy font-bold text-xs sm:text-sm hover:bg-paper-alt active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer"
            >
              <span>{primaryAction.label}</span>
              {primaryAction.icon}
            </button>
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <a
                href={secondaryAction.href}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200"
              >
                <span>{secondaryAction.label}</span>
                {secondaryAction.icon}
              </a>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{secondaryAction.label}</span>
                {secondaryAction.icon}
              </button>
            )
          )}
        </div>
      </div>
    </motion.section>
  );
};
