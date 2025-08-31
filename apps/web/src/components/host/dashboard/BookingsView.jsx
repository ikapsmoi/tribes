import {
  Users,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { formatDate, formatPrice, getBookingStatusColor } from "@/utils/dashboard";

const BookingCard = ({ booking }) => (
  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3
          className="font-semibold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {booking.trip_title}
        </h3>
        <p
          className="text-sm text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Booked by {booking.traveler_name}
        </p>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(
          booking.booking_status
        )}`}
      >
        {booking.booking_status}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div>
        <span
          className="text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Booking Date:
        </span>
        <div
          className="font-medium text-gray-900"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatDate(booking.booking_date)}
        </div>
      </div>
      <div>
        <span
          className="text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Amount:
        </span>
        <div
          className="font-medium text-gray-900"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatPrice(booking.total_amount)}
        </div>
      </div>
      <div>
        <span
          className="text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Payment:
        </span>
        <div
          className="font-medium text-gray-900"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {booking.payment_status}
        </div>
      </div>
      <div>
        <span
          className="text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Trip Dates:
        </span>
        <div
          className="font-medium text-gray-900"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {formatDate(booking.start_date)}
        </div>
      </div>
    </div>

    <div className="flex items-center space-x-4 mt-4">
      <button
        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <MessageCircle className="w-4 h-4 inline mr-1" />
        Contact Traveler
      </button>
      {booking.booking_status === "pending" && (
        <>
          <button
            className="text-green-500 hover:text-green-600 text-sm font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Confirm
          </button>
          <button
            className="text-red-500 hover:text-red-600 text-sm font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Decline
          </button>
        </>
      )}
    </div>
  </div>
);

const EmptyBookings = () => (
    <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3
            className="text-lg font-semibold text-gray-900 mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
        >
            No bookings yet
        </h3>
        <p
            className="text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            Once travelers book your trips, you'll see them here.
        </p>
    </div>
);

export default function BookingsView({ bookings }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2
          className="text-xl font-semibold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Trip Bookings
        </h2>
      </div>

      <div className="p-6">
        {bookings.length === 0 ? (
          <EmptyBookings />
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
