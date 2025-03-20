import Projects from '@/components/sections/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos - Prod by GUS Portfolio',
  description:
    'Explore meus projetos de desenvolvimento web, incluindo sites responsivos, aplicativos web e integrações de API.',
  keywords: [
    'projetos web',
    'portfolio desenvolvimento',
    'react projects',
    'next.js projects',
  ],
  openGraph: {
    title: 'Projetos de Desenvolvimento Web - Prod by GUS',
    description:
      'Explore meus projetos de desenvolvimento web, incluindo sites responsivos, aplicativos web e integrações de API.',
    url: 'https://prodbygus.com/projects',
    images: [
      {
        url: '/projects-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Projetos de Desenvolvimento Web',
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Projects />
    </>
  );
}
