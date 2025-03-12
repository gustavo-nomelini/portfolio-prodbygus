// Em /src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

const ProjectCard = ({ title, description, image, tags, url }: ProjectCardProps) => {
  return (
    <div className="bg-[var(--color4)] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[var(--foreground)]">{title}</h3>
        <p className="mt-2 text-[var(--foreground-muted)]">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-[var(--color2)] text-xs rounded-full text-[var(--foreground-muted)]">
              {tag}
            </span>
          ))}
        </div>
        <Link href={url} className="mt-4 inline-block px-4 py-2 bg-[var(--color1)] text-[var(--background)] rounded-md hover:bg-[var(--color3)] transition-colors">
          Ver projeto
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;