import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--background)] p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative h-32 w-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-[var(--color1)]/20 rounded-full animate-pulse-glow"></div>
            <FaExclamationTriangle className="h-16 w-16 text-[var(--color1)]" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--color1)] mb-6">Página não encontrada</h2>
        <p className="text-[var(--foreground-muted)] mb-8">
          Parece que você está procurando por uma página que não existe ou foi movida.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-md bg-[var(--color1)] text-[var(--background)] hover:bg-[var(--color3)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color1)] focus:ring-offset-2"
        >
          <FaHome className="mr-2" aria-hidden="true" />
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
