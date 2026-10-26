import React from 'react';

/**
 * Snap Lab block: the site's single component language.
 * Blocks interlock: a socket in the top edge, a tab under the bottom edge.
 * `hat` starts a script (rounded crown, no socket). Colour pairings keep
 * text contrast AA: white on blue / blueDeep / violet, ink on the rest.
 */
export type BlockColor = 'blue' | 'blueDeep' | 'yellow' | 'orange' | 'violet' | 'green' | 'pink' | 'ink' | 'white';

export const BLOCK_COLORS: Record<BlockColor, { bg: string; ink: boolean }> = {
  blue: { bg: 'var(--color-block-blue)', ink: false },
  blueDeep: { bg: 'var(--color-block-blue-deep)', ink: false },
  violet: { bg: 'var(--color-block-violet)', ink: false },
  ink: { bg: 'var(--color-ink)', ink: false },
  yellow: { bg: 'var(--color-block-yellow)', ink: true },
  orange: { bg: 'var(--color-block-orange)', ink: true },
  green: { bg: 'var(--color-block-green)', ink: true },
  pink: { bg: 'var(--color-block-pink)', ink: true },
  white: { bg: '#FFFFFF', ink: true },
};

export const blockStyle = (color: BlockColor) => ({ '--block': BLOCK_COLORS[color].bg }) as React.CSSProperties;

interface BlockProps {
  color?: BlockColor;
  hat?: boolean;
  /** Show the bottom tab that the next block snaps onto */
  tab?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Block: React.FC<BlockProps> = ({ color = 'blue', hat = false, tab = true, className = '', children }) => {
  const c = color as BlockColor;
  const { ink } = BLOCK_COLORS[c];
  return (
    <span className={tab ? 'snap-tab' : 'inline-flex'} style={blockStyle(c)}>
      <span className={`snap-block ${hat ? 'snap-hat' : ''} ${ink ? 'snap-ink' : ''} ${className}`}>{children}</span>
    </span>
  );
};

/** A slot inside a block, drawn as the white rounded input field blocks carry */
export const BlockSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center h-[1.75em] px-[0.65em] rounded-full bg-white/95 text-ink text-[0.9em] font-semibold whitespace-nowrap">
    {children}
  </span>
);
