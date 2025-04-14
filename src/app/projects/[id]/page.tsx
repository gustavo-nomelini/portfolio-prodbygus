'use client';

import ClientOnly from '@/components/layout/ClientOnly';
import ImageGallery from '@/components/ui/ImageGallery';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string; // Descrição mais longa para a página de detalhes
  image: string;
  categories: string[];
  technologies: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  repoUrl: string;
  challenges?: string[]; // Desafios do projeto
  solutions?: string[]; // Soluções implementadas
  screenshots?: Screenshot[]; // Agora é um array de objetos Screenshot
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        // Simulando atraso
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Dados de exemplo - comentando todos exceto o Chá de Panela
        const mockProjects: Project[] = [
          /* Comentado para o deploy inicial
          {
            id: '1',
            title: 'E-commerce Platform',
            description:
              'Um e-commerce completo com sistema de pagamentos, carrinho e painel admin.',
            detailedDescription: `Este projeto é uma plataforma de e-commerce completa desenvolvida...`,
            // ... resto do código do projeto ...
          },
          // ... outros projetos comentados ...
          */

          {
            id: '1',
            title: 'Blog PRODBYGUS',
            description:
              'Blog pessoal desenvolvido com o framework Astro, focado em compartilhar conhecimentos sobre desenvolvimento web e experiências técnicas.',
            detailedDescription: `Este projeto é um blog pessoal desenvolvido com o framework Astro, criado para compartilhar meus conhecimentos sobre desenvolvimento web, tecnologia e soluções para problemas do mundo real. O blog serve como uma plataforma para documentar meu aprendizado e contribuir com a comunidade de desenvolvedores.

O design foi pensado para ser minimalista e elegante, priorizando a legibilidade e o foco no conteúdo, com uma navegação intuitiva e interfaces limpas. Utilizei o conceito de Island Architecture do Astro, que permite a hidratação parcial dos componentes, resultando em um site extremamente rápido e eficiente.

Principais características do projeto:
- Design minimalista com foco na experiência de leitura
- Sistema de posts em Markdown/MDX para facilitar a criação de conteúdo
- Carregamento ultrarrápido com SSG (Static Site Generation)
- Tema claro/escuro conforme preferência do usuário
- SEO otimizado para melhor visibilidade nos motores de busca
- Integração com formulário de contato via Nodemailer
- Suporte a PWA para instalação como aplicativo
- Responsividade completa para todos os dispositivos
- Implementação de mapa interativo com OpenStreetMap`,
            image: '/projects/blog-main.png',
            categories: ['Frontend', 'Design'],
            technologies: [
              'Astro',
              'Tailwind CSS',
              'TypeScript',
              'MDX',
              'Markdown',
              'Nodemailer',
              'OpenStreetMap',
              'Leaflet',
            ],
            liveUrl: 'https://blog-prodbygus.vercel.app/',
            featured: true,
            repoUrl: 'https://github.com/gustavo-nomelini/blog-prodbygus',
            challenges: [
              'Aprender e implementar um novo framework (Astro) focado em sites orientados a conteúdo',
              'Criar um sistema eficiente para gerenciamento de posts em Markdown/MDX',
              'Implementar carregamento otimizado de recursos para garantir alta performance',
              'Desenvolver uma solução completa para o envio de mensagens via formulário de contato',
              'Configurar adequadamente a integração com mapas interativos',
            ],
            solutions: [
              'Aproveitei a arquitetura Islands do Astro para hidratação parcial, melhorando a performance',
              'Utilizei Content Collections do Astro para organizar e tipar os posts em Markdown',
              'Implementei estratégias avançadas de carregamento de recursos, como lazy-loading e code-splitting',
              'Criei uma API endpoint para processar o envio de mensagens do formulário de contato',
              'Desenvolvi um componente de mapa interativo com Leaflet integrado ao OpenStreetMap',
              'Configurei a PWA com service workers para permitir a instalação e funcionamento offline',
            ],
            screenshots: [
              {
                src: '/projects/blog-1.png',
                alt: 'Barra de navegação do blog',
                width: 1200,
                height: 800,
              },
              {
                src: '/projects/blog-2.png',
                alt: 'Página de post do blog com formatação em Markdown',
                width: 1200,
                height: 800,
              },
              {
                src: '/projects/blog-3.png',
                alt: 'Formulário de contato com mapa interativo',
                width: 1200,
                height: 800,
              },
            ],
          },
        ];

        const projectData = mockProjects.find((p) => p.id === id);
        if (projectData) {
          setProject(projectData);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do projeto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse w-16 h-16 border-4 border-[var(--color1)] border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="animate-pulse w-16 h-16 border-4 border-[var(--color1)] border-t-transparent rounded-full"></div>
          </div>
        ) : !project ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Projeto não encontrado</h2>
            <Link
              href="/projects"
              className="text-[var(--color1)] hover:underline flex items-center gap-2"
            >
              <FaArrowLeft /> Voltar para projetos
            </Link>
          </div>
        ) : (
          <>
            {/* Navegação de volta */}
            <div className="mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors"
              >
                <FaArrowLeft /> Voltar para todos os projetos
              </Link>
            </div>

            {/* Cabeçalho do projeto */}
            <div className="relative rounded-xl overflow-hidden mb-10 h-[40vh] md:h-[50vh]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)]">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--color1)]/80 text-[var(--background)] rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                    Sobre o Projeto
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    {project.detailedDescription
                      ?.split('\n\n')
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-[var(--foreground-muted)] mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </section>

                {project.challenges && project.challenges.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                      Desafios & Soluções
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-medium mb-4 text-[var(--color1)]">
                          Desafios
                        </h3>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-[var(--foreground-muted)]"
                            >
                              <span className="text-[var(--color1)] mt-1">
                                •
                              </span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-4 text-[var(--color1)]">
                          Soluções
                        </h3>
                        <ul className="space-y-2">
                          {project.solutions?.map((solution, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-[var(--foreground-muted)]"
                            >
                              <span className="text-[var(--color1)] mt-1">
                                •
                              </span>
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {project.screenshots && project.screenshots.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                      Screenshots
                    </h2>
                    <ImageGallery
                      images={project.screenshots.map((screenshot) => ({
                        src: screenshot.src || '',
                        alt:
                          screenshot.alt ||
                          `Screenshot do projeto ${project.title}`,
                        width: screenshot.width || 1200,
                        height: screenshot.height || 800,
                      }))}
                      className="mt-4"
                    />
                  </section>
                )}
              </div>

              <div>
                <div className="bg-[var(--color4)]/30 rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">
                    Tecnologias
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--color2)] text-sm rounded-full text-[var(--foreground-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-[var(--color1)] text-[var(--background)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color3)] w-full"
                      >
                        <FaExternalLinkAlt />
                        <span>Ver Site do Projeto</span>
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-[var(--color4)] text-[var(--foreground)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color2)] w-full"
                      >
                        <FaGithub className="text-lg" />
                        <span>Ver no GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ClientOnly>
  );
}
