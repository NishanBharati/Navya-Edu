import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, EASING } from '../../lib/motion';

export interface AnimatedCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `to` the first time it scrolls into view.
 * Server render and above-the-fold instances show the final value straight
 * away, so crawlers and the first paint never see a placeholder number.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  prefix = '',
  suffix = '',
  duration = 1000,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(to);
  const shouldAnimate = useRef(false);

  // Only counters that start off-screen get reset and animated.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      shouldAnimate.current = true;
      setCount(from);
    }
  }, [from, prefersReducedMotion]);

  useEffect(() => {
    if (!isInView || !shouldAnimate.current) return;
    shouldAnimate.current = false;
    const controls = animate(from, to, {
      duration: duration / 1000,
      ease: EASING,
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {count}
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
  if (item.rawDisplay) {
    return <span>{item.rawDisplay}</span>;
  }

  if (item.numericValue !== undefined) {
    return (
      <AnimatedCounter to={item.numericValue} prefix={item.prefix} suffix={item.suffix} duration={1200} />
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
              <span className="px-2 py-0.5 rounded-md bg-sage/10 text-sage-ink text-xs font-mono font-bold">
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
