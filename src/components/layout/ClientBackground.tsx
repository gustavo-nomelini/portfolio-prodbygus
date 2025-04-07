'use client';

import GlobalBackground from '@/components/ui/GlobalBackground';

// Este componente já não precisa usar dynamic import porque
// GlobalBackground já está usando dynamic import com ssr: false internamente
export default function ClientBackground() {
  return <GlobalBackground />;
}
