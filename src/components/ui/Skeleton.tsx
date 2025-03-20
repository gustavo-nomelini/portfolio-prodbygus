'use client';

import { ReactNode } from 'react';

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', children }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[var(--color4)] via-[var(--color2)] to-[var(--color4)] bg-[length:400%_100%] rounded ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

export default Skeleton;
