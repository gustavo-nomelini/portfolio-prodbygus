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
            id: '1',
            title: 'Blog PRODBYGUS',
            description:
              'Blog pessoal desenvolvido com o framework Astro, focado em compartilhar conhecimentos sobre desenvolvimento web e experiências técnicas. Conta com design minimalista e elegante, sistema de posts em Markdown/MDX, carregamento ultrarrápido com SSG (Static Site Generation), tema claro/escuro, SEO otimizado, integração com formulário de contato via Nodemailer e suporte a PWA. Um excelente aprendizado sobre a criação de sites orientados a conteúdo com alta performance.',
            image: '/projects/blog-main.png',
            categories: ['Frontend', 'Design'],
            technologies: [
              'Astro',
              'Tailwind CSS',
              'TypeScript',
              'MDX',
              'Markdown',
              'Nodemailer',
            ],
            liveUrl: 'https://blog-prodbygus.vercel.app/',
            featured: true,
            repoUrl: 'https://github.com/gustavo-nomelini/blog-prodbygus',
          },
          // {
          //   id: '6',
          //   title: 'Chá de Panela - Convite Digital',
          //   description:
          //     'Site interativo desenvolvido como convite digital para meu chá de panela, com contagem regressiva, galeria de fotos e RSVP.',
          //   image: '/projects/cha-de-panela.png',
          //   categories: ['Frontend', 'Design'],
          //   technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
          //   liveUrl: 'https://gustavo-nomelini.github.io/cha-de-panela/',
          //   featured: true,
          //   repoUrl: 'https://github.com/gustavo-nomelini/cha-de-panela',
          // },
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
          className="flex flex-col md:flex-row justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {uniqueCategories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                relative group overflow-hidden px-5 py-3 rounded-md min-w-[120px] transition-all duration-300 font-bold
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              whileHover={{
                scale: 1.05,
              }}
            >
              {/* Fundo colorido e glow */}
              {selectedCategory === category ? (
                <>
                  {/* Fundo ativo */}
                  <div className="absolute inset-0 bg-[var(--color1)] opacity-90"></div>

                  {/* Glow effect para botão ativo */}
                  <div className="absolute inset-0 bg-[var(--color1)] opacity-40 blur-[5px] animate-pulse"></div>
                  <div className="absolute -inset-[1px] border-2 border-white/60 rounded-md opacity-80 shadow-[0_0_15px_var(--color1)]"></div>

                  {/* Efeito de pulsação na borda para botão ativo */}
                  <div className="absolute -inset-[3px] border border-white/30 rounded-md opacity-0 animate-ping"></div>
                </>
              ) : (
                <>
                  {/* Fundo normal */}
                  <div className="absolute inset-0 bg-[var(--background)] border-2 border-[var(--color4)] opacity-90"></div>

                  {/* Glow no hover */}
                  <div className="absolute inset-0 bg-[var(--color1)] opacity-0 group-hover:opacity-20 blur-[5px] transition-opacity duration-300"></div>
                  <div className="absolute -inset-[1px] border-2 border-[var(--color4)] group-hover:border-[var(--color1)]/60 rounded-md opacity-70 transition-colors duration-300"></div>

                  {/* Fundo animado no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color1)]/10 to-[var(--color3)]/10 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                </>
              )}

              {/* Detalhes cyberpunk nas esquinas */}
              <div
                className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${selectedCategory === category ? 'border-white/80' : 'border-[var(--color4)] group-hover:border-[var(--color1)]/60'} rounded-tl-sm transition-colors duration-300`}
              ></div>
              <div
                className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${selectedCategory === category ? 'border-white/80' : 'border-[var(--color4)] group-hover:border-[var(--color1)]/60'} rounded-tr-sm transition-colors duration-300`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${selectedCategory === category ? 'border-white/80' : 'border-[var(--color4)] group-hover:border-[var(--color1)]/60'} rounded-bl-sm transition-colors duration-300`}
              ></div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${selectedCategory === category ? 'border-white/80' : 'border-[var(--color4)] group-hover:border-[var(--color1)]/60'} rounded-br-sm transition-colors duration-300`}
              ></div>

              {/* Linhas de destaque adicionais */}
              <div
                className={`absolute top-0 left-1/3 right-1/3 h-[1px] ${selectedCategory === category ? 'bg-white/60' : 'bg-[var(--color4)]/40 group-hover:bg-[var(--color1)]/40'} transition-colors duration-300`}
              ></div>
              <div
                className={`absolute bottom-0 left-1/3 right-1/3 h-[1px] ${selectedCategory === category ? 'bg-white/60' : 'bg-[var(--color4)]/40 group-hover:bg-[var(--color1)]/40'} transition-colors duration-300`}
              ></div>

              {/* Texto com bom contraste */}
              <span
                className={`
                  relative z-10 uppercase tracking-wider text-sm flex items-center justify-center
                  ${
                    selectedCategory === category
                      ? 'text-[var(--background)] font-black drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]'
                      : 'text-[var(--foreground)] group-hover:text-[var(--color1)]'
                  }
                  transition-colors duration-300
                `}
              >
                {/* Ícones para cada categoria */}
                <span className="mr-2">
                  {category === 'Todos' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  )}
                  {category === 'Frontend' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {category === 'Backend' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  )}
                  {category === 'Full Stack' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {category === 'Design' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  )}
                </span>
                {category}
              </span>
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
