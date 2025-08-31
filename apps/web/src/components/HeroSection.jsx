import { useState, useEffect } from "react";
import { Menu, X, Search, Plane } from "lucide-react";

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = [
    "Host",
    "the",
    "adventure,",
    "or",
    "join",
    "the",
    "squad",
    "—",
    "either",
    "way,",
    "your",
    "trip",
    "just",
    "got",
    "an",
    "upgrade",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300); // 300ms fade out before next word appears
    }, 1100); // Each word shows for 1.1 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://raw.createusercontent.com/7a44af51-e66b-4373-a8f2-f0f42589f891/')",
        }}
      />

      {/* Gradient Overlay - Using brand colors */}
      <div className="absolute inset-0 bg-gradient-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-16 py-4 sm:py-6 bg-brand-midnight/20 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-brand-white font-heading font-bold text-xl sm:text-2xl">
              TravelTribe
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            <div className="bg-brand-white rounded-full px-6 py-3">
              <span className="text-text-primary font-body font-medium text-sm">
                Home
              </span>
            </div>
            <a
              href="/trips"
              className="bg-brand-midnight/20 backdrop-blur-sm border border-brand-white/20 rounded-full px-6 py-3 hover:bg-brand-white/10 transition-all duration-normal cursor-pointer min-h-touch"
            >
              <span className="text-brand-white font-body text-sm">
                Find Trips
              </span>
            </a>
            <a
              href="/host"
              className="bg-brand-midnight/20 backdrop-blur-sm border border-brand-white/20 rounded-full px-6 py-3 hover:bg-brand-white/10 transition-all duration-normal cursor-pointer min-h-touch"
            >
              <span className="text-brand-white font-body text-sm">Host</span>
            </a>
            <a
              href="/about"
              className="bg-brand-midnight/20 backdrop-blur-sm border border-brand-white/20 rounded-full px-6 py-3 hover:bg-brand-white/10 transition-all duration-normal cursor-pointer min-h-touch"
            >
              <span className="text-brand-white font-body text-sm">About</span>
            </a>
            <a
              href="/blog"
              className="bg-brand-midnight/20 backdrop-blur-sm border border-brand-white/20 rounded-full px-6 py-3 hover:bg-brand-white/10 transition-all duration-normal cursor-pointer min-h-touch"
            >
              <span className="text-brand-white font-body text-sm">Blog</span>
            </a>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/account/signin"
              className="text-brand-white font-body text-sm hover:text-brand-white/80 transition-colors duration-normal min-h-touch flex items-center"
            >
              Login
            </a>
            <a
              href="/account/signup"
              className="bg-brand-aqua hover:bg-brand-aqua/90 text-brand-white px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-normal hover:shadow-lg hover:-translate-y-1 min-h-touch flex items-center"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-brand-white p-2 min-h-touch min-w-touch flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-brand-midnight/50 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col space-y-4">
              <div className="bg-brand-white rounded-full px-4 py-3 text-center min-h-touch flex items-center justify-center">
                <span className="text-text-primary font-body font-medium text-base">
                  Home
                </span>
              </div>
              <a
                href="/trips"
                className="text-brand-white/80 hover:text-brand-white font-body text-base text-center py-3 min-h-touch flex items-center justify-center"
              >
                Find Trips
              </a>
              <a
                href="/host"
                className="text-brand-white/80 hover:text-brand-white font-body text-base text-center py-3 min-h-touch flex items-center justify-center"
              >
                Host
              </a>
              <a
                href="/about"
                className="text-brand-white/80 hover:text-brand-white font-body text-base text-center py-3 min-h-touch flex items-center justify-center"
              >
                About
              </a>
              <a
                href="/blog"
                className="text-brand-white/80 hover:text-brand-white font-body text-base text-center py-3 min-h-touch flex items-center justify-center"
              >
                Blog
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-brand-white/20">
                <a
                  href="/account/signin"
                  className="text-brand-white font-body text-base text-center py-3 min-h-touch flex items-center justify-center"
                >
                  Login
                </a>
                <a
                  href="/account/signup"
                  className="bg-brand-aqua text-brand-white px-4 py-3 rounded-full font-body font-semibold text-base text-center hover:bg-brand-aqua/90 transition-all duration-normal min-h-touch flex items-center justify-center"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-16">
        <div className="max-w-7xl w-full text-center">
          {/* Search Bar - Mobile Optimized */}
          <div className="max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="search"
                placeholder="Where do you want to go?"
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-brand-white/90 backdrop-blur-sm rounded-full text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-aqua font-body shadow-card text-sm sm:text-base min-h-touch"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/trips?search=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
            </div>
          </div>

          {/* Brand Name and Headline - Mobile Responsive Typography */}
          <h1 className="font-display font-black text-brand-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-hero leading-tight mb-6 sm:mb-8 tracking-tight">
            TRAVELTRIBE
            <br />
            <span className="text-brand-aqua block overflow-hidden h-[1.2em] flex items-center justify-center">
              <span
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-hero font-light transition-all duration-500 transform ${
                  isVisible
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-4"
                }`}
              >
                {words[currentWordIndex]}
              </span>
            </span>
          </h1>

          {/* CTA Buttons - Closely aligned with nice gap */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4 max-w-md mx-auto">
            <a
              href="/host"
              className="w-full sm:w-auto group bg-brand-aqua hover:bg-brand-aqua/90 text-brand-white font-body font-bold px-6 sm:px-8 py-4 rounded-full flex items-center justify-center space-x-3 transition-all duration-normal shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[180px] sm:min-w-[200px] min-h-touch"
            >
              <span className="text-sm sm:text-base">Host a Trip</span>
              <span className="text-lg font-light tracking-tight">{">>>"}</span>
            </a>

            <a
              href="/trips"
              className="w-full sm:w-auto group bg-brand-white/10 backdrop-blur-sm border-2 border-brand-white/30 hover:bg-brand-white hover:text-brand-midnight text-brand-white font-body font-semibold px-6 sm:px-8 py-4 rounded-full flex items-center justify-center space-x-3 transition-all duration-normal min-w-[180px] sm:min-w-[200px] min-h-touch"
            >
              <span className="text-sm sm:text-base">Find a Trip</span>
              <span className="text-lg font-light tracking-tight">{">>>"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animation for word transitions */}
      <style jsx global>{`
        @keyframes word-appear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes word-disappear {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
          }
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .hero-content {
            padding-top: 4rem;
          }
        }
      `}</style>
    </div>
  );
}
