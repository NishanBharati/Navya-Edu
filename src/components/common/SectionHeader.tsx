import React from 'react';
import { Reveal } from '../motion/Reveal';

export interface SectionHeaderProps {
  /** Accepted for compatibility; not rendered. Headings carry their own weight. */
  eyebrow?: string;
  badge?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  headingTag?: 'h1' | 'h2' | 'h3';
  /** Light text for use on blue / violet / ink fields */
  tone?: 'default' | 'inverse';
  /** 'md' for headers nested inside a larger section */
  size?: 'md' | 'lg';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  align = 'left',
  headingTag = 'h2',
  tone = 'default',
  size = 'lg',
  className = '',
}) => {
  const HeadingComponent = headingTag;
  const isCenter = align === 'center';
  const isInverse = tone === 'inverse';

  return (
    <Reveal className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {badge && <div className={`mb-5 ${isCenter ? 'flex justify-center' : ''}`}>{badge}</div>}
      <HeadingComponent
        className={`${size === 'lg' ? 'text-title' : 'font-display text-2xl sm:text-3xl leading-tight tracking-[-0.03em] font-bold'} ${
          isInverse ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </HeadingComponent>
      {description && (
        <p
          className={`mt-5 text-lg sm:text-xl leading-relaxed max-w-[58ch] ${isCenter ? 'mx-auto' : ''} ${
            isInverse ? 'text-white/85' : 'text-ink-muted'
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
};
