"use client";

import { useState, useEffect, ReactNode } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Ou um placeholder básico para evitar salto de layout
  }

  return <>{children}</>;
}
