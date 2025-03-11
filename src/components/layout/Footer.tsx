"use client";

import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  // Usar um valor constante para o ano igual ao usado no Header
  const currentYear = "2025";

  return (
    <footer className="bg-[var(--color4)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Prod by GUS. All rights reserved.
            </p>
          </div>
          
          {/* Link para o repositório do código-fonte */}
          <a 
            href="https://github.com/gustavo-nomelini/prod-by-gus-portfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-all group"
            aria-label="Ver código-fonte no GitHub"
          >
            <FaGithub className="text-lg group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] 
                          after:bg-[var(--color1)] after:origin-right after:scale-x-0 after:transition-transform
                          after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100">
              Source Code
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;