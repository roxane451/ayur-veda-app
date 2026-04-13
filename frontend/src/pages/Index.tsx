import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AyurvedaSection from "@/components/AyurvedaSection";
import DoshaCards from "@/components/DoshaCards";
import InteractiveTools from "@/components/InteractiveTools";
import WhyAyurveda from "@/components/WhyAyurveda";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AyurvedaSection />
        <DoshaCards />
        <InteractiveTools />
        <WhyAyurveda />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
