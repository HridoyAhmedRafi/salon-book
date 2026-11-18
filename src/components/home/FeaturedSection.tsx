import { getFeaturedServices } from "@/lib/apis/get/services";
import ServiceCard from "../browse-services/ServiceCard";

const FeaturedSection = async () => {
  const services = await getFeaturedServices();
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedSection;
