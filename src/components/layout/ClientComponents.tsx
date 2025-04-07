'use client';

import CustomCursor from '@/components/ui/CustomCursor';

// Este componente não precisa mais usar dynamic import porque
// CustomCursor já está usando dynamic import com ssr: false internamente
export function ClientCursor() {
  return <CustomCursor />;
}
