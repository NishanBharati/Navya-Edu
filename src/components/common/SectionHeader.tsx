import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  badge?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  headingTag?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  badge,
  title,
  description,
  align = 'left',
  headingTag = 'h2',
  className = '',
}) => {
  const HeadingComponent = headingTag;

  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {badge && <div className={`mb-3 ${align === 'center' ? 'flex justify-center' : ''}`}>{badge}</div>}
      {!badge && eyebrow && (
        <p className="text-xs md:text-sm font-bold tracking-wider uppercase text-blue mb-2.5">
          {eyebrow}
        </p>
      )}
      <HeadingComponent className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink leading-[1.2]">
        {title}
      </HeadingComponent>
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-ink-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
