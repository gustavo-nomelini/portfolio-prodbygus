import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

// Importação dinâmica dos componentes client-side
const Header = dynamic(() => import('@/components/layout/Header'), { ssr: true });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: true });

// Configuração da fonte Fira Code - popular entre desenvolvedores
const firaCode = Fira_Code({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'Prod by GUS - Portfolio',
  description: 'Desenvolvedor web full-stack especializado em criar sites e aplicativos modernos com excelente experiência do usuário',
  keywords: ['desenvolvedor web', 'full-stack', 'portfolio', 'react', 'next.js'],
  authors: [{ name: 'Gustavo Lopes Nomelini' }],
  creator: 'Gustavo Lopes Nomelini',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://prodbygus.com',
    title: 'Prod by GUS - Portfolio de Desenvolvedor Web',
    description: 'Desenvolvedor web full-stack especializado em criar sites e aplicativos modernos com excelente experiência do usuário',
    siteName: 'Prod by GUS',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prod by GUS Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prod by GUS - Portfolio de Desenvolvedor Web',
    description: 'Desenvolvedor web full-stack especializado em criar sites e aplicativos modernos com excelente experiência do usuário',
    creator: '@seutwitter',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={firaCode.variable}>
      <body className={firaCode.className}>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}