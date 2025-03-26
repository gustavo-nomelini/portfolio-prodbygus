'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideRight'
    | 'slideLeft'
    | 'scale'
    | 'reveal';
  delay?: number;
  duration?: number;
  margin?: string;
  once?: boolean;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  reveal: {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
  },
};

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  margin = '-100px',
  once = true,
}) => {
  const selectedAnimation = animations[animation];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={selectedAnimation}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
