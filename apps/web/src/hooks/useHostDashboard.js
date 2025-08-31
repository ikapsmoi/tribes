"use client";

import { useState, useEffect, useCallback } from "react";

export default function useHostDashboard(user) {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  const fetchHostData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [profileResponse, tripsResponse, bookingsResponse] = await Promise.all([
        fetch("/api/users/profile"),
        fetch(`/api/trips?host_id=${user.id}`),
        fetch(`/api/bookings?host_id=${user.id}`)
      ]);

      let profileData = {};
      if (profileResponse.ok) {
        const data = await profileResponse.json();
        profileData = data.profile;
        setUserProfile(profileData);
      }

      let tripsData = [];
      if (tripsResponse.ok) {
        const data = await tripsResponse.json();
        tripsData = data.trips || [];
        setTrips(tripsData);
      }
      
      let bookingsData = [];
      if (bookingsResponse.ok) {
        const data = await bookingsResponse.json();
        bookingsData = data.bookings || [];
        setBookings(bookingsData);
      }

      const activeTrips = tripsData.filter((t) => t.status === "published").length;
      const totalBookings = bookingsData.length;
      const totalRevenue = bookingsData
        .filter((b) => b.payment_status === "fully_paid")
        .reduce((sum, b) => sum + parseFloat(b.amount_paid), 0);
      const avgRating =
        tripsData.length > 0
          ? tripsData.reduce((sum, t) => sum + (t.avg_rating || 0), 0) /
            tripsData.length
          : 0;

      setStats({
        active_trips: activeTrips,
        total_bookings: totalBookings,
        total_revenue: totalRevenue,
        avg_rating: avgRating,
        total_trips: tripsData.length,
      });

    } catch (error) {
      console.error("Error fetching host data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchHostData();
  }, [fetchHostData]);

  return { trips, bookings, userProfile, loading, stats };
}
