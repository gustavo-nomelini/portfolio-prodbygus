"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Links de navegação (incluindo "Home")
  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/contact', text: 'Contact' }
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-[var(--background)]/80 backdrop-blur-sm shadow-md shadow-[var(--color2)]/60' 
          : 'bg-[var(--background)] shadow-sm shadow-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Link para Home */}
          <div className="flex">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center"
              onClick={closeMenu}
            >
              <span className="text-xl font-bold text-[var(--color1)] hover:text-[var(--color3)] transition-colors">
                Prod by GUS
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
          <div className="md:hidden flex items-center">
            <button
              className="text-[var(--foreground)] p-2 rounded-md hover:bg-[var(--color4)] transition-colors focus:outline-none"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile overlay */}
      <div 
        className={`
          md:hidden fixed inset-0 bg-[var(--background)]/95 backdrop-blur-md z-40
          flex flex-col justify-center items-center
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          pt-16 /* Espaço para o header */
        `}
      >
        {/* Botão para fechar menu posicionado no canto superior direito */}
        <button
          className="absolute top-5 right-5 text-[var(--foreground)] bg-[var(--color4)] p-2 rounded-full hover:bg-[var(--color1)] transition-colors focus:outline-none"
          onClick={closeMenu}
          aria-label="Fechar menu"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        
        <nav className="flex flex-col items-center space-y-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`
                text-2xl font-medium relative
                ${isActive(link.href) ? 'text-[var(--color1)]' : 'text-[var(--foreground)]'}
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[var(--foreground)]
                after:transition-all after:duration-300 after:ease-in-out
                ${isActive(link.href) ? 'after:w-full after:bg-[var(--color1)]' : 'after:w-0'}
                hover:text-[var(--color1)] hover:after:w-full
              `}
            >
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;