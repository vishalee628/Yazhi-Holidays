import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Send,
  MessageCircle,
  Phone
} from 'lucide-react';
import { DESTINATIONS, PACKAGES, FAQS } from '../data/travelData';
import { EnquiryModal } from '../components/EnquiryModal';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen bg-sand-ivory pt-36 pb-24 text-center px-4">
        <h2 className="font-serif text-4xl text-navy-primary font-semibold">Destination Not Found</h2>
        <p className="text-slate-muted mt-2">The destination you are looking for is not listed or has been moved.</p>
        <Link
          to="/destinations"
          className="mt-6 inline-block px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal"
        >
          Back to Destinations
        </Link>
      </div>
    );
  }

  // Find related holiday packages
  const relatedPackages = PACKAGES.filter((p) => p.destinationSlug === destination.slug);

  return (
    <div className="min-h-screen bg-sand-ivory">
      
      {/* Hero Banner */}
      <section className="relative h-[55vh] sm:h-[65vh] min-h-[400px] sm:min-h-[480px] flex items-end pb-10 sm:pb-16 bg-navy-midnight overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-royal">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{destination.country}</span>
              <span>•</span>
              <span>{destination.region} Tour</span>
            </div>

            <h1 className="font-serif text-3xl min-[360px]:text-4xl sm:text-6xl text-white font-normal leading-tight">
              {destination.name}
            </h1>

            <p className="text-sm sm:text-lg text-sand-ivory/90 font-light max-w-2xl">
              {destination.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-sand-ivory">
              <span className="flex items-center gap-1.5 bg-navy-midnight/70 px-3 py-1.5 rounded-full border border-gold-royal/30">
                <Calendar className="w-3.5 h-3.5 text-gold-royal" />
                <span>Best: {destination.bestTimeToVisit}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-navy-midnight/70 px-3 py-1.5 rounded-full border border-gold-royal/30">
                <Clock className="w-3.5 h-3.5 text-gold-royal" />
                <span>Recommended: {destination.duration}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (8 cols): Overview, Highlights, Day Itinerary, Gallery, Tips */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
                DESTINATION ESSENCE
              </span>
              <h2 className="font-serif text-3xl text-navy-primary font-semibold mb-4">
                About {destination.name}
              </h2>
              <p className="text-base text-slate-body leading-relaxed font-light">
                {destination.description}
              </p>
            </div>

            {/* Curated Highlights */}
            <div className="bg-white rounded-2xl p-8 border border-sand-border shadow-sm">
              <h3 className="font-serif text-2xl text-navy-primary font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-metallic" />
                <span>Key Curated Experiences</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-royal flex-shrink-0 mt-1" />
                    <span className="text-sm text-slate-body leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Day-by-Day Itinerary */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
                SUGGESTED PACING
              </span>
              <h2 className="font-serif text-3xl text-navy-primary font-semibold mb-6">
                Sample Itinerary Outline
              </h2>
              <div className="space-y-4">
                {destination.itinerarySummary.map((item) => (
                  <div 
                    key={item.day}
                    className="p-5 rounded-xl bg-white border border-sand-border flex gap-4 items-start shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-navy-midnight text-gold-royal flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 border border-gold-royal/30">
                      0{item.day}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-navy-primary">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-muted mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Planning Considerations */}
            <div className="p-6 rounded-2xl bg-sand-card border border-sand-border">
              <h3 className="font-serif text-xl text-navy-primary font-semibold mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-gold-metallic" />
                <span>Travel Planning Notes for {destination.name}</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-body">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold-royal font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo Gallery */}
            <div>
              <h3 className="font-serif text-2xl text-navy-primary font-semibold mb-4">
                Visual Impressions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {destination.gallery.map((imgUrl, i) => (
                  <div key={i} className="h-44 rounded-xl overflow-hidden shadow-sm group">
                    <img
                      src={imgUrl}
                      alt={`${destination.name} impression ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Sticky Enquiry & Quick Booking Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-luxury space-y-6">
              
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-metallic block mb-1">
                  START PLANNING
                </span>
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  Journey to {destination.name}
                </h3>
                <p className="text-xs text-slate-muted mt-1">
                  Indicative packages start from:
                </p>
                <div className="mt-2 text-2xl font-bold font-mono text-navy-primary">
                  ₹{destination.startingPriceINR.toLocaleString('en-IN')}{' '}
                  <span className="text-xs text-slate-muted font-normal">/ person</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire for {destination.name}</span>
                </button>

                <Link
                  to="/plan-trip"
                  className="w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-primary bg-sand-ivory border border-sand-border hover:bg-sand-card transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <Compass className="w-3.5 h-3.5 text-gold-metallic" />
                  <span>Customize Detailed Itinerary</span>
                </Link>

                <a
                  href={`https://wa.me/9196380792722?text=Hello%20Yazhi%20Holidays,%20I%20am%20interested%20in%20planning%20a%20trip%20to%20${encodeURIComponent(destination.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Dedicated Concierge Reassurance */}
              <div className="pt-4 border-t border-sand-border space-y-2 text-xs text-slate-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-metallic" />
                  <span>100% Customized to your dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-metallic" />
                  <span>24-Hour detailed quote turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-metallic" />
                  <span>Direct phone: <a href="tel:6380792722" className="text-navy-primary font-medium hover:text-gold-metallic">6380792722</a></span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Packages for this Destination */}
        {relatedPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-sand-border">
            <h3 className="font-serif text-3xl text-navy-primary font-semibold mb-6">
              Holiday Packages for {destination.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-sand-border shadow-sm flex flex-col sm:flex-row group">
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
                    <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-gold-metallic font-mono">{pkg.durationLabel} • {pkg.tripType}</span>
                      <h4 className="font-serif text-xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors mt-1">
                        {pkg.title}
                      </h4>
                      <p className="text-xs text-slate-muted mt-2 line-clamp-2">{pkg.overview}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-navy-primary">₹{pkg.startingPriceINR.toLocaleString('en-IN')}</span>
                      <Link to={`/packages/${pkg.slug}`} className="text-xs font-semibold text-gold-metallic hover:underline flex items-center gap-1">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultDestination={destination.name}
      />

    </div>
  );
};
