'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  homeElement = 'Home',
  separator = '/',
  containerClasses = 'py-4 px-4 flex',
  listClasses = 'flex items-center space-x-2 text-sm',
  activeClasses = 'text-[var(--color1)] font-medium',
  capitalizeLinks = true,
}) => {
  const paths = usePathname();

  // Não exibir breadcrumbs na home
  if (paths === '/') return null;

  const pathNames = paths.split('/').filter((path) => path);

  // Gerar as partes do breadcrumb
  const breadcrumbs = pathNames.map((name, index) => {
    const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathNames.length - 1;
    const displayName = capitalizeLinks
      ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
      : name.replace(/-/g, ' ');

    return {
      name: displayName,
      routeTo,
      isLast,
    };
  });

  // Gerar o JSON-LD para breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://prodbygus.com',
      },
      ...breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `https://prodbygus.com${crumb.routeTo}`,
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumbs" className={containerClasses}>
      <ol className={listClasses}>
        <li>
          <Link href="/" className="hover:text-[var(--color3)]">
            {homeElement}
          </Link>
        </li>

        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center">
            <span className="mx-2 text-[var(--foreground-muted)]">
              {separator}
            </span>
            {crumb.isLast ? (
              <span className={activeClasses}>{crumb.name}</span>
            ) : (
              <Link href={crumb.routeTo} className="hover:text-[var(--color3)]">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* JSON-LD script para breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
};

export default Breadcrumbs;
