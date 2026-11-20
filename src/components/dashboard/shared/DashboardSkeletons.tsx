import { Skeleton } from "@/components/ui/skeleton";

/** Header placeholder used by the dashboard list pages. */
function DashboardHeaderSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-4 w-full max-w-xl" />
    </div>
  );
}

/** Page header plus table rows, used by the dashboard list routes. */
export function DashboardListSkeleton({
  columns = 6,
  rows = 5,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardHeaderSkeleton />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-4 bg-muted/50 px-5 py-3">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-3 flex-1" />
          ))}
        </div>

        <div className="divide-y divide-border">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex items-center gap-4 px-5 py-4">
              {Array.from({ length: columns }).map((_, column) => (
                <Skeleton
                  key={column}
                  className={column === 0 ? "h-10 flex-[1.6]" : "h-4 flex-1"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Stat card placeholders for the admin and customer overviews. */
export function DashboardStatsSkeleton({
  count = 6,
  columns = 3,
}: {
  count?: number;
  columns?: 3 | 4;
}) {
  return (
    <div
      className={
        columns === 4
          ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-28" />
            </div>

            <Skeleton className="size-10 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Form placeholder used while the add-service route is loading. */
export function DashboardFormSkeleton() {
  return (
    <div className="flex w-full justify-center px-4 py-8 md:px-8 md:py-10">
      <div className="w-full max-w-5xl space-y-7">
        <Skeleton className="h-9 w-20" />

        <div className="space-y-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-9 w-64" />
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-6 md:p-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}

          <div className="grid gap-6 sm:grid-cols-2">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>

          <Skeleton className="h-52 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
