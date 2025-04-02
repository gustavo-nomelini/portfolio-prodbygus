'use client';

import { motion } from 'framer-motion';
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

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-16 min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/5 to-[var(--color3)]/5"></div>
      <div className="absolute inset-0 cyberpunk-grid opacity-10"></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color1)]/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--color3)]/10 rounded-full filter blur-[80px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient text-3xl font-bold sm:text-4xl lg:text-5xl mb-3">
            Entre em Contato
          </h2>
          <div className="glass-effect h-1 w-24 mx-auto mb-6 opacity-60"></div>
          <p className="mt-6 text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Interessado em trabalharmos juntos?
            <br />
            Quer me contratar para um freelance?
            <br />
            Entre em contato através de um dos canais abaixo.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card de Email */}
          <motion.a
            href={`mailto:${emailAddress}`}
            className="glass-effect rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color1)]/20 group flex flex-col items-center justify-center h-[140px]"
            aria-label="Enviar email para gustavolnomelini@gmail.com"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[var(--color1)]/20 transition-all">
              <FaEnvelope className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gradient">Email</h3>

            {/* Cyberpunk corners */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--color1)] opacity-50"></div>
          </motion.a>

          {/* Card de LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/gustavo-lopes-nomelini-144bb1212/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color1)]/20 group flex flex-col items-center justify-center h-[140px]"
            aria-label="Visitar perfil no LinkedIn"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[var(--color1)]/20 transition-all">
              <FaLinkedin className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gradient">LinkedIn</h3>

            {/* Cyberpunk corners */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--color1)] opacity-50"></div>
          </motion.a>

          {/* Card de GitHub */}
          <motion.a
            href="https://github.com/gustavo-nomelini"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color1)]/20 group flex flex-col items-center justify-center h-[140px]"
            aria-label="Visitar perfil no GitHub"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[var(--color1)]/20 transition-all">
              <FaGithub className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gradient">GitHub</h3>

            {/* Cyberpunk corners */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--color1)] opacity-50"></div>
          </motion.a>

          {/* Card de WhatsApp */}
          <motion.a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color1)]/20 group flex flex-col items-center justify-center h-[140px]"
            aria-label="Conversar no WhatsApp"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="rounded-full bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] text-[var(--background)] w-14 h-14 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[var(--color1)]/20 transition-all">
              <FaWhatsapp className="text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gradient">WhatsApp</h3>

            {/* Cyberpunk corners */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--color1)] opacity-50"></div>
          </motion.a>
        </motion.div>

        {/* Formulário de contato */}
        <motion.div
          className="mt-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="glass-effect rounded-xl shadow-lg p-8 relative">
            <h3 className="text-2xl font-semibold text-center text-gradient mb-6">
              Envie uma Mensagem
            </h3>
            <ContactForm />

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color1)] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color1)] opacity-50"></div>
          </div>
        </motion.div>

        {/* Mapa interativo do Google Maps */}
        <motion.div
          className="mt-20 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="h-[400px] rounded-xl overflow-hidden shadow-lg glass-effect p-0.5">
            <div className="h-full w-full rounded-lg overflow-hidden relative">
              <Map location={location} />

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color1)] opacity-50 z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color1)] opacity-50 z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color1)] opacity-50 z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color1)] opacity-50 z-10 pointer-events-none"></div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 border border-[var(--color1)]/20 rounded-full"></div>
        <div className="hidden md:block absolute -top-10 -right-10 w-20 h-20 border border-[var(--color3)]/20 rounded-full"></div>
      </div>
    </section>
  );
};

export default Contact;
