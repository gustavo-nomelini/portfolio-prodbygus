'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ContactForm = () => {
  // Estado para o formulário
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '', // Novo campo para número de telefone
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Estados para efeitos visuais
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Efeito para limpar mensagem de sucesso após 10 segundos
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitStatus.type === 'success') {
      timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 10000); // 10 segundos
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitStatus.type]);

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      console.log('Enviando formulário:', formState);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao enviar a mensagem');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      });

      // Limpar formulário após envio bem-sucedido
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao enviar a mensagem',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estilo para o asterisco de campo obrigatório
  const requiredFieldMark = (
    <span className="text-[var(--color1)] ml-1">*</span>
  );

  // Variantes para animações
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    focus: {
      scale: 1.02,
      boxShadow: '0 0 0 2px rgba(var(--color1-rgb), 0.5)',
    },
  };

  // Classes base para inputs
  const inputBaseClasses = `
    w-full px-4 py-3 bg-[var(--background)]/60 backdrop-blur-sm 
    border border-[var(--color2)] rounded-md 
    focus:outline-none focus:ring-2 focus:ring-[var(--color1)] 
    text-[var(--foreground)] transition-all duration-300
  `;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={inputVariants}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Nome{requiredFieldMark}
        </label>
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className={`relative ${focusedField === 'name' ? 'cyberpunk-input-focus' : ''}`}
        >
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            required
            className={inputBaseClasses}
            placeholder="Seu nome completo"
          />
          {focusedField === 'name' && (
            <div className="absolute inset-0 bg-[var(--color1)]/5 rounded-md pointer-events-none"></div>
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={inputVariants}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Email{requiredFieldMark}
        </label>
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className={`relative ${focusedField === 'email' ? 'cyberpunk-input-focus' : ''}`}
        >
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            className={inputBaseClasses}
            placeholder="seu.email@exemplo.com"
          />
          {focusedField === 'email' && (
            <div className="absolute inset-0 bg-[var(--color1)]/5 rounded-md pointer-events-none"></div>
          )}
        </motion.div>
      </motion.div>

      {/* Novo campo de telefone */}
      <motion.div variants={inputVariants}>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Telefone{' '}
          <span className="text-[var(--foreground-muted)] text-xs">
            (opcional)
          </span>
        </label>
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className={`relative ${focusedField === 'phone' ? 'cyberpunk-input-focus' : ''}`}
        >
          <input
            type="tel"
            id="phone"
            value={formState.phone}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className={inputBaseClasses}
            placeholder="(XX) XXXXX-XXXX"
          />
          {focusedField === 'phone' && (
            <div className="absolute inset-0 bg-[var(--color1)]/5 rounded-md pointer-events-none"></div>
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={inputVariants}>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Mensagem{requiredFieldMark}
        </label>
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className={`relative ${focusedField === 'message' ? 'cyberpunk-input-focus' : ''}`}
        >
          <textarea
            id="message"
            rows={5}
            value={formState.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            className={`${inputBaseClasses} resize-none`}
            placeholder="Digite sua mensagem aqui..."
          ></textarea>
          {focusedField === 'message' && (
            <div className="absolute inset-0 bg-[var(--color1)]/5 rounded-md pointer-events-none"></div>
          )}
        </motion.div>
      </motion.div>

      {/* Feedback de status - Sucesso/Erro */}
      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-md ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitStatus.message}
          {submitStatus.type === 'success' && (
            <div className="w-full bg-gray-200 h-1 mt-2 rounded overflow-hidden">
              <div
                className="bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] h-1 animate-shrink-width"
                style={{ animationDuration: '10s' }}
              ></div>
            </div>
          )}
        </motion.div>
      )}

      <motion.div variants={inputVariants}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-6 py-4 rounded-md font-medium cyberpunk-btn
            transition-colors focus:outline-none 
            focus:ring-2 focus:ring-[var(--color1)] 
            focus:ring-offset-2 focus:ring-offset-[var(--color4)]
            relative overflow-hidden
            ${
              isSubmitting
                ? 'bg-[var(--color2)] text-[var(--foreground-muted)] cursor-not-allowed'
                : 'bg-gradient-to-r from-[var(--color1)] to-[var(--color3)] text-[var(--background)] hover:shadow-lg hover:shadow-[var(--color1)]/20'
            }
          `}
        >
          <span className="relative z-10">
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </span>
        </button>
      </motion.div>

      <motion.div
        variants={inputVariants}
        className="text-xs text-[var(--foreground-muted)] text-center"
      >
        Campos com {requiredFieldMark} são obrigatórios
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
