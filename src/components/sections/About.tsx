'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const About = () => {
  // Estado para controlar a habilidade em foco
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  // Estado para controlar o hover do botão de download
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
  // Estado para controlar o hover do botão de contato
  const [isContactHovered, setIsContactHovered] = useState(false);

  // Função para destacar uma habilidade
  const highlightSkill = (skill: string) => {
    setFocusedSkill(skill);
  };

  // Função para remover destaque
  const removeHighlight = () => {
    setFocusedSkill(null);
  };

  // Arrays de habilidades por categoria e linha
  const designSkills = ['Figma', 'UX/UI', 'Design Responsivo'];

  // Front-end habilidades agrupadas por linha
  const frontendSkills = [
    ['HTML5', 'CSS3', 'Tailwind CSS'], // 1ª linha
    ['JavaScript', 'TypeScript'], // 2ª linha
    ['React', 'Next.js'], // 3ª linha
  ];

  // Back-end habilidades agrupadas por linha
  const backendSkills = [
    ['Golang'],
    ['Node.js', 'Express'],
    ['PostgreSQL', 'MongoDB'],
    ['REST API', 'GraphQL'],
  ];

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  // Função para renderizar badges de habilidades
  const renderSkillBadge = (skill: string) => (
    <motion.span
      key={skill}
      className={`px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer 
        ${
          focusedSkill === skill
            ? 'border-[var(--color1)] bg-[var(--color1)]/5 text-[var(--color1)] shadow-[0_0_15px_rgba(var(--color1-rgb),0.3)]'
            : focusedSkill && focusedSkill !== skill
              ? 'border-[var(--color2)] bg-[var(--color4)]/20 text-[var(--foreground-muted)]'
              : 'border-[var(--color4)] bg-[var(--color4)]/40 backdrop-blur-sm text-[var(--foreground)] hover:bg-[var(--color4)]/60 hover:border-[var(--color1)] hover:shadow-[0_0_10px_rgba(var(--color1-rgb),0.2)]'
        }
        relative overflow-hidden group/badge`}
      onMouseEnter={() => highlightSkill(skill)}
      onMouseLeave={removeHighlight}
      whileHover={{
        boxShadow: '0 0 8px rgba(var(--color1-rgb), 0.3)',
      }}
      variants={itemVariants}
    >
      {/* Efeito de brilho */}
      {focusedSkill === skill && (
        <span className="absolute inset-0 w-full h-full bg-[var(--color1)]/5 animate-pulse"></span>
      )}
      {/* Efeito de scan no badge */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)]/5 to-transparent animate-scan"></div>
      </div>
      <span className="relative z-10 text-sm font-medium">{skill}</span>
      {/* Cantos cyberpunk */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color1)]/30 rounded-tl-full group-hover/badge:border-[var(--color1)]"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color1)]/30 rounded-tr-full group-hover/badge:border-[var(--color1)]"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color1)]/30 rounded-bl-full group-hover/badge:border-[var(--color1)]"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color1)]/30 rounded-br-full group-hover/badge:border-[var(--color1)]"></div>
    </motion.span>
  );

  return (
    <section className="relative py-16 min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/5 to-[var(--color3)]/5"></div>
      <div className="absolute inset-0 cyberpunk-grid opacity-10"></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color1)]/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--color3)]/10 rounded-full filter blur-[80px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient text-3xl font-bold sm:text-4xl lg:text-5xl mb-3">
            Sobre Mim
          </h2>
          <div className="glass-effect h-1 w-24 mx-auto mb-6 opacity-60"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Informações pessoais com foto */}
          <motion.div
            className="flex flex-col items-center md:items-start space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Foto de perfil */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--color1)] shadow-lg mb-4 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color1)]/10 to-[var(--color3)]/10 z-[-1] animate-pulse"></div>
              <Image
                src="/profile.jpg"
                alt="Gustavo Lopes Nomelini"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              {/* Cyberpunk corners */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--color1)]/60 rounded-tl-full"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[var(--color1)]/60 rounded-tr-full"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[var(--color1)]/60 rounded-bl-full"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--color1)]/60 rounded-br-full"></div>

              {/* Efeito de brilho na borda ao passar o mouse */}
              <div className="absolute inset-0 border-4 border-transparent rounded-full group-hover:border-[var(--color3)] transition-colors duration-300"></div>
            </div>

            <div className="prose prose-lg max-w-none text-[var(--foreground)]">
              <motion.h3
                className="text-2xl font-semibold text-gradient mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Quem sou eu
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Olá! Me chamo Gustavo Lopes Nomelini, sou um Desenvolvedor Full
                Stack e designer apaixonado por criar soluções digitais bonitas
                e funcionais.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Com experiência em desenvolvimento front-end e back-end, tenho
                trabalhado com tecnologias modernas para construir aplicações
                web responsivas e de alto desempenho.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Meu objetivo é unir design e funcionalidade para criar
                experiências digitais memoráveis que ajudem pessoas e empresas a
                alcançarem seus objetivos online.
              </motion.p>

              {/* Botões - Download CV e Contato */}
              <motion.div
                className="mt-8 flex flex-col md:flex-row justify-center md:justify-start gap-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {/* Botão de Download CV - Versão Cyberpunk */}
                <a
                  href="/CV_Gustavo_Lopes_Nomelini.pdf"
                  download
                  className="relative group overflow-hidden w-full"
                  onMouseEnter={() => setIsDownloadHovered(true)}
                  onMouseLeave={() => setIsDownloadHovered(false)}
                >
                  <div
                    className={`
                    relative z-10 flex items-center justify-center gap-3 px-4 py-3 
                    rounded-md border-2 border-[var(--color1)] 
                    bg-[var(--background)] 
                    text-[var(--color1)] font-medium w-full
                    transform transition-all duration-300
                    ${isDownloadHovered ? 'scale-105 shadow-[0_0_15px_rgba(var(--color1-rgb),0.6)]' : 'shadow-md'}
                    before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full
                    before:bg-gradient-to-r before:from-[var(--color1)] before:to-[var(--color3)]
                    before:opacity-0 before:transition-opacity before:duration-300
                    hover:before:opacity-100 hover:text-[var(--background)]
                    overflow-hidden
                  `}
                  >
                    {/* Cantos cyberpunk */}
                    <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color1)]"></span>
                    <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color1)]"></span>
                    <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color1)]"></span>
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color1)]"></span>

                    {/* Ícone de Download */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 relative z-10 transition-transform duration-500 ${isDownloadHovered ? 'animate-bounce' : ''}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="relative z-10">Download CV</span>

                    {/* Efeito de glitch digital */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/3 left-0 h-0.5 w-full bg-[var(--color1)] animate-pulse"></div>
                      <div className="absolute top-2/3 left-0 h-0.5 w-full bg-[var(--color1)] animate-pulse delay-75"></div>
                    </div>

                    {/* Efeito de scan */}
                    <div
                      className={`
                      absolute inset-0 -translate-x-full
                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                      transform transition-transform duration-1000
                      ${isDownloadHovered ? 'translate-x-full' : '-translate-x-full'}
                    `}
                    ></div>
                  </div>
                </a>

                {/* Botão de Contato */}
                <Link
                  href="/contact"
                  className="relative group overflow-hidden w-full"
                  onMouseEnter={() => setIsContactHovered(true)}
                  onMouseLeave={() => setIsContactHovered(false)}
                >
                  <div
                    className={`
                    relative z-10 flex items-center justify-center gap-3 px-4 py-3 
                    rounded-md border-2 border-[var(--color3)] 
                    bg-[var(--background)] 
                    text-[var(--color3)] font-medium w-full
                    transform transition-all duration-300
                    ${isContactHovered ? 'scale-105 shadow-[0_0_15px_rgba(var(--color3-rgb),0.6)]' : 'shadow-md'}
                    before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full
                    before:bg-gradient-to-r before:from-[var(--color3)] before:to-[var(--color1)]
                    before:opacity-0 before:transition-opacity before:duration-300
                    hover:before:opacity-100 hover:text-[var(--background)]
                    overflow-hidden
                  `}
                  >
                    {/* Cantos cyberpunk */}
                    <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color3)]"></span>
                    <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color3)]"></span>
                    <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color3)]"></span>
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color3)]"></span>

                    {/* Ícone de Email */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 relative z-10 transition-transform duration-500 ${isContactHovered ? 'rotate-12' : ''}`}
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <span className="relative z-10">Contato</span>

                    {/* Efeito de glitch digital */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/3 left-0 h-0.5 w-full bg-[var(--color3)] animate-pulse"></div>
                      <div className="absolute top-2/3 left-0 h-0.5 w-full bg-[var(--color3)] animate-pulse delay-150"></div>
                    </div>

                    {/* Efeito de scan */}
                    <div
                      className={`
                      absolute inset-0 -translate-x-full
                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                      transform transition-transform duration-1000
                      ${isContactHovered ? 'translate-x-full' : '-translate-x-full'}
                    `}
                    ></div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Habilidades - ordem: Design, Front-end, Back-end */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gradient mb-6">
              Minhas Habilidades
            </h3>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Design Card */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="glass-effect p-6 rounded-xl border border-[var(--color1)]/20 hover:border-[var(--color1)]/40 transition-all duration-300 relative overflow-hidden">
                  {/* Scanner effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)]/20 to-transparent animate-scan"></div>
                  </div>

                  {/* Crosshairs */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)]/40 rounded-tl-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)]/40 rounded-tr-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)]/40 rounded-bl-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)]/40 rounded-br-full group-hover:border-[var(--color1)]"></div>

                  {/* Glowing edges */}
                  <div className="absolute inset-0 rounded-xl border border-[var(--color1)]/10 group-hover:border-[var(--color1)]/30 transition-all duration-300"></div>
                  <div className="absolute inset-0 rounded-xl border border-[var(--color1)]/5 group-hover:border-[var(--color1)]/20 transition-all duration-300 scale-[1.02]"></div>

                  <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center relative z-10">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-xs text-[var(--background)] mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Design
                  </h4>
                  <motion.div
                    className="flex flex-wrap gap-2 relative z-10"
                    variants={containerVariants}
                  >
                    {designSkills.map(renderSkillBadge)}
                  </motion.div>
                </div>
              </motion.div>

              {/* Front-end Card */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="glass-effect p-6 rounded-xl border border-[var(--color1)]/20 hover:border-[var(--color1)]/40 transition-all duration-300 relative overflow-hidden">
                  {/* Scanner effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)]/20 to-transparent animate-scan"></div>
                  </div>

                  {/* Crosshairs */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)]/40 rounded-tl-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)]/40 rounded-tr-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)]/40 rounded-bl-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)]/40 rounded-br-full group-hover:border-[var(--color1)]"></div>

                  {/* Glowing edges */}
                  <div className="absolute inset-0 rounded-xl border border-[var(--color1)]/10 group-hover:border-[var(--color1)]/30 transition-all duration-300"></div>
                  <div className="absolute inset-0 rounded-xl border border-[var(--color1)]/5 group-hover:border-[var(--color1)]/20 transition-all duration-300 scale-[1.02]"></div>

                  <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center relative z-10">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-xs text-[var(--background)] mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-4.72-3.22a.75.75 0 01.74-1.3l3.98 2.7V7.5h-1.5zm0 5.69V18h-1.5v-4.81l-4.72-3.22a.75.75 0 110-1.3L11.25 13.18zm.75 5.69V18h1.5v-4.81l4.72-3.22a.75.75 0 000-1.3L13.5 13.18v5.69zm1.5-5.69V7.5h1.5v5.69l4.72-3.22a.75.75 0 011.3.74l-6.02 4.1v5.69h-1.5V13.18z"></path>
                      </svg>
                    </span>
                    Front-end
                  </h4>
                  <motion.div
                    className="space-y-2 relative z-10"
                    variants={containerVariants}
                  >
                    {frontendSkills.map((lineSkills, index) => (
                      <motion.div
                        key={`front-line-${index}`}
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                      >
                        {lineSkills.map(renderSkillBadge)}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Back-end Card */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="glass-effect p-6 rounded-xl border border-[var(--color1)]/20 hover:border-[var(--color1)]/40 transition-all duration-300 relative overflow-hidden">
                  {/* Scanner effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)]/20 to-transparent animate-scan"></div>
                  </div>

                  {/* Crosshairs */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)]/40 rounded-tl-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)]/40 rounded-tr-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)]/40 rounded-bl-full group-hover:border-[var(--color1)]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)]/40 rounded-br-full group-hover:border-[var(--color1)]"></div>

                  {/* Glowing edges */}
                  <div className="absolute inset-0 rounded-xl border border-[var(--color1)]/10 group-hover:border-[var(--color1)]/30 transition-all duration-300"></div>
                  <div className="absolute inset-0 rounded-xl border border-[var(--color1)]/5 group-hover:border-[var(--color1)]/20 transition-all duration-300 scale-[1.02]"></div>

                  <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center relative z-10">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-xs text-[var(--background)] mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z" />
                        <path
                          fillRule="evenodd"
                          d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Back-end
                  </h4>
                  <motion.div
                    className="space-y-2 relative z-10"
                    variants={containerVariants}
                  >
                    {backendSkills.map((lineSkills, index) => (
                      <motion.div
                        key={`back-line-${index}`}
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                      >
                        {lineSkills.map(renderSkillBadge)}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience and Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20"
        >
          <motion.h3
            className="text-2xl font-semibold text-gradient mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Experiência e Educação
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="glass-effect p-6 rounded-xl border border-[var(--color1)]/20 hover:border-[var(--color1)]/40 transition-all duration-300 relative overflow-hidden">
                {/* Scanner effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)]/20 to-transparent animate-scan"></div>
                </div>

                {/* Crosshairs */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)]/40 rounded-tl-full group-hover:border-[var(--color1)]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)]/40 rounded-tr-full group-hover:border-[var(--color1)]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)]/40 rounded-bl-full group-hover:border-[var(--color1)]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)]/40 rounded-br-full group-hover:border-[var(--color1)]"></div>

                <h4 className="text-xl font-medium text-[var(--foreground)] mb-4 flex items-center relative z-10">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-[var(--background)] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                      <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                    </svg>
                  </span>
                  Experiência Profissional
                </h4>

                <div className="space-y-8 ml-11 relative z-10">
                  <div>
                    <h5 className="text-lg font-medium text-[var(--foreground)]">
                      Influenciador de conteúdo
                      <br /> sobre Tecnologia e Programação
                    </h5>
                    <p className="text-gradient">
                      &lt;PROD/BYGUS&gt; • 03/2025 - Presente
                    </p>
                    <p className="text-[var(--foreground-muted)] mt-2">
                      Criador de conteúdo sobre Tecnologia e Programação,
                      divulgando dicas, tutoriais e novas tecnologias.
                      <br />
                      Meus meios de comunicação são: meu Blog, meu Instagram e
                      meu LinkedIn.
                      <br />
                      Também tenho um canal no YouTube onde posto vídeos sobre
                      Tecnologia e Programação.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-medium text-[var(--foreground)]">
                      Suporte Técnico Pleno (N2)
                    </h5>
                    <p className="text-gradient">
                      Empresa Stein Telecom • 09/2024 - 04/2025
                    </p>
                    <p className="text-[var(--foreground-muted)] mt-2">
                      Era responsável por resolver problemas de Tecnologia da
                      Informação e Infraestrutura. Também realizava diagnósticos
                      aprofundados, configurava sistemas, dova suporte a redes,
                      hardwares e softwares, e colaborei com a equipe de
                      infraestrutura em atualizações e melhorias.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-medium text-[var(--foreground)]">
                      Gerente Administrativo
                    </h5>
                    <p className="text-gradient">
                      Empresa Lopes & Nomelini • 03/2020 - 09/2024
                    </p>
                    <p className="text-[var(--foreground-muted)] mt-2">
                      Fui responsável por planejar, coordenar e supervisionar as
                      atividades administrativas da organização.
                      <br />
                      Tinha como função garantir a eficiência dos processos
                      internos, como gestão de recursos, contratos e serviços
                      gerais. Também atuei no controle orçamentário e apoio às
                      decisões estratégicas.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="glass-effect p-6 rounded-xl border border-[var(--color1)]/20 hover:border-[var(--color1)]/40 transition-all duration-300 relative overflow-hidden">
                {/* Scanner effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)]/20 to-transparent animate-scan"></div>
                </div>

                {/* Crosshairs */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)]/40 rounded-tl-full group-hover:border-[var(--color1)]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)]/40 rounded-tr-full group-hover:border-[var(--color1)]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)]/40 rounded-bl-full group-hover:border-[var(--color1)]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)]/40 rounded-br-full group-hover:border-[var(--color1)]"></div>

                <h4 className="text-xl font-medium text-[var(--foreground)] mb-4 flex items-center relative z-10">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-[var(--background)] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                      <path
                        fillRule="evenodd"
                        d="M13.06 2.307a.75.75 0 00-.892 0l-2.88 2.88a.75.75 0 00-.218.55v3.81a.75.75 0 00.218.55l2.88 2.88a.75.75 0 00.892 0l2.88-2.88a.75.75 0 00.218-.55v-3.81a.75.75 0 00-.218-.55l-2.88-2.88zM7.5 8.25a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Educação
                </h4>

                <div className="space-y-8 ml-11 relative z-10">
                  <div>
                    <h5 className="text-lg font-medium text-[var(--foreground)]">
                      Bacharelado em Engenharia de Software
                    </h5>
                    <p className="text-gradient">
                      Universidade UNINTER • 01/2023 - 12/2026
                    </p>
                    <p className="text-[var(--foreground-muted)] mt-2">
                      Graduação EAD.
                    </p>
                  </div>

                  <div className="mt-12">
                    <h5 className="text-lg font-medium text-[var(--foreground)]">
                      Tecnólogo em Análise e Desenvolvimento de Sistemas
                    </h5>
                    <p className="text-gradient">
                      UNIVEL • 01/2024 - 12/2026
                    </p>
                    <p className="text-[var(--foreground-muted)] mt-2">
                      Graduação presencial no período noturno.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-medium text-[var(--foreground)]">
                      Pós-Graduação Lato-sensu
                      <br />
                      GO Expert
                    </h5>
                    <p className="text-gradient">
                      Faculdade Full Cycle • 01/2025 - 07/2025
                    </p>
                    <p className="text-[var(--foreground-muted)] mt-2">
                      Especialização em desenvolvimento Backend com foco na
                      linguagem de programação Golang.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 border border-[var(--color1)]/20 rounded-full"></div>
        <div className="hidden md:block absolute -top-10 -right-10 w-20 h-20 border border-[var(--color3)]/20 rounded-full"></div>
      </div>
    </section>
  );
};

export default About;
