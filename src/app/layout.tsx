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
  description: 'Web developer and designer portfolio',
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