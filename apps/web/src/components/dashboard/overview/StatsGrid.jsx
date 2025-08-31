import { TrendingUp, Calendar, DollarSign, Star } from "lucide-react";

const StatCard = ({ fromColor, toColor, icon: Icon, title, value, label }) => (
  <div
    className={`bg-gradient-to-r ${fromColor} ${toColor} rounded-xl p-6 text-white`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="opacity-80 text-sm font-body">{title}</p>
        <p className="text-2xl font-bold font-heading">{value}</p>
        <p className="opacity-80 text-sm font-body">{label}</p>
      </div>
      <Icon className="w-8 h-8 opacity-80" />
    </div>
  </div>
);

export default function StatsGrid({ isHost, stats, formatPrice }) {
  const travelerStats = [
    {
      fromColor: "from-green-400",
      toColor: "to-green-600",
      icon: TrendingUp,
      title: "This Month",
      value: stats.completed_trips || 0,
      label: "Trips Completed",
    },
    {
      fromColor: "from-blue-400",
      toColor: "to-blue-600",
      icon: Calendar,
      title: "Active",
      value: stats.upcoming_trips || 0,
      label: "Upcoming Trips",
    },
    {
      fromColor: "from-purple-400",
      toColor: "to-purple-600",
      icon: DollarSign,
      title: "Total",
      value: formatPrice(stats.total_spent || 0),
      label: "Invested",
    },
    {
      fromColor: "from-orange-400",
      toColor: "to-orange-600",
      icon: Star,
      title: "Rating",
      value: "4.9",
      label: "Average Score",
    },
  ];

  const hostStats = [
    {
      fromColor: "from-green-400",
      toColor: "to-green-600",
      icon: TrendingUp,
      title: "This Month",
      value: stats.hosted_trips || 0,
      label: "Trips Created",
    },
    {
      fromColor: "from-blue-400",
      toColor: "to-blue-600",
      icon: Calendar,
      title: "Active",
      value: stats.active_bookings || 0,
      label: "Bookings",
    },
    {
      fromColor: "from-purple-400",
      toColor: "to-purple-600",
      icon: DollarSign,
      title: "Total",
      value: formatPrice(stats.total_earnings || 0),
      label: "Earned",
    },
    {
      fromColor: "from-orange-400",
      toColor: "to-orange-600",
      icon: Star,
      title: "Rating",
      value: "4.9",
      label: "Average Score",
    },
  ];

  const displayStats = isHost ? hostStats : travelerStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {displayStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
