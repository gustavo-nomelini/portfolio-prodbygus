"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const About = () => {
  // Estado para controlar a habilidade em foco
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  
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
    ['JavaScript', 'TypeScript'],      // 2ª linha
    ['React', 'Next.js'],              // 3ª linha
  ];
  
  // Back-end habilidades agrupadas por linha
  const backendSkills = [
    ['Node.js', 'Express'],         // 1ª linha
    ['PostgreSQL', 'MongoDB'],      // 2ª linha
    ['REST API', 'GraphQL'],        // 3ª linha
  ];

  // Função para renderizar badges de habilidades
  const renderSkillBadge = (skill: string) => (
    <span 
      key={skill} 
      className={`px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer 
        ${
          focusedSkill === skill 
            ? 'border-[var(--color1)] bg-[var(--color1)]/10 text-[var(--color1)] scale-110 shadow-md' 
            : (focusedSkill && focusedSkill !== skill)
              ? 'border-[var(--color2)] bg-[var(--color4)]/25 text-[var(--foreground-muted)] scale-95'
              : 'border-[var(--color4)] bg-[var(--color4)] text-[var(--foreground)] hover:bg-[var(--color4)]/80 hover:border-[var(--color1)]'
        }
        relative overflow-hidden`}
      onMouseEnter={() => highlightSkill(skill)}
      onMouseLeave={removeHighlight}
    >
      {/* Efeito de brilho */}
      {focusedSkill === skill && (
        <span className="absolute inset-0 w-full h-full bg-[var(--color1)]/5 animate-pulse"></span>
      )}
      <span className="relative z-10 text-sm font-medium">{skill}</span>
    </span>
  );

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Sobre Mim
          </h2>
          <div className="mt-2 w-24 h-1 bg-[var(--color1)] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Informações pessoais com foto */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Foto de perfil */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--color1)] shadow-lg mb-4 group">
              <Image
                src="/profile.jpg"
                alt="Gustavo Lopes Nomelini"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              {/* Efeito de brilho na borda ao passar o mouse */}
              <div className="absolute inset-0 border-4 border-transparent rounded-full group-hover:border-[var(--color3)] transition-colors duration-300"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-[var(--foreground)]">
              <h3 className="text-2xl font-semibold text-[var(--color1)] mb-4">Quem sou eu</h3>
              <p>
                Olá! Me chamo Gustavo Lopes Nomelini, sou um desenvolvedor web e designer apaixonado
                por criar soluções digitais bonitas e funcionais.
              </p>
              <p>
                Com experiência em desenvolvimento front-end e back-end, tenho trabalhado com
                tecnologias modernas para construir aplicações web responsivas e de alto desempenho.
              </p>
              <p>
                Meu objetivo é unir design e funcionalidade para criar experiências digitais memoráveis
                que ajudem pessoas e empresas a alcançarem seus objetivos online.
              </p>
            </div>
          </div>
          
          {/* Habilidades - ordem: Design, Front-end, Back-end */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--color1)] mb-6">Minhas Habilidades</h3>
            
            <div className="space-y-6">
              {/* Design - mantido como está */}
              <div>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-xs text-[var(--background)] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Design
                </h4>
                <div className="flex flex-wrap gap-2">
                  {designSkills.map(renderSkillBadge)}
                </div>
              </div>
              
              {/* Front-end - agora com linhas separadas */}
              <div>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-xs text-[var(--background)] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-4.72-3.22a.75.75 0 01.74-1.3l3.98 2.7V7.5h-1.5zm0 5.69V18h-1.5v-4.81l-4.72-3.22a.75.75 0 110-1.3L11.25 13.18zm.75 5.69V18h1.5v-4.81l4.72-3.22a.75.75 0 000-1.3L13.5 13.18v5.69zm1.5-5.69V7.5h1.5v5.69l4.72-3.22a.75.75 0 011.3.74l-6.02 4.1v5.69h-1.5V13.18z"></path>
                    </svg>
                  </span>
                  Front-end
                </h4>
                <div className="space-y-2">
                  {frontendSkills.map((lineSkills, index) => (
                    <div key={`front-line-${index}`} className="flex flex-wrap gap-2">
                      {lineSkills.map(renderSkillBadge)}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Back-end - agora com linhas separadas */}
              <div>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] flex items-center justify-center text-xs text-[var(--background)] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M5.507 4.048A3 3 0 017.785 3h8.43a3 3 0 012.278 1.048l1.722 2.008A4.533 4.533 0 0019.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008z" />
                      <path fillRule="evenodd" d="M1.5 10.5a3 3 0 013-3h15a3 3 0 110 6h-15a3 3 0 01-3-3zm15 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm2.25.75a.75.75 0 100-1.5.75.75 0 000 1.5zM4.5 15a3 3 0 100 6h15a3 3 0 100-6h-15zm11.25 3.75a.75.75 0 100-1.5.75.75 0 000 1.5zM19.5 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Back-end
                </h4>
                <div className="space-y-2">
                  {backendSkills.map((lineSkills, index) => (
                    <div key={`back-line-${index}`} className="flex flex-wrap gap-2">
                      {lineSkills.map(renderSkillBadge)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Experiência e educação */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-[var(--color1)] mb-8 text-center">Experiência e Educação</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Experiência */}
            <div>
              <h4 className="text-xl font-medium text-[var(--foreground)] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[var(--color1)] flex items-center justify-center text-[var(--background)] mr-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </span>
                Experiência Profissional
              </h4>
              
              {/* Lista de experiências */}
              <div className="space-y-8 ml-11">
                <div>
                  <h5 className="text-lg font-medium text-[var(--foreground)]">Desenvolvedor Web Full-stack</h5>
                  <p className="text-[var(--color1)]">Empresa XYZ • 2022-Presente</p>
                  <p className="text-[var(--foreground-muted)] mt-2">
                    Desenvolvimento de aplicações web utilizando React, Next.js e Node.js.
                    Implementação de designs responsivos e otimização de performance.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-lg font-medium text-[var(--foreground)]">Desenvolvedor Front-end</h5>
                  <p className="text-[var(--color1)]">Empresa ABC • 2020-2022</p>
                  <p className="text-[var(--foreground-muted)] mt-2">
                    Construção de interfaces de usuário responsivas e interativas
                    utilizando HTML, CSS e JavaScript.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Educação */}
            <div>
              <h4 className="text-xl font-medium text-[var(--foreground)] mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[var(--color1)] flex items-center justify-center text-[var(--background)] mr-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </span>
                Educação
              </h4>
              
              {/* Lista de formação */}
              <div className="space-y-8 ml-11">
                <div>
                  <h5 className="text-lg font-medium text-[var(--foreground)]">Bacharelado em Ciência da Computação</h5>
                  <p className="text-[var(--color1)]">Universidade XYZ • 2016-2020</p>
                  <p className="text-[var(--foreground-muted)] mt-2">
                    Foco em desenvolvimento de software e sistemas computacionais.
                    TCC sobre otimização de interfaces web para dispositivos móveis.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-lg font-medium text-[var(--foreground)]">Especialização em UX/UI Design</h5>
                  <p className="text-[var(--color1)]">Instituto ABC • 2021</p>
                  <p className="text-[var(--foreground-muted)] mt-2">
                    Formação complementar em design de interfaces e experiência do usuário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;