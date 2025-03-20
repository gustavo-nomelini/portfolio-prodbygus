// Em /src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies = [],
  liveUrl,
  repoUrl,
}) => {
  return (
    <div className="bg-[var(--color4)]/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-[var(--foreground-muted)]">{description}</p>
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
        <Link
          href={liveUrl || repoUrl || '#'}
          className="mt-4 inline-block px-4 py-2 bg-[var(--color1)] text-[var(--background)] rounded-md hover:bg-[var(--color3)] transition-colors"
        >
          Ver projeto
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;

export default ProjectCard;
