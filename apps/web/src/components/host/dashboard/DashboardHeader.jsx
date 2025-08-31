import { LogOut } from "lucide-react";

export default function DashboardHeader({ onSignOut }) {
  return (
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
              Host Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/trips"
              className="text-gray-600 hover:text-gray-900 font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Browse Trips
            </a>
            <button
              onClick={onSignOut}
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
  );
}
