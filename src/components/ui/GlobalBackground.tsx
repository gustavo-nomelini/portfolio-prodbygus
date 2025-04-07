'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Import ParticlesEffect with SSR disabled
const ParticlesEffect = dynamic(() => import('./ParticlesEffect'), {
  ssr: false,
});

// Componente de implementação que não será renderizado no servidor
const GlobalBackgroundImpl = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [scaleValue, setScaleValue] = useState(1);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const cyberpunkGridRef = useRef<HTMLDivElement>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const waveAnimationRef = useRef<number>(0);
  const pulseAnimationRef = useRef<number>(0);

  // Gerenciar a animação de pulsação
  useEffect(() => {
    const updatePulseScale = () => {
      setScaleValue(1 + Math.sin(Date.now() * 0.001) * 0.1);
      pulseAnimationRef.current = requestAnimationFrame(updatePulseScale);
    };

    pulseAnimationRef.current = requestAnimationFrame(updatePulseScale);

    return () => {
      if (pulseAnimationRef.current) {
        cancelAnimationFrame(pulseAnimationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Função para lidar com movimento do mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);

      // Redefinir o timer de inatividade
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Definir o mouse como inativo após 2 segundos sem movimento
      inactivityTimerRef.current = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    };

    // Iniciar animação de onda
    const startWaveAnimation = () => {
      const canvas = waveCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let time = 0;

      const animate = () => {
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular intensidade baseada na proximidade/movimento do mouse
        const intensity = isActive ? 20 : 10;

        // Desenhar várias linhas de onda
        for (let i = 0; i < 3; i++) {
          const color =
            i === 0
              ? `rgba(var(--color1-rgb), 0.05)`
              : i === 1
                ? `rgba(var(--color3-rgb), 0.05)`
                : `rgba(255, 255, 255, 0.05)`;

          const yOffset = i * 30;
          const amplitude = intensity * (i + 1) * 0.5;
          const frequency = 0.005 + i * 0.002;
          const speed = 0.03 + i * 0.01;

          ctx.beginPath();

          for (let x = 0; x < canvas.width; x += 5) {
            // Calcular efeito de distorção baseado na posição do mouse
            const distanceX = mousePosition.x - x;
            const distanceFactor = isActive
              ? Math.max(0, 1 - Math.min(Math.abs(distanceX) / 300, 1)) * 10
              : 0;

            const y =
              canvas.height / 2 +
              Math.sin(x * frequency + time * speed) * amplitude +
              Math.sin(x * frequency * 0.5 + time * speed * 0.7) *
                amplitude *
                0.5 +
              yOffset +
              (isActive ? distanceFactor * Math.sin(time * 2) : 0);

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.strokeStyle = color;
          ctx.lineWidth = 2 + i * 1;
          ctx.stroke();
        }

        time += 0.05;
        waveAnimationRef.current = requestAnimationFrame(animate);
      };

      waveAnimationRef.current = requestAnimationFrame(animate);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (waveAnimationRef.current) {
          cancelAnimationFrame(waveAnimationRef.current);
        }
      };
    };

    // Atualizar posição dos gradientes conforme posição do mouse
    const updateGradientEffect = () => {
      if (gradientRef.current) {
        const xPercent = isActive
          ? (mousePosition.x / window.innerWidth) * 100
          : 50;
        const yPercent = isActive
          ? (mousePosition.y / window.innerHeight) * 100
          : 50;

        gradientRef.current.style.background = `radial-gradient(
          circle at ${xPercent}% ${yPercent}%, 
          rgba(var(--color1-rgb), 0.05) 0%, 
          rgba(var(--color3-rgb), 0.05) 50%, 
          rgba(var(--background), 0) 100%
        )`;
      }

      // Atualizar grid cyberpunk
      if (cyberpunkGridRef.current && isActive) {
        const moveFactor = 2; // Quão rápido o grid se move com o mouse
        const xOffset =
          (mousePosition.x / window.innerWidth - 0.5) * moveFactor;
        const yOffset =
          (mousePosition.y / window.innerHeight - 0.5) * moveFactor;

        cyberpunkGridRef.current.style.backgroundPosition = `
          calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)
        `;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Iniciar animação de onda
    const cleanupWaveAnimation = startWaveAnimation();

    // Configurar intervalo para atualizar efeitos
    const updateInterval = setInterval(updateGradientEffect, 10);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(updateInterval);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (typeof cleanupWaveAnimation === 'function') {
        cleanupWaveAnimation();
      }
    };
  }, [mousePosition, isActive]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background gradients */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/10 to-[var(--color3)]/10 transition-opacity duration-500"
        style={{
          opacity: isActive ? 0.8 : 0.5,
          transition: 'opacity 1s ease-out',
        }}
      />

      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-80 h-80 bg-[var(--color1)]/20 rounded-full filter blur-[80px]"
          style={{
            transform: isActive
              ? `translate(${(mousePosition.x / window.innerWidth - 0.5) * -20}px, ${(mousePosition.y / window.innerHeight - 0.5) * -20}px)`
              : 'none',
            transition: 'transform 2s ease-out',
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color3)]/20 rounded-full filter blur-[80px]"
          style={{
            transform: isActive
              ? `translate(${(mousePosition.x / window.innerWidth - 0.5) * 20}px, ${(mousePosition.y / window.innerHeight - 0.5) * 20}px)`
              : 'none',
            transition: 'transform 2s ease-out',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color1)]/10 rounded-full filter blur-[60px]"
          style={{
            transform: isActive
              ? `translate(-50%, -50%) scale(${scaleValue})`
              : 'translate(-50%, -50%)',
            transition: 'transform 0.5s ease-out',
          }}
        />
      </div>

      {/* Onda animada */}
      <canvas
        ref={waveCanvasRef}
        className="absolute inset-0 z-[-1] pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Cyberpunk Grid Lines */}
      <div
        ref={cyberpunkGridRef}
        className="absolute inset-0 cyberpunk-grid opacity-20"
        style={{
          transitionProperty: 'background-position',
          transitionDuration: '0.5s',
          transitionTimingFunction: 'ease-out',
        }}
      />

      {/* Partículas interativas */}
      <div className="pointer-events-none">
        <ParticlesEffect />
      </div>

      {/* Pontilhado de brilho que segue o mouse */}
      {isActive && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            width: '300px',
            height: '300px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(var(--color1-rgb), 0.1) 0%, rgba(0, 0, 0, 0) 70%)`,
            opacity: 0.7,
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
};

// Exportando o componente com dynamic import e ssr: false para garantir renderização apenas no cliente
export default dynamic(() => Promise.resolve(GlobalBackgroundImpl), {
  ssr: false,
});
