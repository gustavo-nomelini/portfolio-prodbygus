import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  // WhatsApp URL com mensagem predefinida
  const whatsappMessage = encodeURIComponent("Vi seu Portfolio Online e fiquei interessado, quero contratar seu trabalho.");
  const whatsappUrl = `https://wa.me/5545998508634?text=${whatsappMessage}`;

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
            Interessado em trabalharmos juntos? Entre em contato através de um dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-4xl mx-auto">
          {/* Card de Email - Todo o card é um link agora */}
          <a 
            href="mailto:gustavolnomelini@gmail.com" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-[var(--color4)] group block"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color3)] transition-colors">
              <FaEnvelope className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Email</h3>
            <span className="text-[var(--color1)] group-hover:text-[var(--color3)] transition-colors break-all">
              gustavolnomelini@gmail.com
            </span>
          </a>

          {/* Card de LinkedIn - Todo o card é um link agora */}
          <a 
            href="https://www.linkedin.com/in/gustavo-lopes-nomelini-144bb1212/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-[var(--color4)] group block"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color3)] transition-colors">
              <FaLinkedin className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">LinkedIn</h3>
            <span className="text-[var(--color1)] group-hover:text-[var(--color3)] transition-colors">
              Gustavo Lopes Nomelini
            </span>
          </a>

          {/* Card de GitHub - Todo o card é um link agora */}
          <a 
            href="https://github.com/gustavo-nomelini" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-[var(--color4)] group block"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color3)] transition-colors">
              <FaGithub className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">GitHub</h3>
            <span className="text-[var(--color1)] group-hover:text-[var(--color3)] transition-colors">
              gustavo-nomelini
            </span>
          </a>

          {/* Card de WhatsApp - Todo o card é um link agora */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color4)] rounded-xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-[var(--color4)] group block"
          >
            <div className="rounded-full bg-[var(--color1)] text-[var(--background)] w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color3)] transition-colors">
              <FaWhatsapp className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">WhatsApp</h3>
            <span className="text-[var(--color1)] group-hover:text-[var(--color3)] transition-colors">
              +55 45 99850-8634
            </span>
          </a>
        </div>

        {/* Formulário de contato */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="bg-[var(--color4)] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-center text-[var(--foreground)] mb-6">
              Envie uma Mensagem
            </h3>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
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
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--color2)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color1)] text-[var(--foreground)] resize-none"
                  placeholder="Digite sua mensagem aqui..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[var(--color1)] text-[var(--background)] rounded-md font-medium hover:bg-[var(--color3)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--color4)]"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
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
