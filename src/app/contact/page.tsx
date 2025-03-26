import Contact from '@/components/sections/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato | Prod by GUS',
  description:
    'Entre em contato com Gustavo para projetos de desenvolvimento web e design',
};

export default function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}
