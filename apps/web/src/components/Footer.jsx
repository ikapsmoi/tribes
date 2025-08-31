"use client";
import { useState } from "react";
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
    // You could add a success message here
  };

  return (
    <footer className="bg-brand-midnight text-brand-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 px-4">
            Ready for your next
            <br />
            <span className="text-brand-aqua">adventure?</span>
          </h2>
          <p className="text-brand-slate text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto font-body px-4">
            Stay updated on new destinations, exclusive deals, and inspiring
            travel stories from our community.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleNewsletterSubmit}
            className="max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 px-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-brand-slate" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-brand-charcoal border border-brand-slate rounded-button text-brand-white placeholder-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-aqua font-body text-sm sm:text-base min-h-touch"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-brand-aqua hover:bg-brand-aqua/90 px-6 py-3 sm:py-4 rounded-button flex items-center justify-center transition-colors duration-300 flex-shrink-0 min-h-touch min-w-touch"
              >
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-brand-white" />
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="bg-brand-aqua hover:bg-brand-aqua/90 text-brand-white font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-button transition-colors duration-300 min-h-touch text-sm sm:text-base">
              Start Hosting Today
            </button>
            <button className="bg-brand-charcoal hover:bg-brand-charcoal/80 text-brand-white border border-brand-slate font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-button transition-colors duration-300 min-h-touch text-sm sm:text-base">
              Explore Destinations
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-slate mb-12"></div>

        {/* Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-xl text-brand-white mb-6">
              Company
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Our Story
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Careers
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Press
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Blog
              </a>
            </div>
          </div>

          {/* For Travelers */}
          <div>
            <h3 className="font-display font-semibold text-xl text-brand-white mb-6">
              For Travelers
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Browse Trips
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                How It Works
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Travel Insurance
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Safety Guidelines
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Reviews
              </a>
            </div>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="font-display font-semibold text-xl text-brand-white mb-6">
              For Hosts
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Become a Host
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Host Resources
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Host Community
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Earnings Calculator
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Host Success Stories
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-xl text-brand-white mb-6">
              Support
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                FAQs
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Booking Policies
              </a>
              <a
                href="#"
                className="block text-brand-slate hover:text-brand-white transition-colors duration-300 font-body"
              >
                Community Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row md:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Logo and Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <div className="text-brand-white font-display font-bold text-lg sm:text-xl">
                TravelTribe
              </div>
              <span className="text-brand-slate text-xs sm:text-sm font-body">
                © 2025 TravelTribe. All rights reserved.
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-brand-charcoal hover:bg-brand-aqua rounded-full flex items-center justify-center transition-colors duration-300 group min-h-touch min-w-touch"
              >
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5 group-hover:text-brand-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-brand-charcoal hover:bg-brand-aqua rounded-full flex items-center justify-center transition-colors duration-300 group min-h-touch min-w-touch"
              >
                <Youtube className="w-4 sm:w-5 h-4 sm:h-5 group-hover:text-brand-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-brand-charcoal hover:bg-brand-aqua rounded-full flex items-center justify-center transition-colors duration-300 group min-h-touch min-w-touch"
              >
                <Twitter className="w-4 sm:w-5 h-4 sm:h-5 group-hover:text-brand-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-brand-charcoal hover:bg-brand-aqua rounded-full flex items-center justify-center transition-colors duration-300 group min-h-touch min-w-touch"
              >
                <Facebook className="w-4 sm:w-5 h-4 sm:h-5 group-hover:text-brand-white" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 text-center">
              <a
                href="#"
                className="text-brand-slate hover:text-brand-white transition-colors duration-300 text-xs sm:text-sm font-body py-1 min-h-touch flex items-center"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-brand-slate hover:text-brand-white transition-colors duration-300 text-xs sm:text-sm font-body py-1 min-h-touch flex items-center"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-brand-slate hover:text-brand-white transition-colors duration-300 text-xs sm:text-sm font-body py-1 min-h-touch flex items-center"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
