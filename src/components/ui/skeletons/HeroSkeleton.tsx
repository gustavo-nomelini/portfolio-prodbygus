import Skeleton from '../Skeleton';

const HeroSkeleton = () => {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Skeleton para título */}
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-11/12 max-w-2xl mx-auto mb-4" />
            <Skeleton className="h-14 w-3/4 max-w-xl mx-auto mb-8" />
          </div>

          {/* Skeleton para parágrafo */}
          <div className="max-w-md mx-auto">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-11/12 mb-2" />
            <Skeleton className="h-6 w-4/5" />
          </div>

          {/* Skeleton para botões */}
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Skeleton className="h-12 w-full sm:w-40 rounded-md mb-3 sm:mb-0 sm:mr-3" />
            <Skeleton className="h-12 w-full sm:w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
