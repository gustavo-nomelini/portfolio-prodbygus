'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ClientOnly from './ClientOnly';

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  // Para evitar problemas com o useEffect executando duas vezes em desenvolvimento
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Usar um valor constante para o ano em vez de um estado
  const currentYear = '2025';

  // Função para verificar se o link está ativo
  const isActive = (path: string) => pathname === path;

  // Toggle do menu mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Trigger glitch effect when opening/closing menu
    triggerGlitchEffect();
  };

  // Fechar o menu ao clicar em um link (para mobile)
  const closeMenu = () => {
    if (menuOpen) {
      triggerGlitchEffect();
      setMenuOpen(false);
    }
  };

  // Função para acionar o efeito glitch
  const triggerGlitchEffect = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 300);
  };

  // Efeito para detectar a rolagem da página e atualizar o estado
  useEffect(() => {
    // Função para detectar scroll
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Adicionar event listener
    window.addEventListener('scroll', handleScroll);

    // Verificar o estado inicial depois que o componente montar
    handleScroll();

    // Remover event listener ao desmontar
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Evitar scroll quando o menu está aberto no mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Limpar ao desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Efeito para mostrar a animação do logo periodicamente
  useEffect(() => {
    // Limpar qualquer intervalo existente primeiro
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    // Criar novo intervalo
    animationIntervalRef.current = setInterval(() => {
      setLogoAnimated(true);

      // Desligar a animação após 1.8 segundos
      setTimeout(() => {
        setLogoAnimated(false);
      }, 1800);
    }, 3000);

    // Limpar intervalos ao desmontar
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  // Efeito para criar efeitos de glitch aleatórios
  useEffect(() => {
    // Limpar qualquer intervalo existente primeiro
    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current);
    }

    // Criar novo intervalo para glitch aleatório
    glitchIntervalRef.current = setInterval(
      () => {
        if (Math.random() > 0.7) {
          // 30% de chance
          triggerGlitchEffect();
        }
      },
      Math.random() * 7000 + 8000,
    ); // Entre 8 e 15 segundos

    // Limpar intervalos ao desmontar
    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
    };
  }, []);

  // Links de navegação
  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <ClientOnly>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          border-b
          ${glitchEffect ? 'glitching' : ''}
          ${
            scrolled
              ? 'bg-[var(--background)]/60 backdrop-blur-xl border-[var(--color1)]/30 shadow-[0_0_15px_rgba(var(--color1-rgb),0.3)]'
              : 'bg-[var(--background)]/60 backdrop-blur-md border-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color1)] opacity-60"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--color1)] opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--color1)] opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color1)] opacity-60"></div>

          <div className="flex justify-between items-center h-16">
            {/* Logo melhorado */}
            <div className="flex">
              <Link
                href="/"
                className={`
                  flex-shrink-0 flex items-center group relative 
                  transition-all duration-1000 ease-out
                  ${logoAnimated ? 'scale-105 brightness-125' : 'scale-100 brightness-100'}
                `}
                onClick={closeMenu}
                aria-label="Página Inicial"
              >
                <div className="relative">
                  {/* Glow effect behind logo */}
                  <div
                    className={`absolute inset-0 bg-[var(--color1)]/20 blur-lg rounded-full 
                    transition-opacity duration-300 ${logoAnimated ? 'opacity-100' : 'opacity-0'}`}
                  ></div>
                  <Image
                    src="/LogoRoxaSemFundo.png"
                    alt="Prod by GUS Logo"
                    width={128}
                    height={32}
                    className="h-16 w-auto transition-all duration-300 ease-in-out group-hover:brightness-110"
                    priority
                  />
                </div>

                {/* Tooltip apenas para desktop */}
                <span
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 
                             bg-[var(--color4)] text-[var(--foreground)] text-xs rounded 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             pointer-events-none whitespace-nowrap hidden md:block
                             border border-[var(--color1)]/30"
                >
                  Ir para a página inicial
                </span>
              </Link>
            </div>

            {/* Navegação para desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative text-[var(--foreground)] hover:text-[var(--color1)] 
                    transition-colors py-2 px-3 group overflow-hidden
                    ${isActive(link.href) ? 'text-[var(--color1)]' : ''}
                  `}
                  onMouseEnter={triggerGlitchEffect}
                >
                  {/* Background hover effect */}
                  <span
                    className="absolute inset-0 bg-[var(--color1)]/10 opacity-0 group-hover:opacity-100 
                                  transition-opacity duration-300"
                  ></span>

                  {/* Text */}
                  <span className="relative z-10">{link.text}</span>

                  {/* Bottom border with glow */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color1)] transition-all duration-300
                              shadow-[0_0_8px_var(--color1)] 
                              ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  ></span>

                  {/* Corner accents that appear on hover */}
                  <span
                    className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color1)] 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></span>
                  <span
                    className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color1)] 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></span>
                  <span
                    className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color1)] 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></span>
                  <span
                    className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color1)] 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Botão do menu mobile */}
            <button
              className="md:hidden text-[var(--foreground)] p-2 rounded-md 
                       hover:bg-[var(--color1)]/20 transition-colors focus:outline-none
                       border border-[var(--color1)]/30 relative group"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {/* Glow effect */}
              <span
                className="absolute inset-0 bg-[var(--color1)]/0 group-hover:bg-[var(--color1)]/10 
                            transition-colors duration-300"
              ></span>
              <FaBars className="h-6 w-6" />

              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color1)]"></span>
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color1)]"></span>
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color1)]"></span>
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color1)]"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile - Agora com key para forçar remontagem quando o estado muda */}
      {menuOpen && (
        <div
          key="mobile-menu"
          className="fixed inset-0 z-[100] md:hidden flex flex-col bg-[var(--background)]/75 backdrop-blur-3xl"
        >
          {/* Menu header */}
          <div
            className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16
                        border-b border-[var(--color1)]/30 relative"
          >
            {/* Decorative corner elements for menu header */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)]"></div>

            {/* Logo no menu mobile */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`
                flex-shrink-0 flex items-center group relative 
                transition-all duration-1000 ease-out
                ${logoAnimated ? 'scale-105 brightness-125' : 'scale-100 brightness-100'}
              `}
              aria-label="Página Inicial"
            >
              <div className="relative">
                {/* Glow effect behind logo */}
                <div
                  className={`absolute inset-0 bg-[var(--color1)]/20 blur-lg rounded-full 
                  transition-opacity duration-300 ${logoAnimated ? 'opacity-100' : 'opacity-0'}`}
                ></div>
                <Image
                  src="/LogoRoxaSemFundo.png"
                  alt="Prod by GUS Logo"
                  width={160}
                  height={40}
                  className="h-16 w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Botão para fechar menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full text-[var(--foreground)] bg-[var(--color4)]/60 
                      hover:bg-[var(--color1)]/60 transition-colors relative group border border-[var(--color1)]/30
                      flex items-center justify-center z-10"
              aria-label="Fechar menu"
            >
              {/* Glow effect */}
              <span
                className="absolute inset-0 bg-[var(--color1)]/0 group-hover:bg-[var(--color1)]/20 
                            rounded-full transition-colors duration-300"
              ></span>
              <FaTimes className="h-6 w-6" />

              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[var(--color1)]"></span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[var(--color1)]"></span>
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[var(--color1)]"></span>
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[var(--color1)]"></span>
            </button>
          </div>

          {/* Links de navegação - centralizado na tela */}
          <div className="flex-1 flex flex-col justify-center items-center py-8">
            <div className="cyberpunk-grid w-full h-full absolute inset-0 opacity-15"></div>
            <nav className="w-full max-w-xs mx-auto relative z-10">
              <ul className="space-y-8">
                {navLinks.map((link) => (
                  <li key={link.href} className="text-center">
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`
                        text-2xl font-medium relative inline-block
                        ${isActive(link.href) ? 'text-[var(--color1)]' : 'text-[var(--foreground)]'}
                        transition-colors duration-300 hover:text-[var(--color1)]
                        px-6 py-2
                      `}
                    >
                      {link.text}

                      {/* Animated underline */}
                      <span
                        className={`
                          absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--color1)]
                          transform transition-transform duration-300 ease-out
                          ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0'}
                          origin-center hover:scale-x-100
                          shadow-[0_0_6px_var(--color1)]
                        `}
                      ></span>

                      {/* Show corner accents only for active link */}
                      {isActive(link.href) && (
                        <>
                          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color1)]"></span>
                          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color1)]"></span>
                          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color1)]"></span>
                          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color1)]"></span>
                        </>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Rodapé do menu - Versão simplificada para evitar problemas de hidratação */}
          <div className="py-6 text-center text-sm text-[var(--foreground-muted)] border-t border-[var(--color1)]/20">
            <div className="relative max-w-xs mx-auto">
              <div className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--color1)]/50 to-transparent top-1/2 -translate-y-1/2"></div>
              <span className="relative bg-[var(--background)]/90 px-4">
                © {currentYear} Prod by GUS
              </span>
            </div>
          </div>
        </div>
      )}
    </ClientOnly>
  );
};

export default Header;
