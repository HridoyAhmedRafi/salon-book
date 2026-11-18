import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Tag, CalendarDays } from "lucide-react";
import AppointmentForm from "@/components/Appointment/AppointmentForm";
import { getServiceById } from "@/lib/apis/get/services";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

interface ServiceDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ServiceDetailsPage = async ({ params }: ServiceDetailsPageProps) => {
  const { id } = await params;

  const service = await getServiceById(id);
  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#d2a01f]"
        >
          <ArrowLeft className="size-4" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Side - Service Details */}
          <section className="min-w-0 space-y-7">
            {/* Service Image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
              <Image
                src={service.image}
                alt={service.serviceName}
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-[#d2a01f]/10 px-4 py-1.5 text-sm font-semibold text-[#d2a01f]">
                {service.category}
              </span>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {service.serviceName}
              </h1>

              <p className="text-base leading-7 text-muted-foreground">
                {service.description}
              </p>
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#d2a01f]/10 text-[#d2a01f]">
                  <Tag className="size-5" />
                </div>

                <p className="text-sm text-muted-foreground">Service Price</p>

                <p className="mt-1 text-2xl font-bold">৳{service.price}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#d2a01f]/10 text-[#d2a01f]">
                  <Clock3 className="size-5" />
                </div>

                <p className="text-sm text-muted-foreground">
                  Estimated Duration
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {service.duration} minutes
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="size-5 text-[#d2a01f]" />

                <h2 className="text-lg font-semibold">About This Service</h2>
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                Experience professional {service.serviceName.toLowerCase()}{" "}
                service at SalonBook. Book your preferred appointment and enjoy
                a comfortable salon experience with our professional care.
              </p>
            </div>
          </section>

          {/* Right Side - Booking Form */}
          <aside className="lg:sticky lg:top-24">
            {service.status === "active" ? (
              <AppointmentForm
                serviceId={service._id}
                serviceName={service.serviceName}
                price={service.price}
                duration={service.duration}
              />
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-bold">Booking Unavailable</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  This service is currently unavailable for appointment booking.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ServiceDetailsPage;
