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
      <FeaturedSection />
      <ServiceCategories />
      <WhySalonBook />
      <Footer />
    </main>
  );
};

export default HomePage;
