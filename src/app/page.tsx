'use client';

import AnimatedLayout from '@/components/layout/AnimatedLayout';
import Hero from '@/components/sections/Hero';
import HeroSkeleton from '@/components/ui/skeletons/HeroSkeleton';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <AnimatedLayout>
          <Hero keepBackgroundElements={false} />
        </AnimatedLayout>
      )}
    </div>
  );
}
