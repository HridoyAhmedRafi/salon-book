import Link from "next/link";
import {
  Scissors,
  Sparkles,
  Hand,
  Palette,
  Flower2,
  Heart,
} from "lucide-react";

const categories = [
  {
    name: "Hair",
    label: "Hair",
    description: "Cuts & styling",
    icon: Scissors,
  },
  {
    name: "Skin",
    label: "Skin Care",
    description: "Facial & skincare",
    icon: Sparkles,
  },
  {
    name: "Nails",
    label: "Nail Care",
    description: "Manicure & pedicure",
    icon: Hand,
  },
  {
    name: "Makeup",
    label: "Makeup",
    description: "Beauty & glam",
    icon: Palette,
  },
  {
    name: "Spa",
    label: "Spa & Massage",
    description: "Relax & recharge",
    icon: Flower2,
  },
  {
    name: "Other",
    label: "Other",
    description: "More experiences",
    icon: Heart,
  },
];

const ServiceCategories = () => {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 md:py-20">
      {/* Section Heading */}
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d2a01f]">
          Explore Our Services
        </p>

        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Browse by Category
            </h2>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
              Find the right treatment for your beauty and self-care needs.
              Explore our services by category.
            </p>
          </div>

          <Link
            href="/services"
            className="w-fit text-sm font-semibold text-[#d2a01f] transition-colors hover:text-[#b88712]"
          >
            Explore All Services
          </Link>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="group flex min-h-36 flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d2a01f]/50 hover:shadow-lg"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#d2a01f]/10 text-[#d2a01f] transition-colors duration-300 group-hover:bg-[#d2a01f] group-hover:text-white">
                <Icon className="size-5" />
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#d2a01f]">
                  {category.label}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceCategories;
