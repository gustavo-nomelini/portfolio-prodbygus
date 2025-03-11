"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);

  // Função para verificar se o link está ativo
  const isActive = (path: string) => pathname === path;

  // Toggle do menu mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fechar o menu ao clicar em um link (para mobile)
  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  // Efeito para detectar a rolagem da página e atualizar o estado
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Adicionar event listener
    window.addEventListener('scroll', handleScroll);

    // Verificar o estado inicial
    handleScroll();

    // Remover event listener ao desmontar
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Evitar scroll quando o menu está aberto no mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Efeito para mostrar a animação do logo periodicamente
  useEffect(() => {
    // Animar o logo a cada 10 segundos para chamar atenção
    const interval = setInterval(() => {
      setLogoAnimated(true);
      
      // Desligar a animação após 1.8 segundos (mais lento)
      setTimeout(() => {
        setLogoAnimated(false);
      }, 1800);
    }, 10000); // Intervalo mais longo para ser menos frequente
    
    return () => clearInterval(interval);
  }, []);

  // Links de navegação (incluindo "Home")
  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/contact', text: 'Contact' }
  ];

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'bg-[var(--background)]/65 backdrop-blur-xl shadow-lg shadow-[var(--color2)]/30' 
            : 'bg-[var(--background)]/85 backdrop-blur-md shadow-sm shadow-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo melhorado - Versão unificada para desktop e mobile com pulso mais suave */}
            <div className="flex">
              <Link 
                href="/" 
                className={`
                  flex-shrink-0 flex items-center group relative 
                  transition-all duration-700 ease-in-out
                  ${logoAnimated ? 'scale-105' : 'scale-100'}
                `}
                onClick={closeMenu}
                aria-label="Página Inicial"
              >
                <span className={`
                  text-xl font-bold transition-all duration-700 ease-in-out
                  ${logoAnimated 
                    ? 'text-[var(--color3)] drop-shadow-[0_0_3px_var(--color3)]' 
                    : 'text-[var(--color1)]'} 
                  group-hover:text-[var(--color3)]
                  relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5
                  after:bg-[var(--color3)] after:origin-right after:scale-x-0 after:transition-transform
                  after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100
                `}>
                  Prod by GUS
                </span>
                
                {/* Tooltip apenas para desktop */}
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 
                             bg-[var(--color4)] text-[var(--foreground)] text-xs rounded 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             pointer-events-none whitespace-nowrap hidden md:block">
                  Ir para a página inicial
                </span>
              </Link>
            </div>

            {/* Navegação para desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`
                    relative text-[var(--foreground)] hover:text-[var(--color1)] transition-colors py-2
                    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[var(--foreground)] 
                    after:transition-all after:duration-300 after:ease-in-out
                    hover:after:w-full
                    ${isActive(link.href) ? 'after:w-full after:bg-[var(--color1)]' : ''}
                  `}
                >
                  {link.text}
                </Link>
              ))}
            </nav>

            {/* Botão do menu mobile */}
            <button
              className="md:hidden text-[var(--foreground)] p-2 rounded-md hover:bg-[var(--color4)] transition-colors focus:outline-none"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile - Corrigido para preencher a tela inteira com blur */}
      <div 
        className={`
          fixed inset-0 z-[100] md:hidden
          transition-opacity duration-500 ease-in-out
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          flex flex-col bg-[var(--background)]/80 backdrop-blur-3xl
        `}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo no menu mobile */}
          <Link 
            href="/" 
            onClick={closeMenu}
            className="text-xl font-bold text-[var(--color1)]"
          >
            Prod by GUS
          </Link>
          
          {/* Botão para fechar menu */}
          <button
            onClick={closeMenu}
            className="p-2 rounded-full text-[var(--foreground)] bg-[var(--color4)]/60 hover:bg-[var(--color1)]/60 transition-colors"
            aria-label="Fechar menu"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        {/* Links de navegação - centralizado na tela */}
        <div className="flex-1 flex flex-col justify-center items-center py-8">
          <nav className="w-full max-w-xs mx-auto">
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
                    `}
                  >
                    {link.text}
                    <span className={`
                      absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--color1)]
                      transform transition-transform duration-300 ease-out
                      ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0'}
                      origin-center
                      group-hover:scale-x-100
                    `}></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Rodapé do menu */}
        <div className="py-6 text-center text-sm text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} Prod by GUS
        </div>
      </div>
    </>
  );
};

export default Header;