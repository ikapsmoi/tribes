import { useState } from "react";
import { Camera, MapPin, Calendar, Users, DollarSign, Clock, Plus, Upload } from "lucide-react";

export default function CreateTripTab() {
  const [tripData, setTripData] = useState({
    title: "",
    destination: "",
    country: "",
    tripType: "",
    startDate: "",
    endDate: "",
    price: "",
    maxTravelers: "",
    description: "",
    inclusions: []
  });

  const [currentInclusion, setCurrentInclusion] = useState("");

  const handleInputChange = (field, value) => {
    setTripData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addInclusion = () => {
    if (currentInclusion.trim()) {
      setTripData(prev => ({
        ...prev,
        inclusions: [...prev.inclusions, currentInclusion.trim()]
      }));
      setCurrentInclusion("");
    }
  };

  const removeInclusion = (index) => {
    setTripData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-aqua rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 font-heading">
          ✨ Create Your Next Adventure
        </h2>
        <p className="opacity-90 font-body">
          Design an unforgettable group travel experience for your community
        </p>
      </div>

      <div className="bg-primary-white rounded-xl shadow-lg border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Trip Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Bali Wellness Retreat with Sarah"
                      value={tripData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                        Destination City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Ubud"
                        value={tripData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                        Country *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Indonesia"
                        value={tripData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Trip Type *
                    </label>
                    <select 
                      value={tripData.tripType}
                      onChange={(e) => handleInputChange("tripType", e.target.value)}
                      className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    >
                      <option value="">Select trip type...</option>
                      <option value="wellness-retreat">Wellness Retreat</option>
                      <option value="adventure-tour">Adventure Tour</option>
                      <option value="cultural-experience">Cultural Experience</option>
                      <option value="food-wine">Food & Wine</option>
                      <option value="photography">Photography</option>
                      <option value="fitness-sports">Fitness & Sports</option>
                      <option value="luxury-travel">Luxury Travel</option>
                      <option value="backpacking">Backpacking</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates & Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                  Dates & Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={tripData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={tripData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Price Per Person (USD) *
                    </label>
                    <input
                      type="number"
                      placeholder="1299"
                      value={tripData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                      Max Travelers *
                    </label>
                    <input
                      type="number"
                      placeholder="12"
                      value={tripData.maxTravelers}
                      onChange={(e) => handleInputChange("maxTravelers", e.target.value)}
                      className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                  Trip Description
                </h3>
                <textarea
                  rows={6}
                  placeholder="Describe your amazing trip experience... What makes it special? What will travelers experience? What's the itinerary like?"
                  value={tripData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full border border-ui-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                />
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                  What's Included
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g., 7 nights accommodation"
                    value={currentInclusion}
                    onChange={(e) => setCurrentInclusion(e.target.value)}
                    className="flex-1 border border-ui-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-body"
                    onKeyPress={(e) => e.key === 'Enter' && addInclusion()}
                  />
                  <button
                    onClick={addInclusion}
                    className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-4 py-2 rounded-lg font-semibold transition-colors font-body"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {tripData.inclusions.length > 0 && (
                  <div className="space-y-2">
                    {tripData.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-center justify-between bg-ui-border rounded-lg px-3 py-2">
                        <span className="font-body">✓ {inclusion}</span>
                        <button
                          onClick={() => removeInclusion(index)}
                          className="text-red-500 hover:text-red-700 font-body"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Photo Upload */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                  Trip Photos
                </h3>
                <div className="border-2 border-dashed border-ui-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-text-light mx-auto mb-4" />
                  <h4 className="font-semibold text-text-primary mb-2 font-heading">Upload Photos</h4>
                  <p className="text-text-secondary mb-4 font-body">
                    Add beautiful photos that showcase your destination and experience
                  </p>
                  <button className="bg-ui-border hover:bg-text-light text-text-primary px-4 py-2 rounded-lg font-medium transition-colors font-body">
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
                  Trip Preview
                </h3>
                <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-brand-navy to-brand-aqua flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white opacity-50" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-text-primary mb-2 font-heading">
                      {tripData.title || "Your Trip Title"}
                    </h4>
                    <div className="flex items-center text-text-secondary text-sm mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="font-body">
                        {tripData.destination && tripData.country 
                          ? `${tripData.destination}, ${tripData.country}`
                          : "Destination, Country"
                        }
                      </span>
                    </div>
                    <div className="flex items-center text-text-secondary text-sm mb-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="font-body">
                        {tripData.startDate && tripData.endDate
                          ? `${new Date(tripData.startDate).toLocaleDateString()} - ${new Date(tripData.endDate).toLocaleDateString()}`
                          : "Select dates"
                        }
                      </span>
                    </div>
                    <div className="flex items-center text-text-secondary text-sm mb-3">
                      <Users className="w-3 h-3 mr-1" />
                      <span className="font-body">
                        Max {tripData.maxTravelers || "0"} travelers
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-text-primary font-heading">
                        ${tripData.price || "0"}
                      </span>
                      <span className="text-sm text-text-secondary font-body">per person</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-ui-border">
            <button className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-8 py-3 rounded-lg font-semibold transition-colors font-body">
              Create Trip
            </button>
            <button className="bg-ui-border hover:bg-text-light text-text-primary px-8 py-3 rounded-lg font-semibold transition-colors font-body">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}