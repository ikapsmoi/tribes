"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MapPin,
  Star,
  Activity,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings,
  LogOut,
  Filter,
  Download,
} from "lucide-react";
import useUser from "@/utils/useUser";
import useAuth from "@/utils/useAuth";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [activeTab, setActiveTab] = useState("overview");

  const { data: user } = useUser();
  const { signOut } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?period=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">Admin access required</p>
          <a
            href="/account/signin"
            className="text-orange-500 hover:text-orange-600"
          >
            Sign in with admin account
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="font-bold text-2xl text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                TravelTribe
              </a>
              <span className="text-gray-400">|</span>
              <h1
                className="text-xl font-semibold text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                <span
                  className="font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="space-y-6">
            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : analytics ? (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Total Users
                    </p>
                    <p
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {formatNumber(analytics.overview.total_users)}
                    </p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span
                        className="text-sm text-green-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        +12%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Total Trips
                    </p>
                    <p
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {formatNumber(analytics.overview.total_trips)}
                    </p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span
                        className="text-sm text-green-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        +8%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Total Revenue
                    </p>
                    <p
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {formatPrice(analytics.overview.total_revenue)}
                    </p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span
                        className="text-sm text-green-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        +23%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Total Bookings
                    </p>
                    <p
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {formatNumber(analytics.overview.total_bookings)}
                    </p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span
                        className="text-sm text-green-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        +15%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Active Trips
                  </h3>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <p
                  className="text-3xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {formatNumber(analytics.overview.active_trips)}
                </p>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Currently accepting bookings
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Completed Trips
                  </h3>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <p
                  className="text-3xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {formatNumber(analytics.overview.completed_trips)}
                </p>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Successfully completed
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Avg. Trip Value
                  </h3>
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
                <p
                  className="text-3xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {analytics.overview.total_bookings > 0
                    ? formatPrice(
                        analytics.overview.total_revenue /
                          analytics.overview.total_bookings,
                      )
                    : "$0"}
                </p>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Per booking
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Recent Activity Chart */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Booking Activity
                  </h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>

                {analytics.recent_activity.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.recent_activity
                      .slice(0, 10)
                      .map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span
                            className="text-sm text-gray-600"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                          <div className="flex items-center">
                            <div
                              className="bg-orange-200 h-2 rounded mr-3"
                              style={{
                                width: `${Math.max(activity.bookings * 10, 20)}px`,
                              }}
                            ></div>
                            <span
                              className="text-sm font-medium text-gray-900"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {activity.bookings} bookings
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      No recent activity data
                    </p>
                  </div>
                )}
              </div>

              {/* Monthly Revenue */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Monthly Revenue
                  </h3>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>

                {analytics.monthly_revenue.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.monthly_revenue
                      .slice(0, 6)
                      .map((month, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span
                            className="text-sm text-gray-600"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {new Date(month.month).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <div className="flex items-center">
                            <div
                              className="bg-green-200 h-2 rounded mr-3"
                              style={{
                                width: `${Math.max(parseFloat(month.revenue) / 100, 20)}px`,
                              }}
                            ></div>
                            <span
                              className="text-sm font-medium text-gray-900"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {formatPrice(month.revenue)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      No revenue data available
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Destinations */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Top Destinations
                  </h3>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>

                {analytics.top_destinations.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.top_destinations
                      .slice(0, 8)
                      .map((destination, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span
                              className="text-sm font-medium text-gray-900"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {destination.destination}, {destination.country}
                            </span>
                            <div
                              className="text-xs text-gray-500"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {destination.total_travelers} travelers
                            </div>
                          </div>
                          <span
                            className="text-sm font-medium text-orange-600"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {destination.trip_count} trips
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      No destination data available
                    </p>
                  </div>
                )}
              </div>

              {/* Top Hosts */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Top Hosts
                  </h3>
                  <Star className="w-5 h-5 text-gray-400" />
                </div>

                {analytics.top_hosts.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.top_hosts.slice(0, 8).map((host, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <span
                            className="text-sm font-medium text-gray-900"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {host.host_name}
                          </span>
                          <div
                            className="text-xs text-gray-500"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {host.community_name || "Independent Host"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className="text-sm font-medium text-gray-900"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {host.trip_count} trips
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            {host.avg_rating
                              ? parseFloat(host.avg_rating).toFixed(1)
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      No host data available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
              <h3
                className="text-lg font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Users className="w-4 h-4" />
                  <span>Manage Users</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Manage Trips</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3
              className="text-lg font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No Analytics Data
            </h3>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Analytics data will appear here once there's platform activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
