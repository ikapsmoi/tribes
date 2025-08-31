import HeroSection from "../components/HeroSection";
import ValuePropositionSection from "../components/ValuePropositionSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturedDestinationsSection from "../components/FeaturedDestinationsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import BoeingPlaneOverlay from "../components/BoeingPlaneOverlay";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Boeing Plane Overlay - Fixed across entire page */}
      <BoeingPlaneOverlay />

      {/* Hero Section */}
      <HeroSection />

      {/* Value Proposition Section */}
      <ValuePropositionSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Featured Destinations Section */}
      <FeaturedDestinationsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
