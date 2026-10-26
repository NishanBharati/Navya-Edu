import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { DURATION, EASING, STAGGER, VIEWPORT_REVEAL } from '../../lib/motion';

/**
 * Shared scroll-reveal primitives. Every section on the public site uses
 * these instead of hand-writing `whileInView`, so timing, distance and
 * trigger point stay identical everywhere.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.tsx: the `y` offset is dropped and only the opacity fade remains.
 */

type RevealTag = 'div' | 'section' | 'header' | 'ul' | 'ol' | 'li' | 'article' | 'span' | 'p';

type MotionTagProps = Omit<HTMLMotionProps<'div'>, 'ref' | 'as'>;

const motionTag = (as: RevealTag) => motion[as] as typeof motion.div;

interface RevealProps extends MotionTagProps {
  as?: RevealTag;
  /** Seconds before this element starts revealing */
  delay?: number;
  /** Travel distance in px */
  y?: number;
}

export const Reveal: React.FC<RevealProps> = ({ as = 'div', delay = 0, y = 16, children, ...rest }) => {
  const Tag = motionTag(as as RevealTag);
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_REVEAL}
      transition={{ duration: DURATION.reveal, ease: EASING, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASING } },
};

interface StaggerProps extends MotionTagProps {
  as?: RevealTag;
  /** Seconds between children */
  stagger?: number;
  delay?: number;
}

/** Reveals its <StaggerItem> children one after another when scrolled into view. */
export const Stagger: React.FC<StaggerProps> = ({ as = 'div', stagger = STAGGER, delay = 0, children, ...rest }) => {
  const Tag = motionTag(as as RevealTag);
  return (
    <Tag
      variants={groupVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      {...rest}
    >
      {children}
    </Tag>
  );
};

interface StaggerItemProps extends MotionTagProps {
  as?: RevealTag;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ as = 'div', children, ...rest }) => {
  const Tag = motionTag(as as RevealTag);
  return (
    <Tag variants={staggerItemVariants} {...rest}>
      {children}
    </Tag>
  );
};
