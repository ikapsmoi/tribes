import { UserCheck, Star, DollarSign } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      icon: UserCheck,
      color: "from-green-50 to-green-100",
      bgColor: "bg-green-500",
      title: "New booking received!",
      description: "Sarah M. booked your Tokyo Adventure trip",
      time: "2 hours ago",
    },
    {
      icon: Star,
      color: "from-blue-50 to-blue-100",
      bgColor: "bg-blue-500",
      title: "New 5-star review!",
      description: '"Amazing experience with incredible host"',
      time: "1 day ago",
    },
    {
      icon: DollarSign,
      color: "from-purple-50 to-purple-100",
      bgColor: "bg-purple-500",
      title: "Payment received",
      description: "Final payment for Bali Retreat - $1,200",
      time: "3 days ago",
    },
  ];

  return (
    <div className="bg-primary-white rounded-xl shadow-lg border p-6">
      <h3 className="text-xl font-semibold text-text-primary mb-6 font-heading">
        Recent Activity 🚀
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex items-center space-x-4 p-4 bg-gradient-to-r ${activity.color} rounded-lg`}
          >
            <div
              className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <activity.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-text-primary font-heading">
                {activity.title}
              </p>
              <p className="text-sm text-text-secondary font-body">
                {activity.description}
              </p>
            </div>
            <span className="text-sm text-text-light font-body flex-shrink-0">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
