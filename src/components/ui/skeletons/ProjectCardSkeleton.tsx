import Skeleton from '../Skeleton';

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-[var(--color4)]/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Skeleton para a imagem */}
      <Skeleton className="w-full h-48" />

      <div className="p-5 flex-grow flex flex-col">
        {/* Skeleton para o título */}
        <Skeleton className="h-7 w-3/4 mb-4" />

        {/* Skeleton para a descrição - múltiplas linhas */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Skeleton para as tags de tecnologia */}
        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Skeleton para botões */}
        <div className="flex gap-3 mt-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
