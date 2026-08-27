import React from 'react';

export interface DarkCTACardProps {
  children: React.ReactNode;
  decoration?: 'dots' | 'glow' | 'none';
  className?: string;
}

/**
 * Shared shell for the "navy card with ambient decoration" pattern used
 * for every CTA band on the site. Previously hand-rolled five separate
 * times with slightly different radius, border, shadow and decoration
 * markup — this is the one canonical container; each caller only
 * supplies its own heading/copy/buttons as children.
 */
export const DarkCTACard: React.FC<DarkCTACardProps> = ({
  children,
  decoration = 'glow',
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-navy text-white rounded-2xl sm:rounded-3xl border border-navy-deep shadow-xl ${className}`}
    >
      {decoration === 'dots' && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      )}
      {decoration === 'glow' && (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
