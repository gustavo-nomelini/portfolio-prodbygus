'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
};

const ParticlesEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

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

    const initializeParticles = () => {
      particles.current = [];
      // Increase particle count for better effect
      const particleCount = Math.min(80, window.innerWidth / 15);

      const colors = [
        'rgba(var(--color1-rgb), 0.7)',
        'rgba(var(--color3-rgb), 0.7)',
        'rgba(255, 255, 255, 0.7)',
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
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

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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

        // Draw connection if particles are close enough
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = 'rgba(var(--color1-rgb), 0.1)';
          ctx.globalAlpha = 0.5 - distance / 150; // Fade out with distance
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    // Only initialize particles if we haven't done so yet or we're resizing
    if (particles.current.length === 0) {
      initializeParticles();
    }

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMounted]);

  if (!isMounted) return null;

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

export default ParticlesEffect;
