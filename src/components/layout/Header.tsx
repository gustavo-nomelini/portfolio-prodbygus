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
  // Referência para controlar o tempo entre efeitos glitch (throttling)
  const lastGlitchTimeRef = useRef<number>(0);
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

  // Função para acionar o efeito glitch com throttling
  const triggerGlitchEffect = () => {
    const now = Date.now();
    const timeSinceLastGlitch = now - lastGlitchTimeRef.current;

    // Permitir o efeito apenas se passou pelo menos 0.35 segundos desde o último
    if (timeSinceLastGlitch > 350) {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 300);
      lastGlitchTimeRef.current = now;
    }
  };

  // Handler com debounce para eventos de mouse
  const handleMouseEnter = () => {
    triggerGlitchEffect();
  };

  // Client-side only effects
  useEffect(() => {
    // Inicializar o tempo do último glitch
    lastGlitchTimeRef.current = Date.now();

    // Efeito para detectar a rolagem da página e atualizar o estado
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

    // Usar um valor fixo para o intervalo inicial
    const intervalTime = 8000;

    // Criar novo intervalo para glitch aleatório
    glitchIntervalRef.current = setInterval(() => {
      // Math.random é seguro aqui pois estamos no cliente
      if (Math.random() > 0.7) {
        // Verificar se passou tempo suficiente desde o último glitch
        const now = Date.now();
        const timeSinceLastGlitch = now - lastGlitchTimeRef.current;

        if (timeSinceLastGlitch > 1000) {
          setGlitchEffect(true);
          setTimeout(() => setGlitchEffect(false), 300);
          lastGlitchTimeRef.current = now;
        }
      }
    }, intervalTime);

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

  // Render a placeholder during SSR to prevent hydration issues
  const headerContent = (
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
                onMouseEnter={handleMouseEnter}
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
                     border border-[var(--color1)]/30 relative group shadow-[0_0_8px_rgba(var(--color1-rgb),0.2)]"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {/* Glow effect */}
            <span
              className="absolute inset-0 bg-[var(--color1)]/0 group-hover:bg-[var(--color1)]/10 
                          transition-colors duration-300 rounded-md"
            ></span>
            <FaBars className="h-6 w-6 group-hover:text-[var(--color1)] transition-colors duration-300" />

            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color1)] rounded-tl-md"></span>
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color1)] rounded-tr-md"></span>
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color1)] rounded-bl-md"></span>
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color1)] rounded-br-md"></span>
          </button>
        </div>
      </div>
    </header>
  );

  // Menu mobile component
  const mobileMenu = menuOpen ? (
    <div
      key="mobile-menu"
      className="fixed inset-0 z-[100] md:hidden flex flex-col bg-[var(--background)]/95 backdrop-blur-3xl"
    >
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cyberpunk-grid w-full h-full opacity-20"></div>
        {/* Animated glowing lines */}
        <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color1)] to-transparent animate-pulse"></div>
        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color1)] to-transparent animate-pulse delay-300"></div>
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color1)] to-transparent animate-pulse delay-700"></div>
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color1)] to-transparent animate-pulse delay-500"></div>
        {/* Cyberpunk corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color1)] opacity-60"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[var(--color1)] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[var(--color1)] opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color1)] opacity-60"></div>
      </div>

      {/* Menu header */}
      <div
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16
                    border-b border-[var(--color1)]/50 relative z-10"
      >
        {/* Decorative corner elements for menu header */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color1)] shadow-[0_0_5px_var(--color1)]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color1)] shadow-[0_0_5px_var(--color1)]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color1)] shadow-[0_0_5px_var(--color1)]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color1)] shadow-[0_0_5px_var(--color1)]"></div>

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
              className="h-14 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Botão para fechar menu */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="p-2 rounded-full text-[var(--foreground)] bg-[var(--color4)]/60 
                  hover:bg-[var(--color1)]/60 transition-colors relative group border border-[var(--color1)]/50
                  flex items-center justify-center z-10 shadow-[0_0_8px_var(--color1)]"
          aria-label="Fechar menu"
        >
          {/* Glow effect */}
          <span
            className="absolute inset-0 bg-[var(--color1)]/0 group-hover:bg-[var(--color1)]/30 
                        rounded-full transition-colors duration-300"
          ></span>
          <FaTimes className="h-6 w-6 group-hover:text-[var(--color1)] transition-colors duration-300" />

          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[var(--color1)]"></span>
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[var(--color1)]"></span>
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[var(--color1)]"></span>
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[var(--color1)]"></span>
        </button>
      </div>

      {/* Links de navegação - centralizado na tela */}
      <div className="flex-1 flex flex-col justify-center items-center py-8 relative z-10">
        <nav className="w-full max-w-xs mx-auto">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="text-center transform transition-transform hover:scale-105"
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`
                    text-2xl font-medium relative inline-block
                    ${isActive(link.href) ? 'text-[var(--color1)]' : 'text-[var(--foreground)]'}
                    transition-colors duration-300 hover:text-[var(--color1)]
                    px-8 py-4 group w-full flex items-center justify-center
                  `}
                >
                  {/* Animated background with improved contrast */}
                  <span
                    className="absolute inset-0 bg-[var(--background)]/50 group-hover:bg-[var(--color1)]/10 
                                  transition-colors duration-300 backdrop-blur-md border border-[var(--color1)]/30 
                                  group-hover:border-[var(--color1)]/70 rounded-lg"
                  ></span>

                  {/* Text with data attributes for glitch effect */}
                  <span
                    className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300"
                    data-text={link.text}
                  >
                    {link.text}
                  </span>

                  {/* Animated noise effect */}
                  <span className="absolute inset-0 bg-noise opacity-0 group-hover:opacity-10 mix-blend-overlay transition-opacity duration-300 rounded-lg"></span>

                  {/* Animated underline with glow */}
                  <span
                    className={`
                      absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-[var(--color1)]
                      transform transition-transform duration-300 ease-out
                      ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0'}
                      origin-center group-hover:scale-x-100
                      shadow-[0_0_8px_var(--color1)]
                    `}
                  ></span>

                  {/* Digital line effect */}
                  <span className="absolute right-2 top-0 bottom-0 w-px bg-[var(--color1)]/0 group-hover:bg-[var(--color1)]/50 transition-colors duration-300"></span>
                  <span className="absolute left-2 top-0 bottom-0 w-px bg-[var(--color1)]/0 group-hover:bg-[var(--color1)]/50 transition-colors duration-300"></span>

                  {/* Corner accents - always visible but brighter on active/hover */}
                  <span
                    className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isActive(link.href) ? 'border-[var(--color1)]' : 'border-[var(--color1)]/50'} 
                                  group-hover:border-[var(--color1)] transition-colors duration-300 rounded-tl-lg
                                  ${isActive(link.href) ? 'shadow-[0_0_5px_var(--color1)]' : ''}`}
                  ></span>
                  <span
                    className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isActive(link.href) ? 'border-[var(--color1)]' : 'border-[var(--color1)]/50'} 
                                  group-hover:border-[var(--color1)] transition-colors duration-300 rounded-tr-lg
                                  ${isActive(link.href) ? 'shadow-[0_0_5px_var(--color1)]' : ''}`}
                  ></span>
                  <span
                    className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isActive(link.href) ? 'border-[var(--color1)]' : 'border-[var(--color1)]/50'} 
                                  group-hover:border-[var(--color1)] transition-colors duration-300 rounded-bl-lg
                                  ${isActive(link.href) ? 'shadow-[0_0_5px_var(--color1)]' : ''}`}
                  ></span>
                  <span
                    className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isActive(link.href) ? 'border-[var(--color1)]' : 'border-[var(--color1)]/50'} 
                                  group-hover:border-[var(--color1)] transition-colors duration-300 rounded-br-lg
                                  ${isActive(link.href) ? 'shadow-[0_0_5px_var(--color1)]' : ''}`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Rodapé do menu estilo cyberpunk */}
      <div className="py-6 text-center text-sm text-[var(--foreground-muted)] border-t border-[var(--color1)]/30 relative z-10">
        <div className="relative max-w-xs mx-auto">
          <div className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--color1)]/70 to-transparent top-1/2 -translate-y-1/2 shadow-[0_0_5px_var(--color1)]"></div>
          <span className="relative bg-[var(--background)]/90 px-4 border-x border-[var(--color1)]/50">
            © {currentYear}{' '}
            <span className="text-[var(--color1)]">Prod by GUS</span>
          </span>
        </div>
        {/* Cyberpunk decoration below footer */}
        <div className="flex justify-center mt-4">
          <div className="w-24 h-1 bg-[var(--color1)]/50 shadow-[0_0_5px_var(--color1)]"></div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <ClientOnly>
      {headerContent}
      {mobileMenu}
    </ClientOnly>
  );
};

export default Header;
