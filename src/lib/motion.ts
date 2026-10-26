import { Variants, Transition } from 'framer-motion';

/**
 * 2026 Canonical Motion Design System for Navya Ed Tech
 * Single source of truth for easing curves, durations, and animation variants.
 * Performance rule: Animate ONLY transform (x, y, scale) and opacity.
 */

// Production cubic bezier for smooth, authoritative product-company motion
export const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Canonical duration scale
export const DURATION = {
  fast: 0.25,
  normal: 0.4,
  moderate: 0.5,
  slow: 0.7,
} as const;

// Default scroll viewport trigger config: trigger once to prevent re-scroll distraction
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.2,
} as const;

export const VIEWPORT_HEADER = {
  once: true,
  amount: 0.4,
} as const;

// Shared transitions
export const standardTransition: Transition = {
  duration: DURATION.moderate,
  ease: EASING,
};

export const fastTransition: Transition = {
  duration: DURATION.fast,
  ease: EASING,
};

/**
 * fadeUp: Primary entrance for headings, text blocks, and single elements.
 * Opacity 0 -> 1, y 24px -> 0, duration 0.5s, ease [0.22, 1, 0.36, 1]
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
};

/**
 * fadeIn: Opacity reveal without positional displacement.
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING,
    },
  },
};

/**
 * scaleIn: Designed for cards, modals, and spotlight containers.
 * Opacity 0 -> 1, scale 0.96 -> 1.
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING,
    },
  },
};

/**
 * slideInLeft: Reveal from -24px x-offset.
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: standardTransition,
  },
};

/**
 * slideInRight: Reveal from +24px x-offset.
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: standardTransition,
  },
};

/**
 * staggerContainer: Orchestrates staggered reveals for children lists/grids.
 * Default stagger: 0.08s - 0.12s.
 */
export const staggerContainer = (staggerChildren = 0.09, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const defaultStagger: Variants = staggerContainer(0.09, 0.05);

/**
 * Hero entrance variants for above-the-fold page load sequences:
 * Eyebrow (0ms) -> Headline (120ms) -> Paragraph (240ms) -> Cards (350ms+, ~80ms apart)
 * Hero visual fades/scales in from right in parallel (150ms).
 */
export const heroStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const heroEyebrow: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING },
  },
};

export const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASING },
  },
};

export const heroParagraph: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
};

export const heroCardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const heroCardItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASING },
  },
};

export const heroVisual: Variants = {
  hidden: { opacity: 0, x: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.12, ease: EASING },
  },
};

/**
 * Bento / Capstone grid card entrance:
 * Subtle lift and fade-in with smooth cubic bezier.
 */
export const bentoCardVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.moderate, ease: EASING },
  },
};

/**
 * Chip / Tag entrance:
 * Staggers in with slight scale pop.
 */
export const chipItem: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASING },
  },
};

/**
 * Accessible reduced-motion variants:
 * Instantly snaps to final state with 0s duration and no translation/scale.
 * Used when prefers-reduced-motion is true.
 */
export const reducedFadeUp: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.01 } },
};

export const reducedScaleIn: Variants = {
  hidden: { opacity: 0, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.01 } },
};

export const reducedStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
    },
  },
};

/**
 * Route page transition variants:
 * Snappy fade + slight y-shift (180ms) for high-performance route changes.
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.14,
      ease: EASING,
    },
  },
};

export const reducedPageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.01 } },
  exit: { opacity: 0, y: 0, transition: { duration: 0.01 } },
};

/**
 * Helper to retrieve motion variants respecting reduced motion preferences.
 */
export function getMotionVariants(prefersReducedMotion: boolean | null | undefined) {
  if (prefersReducedMotion) {
    return {
      fadeUp: reducedFadeUp,
      fadeIn: reducedFadeUp,
      scaleIn: reducedScaleIn,
      slideInLeft: reducedFadeUp,
      slideInRight: reducedFadeUp,
      staggerContainer: () => reducedStaggerContainer,
      heroStaggerContainer: reducedStaggerContainer,
      heroEyebrow: reducedFadeUp,
      heroHeadline: reducedFadeUp,
      heroParagraph: reducedFadeUp,
      heroCardsContainer: reducedStaggerContainer,
      heroCardItem: reducedFadeUp,
      heroVisual: reducedFadeUp,
      bentoCardVariant: reducedFadeUp,
      chipItem: reducedFadeUp,
      pageTransition: reducedPageTransitionVariants,
    };
  }
  return {
    fadeUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    staggerContainer,
    heroStaggerContainer,
    heroEyebrow,
    heroHeadline,
    heroParagraph,
    heroCardsContainer,
    heroCardItem,
    heroVisual,
    bentoCardVariant,
    chipItem,
    pageTransition: pageTransitionVariants,
  };
}



