"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Tipos
type ProjectCategory = 'Todos' | 'Frontend' | 'Backend' | 'Full Stack' | 'Design';

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
}

const Projects = () => {
  // Lista de projetos
  const projects: Project[] = [
    {
      id: 'portfolio',
      title: 'Portfolio Pessoal',
      description: 'Meu site de portfólio pessoal construído com Next.js e TailwindCSS.',
      image: '/images/projects/portfolio.jpg',
      categories: ['Frontend', 'Design'],
      technologies: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
      github: 'https://github.com/username/portfolio',
      liveUrl: 'https://seudominio.com',
      featured: true,
    },
    {
      id: 'ecommerce',
      title: 'Plataforma E-commerce',
      description: 'Loja online completa com sistema de pagamentos e gerenciamento de produtos.',
      image: '/images/projects/ecommerce.jpg',
      categories: ['Full Stack'],
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/username/ecommerce',
      liveUrl: 'https://ecommerce-exemplo.com',
      featured: true,
    },
    {
      id: 'api-rest',
      title: 'API REST para Gestão de Tarefas',
      description: 'API completa para um aplicativo de gestão de tarefas com autenticação JWT.',
      image: '/images/projects/api.jpg',
      categories: ['Backend'],
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: 'https://github.com/username/tasks-api',
      featured: false,
    },
    // Adicione mais projetos conforme necessário
  ];

  // Estado para filtrar projetos
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  
  // Lista de categorias únicas extraídas dos projetos
  const uniqueCategories: ProjectCategory[] = ['Todos', 'Frontend', 'Backend', 'Full Stack', 'Design'];
  
  // Filtra os projetos com base na categoria selecionada
  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Meus Projetos
          </h2>
          <div className="mt-2 w-24 h-1 bg-[var(--color1)] mx-auto"></div>
          <p className="mt-6 text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Explore alguns dos projetos que desenvolvi. Do front-end ao back-end, 
            aqui estão os trabalhos que demonstram minhas habilidades e paixão por desenvolvimento.
          </p>
        </div>

        {/* Filtros de categorias */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-[var(--color1)] text-[var(--background)] font-medium'
                  : 'bg-[var(--color4)] text-[var(--foreground)] hover:bg-[var(--color2)] hover:text-[var(--foreground)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-[var(--color4)] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group"
            >
              {/* Imagem do projeto */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/projects/${project.id}`} className="bg-[var(--color1)] text-[var(--background)] px-4 py-2 rounded-md font-medium hover:bg-[var(--color3)] transition-colors">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
              
              {/* Conteúdo do projeto */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{project.title}</h3>
                  {project.featured && (
                    <span className="bg-[var(--color1)]/10 text-[var(--color1)] text-xs px-2 py-1 rounded-full">Destaque</span>
                  )}
                </div>
                <p className="text-[var(--foreground-muted)] mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs px-2 py-1 bg-[var(--background)] text-[var(--foreground-muted)] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-[var(--background)] text-[var(--foreground-muted)] rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Links */}
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="text-[var(--color1)] hover:text-[var(--color3)] font-medium flex items-center gap-1"
                  >
                    Detalhes <FaExternalLinkAlt className="h-3 w-3" />
                  </Link>
                  
                  <div className="flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--color1)] transition-colors"
                        aria-label={`GitHub do projeto ${project.title}`}
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--color1)] transition-colors"
                        aria-label={`Demonstração ao vivo do projeto ${project.title}`}
                      >
                        <FaExternalLinkAlt className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
