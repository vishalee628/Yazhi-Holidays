import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Star,
  Quote,
  MessageCircle
} from 'lucide-react';
import { DESTINATIONS, PACKAGES, COLLECTIONS } from '../data/travelData';
import { ReviewTestimonial } from '../types';
import { getReviews } from '../services/reviewService';
import { EnquiryModal } from '../components/EnquiryModal';
import { CinematicIntro } from '../components/CinematicIntro';
import { FlightPathAnimation } from '../components/FlightPathAnimation';
import { TiltCard } from '../components/TiltCard';
import { BrandMoment } from '../components/BrandMoment';
import { HappyCustomersGallery } from '../components/HappyCustomersGallery';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // 3D Parallax state for Hero
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    setHeroMouse({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMouse({ x: 0, y: 0 });
  };

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

  // Customer Reviews & Testimonials Carousel State
  const [reviews, setReviews] = useState<ReviewTestimonial[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  // Smooth Auto-sliding Carousel with pause on hover
  useEffect(() => {
    if (reviews.length <= 1 || isReviewPaused) return;
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length, isReviewPaused]);

  const handlePrevReview = () => {
    if (reviews.length === 0) return;
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNextReview = () => {
    if (reviews.length === 0) return;
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

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

  // Filtered domestic packages
  const displayedPackages = selectedPkgTab === 'All' 
    ? PACKAGES.slice(0, 4)
    : PACKAGES.filter(p => 
        p.tripType === selectedPkgTab || 
        (selectedPkgTab === 'Hill Stations' && ['ooty', 'kodaikanal', 'munnar', 'coorg', 'manali'].includes(p.destinationSlug))
      );

  return (
    <div className="min-h-screen bg-sand-ivory text-slate-body">

      {/* SECTION 1: CINEMATIC WEBSITE ENTRANCE (Phase 1, 2, 3 with sessionStorage guard) */}
      <CinematicIntro />


      {/* SECTION 2: SIGNATURE 3D HERO EXPERIENCE */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-midnight pt-20"
      >
        
        {/* Full-width dramatic golden-hour Indian destination image with 3D parallax depth */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=2000&q=85"
            alt="Misty Nilgiri Hills tea valleys at golden hour"
            style={{
              transform: `translate3d(${heroMouse.x * -16}px, ${heroMouse.y * -16}px, 0) scale(1.07)`,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="w-full h-full object-cover object-center will-change-transform brightness-[0.76]"
          />
          {/* Layered cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight/90 via-navy-midnight/65 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-transparent to-navy-midnight/40"></div>
          
          {/* Subtle gold accent line decoration */}
          <div className="absolute bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-royal/30 to-transparent"></div>

          {/* Floating Atmospheric Light Dust Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gold-royal/40 blur-[1px] animate-float-slow"
                style={{
                  width: `${(i % 3) * 2 + 2}px`,
                  height: `${(i % 3) * 2 + 2}px`,
                  top: `${18 + i * 13}%`,
                  left: `${12 + i * 14}%`,
                  animationDelay: `${i * 0.9}s`,
                  transform: `translate3d(${heroMouse.x * (12 + i * 6)}px, ${heroMouse.y * (12 + i * 6)}px, 0)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl">
            
            {/* Editorial Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-midnight/80 border border-gold-royal/40 backdrop-blur-md mb-6 animate-hero-fade">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium">
                TRAVEL, THOUGHTFULLY CURATED
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.08] tracking-tight mb-6 animate-hero-title">
              Your World. <br />
              <span className="italic font-light text-gold-light">Your Story.</span>
            </h1>

            {/* Supporting Copy */}
            <div className="animate-hero-sub">
              <p className="text-base sm:text-xl text-sand-ivory/90 leading-relaxed font-light mb-4 max-w-2xl">
                Discover extraordinary places. Experience unforgettable moments. Let your next journey begin with Yazhi Holidays.
              </p>

              <p className="text-xs uppercase tracking-widest text-gold-royal/90 mb-8 font-mono">
                Extraordinary places • Meaningful experiences • Memories that stay
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-hero-cta">
              <Link
                to="/destinations"
                data-magnetic="true"
                className="btn-hero-primary group"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </Link>
              
              <Link
                to="/plan-trip"
                data-magnetic="true"
                className="btn-hero-secondary group"
              >
                <span>Design Your Journey</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Destination Ticker */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-navy-midnight/90 border-t border-navy-royal/50 py-3 hidden md:block backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-sand-ivory/70 font-sans">
            <span className="text-gold-royal font-mono uppercase tracking-widest text-[10px]">CURRENT INSPIRATION:</span>
            <div className="flex items-center gap-8 text-sand-ivory/80">
              <Link to="/destinations/ooty" className="hover:text-gold-light transition-colors">Ooty & Nilgiri Hills (5D/4N from ₹24,500)</Link>
              <span className="text-navy-royal">•</span>
              <Link to="/destinations/munnar" className="hover:text-gold-light transition-colors">Munnar & Kerala Backwaters (5D/4N from ₹26,900)</Link>
              <span className="text-navy-royal">•</span>
              <Link to="/destinations/coorg" className="hover:text-gold-light transition-colors">Mysore & Coorg (4D/3N from ₹21,500)</Link>
              <span className="text-navy-royal">•</span>
              <Link to="/destinations/rameswaram-madurai-kanyakumari" className="hover:text-gold-light transition-colors">Madurai & Rameswaram (5D/4N from ₹25,500)</Link>
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
                className="btn-primary w-full py-3.5"
              >
                <Sparkles className="w-4 h-4 btn-no-move" />
                <span>Find My Journey</span>
              </button>
            </div>

          </form>

          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-sand-border flex-wrap">
            <span className="text-xs text-slate-muted font-medium">Trip Type:</span>
            {['All', 'Honeymoon', 'Family', 'Adventure', 'Leisure', 'Cultural', 'Hill Stations'].map((type) => (
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

      {/* SIGNATURE GOLDEN FLIGHT-PATH ANIMATION */}
      <FlightPathAnimation />

      {/* SECTION 4: IMMERSIVE DESTINATION DISCOVERY (Asymmetric 3D Editorial Layout) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-on-scroll">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
              CURATED ESCAPES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal leading-tight">
              Some Places Change Everything.
            </h2>
            <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
              Discover remarkable destinations selected for the experiences they make possible. Each journey is paced with mindful care.
            </p>
          </div>
          <Link
            to="/destinations"
            className="btn-secondary group mt-6 md:mt-0"
          >
            <span>Explore All 8+ Destinations</span>
            <ArrowRight className="w-4 h-4 btn-arrow text-gold-royal" />
          </Link>
        </div>

        {/* Asymmetrical Grid: 1 Large Feature + 2 Medium Panels + 3 Balanced Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1 Large Featured Destination Panel (Cols 1-7) with 3D Tilt */}
          <div className="lg:col-span-7 reveal-on-scroll stagger-1">
            <TiltCard className="h-full">
              <div className="group relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-luxury destination-card">
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
                      className="btn-primary text-xs py-2 px-4 group"
                    >
                      <span>Explore Destination</span>
                      <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* 2 Medium Destination Panels (Cols 8-12) with 3D Tilt */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {DESTINATIONS.slice(1, 3).map((dest, idx) => (
              <div key={dest.id} className={`reveal-on-scroll stagger-${idx + 2}`}>
                <TiltCard>
                  <div className="group relative h-[264px] rounded-3xl overflow-hidden shadow-luxury destination-card">
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
                          className="btn-primary text-xs py-1.5 px-3.5 group"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 btn-arrow" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

        </div>

        {/* 3 Smaller Balanced Destination Cards Below with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {DESTINATIONS.slice(3, 6).map((dest, idx) => (
            <div key={dest.id} className={`reveal-on-scroll stagger-${idx + 1} h-full`}>
              <TiltCard className="h-full">
                <div className="group bg-white rounded-3xl overflow-hidden shadow-luxury border border-sand-border destination-card flex flex-col h-full">
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
                        className="btn-secondary text-xs py-1.5 px-3.5 group"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5 btn-arrow text-gold-royal" />
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 5: SIGNATURE INTERACTIVE YAZHI BRAND MOMENT */}
      <BrandMoment />

      {/* SECTION 6: SIGNATURE HOLIDAY COLLECTIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
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
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.id}
              to={`/packages?type=${col.category}`}
              className={`group relative h-96 rounded-2xl overflow-hidden shadow-luxury destination-card flex flex-col justify-end p-8 text-white reveal-on-scroll stagger-${(idx % 3) + 1}`}
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
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-on-scroll">
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
              {['All', 'Honeymoon', 'Family', 'Cultural', 'Adventure', 'Hill Stations'].map((tab) => (
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
            {displayedPackages.map((pkg, idx) => (
              <div 
                key={pkg.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border flex flex-col sm:flex-row group transition-all hover:border-gold-royal/40 reveal-on-scroll stagger-${(idx % 2) + 1}`}
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
                        className="btn-secondary text-xs py-2 px-3.5"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleOpenEnquiryForPkg(pkg.slug, pkg.title)}
                        className="btn-primary text-xs py-2 px-4"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal-on-scroll">
            <Link
              to="/packages"
              className="btn-primary py-3.5 px-8 group"
            >
              <span>Explore All Packages & Custom Extensions</span>
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 8: WHY TRAVEL WITH YAZHI? (Editorial Pillars) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-16 reveal-on-scroll">
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
          ].map((pillar, idx) => (
            <div 
              key={pillar.num}
              className={`p-8 rounded-2xl bg-white border border-sand-border hover:border-gold-royal/40 shadow-sm transition-all group reveal-on-scroll stagger-${(idx % 3) + 1}`}
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

      {/* SECTION 9: HAPPY CUSTOMERS – MEMORIES FROM OUR TRIPS */}
      <HappyCustomersGallery />

      {/* SECTION 10: TRAVEL ENQUIRY CTA BANNER */}
      <section className="bg-navy-midnight text-white py-24 relative overflow-hidden border-y border-navy-royal/60">
        
        {/* Subtle decorative circles */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold-royal/10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6 reveal-on-scroll">
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
              data-magnetic="true"
              className="btn-primary w-full sm:w-auto px-8 py-3.5"
            >
              <Sparkles className="w-4 h-4 btn-no-move" />
              <span>Plan My Trip</span>
            </Link>

            <a
              href="https://wa.me/9196380792722?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20talk%20to%20your%20team%20about%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              className="btn-secondary-dark w-full sm:w-auto px-8 py-3.5"
            >
              <MessageCircle className="w-4 h-4 text-gold-royal btn-no-move" />
              <span>Talk to Our Team (6380792722)</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 11: CUSTOMER REVIEWS & TESTIMONIALS CAROUSEL */}
      <section 
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsReviewPaused(true)}
        onMouseLeave={() => setIsReviewPaused(false)}
        aria-label="Customer Reviews & Testimonials"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-on-scroll">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
              VERIFIED GUEST REFLECTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
              Memories in Their Own Words
            </h2>
            <p className="text-xs sm:text-sm text-slate-muted mt-2 font-light">
              Real reflections and stories from travelers on our domestic circuits
            </p>
          </div>

          {/* Carousel Previous / Next Controls */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-3 mt-6 md:mt-0">
              <span className="text-xs font-mono text-slate-muted hidden sm:inline">
                {activeReviewIndex + 1} of {reviews.length}
              </span>
              <button
                onClick={handlePrevReview}
                aria-label="Previous customer review"
                className="w-10 h-10 rounded-full border border-sand-border bg-white text-navy-primary hover:border-gold-royal hover:text-gold-royal hover:bg-navy-midnight transition-all flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextReview}
                aria-label="Next customer review"
                className="w-10 h-10 rounded-full border border-sand-border bg-white text-navy-primary hover:border-gold-royal hover:text-gold-royal hover:bg-navy-midnight transition-all flex items-center justify-center shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Reviews Cards Display */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-slate-muted font-light text-sm">
            Loading verified reviews...
          </div>
        ) : (
          <div className="space-y-8">
            {/* Desktop 3-Card Window / Mobile Single Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[0, 1, 2].map((offset) => {
                const reviewIdx = (activeReviewIndex + offset) % reviews.length;
                const t = reviews[reviewIdx];
                if (!t) return null;
                const isPrimary = offset === 0;

                return (
                  <div
                    key={`${t.id}-${offset}`}
                    className={`bg-white rounded-2xl p-7 sm:p-8 shadow-luxury border transition-all duration-300 flex flex-col justify-between relative group ${
                      isPrimary 
                        ? 'border-gold-royal/50 ring-1 ring-gold-royal/20 md:ring-0 md:border-sand-border' 
                        : 'border-sand-border hidden md:flex'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Quote & Rating */}
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="w-8 h-8 text-gold-royal/35 flex-shrink-0" />
                        <div className="flex items-center gap-1 text-gold-royal bg-sand-ivory/80 px-2.5 py-1 rounded-full border border-gold-royal/20">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold-royal text-gold-royal" />
                          ))}
                        </div>
                      </div>

                      {/* Review Comment Text */}
                      <p className="text-xs sm:text-sm text-slate-body leading-relaxed italic mb-6">
                        "{t.comment}"
                      </p>
                    </div>

                    {/* Author Details with Customer Profile Photo */}
                    <div className="pt-5 border-t border-sand-border flex items-center gap-3.5">
                      {/* Customer Photo / Avatar with fallback */}
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold-royal/40 shadow-sm bg-sand-card flex items-center justify-center">
                        {t.avatar || t.photo ? (
                          <img
                            src={t.avatar || t.photo}
                            alt={t.customerName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials avatar on error
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="font-serif font-bold text-navy-primary text-sm">
                            {t.customerName.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-serif text-sm sm:text-base font-semibold text-navy-primary truncate">
                            {t.customerName}
                          </h4>
                          {t.verified !== false && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-gold-metallic bg-gold-royal/10 border border-gold-royal/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              <CheckCircle2 className="w-2.5 h-2.5 text-gold-royal" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-muted font-mono flex items-center justify-between gap-2 mt-0.5">
                          <span className="truncate">{t.destination}</span>
                          <span className="text-gold-metallic flex-shrink-0">{t.travelDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Indicators & Pause Notice */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeReviewIndex === idx
                        ? 'w-7 bg-gold-royal shadow-sm'
                        : 'w-2 bg-sand-border hover:bg-slate-muted'
                    }`}
                  />
                ))}
              </div>

              <span className="text-[11px] font-mono text-slate-muted">
                {isReviewPaused ? 'Paused on hover' : 'Auto-sliding every 5 seconds'}
              </span>
            </div>
          </div>
        )}
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
