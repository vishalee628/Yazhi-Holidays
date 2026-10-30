import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  ChevronRight,
  Star,
  Quote,
  MessageCircle,
  Eye
} from 'lucide-react';
import { DESTINATIONS, PACKAGES, COLLECTIONS, BLOG_POSTS, TESTIMONIALS } from '../data/travelData';
import { TripType } from '../types';
import { EnquiryModal } from '../components/EnquiryModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Trip Finder state
  const [searchDest, setSearchDest] = useState('');
  const [searchDeparture, setSearchDeparture] = useState('Chennai');
  const [searchDate, setSearchDate] = useState('');
  const [searchTravellers, setSearchTravellers] = useState('2');
  const [searchType, setSearchType] = useState<string>('All');

  // Package Filter Tab
  const [selectedPkgTab, setSelectedPkgTab] = useState<string>('All');

  // Quick Enquiry Modal state
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedPackageForEnquiry, setSelectedPackageForEnquiry] = useState<{
    slug: string;
    title: string;
  } | null>(null);

  const handleTripFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchDest) {
      navigate(`/destinations?query=${encodeURIComponent(searchDest)}&type=${encodeURIComponent(searchType)}`);
    } else {
      navigate(`/packages?type=${encodeURIComponent(searchType)}`);
    }
  };

  const handleOpenEnquiryForPkg = (slug: string, title: string) => {
    setSelectedPackageForEnquiry({ slug, title });
    setEnquiryModalOpen(true);
  };

  // Filtered packages
  const displayedPackages = selectedPkgTab === 'All' 
    ? PACKAGES.slice(0, 4)
    : PACKAGES.filter(p => p.tripType === selectedPkgTab || (selectedPkgTab === 'International' && p.region === 'International'));

  return (
    <div className="min-h-screen bg-sand-ivory text-slate-body">

      {/* SECTION 2: CINEMATIC HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-midnight pt-20">
        
        {/* Full-width dramatic golden-hour international destination image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85"
            alt="Alpine majesty at sunset"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out brightness-[0.78]"
          />
          {/* Layered cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight/90 via-navy-midnight/65 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-transparent to-navy-midnight/40"></div>
          
          {/* Subtle gold accent line decoration */}
          <div className="absolute bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-royal/30 to-transparent"></div>
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl">
            
            {/* Editorial Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-midnight/80 border border-gold-royal/40 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium">
                TRAVEL, THOUGHTFULLY CURATED
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.08] tracking-tight mb-6">
              Your World. <br />
              <span className="italic font-light text-gold-light">Your Story.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-sand-ivory/90 leading-relaxed font-light mb-8 max-w-2xl">
              From unforgettable escapes to extraordinary adventures, discover journeys designed around the way you want to travel.
            </p>

            <p className="text-xs uppercase tracking-widest text-gold-royal/90 mb-8 font-mono">
              Extraordinary places • Meaningful experiences • Memories that stay
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow group"
              >
                <span>Explore Journeys</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                to="/plan-trip"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-ivory bg-navy-midnight/70 hover:bg-navy-midnight border border-gold-royal/40 hover:border-gold-royal transition-all backdrop-blur-md"
              >
                <span>Design Your Trip</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Destination Ticker */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-navy-midnight/90 border-t border-navy-royal/50 py-3 hidden md:block backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-sand-ivory/70 font-sans">
            <span className="text-gold-royal font-mono uppercase tracking-widest text-[10px]">CURRENT INSPIRATION:</span>
            <div className="flex items-center gap-8 text-sand-ivory/80">
              <Link to="/destinations/bali" className="hover:text-gold-light transition-colors">Bali, Indonesia (6D/5N from ₹48,500)</Link>
              <span className="text-navy-royal">•</span>
              <Link to="/destinations/switzerland" className="hover:text-gold-light transition-colors">Switzerland Scenic Rail (7D/6N from ₹1,65,000)</Link>
              <span className="text-navy-royal">•</span>
              <Link to="/destinations/kerala" className="hover:text-gold-light transition-colors">Kerala Backwaters (5D/4N from ₹26,900)</Link>
              <span className="text-navy-royal">•</span>
              <Link to="/destinations/maldives" className="hover:text-gold-light transition-colors">Maldives Overwater (4D/3N from ₹89,000)</Link>
            </div>
            <Link to="/destinations" className="text-gold-royal hover:underline font-semibold text-[11px] flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: SIGNATURE TRIP FINDER */}
      <section className="relative z-20 -mt-8 sm:-mt-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-luxury border border-sand-border p-6 sm:p-8 backdrop-blur-lg">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-sand-border">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold-metallic block mb-1">
                DISCOVER YOUR BESPOKE ROUTE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy-primary font-semibold">
                Where would you love to go?
              </h2>
            </div>
            <span className="text-xs text-slate-muted hidden sm:block">
              Customized travel arrangements with verified itineraries
            </span>
          </div>

          <form onSubmit={handleTripFinderSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Destination */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-navy-primary uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-metallic" />
                <span>Destination</span>
              </label>
              <select
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="">Any Destination</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.country})</option>
                ))}
              </select>
            </div>

            {/* Departure City */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-navy-primary uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-metallic" />
                <span>Departure City</span>
              </label>
              <select
                value={searchDeparture}
                onChange={(e) => setSearchDeparture(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="Chennai">Chennai (MAA)</option>
                <option value="Bangalore">Bangalore (BLR)</option>
                <option value="Coimbatore">Coimbatore (CJB)</option>
                <option value="Trichy">Trichy (TRZ)</option>
                <option value="Madurai">Madurai (IXM)</option>
                <option value="Mumbai">Mumbai (BOM)</option>
                <option value="Delhi">Delhi (DEL)</option>
                <option value="Other">Other City</option>
              </select>
            </div>

            {/* Travel Date */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-navy-primary uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-metallic" />
                <span>Travel Date</span>
              </label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>

            {/* Travellers */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-navy-primary uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-metallic" />
                <span>Travellers</span>
              </label>
              <select
                value={searchTravellers}
                onChange={(e) => setSearchTravellers(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="2">2 Adults (Couple / Honeymoon)</option>
                <option value="family">Family (2 Adults + Kids)</option>
                <option value="small-group">3-5 Travellers</option>
                <option value="large-group">6+ Travellers</option>
                <option value="solo">Solo Traveller</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Find My Journey</span>
              </button>
            </div>

          </form>

          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-sand-border flex-wrap">
            <span className="text-xs text-slate-muted font-medium">Trip Type:</span>
            {['All', 'Honeymoon', 'Family', 'Adventure', 'Leisure', 'Cultural', 'International'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSearchType(type)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  searchType === type
                    ? 'bg-navy-midnight text-gold-royal border-gold-royal font-medium'
                    : 'bg-sand-ivory text-slate-body border-sand-border hover:border-gold-royal/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: CURATED DESTINATIONS (Asymmetric Editorial Layout) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
              CURATED ESCAPES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal leading-tight">
              Places That Stay With You
            </h2>
            <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
              Discover remarkable destinations selected for the experiences they make possible. Each journey is paced with mindful care.
            </p>
          </div>
          <Link
            to="/destinations"
            className="mt-6 md:mt-0 text-xs font-semibold uppercase tracking-wider text-navy-primary hover:text-gold-metallic flex items-center gap-2 group transition-colors"
          >
            <span>Explore All 8+ Destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold-royal" />
          </Link>
        </div>

        {/* Asymmetrical Grid: 1 Large Feature + 2 Medium Panels + 3 Balanced Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1 Large Featured Destination Panel (Cols 1-7) */}
          <div className="lg:col-span-7">
            <div className="group relative h-[480px] sm:h-[560px] rounded-2xl overflow-hidden shadow-luxury destination-card">
              <img
                src={DESTINATIONS[0].heroImage}
                alt={DESTINATIONS[0].name}
                className="w-full h-full object-cover destination-card-img brightness-[0.82]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/40 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-gold-royal text-navy-midnight font-bold">
                  Featured
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-navy-midnight/80 text-sand-ivory border border-gold-royal/30 backdrop-blur-md">
                  {DESTINATIONS[0].region}
                </span>
              </div>

              {/* Content at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs text-gold-royal font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{DESTINATIONS[0].country}</span>
                  <span>•</span>
                  <span>{DESTINATIONS[0].duration}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium group-hover:text-gold-light transition-colors">
                  {DESTINATIONS[0].name}
                </h3>
                <p className="text-sm text-sand-ivory/80 line-clamp-2 max-w-lg font-light">
                  {DESTINATIONS[0].description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <span className="text-xs text-sand-ivory/80">
                    From <strong className="text-base text-gold-royal font-mono">₹{DESTINATIONS[0].startingPriceINR.toLocaleString('en-IN')}</strong> / person
                  </span>
                  <Link
                    to={`/destinations/${DESTINATIONS[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-royal hover:underline"
                  >
                    <span>Discover Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Medium Destination Panels (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {DESTINATIONS.slice(1, 3).map((dest) => (
              <div key={dest.id} className="group relative h-[264px] rounded-2xl overflow-hidden shadow-luxury destination-card">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover destination-card-img brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/40 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/80 text-gold-light border border-gold-royal/30 backdrop-blur-md">
                    {dest.region}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <div className="text-[11px] text-gold-royal/90 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{dest.country}</span>
                    <span>•</span>
                    <span>{dest.duration}</span>
                  </div>
                  <h4 className="font-serif text-2xl text-white font-medium group-hover:text-gold-light transition-colors">
                    {dest.name}
                  </h4>
                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                    <span className="text-sand-ivory/80">
                      Starting <strong className="text-gold-royal font-mono">₹{dest.startingPriceINR.toLocaleString('en-IN')}</strong>
                    </span>
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="text-gold-royal hover:underline font-semibold flex items-center gap-1 text-xs"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 3 Smaller Balanced Destination Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {DESTINATIONS.slice(3, 6).map((dest) => (
            <div key={dest.id} className="group bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border destination-card flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.thumbnail}
                  alt={dest.name}
                  className="w-full h-full object-cover destination-card-img"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/80 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                    {dest.region}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-muted block mb-1">
                    {dest.country} • {dest.duration}
                  </span>
                  <h4 className="font-serif text-2xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-slate-muted mt-2 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-muted block">Starting From</span>
                    <span className="text-sm font-bold text-navy-primary font-mono">₹{dest.startingPriceINR.toLocaleString('en-IN')}</span>
                  </div>
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-navy-primary group-hover:text-gold-metallic"
                  >
                    <span>View</span>
                    <ChevronRight className="w-4 h-4 text-gold-royal" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 5: THE YAZHI SIGNATURE (Brand Story & Cultural Heritage) */}
      <section className="bg-navy-midnight text-white py-28 relative overflow-hidden">
        
        {/* Subtle gold circular line motif inspired by official logo's orbit */}
        <div className="absolute -right-48 -top-48 w-[600px] h-[600px] rounded-full border border-gold-royal/15 pointer-events-none"></div>
        <div className="absolute -right-32 -top-32 w-[480px] h-[480px] rounded-full border border-gold-royal/10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Left Side with Official Logo integrated elegantly */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-gold-metallic/40 via-gold-royal/20 to-transparent shadow-luxury-dark">
                <img
                  src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=80"
                  alt="Atmospheric sunset over temple gate"
                  className="w-full h-[420px] object-cover rounded-xl brightness-90"
                />
                
                {/* Floating Official Brand Emblem Accent */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-navy-midnight/90 border border-gold-royal/40 backdrop-blur-md flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-gold-metallic to-gold-royal shadow-gold-glow flex-shrink-0">
                    <img
                      src="/yazhi-logo.jpg"
                      alt="Yazhi Emblem"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif text-lg text-white font-medium">The Yazhi Heritage</h5>
                    <p className="text-xs text-sand-ivory/70">A symbol of majesty, voyage, and unwavering integrity.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Copy Right Side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-royal/50 border border-gold-royal/30 text-gold-royal text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE YAZHI PHILOSOPHY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                More Than a Destination. <br />
                <span className="italic font-light text-gold-light">A Feeling.</span>
              </h2>

              <p className="text-base text-sand-ivory/85 leading-relaxed font-light">
                We believe travel is not simply about reaching a place. It is about discovering new perspectives, sharing meaningful moments with those who matter most, and returning with stories worth remembering.
              </p>

              <p className="text-sm text-sand-ivory/70 leading-relaxed font-light">
                Inspired by the celestial Yazhi—the legendary guardian motif sculpted in the royal temples of Tamil Nadu—our ethos blends age-old South Indian warmth and hospitality with contemporary global finesse. We design unhurried itineraries, hand-pick certified partners, and remain by your side on every mile.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-navy-royal/60">
                <div>
                  <span className="font-serif text-3xl text-gold-royal font-semibold block">100%</span>
                  <span className="text-xs text-sand-ivory/70">Personalized Itineraries</span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-gold-royal font-semibold block">24/7</span>
                  <span className="text-xs text-sand-ivory/70">Dedicated WhatsApp Care</span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-gold-royal font-semibold block">INR</span>
                  <span className="text-xs text-sand-ivory/70">Transparent Pricing</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 transition-all shadow-gold-glow"
                >
                  <span>Discover Our Approach</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: SIGNATURE HOLIDAY COLLECTIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
            DESIGNED FOR EVERY WAY YOU TRAVEL
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
            Curated Collections
          </h2>
          <p className="text-sm text-slate-muted mt-3 font-light">
            Whether embarking on an intimate honeymoon, gathering the generations, or seeking quiet contemplation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/packages?type=${col.category}`}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-luxury destination-card flex flex-col justify-end p-8 text-white"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover destination-card-img brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/50 to-transparent"></div>
              
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gold-royal font-medium block">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-3xl text-white font-medium group-hover:text-gold-light transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-sand-ivory/80 line-clamp-2 font-light">
                  {col.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-gold-royal font-semibold">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* SECTION 7: FEATURED HOLIDAY PACKAGES */}
      <section className="py-24 bg-sand-card border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
                VERIFIED SAMPLE PACKAGES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
                Journeys Worth Taking
              </h2>
              <p className="text-sm text-slate-muted mt-2 font-light">
                Handcrafted itineraries with transparent inclusions, boutique stays, and private transit.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mt-6 md:mt-0 flex-wrap">
              {['All', 'Honeymoon', 'Family', 'Cultural', 'Adventure', 'International'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedPkgTab(tab)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all ${
                    selectedPkgTab === tab
                      ? 'bg-navy-midnight text-gold-royal border-gold-royal font-semibold shadow-sm'
                      : 'bg-white text-slate-body border-sand-border hover:bg-sand-ivory'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border flex flex-col sm:flex-row group transition-all hover:border-gold-royal/40"
              >
                {/* Image */}
                <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover destination-card-img"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                      {pkg.tripType}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-muted mb-1.5 font-mono">
                      <span>{pkg.destinationName}</span>
                      <span className="text-gold-metallic font-semibold">{pkg.durationLabel}</span>
                    </div>

                    <Link to={`/packages/${pkg.slug}`}>
                      <h3 className="font-serif text-2xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors leading-snug">
                        {pkg.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-muted mt-2 line-clamp-2 leading-relaxed">
                      {pkg.overview}
                    </p>

                    {/* Inclusion bullet highlights */}
                    <div className="mt-4 pt-3 border-t border-sand-border space-y-1.5">
                      {pkg.inclusions.slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-body">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-royal flex-shrink-0 mt-0.5" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-muted uppercase font-mono block">From</span>
                      <span className="text-base font-bold text-navy-primary font-mono">
                        ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-muted block">per person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        className="px-3.5 py-2 rounded-lg text-xs font-semibold text-navy-primary border border-sand-border hover:bg-sand-ivory transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleOpenEnquiryForPkg(pkg.slug, pkg.title)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal hover:brightness-110 transition-all shadow-sm"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic shadow-gold-glow hover:brightness-110 transition-all"
            >
              <span>Explore All Packages & Custom Extensions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 8: WHY TRAVEL WITH YAZHI? (Editorial Pillars) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
            THE YAZHI STANDARD
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
            Thoughtfully Planned. Beautifully Experienced.
          </h2>
          <p className="text-sm text-slate-muted mt-3 font-light">
            We hold ourselves to authentic service commitments. What you see is what you experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'Personalized Itineraries',
              desc: 'No cookie-cutter templates. Every day is planned around your family rhythm, preferred pace, and specific travel dreams.'
            },
            {
              num: '02',
              title: 'Carefully Selected Stays',
              desc: 'We partner with boutique heritage mansions, certified private pool villas, and handpicked 4/5-star properties with verified cleanliness.'
            },
            {
              num: '03',
              title: 'Transparent Trip Planning',
              desc: 'Clear itemized quotes in Indian Rupees with full disclosure on inclusions, hotel tiers, transfers, and taxes. Zero surprise fees.'
            },
            {
              num: '04',
              title: 'Dedicated Travel Assistance',
              desc: 'Direct communication on WhatsApp with your designated concierge. We handle changes, recommendations, and timing seamlessly.'
            },
            {
              num: '05',
              title: 'Flexible Travel Experiences',
              desc: 'Enjoy freedom on your journey. Want to linger another hour at a tea plantation or swap an afternoon activity? Your itinerary accommodates.'
            },
            {
              num: '06',
              title: 'Support Before & During',
              desc: 'Complete documentation, visa preparation, and 24/7 on-ground emergency coordination from departure to return flight.'
            }
          ].map((pillar) => (
            <div 
              key={pillar.num}
              className="p-8 rounded-2xl bg-white border border-sand-border hover:border-gold-royal/40 shadow-sm transition-all group"
            >
              <span className="font-mono text-xs text-gold-metallic font-semibold tracking-widest block mb-4">
                {pillar.num}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors mb-3">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-muted leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 9: TRAVEL JOURNAL */}
      <section className="py-24 bg-sand-card border-t border-sand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
                STORIES, GUIDES & INSPIRATION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
                Notes From the World
              </h2>
            </div>
            <Link
              to="/travel-journal"
              className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-navy-primary hover:text-gold-metallic flex items-center gap-1.5"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-4 h-4 text-gold-royal" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover destination-card-img"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-muted font-mono mb-2">
                      <Clock className="w-3 h-3 text-gold-metallic" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <Link to={`/travel-journal/${post.slug}`}>
                      <h3 className="font-serif text-xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-muted mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between text-xs">
                    <span className="text-slate-muted font-medium">{post.author}</span>
                    <Link
                      to={`/travel-journal/${post.slug}`}
                      className="text-gold-metallic hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: TRAVEL ENQUIRY CTA BANNER */}
      <section className="bg-navy-midnight text-white py-24 relative overflow-hidden border-y border-navy-royal/60">
        
        {/* Subtle decorative circles */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold-royal/10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-royal/40 border border-gold-royal/30 text-gold-royal text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET’S BEGIN YOUR JOURNEY</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Your Next Great Story <br />
            <span className="italic text-gold-light">Starts Here.</span>
          </h2>

          <p className="text-base text-sand-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            Tell us what you have in mind. We'll help you explore the possibilities, design the ideal circuit, and ensure every detail is tailored for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/plan-trip"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan My Trip</span>
            </Link>

            <a
              href="https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20talk%20to%20your%20team%20about%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-ivory bg-navy-royal/50 hover:bg-navy-royal border border-gold-royal/40 hover:border-gold-royal transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-gold-royal" />
              <span>Talk to Our Team (+91 98400 12345)</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS / GUEST STORIES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
            GUEST STORIES & REFLECTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
            Memories in Their Own Words
          </h2>
          <p className="text-xs text-slate-muted mt-2 font-mono">
            Sample traveler feedback gathered from recent departures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-2xl p-8 shadow-luxury border border-sand-border flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-gold-royal/30 mb-4" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-gold-royal">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-royal" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-body leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-sand-border">
                <h4 className="font-serif text-base font-semibold text-navy-primary">
                  {t.customerName}
                </h4>
                <div className="text-[11px] text-slate-muted font-mono flex items-center justify-between mt-1">
                  <span>{t.destination}</span>
                  <span className="text-gold-metallic">{t.travelDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultPackageSlug={selectedPackageForEnquiry?.slug}
        defaultPackageTitle={selectedPackageForEnquiry?.title}
      />

    </div>
  );
};
