"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Search,
  Tag,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "travel-tips", label: "Travel Tips" },
    { id: "destinations", label: "Destinations" },
    { id: "group-travel", label: "Group Travel" },
    { id: "host-stories", label: "Host Stories" },
    { id: "community", label: "Community" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for First-Time Group Travel",
      excerpt:
        "Planning your first group trip? Here are the insider secrets to make it unforgettable and stress-free.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "travel-tips",
      image:
        "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
      featured: true,
    },
    {
      id: 2,
      title: "Hidden Gems of Southeast Asia: A Group Adventure Guide",
      excerpt:
        "Discover the most incredible off-the-beaten-path destinations perfect for group exploration.",
      author: "Marcus Rodriguez",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "destinations",
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      featured: false,
    },
    {
      id: 3,
      title: "How I Built a Community of 10,000 Travel Enthusiasts",
      excerpt:
        "The story behind creating one of the most engaged travel communities on social media.",
      author: "Emma Thompson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "host-stories",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      featured: false,
    },
    {
      id: 4,
      title: "The Psychology of Group Dynamics in Travel",
      excerpt:
        "Understanding how to create harmony and manage personalities during group adventures.",
      author: "Dr. Lisa Park",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "group-travel",
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
      featured: false,
    },
    {
      id: 5,
      title: "Sustainable Group Travel: Making a Positive Impact",
      excerpt:
        "How to organize eco-friendly group trips that benefit local communities and the environment.",
      author: "Green Travel Collective",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "community",
      image:
        "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg",
      featured: false,
    },
    {
      id: 6,
      title: "Budget-Friendly Group Travel: Maximum Fun, Minimum Cost",
      excerpt:
        "Proven strategies to organize amazing group trips without breaking the bank.",
      author: "Budget Travel Pro",
      date: "2024-01-03",
      readTime: "4 min read",
      category: "travel-tips",
      image:
        "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "travel-tips": "bg-accent-yellow/20 text-primary-black",
      destinations: "bg-nature-lightBlue/20 text-primary-black",
      "group-travel": "bg-accent-gold/20 text-primary-black",
      "host-stories": "bg-accent-yellow/30 text-primary-black",
      community: "bg-nature-paleBlue/30 text-primary-black",
    };
    return colors[category] || "bg-ui-cardBackground text-text-secondary";
  };

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
            <a
              href="/about"
              className="bg-primary-black/20 backdrop-blur-sm border border-primary-white/20 rounded-full px-6 py-3 hover:bg-primary-white/10 transition-all duration-normal cursor-pointer"
            >
              <span className="text-text-onDark font-body text-sm">About</span>
            </a>
            <div className="bg-primary-white rounded-full px-6 py-3">
              <span className="text-text-primary font-body font-medium text-sm">
                Blog
              </span>
            </div>
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
              <a
                href="/about"
                className="text-text-onDark/80 hover:text-text-onDark font-body text-sm text-center"
              >
                About
              </a>
              <div className="bg-primary-white rounded-full px-4 py-2 text-center">
                <span className="text-text-primary font-body font-medium text-sm">
                  Blog
                </span>
              </div>
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
        <div className="bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              TravelTribe <span className="text-accent-yellow">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-white/90 max-w-3xl mx-auto">
              Stories, tips, and insights from the world of group travel and
              community building.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-ui-cardBackground backdrop-blur-sm border border-ui-border rounded-full text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-accent-yellow font-body shadow-card"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-accent-yellow text-primary-black shadow-md"
                        : "bg-ui-cardBackground text-text-secondary hover:bg-primary-white/80 border border-ui-border"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === "all" && !searchTerm && (
            <div className="mb-16">
              <h2 className="text-2xl font-black text-primary-black mb-6">
                Featured Article
              </h2>
              <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredPost.category)}`}
                      >
                        {
                          categories.find((c) => c.id === featuredPost.category)
                            ?.label
                        }
                      </span>
                      <span className="text-sm text-accent-yellow font-medium">
                        Featured
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-primary-black mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-text-secondary mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-text-light">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(featuredPost.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>

                      <button className="flex items-center text-accent-yellow hover:text-accent-gold font-medium transition-colors">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div>
            <h2 className="text-2xl font-black text-primary-black mb-6">
              {selectedCategory === "all"
                ? "Latest Articles"
                : `${categories.find((c) => c.id === selectedCategory)?.label}`}
            </h2>

            {regularPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-card border border-ui-border">
                  <div className="w-24 h-24 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-primary-black" />
                  </div>
                  <h3 className="text-2xl font-black text-primary-black mb-4">
                    No articles found
                  </h3>
                  <p className="text-text-secondary">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
                        >
                          {
                            categories.find((c) => c.id === post.category)
                              ?.label
                          }
                        </span>
                        <span className="text-xs text-text-light">
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-primary-black mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-text-light">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{formatDate(post.date)}</span>
                        </div>

                        <button className="text-accent-yellow hover:text-accent-gold text-sm font-medium transition-colors">
                          Read More
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-black mb-4">Stay Updated</h3>
            <p className="text-xl text-primary-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest travel tips, destination guides, and community
              stories delivered to your inbox.
            </p>

            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-text-primary placeholder-text-light bg-ui-cardBackground backdrop-blur-sm border border-ui-border focus:outline-none focus:ring-2 focus:ring-accent-yellow"
              />
              <button className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Subscribe
              </button>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mt-16">
            <h3 className="text-xl font-black text-primary-black mb-6">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Group Travel",
                "Solo Travel",
                "Adventure",
                "Budget Travel",
                "Luxury Travel",
                "Backpacking",
                "Cultural Immersion",
                "Food & Drink",
                "Photography",
                "Wellness",
                "Digital Nomad",
                "Family Travel",
                "Sustainable Travel",
                "Road Trips",
                "City Breaks",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-ui-cardBackground backdrop-blur-sm border border-ui-border rounded-full text-sm text-text-secondary hover:bg-primary-white/80 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-black text-primary-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-4">
              Ready to Start Your Own Adventure?
            </h2>
            <p className="text-xl text-primary-white/90 mb-8">
              Join our community of travelers and start exploring the world
              together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/trips"
                className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Find Your Next Trip
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
