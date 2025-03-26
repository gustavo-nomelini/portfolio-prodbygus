'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedLayoutProps {
  children: ReactNode;
  className?: string;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({
  children,
  className = '',
}) => {
  // Page variants for smooth transitions
  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        ease: 'easeIn',
      },
    },
  };

  // Content variants for staggered animations
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        className={className}
      >
        <motion.div variants={contentVariants}>{children}</motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
