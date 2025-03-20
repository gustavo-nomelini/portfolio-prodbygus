'use client';

import Image from 'next/image';
import { useState } from 'react';
import Skeleton from './Skeleton';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  );
};

export default ImageWithSkeleton;
