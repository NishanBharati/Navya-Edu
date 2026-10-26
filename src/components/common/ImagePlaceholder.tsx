import React, { useState } from 'react';
import { CoverArt, CoverKind, coverKindFor } from '../blocks/CoverArt';
import { isRealPhoto } from '../../lib/media';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  aspectRatio?: 'video' | 'cinema' | 'square' | 'portrait' | 'wide' | 'auto';
  label?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Rendered width hint for uploaded photos */
  sizes?: string;
  /** Which code-drawn cover to show when there is no real photo; inferred from alt/label when omitted */
  art?: CoverKind;
  children?: React.ReactNode;
}

/**
 * Canonical media slot for cards and heroes: an uploaded photo when one
 * exists, otherwise code-drawn cover art for the subject. `children` takes
 * absolutely-positioned overlays (badges, scrims).
 */
export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  label,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  art,
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

  const showPhoto = isRealPhoto(src) && !hasError;
  const kind = art ?? coverKindFor(`${label ?? ''} ${alt}`);

  return (
    <div className={`relative overflow-hidden bg-canvas ${aspectClasses[aspectRatio]} ${className}`}>
      {showPhoto ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onError={() => setHasError(true)}
          className={`relative w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div role="img" aria-label={alt} className={`absolute inset-0 ${imgClassName}`}>
          <CoverArt kind={kind} label={label || alt} />
        </div>
      )}

      {children}
    </div>
  );
};
