import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = ''
}) => {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs md:text-sm font-semibold tracking-wider uppercase text-[#356A9A] mb-2.5">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#171A1F] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-[#5F6670] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
