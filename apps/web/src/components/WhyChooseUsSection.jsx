import {
  Calendar,
  Shield,
  Users,
  Award,
  MapPin,
  HeartHandshake,
} from "lucide-react";

export default function WhyChooseUsSection() {
  const benefits = [
    {
      id: 1,
      icon: <Calendar className="w-6 sm:w-8 h-6 sm:h-8" />,
      title: "Planned for You",
      description:
        "Expertly crafted itineraries built by trusted local operators. Every detail is taken care of so you can focus on the experience.",
      color: "aqua",
    },
    {
      id: 2,
      icon: <Shield className="w-6 sm:w-8 h-6 sm:h-8" />,
      title: "Safety & Trust",
      description:
        "Vetted partners, secure payments, and comprehensive travel insurance. Your safety and peace of mind are our top priorities.",
      color: "navy",
    },
    {
      id: 3,
      icon: <HeartHandshake className="w-6 sm:w-8 h-6 sm:h-8" />,
      title: "Community & Connection",
      description:
        "Travel with people who share your passions and interests. Build lasting friendships that extend beyond the trip.",
      color: "aqua",
    },
    {
      id: 4,
      icon: <Award className="w-6 sm:w-8 h-6 sm:h-8" />,
      title: "Authentic Experiences",
      description:
        "Skip the tourist traps. Our local guides show you hidden gems and authentic cultural experiences you'll never forget.",
      color: "navy",
    },
    {
      id: 5,
      icon: <MapPin className="w-6 sm:w-8 h-6 sm:h-8" />,
      title: "Expert Local Guides",
      description:
        "Learn from passionate locals who know their destinations inside and out. Get insights you won't find in guidebooks.",
      color: "aqua",
    },
    {
      id: 6,
      icon: <Users className="w-6 sm:w-8 h-6 sm:h-8" />,
      title: "Perfect Group Sizes",
      description:
        "Carefully curated group sizes ensure personal attention while fostering meaningful connections with fellow travelers.",
      color: "navy",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      aqua: {
        bg: "bg-brand-aqua/10",
        text: "text-brand-aqua",
        hover: "group-hover:bg-brand-aqua group-hover:text-brand-white",
      },
      navy: {
        bg: "bg-brand-navy/10",
        text: "text-brand-navy",
        hover: "group-hover:bg-brand-navy group-hover:text-brand-white",
      },
    };
    return colorMap[color];
  };

  return (
    <div className="bg-brand-light py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-2 border border-ui-border rounded-full bg-brand-white mb-4 sm:mb-6">
            <span className="font-body font-normal text-xs sm:text-sm text-text-secondary">
              /Why Choose TravelTribe
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-4 sm:mb-6 px-4">
            What makes us
            <br />
            different?
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary max-w-2xl mx-auto px-4">
            We're not just another travel platform. We're building a community
            where meaningful connections are made and authentic experiences are
            shared.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit) => {
            const colors = getColorClasses(benefit.color);
            return (
              <div
                key={benefit.id}
                className="group bg-brand-white border border-ui-border rounded-xl p-6 sm:p-8 hover:shadow-mobile-card sm:hover:shadow-card transition-all duration-300 sm:hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`${colors.bg} ${colors.text} ${colors.hover} rounded-lg p-3 sm:p-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300`}
                >
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-16 sm:mt-20 bg-brand-white rounded-xl border border-ui-border p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="font-display font-semibold text-xl xs:text-2xl md:text-3xl text-text-primary mb-3 sm:mb-4 px-4">
              Trusted by thousands of travelers worldwide
            </h3>
            <p className="font-body text-sm sm:text-base text-text-secondary px-4">
              Join our growing community of adventure seekers and experience
              makers.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="font-display font-bold text-2xl xs:text-3xl md:text-4xl text-brand-aqua mb-1 sm:mb-2">
                10,000+
              </div>
              <p className="font-body text-xs sm:text-sm text-text-secondary">
                Happy Travelers
              </p>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-2xl xs:text-3xl md:text-4xl text-brand-navy mb-1 sm:mb-2">
                500+
              </div>
              <p className="font-body text-xs sm:text-sm text-text-secondary">
                Expert Hosts
              </p>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-2xl xs:text-3xl md:text-4xl text-brand-forest mb-1 sm:mb-2">
                85
              </div>
              <p className="font-body text-xs sm:text-sm text-text-secondary">
                Countries
              </p>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-2xl xs:text-3xl md:text-4xl text-brand-navy/80 mb-1 sm:mb-2">
                2,500+
              </div>
              <p className="font-body text-xs sm:text-sm text-text-secondary">
                Trips Completed
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <h3 className="font-display font-semibold text-xl xs:text-2xl md:text-3xl text-text-primary mb-3 sm:mb-4 px-4">
            Ready to experience the difference?
          </h3>
          <p className="font-body text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 px-4">
            Join TravelTribe today and discover why thousands choose us for
            their group adventures.
          </p>
          <button className="bg-brand-aqua hover:bg-brand-aqua/90 text-brand-white font-body font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-button transition-all duration-300 text-base sm:text-lg min-h-touch">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
