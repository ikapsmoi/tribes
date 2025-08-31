import { DollarSign, Users, Shield, ChevronRight } from "lucide-react";

export default function BecomeHostTab() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-aqua rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">
            🎯 Ready to Become a Host?
          </h2>
          <p className="text-xl opacity-90 mb-6 font-body">
            Turn your passion into profit by hosting group travel experiences
          </p>
          <button className="bg-accent-yellow hover:bg-accent-gold text-primary-black px-8 py-3 rounded-lg font-bold text-lg transition-colors font-body">
            Start Hosting Today
          </button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-white rounded-xl shadow-lg border p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">Earn Money</h3>
          <p className="text-text-secondary font-body">
            Hosts earn an average of $3,000-$15,000 per trip depending on destination and group size.
          </p>
        </div>

        <div className="bg-primary-white rounded-xl shadow-lg border p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">Build Community</h3>
          <p className="text-text-secondary font-body">
            Strengthen relationships with your audience through shared travel experiences.
          </p>
        </div>

        <div className="bg-primary-white rounded-xl shadow-lg border p-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">Full Support</h3>
          <p className="text-text-secondary font-body">
            We handle payments, insurance, and logistics so you can focus on creating experiences.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-primary-white rounded-xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6 text-center font-heading">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Apply to Host", desc: "Tell us about yourself and your community" },
            { step: "2", title: "Plan Your Trip", desc: "Work with our team to design the perfect experience" },
            { step: "3", title: "Promote & Fill", desc: "Share with your audience and fill your spots" },
            { step: "4", title: "Lead & Earn", desc: "Host an amazing trip and earn money doing it" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-3 text-primary-black font-bold text-lg font-heading">
                {item.step}
              </div>
              <h4 className="font-semibold text-text-primary mb-2 font-heading">{item.title}</h4>
              <p className="text-sm text-text-secondary font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-primary-white rounded-xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6 text-center font-heading">
          🌟 Host Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                alt="Sarah"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-bold text-text-primary font-heading">Sarah (@YogaWithSarah)</h4>
                <p className="text-sm text-text-secondary font-body">50K Instagram followers</p>
              </div>
            </div>
            <p className="text-text-secondary font-body mb-3">
              "I've hosted 8 wellness retreats and earned over $45,000 while building deeper connections with my community."
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-semibold font-body">$45,000 earned</span>
              <span className="text-sm text-text-light font-body">8 trips hosted</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg"
                alt="Mike"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-bold text-text-primary font-heading">Mike (@AdventureSeeker)</h4>
                <p className="text-sm text-text-secondary font-body">25K YouTube subscribers</p>
              </div>
            </div>
            <p className="text-text-secondary font-body mb-3">
              "TravelTribe helped me monetize my adventure content while creating once-in-a-lifetime experiences for my audience."
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-semibold font-body">$32,000 earned</span>
              <span className="text-sm text-text-light font-body">5 trips hosted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-primary-white rounded-xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6 text-center font-heading">
          Host Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
              ✅ You're a great fit if you have:
            </h4>
            <ul className="space-y-2 text-text-secondary font-body">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                An engaged online community (1K+ followers)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Travel experience and passion for creating experiences
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Strong communication and leadership skills
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Available to travel 5-10 days per trip
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
              💡 Perfect for:
            </h4>
            <ul className="space-y-2 text-text-secondary font-body">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Content creators & influencers
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Fitness & wellness coaches
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Business owners with communities
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Travel bloggers & photographers
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-accent-yellow to-accent-gold rounded-xl p-8 text-center text-primary-black">
        <h3 className="text-2xl font-bold mb-4 font-heading">Ready to Start Your Hosting Journey? 🚀</h3>
        <p className="text-lg mb-6 opacity-90 font-body">
          Join hundreds of hosts who are earning money while building community through travel
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors font-body">
            Apply to Host
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-primary-black px-8 py-3 rounded-lg font-semibold transition-colors font-body">
            Download Host Guide
          </button>
        </div>
      </div>
    </div>
  );
}