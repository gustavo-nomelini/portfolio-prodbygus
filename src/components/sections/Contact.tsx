'use client';

import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Map from '../ui/Map';
import ContactForm from './ContactForm';

const Contact = () => {
  // Função para construir a URL do WhatsApp de forma segura
  const getWhatsappUrl = () => {
    const phoneNumber = '5545998508634'; // Considere usar variáveis de ambiente para dados sensíveis
    const message = encodeURIComponent(
      'Vi seu Portfolio Online e fiquei interessado no seu trabalho, gostaria de conversarmos melhor.',
    );
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  // Email para contato - considere também usar variáveis de ambiente
  const emailAddress = 'gustavolnomelini@gmail.com';

  // Localização para o mapa
  const location = 'Cascavel, Paraná, Brasil';

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Entre em Contato
          </h2>
          <div className="mt-2 w-24 h-1 bg-[var(--color1)] mx-auto"></div>
          <p className="mt-6 text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Interessado em trabalharmos juntos?
            <br />
            Quer me contratar para um freelance?
            <br />
            Entre em contato através de um dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {/* Card de Email */}
          <a
            href={`mailto:${emailAddress}`}
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
            aria-label="Enviar email para gustavolnomelini@gmail.com"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaEnvelope className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Email
            </h3>
          </a>

          {/* Card de LinkedIn */}
          <a
            href="https://www.linkedin.com/in/gustavo-lopes-nomelini-144bb1212/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
            aria-label="Visitar perfil no LinkedIn"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaLinkedin className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              LinkedIn
            </h3>
          </a>

          {/* Card de GitHub */}
          <a
            href="https://github.com/gustavo-nomelini"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
            aria-label="Visitar perfil no GitHub"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaGithub className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              GitHub
            </h3>
          </a>

          {/* Card de WhatsApp */}
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
            aria-label="Conversar no WhatsApp"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaWhatsapp className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              WhatsApp
            </h3>
          </a>
        </div>

        {/* Formulário de contato */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="bg-[var(--color4)] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-center text-[var(--foreground)] mb-6">
              Envie uma Mensagem
            </h3>
            <ContactForm />
          </div>
        </div>

        {/* Mapa interativo do Google Maps */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Map location={location} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
