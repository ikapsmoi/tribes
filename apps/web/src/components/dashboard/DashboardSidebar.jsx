import {
  Calendar,
  Star,
  Heart,
  Users,
  Settings,
  Plus,
  TrendingUp,
  Globe,
  Compass,
  Camera,
  BarChart3,
} from "lucide-react";

const UserProfileCard = ({ user, userProfile, isHost }) => (
  <div className="text-center mb-6">
    <img
      src={
        user.image ||
        userProfile?.avatar_url ||
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
      }
      alt={user.name}
      className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-accent-yellow"
    />
    <h3 className="font-semibold text-text-primary font-heading">
      {user.name}
    </h3>
    <p className="text-sm text-text-secondary font-body">
      {isHost ? "🏆 Trip Host" : "🌍 Traveler"}
    </p>
    <div className="flex items-center justify-center space-x-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3 text-accent-yellow fill-current"
        />
      ))}
      <span className="text-xs text-text-light ml-1 font-body">4.9</span>
    </div>
  </div>
);

const Navigation = ({ isHost, activeTab, setActiveTab }) => {
  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
    ...(isHost
      ? [
          { id: "my-trips", label: "My Trips", icon: Globe },
          { id: "create-trip", label: "Create Trip", icon: Plus },
          { id: "bookings-management", label: "Manage Bookings", icon: Calendar },
          { id: "analytics", label: "Analytics & Earnings", icon: TrendingUp },
          { id: "community", label: "Community Tools", icon: Users },
        ]
      : [
          { id: "discover", label: "Discover Trips", icon: Compass },
          { id: "my-bookings", label: "My Bookings", icon: Calendar },
          { id: "saved", label: "Saved Trips", icon: Heart },
          { id: "reviews", label: "My Reviews", icon: Star },
          { id: "become-host", label: "Become a Host", icon: Camera },
        ]),
    { id: "profile", label: "Profile Settings", icon: Settings },
  ];

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
            activeTab === item.id
              ? "bg-accent-yellow text-primary-black shadow-md"
              : "text-text-secondary hover:bg-ui-border"
          }`}
        >
          <item.icon className="w-4 h-4" />
          <span className="font-body">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const StatsCard = ({ isHost, stats, formatPrice }) => (
  <div className="bg-primary-white rounded-xl shadow-lg border p-6">
    <h3 className="font-semibold text-text-primary mb-4 font-heading">
      Your Stats 📊
    </h3>
    <div className="space-y-4">
      {isHost ? (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Total Trips Created
            </span>
            <span className="font-semibold text-text-primary font-body">
              {stats.hosted_trips || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Total Earnings
            </span>
            <span className="font-semibold text-text-primary font-body">
              {formatPrice(stats.total_earnings || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Active Bookings
            </span>
            <span className="font-semibold text-text-primary font-body">
              {stats.active_bookings || 0}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Completed Trips
            </span>
            <span className="font-semibold text-text-primary font-body">
              {stats.completed_trips || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Upcoming Trips
            </span>
            <span className="font-semibold text-text-primary font-body">
              {stats.upcoming_trips || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Total Invested
            </span>
            <span className="font-semibold text-text-primary font-body">
              {formatPrice(stats.total_spent || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              Saved Trips
            </span>
            <span className="font-semibold text-text-primary font-body">
              {stats.saved_trips || 0}
            </span>
          </div>
        </>
      )}
    </div>
  </div>
);


export default function DashboardSidebar({
  user,
  userProfile,
  isHost,
  activeTab,
  setActiveTab,
  stats,
  formatPrice,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-primary-white rounded-xl shadow-lg border p-6 mb-6">
        <UserProfileCard user={user} userProfile={userProfile} isHost={isHost} />
        <Navigation isHost={isHost} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <StatsCard isHost={isHost} stats={stats} formatPrice={formatPrice} />
    </div>
  );
}
