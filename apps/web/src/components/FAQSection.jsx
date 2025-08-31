import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is TravelTribe?",
      answer:
        "TravelTribe is a platform that connects travelers with community leaders and hosts who organize group trips. We make group travel accessible by offering both curated trips to join and tools for hosts to create their own adventures. Our mission is to foster meaningful connections through shared travel experiences.",
    },
    {
      id: 2,
      question: "Who can host a trip?",
      answer:
        "Anyone with a passion for travel and community building can become a host. We welcome content creators, local experts, community leaders, and travel enthusiasts. All hosts go through our verification process to ensure quality and safety. You'll need to demonstrate experience in either travel planning or community leadership.",
    },
    {
      id: 3,
      question: "How do I join a trip?",
      answer:
        "Browse our available trips, read the itinerary and host details, then click 'View Trip' to see full details. You can book your spot by completing the registration and payment process. Once booked, you'll be added to the trip's private group chat to connect with fellow travelers before departure.",
    },
    {
      id: 4,
      question: "What's included in a trip?",
      answer:
        "Each trip is different, but typically includes accommodations, guided activities, some meals, local transportation, and expert local guides. The exact inclusions are clearly listed on each trip page. Flights to/from the destination are usually not included unless specifically mentioned.",
    },
    {
      id: 5,
      question: "How safe are these trips?",
      answer:
        "Safety is our top priority. All hosts and local operators are thoroughly vetted. We provide comprehensive travel insurance options, 24/7 support during trips, and emergency protocols. Group leaders are trained in safety procedures and we maintain partnerships with trusted local operators worldwide.",
    },
    {
      id: 6,
      question: "Can I travel alone and still join a group?",
      answer:
        "Absolutely! Most of our travelers join as solo adventurers and end up making lifelong friends. Our group trips are designed to be welcoming and inclusive for solo travelers, couples, and friends alike. Many of our best testimonials come from solo travelers who discovered an amazing community.",
    },
    {
      id: 7,
      question: "How far in advance should I book?",
      answer:
        "We recommend booking 2-3 months in advance for popular destinations and times. Some trips fill up quickly, especially those with smaller group sizes or unique experiences. Early booking also often comes with better pricing and more time to prepare for your adventure.",
    },
    {
      id: 8,
      question: "What if I need to cancel my trip?",
      answer:
        "We understand plans change. Our cancellation policy varies by trip and timing, but we always try to be fair and flexible. Most bookings offer full refunds if cancelled more than 60 days in advance. We also offer trip protection insurance for added peace of mind.",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="bg-brand-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-2 border border-ui-border rounded-full bg-brand-light mb-4 sm:mb-6">
            <span className="font-body font-normal text-xs sm:text-sm text-text-secondary">
              /Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-4 sm:mb-6 px-4">
            Got questions?
            <br />
            We've got answers
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary max-w-2xl mx-auto px-4">
            Everything you need to know about TravelTribe, group travel, and
            getting started on your next adventure.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-ui-border rounded-xl overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-brand-light transition-colors duration-300 min-h-touch"
              >
                <span className="font-body font-semibold text-base sm:text-lg text-text-primary pr-3 sm:pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 p-1">
                  {openFAQ === faq.id ? (
                    <Minus className="w-4 sm:w-5 h-4 sm:h-5 text-brand-aqua" />
                  ) : (
                    <Plus className="w-4 sm:w-5 h-4 sm:h-5 text-text-secondary" />
                  )}
                </div>
              </button>

              {/* Answer */}
              {openFAQ === faq.id && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="pt-2 border-t border-ui-border">
                    <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed mt-3 sm:mt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 sm:mt-16 text-center bg-brand-light rounded-xl p-6 sm:p-8 md:p-12">
          <h3 className="font-display font-semibold text-xl xs:text-2xl md:text-3xl text-text-primary mb-3 sm:mb-4 px-4">
            Still have questions?
          </h3>
          <p className="font-body text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 max-w-xl mx-auto px-4">
            Our support team is here to help you every step of the way. Get in
            touch and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="bg-brand-aqua hover:bg-brand-aqua/90 text-brand-white font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-button transition-all duration-300 min-h-touch text-sm sm:text-base">
              Contact Support
            </button>
            <button className="bg-brand-white border-2 border-ui-border hover:border-brand-slate text-text-secondary hover:text-text-primary font-body font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-button transition-all duration-300 min-h-touch text-sm sm:text-base">
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
