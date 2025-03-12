"use client";

import { useState } from 'react';

const ContactForm = () => {
  // Estado para o formulário
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });
      
      // Limpar formulário após envio bem-sucedido
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Ocorreu um erro ao enviar a mensagem',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={formState.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--color2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color1)] text-[var(--foreground)]"
          placeholder="Seu nome"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formState.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--color2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color1)] text-[var(--foreground)]"
          placeholder="seu.email@exemplo.com"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          value={formState.message}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--color2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color1)] text-[var(--foreground)] resize-none"
          placeholder="Digite sua mensagem aqui..."
        ></textarea>
      </div>
      
      {/* Feedback de status - Sucesso/Erro */}
      {submitStatus.type && (
        <div className={`p-4 mb-6 rounded-md ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-6 py-4 rounded-md font-medium 
            transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--color4)]
            ${isSubmitting 
              ? 'bg-[var(--color2)] text-[var(--foreground-muted)] cursor-not-allowed' 
              : 'bg-[var(--color1)] text-[var(--background)] hover:bg-[var(--color3)]'
            }
          `}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
