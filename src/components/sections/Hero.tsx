'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={0}
          >
            <motion.span className="block" variants={textVariants} custom={1}>
              Seja bem-vindo, prazer me chamo Gustavo Lopes Nomelini
            </motion.span>
            <motion.span
              className="block text-[var(--color1)] mt-4"
              variants={textVariants}
              custom={2}
            >
              Full Stack
              <br />
              Web Developer
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-[var(--foreground-muted)] sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={3}
          >
            Eu crio sites e aplicativos modernos, sempre prezando por softwares
            de qualidade e com uma ótima experiência de usuário que seja
            interativa e responsiva.
          </motion.p>

          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <motion.div
              className="rounded-md shadow"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={0}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/projects"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[var(--background)] bg-[var(--color1)] hover:bg-[var(--color3)] transition-colors md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color1)]"
                aria-label="Ver meu portfolio de projetos"
              >
                Veja meu trabalho
              </Link>
            </motion.div>

            <motion.div
              className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-[var(--color1)] text-base font-medium rounded-md text-[var(--color1)] bg-[var(--background)] hover:bg-[var(--color4)] transition-colors md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color1)]"
                aria-label="Entrar em contato comigo"
              >
                Entre em contato
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
