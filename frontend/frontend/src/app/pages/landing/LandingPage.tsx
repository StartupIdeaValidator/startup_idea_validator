import NavBar        from "./components/NavBar";
import Footer        from "./components/Footer";
import HeroSection   from "./sections/HeroSection";
import AppMockup     from "./sections/AppMockup";
import FeaturesSection    from "./sections/FeaturesSection";
import HowItWorksSection  from "./sections/HowItWorksSection";
import PricingSection     from "./sections/PricingSection";
import CTASection         from "./sections/CTASection";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen text-white" style={{ background: "#0a0a0e", fontFamily: "'Inter', sans-serif" }}>
      <NavBar onGetStarted={onGetStarted} onSignIn={onSignIn} />
      <main className="flex flex-col items-center w-full">
        <HeroSection      onGetStarted={onGetStarted} />
        <AppMockup />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection   onGetStarted={onGetStarted} />
        <CTASection       onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </div>
  );
}
