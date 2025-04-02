'use client';
import ClientOnly from '@/components/layout/ClientOnly';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectCardSkeleton from '@/components/ui/skeletons/ProjectCardSkeleton';
import { motion } from 'framer-motion';
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
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('Todos');

  // Simulando o carregamento de dados
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Aqui você normalmente buscaria dados de uma API
        // Por enquanto, vamos simular um atraso para mostrar o skeleton
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Dados de exemplo
        setProjects([
          {
            id: '6',
            title: 'Chá de Panela - Convite Digital',
            description:
              'Site interativo desenvolvido como convite digital para meu chá de panela, com contagem regressiva, galeria de fotos e RSVP.',
            image: '/projects/cha-de-panela.png',
            categories: ['Frontend', 'Design'],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
            liveUrl: 'https://gustavo-nomelini.github.io/cha-de-panela/',
            featured: true,
            repoUrl: 'https://github.com/gustavo-nomelini/cha-de-panela',
          },
          /* Comentado para o deploy inicial
          {
            id: '1',
            title: 'E-commerce Platform',
            description:
              'Um e-commerce completo com sistema de pagamentos, carrinho e painel admin.',
            image: '/projects/ecommerce.jpg',
            categories: ['Full Stack'],
            technologies: ['React', 'Next.js', 'Stripe', 'MongoDB'],
            liveUrl: 'https://example.com',
            featured: true,
            repoUrl: 'https://github.com/example',
          },
          {
            id: '2',
            title: 'Dashboard Analytics',
            description:
              'Dashboard interativo para visualização de dados com gráficos e filtros avançados.',
            image: '/projects/dashboard.jpg',
            categories: ['Frontend'],
            technologies: ['React', 'Chart.js', 'Tailwind CSS'],
            liveUrl: 'https://example.com',
            featured: false,
            repoUrl: 'https://github.com/example',
          },
          {
            id: '3',
            title: 'API RESTful',
            description:
              'API completa com autenticação, validação e documentação automática.',
            image: '/projects/api.jpg',
            categories: ['Backend'],
            technologies: ['Node.js', 'Express', 'MongoDB', 'Swagger'],
            liveUrl: 'https://example.com',
            featured: true,
            repoUrl: 'https://github.com/example',
          },
          {
            id: '4',
            title: 'Algoritmos de Machine Learning',
            description:
              'Biblioteca de algoritmos de machine learning implementados do zero para fins educacionais.',
            image: '/projects/placeholder.jpg',
            categories: ['Backend', 'Data Science'],
            technologies: [
              'Python',
              'NumPy',
              'Pandas',
              'Scikit-learn',
              'Jupyter',
            ],
            featured: false,
            repoUrl: 'https://github.com/example/ml-algorithms',
          },
          {
            id: '5',
            title: 'CLI para Automação de DevOps',
            description:
              'Ferramenta de linha de comando para automatizar tarefas comuns de DevOps e CI/CD.',
            image: '/projects/cli-tool.jpg',
            categories: ['Backend', 'DevOps'],
            technologies: ['TypeScript', 'Node.js', 'Docker', 'GitHub Actions'],
            featured: true,
            repoUrl: 'https://github.com/example/devops-cli',
          },
          */
        ]);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Lista de categorias únicas extraídas dos projetos
  const uniqueCategories: ProjectCategory[] = [
    'Todos',
    'Frontend',
    'Backend',
    'Full Stack',
    'Design',
    // Todos os filtros foram restaurados para uso futuro
  ];

  // Primeiro, vamos verificar quais categorias têm projetos
  const categoriesWithProjects = new Set<ProjectCategory>();
  projects.forEach((project) => {
    project.categories.forEach((category) => {
      categoriesWithProjects.add(category);
    });
  });

  // Filtra os projetos com base na categoria selecionada
  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((project) =>
          project.categories.includes(selectedCategory),
        );

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Mostrar skeletons enquanto carrega
  if (isLoading) {
    return (
      <section
        id="projects"
        className="relative py-16 min-h-screen overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/5 to-[var(--color3)]/5"></div>
        <div className="absolute inset-0 cyberpunk-grid opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-gradient text-3xl font-bold sm:text-4xl lg:text-5xl">
              Meus Projetos
            </h2>
            <p className="mt-4 text-[var(--foreground-muted)]">
              Uma seleção de projetos que demonstram minhas habilidades e
              experiência
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8 animate-pulse">
            {uniqueCategories.map((category) => (
              <div
                key={category}
                className="h-10 w-24 rounded-full bg-[var(--color4)]"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Renderizar skeletons enquanto carrega */}
            {[...Array(3)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative py-16 min-h-screen overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/5 to-[var(--color3)]/5"></div>
      <div className="absolute inset-0 cyberpunk-grid opacity-10"></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--color1)]/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--color3)]/10 rounded-full filter blur-[80px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient text-3xl font-bold sm:text-4xl lg:text-5xl mb-3">
            Meus Projetos
          </h2>
          <div className="glass-effect h-1 w-24 mx-auto mb-6 opacity-60"></div>
          <p className="mt-6 text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Explore alguns dos projetos que desenvolvi. Do front-end ao
            back-end, aqui estão os trabalhos que demonstram minhas habilidades
            e paixão por desenvolvimento.
          </p>
        </motion.div>

        {/* Filtros de categorias com efeito de brilho */}
        <motion.div
          className="flex justify-center flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {uniqueCategories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full transition-all duration-300 cyberpunk-btn
                ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[var(--color1)] via-[var(--color3)] to-[var(--color1)] text-[var(--background)] font-medium bg-[length:200%_100%] animate-shimmer shadow-lg shadow-[var(--color1)]/20'
                    : 'bg-[var(--color4)]/60 backdrop-blur-sm text-[var(--foreground)] hover:bg-[var(--color2)] hover:text-[var(--foreground)]'
                }
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 10px rgba(var(--color1-rgb), 0.5)',
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <ClientOnly
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          {filteredProjects.length === 0 ? (
            <motion.p
              className="text-center text-lg text-[var(--foreground-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Nenhum projeto encontrado nesta categoria.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  custom={index}
                  className="glass-effect rounded-lg overflow-hidden"
                  whileHover={{
                    y: -5,
                    boxShadow: '0 10px 25px -5px rgba(var(--color1-rgb), 0.2)',
                  }}
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    liveUrl={project.liveUrl}
                    repoUrl={project.repoUrl}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </ClientOnly>

        {/* Decorative elements */}
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 border border-[var(--color1)]/20 rounded-full"></div>
        <div className="hidden md:block absolute -top-10 -right-10 w-20 h-20 border border-[var(--color3)]/20 rounded-full"></div>
      </div>
    </section>
  );
};

export default Projects;
