import { useState, useEffect } from "react";
import { 
  ArrowLeft, MapPin, Calendar, Users, Star, Heart, Share2, 
  Clock, DollarSign, Shield, CheckCircle, MessageCircle,
  Instagram, Youtube, Globe, Camera
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function TripDetailPage({ params }) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const { data: user } = useUser();

  useEffect(() => {
    if (params.id) {
      fetchTrip();
    }
  }, [params.id]);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trips/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch trip');
      
      const data = await response.json();
      setTrip(data.trip);
      setIsSaved(data.trip.is_saved);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveTrip = async () => {
    if (!user) {
      window.location.href = '/account/signin';
      return;
    }

    try {
      const method = isSaved ? 'DELETE' : 'POST';
      const response = await fetch(`/api/trips/${params.id}/save`, { method });
      
      if (response.ok) {
        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.error('Error toggling save trip:', error);
    }
  };

  const handleBookTrip = () => {
    if (!user) {
      window.location.href = '/account/signin';
      return;
    }
    setShowBookingModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h1>
          <a href="/trips" className="text-orange-500 hover:text-orange-600">
            ← Back to trips
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={trip.hero_image_url || 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg'}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <a
            href="/trips"
            className="flex items-center space-x-2 bg-white/90 hover:bg-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Back to Trips</span>
          </a>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSaveTrip}
              className="p-3 bg-white/90 hover:bg-white rounded-lg transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button className="p-3 bg-white/90 hover:bg-white rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Trip Title */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-3 capitalize">
            {trip.trip_type}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {trip.title}
          </h1>
          <div className="flex items-center text-white/90 text-lg">
            <MapPin className="w-5 h-5 mr-2" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{trip.destination}, {trip.country}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trip Details */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Duration</div>
                  <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {getDuration(trip.start_date, trip.end_date)}
                  </div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Group Size</div>
                  <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {trip.min_travelers}-{trip.max_travelers} people
                  </div>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Difficulty</div>
                  <div className="font-semibold text-gray-900 capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {trip.difficulty_level}
                  </div>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Spots Left</div>
                  <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {trip.spots_left}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'itinerary', label: 'Itinerary' },
                    { id: 'reviews', label: `Reviews (${trip.review_count})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        About This Trip
                      </h3>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {trip.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Trip Dates
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Departure</div>
                            <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {formatDate(trip.start_date)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Return</div>
                            <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {formatDate(trip.end_date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {trip.images && trip.images.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Gallery
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {trip.images.map((image, index) => (
                            <div key={image.id} className="aspect-square rounded-lg overflow-hidden">
                              <img
                                src={image.image_url}
                                alt={image.caption || `Trip image ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {trip.itinerary && trip.itinerary.length > 0 ? (
                      trip.itinerary.map((day) => (
                        <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {day.day_number}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Day {day.day_number}: {day.title}
                              </h4>
                              {day.description && (
                                <p className="text-gray-700 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {day.description}
                                </p>
                              )}
                              {day.activities && day.activities.length > 0 && (
                                <div className="mb-3">
                                  <h5 className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Activities:
                                  </h5>
                                  <ul className="text-sm text-gray-700 space-y-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {day.activities.map((activity, index) => (
                                      <li key={index} className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {day.meals_included && day.meals_included.length > 0 && (
                                <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  <strong>Meals included:</strong> {day.meals_included.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Detailed itinerary coming soon!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {trip.reviews && trip.reviews.length > 0 ? (
                      trip.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.traveler_image || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'}
                              alt={review.traveler_name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {review.traveler_name}
                                </h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {review.review_text}
                              </p>
                              <div className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {new Date(review.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          No reviews yet. Be the first to review this trip!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card & Host Info */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {formatPrice(trip.price_per_person)}
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  per person
                </div>
                {trip.deposit_amount && (
                  <div className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {formatPrice(trip.deposit_amount)} deposit required
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Trip dates:</span>
                  <span className="font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Spots available:</span>
                  <span className="font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {trip.spots_left} of {trip.max_travelers}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookTrip}
                disabled={trip.spots_left === 0}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold text-lg transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {trip.spots_left === 0 ? 'Trip Full' : 'Book This Trip'}
              </button>

              <div className="mt-4 text-center">
                <button className="text-orange-500 hover:text-orange-600 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  Contact Host
                </button>
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Your Host
              </h3>
              
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={trip.host_image || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'}
                  alt={trip.host_name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {trip.host_name}
                    </h4>
                    {trip.host_verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  {trip.community_name && (
                    <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {trip.community_name}
                    </div>
                  )}
                  {trip.community_size > 0 && (
                    <div className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {trip.community_size.toLocaleString()} followers
                    </div>
                  )}
                </div>
              </div>

              {trip.host_bio && (
                <p className="text-gray-700 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {trip.host_bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {trip.social_instagram && (
                  <a
                    href={`https://instagram.com/${trip.social_instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                {trip.social_youtube && (
                  <a
                    href={trip.social_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                {trip.social_website && (
                  <a
                    href={trip.social_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                  </a>
                )}
              </div>

              {trip.avg_rating > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Host Rating
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {trip.avg_rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        ({trip.review_count} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Book Your Spot
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              You're about to book a spot on "{trip.title}". This will redirect you to our secure booking flow.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={() => window.location.href = `/trips/${trip.id}/book`}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}