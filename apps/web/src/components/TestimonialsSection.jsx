import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      type: "host",
      name: "Alexandra Martinez",
      title: "Travel Host & Content Creator",
      avatar:
        "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "Hosting trips has helped me connect with my community in unforgettable ways. I've turned my passion for travel into a sustainable income stream while creating lifelong memories with amazing people.",
      rating: 5,
      tripsHosted: 12,
    },
    {
      id: 2,
      type: "traveler",
      name: "James Carter",
      title: "Marketing Manager & Adventure Seeker",
      avatar:
        "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "The best travel experience of my life – safe, organized, and full of new friends. I went to Japan with complete strangers and came back with a chosen family. The planning was flawless.",
      rating: 5,
      tripsJoined: 4,
    },
    {
      id: 3,
      type: "host",
      name: "Maria Santos",
      title: "Yoga Instructor & Wellness Guide",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote:
        "As a yoga instructor, leading wellness retreats through TravelTribe has allowed me to share my practice while exploring incredible destinations. The community support is incredible.",
      rating: 5,
      tripsHosted: 8,
    },
  ];

  return (
    <div className="bg-brand-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-2 border border-ui-border rounded-full bg-brand-light mb-4 sm:mb-6">
            <span className="font-body font-normal text-xs sm:text-sm text-text-secondary">
              /Testimonials
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-4 sm:mb-6 px-4">
            Stories from our
            <br />
            travel community
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary max-w-2xl mx-auto px-4">
            Hear from hosts and travelers who've experienced the magic of group
            travel with TravelTribe.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-brand-light border border-ui-border rounded-xl p-6 sm:p-8 hover:shadow-mobile-card sm:hover:shadow-card transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 sm:-top-4 sm:left-8">
                <div className="bg-brand-aqua rounded-full p-2 sm:p-3">
                  <Quote className="w-4 sm:w-5 h-4 sm:h-5 text-brand-white" />
                </div>
              </div>

              {/* Badge */}
              <div className="mb-4 sm:mb-6 mt-3 sm:mt-4">
                <div
                  className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-body font-medium ${
                    testimonial.type === "host"
                      ? "bg-brand-aqua/10 text-brand-aqua"
                      : "bg-brand-navy/10 text-brand-navy"
                  }`}
                >
                  {testimonial.type === "host" ? "Host" : "Traveler"}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 sm:w-5 h-4 sm:h-5 text-brand-forest fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-text-primary leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <h4 className="font-body font-semibold text-sm sm:text-base text-text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-text-secondary">
                    {testimonial.title}
                  </p>
                  <p className="font-body text-xs text-text-secondary mt-1">
                    {testimonial.type === "host"
                      ? `${testimonial.tripsHosted} trips hosted`
                      : `${testimonial.tripsJoined} trips joined`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <h3 className="font-display font-semibold text-xl xs:text-2xl md:text-3xl text-text-primary mb-3 sm:mb-4 px-4">
            Ready to create your own story?
          </h3>
          <p className="font-body text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 max-w-xl mx-auto px-4">
            Join thousands of travelers and hosts who've discovered the joy of
            group adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="bg-brand-aqua hover:bg-brand-aqua/90 text-brand-white font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-button transition-all duration-300 min-h-touch text-sm sm:text-base">
              Start Your Journey
            </button>
            <button className="bg-brand-white border-2 border-ui-border hover:border-brand-slate text-text-secondary hover:text-text-primary font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-button transition-all duration-300 min-h-touch text-sm sm:text-base">
              Read More Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
