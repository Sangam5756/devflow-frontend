import HeroSection from "@/components/Landing/HeroSection";
import FeatureSection from "@/components/Landing/FeaturesSection";
import StatsSection from "@/components/Landing/StatsSection";
import CTASection from "@/components/Landing/CTASection";

export default function LandingPage() {
 
 
  return (
    <div className="min-h-screen bg-[#030711] text-[#D1D5DB] flex flex-col">
      {/* Hero Section */}
      <HeroSection/>      

      {/* Features Section */}
        <FeatureSection/>

      {/* Stats Section */}
     <StatsSection/>

      {/* Call To Action */}
      <CTASection/>

      {/* Footer */}
    
    </div>
  );
}
