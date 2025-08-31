import { Star, LogOut } from "lucide-react";

export default function DashboardHeader({ isHost, onSignOut }) {
  return (
    <div className="bg-primary-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="font-bold text-2xl text-text-primary font-heading"
            >
              TravelTribe
            </a>
            <span className="text-text-light">|</span>
            <h1 className="text-xl font-semibold text-text-primary font-heading">
              {isHost ? "Host Dashboard" : "Travel Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-accent-yellow px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-primary-black" />
              <span className="text-sm font-medium text-primary-black font-body">
                4.9/5 ⭐ 2,500+ reviews
              </span>
            </div>
            <a
              href="/trips"
              className="text-text-secondary hover:text-text-primary font-medium font-body"
            >
              Browse Trips
            </a>
            <button
              onClick={onSignOut}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium font-body">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
