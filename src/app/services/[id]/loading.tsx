import { Navbar } from "@/components/shared/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Matches the public service details layout so the page does not jump when the
 * fetched service replaces this placeholder.
 */
export default function ServiceDetailsLoading() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
          <section className="min-w-0 space-y-7">
            <Skeleton className="aspect-video w-full rounded-2xl" />

            <div className="space-y-4">
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-9 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-xl border border-border bg-card p-5"
                >
                  <Skeleton className="size-10 rounded-lg" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-7 w-20" />
                </div>
              ))}
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-card p-5">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </section>

          <aside className="rounded-2xl border border-border bg-card p-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-56" />
            </div>

            <div className="my-6 flex items-center justify-between rounded-xl bg-muted/60 p-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-11 w-full" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>

              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
