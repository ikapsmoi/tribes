"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Lock,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function CheckoutPage() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("deposit");
  const [formData, setFormData] = useState({
    emergency_contact_name: "",
    emergency_contact_phone: "",
    special_requests: "",
    roommate_preferences: "",
    dietary_restrictions: "",
    medical_conditions: "",
    payment_method: "card",
    card_number: "",
    expiry_date: "",
    cvv: "",
    cardholder_name: "",
    billing_address: "",
    billing_city: "",
    billing_zip: "",
    terms_accepted: false,
  });

  const { data: user } = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = urlParams.get("trip_id");

    if (tripId) {
      fetchTripDetails(tripId);
    } else {
      setError("No trip selected for checkout");
      setLoading(false);
    }
  }, []);

  const fetchTripDetails = async (tripId) => {
    try {
      const response = await fetch(`/api/trips/${tripId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch trip details");
      }
      const data = await response.json();
      setTrip(data.trip);
    } catch (error) {
      console.error("Error fetching trip:", error);
      setError("Failed to load trip details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      window.location.href =
        "/account/signin?callbackUrl=" +
        encodeURIComponent(window.location.href);
      return;
    }

    if (!formData.terms_accepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_id: trip.id,
          emergency_contact_name: formData.emergency_contact_name,
          emergency_contact_phone: formData.emergency_contact_phone,
          special_requests: formData.special_requests,
          roommate_preferences: formData.roommate_preferences,
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      const bookingData = await bookingResponse.json();

      // Process payment (in a real app, this would integrate with Stripe or similar)
      const paymentResponse = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingData.booking.id,
          payment_type: paymentMethod,
          payment_method: formData.payment_method,
          amount:
            paymentMethod === "deposit"
              ? trip.deposit_amount
              : trip.price_per_person,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Payment processing failed");
      }

      // Redirect to success page
      window.location.href = `/booking-confirmation?booking_id=${bookingData.booking.id}`;
    } catch (error) {
      console.error("Checkout error:", error);
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const depositAmount = trip ? trip.price_per_person * 0.25 : 0;
  const remainingAmount = trip ? trip.price_per_person * 0.75 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-yellow"></div>
      </div>
    );
  }

  if (error && !trip) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2 font-heading">
            Checkout Error
          </h2>
          <p className="text-text-secondary mb-4 font-body">{error}</p>
          <a
            href="/trips"
            className="bg-accent-yellow text-primary-black px-6 py-3 rounded-lg hover:bg-accent-gold transition-colors font-body"
          >
            Browse Trips
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header */}
      <div className="bg-primary-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-text-primary mr-8 font-heading"
            >
              TravelTribe
            </a>
            <div className="flex items-center space-x-2 text-sm text-text-secondary font-body">
              <span>Trip Details</span>
              <span>→</span>
              <span className="text-accent-yellow font-medium">Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-text-primary mb-4 font-heading">
                Trip Summary
              </h2>

              <img
                src={
                  trip.hero_image_url ||
                  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400"
                }
                alt={trip.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                {trip.title}
              </h3>

              <div className="space-y-3 text-sm text-text-secondary mb-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="font-body">
                    {trip.destination}, {trip.country}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-body">
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-body">{trip.duration} days</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-body">
                    {trip.capacity_max - trip.current_bookings} spots left
                  </span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-text-primary mb-3 font-heading">
                  Pricing
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-body">Trip price per person:</span>
                    <span className="font-body">
                      {formatPrice(trip.price_per_person)}
                    </span>
                  </div>
                  <div className="flex justify-between text-accent-yellow">
                    <span className="font-body">Deposit (25%):</span>
                    <span className="font-body">
                      {formatPrice(depositAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span className="font-body">
                      Remaining (due 90 days before):
                    </span>
                    <span className="font-body">
                      {formatPrice(remainingAmount)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-nature-paleBlue rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-brand-navy mr-2 mt-0.5" />
                    <div className="text-xs text-brand-navy">
                      <p className="font-medium mb-1 font-body">
                        Payment Schedule
                      </p>
                      <p className="font-body">
                        Pay 25% deposit now to secure your spot. The remaining
                        75% will be automatically charged 90 days before your
                        trip.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Traveler Information */}
              <div className="bg-primary-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6 font-heading">
                  Traveler Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emergency_contact_name}
                      onChange={(e) =>
                        handleInputChange(
                          "emergency_contact_name",
                          e.target.value,
                        )
                      }
                      className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.emergency_contact_phone}
                      onChange={(e) =>
                        handleInputChange(
                          "emergency_contact_phone",
                          e.target.value,
                        )
                      }
                      className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    value={formData.dietary_restrictions}
                    onChange={(e) =>
                      handleInputChange("dietary_restrictions", e.target.value)
                    }
                    className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    placeholder="Vegetarian, allergies, etc."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                    Roommate Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.roommate_preferences}
                    onChange={(e) =>
                      handleInputChange("roommate_preferences", e.target.value)
                    }
                    className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    placeholder="Any preferences for room sharing..."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                    Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.special_requests}
                    onChange={(e) =>
                      handleInputChange("special_requests", e.target.value)
                    }
                    className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    placeholder="Any special requests or needs..."
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-primary-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6 font-heading">
                  Payment Method
                </h2>

                {/* Payment Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-primary mb-3 font-body">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === "deposit"
                          ? "border-accent-yellow bg-nature-paleBlue"
                          : "border-ui-border hover:border-text-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="deposit"
                        checked={paymentMethod === "deposit"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-text-primary font-body">
                            Pay Deposit
                          </div>
                          <div className="text-sm text-text-secondary font-body">
                            25% now, 75% later
                          </div>
                        </div>
                        <div className="text-lg font-bold text-accent-yellow font-heading">
                          {formatPrice(depositAmount)}
                        </div>
                      </div>
                    </label>

                    <label
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === "full"
                          ? "border-accent-yellow bg-nature-paleBlue"
                          : "border-ui-border hover:border-text-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="full"
                        checked={paymentMethod === "full"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-text-primary font-body">
                            Pay in Full
                          </div>
                          <div className="text-sm text-text-secondary font-body">
                            Complete payment now
                          </div>
                        </div>
                        <div className="text-lg font-bold text-nature-forestGreen font-heading">
                          {formatPrice(trip.price_per_person)}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardholder_name}
                      onChange={(e) =>
                        handleInputChange("cardholder_name", e.target.value)
                      }
                      className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      placeholder="Name on card"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.card_number}
                        onChange={(e) =>
                          handleInputChange("card_number", e.target.value)
                        }
                        className="w-full border border-ui-border rounded-lg px-3 py-2 pl-10 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                        placeholder="1234 5678 9012 3456"
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.expiry_date}
                        onChange={(e) =>
                          handleInputChange("expiry_date", e.target.value)
                        }
                        className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        className="w-full border border-ui-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-brand-light rounded-lg flex items-center">
                  <Lock className="w-5 h-5 text-text-secondary mr-3" />
                  <div className="text-sm text-text-secondary font-body">
                    Your payment information is secure and encrypted. We use
                    industry-standard security measures to protect your data.
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="bg-primary-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.terms_accepted}
                    onChange={(e) =>
                      handleInputChange("terms_accepted", e.target.checked)
                    }
                    className="mt-1 mr-3"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-text-primary font-body"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-accent-yellow hover:text-accent-gold"
                    >
                      Terms of Service
                    </a>
                    ,{" "}
                    <a
                      href="/privacy"
                      className="text-accent-yellow hover:text-accent-gold"
                    >
                      Privacy Policy
                    </a>
                    , and{" "}
                    <a
                      href="/community-guidelines"
                      className="text-accent-yellow hover:text-accent-gold"
                    >
                      Community Guidelines
                    </a>
                    . I understand the cancellation policy and payment schedule.
                  </label>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-red-800 font-body">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing || !formData.terms_accepted}
                  className="w-full bg-accent-yellow text-primary-black py-4 px-6 rounded-lg font-semibold hover:bg-accent-gold disabled:bg-text-light disabled:cursor-not-allowed flex items-center justify-center transition-colors font-body"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-black mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-3" />
                      Complete Booking -{" "}
                      {formatPrice(
                        paymentMethod === "deposit"
                          ? depositAmount
                          : trip.price_per_person,
                      )}
                    </>
                  )}
                </button>

                <p className="text-xs text-text-secondary text-center mt-4 font-body">
                  By completing this booking, you agree to pay the amount shown
                  above.
                  {paymentMethod === "deposit" &&
                    " The remaining balance will be automatically charged 90 days before your trip."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
