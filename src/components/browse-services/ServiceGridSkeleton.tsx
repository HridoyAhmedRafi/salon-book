import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder that matches the public service card layout. */
export function ServiceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <Skeleton className="aspect-16/8 w-full rounded-none" />

      <div className="space-y-2 p-2.5">
        <div className="space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-2">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-3 w-14" />
        </div>

        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ServiceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  );
}

/** Results header plus cards, used while the services list is fetching. */
export function ServiceResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>

        <Skeleton className="h-4 w-24" />
      </div>

      <ServiceGridSkeleton count={6} />
    </div>
  );
}
