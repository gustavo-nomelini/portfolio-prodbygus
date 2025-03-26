'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

  // Função para lidar com cliques no backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Verificar se a URL da imagem é válida
  const hasValidImage = typeof imageUrl === 'string' && imageUrl.trim() !== '';

  // Variantes de animação
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-md"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden shadow-xl bg-[var(--background)]/80"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
          >
            <motion.button
              className="absolute top-3 right-3 z-10 bg-[var(--background)]/70 rounded-full p-2 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors"
              onClick={onClose}
              aria-label="Fechar imagem"
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTimes size={20} />
            </motion.button>

            {hasPrev && (
              <motion.button
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[var(--background)]/70 rounded-full p-3 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPrev) onPrev();
                }}
                aria-label="Imagem anterior"
                whileHover={{
                  scale: 1.1,
                  x: -3,
                  backgroundColor: 'var(--color1)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
              >
                <FaChevronLeft size={20} />
              </motion.button>
            )}

            {hasNext && (
              <motion.button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[var(--background)]/70 rounded-full p-3 text-[var(--foreground)] hover:bg-[var(--color1)] transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNext) onNext();
                }}
                aria-label="Próxima imagem"
                whileHover={{
                  scale: 1.1,
                  x: 3,
                  backgroundColor: 'var(--color1)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
              >
                <FaChevronRight size={20} />
              </motion.button>
            )}

            <div className="p-4">
              {hasValidImage ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Image
                    src={imageUrl}
                    alt={alt}
                    width={1200}
                    height={800}
                    className="object-contain max-w-full max-h-[80vh]"
                    quality={90}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center justify-center h-64 w-full bg-[var(--color4)] rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-[var(--foreground-muted)]">
                    Imagem não disponível
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
