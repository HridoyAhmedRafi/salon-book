import { ServiceResultsSkeleton } from "@/components/browse-services/ServiceGridSkeleton";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

/** Route-level placeholder shown while the browse-services page is fetched. */
export default function BrowseServicesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6 lg:py-14">
        {/* Page Heading */}
        <div className="space-y-3 text-center">
          <Skeleton className="mx-auto h-4 w-44" />
          <Skeleton className="mx-auto h-10 w-80 max-w-full" />
          <Skeleton className="mx-auto h-4 w-full max-w-2xl" />
        </div>

        {/* Search & Filters */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-52" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Results */}
        <ServiceResultsSkeleton />
      </main>

      <Footer />
    </div>
  );
}
