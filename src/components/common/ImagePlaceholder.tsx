import React, { useState } from 'react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  label?: string;
  className?: string;
  priority?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  label,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full'
  };

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative overflow-hidden bg-[#F4F1EA] border border-[#E8E3D8] ${aspectClasses[aspectRatio]} ${className}`}
    >
      {src && !hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F4F1EA]">
          <div className="w-10 h-10 rounded-full bg-[#E5DFD4] flex items-center justify-center text-[#5F6670] mb-2.5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs font-mono font-medium tracking-wider text-[#5F6670] uppercase">
            {label || `[${alt.toUpperCase()}]`}
          </span>
          <span className="text-[11px] text-[#8C939E] mt-1">
            Navya Ed Tech Visual Asset
          </span>
        </div>
      )}
    </div>
  );
};
