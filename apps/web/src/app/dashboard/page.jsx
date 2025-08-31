"use client";

import { useState } from "react";
import useUser from "@/utils/useUser";
import useAuth from "@/utils/useAuth";
import useDashboard from "@/hooks/useDashboard";

import SignInRequired from "@/components/dashboard/SignInRequired";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import OverviewTab from "@/components/dashboard/overview/OverviewTab";

// Traveler tabs
import DiscoverTripsTab from "@/components/dashboard/travelers/DiscoverTripsTab";
import BecomeHostTab from "@/components/dashboard/travelers/BecomeHostTab";

// Host tabs
import CreateTripTab from "@/components/dashboard/hosts/CreateTripTab";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: user } = useUser();
  const { signOut } = useAuth();
  const {
    loading,
    userProfile,
    bookings,
    savedTrips,
    trips,
    stats,
    isHost,
    formatPrice,
  } = useDashboard(user);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!user) {
    return <SignInRequired />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            isHost={isHost}
            stats={stats}
            formatPrice={formatPrice}
            setActiveTab={setActiveTab}
          />
        );

      // Traveler tabs
      case "discover":
        return <DiscoverTripsTab formatPrice={formatPrice} />;

      case "my-bookings":
        return (
          <div className="bg-primary-white rounded-xl shadow-lg border">
            <div className="p-6 border-b border-ui-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary font-heading">
                  📅 My Bookings
                </h2>
                <a
                  href="/trips"
                  className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-4 py-2 rounded-lg font-medium transition-colors font-body"
                >
                  Book New Trip
                </a>
              </div>
            </div>
            <div className="p-6">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                    No bookings yet
                  </h3>
                  <p className="text-text-secondary mb-6 font-body">
                    Start exploring amazing trips and book your first adventure!
                  </p>
                  <a
                    href="/trips"
                    className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-2 rounded-lg font-medium transition-colors font-body"
                  >
                    Browse Trips
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-ui-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={
                            booking.hero_image_url ||
                            "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                          }
                          alt={booking.trip_title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-text-primary mb-1 font-heading">
                                {booking.trip_title}
                              </h3>
                              <div className="flex items-center text-text-secondary text-sm mb-2">
                                <span className="font-body">
                                  {booking.destination}, {booking.country}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.booking_status)}`}
                            >
                              {booking.booking_status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-text-secondary font-body">
                                Dates:
                              </span>
                              <div className="font-medium text-text-primary font-body">
                                {formatDate(booking.start_date)} -{" "}
                                {formatDate(booking.end_date)}
                              </div>
                            </div>
                            <div>
                              <span className="text-text-secondary font-body">
                                Total:
                              </span>
                              <div className="font-medium text-text-primary font-body">
                                {formatPrice(booking.total_amount)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "saved":
        return (
          <div className="bg-primary-white rounded-xl shadow-lg border">
            <div className="p-6 border-b border-ui-border">
              <h2 className="text-xl font-semibold text-text-primary font-heading">
                💖 Saved Trips
              </h2>
            </div>
            <div className="p-6">
              {savedTrips.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                    No saved trips yet
                  </h3>
                  <p className="text-text-secondary mb-6 font-body">
                    Save trips you're interested in to easily find them later.
                  </p>
                  <a
                    href="/trips"
                    className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-2 rounded-lg font-medium transition-colors font-body"
                  >
                    Browse Trips
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="border border-ui-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={
                          trip.hero_image_url ||
                          "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                        }
                        alt={trip.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-text-primary mb-2 font-heading">
                          {trip.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-text-primary font-heading">
                            {formatPrice(trip.price_per_person)}
                          </span>
                          <a
                            href={`/trips/${trip.id}`}
                            className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-4 py-2 rounded-lg text-sm font-medium transition-colors font-body"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "become-host":
        return <BecomeHostTab />;

      // Host tabs
      case "my-trips":
        return (
          <div className="bg-primary-white rounded-xl shadow-lg border">
            <div className="p-6 border-b border-ui-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary font-heading">
                  🌍 My Trips
                </h2>
                <button
                  onClick={() => setActiveTab("create-trip")}
                  className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-4 py-2 rounded-lg font-medium transition-colors font-body"
                >
                  Create New Trip
                </button>
              </div>
            </div>
            <div className="p-6">
              {trips.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                    No trips created yet
                  </h3>
                  <p className="text-text-secondary mb-6 font-body">
                    Create your first group travel experience!
                  </p>
                  <button
                    onClick={() => setActiveTab("create-trip")}
                    className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-2 rounded-lg font-medium transition-colors font-body"
                  >
                    Create Trip
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      className="border border-ui-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={
                          trip.hero_image_url ||
                          "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
                        }
                        alt={trip.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}
                          >
                            {trip.status}
                          </span>
                          <span className="text-sm text-text-secondary font-body">
                            {trip.current_bookings}/{trip.capacity_max} booked
                          </span>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-1 font-heading">
                          {trip.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-text-primary font-heading">
                            {formatPrice(trip.price_per_person)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "create-trip":
        return <CreateTripTab />;

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="bg-primary-white rounded-xl shadow-lg border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
                📊 Analytics & Earnings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm opacity-80 font-body">
                    Total Earnings
                  </h3>
                  <p className="text-2xl font-bold font-heading">
                    {formatPrice(stats.total_earnings || 0)}
                  </p>
                  <p className="text-xs opacity-80 font-body">
                    +12% this month
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm opacity-80 font-body">Active Trips</h3>
                  <p className="text-2xl font-bold font-heading">
                    {stats.hosted_trips || 0}
                  </p>
                  <p className="text-xs opacity-80 font-body">2 upcoming</p>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm opacity-80 font-body">
                    Total Bookings
                  </h3>
                  <p className="text-2xl font-bold font-heading">
                    {bookings.length}
                  </p>
                  <p className="text-xs opacity-80 font-body">95% fill rate</p>
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl p-6 text-white">
                  <h3 className="text-sm opacity-80 font-body">Avg Rating</h3>
                  <p className="text-2xl font-bold font-heading">4.9</p>
                  <p className="text-xs opacity-80 font-body">48 reviews</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                  Detailed Analytics Coming Soon
                </h3>
                <p className="text-text-secondary font-body">
                  Track bookings, revenue trends, and community growth metrics.
                </p>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-primary-white rounded-xl shadow-lg border">
            <div className="p-6 border-b border-ui-border">
              <h2 className="text-xl font-semibold text-text-primary font-heading">
                ⚙️ Profile Settings
              </h2>
            </div>
            <div className="p-6">
              <div className="max-w-2xl">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={userProfile?.bio || ""}
                      placeholder="Tell us about yourself..."
                      className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-2 rounded-lg font-medium transition-colors font-body">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-primary-white rounded-xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold">Content for {activeTab}</h2>
            <p>This section is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-primary-white to-nature-paleBlue">
      <DashboardHeader isHost={isHost} onSignOut={handleSignOut} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <DashboardHero
          user={user}
          isHost={isHost}
          setActiveTab={setActiveTab}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DashboardSidebar
            user={user}
            userProfile={userProfile}
            isHost={isHost}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stats={stats}
            formatPrice={formatPrice}
          />

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-primary-white rounded-xl shadow-lg border">
                <p className="text-text-secondary font-semibold">
                  Loading dashboard data...
                </p>
              </div>
            ) : (
              renderActiveTab()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
