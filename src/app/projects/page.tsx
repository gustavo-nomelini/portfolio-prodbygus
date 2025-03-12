import Projects from '@/components/sections/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos | Prod by GUS',
  description: 'Explore os projetos e trabalhos desenvolvidos por Gustavo Lopes Nomelini',
};

export default function ProjectsPage() {
  return (
    <>
      <Projects />
    </>
  );
}
