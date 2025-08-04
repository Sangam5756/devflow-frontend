"use client";

import {
  
  Code2,
  Globe,
} from "lucide-react";
import HeroSection from "@/components/Landing/HeroSection";
import FeatureSection from "@/components/Landing/FeaturesSection";
import StatsSection from "@/components/Landing/StatsSection";
import CTASection from "@/components/Landing/CTASection";

export default function LandingPage() {
 
  const tags = [
    "JavaScript",
    "React",
    "TypeScript",
    "Python",
    "Next.js",
    "Node.js",
    "CSS",
    "HTML",
  ];

  return (
    <div className="min-h-screen bg-[#0d1327] text-[#D1D5DB] flex flex-col">
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
