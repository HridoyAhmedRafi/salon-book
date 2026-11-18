import ServiceCard from "@/components/browse-services/ServiceCard";
import ServiceFilters from "@/components/browse-services/ServiceFilters";
import { Navbar } from "@/components/shared/Navbar";

import { getServices } from "@/lib/admin-apis/get/services";

interface BrowseServicesProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const BrowseServices = async ({ searchParams }: BrowseServicesProps) => {
  const search = await searchParams;
  const searchValue = typeof search.search === "string" ? search.search : "";

  const categoryValue =
    typeof search.category === "string" ? search.category : "";

  const sortValue = typeof search.sort === "string" ? search.sort : "";

  // Build query string
  const query = new URLSearchParams();

  if (searchValue) query.set("search", searchValue);
  if (categoryValue) query.set("category", categoryValue);
  if (sortValue) query.set("sort", sortValue);

  // Fetch services from backend
  const services = await getServices(query.toString());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6 lg:py-14">
        {/* Page Heading */}
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d2a01f]">
            Discover Our Services
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Browse Our Services
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Explore our professional salon services and find the perfect
            treatment for your needs.
          </p>
        </div>

        {/* Search & Filters */}
        <ServiceFilters
          initialSearch={searchValue}
          initialCategory={categoryValue}
          initialSort={sortValue}
        />

        {/* Results Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-semibold">Available Services</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Find the right service for you.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {services.length} {services.length === 1 ? "service" : "services"}{" "}
            found
          </p>
        </div>

        {/* Service Cards */}
        {services.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border px-5 text-center">
            <h3 className="text-xl font-semibold">No Services Found</h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We couldn&apos;t find any services matching your search. Try
              changing your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseServices;
