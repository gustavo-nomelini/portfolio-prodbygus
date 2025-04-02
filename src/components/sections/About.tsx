'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const About = () => {
  // Estado para controlar a habilidade em foco
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  // Estado para controlar o hover do botão de download
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

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
            ? 'border-[var(--color1)] bg-[var(--color1)]/10 text-[var(--color1)] scale-110 shadow-md'
            : focusedSkill && focusedSkill !== skill
              ? 'border-[var(--color2)] bg-[var(--color4)]/25 text-[var(--foreground-muted)] scale-95'
              : 'border-[var(--color4)] bg-[var(--color4)]/60 backdrop-blur-sm text-[var(--foreground)] hover:bg-[var(--color4)]/80 hover:border-[var(--color1)]'
        }
        relative overflow-hidden`}
      onMouseEnter={() => highlightSkill(skill)}
      onMouseLeave={removeHighlight}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 8px rgba(var(--color1-rgb), 0.5)',
      }}
      variants={itemVariants}
    >
      {/* Efeito de brilho */}
      {focusedSkill === skill && (
        <span className="absolute inset-0 w-full h-full bg-[var(--color1)]/5 animate-pulse"></span>
      )}
      <span className="relative z-10 text-sm font-medium">{skill}</span>
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

              {/* Botão de Download do CV */}
              <motion.div
                className="mt-8 flex justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href="/CV_Gustavo_Lopes_Nomelini.pdf"
                  download
                  className="relative group overflow-hidden cyberpunk-btn"
                  onMouseEnter={() => setIsDownloadHovered(true)}
                  onMouseLeave={() => setIsDownloadHovered(false)}
                >
                  <div
                    className={`
                    flex items-center gap-3 px-6 py-3 rounded-lg
                    bg-gradient-to-r from-[var(--color1)] to-[var(--color3)]
                    text-[var(--background)] font-medium
                    transform transition-all duration-300
                    ${isDownloadHovered ? 'scale-105 shadow-lg' : 'shadow-md'}
                  `}
                  >
                    {/* Ícone de Download */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 transition-transform duration-500 ${isDownloadHovered ? 'animate-bounce' : ''}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="relative z-10">Download CV</span>
                  </div>

                  {/* Efeito de brilho */}
                  <div
                    className={`
                    absolute inset-0 -translate-x-full
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transform transition-transform duration-1000
                    ${isDownloadHovered ? 'translate-x-full' : '-translate-x-full'}
                  `}
                  ></div>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Habilidades - ordem: Design, Front-end, Back-end */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-effect p-6 rounded-xl"
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
              {/* Design */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center">
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
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                >
                  {designSkills.map(renderSkillBadge)}
                </motion.div>
              </motion.div>

              {/* Front-end - agora com linhas separadas */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center">
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
                <motion.div className="space-y-2" variants={containerVariants}>
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
              </motion.div>

              {/* Back-end - agora com linhas separadas */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center">
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
                <motion.div className="space-y-2" variants={containerVariants}>
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 border border-[var(--color1)]/20 rounded-full"></div>
        <div className="hidden md:block absolute -top-10 -right-10 w-20 h-20 border border-[var(--color3)]/20 rounded-full"></div>
      </div>
    </section>
  );
};

export default About;
