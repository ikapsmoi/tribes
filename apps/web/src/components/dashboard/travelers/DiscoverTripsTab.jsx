import { useState } from "react";
import { Search, Filter, MapPin, Star } from "lucide-react";

export default function DiscoverTripsTab({ formatPrice }) {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredTrips = [
    {
      title: "Bali Wellness Retreat",
      destination: "Ubud, Indonesia", 
      price: 1299,
      rating: 4.9,
      image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
      host: "Yoga with Sarah",
      spots: "3/12 spots left"
    },
    {
      title: "Tokyo Food & Culture",
      destination: "Tokyo, Japan",
      price: 1599,
      rating: 4.8,
      image: "https://images.pexels.com/photos/161401/fushimi-inari-taisha-kyoto-japan-temple-161401.jpeg",
      host: "Foodie Adventures",
      spots: "5/8 spots left"
    },
    {
      title: "Iceland Northern Lights",
      destination: "Reykjavik, Iceland",
      price: 1899,
      rating: 4.9,
      image: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg",
      host: "Arctic Explorer",
      spots: "2/10 spots left"
    },
    {
      title: "Morocco Desert Safari",
      destination: "Marrakech, Morocco",
      price: 899,
      rating: 4.7,
      image: "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg",
      host: "Desert Wanderers",
      spots: "6/15 spots left"
    },
    {
      title: "Greek Island Hopping",
      destination: "Santorini, Greece",
      price: 1299,
      rating: 4.8,
      image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
      host: "Mediterranean Dreams",
      spots: "4/10 spots left"
    },
    {
      title: "Peru Machu Picchu Trek",
      destination: "Cusco, Peru",
      price: 1099,
      rating: 4.9,
      image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
      host: "Andes Adventures",
      spots: "7/12 spots left"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-primary-white rounded-xl shadow-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary font-heading">
            🌍 Discover Amazing Group Trips
          </h2>
          <a 
            href="/trips"
            className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-4 py-2 rounded-lg font-semibold transition-colors font-body"
          >
            View All Trips
          </a>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Search destinations or trip types..."
              className="w-full pl-10 pr-4 py-3 border border-ui-border rounded-lg focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 bg-ui-border hover:bg-text-light px-4 py-3 rounded-lg font-body">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Featured Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrips.map((trip, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-accent-yellow fill-current" />
                    <span className="text-xs font-semibold font-body">{trip.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text-primary mb-1 font-heading">{trip.title}</h3>
                <p className="text-sm text-text-secondary mb-2 font-body flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {trip.destination}
                </p>
                <p className="text-xs text-text-light mb-2 font-body">Hosted by {trip.host}</p>
                <p className="text-xs text-orange-600 mb-3 font-body">{trip.spots}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-text-primary font-heading">
                    {formatPrice(trip.price)}
                  </span>
                  <button className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-3 py-1 rounded-lg text-sm font-semibold transition-colors font-body">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}