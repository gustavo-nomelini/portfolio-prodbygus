'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ImageModal';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  // Filtra imagens inválidas
  const validImages = images?.filter((img) => img && img.src) || [];

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setCurrentIndex(null);
  };

  const handleNextImage = () => {
    if (currentIndex !== null && currentIndex < validImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (validImages.length === 0) {
    return <div className="text-center p-4">Nenhuma imagem disponível</div>;
  }

  // Animation variants for the gallery container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for each gallery item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={className}>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {validImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => handleImageClick(index)}
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="relative h-48 sm:h-56 w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                quality={60}
                onLoadingComplete={() => {
                  setImageLoaded((prev) => ({ ...prev, [index]: true }));
                }}
              />
              {!imageLoaded[index] && (
                <motion.div
                  className="absolute inset-0 bg-[var(--color4)]"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                ></motion.div>
              )}
              <div className="absolute inset-0 bg-[var(--background)]/0 group-hover:bg-[var(--background)]/30 transition-colors duration-300">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <motion.span
                    className="bg-[var(--color1)]/80 text-[var(--background)] px-4 py-2 rounded-lg font-medium backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(var(--color1-rgb), 0.95)',
                    }}
                  >
                    Ampliar
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ImageModal
        isOpen={currentIndex !== null}
        imageUrl={currentIndex !== null ? validImages[currentIndex].src : ''}
        alt={currentIndex !== null ? validImages[currentIndex].alt : ''}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        hasNext={currentIndex !== null && currentIndex < validImages.length - 1}
        hasPrev={currentIndex !== null && currentIndex > 0}
      />
    </div>
  );
};

export default ImageGallery;
