'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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

  const firstRender = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Gerenciar animações e estado do modal
  useEffect(() => {
    // Na primeira renderização, não faça nada
    if (firstRender.current) {
      firstRender.current = false;
      if (isOpen) {
        setAnimation('entering');
      }
      return;
    }

    // Limpar timeouts existentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isOpen) {
      // Modal está abrindo
      setAnimation('entering');
      document.body.style.overflow = 'hidden';

      timeoutRef.current = setTimeout(() => {
        setAnimation('entered');
      }, 50);
    } else {
      // Modal está fechando
      if (animation !== 'exited') {
        setAnimation('exiting');

        timeoutRef.current = setTimeout(() => {
          setAnimation('exited');
          document.body.style.overflow = '';
        }, 300);
      }
    }

    // Cleanup ao desmontar componente
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.body.style.overflow = '';
    };
  }, [isOpen, animation]);

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

  // Não renderizar nada se o modal estiver fechado e a animação de saída concluída
  if (animation === 'exited' && !isOpen) return null;

  // Funções para lidar com cliques e evitar propagação
  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique em conteúdo feche o modal
  };

  // Verificar se a URL da imagem é válida
  const hasValidImage = typeof imageUrl === 'string' && imageUrl.trim() !== '';

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
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
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

        <div className="relative w-full h-full">
          {hasValidImage ? (
            <div className="flex items-center justify-center min-h-[50vh] bg-[var(--background)]/50">
              <Image
                src={imageUrl}
                alt={alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-[80vh]"
                quality={90}
                priority
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
