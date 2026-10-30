import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Hotel, 
  Car,
  FileText
} from 'lucide-react';
import { PACKAGES } from '../data/travelData';
import { saveEnquiry } from '../services/enquiryService';

export const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const pkg = PACKAGES.find((p) => p.slug === slug);

  // Dynamic pricing estimator state
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [roomTier, setRoomTier] = useState<'Standard' | 'Deluxe' | 'LuxuryVilla'>('Deluxe');
  const [selectedDayAccordion, setSelectedDayAccordion] = useState<number | null>(1);

  // Booking Enquiry form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTravelDate, setFormTravelDate] = useState('');
  const [formPreferredContact, setFormPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [formNotes, setFormNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-sand-ivory pt-36 pb-24 text-center px-4">
        <h2 className="font-serif text-4xl text-navy-primary font-semibold">Package Not Found</h2>
        <p className="text-slate-muted mt-2">The package you are looking for does not exist or has been updated.</p>
        <Link
          to="/packages"
          className="mt-6 inline-block px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal"
        >
          View All Packages
        </Link>
      </div>
    );
  }

  // Calculate estimated total based on verified formula
  // Base price per adult
  // Children (5-11): 65% of adult price
  // Room tier multiplier: Standard 0.9, Deluxe 1.0, LuxuryVilla 1.35
  const tierMultiplier = roomTier === 'Standard' ? 0.9 : roomTier === 'Deluxe' ? 1.0 : 1.35;
  const pricePerAdult = Math.round(pkg.startingPriceINR * tierMultiplier);
  const pricePerChild = Math.round(pkg.startingPriceINR * 0.65 * tierMultiplier);
  const estimatedTotal = Math.round(pricePerAdult * adults + pricePerChild * children);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formPhone.trim()) return;

    setSubmitting(true);
    try {
      const submission = saveEnquiry({
        customerName: formName,
        email: formEmail,
        phone: formPhone,
        preferredContact: formPreferredContact,
        destination: pkg.destinationName,
        packageSlug: pkg.slug,
        departureCity: 'User Specified',
        travelDate: formTravelDate,
        adultsCount: adults,
        childrenCount: children,
        budgetRange: `Est. ₹${estimatedTotal.toLocaleString('en-IN')}`,
        specialRequests: `Room Tier: ${roomTier}. Notes: ${formNotes}`
      });

      setSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => {
        navigate(`/confirmation?ref=${submission.referenceNumber}`);
      }, 800);
    } catch {
      setSubmitting(false);
    }
  };

  const relatedPackages = PACKAGES.filter((p) => p.id !== pkg.id && (p.region === pkg.region || p.tripType === pkg.tripType)).slice(0, 2);

  return (
    <div className="min-h-screen bg-sand-ivory pb-24">
      
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[440px] flex items-end pb-16 bg-navy-midnight overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="w-full h-full object-cover brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-royal">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pkg.destinationName}</span>
              <span>•</span>
              <span>{pkg.tripType}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              {pkg.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-sand-ivory pt-2">
              <span className="bg-navy-midnight/70 px-3 py-1.5 rounded-full border border-gold-royal/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-royal" />
                <span>{pkg.durationLabel}</span>
              </span>
              <span className="bg-navy-midnight/70 px-3 py-1.5 rounded-full border border-gold-royal/30 flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-gold-royal" />
                <span>{pkg.accommodationType}</span>
              </span>
              <span className="bg-navy-midnight/70 px-3 py-1.5 rounded-full border border-gold-royal/30 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-gold-royal" />
                <span>{pkg.transportType}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (8 cols): Overview, Itinerary, Inclusions/Exclusions, Policy */}
          <div className="lg:col-span-8 space-y-14">
            
            {/* Overview */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
                THE JOURNEY CONCEPT
              </span>
              <h2 className="font-serif text-3xl text-navy-primary font-semibold mb-4">
                Overview & Experience
              </h2>
              <p className="text-base text-slate-body leading-relaxed font-light">
                {pkg.overview}
              </p>
            </div>

            {/* Highlights Badges */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm">
              <h3 className="font-serif text-2xl text-navy-primary font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-metallic" />
                <span>Handcrafted Inclusions & Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-royal flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-body">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Expandable Itinerary */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
                DETAILED SCHEDULE
              </span>
              <h2 className="font-serif text-3xl text-navy-primary font-semibold mb-6">
                Day-by-Day Itinerary
              </h2>

              <div className="space-y-4">
                {pkg.itinerary.map((day) => {
                  const isOpen = selectedDayAccordion === day.day;
                  return (
                    <div
                      key={day.day}
                      className="rounded-2xl bg-white border border-sand-border overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDayAccordion(isOpen ? null : day.day)}
                        className="w-full p-5 text-left flex items-center justify-between hover:bg-sand-card/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-10 h-10 rounded-full bg-navy-midnight text-gold-royal flex items-center justify-center font-mono font-bold text-sm border border-gold-royal/30 flex-shrink-0">
                            0{day.day}
                          </span>
                          <div>
                            <span className="text-xs font-mono text-gold-metallic block uppercase">
                              Day {day.day} • {day.location}
                            </span>
                            <h4 className="font-serif text-xl font-semibold text-navy-primary">
                              {day.title}
                            </h4>
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-muted flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-muted flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 border-t border-sand-border/70 text-xs sm:text-sm text-slate-body space-y-4">
                          <p className="leading-relaxed font-light">{day.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-sand-border text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-navy-primary">Meals Included:</span>
                              <span className="text-slate-muted">{day.mealsIncluded}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-navy-primary">Stay:</span>
                              <span className="text-slate-muted">{day.stay}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Inclusions */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm">
                <h4 className="font-serif text-2xl font-semibold text-navy-primary mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Package Inclusions</span>
                </h4>
                <ul className="space-y-3 text-xs text-slate-body">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-sm">
                <h4 className="font-serif text-2xl font-semibold text-navy-primary mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>Exclusions</span>
                </h4>
                <ul className="space-y-3 text-xs text-slate-body">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Cancellation Terms */}
            <div className="p-6 rounded-2xl bg-sand-card border border-sand-border">
              <h4 className="font-serif text-xl font-semibold text-navy-primary mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold-metallic" />
                <span>Cancellation Terms & Fair Flexibility</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-body">
                {pkg.cancellationPolicy.map((pol, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold-royal font-bold">•</span>
                    <span>{pol}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column (4 cols): Dynamic Price Estimator & Enquiry Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Estimator Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sand-border shadow-luxury">
                
                <div className="border-b border-sand-border pb-4 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-metallic block mb-1">
                    ESTIMATED INVESTMENT (INR)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-navy-primary">
                      ₹{estimatedTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-muted">total estimate</span>
                  </div>
                  <span className="text-[11px] text-slate-muted block mt-1">
                    Based on {adults} {adults === 1 ? 'Adult' : 'Adults'}
                    {children > 0 && `, ${children} Children`} ({roomTier} Tier)
                  </span>
                </div>

                {/* Interactive Selectors */}
                <div className="space-y-3.5 mb-6 text-xs">
                  <div>
                    <label className="block font-semibold text-navy-primary mb-1">Adults (12+ yrs):</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setAdults(num)}
                          className={`w-9 h-8 rounded-lg font-mono font-semibold border transition-all ${
                            adults === num
                              ? 'bg-navy-midnight text-gold-royal border-gold-royal'
                              : 'bg-sand-ivory text-slate-body border-sand-border hover:bg-sand-card'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-navy-primary mb-1">Children (under 12 yrs):</label>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setChildren(num)}
                          className={`w-9 h-8 rounded-lg font-mono font-semibold border transition-all ${
                            children === num
                              ? 'bg-navy-midnight text-gold-royal border-gold-royal'
                              : 'bg-sand-ivory text-slate-body border-sand-border hover:bg-sand-card'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-navy-primary mb-1">Accommodation Tier:</label>
                    <select
                      value={roomTier}
                      onChange={(e) => setRoomTier(e.target.value as any)}
                      className="w-full px-3 py-2 bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
                    >
                      <option value="Standard">Standard Heritage / Boutique 4-Star</option>
                      <option value="Deluxe">Deluxe 5-Star (Recommended)</option>
                      <option value="LuxuryVilla">Premium Private Pool Villa / Suite</option>
                    </select>
                  </div>
                </div>

                {/* Enquiry Submission Form */}
                <form onSubmit={handleSubmitEnquiry} className="space-y-3 pt-4 border-t border-sand-border">
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy-primary block">
                    Lock In This Estimate & Enquire:
                  </span>

                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number *"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
                  />

                  <input
                    type="date"
                    value={formTravelDate}
                    onChange={(e) => setFormTravelDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
                  />

                  <textarea
                    rows={2}
                    placeholder="Special requests or date flexibility (optional)"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Connecting...' : 'Request Official Quote'}</span>
                  </button>

                  <a
                    href={`https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(pkg.title)}%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full text-xs font-semibold text-sand-ivory bg-navy-midnight hover:bg-navy-midnight/90 border border-gold-royal/30 flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-gold-royal" />
                    <span>Quick WhatsApp Assistance</span>
                  </a>

                  {formSuccess && (
                    <p className="text-[11px] text-emerald-700 text-center font-medium">
                      Redirecting to your confirmation receipt...
                    </p>
                  )}
                </form>

              </div>

            </div>
          </div>

        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-sand-border">
            <h3 className="font-serif text-3xl text-navy-primary font-semibold mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPackages.map((rel) => (
                <div key={rel.id} className="bg-white rounded-2xl overflow-hidden border border-sand-border shadow-sm flex flex-col sm:flex-row group">
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
                    <img src={rel.heroImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-gold-metallic font-mono">{rel.destinationName} • {rel.durationLabel}</span>
                      <h4 className="font-serif text-xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors mt-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-muted mt-2 line-clamp-2">{rel.overview}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-navy-primary">₹{rel.startingPriceINR.toLocaleString('en-IN')}</span>
                      <Link to={`/packages/${rel.slug}`} className="text-xs font-semibold text-gold-metallic hover:underline flex items-center gap-1">
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
