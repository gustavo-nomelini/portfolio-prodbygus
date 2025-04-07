'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import ParticlesEffect with SSR disabled
const ParticlesEffect = dynamic(() => import('./ParticlesEffect'), {
  ssr: false,
});

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);

  // Only run the effect on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color1)]/10 to-[var(--color3)]/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[var(--color1)]/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color3)]/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color1)]/10 rounded-full filter blur-[60px]"></div>
      </div>

      {/* Cyberpunk Grid Lines */}
      <div className="absolute inset-0 cyberpunk-grid opacity-20"></div>

      {/* Particles Effect */}
      <ParticlesEffect />
    </div>
  );
}
