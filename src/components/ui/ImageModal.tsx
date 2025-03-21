'use client';

import Image from 'next/image';
import { useEffect } from 'react';
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
  // Bloqueie o scroll quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Navegação por teclado
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

  if (!isOpen) return null;

  // Função para lidar com cliques no backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Verificar se a URL da imagem é válida
  const hasValidImage = typeof imageUrl === 'string' && imageUrl.trim() !== '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden shadow-xl bg-[var(--background)]/80"
        onClick={(e) => e.stopPropagation()}
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
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[var(--background)]/70 rounded-full p-3 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              if (onPrev) onPrev();
            }}
            aria-label="Imagem anterior"
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        {hasNext && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[var(--background)]/70 rounded-full p-3 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              if (onNext) onNext();
            }}
            aria-label="Próxima imagem"
          >
            <FaChevronRight size={20} />
          </button>
        )}

        <div className="p-4">
          {hasValidImage ? (
            <div className="flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-[80vh]"
                quality={90}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 w-full bg-[var(--color4)] rounded-lg">
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
