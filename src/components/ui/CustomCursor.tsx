'use client';

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

type CursorParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
};

// Componente de implementação real que só será renderizado no cliente
const CursorImplementation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasGlitchEffect, setHasGlitchEffect] = useState(false);
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const [cursorHoverText, setCursorHoverText] = useState<string | null>(null);
  const [cursorsHistory, setCursorsHistory] = useState<
    { x: number; y: number; time: number }[]
  >([]);
  const [cursorMode, setCursorMode] = useState<'default' | 'scan' | 'target'>(
    'default',
  );

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const glitchTimer = useRef<NodeJS.Timeout | null>(null);
  const particleTimer = useRef<NodeJS.Timeout | null>(null);
  const lastMoveTime = useRef<number>(0);
  const moveSpeed = useRef<number>(0);
  const lastPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const particleIdCounter = useRef<number>(0);

  useEffect(() => {
    // Adicionar classe global para esconder cursor padrão
    document.body.classList.add('hide-default-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const newPosition = { x: e.clientX, y: e.clientY };

      // Calcular velocidade do movimento
      if (lastMoveTime.current > 0) {
        const timeDiff = currentTime - lastMoveTime.current;
        const xDiff = newPosition.x - lastPosition.current.x;
        const yDiff = newPosition.y - lastPosition.current.y;
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        moveSpeed.current = distance / Math.max(1, timeDiff); // pixels por ms
      }

      lastMoveTime.current = currentTime;
      lastPosition.current = { ...newPosition };

      setMousePosition(newPosition);
      setIsHidden(false);

      // Adicionar à história dos cursores (limitar a 20 posições)
      setCursorsHistory((prev) => {
        const newHistory = [...prev, { ...newPosition, time: currentTime }];
        if (newHistory.length > 20) {
          return newHistory.slice(newHistory.length - 20);
        }
        return newHistory;
      });

      // Reset inactivity timer
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      const timer = setTimeout(() => setIsHidden(true), 5000); // 5 segundos de inatividade
      inactivityTimer.current = timer;
    };

    const handlePointerDetection = () => {
      const hoveredElement = document.elementFromPoint(
        mousePosition.x,
        mousePosition.y,
      );

      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        const wasPointer = isPointer;
        const newIsPointer = computedStyle.cursor === 'pointer';
        setIsPointer(newIsPointer);

        // Se acabou de entrar em um elemento clicável, adicionar efeito de glitch
        if (!wasPointer && newIsPointer) {
          triggerGlitchEffect();

          // Determinar texto do hover com base em atributos
          let hoverText = null;
          if (hoveredElement.hasAttribute('data-cursor-text')) {
            hoverText = hoveredElement.getAttribute('data-cursor-text');
          } else if (hoveredElement.hasAttribute('aria-label')) {
            hoverText = hoveredElement.getAttribute('aria-label');
          } else if (
            hoveredElement.tagName === 'BUTTON' ||
            hoveredElement.tagName === 'A'
          ) {
            // Para links e botões, mostrar texto padrão
            hoverText = hoveredElement.tagName === 'A' ? 'Navegar' : 'Ação';
          }

          setCursorHoverText(hoverText);

          // Para links, mudar para modo de destino
          if (hoveredElement.tagName === 'A') {
            setCursorMode('target');
          } else if (hoveredElement.tagName === 'BUTTON') {
            setCursorMode('scan');
          }
        }
        // Se saiu de um elemento clicável
        else if (wasPointer && !newIsPointer) {
          setCursorHoverText(null);
          setCursorMode('default');
        }
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Gerar partículas ao clicar
      generateClickParticles();

      // Aleatoriamente adiciona o efeito glitch quando clica
      if (Math.random() > 0.5) {
        triggerGlitchEffect();
      }
    };

    const handleMouseUp = () => setIsClicking(false);

    // Função para gerar partículas ao clicar
    const generateClickParticles = () => {
      const newParticles: CursorParticle[] = [];
      const particleCount = 10 + Math.floor(Math.random() * 5);

      const colors = [
        `rgba(var(--color1-rgb), 0.8)`,
        `rgba(var(--color3-rgb), 0.8)`,
        'rgba(255, 255, 255, 0.8)',
      ];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const size = 1 + Math.random() * 3;
        const maxLife = 500 + Math.random() * 300; // ms

        newParticles.push({
          id: particleIdCounter.current++,
          x: mousePosition.x + Math.cos(angle) * 5,
          y: mousePosition.y + Math.sin(angle) * 5,
          size: size,
          opacity: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: maxLife,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    };

    // Função para criar efeito de glitch
    const triggerGlitchEffect = () => {
      setHasGlitchEffect(true);
      if (glitchTimer.current) clearTimeout(glitchTimer.current);
      const timer = setTimeout(() => setHasGlitchEffect(false), 300); // 300ms de glitch
      glitchTimer.current = timer;
    };

    // Gerar partículas em movimento suavemente
    const generateMovementParticles = () => {
      // Só gerar partículas se o cursor estiver se movendo rápido
      if (moveSpeed.current > 0.5) {
        const newParticle: CursorParticle = {
          id: particleIdCounter.current++,
          x: mousePosition.x + (Math.random() - 0.5) * 10,
          y: mousePosition.y + (Math.random() - 0.5) * 10,
          size: 1 + Math.random() * 2,
          opacity: 0.4 + Math.random() * 0.4,
          color:
            Math.random() > 0.5
              ? `rgba(var(--color1-rgb), 0.6)`
              : `rgba(var(--color3-rgb), 0.6)`,
          life: 0,
          maxLife: 300 + Math.random() * 200,
        };

        setParticles((prev) => [...prev, newParticle]);
      }
    };

    // Atualizar as partículas (reduzir opacidade, etc.)
    const updateParticles = () => {
      setParticles(
        (prev) =>
          prev
            .map((p) => ({
              ...p,
              life: p.life + 16.67, // ~60fps
              opacity: p.opacity * (1 - p.life / p.maxLife),
              size: p.size * (1 - (p.life / p.maxLife) * 0.5),
              x: p.x + (Math.random() - 0.5) * 0.5,
              y: p.y + (Math.random() - 0.5) * 0.5 + 0.2, // leve movimento para baixo
            }))
            .filter((p) => p.life < p.maxLife), // remover partículas mortas
      );
    };

    // Configurar intervalos para partículas e efeitos
    const movementParticleInterval = setInterval(generateMovementParticles, 50);
    const updateParticleInterval = setInterval(updateParticles, 16.67); // ~60fps

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
    const pointerDetectionInterval = setInterval(handlePointerDetection, 100);

    // Fix for ref warning - Save refs to local variables at beginning of effect
    return () => {
      document.body.classList.remove('hide-default-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(pointerDetectionInterval);
      clearInterval(randomGlitchInterval);
      clearInterval(movementParticleInterval);
      clearInterval(updateParticleInterval);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (glitchTimer.current) clearTimeout(glitchTimer.current);

      // Properly capture the ref value in a variable
      const currentParticleTimer = particleTimer.current;
      if (currentParticleTimer) clearTimeout(currentParticleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition.x, mousePosition.y, isPointer]);

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

  // Determinar tamanhos e cores com base no modo do cursor
  const cursorSize = isPointer ? 48 : cursorMode === 'scan' ? 52 : 36;
  const dotSize = isPointer ? 6 : cursorMode === 'scan' ? 7 : 4;
  const cursorColor =
    cursorMode === 'scan'
      ? 'var(--color3)'
      : cursorMode === 'target'
        ? 'var(--color1)'
        : 'var(--color1)';

  return (
    <>
      {/* Partículas de efeito */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 z-40 pointer-events-none rounded-full"
            style={{
              x: particle.x,
              y: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{ opacity: particle.opacity, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: particle.maxLife / 1000,
              type: 'tween',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Traço de cauda do cursor (histórico de posições) */}
      {cursorsHistory.map((pos, index) => {
        // Só mostrar se o cursor estiver em movimento rápido
        if (moveSpeed.current < 0.5) return null;

        const opacity = (index / cursorsHistory.length) * 0.2; // Fade out mais antigos
        const size = 3 + (index / cursorsHistory.length) * 5;

        return (
          <motion.div
            key={`trail-${index}`}
            className="fixed top-0 left-0 z-40 pointer-events-none rounded-full"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              width: size,
              height: size,
              backgroundColor: cursorColor,
              opacity: opacity,
            }}
          />
        );
      })}

      {/* Ring cursor (outer ring) */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          width: cursorSize,
          height: cursorSize,
          borderRadius: '50%',
          border: `1.5px solid ${cursorColor}`,
          opacity: isHidden ? 0 : isPointer ? 0.9 : 0.7,
          filter: hasGlitchEffect
            ? 'hue-rotate(90deg) brightness(1.5)'
            : 'none',
          boxShadow: `0 0 8px ${cursorColor}`,
        }}
        animate={{
          x:
            mousePosition.x -
            cursorSize / 2 +
            (hasGlitchEffect ? Math.floor(Math.random() * 8 - 4) : 0),
          y:
            mousePosition.y -
            cursorSize / 2 +
            (hasGlitchEffect ? Math.floor(Math.random() * 8 - 4) : 0),
          scale: isClicking ? 0.8 : 1,
          rotate: hasGlitchEffect ? -5 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
      >
        {/* Implementação de cursor especial por modo */}
        {cursorMode === 'scan' && (
          <>
            {/* Scanner animation */}
            <div
              className="absolute top-0 left-0 h-full w-2 bg-[var(--color3)]"
              style={{
                opacity: 0.3,
                boxShadow: '0 0 10px var(--color3)',
                animation: 'scanLine 2s infinite linear',
              }}
            />
          </>
        )}

        {cursorMode === 'target' && (
          <>
            {/* Target corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-current opacity-50"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-current opacity-50"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-current opacity-50"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-current opacity-50"></div>
          </>
        )}
      </motion.div>

      {/* Linhas de cruzamento completamente separadas e independentes do cursor principal */}
      <motion.div
        className="fixed top-0 left-0 z-49 pointer-events-none"
        style={{
          width: cursorSize,
          height: cursorSize,
          opacity: isHidden ? 0 : 0.25,
        }}
        animate={{
          x: mousePosition.x - cursorSize / 2,
          y: mousePosition.y - cursorSize / 2,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
      >
        {/* Linha horizontal fixa com cor roxa */}
        <div
          className="absolute top-1/2 left-0 w-full h-px"
          style={{
            backgroundColor: 'var(--color1)',
            boxShadow: '0 0 4px var(--color1)',
          }}
        ></div>

        {/* Linha vertical fixa com cor roxa */}
        <div
          className="absolute top-0 left-1/2 h-full w-px"
          style={{
            backgroundColor: 'var(--color1)',
            boxShadow: '0 0 4px var(--color1)',
          }}
        ></div>
      </motion.div>

      {/* Texto de hover */}
      <AnimatePresence>
        {cursorHoverText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
              duration: 0.2,
              type: 'tween',
            }}
            className="fixed z-50 pointer-events-none text-[10px] uppercase tracking-wider"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y + cursorSize / 2 + 8}px`,
              transform: 'translateX(-50%)',
              color: cursorColor,
              textShadow: `0 0 4px ${cursorColor}`,
            }}
          >
            {cursorHoverText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: cursorColor,
          boxShadow: `0 0 6px ${cursorColor}`,
          opacity: isHidden ? 0 : 1,
          filter: hasGlitchEffect
            ? 'hue-rotate(90deg) brightness(1.5)'
            : 'none',
        }}
        animate={{
          x:
            mousePosition.x -
            dotSize / 2 +
            (hasGlitchEffect ? Math.floor(Math.random() * 8 - 4) : 0),
          y:
            mousePosition.y -
            dotSize / 2 +
            (hasGlitchEffect ? Math.floor(Math.random() * 8 - 4) : 0),
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
        className="fixed top-0 left-0 z-40 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${cursorColor}cc 0%, transparent 70%)`,
          opacity: isHidden
            ? 0
            : moveSpeed.current > 0.1
              ? 0.6 * Math.min(1, moveSpeed.current)
              : 0.2,
          width: Math.max(4, moveSpeed.current * 6),
          height: Math.max(4, moveSpeed.current * 6),
        }}
        animate={{
          x: mousePosition.x - Math.max(4, moveSpeed.current * 6) / 2,
          y: mousePosition.y - Math.max(4, moveSpeed.current * 6) / 2,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 200,
          mass: 0.1,
          delay: 0.02,
        }}
      />

      {/* Pulse effect when clicking */}
      {isClicking && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.3 }}
          animate={{ opacity: 0, scale: 2.5 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            type: 'tween',
          }}
          className="fixed top-0 left-0 z-30 pointer-events-none rounded-full"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            width: Math.max(16, cursorSize),
            height: Math.max(16, cursorSize),
            border: `1px solid ${cursorColor}`,
            boxShadow: `0 0 10px ${cursorColor}`,
          }}
        />
      )}
    </>
  );
};

// Componente CustomCursor que usa dynamic import com ssr: false
const CustomCursor = dynamic(() => Promise.resolve(CursorImplementation), {
  ssr: false,
});

export default CustomCursor;
