import {
  Plus,
  Calendar,
  MapPin,
  Star,
  Eye,
  Edit,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { formatDate, formatPrice, getStatusColor } from "@/utils/dashboard";

const TripCard = ({ trip }) => (
  <div
    key={trip.id}
    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
  >
    <div className="flex items-start space-x-4">
      <img
        src={
          trip.hero_image_url ||
          "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
        }
        alt={trip.title}
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              className="font-semibold text-gray-900 mb-1"
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {trip.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span style={{ fontFamily: "Inter, sans-serif" }}>
                {trip.destination}, {trip.country}
              </span>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              trip.status
            )}`}
          >
            {trip.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <span
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Dates:
            </span>
            <div
              className="font-medium text-gray-900"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
            </div>
          </div>
          <div>
            <span
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Price:
            </span>
            <div
              className="font-medium text-gray-900"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {formatPrice(trip.price_per_person)}
            </div>
          </div>
          <div>
            <span
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Travelers:
            </span>
            <div
              className="font-medium text-gray-900"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {trip.current_travelers}/{trip.max_travelers}
            </div>
          </div>
          <div>
            <span
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Rating:
            </span>
            <div
              className="font-medium text-gray-900 flex items-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              {trip.avg_rating ? trip.avg_rating.toFixed(1) : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href={`/trips/${trip.id}`}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </a>
          <button
            className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            className="text-gray-500 hover:text-gray-600 text-sm font-medium flex items-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Messages
          </button>
          {trip.status === "draft" && (
            <button
              className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

const EmptyTrips = () => (
  <div className="text-center py-12">
    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3
      className="text-lg font-semibold text-gray-900 mb-2"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      No trips created yet
    </h3>
    <p
      className="text-gray-600 mb-6"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Start hosting by creating your first amazing trip experience!
    </p>
    <a
      href="/host/create-trip"
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Create Your First Trip
    </a>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    ))}
  </div>
);

export default function TripsView({ trips, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-semibold text-gray-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            My Trips
          </h2>
          <a
            href="/host/create-trip"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Create Trip
          </a>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <LoadingSkeleton />
        ) : trips.length === 0 ? (
          <EmptyTrips />
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
