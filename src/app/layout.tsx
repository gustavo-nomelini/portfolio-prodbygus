import ClientBackground from '@/components/layout/ClientBackground';
import { ClientCursor } from '@/components/layout/ClientComponents';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Bai_Jamjuree, Fira_Code } from 'next/font/google';
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

// Configuração da fonte Bai Jamjuree - para texto principal
const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-bai-jamjuree',
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
    <html
      lang="pt-BR"
      className={`${firaCode.variable} ${baiJamjuree.variable}`}
    >
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
      <body
        className={`font-sans 
                  transition-colors duration-150 
                  min-h-screen flex flex-col overflow-x-hidden 
                  no-scrollbar relative`}
        suppressHydrationWarning
      >
        {/* Cyberpunk grid como fundo para o tema escuro (apenas visível nesse tema) */}
        <div className="dark:block hidden">
          <div className="fixed inset-0 cyberpunk-grid opacity-10 z-[-1]"></div>
          {/* Glow central */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square rounded-full bg-[var(--color1)]/5 blur-[120px] z-[-1]"></div>
          {/* Outros glows */}
          <div className="fixed top-0 left-0 w-1/2 aspect-square rounded-full bg-[var(--color1)]/5 blur-[120px] z-[-1]"></div>
          <div className="fixed bottom-0 right-0 w-1/2 aspect-square rounded-full bg-[var(--color3)]/5 blur-[120px] z-[-1]"></div>
        </div>

        <Header />

        <main className="flex-grow relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 pb-20 sm:pb-16">
          {children}
        </main>

        <Footer />

        {/* Background Particles Animation */}
        <ClientBackground />

        <ClientCursor />
      </body>
    </html>
  );
}
