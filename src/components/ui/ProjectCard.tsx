// Em /src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from 'react-icons/fa';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  technologies,
  liveUrl,
  repoUrl,
}) => {
  return (
    <div className="bg-[var(--color4)]/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-[var(--color1)]/10 hover:scale-[1.01]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || '/projects/placeholder.jpg'}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color2)]/90 to-transparent opacity-70"></div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-[var(--foreground-muted)] line-clamp-3">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies &&
            technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-[var(--color2)] text-xs rounded-full text-[var(--foreground-muted)]"
              >
                {tech}
              </span>
            ))}
        </div>
        <div className="mt-auto pt-5 flex flex-col gap-2">
          <Link
            href={`/projects/${id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color1)] text-[var(--background)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color3)] focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            <FaInfoCircle className="text-lg" />
            <span>Ver Detalhes</span>
          </Link>
          <div className="flex gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color4)] text-[var(--foreground)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color2)] focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                aria-label={`Visitar site do projeto ${title}`}
              >
                <FaExternalLinkAlt />
                <span>Site</span>
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color4)] text-[var(--foreground)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color2)] focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                aria-label={`Ver código fonte do projeto ${title} no GitHub`}
              >
                <FaGithub className="text-lg" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
