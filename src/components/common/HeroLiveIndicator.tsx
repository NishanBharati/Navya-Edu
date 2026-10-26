import React from 'react';

interface HeroLiveIndicatorProps {
  color?: 'emerald' | 'sage' | 'amber' | 'blue';
  className?: string;
}

/**
 * 2026 Live Breathing/Pulsing Dot Indicator for Hero Eyebrows.
 * Uses a subtle pinging aura and solid status dot to clearly read as "LIVE".
 */
export const HeroLiveIndicator: React.FC<HeroLiveIndicatorProps> = ({
  color = 'emerald',
  className = '',
}) => {
  const pingColor =
    color === 'amber'
      ? 'bg-amber-400'
      : color === 'blue'
      ? 'bg-blue-400'
      : color === 'sage'
      ? 'bg-[#52705C]'
      : 'bg-emerald-400';

  const dotColor =
    color === 'amber'
      ? 'bg-amber-500'
      : color === 'blue'
      ? 'bg-blue-500'
      : color === 'sage'
      ? 'bg-[#52705C]'
      : 'bg-emerald-500';

  return (
    <span className={`relative flex h-2 w-2 shrink-0 ${className}`} aria-hidden="true">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingColor} opacity-75`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
    </span>
  );
};
