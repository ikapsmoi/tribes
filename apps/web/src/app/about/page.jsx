"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Globe,
  Heart,
  Award,
  CheckCircle,
  Star,
  Menu,
  X,
} from "lucide-react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      bio: "Former travel blogger with 10+ years of group travel experience",
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Community",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      bio: "Adventure photographer and community builder",
    },
    {
      name: "Emma Thompson",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      bio: "Travel industry veteran with expertise in group logistics",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Travelers" },
    { number: "500+", label: "Trips Hosted" },
    { number: "50+", label: "Countries" },
    { number: "4.9", label: "Average Rating" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "We believe travel is better when shared with like-minded people who become lifelong friends.",
    },
    {
      icon: Globe,
      title: "Authentic Experiences",
      description:
        "We curate unique, off-the-beaten-path adventures that create meaningful connections with local cultures.",
    },
    {
      icon: Users,
      title: "Trusted Hosts",
      description:
        "Our verified hosts are passionate travelers who know how to create safe, inclusive, and unforgettable experiences.",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description:
        "Every trip is carefully vetted to ensure high standards of safety, accommodation, and overall experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-brand-white to-brand-light font-body">
      {/* Header - Updated to match home page */}
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
            <a
              href="/host"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">Host</span>
            </a>
            <div className="bg-primary-white rounded-full px-6 py-3">
              <span className="text-text-primary font-body font-medium text-sm">
                About
              </span>
            </div>
            <a
              href="/blog"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">Blog</span>
            </a>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
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
              <a
                href="/host"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                Host
              </a>
              <div className="bg-primary-white rounded-full px-4 py-2 text-center">
                <span className="text-text-primary font-body font-medium text-sm">
                  About
                </span>
              </div>
              <a
                href="/blog"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                Blog
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-primary-white/20">
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
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add top padding to account for fixed nav */}
      <div className="pt-24">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              About <span className="text-accent-yellow">TravelTribe</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-white/90 max-w-3xl mx-auto">
              We're on a mission to make group travel accessible, authentic, and
              unforgettable for communities worldwide.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-primary-white/90 backdrop-blur-sm rounded-full p-1 shadow-card border border-ui-border">
              {[
                { id: "story", label: "Our Story" },
                { id: "mission", label: "Mission & Values" },
                { id: "team", label: "Meet the Team" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-accent-yellow text-primary-black shadow-md"
                      : "text-text-secondary hover:text-primary-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Our Story Tab */}
          {activeTab === "story" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border p-8 md:p-12">
                <h2 className="text-3xl font-black text-primary-black mb-6">
                  How TravelTribe Started
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-text-secondary leading-relaxed mb-6">
                    TravelTribe was born from a simple observation: the best
                    travel experiences happen when you're with the right people.
                    Our founder, Sarah Chen, was a solo traveler who kept
                    finding herself wishing she could share incredible moments
                    with like-minded adventurers.
                  </p>

                  <p className="text-text-secondary leading-relaxed mb-6">
                    After years of organizing informal group trips for her
                    online community, Sarah realized there was a massive gap in
                    the market. Existing platforms were either too corporate and
                    impersonal, or too risky and unvetted. There had to be a
                    better way to connect passionate travelers with trusted
                    hosts.
                  </p>

                  <p className="text-text-secondary leading-relaxed mb-6">
                    In 2023, we launched TravelTribe with a vision: to create a
                    platform where content creators, community leaders, and
                    passionate travelers could host authentic group experiences
                    while building meaningful connections.
                  </p>

                  <div className="bg-accent-yellow/20 border-l-4 border-accent-yellow p-6 my-8 rounded-r-lg">
                    <p className="text-primary-black font-medium">
                      "Travel isn't just about the places you go—it's about the
                      people you meet and the memories you create together.
                      TravelTribe makes those connections possible."
                    </p>
                    <p className="text-text-secondary text-sm mt-2">
                      — Sarah Chen, Founder
                    </p>
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    Today, we're proud to have facilitated thousands of
                    connections and hundreds of incredible group adventures
                    across the globe. But we're just getting started—our goal is
                    to make group travel accessible and safe for everyone,
                    everywhere.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mission & Values Tab */}
          {activeTab === "mission" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-primary-black mb-4">
                  Our Mission & Values
                </h2>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                  We're building the future of group travel, one authentic
                  experience at a time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-accent-yellow/20 rounded-lg">
                        <value.icon className="w-6 h-6 text-primary-black" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary-black mb-3">
                          {value.title}
                        </h3>
                        <p className="text-text-secondary">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl font-black mb-4">Our Mission</h3>
                <p className="text-xl text-primary-white/90 max-w-3xl mx-auto">
                  To democratize group travel by connecting passionate hosts
                  with adventurous travelers, creating authentic experiences
                  that build lasting friendships and cultural understanding.
                </p>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-primary-black mb-4">
                  Meet Our Team
                </h2>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                  We're a diverse team of travel enthusiasts, community
                  builders, and technology experts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-primary-black mb-2">
                      {member.name}
                    </h3>
                    <p className="text-accent-yellow font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-text-secondary text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>

              <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border p-8 text-center">
                <h3 className="text-2xl font-black text-primary-black mb-4">
                  Join Our Team
                </h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  We're always looking for passionate people who share our
                  vision of making travel more connected and authentic. Check
                  out our open positions!
                </p>
                <a
                  href="mailto:careers@traveltribe.com"
                  className="bg-accent-yellow hover:bg-accent-brightYellow text-primary-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  View Open Positions
                </a>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-primary-black text-primary-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-primary-white/90 mb-8">
              Join thousands of travelers who've discovered the joy of group
              adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/trips"
                className="bg-accent-yellow hover:bg-accent-brightYellow text-primary-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Browse Trips
              </a>
              <a
                href="/host"
                className="bg-primary-white/10 border border-primary-white/20 hover:bg-primary-white/20 text-primary-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Become a Host
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
