"use client";

import { FormEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle, Search, SlidersHorizontal, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ServiceFiltersProps {
  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
}

const ServiceFilters = ({
  initialSearch = "",
  initialCategory = "",
  initialSort = "",
}: ServiceFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  // Update URL with filters
  const updateFilters = (
    searchValue: string,
    categoryValue: string,
    sortValue: string,
  ) => {
    const params = new URLSearchParams();

    if (searchValue) params.set("search", searchValue);
    if (categoryValue) params.set("category", categoryValue);
    if (sortValue) params.set("sort", sortValue);

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(url, { scroll: false });
    });
  };

  // Search by service name
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateFilters(search, category, sort);
  };

  // Category filtering
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateFilters(search, value, sort);
  };

  // Price sorting
  const handleSortChange = (value: string) => {
    setSort(value);
    updateFilters(search, category, value);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");

    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <div
      aria-busy={isPending}
      className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="size-5 text-[#d2a01f]" />

        <h2 className="font-semibold">Search & Filter Services</h2>

        {isPending ? (
          <span
            role="status"
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <LoaderCircle className="size-3.5 animate-spin" />
            Updating results...
          </span>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services by name..."
              className="pl-9"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="gap-2 bg-[#d2a01f] text-white hover:bg-[#b88712]"
          >
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </form>

        {/* Category */}
        <select
          value={category}
          disabled={isPending}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-[#d2a01f] focus-visible:ring-2 focus-visible:ring-[#d2a01f]/20"
        >
          <option value="">All Categories</option>
          <option value="Hair">Hair</option>
          <option value="Skin">Skin</option>
          <option value="Nails">Nails</option>
          <option value="Makeup">Makeup</option>
          <option value="Spa">Spa</option>
          <option value="Other">Other</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          disabled={isPending}
          onChange={(e) => handleSortChange(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-[#d2a01f] focus-visible:ring-2 focus-visible:ring-[#d2a01f]/20"
        >
          <option value="">Sort by Price</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>

        {/* Clear Filters */}
        <Button
          type="button"
          variant="outline"
          onClick={handleClearFilters}
          disabled={isPending}
          className="gap-2"
        >
          <X className="size-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ServiceFilters;
