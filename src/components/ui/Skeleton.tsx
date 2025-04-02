'use client';

import { ReactNode } from 'react';

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', children }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[var(--color4)] via-[var(--color2)] to-[var(--color4)] bg-[length:400%_100%] rounded relative overflow-hidden ${className}`}
      style={{
        animation:
          'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, shimmer 2s infinite linear',
      }}
      aria-hidden="true"
    >
      {/* Cyberpunk glowing edge */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          boxShadow: 'inset 0 0 5px rgba(var(--color1-rgb), 0.5)',
          border: '1px solid rgba(var(--color1-rgb), 0.3)',
        }}
      />
      {children}
    </div>
  );
};

export default Skeleton;
