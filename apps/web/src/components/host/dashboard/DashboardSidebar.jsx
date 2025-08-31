import {
  Calendar,
  Users,
  TrendingUp,
  Settings,
  CheckCircle,
  Plus,
} from "lucide-react";

const HostProfile = ({ user, userProfile }) => (
  <div className="text-center mb-6">
    <img
      src={
        user.image ||
        userProfile?.profile_image_url ||
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
      }
      alt={user.name}
      className="w-20 h-20 rounded-full mx-auto mb-3"
    />
    <h3
      className="font-semibold text-gray-900"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {user.name}
    </h3>
    <p
      className="text-sm text-gray-600"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Trip Host
    </p>
    {userProfile?.host_verified && (
      <div className="flex items-center justify-center mt-2">
        <CheckCircle className="w-4 h-4 text-blue-500 mr-1" />
        <span
          className="text-xs text-blue-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Verified Host
        </span>
      </div>
    )}
  </div>
);

const DashboardNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "trips", label: "My Trips", icon: Calendar },
    { id: "bookings", label: "Bookings", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "profile", label: "Profile Settings", icon: Settings },
  ];

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
            activeTab === item.id
              ? "bg-orange-50 text-orange-600 border border-orange-200"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const QuickActions = () => (
  <div className="bg-white rounded-xl shadow-sm border p-6">
    <h3
      className="font-semibold text-gray-900 mb-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      Quick Actions
    </h3>
    <div className="space-y-3">
      <a
        href="/host/create-trip"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create New Trip
      </a>
      <button
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        View Analytics
      </button>
      <button
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Manage Profile
      </button>
    </div>
  </div>
);

export default function DashboardSidebar({ user, userProfile, activeTab, setActiveTab }) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <HostProfile user={user} userProfile={userProfile} />
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <QuickActions />
    </div>
  );
}
