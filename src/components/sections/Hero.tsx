"use client";

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Tornar o título visível imediatamente para evitar problemas
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 
            ref={titleRef}
            className={`text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="block">Seja bem-vindo, prazer me chamo Gustavo Lopes Nomelini</span>
            <span className="block text-[var(--color1)] mt-4">Full Stack<br/>Web Developer</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-[var(--foreground-muted)] sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Eu crio sites e aplicativos modernos, sempre prezando por softwares de qualidade e com uma ótima experiência de usuário que seja interativa e responsiva. 
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/projects"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[var(--background)] bg-[var(--color1)] hover:bg-[var(--color3)] transition-colors md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color1)]"
                aria-label="Ver meu portfolio de projetos"
              >
                Veja meu trabalho
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-[var(--color1)] text-base font-medium rounded-md text-[var(--color1)] bg-[var(--background)] hover:bg-[var(--color4)] transition-colors md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color1)]"
                aria-label="Entrar em contato comigo"
              >
                Entre em contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;