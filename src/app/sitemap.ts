import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prodbygus.com';
  
  const routes = [
    '',
    '/about',
    '/projects',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // Adicione as páginas de projetos dinamicamente
  const projects = ['portfolio', 'ecommerce', 'api-rest']; // Atualize com IDs reais
  
  const projectRoutes = projects.map(id => ({
    url: `${baseUrl}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
