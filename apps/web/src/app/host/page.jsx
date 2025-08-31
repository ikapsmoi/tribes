import { useState } from "react";
import {
  ArrowLeft,
  Users,
  DollarSign,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  Camera,
  Calendar,
  Shield,
  Heart,
  TrendingUp,
  MessageCircle,
  Award,
  Clock,
  Menu,
  X,
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function HostPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn While You Travel",
      description:
        "Generate income by sharing your passion for travel and building your community.",
    },
    {
      icon: Users,
      title: "Build Your Community",
      description:
        "Connect with like-minded travelers and grow your following through authentic experiences.",
    },
    {
      icon: Globe,
      title: "Share Your Expertise",
      description:
        "Showcase your knowledge of destinations and create unique, memorable adventures.",
    },
    {
      icon: Shield,
      title: "Full Support & Safety",
      description:
        "We provide comprehensive support, insurance, and safety protocols for all trips.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Tell us about yourself, your travel experience, and your community.",
      icon: Users,
    },
    {
      number: "02",
      title: "Plan Your Trip",
      description:
        "Design an amazing itinerary with our trip planning tools and templates.",
      icon: Calendar,
    },
    {
      number: "03",
      title: "List & Promote",
      description:
        "Publish your trip and promote it to your community and our platform.",
      icon: Camera,
    },
    {
      number: "04",
      title: "Host & Earn",
      description:
        "Lead your group adventure and earn money while creating memories.",
      icon: Star,
    },
  ];

  const hostStories = [
    {
      name: "Sarah Chen",
      community: "@wanderlust_sarah",
      followers: "125K",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      quote:
        "TravelTribe helped me turn my passion for travel into a sustainable business. I've hosted 15 trips and built incredible relationships.",
      trips: 15,
      rating: 4.9,
    },
    {
      name: "Marcus Rodriguez",
      community: "Adventure Seekers",
      followers: "89K",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      quote:
        "The platform makes it so easy to organize group trips. My community loves the authentic experiences we create together.",
      trips: 12,
      rating: 4.8,
    },
    {
      name: "Emma Thompson",
      community: "Solo Female Travelers",
      followers: "67K",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      quote:
        "I've connected with amazing women from around the world and created a safe space for solo female travelers.",
      trips: 8,
      rating: 5.0,
    },
  ];

  const requirements = [
    "18+ years old with valid passport",
    "Active social media presence or community",
    "Previous group travel or event organization experience",
    "Commitment to safety and inclusivity",
    "Excellent communication skills",
    "Passion for creating memorable experiences",
  ];

  const earnings = [
    {
      type: "Weekend Trip",
      duration: "2-3 days",
      travelers: "8-12",
      earning: "$500-1,200",
    },
    {
      type: "Week-long Adventure",
      duration: "7 days",
      travelers: "10-15",
      earning: "$2,000-5,000",
    },
    {
      type: "Epic Journey",
      duration: "14+ days",
      travelers: "12-20",
      earning: "$5,000-15,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-white to-brand-light font-body">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-6 bg-primary-black/20 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-text-onDark font-heading font-bold text-2xl"
            >
              TravelTribe
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            <a
              href="/"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">Home</span>
            </a>
            <a
              href="/trips"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">
                Find Trips
              </span>
            </a>
            <div className="bg-primary-white rounded-full px-6 py-3">
              <span className="text-text-primary font-body font-medium text-sm">
                Host
              </span>
            </div>
            <a
              href="/about"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">About</span>
            </a>
            <a
              href="/blog"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">Blog</span>
            </a>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <a
                href="/host/dashboard"
                className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-normal hover:shadow-lg hover:-translate-y-1"
              >
                Host Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/account/signin"
                  className="text-text-onDark font-body text-sm hover:text-text-onDark/80 transition-colors duration-normal"
                >
                  Login
                </a>
                <a
                  href="/account/signup"
                  className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-normal hover:shadow-lg hover:-translate-y-1"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-text-onDark"
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
          <div className="md:hidden mt-4 p-4 bg-primary-black/50 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                Home
              </a>
              <a
                href="/trips"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                Find Trips
              </a>
              <div className="bg-primary-white rounded-full px-4 py-2 text-center">
                <span className="text-text-primary font-body font-medium text-sm">
                  Host
                </span>
              </div>
              <a
                href="/about"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                About
              </a>
              <a
                href="/blog"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                Blog
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-primary-white/20">
                {user ? (
                  <a
                    href="/host/dashboard"
                    className="bg-accent-yellow text-primary-black px-4 py-2 rounded-full font-body font-semibold text-sm text-center hover:bg-accent-gold transition-all duration-normal"
                  >
                    Host Dashboard
                  </a>
                ) : (
                  <>
                    <a
                      href="/account/signin"
                      className="text-text-onDark font-body text-sm text-center"
                    >
                      Login
                    </a>
                    <a
                      href="/account/signup"
                      className="bg-accent-yellow text-primary-black px-4 py-2 rounded-full font-body font-semibold text-sm text-center hover:bg-accent-gold transition-all duration-normal"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add top padding to account for fixed nav */}
      <div className="pt-24">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-black mb-6">
                  Become a Trip <span className="text-accent-yellow">Host</span>
                </h1>
                <p className="text-xl md:text-2xl text-primary-white/90 mb-8">
                  Turn your passion for travel into income. Host group
                  adventures, build your community, and create unforgettable
                  experiences.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href={user ? "/host/dashboard" : "/account/signup"}
                    className="bg-accent-yellow text-primary-black hover:bg-accent-brightYellow px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center"
                  >
                    {user ? "Go to Dashboard" : "Start Hosting Today"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                  <button
                    onClick={() =>
                      document
                        .getElementById("how-it-works")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-primary-white/10 border border-primary-white/30 hover:bg-primary-white/20 text-primary-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
                  >
                    Learn How It Works
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-black mb-1">500+</div>
                    <div className="text-primary-white/80 text-sm">
                      Active Hosts
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black mb-1">$5K</div>
                    <div className="text-primary-white/80 text-sm">
                      Avg Monthly Earnings
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black mb-1">4.9★</div>
                    <div className="text-primary-white/80 text-sm">
                      Host Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                  alt="Group of travelers"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-ui-cardBackground backdrop-blur-sm rounded-2xl p-4 shadow-card border border-ui-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-yellow/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary-black" />
                    </div>
                    <div>
                      <div className="font-bold text-primary-black">
                        $3,200 earned
                      </div>
                      <div className="text-sm text-text-secondary">
                        Last trip to Bali
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-20 bg-primary-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-primary-black mb-4">
                Why Host with{" "}
                <span className="text-accent-yellow">TravelConnect</span>?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Join a community of passionate hosts who are building
                sustainable travel businesses while creating meaningful
                connections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center bg-ui-cardBackground backdrop-blur-sm rounded-2xl p-8 shadow-card border border-ui-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary-black" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-black mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-primary-black mb-4">
                How It Works
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Getting started as a host is simple. Follow these four steps to
                launch your first trip.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl p-8 shadow-card border border-ui-border h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-yellow text-primary-black rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-black">
                        {step.number}
                      </div>
                      <step.icon className="w-8 h-8 text-primary-black mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-primary-black mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary">{step.description}</p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-accent-yellow" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings Potential */}
        <div className="py-20 bg-primary-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-primary-black mb-4">
                Earnings Potential
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Your earnings depend on trip duration, group size, and
                destination. Here's what our hosts typically earn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {earnings.map((earning, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-accent-yellow/20 to-accent-brightYellow/20 rounded-2xl p-8 border border-accent-yellow/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-primary-black mb-2">
                      {earning.type}
                    </h3>
                    <div className="text-sm text-text-secondary mb-4">
                      {earning.duration} • {earning.travelers} travelers
                    </div>
                    <div className="text-3xl font-black text-primary-black mb-4">
                      {earning.earning}
                    </div>
                    <div className="text-sm text-text-secondary">
                      Potential earnings per trip
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-nature-paleBlue/30 border border-nature-lightBlue/50 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent-yellow/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-black mb-2">
                    Maximize Your Earnings
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Successful hosts often run multiple trips per year, build
                    repeat customers, and leverage their social media following
                    to fill trips quickly.
                  </p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Average hosts run 3-5 trips per year</li>
                    <li>• Top hosts earn $15K-50K+ annually</li>
                    <li>
                      • 85% of travelers book repeat trips with the same host
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Host Stories */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-primary-black mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Meet some of our top hosts and learn how they've built
                successful travel businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hostStories.map((host, index) => (
                <div
                  key={index}
                  className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center mb-6">
                    <img
                      src={host.image}
                      alt={host.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-primary-black mb-1">
                      {host.name}
                    </h3>
                    <p className="text-accent-yellow font-medium mb-1">
                      {host.community}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {host.followers} followers
                    </p>
                  </div>

                  <blockquote className="text-text-secondary text-center mb-6 italic">
                    "{host.quote}"
                  </blockquote>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black text-primary-black">
                        {host.trips}
                      </div>
                      <div className="text-sm text-text-secondary">
                        Trips Hosted
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-primary-black flex items-center justify-center">
                        {host.rating}
                        <Star className="w-5 h-5 text-accent-yellow fill-current ml-1" />
                      </div>
                      <div className="text-sm text-text-secondary">
                        Average Rating
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="py-20 bg-primary-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-primary-black mb-4">
                Host Requirements
              </h2>
              <p className="text-xl text-text-secondary">
                We maintain high standards to ensure the best experience for all
                travelers.
              </p>
            </div>

            <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl p-8 shadow-card border border-ui-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-yellow flex-shrink-0" />
                    <span className="text-text-secondary">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-text-secondary mb-6">
                Don't meet all requirements yet? We offer training and support
                to help you get started.
              </p>
              <a
                href="mailto:hosts@traveltribe.com"
                className="text-accent-yellow hover:text-accent-brightYellow font-medium transition-colors"
              >
                Contact our Host Success Team →
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Ready to Start Your Hosting Journey?
            </h2>
            <p className="text-xl text-primary-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful hosts who are building their travel
              businesses and creating unforgettable experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={user ? "/host/dashboard" : "/account/signup"}
                className="bg-accent-yellow text-primary-black hover:bg-accent-brightYellow px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {user ? "Create Your First Trip" : "Get Started Today"}
              </a>
              <a
                href="mailto:hosts@traveltribe.com"
                className="bg-primary-white/10 border border-primary-white/30 hover:bg-primary-white/20 text-primary-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                Talk to Our Team
              </a>
            </div>

            <div className="text-center">
              <p className="text-primary-white/80 text-sm">
                Questions? Email us at{" "}
                <a
                  href="mailto:hosts@traveltribe.com"
                  className="text-accent-yellow underline"
                >
                  hosts@traveltribe.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
