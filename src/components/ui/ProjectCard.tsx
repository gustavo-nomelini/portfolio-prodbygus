// Em /src/components/ProjectCard.tsx
import { motion } from 'framer-motion';
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
    <div className="h-full flex flex-col backdrop-blur-sm hover:shadow-xl hover:shadow-[var(--color1)]/10 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Image
            src={image || '/projects/placeholder.jpg'}
            alt={title}
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color2)]/90 to-transparent opacity-70"></div>

        {/* Cyberpunk-style corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--color1)] opacity-80"></div>
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--color1)] opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--color1)] opacity-80"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--color1)] opacity-80"></div>
      </div>

      <div className="p-5 flex-grow flex flex-col relative backdrop-blur-sm bg-[var(--color4)]/30">
        <motion.h3
          className="text-xl font-bold text-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="mt-2 text-[var(--foreground-muted)] line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {technologies &&
            technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-2 py-1 bg-[var(--color2)]/50 text-xs rounded-full text-[var(--foreground-muted)] border border-[var(--color2)]/70"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'var(--color1)',
                  color: 'var(--background)',
                }}
              >
                {tech}
              </motion.span>
            ))}
        </motion.div>

        <div className="mt-auto pt-5 flex flex-col gap-2">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/projects/${id}`}
              className="cyberpunk-btn flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color1)] text-[var(--background)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color3)] focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            >
              <FaInfoCircle className="text-lg" />
              <span>Ver Detalhes</span>
            </Link>
          </motion.div>

          <div className="flex gap-2">
            {liveUrl && (
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyberpunk-btn w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color4)] text-[var(--foreground)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color2)] focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                  aria-label={`Visitar site do projeto ${title}`}
                >
                  <FaExternalLinkAlt />
                  <span>Site</span>
                </a>
              </motion.div>
            )}

            {repoUrl && (
              <motion.div
                className={!liveUrl ? 'w-full' : 'flex-1'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyberpunk-btn w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color4)] text-[var(--foreground)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color2)] focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                  aria-label={`Ver código fonte do projeto ${title} no GitHub`}
                >
                  <FaGithub className="text-lg" />
                  <span>GitHub</span>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
