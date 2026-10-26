import React from 'react';
import { Reveal } from '../motion/Reveal';

export interface SectionHeaderProps {
  eyebrow?: string;
  badge?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  headingTag?: 'h1' | 'h2' | 'h3';
  /** Light text for use on navy backgrounds */
  tone?: 'default' | 'inverse';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  badge,
  title,
  description,
  align = 'left',
  headingTag = 'h2',
  tone = 'default',
  className = '',
}) => {
  const HeadingComponent = headingTag;
  const isCenter = align === 'center';
  const isInverse = tone === 'inverse';

  return (
    <Reveal className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {badge && <div className={`mb-4 ${isCenter ? 'flex justify-center' : ''}`}>{badge}</div>}
      {!badge && eyebrow && (
        <p className={`eyebrow mb-4 ${isInverse ? 'text-blue-light' : ''}`}>{eyebrow}</p>
      )}
      <HeadingComponent
        className={`text-title font-semibold ${isInverse ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </HeadingComponent>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-[62ch] ${isCenter ? 'mx-auto' : ''} ${
            isInverse ? 'text-mist' : 'text-ink-muted'
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
};
