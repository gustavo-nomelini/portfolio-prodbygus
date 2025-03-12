import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

// Interfaces e tipos
type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack' | 'Design';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  image: string;
  images: string[];
  categories: ProjectCategory[];
  technologies: string[];
  github?: string;
  liveUrl?: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  featured: boolean;
  date: string;
}

// Dados dos projetos (simulados - em produção você pode usar um CMS ou API)
const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Pessoal',
    description: 'Meu site de portfólio pessoal construído com Next.js e TailwindCSS.',
    longDescription: [
      'Este é meu site de portfólio pessoal, projetado para destacar minhas habilidades e projetos como desenvolvedor web.',
      'Construído com Next.js e TailwindCSS, o site é totalmente responsivo, acessível e otimizado para SEO, garantindo uma experiência de usuário excepcional em qualquer dispositivo.',
      'O design foi cuidadosamente elaborado para refletir minha identidade profissional e mostrar meus trabalhos da melhor forma possível.'
    ],
    image: '/images/projects/portfolio.jpg',
    images: [
      '/images/projects/portfolio-1.jpg', 
      '/images/projects/portfolio-2.jpg',
      '/images/projects/portfolio-3.jpg'
    ],
    categories: ['Frontend', 'Design'],
    technologies: ['Next.js', 'React', 'TailwindCSS', 'TypeScript', 'Vercel'],
    github: 'https://github.com/gustavo-nomelini/prod-by-gus-portfolio',
    liveUrl: 'https://seudominio.com',
    features: [
      'Design responsivo e adaptável para todos os dispositivos',
      'Modo claro/escuro automático baseado nas preferências do sistema',
      'Animações sutis para melhorar a experiência do usuário',
      'Páginas detalhadas para cada projeto',
      'Formulário de contato funcional'
    ],
    challenges: [
      'Criar um design único que representasse minha identidade profissional',
      'Implementar transições de página fluidas e intuitivas',
      'Garantir acessibilidade em todos os elementos'
    ],
    solutions: [
      'Utilizei TailwindCSS para criar um sistema de design consistente e personalizado',
      'Implementei animações com framer-motion para transições suaves',
      'Segui as diretrizes WCAG e testei com leitores de tela'
    ],
    featured: true,
    date: 'Novembro 2024'
  },
  // Adicione mais projetos aqui...
];

// Gerar parâmetros para páginas estáticas
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// Gerar metadados dinâmicos
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  
  if (!project) {
    return {
      title: 'Projeto não encontrado | Prod by GUS',
    };
  }

  return {
    title: `${project.title} | Prod by GUS`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  
  // Redirecionar para 404 se o projeto não existe
  if (!project) {
    notFound();
  }

  return (
    <main className="py-16 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação de retorno */}
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors">
            <FaArrowLeft className="mr-2" /> Voltar para projetos
          </Link>
        </div>

        {/* Cabeçalho do projeto */}
        <div className="mb-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">{project.title}</h1>
              <p className="text-[var(--foreground-muted)] mt-2">{project.date}</p>
            </div>
            
            <div className="flex gap-3">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color4)] text-[var(--foreground)] rounded-md hover:bg-[var(--color2)] transition-colors"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color1)] text-[var(--background)] rounded-md hover:bg-[var(--color3)] transition-colors"
                >
                  <FaExternalLinkAlt /> Ver Site
                </a>
              )}
            </div>
          </div>
          
          {/* Tags de categorias e tecnologias */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.categories.map((category) => (
              <span key={category} className="px-3 py-1 bg-[var(--color1)]/10 text-[var(--color1)] rounded-full text-sm">
                {category}
              </span>
            ))}
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-[var(--color4)] text-[var(--foreground-muted)] rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Imagem principal do projeto */}
        <div className="relative h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={project.image}
            alt={`Imagem principal do projeto ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        {/* Descrição detalhada */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Sobre o Projeto</h2>
          <div className="prose prose-lg max-w-none text-[var(--foreground-muted)]">
            {project.longDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Funcionalidades</h2>
          <ul className="space-y-2 text-[var(--foreground-muted)]">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[var(--color1)] mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desafios e Soluções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Desafios</h2>
            <ul className="space-y-2 text-[var(--foreground-muted)]">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[var(--color1)] mr-2">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Soluções</h2>
            <ul className="space-y-2 text-[var(--foreground-muted)]">
              {project.solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[var(--color1)] mr-2">•</span>
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Galeria de imagens */}
        {project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Galeria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="relative h-[250px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={image}
                    alt={`Captura de tela ${index+1} do projeto ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA - Call to Action */}
        <div className="bg-[var(--color4)] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Gostou deste projeto?</h2>
          <p className="text-[var(--foreground-muted)] mb-6">
            Estou disponível para novos projetos e oportunidades. Entre em contato para discutirmos como posso ajudar a transformar suas ideias em realidade.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-[var(--color1)] text-[var(--background)] rounded-md hover:bg-[var(--color3)] transition-colors"
          >
            Entre em Contato
          </Link>
        </div>
      </div>
    </main>
  );
}
