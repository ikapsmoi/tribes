import { TrendingUp } from "lucide-react";

export default function AnalyticsView() {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2
          className="text-xl font-semibold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Analytics & Performance
        </h2>
      </div>

      <div className="p-6">
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3
            className="text-lg font-semibold text-gray-900 mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Analytics Coming Soon
          </h3>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Detailed analytics and performance metrics will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}
