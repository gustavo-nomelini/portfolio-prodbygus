'use client';

import { useEffect, useState } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import ClientOnly from './ClientOnly';

const Footer = () => {
  const currentYear = '2025';
  const [isGlitching, setIsGlitching] = useState(false);

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/prodbygus37',
      icon: <FaTwitter className="w-5 h-5" />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/gustavo-nomelini',
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/prodbygus37',
      icon: <FaInstagram className="w-5 h-5" />,
    },
  ];

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      },
      Math.random() * 5000 + 3000,
    );

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <ClientOnly>
      <footer
        className={`relative bg-[var(--color4)]/90 backdrop-blur-md text-[var(--foreground)] border-t border-[var(--color1)]/40 overflow-hidden ${isGlitching ? 'cyber-glitch' : ''}`}
      >
        {/* Top decorative line with animation */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color3)]/30 via-[var(--color1)] to-[var(--color3)]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color1)] to-transparent animate-slide"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, var(--color1) 25%, var(--color1) 26%, transparent 27%, transparent 74%, var(--color1) 75%, var(--color1) 76%, transparent 77%, transparent),
                            linear-gradient(90deg, transparent 24%, var(--color1) 25%, var(--color1) 26%, transparent 27%, transparent 74%, var(--color1) 75%, var(--color1) 76%, transparent 77%, transparent)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color1)]/5 to-transparent pointer-events-none animate-scanline" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Decorative corners with glow */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--color1)]/70 hidden sm:block neon-glow"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--color1)]/70 hidden sm:block neon-glow"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--color1)]/70 hidden sm:block neon-glow"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--color1)]/70 hidden sm:block neon-glow"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Left column */}
            <div>
              <div className="mb-6 group">
                <p className="text-sm flex flex-col items-center md:items-start">
                  <span className="font-mono text-xl text-[var(--color1)] font-bold tracking-wider group-hover:text-shadow-glow transition-all duration-300">
                    &lt;PROD/BYGUS&gt;
                  </span>
                  <span className="mt-2 text-[var(--foreground-muted)] italic tracking-wide">
                    Todos os direitos reservados © {currentYear}
                  </span>
                </p>
              </div>

              {/* Social links */}
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[var(--foreground-muted)] relative hover:text-[var(--color1)] hover:scale-110 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Me siga na rede social ${item.name}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-mono text-[var(--color1)] tracking-wider uppercase mb-4 cyber-heading after:content-['_//>']">
                  Navegação
                </h3>
                <ul className="space-y-3">
                  {footerLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--foreground-muted)] cyber-link hover:text-[var(--color1)] hover:text-shadow-glow transition-all duration-300"
                      >
                        <span className="text-[var(--color1)]">&#62; </span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-mono text-[var(--color1)] tracking-wider uppercase mb-4 cyber-heading after:content-['_//>']">
                  Contato
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:gustavolnomelini@gmail.com"
                      className="text-sm text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors inline-flex items-center space-x-2 group"
                    >
                      <FaEnvelope className="w-5 h-5" />
                      <span className="hidden md:inline">
                        gustavolnomelini@gmail.com
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/gustavo-lopes-nomelini-144bb1212/"
                      className="text-sm text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors inline-flex items-center space-x-2 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="w-5 h-5" />
                      <span className="hidden md:inline">LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .cyber-glitch {
          animation: glitch 0.3s linear infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slide {
          animation: slide 3s linear infinite;
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100%);
            opacity: 0.1;
          }
        }

        .animate-scanline {
          animation: scanline 10s linear infinite;
        }

        .text-shadow-glow {
          text-shadow: 0 0 8px var(--color1);
        }

        .neon-glow {
          box-shadow: 0 0 8px var(--color1);
        }

        .cyber-heading {
          position: relative;
          display: inline-block;
        }

        .cyber-heading::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: var(--color1);
          transition: width 0.3s ease;
        }

        .cyber-heading:hover::after {
          width: 100%;
        }

        .cyber-link {
          position: relative;
          display: inline-block;
        }

        .cyber-link::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: var(--color1);
          transition: width 0.3s ease;
        }

        .cyber-link:hover::after {
          width: 100%;
        }
      `}</style>
    </ClientOnly>
  );
};

export default Footer;
