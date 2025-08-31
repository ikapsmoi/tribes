"use client";

import { useState } from "react";
import useUser from "@/utils/useUser";
import useAuth from "@/utils/useAuth";
import useHostDashboard from "@/hooks/useHostDashboard";

import DashboardHeader from "@/components/host/dashboard/DashboardHeader";
import StatsGrid from "@/components/host/dashboard/StatsGrid";
import DashboardSidebar from "@/components/host/dashboard/DashboardSidebar";
import TripsView from "@/components/host/dashboard/TripsView";
import BookingsView from "@/components/host/dashboard/BookingsView";
import AnalyticsView from "@/components/host/dashboard/AnalyticsView";
import ProfileView from "@/components/host/dashboard/ProfileView";
import SignInRequired from "@/components/host/dashboard/SignInRequired";

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState("trips");
  const { data: user } = useUser();
  const { signOut } = useAuth();
  const { trips, bookings, userProfile, loading, stats } = useHostDashboard(user);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  if (!user) {
    return <SignInRequired />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "trips":
        return <TripsView trips={trips} loading={loading} />;
      case "bookings":
        return <BookingsView bookings={bookings} />;
      case "analytics":
        return <AnalyticsView />;
      case "profile":
        return <ProfileView userProfile={userProfile} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onSignOut={handleSignOut} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DashboardSidebar
            user={user}
            userProfile={userProfile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
