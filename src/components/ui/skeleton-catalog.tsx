
import { Skeleton } from "@/components/ui/skeleton";

export const CatalogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

export const HeroSlideSkeleton = () => {
  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px]">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-2xl px-4">
          <Skeleton className="h-8 md:h-12 w-3/4 mx-auto bg-white/20" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
          <Skeleton className="h-4 w-2/3 mx-auto bg-white/20" />
          <Skeleton className="h-10 w-32 mx-auto bg-white/20" />
        </div>
      </div>
    </div>
  );
};
