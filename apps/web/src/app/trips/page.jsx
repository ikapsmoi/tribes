import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    trip_type: "",
    min_price: "",
    max_price: "",
    start_date: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedTrips, setSavedTrips] = useState(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    fetchTrips();
  }, [searchQuery, filters]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (filters.trip_type) params.append("trip_type", filters.trip_type);
      if (filters.min_price) params.append("min_price", filters.min_price);
      if (filters.max_price) params.append("max_price", filters.max_price);
      if (filters.start_date) params.append("start_date", filters.start_date);

      const response = await fetch(`/api/trips?${params}`);
      if (!response.ok) throw new Error("Failed to fetch trips");

      const data = await response.json();
      setTrips(data.trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTrips();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSaveTrip = async (tripId) => {
    if (!user) {
      window.location.href = "/account/signin";
      return;
    }

    try {
      const method = savedTrips.has(tripId) ? "DELETE" : "POST";
      const response = await fetch(`/api/trips/${tripId}/save`, { method });

      if (response.ok) {
        setSavedTrips((prev) => {
          const newSet = new Set(prev);
          if (method === "POST") {
            newSet.add(tripId);
          } else {
            newSet.delete(tripId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error toggling save trip:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
            <div className="bg-primary-white rounded-full px-6 py-3">
              <span className="text-text-primary font-body font-medium text-sm">
                Find Trips
              </span>
            </div>
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
              <div className="bg-primary-white rounded-full px-4 py-2 text-center">
                <span className="text-text-primary font-body font-medium text-sm">
                  Find Trips
                </span>
              </div>
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
        <div className="bg-gradient-to-r from-primary-black to-primary-darkGray text-primary-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black mb-4">
                  Discover Amazing{" "}
                  <span className="text-accent-yellow">Trips</span>
                </h1>
                <p className="text-xl text-primary-white/90">
                  Join group adventures with like-minded travelers around the
                  world
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-white/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, countries, or trip types..."
                  className="w-full pl-12 pr-4 py-3 bg-primary-white/10 backdrop-blur-sm border border-primary-white/20 rounded-full text-primary-white placeholder-primary-white/70 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                />
              </form>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-white/10 backdrop-blur-sm border border-primary-white/20 rounded-full hover:bg-primary-white/20 text-primary-white transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </button>

                <div className="text-sm text-primary-white/90">
                  {trips.length} trips found
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="bg-primary-white/10 backdrop-blur-sm p-6 rounded-2xl border border-primary-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-white mb-2">
                        Trip Type
                      </label>
                      <select
                        value={filters.trip_type}
                        onChange={(e) =>
                          handleFilterChange("trip_type", e.target.value)
                        }
                        className="w-full bg-primary-white/20 backdrop-blur-sm border border-primary-white/30 rounded-full px-3 py-2 text-primary-white focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                      >
                        <option value="">All Types</option>
                        <option value="adventure">Adventure</option>
                        <option value="wellness">Wellness</option>
                        <option value="culture">Culture</option>
                        <option value="food">Food & Wine</option>
                        <option value="photography">Photography</option>
                        <option value="wildlife">Wildlife</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-white mb-2">
                        Min Price
                      </label>
                      <input
                        type="number"
                        value={filters.min_price}
                        onChange={(e) =>
                          handleFilterChange("min_price", e.target.value)
                        }
                        placeholder="$0"
                        className="w-full bg-primary-white/20 backdrop-blur-sm border border-primary-white/30 rounded-full px-3 py-2 text-primary-white placeholder-primary-white/70 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-white mb-2">
                        Max Price
                      </label>
                      <input
                        type="number"
                        value={filters.max_price}
                        onChange={(e) =>
                          handleFilterChange("max_price", e.target.value)
                        }
                        placeholder="$10000"
                        className="w-full bg-primary-white/20 backdrop-blur-sm border border-primary-white/30 rounded-full px-3 py-2 text-primary-white placeholder-primary-white/70 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-white mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={filters.start_date}
                        onChange={(e) =>
                          handleFilterChange("start_date", e.target.value)
                        }
                        className="w-full bg-primary-white/20 backdrop-blur-sm border border-primary-white/30 rounded-full px-3 py-2 text-primary-white focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border animate-pulse"
                >
                  <div className="h-48 bg-nature-paleBlue rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-nature-paleBlue rounded mb-2"></div>
                    <div className="h-6 bg-nature-paleBlue rounded mb-4"></div>
                    <div className="h-4 bg-nature-paleBlue rounded mb-2"></div>
                    <div className="h-4 bg-nature-paleBlue rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-card border border-ui-border">
                <div className="w-24 h-24 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-12 h-12 text-primary-black" />
                </div>
                <h3 className="text-2xl font-black text-primary-black mb-4">
                  No trips found
                </h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your search or filters to find more trips.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      trip_type: "",
                      min_price: "",
                      max_price: "",
                      start_date: "",
                    });
                  }}
                  className="bg-accent-yellow hover:bg-accent-brightYellow text-primary-black px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-ui-cardBackground backdrop-blur-sm rounded-2xl shadow-card border border-ui-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Trip Image */}
                  <div className="relative h-48 rounded-t-2xl overflow-hidden">
                    <img
                      src={
                        trip.hero_image_url ||
                        "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleSaveTrip(trip.id)}
                      className="absolute top-3 right-3 p-2 bg-primary-white/90 backdrop-blur-sm rounded-full hover:bg-primary-white transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${savedTrips.has(trip.id) ? "fill-accent-yellow text-accent-yellow" : "text-text-secondary"}`}
                      />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-accent-yellow text-primary-black px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {trip.trip_type}
                      </span>
                    </div>
                  </div>

                  {/* Trip Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-primary-black mb-1">
                          {trip.title}
                        </h3>
                        <div className="flex items-center text-text-secondary text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>
                            {trip.destination}, {trip.country}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-primary-black">
                          {formatPrice(trip.price_per_person)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          per person
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {formatDate(trip.start_date)} -{" "}
                          {formatDate(trip.end_date)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{trip.spots_left} spots left</span>
                      </div>
                    </div>

                    {/* Host Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={
                            trip.host_image ||
                            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                          }
                          alt={trip.host_name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="text-sm font-medium text-primary-black">
                            {trip.host_name}
                          </div>
                          {trip.community_name && (
                            <div className="text-xs text-text-secondary">
                              {trip.community_name}
                            </div>
                          )}
                        </div>
                      </div>

                      {trip.avg_rating > 0 && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-accent-yellow fill-current mr-1" />
                          <span className="text-sm font-medium text-primary-black">
                            {trip.avg_rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-text-secondary ml-1">
                            ({trip.review_count})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <a
                      href={`/trips/${trip.id}`}
                      className="w-full bg-primary-black hover:bg-primary-darkGray text-primary-white py-3 px-4 rounded-full font-medium text-center block transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
