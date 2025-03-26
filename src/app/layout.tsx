import { ClientCursor } from '@/components/layout/ClientComponents';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Fira_Code } from 'next/font/google';
import './globals.css';

// Importação dinâmica dos componentes client-side
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: true,
});
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: true,
});

// Configuração da fonte Fira Code - popular entre desenvolvedores
const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'Prod by GUS - Portfolio',
  description:
    'Desenvolvedor web full-stack especializado em criar sites e aplicativos modernos com excelente experiência do usuário',
  keywords: [
    'desenvolvedor web',
    'full-stack',
    'portfolio',
    'react',
    'next.js',
  ],
  authors: [{ name: 'Gustavo Lopes Nomelini' }],
  creator: 'Gustavo Lopes Nomelini',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://prodbygus.com',
    title: 'Prod by GUS - Portfolio de Desenvolvedor Web',
    description:
      'Desenvolvedor web full-stack especializado em criar sites e aplicativos modernos com excelente experiência do usuário',
    siteName: 'Prod by GUS',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prod by GUS Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prod by GUS - Portfolio de Desenvolvedor Web',
    description:
      'Desenvolvedor web full-stack especializado em criar sites e aplicativos modernos com excelente experiência do usuário',
    creator: '@seutwitter',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={firaCode.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Gustavo Lopes Nomelini',
              url: 'https://prodbygus.com',
              jobTitle: 'Full Stack Web Developer',
              sameAs: [
                'https://github.com/seu-usuario',
                'https://linkedin.com/in/seu-usuario',
                'https://twitter.com/seutwitter',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Prod by GUS',
              },
              knowsAbout: [
                'Web Development',
                'React',
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Node.js',
              ],
              image: 'https://prodbygus.com/profile-image.jpg',
            }),
          }}
        />
      </head>
      <body className={firaCode.className}>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <main id="main-content" className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <ClientCursor />
        </div>
      </body>
    </html>
  );
}
