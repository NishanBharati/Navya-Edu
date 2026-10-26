import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/motion';

export interface IconStripItem {
  icon?: React.ReactNode;
  label: string;
  description: string;
  tag?: string;
}

interface IconStripProps {
  items: IconStripItem[];
  className?: string;
}

/**
 * Variant A: Horizontal Icon-Strip with subtle dividers.
 * Eliminates repetitive card borders and creates a refined, sleek metadata strip.
 */
export const IconStrip: React.FC<IconStripProps> = ({ items, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : staggerContainer(0.06, 0.03)}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-warm/60 py-3 sm:py-4 px-2 sm:px-4 rounded-2xl bg-paper/60 border border-border-soft/80 backdrop-blur-xs ${className}`}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="flex items-start gap-3.5 py-3 sm:py-0 px-3 sm:px-5 group"
        >
          {item.icon && (
            <div className="w-8 h-8 rounded-xl bg-white text-navy border border-border-soft flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-navy/20 transition-all duration-200">
              {item.icon}
            </div>
          )}
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink tracking-tight block">
                {item.label}
              </span>
              {item.tag && (
                <span className="text-xs font-mono text-ink-faint uppercase">
                  {item.tag}
                </span>
              )}
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
