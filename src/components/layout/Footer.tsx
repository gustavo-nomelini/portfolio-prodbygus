'use client';

import { FaGithub } from 'react-icons/fa';
import ClientOnly from './ClientOnly';

const Footer = () => {
  // Usar um valor constante para o ano igual ao usado no Header
  const currentYear = '2025';

  return (
    <ClientOnly>
      <footer className="bg-[var(--color4)]/90 backdrop-blur-md text-[var(--foreground)] border-t border-[var(--color1)]/20">
        {/* Linha decorativa no topo */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color3)]/30 via-[var(--color1)]/50 to-[var(--color3)]/30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--color1)]/40 hidden sm:block"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--color1)]/40 hidden sm:block"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[var(--color1)]/40 hidden sm:block"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--color1)]/40 hidden sm:block"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="mb-3 md:mb-0 text-center md:text-left">
              <p className="text-sm relative inline-block">
                <span className="relative z-10">
                  © {currentYear}{' '}
                  <span className="text-[var(--color1)] font-medium">
                    &lt;PROD/BYGUS&gt;
                  </span>
                  <span className="hidden sm:inline">
                    . All rights reserved.
                  </span>
                </span>
                {/* Highlight effect */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color1)]/40 to-transparent"></span>
              </p>
            </div>

            {/* Link para o repositório do código-fonte */}
            <a
              href="https://github.com/gustavo-nomelini/prod-by-gus-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-all group px-3 py-1.5 rounded-md border border-transparent hover:border-[var(--color1)]/30 hover:bg-[var(--color1)]/5"
              aria-label="Ver código-fonte no GitHub"
            >
              <FaGithub className="text-lg group-hover:scale-110 transition-transform" />
              <span
                className="text-sm font-medium relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] 
                            after:bg-[var(--color1)] after:origin-right after:scale-x-0 after:transition-transform
                            after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100"
              >
                Source Code
              </span>
            </a>
          </div>
        </div>
      </footer>
    </ClientOnly>
  );
};

export default Footer;
