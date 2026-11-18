import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BANNER_IMAGE = "/images/salon-banner.jpg";

const BannerSection = () => {
  return (
    <section className="relative isolate flex min-h-128 items-center overflow-hidden lg:min-h-160">
      <Image
        src={BANNER_IMAGE}
        alt="Warmly lit salon interior with styling chairs and mirrors"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay keeps the text readable on top of the photo. */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-24">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          SalonBook
        </p>

        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your best look starts here.
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
          A neighbourhood salon for cuts, colour, and styling. Choose a
          package, pick a time, and we&apos;ll take care of the rest.
        </p>

        <Link
          href="/services"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 px-5 shadow-sm hover:shadow-md"
          )}
        >
          Explore Salon Services
        </Link>
      </div>
    </section>
  );
};

export default BannerSection;
