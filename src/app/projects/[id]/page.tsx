'use client';

import ClientOnly from '@/components/layout/ClientOnly';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string; // Descrição mais longa para a página de detalhes
  image: string;
  categories: string[];
  technologies: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  repoUrl: string;
  challenges?: string[]; // Desafios do projeto
  solutions?: string[]; // Soluções implementadas
  screenshots?: string[]; // Capturas de tela adicionais
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        // Simulando atraso
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Dados de exemplo - adicione os novos projetos também aqui
        const mockProjects: Project[] = [
          {
            id: '1',
            title: 'E-commerce Platform',
            description:
              'Um e-commerce completo com sistema de pagamentos, carrinho e painel admin.',
            detailedDescription: `Este projeto é uma plataforma de e-commerce completa desenvolvida com React e Next.js no front-end e Node.js com Express no back-end. A plataforma inclui funcionalidades como:

- Sistema de autenticação com JWT e OAuth
- Carrinho de compras persistente
- Integração com gateway de pagamento Stripe
- Painel de administração para gerenciamento de produtos
- Sistema de avaliações e comentários
- Filtros avançados de produtos
- Interface responsiva para todos os dispositivos
            
A arquitetura do projeto seguiu princípios SOLID e foi implementada utilizando TypeScript para garantir tipagem estática e maior segurança no código.`,
            image: '/projects/ecommerce.jpg',
            categories: ['Full Stack'],
            technologies: [
              'React',
              'Next.js',
              'Stripe',
              'MongoDB',
              'Node.js',
              'Express',
              'TypeScript',
              'Tailwind CSS',
            ],
            github: 'https://github.com/example',
            liveUrl: 'https://example.com',
            featured: true,
            repoUrl: 'https://github.com/example',
            challenges: [
              'Implementar um sistema de carrinho que persista entre sessões',
              'Integrar múltiplos métodos de pagamento de forma segura',
              'Otimizar o desempenho para um grande catálogo de produtos',
              'Criar um sistema robusto de gerenciamento de estoque',
            ],
            solutions: [
              'Utilizei localStorage e Context API para persistência do carrinho',
              'Implementei a API do Stripe com webhooks para confirmação segura',
              'Apliquei virtualização e paginação para carregamento eficiente',
              'Desenvolvi um sistema de cache com invalidação inteligente',
            ],
            screenshots: [
              '/projects/ecommerce-1.jpg',
              '/projects/ecommerce-2.jpg',
              '/projects/ecommerce-3.jpg',
            ],
          },
          {
            id: '2',
            title: 'Dashboard Analytics',
            description:
              'Dashboard interativo para visualização de dados com gráficos e filtros avançados.',
            detailedDescription: `Este dashboard analítico permite que empresas visualizem seus dados de vendas, tráfego e conversão em tempo real. Desenvolvido com React e várias bibliotecas de visualização de dados.
            
O dashboard inclui:
- Gráficos interativos e personalizáveis
- Filtros avançados por data, região e produto
- Relatórios exportáveis em PDF e Excel
- Alertas configuráveis para metas de desempenho
- Tema claro/escuro adaptável`,
            image: '/projects/dashboard.jpg',
            categories: ['Frontend'],
            technologies: [
              'React',
              'Chart.js',
              'D3.js',
              'Tailwind CSS',
              'Redux',
            ],
            github: 'https://github.com/example',
            liveUrl: 'https://example.com',
            featured: false,
            repoUrl: 'https://github.com/example',
            challenges: [
              'Renderizar gráficos complexos de forma eficiente',
              'Implementar filtros que afetam múltiplos componentes',
              'Garantir uma UX intuitiva para análise de dados',
            ],
            solutions: [
              'Utilizei memoização e renderização condicional para otimizar performance',
              'Implementei gerenciamento de estado com Redux para sincronizar filtros',
              'Realizei testes de usabilidade com usuários reais para refinar a interface',
            ],
          },
          {
            id: '3',
            title: 'API RESTful',
            description:
              'API completa com autenticação, validação e documentação automática.',
            detailedDescription: `Esta API RESTful foi desenvolvida para servir como backend para várias aplicações front-end. Construída com Node.js, Express e MongoDB, a API implementa:

- Autenticação completa com JWT e refresh tokens
- Autorização baseada em funções (RBAC)
- Validação de entrada com Joi
- Documentação automática com Swagger
- Testes automatizados com Jest
- Monitoramento e logging
- Cache com Redis
            
A arquitetura foi projetada para ser escalável, seguindo princípios de Clean Architecture e Domain-Driven Design.`,
            image: '/projects/api.jpg',
            categories: ['Backend'],
            technologies: [
              'Node.js',
              'Express',
              'MongoDB',
              'Swagger',
              'Jest',
              'Redis',
            ],
            github: 'https://github.com/example',
            liveUrl: 'https://example.com',
            featured: true,
            repoUrl: 'https://github.com/example',
            challenges: [
              'Implementar um sistema de autenticação seguro',
              'Otimizar consultas ao banco de dados para alta carga',
              'Criar uma estrutura que facilitasse testes e manutenção',
            ],
            solutions: [
              'Utilizei JWT com rotação de tokens e armazenamento seguro',
              'Implementei índices e agregações otimizadas no MongoDB',
              'Adotei uma arquitetura em camadas com injeção de dependências',
            ],
          },
          {
            id: '4',
            title: 'Algoritmos de Machine Learning',
            description:
              'Biblioteca de algoritmos de machine learning implementados do zero para fins educacionais.',
            detailedDescription: `Este projeto consiste em uma implementação manual de diversos algoritmos populares de machine learning, criado com propósitos educacionais para entender profundamente como esses algoritmos funcionam por baixo dos panos.
            
A biblioteca inclui implementações dos seguintes algoritmos:
- Regressão Linear e Logística
- K-Nearest Neighbors (KNN)
- Support Vector Machines (SVM)
- Árvores de Decisão
- Random Forests
- K-Means Clustering
- Principal Component Analysis (PCA)

Cada algoritmo é implementado com visualizações detalhadas e exemplos de uso, permitindo aos estudantes de ciência de dados entender os princípios matemáticos subjacentes e como eles funcionam com dados reais.`,
            image: '/projects/placeholder.jpg',
            categories: ['Backend', 'Data Science'],
            technologies: [
              'Python',
              'NumPy',
              'Pandas',
              'Scikit-learn',
              'Jupyter',
              'Matplotlib',
            ],
            featured: false,
            repoUrl: 'https://github.com/example/ml-algorithms',
            challenges: [
              'Implementar algoritmos complexos de maneira didática e eficiente',
              'Criar visualizações claras do funcionamento interno dos algoritmos',
              'Otimizar o desempenho para conjuntos de dados maiores',
            ],
            solutions: [
              'Desenvolvi implementações passo a passo com documentação extensa',
              'Utilizei Matplotlib e Seaborn para criar visualizações interativas',
              'Apliquei técnicas de vetorização do NumPy para melhorar a performance',
            ],
          },
          {
            id: '5',
            title: 'CLI para Automação de DevOps',
            description:
              'Ferramenta de linha de comando para automatizar tarefas comuns de DevOps e CI/CD.',
            detailedDescription: `Esta ferramenta CLI foi desenvolvida para automatizar fluxos de trabalho DevOps comuns, ajudando equipes de desenvolvimento a economizar tempo em tarefas repetitivas.
            
Principais funcionalidades:
- Automação de deploy em múltiplos ambientes (dev, staging, production)
- Gerenciamento de infraestrutura como código
- Monitoramento e logs centralizados
- Configuração e orquestração de contêineres Docker
- Integração com GitHub, GitLab e Bitbucket
- Relatórios automáticos de desempenho

A ferramenta é altamente extensível através de um sistema de plugins, permitindo que equipes criem funcionalidades específicas para seus fluxos de trabalho.`,
            image: '/projects/cli-tool.jpg',
            categories: ['Backend', 'DevOps'],
            technologies: [
              'TypeScript',
              'Node.js',
              'Docker',
              'GitHub Actions',
              'Kubernetes',
              'AWS SDK',
            ],
            featured: true,
            repoUrl: 'https://github.com/example/devops-cli',
            challenges: [
              'Criar uma ferramenta extensível que atenda a diversas necessidades de DevOps',
              'Garantir segurança nas operações automatizadas',
              'Manter compatibilidade com diversos sistemas e serviços cloud',
            ],
            solutions: [
              'Implementei uma arquitetura de plugins baseada em comandos',
              'Desenvolvi um sistema de credenciais seguro com criptografia',
              'Criei adaptadores para múltiplas plataformas (AWS, GCP, Azure, etc.)',
            ],
          },
          {
            id: '6',
            title: 'Chá de Panela - Convite Digital',
            description:
              'Site interativo desenvolvido como convite digital para meu chá de panela, com contagem regressiva, galeria de fotos e RSVP.',
            detailedDescription: `Este projeto foi criado como um convite digital interativo para meu chá de panela, programado para acontecer em 19 de Abril de 2025. O site serve como uma alternativa moderna aos convites tradicionais, permitindo que os convidados obtenham informações sobre o evento e confirmem sua presença.

O design foi inspirado em uma temática de chá, com elementos visuais relacionados como bules, xícaras e vapor, implementados através de animações CSS e SVG para criar uma experiência acolhedora e elegante.

Principais características do projeto:
- Design temático com paleta de cores inspirada em chá (tons de marrom, bege e branco)
- Contagem regressiva até a data do evento
- Galeria de fotos com navegação interativa
- Formulário para confirmação de presença (RSVP)
- Seção para contribuições com QR Code do PIX
- Responsividade completa (mobile, tablet, desktop)
- Animações e efeitos visuais (fade-in, flutuação, vapor e estrelas cadentes)`,
            image: '/projects/cha-de-panela.jpg',
            categories: ['Frontend', 'Design'],
            technologies: [
              'HTML',
              'CSS',
              'JavaScript',
              'Tailwind CSS',
              'Animações CSS',
              'Design Responsivo',
            ],
            liveUrl: 'https://gustavo-nomelini.github.io/cha-de-panela/',
            featured: true,
            repoUrl: 'https://github.com/gustavo-nomelini/cha-de-panela',
            challenges: [
              'Criar uma experiência imersiva e temática usando apenas HTML, CSS e JavaScript',
              'Implementar animações suaves e eficientes sem comprometer a performance',
              'Desenvolver um design completamente responsivo para todos os tamanhos de tela',
              'Integrar um sistema de RSVP funcional para confirmação de presença',
            ],
            solutions: [
              'Utilizei técnicas avançadas de CSS, incluindo animações keyframe personalizadas',
              'Implementei efeitos visuais como glassmorphism para um design moderno',
              'Criei um layout fluido com Tailwind CSS para garantir responsividade',
              'Desenvolvi um carousel de imagens interativo com navegação touch para dispositivos móveis',
            ],
            screenshots: [
              '/projects/cha-de-panela-1.jpg', // Você precisará adicionar estas imagens
              '/projects/cha-de-panela-2.jpg',
              '/projects/cha-de-panela-3.jpg',
            ],
          },
        ];

        const projectData = mockProjects.find((p) => p.id === id);
        if (projectData) {
          setProject(projectData);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do projeto:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse w-16 h-16 border-4 border-[var(--color1)] border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="animate-pulse w-16 h-16 border-4 border-[var(--color1)] border-t-transparent rounded-full"></div>
          </div>
        ) : !project ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Projeto não encontrado</h2>
            <Link
              href="/projects"
              className="text-[var(--color1)] hover:underline flex items-center gap-2"
            >
              <FaArrowLeft /> Voltar para projetos
            </Link>
          </div>
        ) : (
          <>
            {/* Navegação de volta */}
            <div className="mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors"
              >
                <FaArrowLeft /> Voltar para todos os projetos
              </Link>
            </div>

            {/* Cabeçalho do projeto */}
            <div className="relative rounded-xl overflow-hidden mb-10 h-[40vh] md:h-[50vh]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)]">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--color1)]/80 text-[var(--background)] rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                    Sobre o Projeto
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    {project.detailedDescription
                      ?.split('\n\n')
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-[var(--foreground-muted)] mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </section>

                {project.challenges?.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                      Desafios & Soluções
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-medium mb-4 text-[var(--color1)]">
                          Desafios
                        </h3>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-[var(--foreground-muted)]"
                            >
                              <span className="text-[var(--color1)] mt-1">
                                •
                              </span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-4 text-[var(--color1)]">
                          Soluções
                        </h3>
                        <ul className="space-y-2">
                          {project.solutions?.map((solution, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-[var(--foreground-muted)]"
                            >
                              <span className="text-[var(--color1)] mt-1">
                                •
                              </span>
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {project.screenshots && project.screenshots.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
                      Screenshots
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.screenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          className="relative h-64 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={screenshot}
                            alt={`Screenshot ${index + 1} of ${project.title}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div>
                <div className="bg-[var(--color4)]/30 rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">
                    Tecnologias
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--color2)] text-sm rounded-full text-[var(--foreground-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-[var(--color1)] text-[var(--background)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color3)] w-full"
                      >
                        <FaExternalLinkAlt />
                        <span>Ver Site do Projeto</span>
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-[var(--color4)] text-[var(--foreground)] font-medium rounded-md transition-all duration-300 hover:bg-[var(--color2)] w-full"
                      >
                        <FaGithub className="text-lg" />
                        <span>Ver no GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ClientOnly>
  );
}
