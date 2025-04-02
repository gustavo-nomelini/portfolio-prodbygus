'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ParticlesEffect from '../ui/ParticlesEffect';

const Hero = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const triggerGlitch = () => {
      const shouldGlitch = Math.random() > 0.95;
      if (shouldGlitch) {
        setIsGlitching(true);
        setTimeout(
          () => {
            setIsGlitching(false);
          },
          100 + Math.random() * 100,
        );
      }
      setTimeout(triggerGlitch, 500 + Math.random() * 2000);
    };

    triggerGlitch();

    return () => {
      // Cleanup
    };
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0 0 10px rgba(var(--color1-rgb), 0.5)',
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/10 to-[var(--color3)]/10 z-[-1]"></div>
      <div className="absolute inset-0 z-[-2]">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[var(--color1)]/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color3)]/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color1)]/10 rounded-full filter blur-[60px]"></div>
      </div>

      {/* Cyberpunk Grid Lines */}
      <div className="absolute inset-0 z-[-1] cyberpunk-grid opacity-20"></div>

      {/* Particles Effect */}
      <ParticlesEffect />

      {/* Glitch Effect Overlay */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none transition-all duration-100 ${isGlitching ? 'glitching' : ''}`}
      ></div>

      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center z-10">
        <div className="animate-fadeIn">
          <motion.h1
            className="text-gradient text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.2] py-2 relative"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={0}
          >
            <motion.span className="block" variants={textVariants} custom={1}>
              Seja bem-vindo, prazer
            </motion.span>
            <motion.span
              className="block mt-2"
              variants={textVariants}
              custom={2}
            >
              Me chamo<br/>Gustavo Lopes Nomelini
            </motion.span>
            <motion.span
              className="block mt-4"
              variants={textVariants}
              custom={3}
            >
              Full Stack
              <br />
              Developer
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl mx-auto text-xl/8 text-[var(--foreground-muted)]"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={4}
          >
            Eu crio aplicações modernas, sempre prezando por softwares de
            qualidade e com uma ótima experiência de usuário que seja
            interativa, intuitiva e responsiva.
          </motion.p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <motion.div
              className="rounded-md shadow"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={0}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/projects"
                className="cyberpunk-btn w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-[var(--background)] bg-[var(--color1)] hover:bg-[var(--color1)]/90 transition-colors md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color1)]"
                aria-label="Ver meu portfolio de projetos"
              >
                Veja meu trabalho
              </Link>
            </motion.div>

            <motion.div
              className="rounded-md shadow"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="cyberpunk-btn w-full flex items-center justify-center px-8 py-4 border border-[var(--color1)] text-base font-medium rounded-md text-[var(--color1)] bg-[var(--background)] hover:bg-[var(--color4)] transition-colors md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color1)]"
                aria-label="Entrar em contato comigo"
              >
                Entre em contato
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
