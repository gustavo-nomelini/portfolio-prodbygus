'use client';

import dynamic from 'next/dynamic';

// Import cursor with client-side rendering only
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
});

export function ClientCursor() {
  return <CustomCursor />;
}
