import Skeleton from '../Skeleton';

const ContactSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-5 w-full max-w-lg mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="space-y-6">
          {/* Campos */}
          <Skeleton className="h-12 w-full rounded mb-6" />
          <Skeleton className="h-12 w-full rounded mb-6" />
          <Skeleton className="h-12 w-full rounded mb-6" />
          <Skeleton className="h-32 w-full rounded mb-6" />
          <Skeleton className="h-12 w-40 rounded" />
        </div>

        {/* Informações de contato */}
        <div className="space-y-8">
          <Skeleton className="h-8 w-48 mb-4" />

          {/* Email */}
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <Skeleton className="h-6 w-48" />
          </div>

          {/* Telefone */}
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <Skeleton className="h-6 w-36" />
          </div>

          {/* Localização */}
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <Skeleton className="h-6 w-52" />
          </div>

          {/* Mapa */}
          <Skeleton className="h-64 w-full rounded-lg mt-8" />
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
