"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const About = () => {
  // Conteúdo da página Sobre Mim
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
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--color1)] shadow-lg mb-4">
              <Image
                src="/profile.jpg"
                alt="Gustavo Lopes Nomelini"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover"
                priority
              />
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
          
          {/* Habilidades */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--color1)] mb-6">Minhas Habilidades</h3>
            
            <div className="space-y-4">
              {/* Front-end */}
              <div>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-2">Front-end</h4>
                <div className="flex flex-wrap gap-2">
                  {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'].map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 rounded-full bg-[var(--color4)] text-[var(--foreground)] text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Back-end */}
              <div>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-2">Back-end</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL'].map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 rounded-full bg-[var(--color4)] text-[var(--foreground)] text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Design */}
              <div>
                <h4 className="text-lg font-medium text-[var(--foreground)] mb-2">Design</h4>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'UI/UX'].map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 rounded-full bg-[var(--color4)] text-[var(--foreground)] text-sm"
                    >
                      {skill}
                    </span>
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