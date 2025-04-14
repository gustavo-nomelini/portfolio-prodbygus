'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ParticlesEffect from '../ui/ParticlesEffect';

interface HeroProps {
  keepBackgroundElements?: boolean;
}

const Hero = ({ keepBackgroundElements = true }: HeroProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Random glitch effect - only run on client
  useEffect(() => {
    if (!isMounted) return;

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
  }, [isMounted]);

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
    <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center pt-6 sm:pt-0 pb-16 sm:pb-8">
      {/* Background elements - only show if keepBackgroundElements is true */}
      {keepBackgroundElements && (
        <>
          {/* Background gradients - Ajustados para melhor visualização em mobile */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/15 to-[var(--color3)]/15 z-[-1]"></div>
          <div className="absolute inset-0 z-[-2]">
            <div className="absolute top-20 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-[var(--color1)]/20 rounded-full filter blur-[60px] sm:blur-[80px]"></div>
            <div className="absolute bottom-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--color3)]/20 rounded-full filter blur-[60px] sm:blur-[80px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 sm:w-72 h-52 sm:h-72 bg-[var(--color1)]/10 rounded-full filter blur-[40px] sm:blur-[60px]"></div>
          </div>

          {/* Cyberpunk Grid Lines */}
          <div className="absolute inset-0 z-[-1] cyberpunk-grid opacity-15 sm:opacity-20"></div>

          {/* Particles Effect */}
          <ParticlesEffect />
        </>
      )}

      {/* Glitch Effect Overlay - always show this */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none transition-all duration-100 ${isGlitching ? 'glitching' : ''}`}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10 pt-8 sm:pt-0">
        <div className="animate-fadeIn">
          <motion.h1
            className="text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.2] py-2 relative"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={0}
          >
            <motion.span className="block" variants={textVariants} custom={1}>
              Seja bem-vindo, prazer
            </motion.span>
            <motion.span
              className="block mt-2 mb-8 sm:mb-12"
              variants={textVariants}
              custom={2}
            >
              Me chamo
              <br />
              Gustavo Lopes Nomelini
            </motion.span>
            <motion.span
              className="block mt-4"
              variants={textVariants}
              custom={3}
            >
              <div
                className="relative inline-block group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setIsGlitching(true)}
                onMouseLeave={() =>
                  setTimeout(() => setIsGlitching(false), 300)
                }
              >
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 rounded-lg border-2 border-[var(--color1)]/50 transition-all duration-700 ease-out"></div>
                <div className="absolute inset-0 scale-0 group-hover:scale-[1.3] opacity-0 group-hover:opacity-60 rounded-lg border border-[var(--color3)]/30 transition-all duration-1000 delay-100 ease-out"></div>

                {/* Texto com melhor contraste e destaque */}
                <div className="relative z-10 py-3 sm:py-4 px-4 sm:px-6">
                  {/* Camada base com sombra para contraste */}
                  <div className="absolute inset-0 bg-[var(--background)]/95 rounded-lg backdrop-blur-md border-2 border-[var(--color1)]/50 shadow-[0_0_15px_rgba(var(--color1-rgb),0.3)]"></div>

                  {/* Marcadores de canto */}
                  <div className="absolute top-0 left-0 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-l-2 border-[var(--color1)] opacity-80"></div>
                  <div className="absolute top-0 right-0 w-2 sm:w-3 h-2 sm:h-3 border-t-2 border-r-2 border-[var(--color1)] opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-l-2 border-[var(--color3)] opacity-80"></div>
                  <div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 border-b-2 border-r-2 border-[var(--color3)] opacity-80"></div>

                  {/* Texto principal com sombra forte para legibilidade */}
                  <h2 className="relative z-20 text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
                    <span className="inline-block text-[var(--color1)] drop-shadow-[0_0_10px_var(--color1)] [text-shadow:_0_0_15px_var(--color1),_0_0_5px_var(--color1)] animate-pulse-glow">
                      Full Stack
                    </span>
                    <br />
                    <span className="inline-block text-[var(--color3)] drop-shadow-[0_0_10px_var(--color3)] [text-shadow:_0_0_15px_var(--color3),_0_0_5px_var(--color3)] animate-pulse-glow">
                      Developer
                    </span>
                  </h2>

                  {/* Efeito de destaque com linhas */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] opacity-90"></div>
                  <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-[var(--color3)] to-[var(--color1)] opacity-90"></div>

                  {/* Efeito de brilho em movimento */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg opacity-30">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color1)] to-transparent animate-shimmer"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color3)] to-transparent animate-shimmer"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color1)] to-transparent animate-shimmer"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color3)] to-transparent animate-shimmer"></div>
                  </div>
                </div>

                {/* Main glowing background */}
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[var(--color1)] via-[var(--color3)] to-[var(--color1)] opacity-75 blur-[6px] sm:blur-[10px] animate-gradient-x group-hover:blur-[10px] sm:group-hover:blur-[15px] group-hover:opacity-90 transition-all duration-300"></div>

                {/* Animated border */}
                <div className="absolute -inset-[2px] sm:-inset-[3px] rounded-lg border border-[var(--color1)] opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute -inset-[3px] sm:-inset-[5px] rounded-lg border border-[var(--color3)] opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>

                {/* Animated highlight dots */}
                <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[var(--color1)] rounded-full animate-ping group-hover:w-2 group-hover:h-2 sm:group-hover:w-3 sm:group-hover:h-3 transition-all duration-300"></div>
                <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[var(--color3)] rounded-full animate-ping delay-700 group-hover:w-2 group-hover:h-2 sm:group-hover:w-3 sm:group-hover:h-3 transition-all duration-300"></div>

                {/* Tech dots decoration - visíveis apenas em telas maiores */}
                <div className="absolute -right-4 top-0 bottom-0 w-1 hidden sm:flex flex-col justify-around">
                  <div className="w-1 h-1 rounded-full bg-[var(--color1)] animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-[var(--color3)] animate-pulse delay-300"></div>
                  <div className="w-1 h-1 rounded-full bg-[var(--color1)] animate-pulse delay-600"></div>
                </div>
                <div className="absolute -left-4 top-0 bottom-0 w-1 hidden sm:flex flex-col justify-around">
                  <div className="w-1 h-1 rounded-full bg-[var(--color3)] animate-pulse delay-150"></div>
                  <div className="w-1 h-1 rounded-full bg-[var(--color1)] animate-pulse delay-450"></div>
                  <div className="w-1 h-1 rounded-full bg-[var(--color3)] animate-pulse delay-750"></div>
                </div>

                {/* Binary code decoration - visível apenas em telas maiores */}
                <div className="absolute -top-6 right-0 text-[8px] text-[var(--color1)]/40 font-mono opacity-0 sm:opacity-70 group-hover:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  10101
                </div>
                <div className="absolute -bottom-6 left-0 text-[8px] text-[var(--color3)]/40 font-mono opacity-0 sm:opacity-70 group-hover:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  01010
                </div>

                {/* Animated highlight lines - visíveis apenas em telas maiores*/}
                <div className="absolute h-[1px] w-6 sm:w-8 -left-8 top-1/3 bg-gradient-to-r from-transparent to-[var(--color1)] animate-pulse hidden sm:block group-hover:w-8 sm:group-hover:w-12 transition-all duration-300"></div>
                <div className="absolute h-[1px] w-6 sm:w-8 -right-8 bottom-1/3 bg-gradient-to-r from-[var(--color3)] to-transparent animate-pulse delay-500 hidden sm:block group-hover:w-8 sm:group-hover:w-12 transition-all duration-300"></div>
              </div>
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-4 sm:mt-6 max-w-2xl mx-auto text-lg sm:text-xl/8 text-[var(--foreground-muted)]"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={4}
          >
            Eu crio aplicações modernas, sempre prezando por softwares de
            qualidade e com uma ótima experiência de usuário que seja
            interativa, intuitiva e responsiva.
          </motion.p>

          <div className="mt-8 sm:mt-12 flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-y-6 sm:gap-y-8 sm:gap-x-8 max-w-2xl mx-auto">
            <motion.div
              className="rounded-md w-full sm:w-auto sm:justify-self-end"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={0}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="https://blog-prodbygus.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="cyberpunk-btn relative group overflow-hidden flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-[var(--color4)] to-[var(--color1)] border-2 border-white rounded-md text-base md:text-lg font-black hover:scale-105 transition-transform duration-300 w-full sm:w-[240px]"
                aria-label="Visitar meu blog pessoal"
              >
                {/* Base glow permanente */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color4)] to-[var(--color1)] opacity-70 blur-[8px]"></div>

                {/* Glow animado permanente */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color4)] to-[var(--color1)] opacity-60 blur-[12px] animate-pulse"></div>

                {/* Borda brilhante sempre visível */}
                <div className="absolute -inset-[1px] border-2 border-white rounded-md opacity-90 shadow-[0_0_20px_var(--color4)]"></div>

                {/* Fundo animado no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color4)] via-white to-[var(--color1)] opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Extra efeito de borda brilhante para hover */}
                <div className="absolute inset-0 border-2 border-white rounded-md opacity-0 group-hover:opacity-100 blur-[3px] transition-opacity duration-300"></div>

                {/* Detalhes cyberpunk nas esquinas com destaque extremo */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-3 border-l-3 border-white rounded-tl-sm shadow-[0_0_15px_white]"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 border-white rounded-tr-sm shadow-[0_0_15px_white]"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 border-white rounded-bl-sm shadow-[0_0_15px_white]"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 border-white rounded-br-sm shadow-[0_0_15px_white]"></div>

                {/* Linhas de destaque adicionais */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-white/90"></div>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white/90"></div>

                {/* Texto com contraste máximo */}
                <span className="relative z-10 text-white font-black text-lg md:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] [text-shadow:_0_0_5px_white] uppercase tracking-wider flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="relative inline-block animate-pulse-glow">
                    Blog
                  </span>
                </span>

                {/* Efeito de brilho em movimento */}
                <div className="absolute inset-0 overflow-hidden rounded-lg opacity-40">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent animate-shimmer"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent animate-shimmer"></div>
                </div>

                {/* Animated highlight dots */}
                <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-ping group-hover:w-2 group-hover:h-2 sm:group-hover:w-3 sm:group-hover:h-3 transition-all duration-300"></div>
                <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-ping delay-700 group-hover:w-2 group-hover:h-2 sm:group-hover:w-3 sm:group-hover:h-3 transition-all duration-300"></div>
              </Link>
            </motion.div>

            <motion.div
              className="rounded-md w-full sm:w-auto sm:justify-self-start"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/projects"
                className="cyberpunk-btn relative group overflow-hidden flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-[var(--color1)] border-2 border-[var(--color1)] rounded-md text-base md:text-lg font-black hover:scale-105 transition-transform duration-300 w-full sm:w-[240px]"
                aria-label="Ver meu portfolio de projetos"
              >
                {/* Base glow permanente */}
                <div className="absolute inset-0 bg-[var(--color1)] opacity-50 blur-[5px]"></div>

                {/* Glow animado permanente */}
                <div className="absolute inset-0 bg-[var(--color1)] opacity-40 blur-[8px] animate-pulse"></div>

                {/* Borda brilhante sempre visível */}
                <div className="absolute -inset-[1px] border-2 border-white/80 rounded-md opacity-70 shadow-[0_0_15px_var(--color1)]"></div>

                {/* Fundo animado no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color1)] via-white to-[var(--color3)] opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Extra efeito de borda brilhante para hover */}
                <div className="absolute inset-0 border-2 border-white rounded-md opacity-0 group-hover:opacity-100 blur-[3px] transition-opacity duration-300"></div>

                {/* Detalhes cyberpunk nas esquinas com destaque extremo */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-3 border-l-3 border-white rounded-tl-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 border-white rounded-tr-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 border-white rounded-bl-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 border-white rounded-br-sm shadow-[0_0_10px_white]"></div>

                {/* Linhas de destaque adicionais */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-white/80"></div>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white/80"></div>

                {/* Texto com contraste máximo */}
                <span className="relative z-10 text-[var(--background)] font-black text-lg md:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] [text-shadow:_0_0_5px_white] uppercase tracking-wider flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span className="relative inline-block animate-pulse-glow">
                    Projetos
                  </span>
                </span>
              </Link>
            </motion.div>

            <motion.div
              className="rounded-md w-full sm:w-auto sm:justify-self-end"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={2}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/about"
                className="cyberpunk-btn relative group overflow-hidden flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-[var(--color3)] border-2 border-[var(--color3)] rounded-md text-base md:text-lg font-black hover:scale-105 transition-transform duration-300 w-full sm:w-[240px]"
                aria-label="Conhecer mais sobre mim"
              >
                {/* Base glow permanente */}
                <div className="absolute inset-0 bg-[var(--color3)] opacity-50 blur-[5px]"></div>

                {/* Glow animado permanente */}
                <div className="absolute inset-0 bg-[var(--color3)] opacity-40 blur-[8px] animate-pulse"></div>

                {/* Borda brilhante sempre visível */}
                <div className="absolute -inset-[1px] border-2 border-white/80 rounded-md opacity-70 shadow-[0_0_15px_var(--color3)]"></div>

                {/* Fundo animado no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color3)] via-white to-[var(--color1)] opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Extra efeito de borda brilhante para hover */}
                <div className="absolute inset-0 border-2 border-white rounded-md opacity-0 group-hover:opacity-100 blur-[3px] transition-opacity duration-300"></div>

                {/* Detalhes cyberpunk nas esquinas com destaque extremo */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-3 border-l-3 border-white rounded-tl-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 border-white rounded-tr-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 border-white rounded-bl-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 border-white rounded-br-sm shadow-[0_0_10px_white]"></div>

                {/* Linhas de destaque adicionais */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-white/80"></div>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white/80"></div>

                {/* Texto com contraste máximo */}
                <span className="relative z-10 text-[var(--background)] font-black text-lg md:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] [text-shadow:_0_0_5px_white] uppercase tracking-wider flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="relative inline-block animate-pulse-glow">
                    Sobre Mim
                  </span>
                </span>
              </Link>
            </motion.div>

            <motion.div
              className="rounded-md w-full sm:w-auto sm:justify-self-start"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={3}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="cyberpunk-btn relative group overflow-hidden flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-[var(--color2)] border-2 border-[var(--color2)] rounded-md text-base md:text-lg font-black hover:scale-105 transition-transform duration-300 w-full sm:w-[240px]"
                aria-label="Entrar em contato comigo"
              >
                {/* Base glow permanente */}
                <div className="absolute inset-0 bg-[var(--color2)] opacity-50 blur-[5px]"></div>

                {/* Glow animado permanente */}
                <div className="absolute inset-0 bg-[var(--color2)] opacity-40 blur-[8px] animate-pulse"></div>

                {/* Borda brilhante sempre visível */}
                <div className="absolute -inset-[1px] border-2 border-white/80 rounded-md opacity-70 shadow-[0_0_15px_var(--color2)]"></div>

                {/* Fundo animado no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color2)] via-white to-[var(--color1)] opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Extra efeito de borda brilhante para hover */}
                <div className="absolute inset-0 border-2 border-white rounded-md opacity-0 group-hover:opacity-100 blur-[3px] transition-opacity duration-300"></div>

                {/* Detalhes cyberpunk nas esquinas com destaque extremo */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-3 border-l-3 border-white rounded-tl-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 border-white rounded-tr-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 border-white rounded-bl-sm shadow-[0_0_10px_white]"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 border-white rounded-br-sm shadow-[0_0_10px_white]"></div>

                {/* Linhas de destaque adicionais */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-white/80"></div>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white/80"></div>

                {/* Texto com contraste máximo */}
                <span className="relative z-10 text-[var(--background)] font-black text-lg md:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] [text-shadow:_0_0_5px_white] uppercase tracking-wider flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="relative inline-block animate-pulse-glow">
                    Contato
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-2 group-hover:translate-x-2 transition-transform duration-300 animate-pulse"
                >
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
