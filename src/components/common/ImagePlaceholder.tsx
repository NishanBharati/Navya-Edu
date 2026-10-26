import React, { useState } from 'react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  aspectRatio?: 'video' | 'cinema' | 'square' | 'portrait' | 'wide' | 'auto';
  label?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Rendered width hint for responsive sources, e.g. "(min-width: 1024px) 33vw, 100vw" */
  sizes?: string;
  children?: React.ReactNode;
}

// Widths generated for every /images/**/*.jpg (see docs/DESIGN_SYSTEM.md, "Images")
const RESPONSIVE_WIDTHS = [640, 1024, 1376];

/** Local JPGs under /images/ have pre-built AVIF and WebP variants beside them. */
const responsiveSources = (src: string) => {
  if (!/^\/images\/.+\.jpg$/i.test(src)) return null;
  const base = src.replace(/\.jpg$/i, '');
  const set = (ext: string) => RESPONSIVE_WIDTHS.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
  return { avif: set('avif'), webp: set('webp') };
};

/**
 * Canonical image container for content imagery (course/project/article
 * covers, hero photos). Shows a branded fallback panel instead of a blank
 * gap or the browser's broken-image glyph whenever `src` is missing or
 * fails to load. `children` accepts absolutely-positioned overlay content
 * (badges, gradient scrims) so this can replace a raw `<img>` inside a card.
 *
 * The image is visible from the first paint (no opacity gate), so
 * pre-rendered pages can paint it before JavaScript hydrates.
 */
export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  label,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw',
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    video: 'aspect-[16/10]',
    cinema: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full'
  };

  const showFallback = !src || hasError;
  const sources = src ? responsiveSources(src) : null;

  const img = src && !hasError && (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sources ? sizes : undefined}
      onError={() => setHasError(true)}
      className={`relative w-full h-full object-cover ${imgClassName}`}
    />
  );

  return (
    <div className={`relative overflow-hidden bg-paper-alt ${aspectClasses[aspectRatio]} ${className}`}>
      {img && sources ? (
        <picture>
          <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
          <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
          {img}
        </picture>
      ) : (
        img
      )}

      {showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-paper-alt bg-blueprint">
          <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-ink-faint mb-2.5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs font-mono font-medium tracking-wider text-ink-muted uppercase">
            {label || alt}
          </span>
        </div>
      )}

      {children}
    </div>
  );
};
