"use client";

import { useState, useEffect, useCallback } from "react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function useDashboard(user) {
  const [bookings, setBookings] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [trips, setTrips] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const [
        profileResponse,
        bookingsResponse,
        savedResponse,
        tripsResponse,
      ] = await Promise.all([
        fetch("/api/users/profile"),
        fetch("/api/bookings"),
        fetch("/api/trips?saved=true"),
        fetch("/api/trips"),
      ]);

      const profileData = profileResponse.ok
        ? await profileResponse.json()
        : { profile: null };
      const bookingsData = bookingsResponse.ok
        ? await bookingsResponse.json()
        : { bookings: [] };
      const savedData = savedResponse.ok
        ? await savedResponse.json()
        : { trips: [] };
      const tripsData = tripsResponse.ok
        ? await tripsResponse.json()
        : { trips: [] };

      const currentBookings = bookingsData.bookings || [];
      const currentSavedTrips = savedData.trips || [];
      const currentTrips = tripsData.trips || [];

      setUserProfile(profileData.profile);
      setBookings(currentBookings);
      setSavedTrips(currentSavedTrips);
      setTrips(currentTrips);

      const completedBookings = currentBookings.filter(
        (b) => b.booking_status === "completed",
      ).length;
      const upcomingBookings = currentBookings.filter(
        (b) =>
          b.booking_status === "confirmed" && new Date(b.start_date) > new Date(),
      ).length;
      const totalSpent = currentBookings
        .filter((b) => b.payment_status === "fully_paid")
        .reduce((sum, b) => sum + parseFloat(b.total_amount || 0), 0);
      const totalEarnings = currentTrips.reduce(
        (sum, t) => sum + (t.current_bookings * t.price_per_person || 0),
        0,
      );
      const activeBookings = currentBookings.filter(
        (b) => b.booking_status === "confirmed",
      ).length;

      setStats({
        completed_trips: completedBookings,
        upcoming_trips: upcomingBookings,
        total_spent: totalSpent,
        saved_trips: currentSavedTrips.length,
        hosted_trips: currentTrips.length,
        total_earnings: totalEarnings,
        active_bookings: activeBookings,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user, fetchDashboardData]);

  const isHost = userProfile?.role === "host";

  return {
    loading,
    userProfile,
    bookings,
    savedTrips,
    trips,
    stats,
    isHost,
    formatPrice,
  };
}
