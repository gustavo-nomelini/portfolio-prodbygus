'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasGlitchEffect, setHasGlitchEffect] = useState(false);

  // Timer para esconder o cursor após inatividade
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  // Timer para o efeito de glitch
  const [glitchTimer, setGlitchTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      // Reset inactivity timer
      if (inactivityTimer) clearTimeout(inactivityTimer);
      const timer = setTimeout(() => setIsHidden(true), 5000); // 5 segundos de inatividade
      setInactivityTimer(timer);
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

    const handleMouseDown = () => {
      setIsClicking(true);
      // Aleatoriamente adiciona o efeito glitch quando clica
      if (Math.random() > 0.5) {
        triggerGlitchEffect();
      }
    };

    const handleMouseUp = () => setIsClicking(false);

    // Função para criar efeito de glitch
    const triggerGlitchEffect = () => {
      setHasGlitchEffect(true);
      if (glitchTimer) clearTimeout(glitchTimer);
      const timer = setTimeout(() => setHasGlitchEffect(false), 300); // 300ms de glitch
      setGlitchTimer(timer);
    };

    // Aleatoriamente cria efeito de glitch a cada 8-15 segundos
    const randomGlitchInterval = setInterval(
      () => {
        if (Math.random() > 0.7) {
          // 30% de chance
          triggerGlitchEffect();
        }
      },
      Math.random() * 7000 + 8000,
    ); // Entre 8 e 15 segundos

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Set up interval for checking pointer style
    const interval = setInterval(handlePointerDetection, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
      clearInterval(randomGlitchInterval);
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (glitchTimer) clearTimeout(glitchTimer);
    };
  }, [mousePosition.x, mousePosition.y, inactivityTimer, glitchTimer]);

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
      {/* Cursor outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          opacity: isHidden ? 0 : 1,
          filter: hasGlitchEffect
            ? 'hue-rotate(90deg) brightness(1.5)'
            : 'none',
          transition: hasGlitchEffect ? 'filter 0.1s' : 'opacity 0.3s',
        }}
        animate={{
          x: mousePosition.x + (hasGlitchEffect ? Math.random() * 6 - 3 : 0),
          y: mousePosition.y + (hasGlitchEffect ? Math.random() * 6 - 3 : 0),
          scale: isPointer ? 1.2 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(var(--color1-rgb), 1) 0%, rgba(var(--color1-rgb), 0) 70%)`,
            filter: 'blur(4px)',
          }}
          animate={{
            scale: isPointer ? 1.5 : isClicking ? 1.8 : 1,
          }}
        />

        {/* Main ring */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[var(--color1)] mix-blend-difference"></div>

        {/* Corner accents */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-[-6px] left-[-6px] w-3 h-3 border-t border-l border-[var(--color1)]"></div>
          <div className="absolute top-[-6px] right-[-6px] w-3 h-3 border-t border-r border-[var(--color1)]"></div>
          <div className="absolute bottom-[-6px] left-[-6px] w-3 h-3 border-b border-l border-[var(--color1)]"></div>
          <div className="absolute bottom-[-6px] right-[-6px] w-3 h-3 border-b border-r border-[var(--color1)]"></div>
        </div>

        {/* Scan line effect */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 overflow-hidden rounded-full opacity-30">
          <div
            className="w-full h-0.5 bg-[var(--color1)] absolute"
            style={{
              top: `${Math.sin(Date.now() * 0.005) * 4 + 4}px`,
              boxShadow: '0 0 4px rgba(var(--color1-rgb), 1)',
            }}
          ></div>
        </div>
      </motion.div>

      {/* Center cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none bg-[var(--color3)] rounded-full"
        style={{
          width: isPointer ? '6px' : '4px',
          height: isPointer ? '6px' : '4px',
          boxShadow: '0 0 6px rgba(var(--color1-rgb), 0.8)',
          opacity: isHidden ? 0 : 1,
          filter: hasGlitchEffect
            ? 'hue-rotate(90deg) brightness(1.5)'
            : 'none',
        }}
        animate={{
          x:
            mousePosition.x -
            (isPointer ? 3 : 2) +
            (hasGlitchEffect ? Math.random() * 8 - 4 : 0),
          y:
            mousePosition.y -
            (isPointer ? 3 : 2) +
            (hasGlitchEffect ? Math.random() * 8 - 4 : 0),
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.2,
        }}
      />

      {/* Trailing particles effect (visible when moving) */}
      <motion.div
        className="fixed top-0 left-0 z-40 pointer-events-none w-2 h-2 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(var(--color1-rgb), 0.8) 0%, rgba(var(--color1-rgb), 0) 70%)`,
          opacity: isHidden ? 0 : 0.6,
        }}
        animate={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 200,
          mass: 0.1,
          delay: 0.1,
        }}
      />

      {/* Pulse effect when clicking */}
      {isClicking && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.3 }}
          animate={{ opacity: 0, scale: 2.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 z-30 pointer-events-none w-8 h-8 rounded-full"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            border: '1px solid var(--color1)',
            boxShadow: '0 0 10px rgba(var(--color1-rgb), 0.5)',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
