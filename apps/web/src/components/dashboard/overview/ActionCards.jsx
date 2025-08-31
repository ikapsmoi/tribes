import { ChevronRight } from "lucide-react";

export default function ActionCards({ isHost, setActiveTab }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-accent-yellow to-accent-gold rounded-xl p-6 text-primary-black">
        <h4 className="text-lg font-bold mb-2 font-heading">
          {isHost ? "🎯 Grow Your Community" : "🌟 Discover Amazing Trips"}
        </h4>
        <p className="mb-4 font-body">
          {isHost
            ? "Create unforgettable experiences and build lasting connections with your audience."
            : "Join group adventures with like-minded travelers from around the world."}
        </p>
        <button
          onClick={() => setActiveTab(isHost ? "create-trip" : "discover")}
          className="bg-primary-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors font-body"
        >
          {isHost ? "Create Trip" : "Browse Trips"}
          <ChevronRight className="w-4 h-4 inline ml-1" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-brand-navy to-brand-aqua rounded-xl p-6 text-white">
        <h4 className="text-lg font-bold mb-2 font-heading">
          💬 Connect with Community
        </h4>
        <p className="mb-4 opacity-90 font-body">
          Join our vibrant community of travelers and hosts sharing experiences
          and tips.
        </p>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-colors font-body">
          Join Community
          <ChevronRight className="w-4 h-4 inline ml-1" />
        </button>
      </div>
    </div>
  );
}
