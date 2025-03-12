"use client";

import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  // Estado para controlar a mensagem de feedback
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  
  // WhatsApp URL com mensagem predefinida
  const whatsappMessage = encodeURIComponent("Vi seu Portfolio Online e fiquei interessado no seu trabalho, gostaria de conversarmos melhor.");
  const whatsappUrl = `https://wa.me/5545998508634?text=${whatsappMessage}`;
  
  // Email que será copiado
  const emailAddress = "gustavolnomelini@gmail.com";
  
  // Função para copiar o email para a área de transferência
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        // Exibe a mensagem de sucesso
        setShowCopiedMessage(true);
        
        // Remove a mensagem após 3 segundos
        setTimeout(() => {
          setShowCopiedMessage(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
  };

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
            Interessado em trabalharmos juntos?<br />Quer me contratar para um freelance?<br />Entre em contato através de um dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {/* Card de Email */}
          <div className="relative flex flex-col items-center">
            <a 
              href={`mailto:${emailAddress}`}
              className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center w-full flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl transition-all group h-[140px]"
            >
              <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Email</h3>
            </a>
            
            {/* Botão para copiar abaixo do card */}
            <div className="mt-3 relative">
              <button
                onClick={copyEmailToClipboard}
                className="px-4 py-2 bg-[var(--color1)] text-[var(--background)] rounded-md text-sm font-medium hover:bg-[var(--color3)] transition-colors"
              >
                Clique para copiar
              </button>
              
              {/* Mensagem de feedback que aparece quando o email é copiado */}
              {showCopiedMessage && (
                <div className="absolute left-0 right-0 bottom-full mb-2 bg-[var(--color5)] text-[var(--color1)] py-2 px-3 rounded-md text-xs">
                  E-mail copiado com sucesso!
                </div>
              )}
            </div>
          </div>

          {/* Card de LinkedIn - Ajustado para alinhar melhor */}
          <a 
            href="https://www.linkedin.com/in/gustavo-lopes-nomelini-144bb1212/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaLinkedin className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">LinkedIn</h3>
          </a>

          {/* Card de GitHub - Ajustado para alinhar melhor */}
          <a 
            href="https://github.com/gustavo-nomelini" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaGithub className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">GitHub</h3>
          </a>

          {/* Card de WhatsApp - Ajustado para alinhar melhor */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col items-center justify-center h-[140px]"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[var(--color3)] transition-colors">
              <FaWhatsapp className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">WhatsApp</h3>
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

        {/* Mapa ou elemento visual */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-[var(--color2)] opacity-20 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Localização
                </h3>
                <p className="text-[var(--foreground-muted)]">
                  Foz do Iguaçu, Paraná, Brasil
                </p>
                <p className="mt-2 text-[var(--color1)]">
                  Disponível para trabalhos remotos globais
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
