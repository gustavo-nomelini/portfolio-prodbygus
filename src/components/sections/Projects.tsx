'use client';
import ClientOnly from '@/components/layout/ClientOnly';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectCardSkeleton from '@/components/ui/skeletons/ProjectCardSkeleton';
import { useEffect, useState } from 'react';

// Tipos
type ProjectCategory =
  | 'Todos'
  | 'Frontend'
  | 'Backend'
  | 'Full Stack'
  | 'Design';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  technologies: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  repoUrl: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulando o carregamento de dados
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Aqui você normalmente buscaria dados de uma API
        // Por enquanto, vamos simular um atraso para mostrar o skeleton
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Aqui você colocaria sua lógica real de busca de dados
        // setProjects(data);

        // Dados de exemplo
        setProjects([
          {
            id: '1',
            title: 'E-commerce Platform',
            description:
              'Um e-commerce completo com sistema de pagamentos, carrinho e painel admin.',
            image: '/projects/ecommerce.jpg',
            categories: ['Full Stack'],
            technologies: ['React', 'Next.js', 'Stripe', 'MongoDB'],
            github: 'https://github.com/example',
            liveUrl: 'https://example.com',
            featured: true,
            repoUrl: 'https://github.com/example',
          },
          // ... outros projetos
        ]);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Mostrar skeletons enquanto carrega
  if (isLoading) {
    return (
      <section id="projects" className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meus Projetos</h2>
            <p className="mt-4 text-[var(--foreground-muted)]">
              Uma seleção de projetos que demonstram minhas habilidades e
              experiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Renderizar skeletons enquanto carrega */}
            {[...Array(6)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Lista de categorias únicas extraídas dos projetos
  const uniqueCategories: ProjectCategory[] = [
    'Todos',
    'Frontend',
    'Backend',
    'Full Stack',
    'Design',
  ];

  // Filtra os projetos com base na categoria selecionada
  const filteredProjects = projects.filter((project) =>
    project.categories.includes('Todos'),
  );

  console.log('Projects data:', projects);

  return (
    <section id="projects" className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Meus Projetos
          </h2>
          <div className="mt-2 w-24 h-1 bg-[var(--color1)] mx-auto"></div>
          <p className="mt-6 text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Explore alguns dos projetos que desenvolvi. Do front-end ao
            back-end, aqui estão os trabalhos que demonstram minhas habilidades
            e paixão por desenvolvimento.
          </p>
        </div>

        {/* Filtros de categorias */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all ${
                projects.some((project) =>
                  project.categories.includes(category),
                )
                  ? 'bg-[var(--color1)] text-[var(--background)] font-medium'
                  : 'bg-[var(--color4)] text-[var(--foreground)] hover:bg-[var(--color2)] hover:text-[var(--foreground)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <ClientOnly
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          {projects.length === 0 ? (
            <p className="text-center">Nenhum projeto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.technologies}
                  liveUrl={project.liveUrl}
                  repoUrl={project.repoUrl}
                />
              ))}
            </div>
          )}
        </ClientOnly>
      </div>
    </section>
  );
};

export default Projects;
