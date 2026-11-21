import { CircleAlert, Scissors } from "lucide-react";

import { RetryButton } from "@/components/shared/RetryButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getFeaturedServices } from "@/lib/apis/get/services";
import type { IServicePost } from "@/types/service";

import ServiceCard from "../browse-services/ServiceCard";

const FeaturedSection = async () => {
  let services: IServicePost[] = [];
  let loadFailed = false;

  try {
    services = await getFeaturedServices();
  } catch {
    loadFailed = true;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 mt-20">
      <section className="space-y-8">
        {/* Section Heading */}
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d2a01f]">
            Your Beauty, Our Passion
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured Services
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            From refreshing beauty treatments to expert salon care, explore our
            handpicked services designed to help you look and feel your best.
          </p>
        </div>

        {/* Service Cards */}
        {loadFailed ? (
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Could not load featured services</AlertTitle>
            <AlertDescription>
              <p>
                The featured services are unavailable right now. You can still
                browse the full list.
              </p>
              <RetryButton className="mt-3" />
            </AlertDescription>
          </Alert>
        ) : services.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-5 py-14 text-center">
            <Scissors className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No featured services are available right now.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FeaturedSection;
