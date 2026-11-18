import BannerSection from "@/components/home/BannerSection";
import WhySalonBook from "@/components/home/WhySalonBook";
import { Navbar } from "@/components/shared/Navbar";

const HomePage = () => {
  return (
    <main>
       <Navbar />
      <BannerSection />
      <WhySalonBook />
    </main>
  );
};

export default HomePage;
