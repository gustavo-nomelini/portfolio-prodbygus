"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Função para verificar se o link está ativo
  const isActive = (path: string) => pathname === path;

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
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[var(--color1)]">Prod by GUS</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            {[
              { href: '/', text: 'Home' },
              { href: '/about', text: 'About' },
              { href: '/projects', text: 'Projects' },
              { href: '/contact', text: 'Contact' }
            ].map(link => (
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
        </div>
      </div>
    </header>
  );
};

export default Header;