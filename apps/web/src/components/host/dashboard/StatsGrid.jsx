import {
  Calendar,
  Users,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";
import { formatPrice } from "@/utils/dashboard";

const StatCard = ({ title, value, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl shadow-sm border p-6">
    <div className="flex items-center justify-between">
      <div>
        <p
          className="text-sm text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {title}
        </p>
        <p
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {value}
        </p>
      </div>
      <div className={`p-3 ${iconBg} rounded-lg`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  </div>
);

export default function StatsGrid({ stats }) {
  const statItems = [
    {
      title: "Active Trips",
      value: stats.active_trips || 0,
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Bookings",
      value: stats.total_bookings || 0,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: formatPrice(stats.total_revenue || 0),
      icon: DollarSign,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Avg Rating",
      value: stats.avg_rating ? stats.avg_rating.toFixed(1) : "0.0",
      icon: Star,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Trips",
      value: stats.total_trips || 0,
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statItems.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}
