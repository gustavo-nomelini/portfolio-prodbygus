import { MetadataRoute } from 'next';

// Base URL para todas as URLs no sitemap
const BASE_URL = 'https://portfolio-prodbygus.vercel.app';

// Função para obter a data da última modificação
const getLastModified = (): string => {
  return new Date().toISOString();
};

// Lista de rotas estáticas da aplicação
const staticRoutes = [
  {
    url: '/',
    lastModified: getLastModified(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: '/about',
    lastModified: getLastModified(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: '/projects',
    lastModified: getLastModified(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: '/contact',
    lastModified: getLastModified(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
];

// Função para gerar o sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obter projetos dinâmicos (exemplo - simule a obtenção dos dados)
  // Em um caso real, você buscaria isso de uma API ou banco de dados
  const projectsData = [
    { id: 'projeto-1', updatedAt: new Date().toISOString() },
    { id: 'projeto-2', updatedAt: new Date().toISOString() },
    { id: 'projeto-3', updatedAt: new Date().toISOString() },
  ];

  // Gerar rotas de projetos dinâmicos
  const projectRoutes = projectsData.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Combinar rotas estáticas e dinâmicas
  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route.url}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency as
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'daily'
        | 'hourly'
        | 'always'
        | 'never',
      priority: route.priority,
    })),
    ...projectRoutes,
  ];
}
