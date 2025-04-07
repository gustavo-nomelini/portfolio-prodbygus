'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  originalX: number; // Para gravitar de volta à posição original
  originalY: number; // Para gravitar de volta à posição original
};

const ParticlesEffectImpl = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMouseActive = useRef<boolean>(false);
  const mouseActiveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isInitialized.current) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isInitialized.current = true;
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      isMouseActive.current = true;

      // Reset mouse active timer
      if (mouseActiveTimer.current) {
        clearTimeout(mouseActiveTimer.current);
      }

      // Mouse é considerado inativo após 2 segundos sem movimento
      mouseActiveTimer.current = setTimeout(() => {
        isMouseActive.current = false;
      }, 2000);
    };

    const initializeParticles = () => {
      particles.current = [];
      // Aumentar contagem de partículas para desktop
      const particleCount = Math.min(100, window.innerWidth / 15);

      const colors = [
        'rgba(var(--color1-rgb), 0.7)',
        'rgba(var(--color3-rgb), 0.7)',
        'rgba(255, 255, 255, 0.7)',
      ];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.current.push({
          x: x,
          y: y,
          originalX: x, // Guardar posição original
          originalY: y, // Guardar posição original
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      // Check if canvas context is still valid (might be lost during page transitions)
      if (!ctx || !canvas) {
        // Try to recover
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calcular efeitos baseados no mouse
      const mouseInteractionRadius = Math.min(250, window.innerWidth / 5);
      const mouseEffect = isMouseActive.current ? 1 : 0;

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        if (isMouseActive.current) {
          // Calcular distância do mouse
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Aplicar efeito apenas se estiver dentro do raio de interação
          if (distance < mouseInteractionRadius) {
            const force = (1 - distance / mouseInteractionRadius) * 2;

            // Determinar se é atraído ou repelido baseado na posição da partícula
            const repelFactor = particle.x % 2 === 0 ? -1 : 1;

            // Aplicar força de atração/repulsão
            particle.x += (dx / distance) * force * repelFactor * mouseEffect;
            particle.y += (dy / distance) * force * repelFactor * mouseEffect;
          }
        }

        // Gravidade de retorno à posição original quando o mouse está inativo
        if (!isMouseActive.current) {
          const dxOrigin = particle.originalX - particle.x;
          const dyOrigin = particle.originalY - particle.y;
          const distanceOrigin = Math.sqrt(
            dxOrigin * dxOrigin + dyOrigin * dyOrigin,
          );

          if (distanceOrigin > 0.5) {
            particle.x += dxOrigin * 0.01;
            particle.y += dyOrigin * 0.01;
          }
        }

        // Update position with regular movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Adicionar efeito de flutuação suave usando tempo relativo
        // Em vez de Date.now(), usar contador incremental para evitar problemas de hidratação
        const time = performance.now() * 0.001;
        particle.y += Math.sin(time + index) * 0.05;

        // Draw particle with dynamic size based on mouse proximity
        let size = particle.size;
        if (isMouseActive.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInteractionRadius) {
            // Aumentar tamanho quando próximo ao mouse
            const sizeFactor = 1 + (1 - distance / mouseInteractionRadius) * 2;
            size *= sizeFactor;
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        drawConnections(particle, index);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const drawConnections = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particles.current.length; i++) {
        const other = particles.current[i];
        const distance = Math.sqrt(
          Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2),
        );

        // Ajustar distância de conexão baseado no movimento do mouse
        let connectionDistance = 150;

        // Aumentar conexões próximas ao mouse
        if (isMouseActive.current) {
          const mouseDistance = Math.sqrt(
            Math.pow(mousePosition.current.x - (particle.x + other.x) / 2, 2) +
              Math.pow(mousePosition.current.y - (particle.y + other.y) / 2, 2),
          );

          if (mouseDistance < 200) {
            connectionDistance = 200;
          }
        }

        // Draw connection if particles are close enough
        if (distance < connectionDistance) {
          const opacity = 0.5 - distance / connectionDistance;
          const lineWidth = isMouseActive.current
            ? 0.5 + (1 - distance / connectionDistance) * 1
            : 0.5;

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = 'rgba(var(--color1-rgb), 0.1)';
          ctx.globalAlpha = opacity; // Fade out with distance
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }
    };

    // Only initialize particles if we haven't done so yet or we're resizing
    if (particles.current.length === 0) {
      initializeParticles();
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mouseActiveTimer.current) {
        clearTimeout(mouseActiveTimer.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{
        opacity: 0.7,
        willChange: 'transform',
      }}
    />
  );
};

// Exportar o componente com dynamic import e ssr: false
const ParticlesEffect = dynamic(() => Promise.resolve(ParticlesEffectImpl), {
  ssr: false,
});

export default ParticlesEffect;
