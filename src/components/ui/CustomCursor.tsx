'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerDetection = () => {
      const hoveredElement = document.elementFromPoint(
        mousePosition.x,
        mousePosition.y,
      );

      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(computedStyle.cursor === 'pointer');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Set up interval for checking pointer style
    const interval = setInterval(handlePointerDetection, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [mousePosition.x, mousePosition.y]);

  // Hide the cursor on mobile devices
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-50 pointer-events-none mix-blend-difference"
        style={{
          backgroundColor: 'rgba(var(--color1-rgb), 1)',
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor;
