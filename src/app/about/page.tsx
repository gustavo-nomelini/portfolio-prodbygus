import About from '@/components/sections/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Mim | Prod by GUS',
  description: 'Conheça mais sobre Gustavo, desenvolvedor web e designer',
};

export default function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}
