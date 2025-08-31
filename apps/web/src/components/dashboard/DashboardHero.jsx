import { Plus, BarChart3, Search, Camera, Plane } from "lucide-react";

export default function DashboardHero({ user, isHost, setActiveTab }) {
  return (
    <div className="bg-gradient-to-r from-brand-navy to-brand-aqua rounded-2xl p-8 mb-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 font-heading">
            Welcome back, {user.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-lg opacity-90 mb-6 font-body">
            {isHost
              ? "Ready to create unforgettable group travel experiences for your community?"
              : "Ready to discover your next group travel adventure?"}
          </p>
          <div className="flex space-x-4">
            {isHost ? (
              <>
                <button
                  onClick={() => setActiveTab("create-trip")}
                  className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-3 rounded-lg font-semibold transition-colors font-body"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Create New Trip
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className="bg-primary-white/20 hover:bg-primary-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors font-body"
                >
                  <BarChart3 className="w-5 h-5 inline mr-2" />
                  View Analytics
                </button>
              </>
            ) : (
              <>
                <a
                  href="/trips"
                  className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-6 py-3 rounded-lg font-semibold transition-colors font-body"
                >
                  <Search className="w-5 h-5 inline mr-2" />
                  Find Your Trip
                </a>
                <button
                  onClick={() => setActiveTab("become-host")}
                  className="bg-primary-white/20 hover:bg-primary-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors font-body"
                >
                  <Camera className="w-5 h-5 inline mr-2" />
                  Become a Host
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-48 h-32 bg-primary-white/20 rounded-lg flex items-center justify-center">
            <Plane className="w-16 h-16 text-white opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
