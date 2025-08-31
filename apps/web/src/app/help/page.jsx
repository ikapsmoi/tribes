"use client";

import { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Users,
  CreditCard,
  MapPin,
  Shield
} from "lucide-react";

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "booking", label: "Booking & Payments", icon: CreditCard },
    { id: "hosting", label: "Hosting", icon: Users },
    { id: "travel", label: "Travel & Safety", icon: MapPin },
    { id: "account", label: "Account & Profile", icon: Shield }
  ];

  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a trip?",
      answer: "To book a trip, browse our available trips, select one that interests you, and click 'Book Now'. You'll need to create an account, provide traveler information, and make a 25% deposit to secure your spot. The remaining 75% is automatically charged 90 days before departure."
    },
    {
      id: 2,
      category: "booking",
      question: "What is your cancellation policy?",
      answer: "Our cancellation policy varies by trip status: For pending trips (not yet confirmed), you receive a full refund. For confirmed trips more than 90 days away, you forfeit your deposit but receive a credit minus $100 processing fee, plus refund of remaining payments. For trips 90 days or less, bookings are non-refundable."
    },
    {
      id: 3,
      category: "booking",
      question: "When do I pay the remaining balance?",
      answer: "The remaining 75% of your trip cost is automatically charged 90 days before your trip start date. You'll receive email reminders leading up to this date. If payment fails, you have 72 hours to update your payment method before your booking may be cancelled."
    },
    {
      id: 4,
      category: "hosting",
      question: "How do I become a host?",
      answer: "To become a host, sign up for a host account, complete your profile with community details, and launch an audience survey to reach 100 responses. Once completed, you can choose from our curated itineraries, set your pricing, and publish your trip."
    },
    {
      id: 5,
      category: "hosting",
      question: "How much can I earn as a host?",
      answer: "Host earnings vary based on trip price, group size, and your community size. We show projected earnings percentages when you set your pricing. Additionally, you can earn $1,000 for each host you refer who completes their first confirmed trip, and $500 for their second trip."
    },
    {
      id: 6,
      category: "hosting",
      question: "What support do you provide hosts?",
      answer: "We provide vetted local operators with emergency contacts, 24/7 support during trips, marketing tools, payment processing, and trip management tools. You'll also have access to our host community and resources."
    },
    {
      id: 7,
      category: "travel",
      question: "What's included in trip prices?",
      answer: "Trip inclusions vary by trip but typically include accommodation, most meals, transportation during the trip, activities mentioned in the itinerary, and local guides. Flight to/from the destination, travel insurance, and personal expenses are usually not included."
    },
    {
      id: 8,
      category: "travel",
      question: "Do I need travel insurance?",
      answer: "Yes, we strongly recommend travel insurance for all trips. We provide links to trusted insurance providers during booking. Insurance can cover trip cancellation, medical emergencies, and other unforeseen circumstances."
    },
    {
      id: 9,
      category: "travel",
      question: "What safety measures are in place?",
      answer: "All our local operators are vetted with safety certifications and insurance verification. They provide emergency contact numbers and follow strict safety protocols. Hosts are trained in emergency procedures and we have 24/7 support during all trips."
    },
    {
      id: 10,
      category: "account",
      question: "How do I update my profile?",
      answer: "Log into your account and go to Profile Settings. You can update your personal information, travel preferences, emergency contacts, and profile photo. Hosts can also update their community information and social media links."
    },
    {
      id: 11,
      category: "account",
      question: "I forgot my password, how do I reset it?",
      answer: "Click 'Forgot Password' on the sign-in page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      id: 12,
      category: "booking",
      question: "Can I change my booking details?",
      answer: "Minor changes like dietary preferences or emergency contacts can be updated in your booking portal. For major changes like dates or adding travelers, contact our support team. Changes may be subject to availability and fees."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions and get the support you need
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span>{category.label}</span>
                  </button>
                ))}
              </nav>

              {/* Contact Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:support@traveltribe.com"
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Support</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Live Chat</span>
                  </a>
                  <a
                    href="tel:+1-800-TRAVEL"
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>1-800-TRAVEL</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - FAQs */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                  <span className="text-gray-600">
                    {filteredFAQs.length} articles found
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredFAQs.length === 0 ? (
                  <div className="p-12 text-center">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </div>
                ) : (
                  filteredFAQs.map((faq) => (
                    <div key={faq.id} className="p-6">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div className="mt-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-blue-800 mb-4">
                    Our support team is available 24/7 to help you with any questions or concerns.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:support@traveltribe.com"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Email Support
                    </a>
                    <button className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                      Start Live Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}