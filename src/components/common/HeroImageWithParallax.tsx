import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { heroVisual, EASING } from '../../lib/motion';
import { isRealPhoto } from '../../lib/media';
import { CoverArt, coverKindFor } from '../blocks/CoverArt';

interface HeroImageWithParallaxProps {
  src: string;
  alt: string;
  overlayBadgeTop?: React.ReactNode;
  overlayCardBottom?: React.ReactNode;
  heightClass?: string;
  priority?: boolean;
}

/**
 * 2026 Editorial Hero Visual Composition with Parallax Overlaid Info Cards.
 * Features:
 * - Ambient gradient depth glow backdrop
 * - Entrances in parallel with text sequence via GPU-accelerated transform & opacity
 * - Overlaid info card gently drifts vertically on scroll (subtle 3D parallax depth)
 * - Automatic reduction fallback for prefers-reduced-motion
 */
export const HeroImageWithParallax: React.FC<HeroImageWithParallaxProps> = ({
  src,
  alt,
  overlayBadgeTop,
  overlayCardBottom,
  heightClass = 'h-[320px] sm:h-[380px]',
  priority = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Gentle vertical drift on scroll (0px -> -18px over the first 400px of page scroll)
  const cardParallaxY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -18]);
  const badgeParallaxY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -8]);

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : heroVisual}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
      className="relative mx-auto max-w-lg lg:max-w-none"
    >
      {/* Subtle ambient backdrop glow */}
      <div
        className="absolute -inset-2 bg-gradient-to-tr from-navy/20 via-blue/15 to-sage/20 rounded-3xl blur-xl -z-10"
        aria-hidden="true"
      />

      {/* Main Image Frame */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
        {isRealPhoto(src) ? (
          <img
            src={src}
            alt={alt}
            width="600"
            height="380"
            className={`w-full ${heightClass} object-cover group-hover:scale-105 transition-transform duration-700 ease-out`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
          />
        ) : (
          <div role="img" aria-label={alt} className={`relative w-full ${heightClass}`}>
            <CoverArt kind={coverKindFor(alt)} label={alt} />
          </div>
        )}

        {/* Ambient vignette gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Overlay Badge with subtle scroll drift */}
        {overlayBadgeTop && (
          <motion.div
            style={{ y: badgeParallaxY }}
            className="absolute top-4 left-4 z-10"
          >
            {overlayBadgeTop}
          </motion.div>
        )}

        {/* Bottom Overlay Card with interactive lift & scroll parallax */}
        {overlayCardBottom && (
          <motion.div
            style={{ y: cardParallaxY }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.015 }}
            transition={{ duration: 0.2, ease: EASING }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            {overlayCardBottom}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
