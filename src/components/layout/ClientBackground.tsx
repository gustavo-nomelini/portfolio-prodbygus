'use client';

import dynamic from 'next/dynamic';

// Import the GlobalBackground with ssr:false in a client component
const GlobalBackground = dynamic(() => import('../ui/GlobalBackground'), {
  ssr: false,
});

export default function ClientBackground() {
  return <GlobalBackground />;
}
