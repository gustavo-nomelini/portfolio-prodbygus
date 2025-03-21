'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  alt: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  alt,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  const [animation, setAnimation] = useState<
    'entering' | 'entered' | 'exiting' | 'exited'
  >('exited');

  useEffect(() => {
    if (isOpen) {
      setAnimation('entering');
      document.body.style.overflow = 'hidden'; // Previne rolagem quando modal está aberto

      // Pequeno atraso para a animação de entrada
      const enterTimer = setTimeout(() => {
        setAnimation('entered');
      }, 50);

      return () => clearTimeout(enterTimer);
    } else {
      if (animation !== 'exited') {
        setAnimation('exiting');

        // Atraso para permitir a animação de saída completar
        const exitTimer = setTimeout(() => {
          setAnimation('exited');
          document.body.style.overflow = ''; // Restaura rolagem
        }, 300);

        return () => clearTimeout(exitTimer);
      }
    }
  }, [isOpen, animation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (animation === 'exited' && !isOpen) return null;

  // Funções para lidar com cliques e evitar propagação
  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique em conteúdo feche o modal
  };

  // Verificação para garantir que imageUrl não é uma string vazia
  const hasValidImage = imageUrl && imageUrl.trim() !== '';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-md transition-opacity duration-300 ${
        animation === 'entering' || animation === 'exiting'
          ? 'opacity-0'
          : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden shadow-xl transition-transform duration-300 ${
          animation === 'entering' || animation === 'exiting'
            ? 'scale-95'
            : 'scale-100'
        }`}
        onClick={handleContentClick}
      >
        <button
          className="absolute top-3 right-3 z-10 bg-[var(--background)]/70 rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors"
          onClick={onClose}
          aria-label="Fechar imagem"
        >
          <FaTimes size={20} />
        </button>

        {hasPrev && (
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[var(--background)]/70 rounded-full p-3 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPrev && onPrev();
            }}
            aria-label="Imagem anterior"
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        {hasNext && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[var(--background)]/70 rounded-full p-3 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNext && onNext();
            }}
            aria-label="Próxima imagem"
          >
            <FaChevronRight size={20} />
          </button>
        )}

        <div className="relative w-full h-full max-h-[90vh]">
          {hasValidImage ? (
            <Image
              src={imageUrl}
              alt={alt}
              className="object-contain w-auto max-w-full max-h-[90vh]"
              width={1200}
              height={800}
              quality={90}
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-64 w-64 bg-[var(--color4)] rounded-lg">
              <p className="text-[var(--foreground-muted)]">
                Imagem não disponível
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
