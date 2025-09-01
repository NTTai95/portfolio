import HeroSection from "@/components/landing/hero-section";
import BenefitSection from "@/components/landing/benefit-section";
import FeaturedFreelancers from "@/components/landing/featured-freelancer";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import FinalCTASection from "@/components/landing/final-cta-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-oxford to-ocean">
      <HeroSection />
      <BenefitSection />
      <FeaturedFreelancers />
      <HowItWorksSection />
      <FinalCTASection />
    </main>
  );
}
