'use client';

import { useState, useEffect } from 'react';

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
        message:
          'Mensagem enviada com sucesso! Entrarei em contato em breve.',
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Nome{requiredFieldMark}
        </label>
        <input
          type="text"
          id="name"
          value={formState.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--color2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color1)] text-[var(--foreground)]"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Email{requiredFieldMark}
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

      {/* Novo campo de telefone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Telefone{' '}
          <span className="text-[var(--foreground-muted)] text-xs">
            (opcional)
          </span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formState.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--color2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color1)] text-[var(--foreground)]"
          placeholder="(XX) XXXXX-XXXX"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--foreground-muted)] mb-2"
        >
          Mensagem{requiredFieldMark}
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
        <div
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
                className="bg-green-500 h-1 animate-shrink-width"
                style={{ animationDuration: '10s' }}
              ></div>
            </div>
          )}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-6 py-4 rounded-md font-medium 
            transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--color4)]
            ${
              isSubmitting
                ? 'bg-[var(--color2)] text-[var(--foreground-muted)] cursor-not-allowed'
                : 'bg-[var(--color1)] text-[var(--background)] hover:bg-[var(--color3)]'
            }
          `}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </div>

      <div className="text-xs text-[var(--foreground-muted)] text-center">
        Campos com {requiredFieldMark} são obrigatórios
      </div>
    </form>
  );
};

export default ContactForm;
