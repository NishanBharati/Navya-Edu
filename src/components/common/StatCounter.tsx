import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/motion';

export interface AnimatedCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  prefix = '',
  suffix = '',
  duration = 1000,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(to);
      return;
    }

    if (isInView) {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Canonical ease [0.22, 1, 0.36, 1] cubic approximation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(from + (to - from) * easeOut);
        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setCount(to);
        }
      };

      const frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }
  }, [isInView, from, to, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {prefersReducedMotion ? to : count}
      {suffix}
    </span>
  );
};

export interface StatItem {
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  rawDisplay?: string; // For formats like "1:12" or "24/7"
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface StatCounterRowProps {
  stats: StatItem[];
  className?: string;
}

function CounterNumber({ item }: { item: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!item.numericValue || prefersReducedMotion) {
      if (item.numericValue) setCurrent(item.numericValue);
      return;
    }

    if (isInView) {
      let start = 0;
      const end = item.numericValue;
      const duration = 1200; // ms
      const startTime = performance.now();

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic [0.22, 1, 0.36, 1]
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const nextVal = Math.floor(start + (end - start) * easeOut);
        setCurrent(nextVal);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCurrent(end);
        }
      };

      const frameId = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(frameId);
    }
  }, [isInView, item.numericValue, prefersReducedMotion]);

  if (item.rawDisplay) {
    return <span ref={ref}>{item.rawDisplay}</span>;
  }

  if (item.numericValue !== undefined) {
    return (
      <span ref={ref}>
        {item.prefix || ''}
        {prefersReducedMotion ? item.numericValue : current}
        {item.suffix || ''}
      </span>
    );
  }

  return null;
}

/**
 * Variant C: High-credibility stat and counter row.
 * Replaces repetitive static white cards with dynamic, animated proof metrics.
 */
export const StatCounterRow: React.FC<StatCounterRowProps> = ({ stats, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : staggerContainer(0.08, 0.04)}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 ${className}`}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="group relative p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-border hover:border-navy/20 shadow-xs hover:shadow-sm transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              {stat.icon && (
                <div className="w-7 h-7 rounded-lg bg-navy/5 text-navy group-hover:bg-navy group-hover:text-white flex items-center justify-center transition-colors duration-200">
                  {stat.icon}
                </div>
              )}
              <span className="text-xs font-bold text-ink tracking-tight">{stat.label}</span>
            </div>
            {stat.badge && (
              <span className="px-2 py-0.5 rounded-md bg-sage/10 text-sage-ink text-[10px] font-mono font-bold">
                {stat.badge}
              </span>
            )}
          </div>

          <div className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight font-heading">
            <CounterNumber item={stat} />
          </div>

          {stat.description && (
            <p className="mt-1 text-xs text-ink-soft leading-relaxed">{stat.description}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};
