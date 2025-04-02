import ClientBackground from '@/components/layout/ClientBackground';
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
    'design ui/ux',
    'front-end',
    'back-end',
    'javascript',
    'typescript',
  ],
  authors: [{ name: 'Gustavo Lopes Nomelini' }],
  creator: 'Gustavo Lopes Nomelini',
  publisher: 'Prod by GUS',
  metadataBase: new URL('https://portfolio-prodbygus.vercel.app'),
  alternates: {
    canonical: 'https://portfolio-prodbygus.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://portfolio-prodbygus.vercel.app',
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
    creator: '@gustavonomelini',
    site: '@gustavonomelini',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code', // Substitua pelo seu código quando tiver
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
              url: 'https://portfolio-prodbygus.vercel.app',
              jobTitle: 'Full Stack Web Developer',
              sameAs: [
                'https://github.com/gustavo-nomelini',
                'https://linkedin.com/in/gustavo-lopes-nomelini-144bb1212',
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
              image: 'https://portfolio-prodbygus.vercel.app/profile-image.jpg',
            }),
          }}
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className={`${firaCode.className} hide-default-cursor`}>
        {/* Persistent Global Background */}
        <ClientBackground />

        <div className="min-h-screen flex flex-col bg-transparent text-foreground">
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
