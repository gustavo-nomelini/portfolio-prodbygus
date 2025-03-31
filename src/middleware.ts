import { NextResponse } from 'next/server';

export function middleware() {
  // Obter a resposta e adicionar cabeçalhos
  const response = NextResponse.next();

  // Domínio principal
  const mainDomain = 'https://portfolio-prodbygus.vercel.app';

  // Configurações CORS básicas
  response.headers.set('Access-Control-Allow-Origin', mainDomain);
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization',
  );
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Cabeçalhos de segurança e performance
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permitir use of web fonts se servidos de CDN, Google Fonts, etc.
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');

  return response;
}

// Aplicar middleware apenas nas APIs
export const config = {
  matcher: '/api/:path*',
};
