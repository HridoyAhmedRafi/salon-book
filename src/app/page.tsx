import BannerSection from "@/components/home/BannerSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import WhySalonBook from "@/components/home/WhySalonBook";
import { Navbar } from "@/components/shared/Navbar";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <BannerSection />
      <FeaturedSection />
      <WhySalonBook />
    </main>
  );
};

export default HomePage;
