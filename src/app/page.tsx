import { Suspense } from "react";

import { ServiceGridSkeleton } from "@/components/browse-services/ServiceGridSkeleton";
import BannerSection from "@/components/home/BannerSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import ServiceCategories from "@/components/home/ServiceCategories";
import WhySalonBook from "@/components/home/WhySalonBook";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <BannerSection />
      <Suspense fallback={<FeaturedServicesFallback />}>
        <FeaturedSection />
      </Suspense>
      <ServiceCategories />
      <WhySalonBook />
      <Footer />
    </main>
  );
};

function FeaturedServicesFallback() {
  return (
    <div className="mx-auto mt-20 w-full max-w-6xl px-4">
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#d2a01f] uppercase">
            Your Beauty, Our Passion
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured Services
          </h2>
        </div>

        <ServiceGridSkeleton count={3} />
      </div>
    </div>
  );
}

export default HomePage;
