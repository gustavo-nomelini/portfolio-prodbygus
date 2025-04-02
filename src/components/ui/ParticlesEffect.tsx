'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    const initializeParticles = () => {
      particles.current = [];
      const particleCount = Math.min(50, window.innerWidth / 20); // Adjust count based on screen size

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

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[-1] pointer-events-none opacity-60"
    />
  );
};

export default ParticlesEffect;
