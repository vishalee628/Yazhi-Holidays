import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Sparkles, ShieldCheck, MapPin, ArrowRight, Phone } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDestDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDestDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDestDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setDestDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDestDropdownOpen(false);
    }, 200);
  };

  const isHome = location.pathname === '/';
  const internationalDests = DESTINATIONS.filter(d => d.region === 'International');
  const domesticDests = DESTINATIONS.filter(d => d.region === 'Domestic');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-navy-midnight/98 backdrop-blur-md border-b border-navy-royal/70 shadow-luxury-dark py-2'
          : 'bg-gradient-to-b from-navy-midnight/95 via-navy-midnight/70 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Balanced 3-Column Layout: Left (Logo), Center (Nav Links), Right (CTA & Actions) */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-6 xl:gap-8 h-16 sm:h-20">
          
          {/* ========================================================= */}
          {/* LEFT: Official Brand Logo & Identity                      */}
          {/* ========================================================= */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-gold-royal/50 rounded-full pr-2"
              aria-label="Yazhi Holidays Homepage"
            >
              {/* Preserved Official Uploaded Logo Asset */}
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/yazhi-logo.jpg"
                  alt="Yazhi Holidays Official Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col justify-center">
                <span className="font-serif text-xl sm:text-2xl tracking-wide text-white font-semibold leading-none group-hover:text-gold-light transition-colors duration-200">
                  Yazhi <span className="text-gold-royal">Holidays</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-gold-light/80 font-sans font-medium mt-1 leading-none">
                  Bespoke & Curated Travel
                </span>
              </div>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* CENTER: Desktop Navigation Links (Vertically Centered)    */}
          {/* ========================================================= */}
          <nav 
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 text-[13px] xl:text-sm font-medium tracking-wide"
            aria-label="Main Navigation"
          >
            {/* 1. Destinations with Premium Accessible Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  to="/destinations"
                  className={`nav-link flex items-center gap-1.5 py-2 whitespace-nowrap ${
                    location.pathname.startsWith('/destinations')
                      ? 'text-gold-royal active'
                      : 'text-sand-ivory/90 hover:text-white'
                  }`}
                  aria-expanded={destDropdownOpen}
                >
                  <span>Destinations</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gold-royal/80 transition-transform duration-300 ${destDropdownOpen ? 'rotate-180 text-gold-royal' : ''}`} />
                </Link>
              </div>

              {/* Accessible Premium Destinations Dropdown */}
              {destDropdownOpen && (
                <div 
                  className="absolute top-full -left-12 xl:left-0 w-[580px] bg-navy-midnight/98 border border-gold-royal/35 rounded-2xl shadow-luxury-dark p-6 z-50 backdrop-blur-2xl animate-dropdown overflow-hidden"
                  role="menu"
                >
                  {/* Subtle top gold accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-royal to-transparent"></div>

                  <div className="grid grid-cols-2 gap-6 pb-5 border-b border-navy-royal/60">
                    
                    {/* Column 1: International Tours */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-gold-royal uppercase pb-2 mb-2 border-b border-navy-royal/40 font-semibold">
                        <MapPin className="w-3 h-3 text-gold-royal" />
                        <span>International Escapes</span>
                      </div>
                      <div className="space-y-1">
                        {internationalDests.slice(0, 5).map((dest) => (
                          <Link
                            key={dest.id}
                            to={`/destinations/${dest.slug}`}
                            className="flex items-center justify-between p-2 rounded-lg text-xs text-sand-ivory/90 hover:text-white hover:bg-navy-royal/40 group transition-all"
                            role="menuitem"
                          >
                            <span className="font-medium group-hover:text-gold-light transition-colors">{dest.name}</span>
                            <span className="text-[10px] font-mono text-gold-royal/70 group-hover:text-gold-royal font-semibold">
                              From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Domestic & Featured */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-gold-royal uppercase pb-2 mb-2 border-b border-navy-royal/40 font-semibold">
                        <Sparkles className="w-3 h-3 text-gold-royal" />
                        <span>Domestic & Signature</span>
                      </div>
                      <div className="space-y-1">
                        {domesticDests.map((dest) => (
                          <Link
                            key={dest.id}
                            to={`/destinations/${dest.slug}`}
                            className="flex items-center justify-between p-2 rounded-lg text-xs text-sand-ivory/90 hover:text-white hover:bg-navy-royal/40 group transition-all"
                            role="menuitem"
                          >
                            <span className="font-medium group-hover:text-gold-light transition-colors">{dest.name}</span>
                            <span className="text-[10px] font-mono text-gold-royal/70 group-hover:text-gold-royal font-semibold">
                              From ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                            </span>
                          </Link>
                        ))}

                        {/* Special Feature snippet */}
                        <div className="mt-3 p-3 rounded-xl bg-navy-royal/30 border border-gold-royal/20">
                          <span className="text-[10px] font-mono text-gold-light block uppercase font-medium">Bespoke Pacing</span>
                          <p className="text-[11px] text-sand-ivory/80 mt-0.5 leading-snug">
                            All routes are 100% customizable around your private dates.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Dropdown Bottom Banner Link */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs text-sand-ivory/70">
                      Looking for a tailored journey?
                    </span>
                    <Link
                      to="/destinations"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-royal hover:text-gold-light transition-colors"
                      role="menuitem"
                    >
                      <span>Discover Your Next Destination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              )}
            </div>

            {/* 2. Holiday Packages */}
            <Link
              to="/packages"
              className={`nav-link py-2 whitespace-nowrap ${
                location.pathname.startsWith('/packages')
                  ? 'text-gold-royal active'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Holiday Packages
            </Link>

            {/* 3. Experiences */}
            <Link
              to="/collections"
              className={`nav-link py-2 whitespace-nowrap ${
                location.pathname === '/collections'
                  ? 'text-gold-royal active'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Experiences
            </Link>

            {/* 4. Our Story */}
            <Link
              to="/about"
              className={`nav-link py-2 whitespace-nowrap ${
                location.pathname === '/about'
                  ? 'text-gold-royal active'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Our Story
            </Link>

            {/* 5. Travel Journal */}
            <Link
              to="/travel-journal"
              className={`nav-link py-2 whitespace-nowrap ${
                location.pathname.startsWith('/travel-journal')
                  ? 'text-gold-royal active'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Travel Journal
            </Link>

            {/* 6. Contact */}
            <Link
              to="/contact"
              className={`nav-link py-2 whitespace-nowrap ${
                location.pathname === '/contact'
                  ? 'text-gold-royal active'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* ========================================================= */}
          {/* RIGHT: Actions (Search, Plan My Trip CTA, Mobile Trigger) */}
          {/* ========================================================= */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search destinations and packages"
              className="p-2.5 text-sand-ivory/80 hover:text-gold-royal hover:bg-navy-royal/50 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-gold-royal/50"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Primary Action Button: "Plan My Trip" */}
            <Link
              to="/plan-trip"
              className="hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-gold-glow whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold-royal/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan My Trip</span>
            </Link>

            {/* Staff Portal Link shortcut */}
            <Link
              to="/admin/login"
              title="Concierge Portal"
              className="text-navy-secondary hover:text-gold-royal/70 p-1.5 transition-colors focus:outline-none rounded hidden md:block"
              aria-label="Staff Administration Login"
            >
              <ShieldCheck className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-sand-ivory hover:text-gold-royal focus:outline-none focus:ring-1 focus:ring-gold-royal/50 rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FULL-SCREEN RESPONSIVE DRAWER                      */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[64px] sm:top-[76px] bg-navy-midnight/98 border-t border-gold-royal/20 z-50 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <nav className="flex flex-col space-y-1 text-base">
            <Link
              to="/"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              Home
            </Link>

            <Link
              to="/destinations"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 flex items-center justify-between ${
                location.pathname.startsWith('/destinations') ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              <span>Discover Your Next Destination</span>
              <span className="text-xs text-gold-royal font-mono bg-navy-royal/50 px-2 py-0.5 rounded-full">8+ Places</span>
            </Link>

            <Link
              to="/packages"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname.startsWith('/packages') ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              Holiday Packages
            </Link>

            <Link
              to="/collections"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/collections' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              Signature Experiences
            </Link>

            <Link
              to="/about"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/about' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              Our Story & Philosophy
            </Link>

            <Link
              to="/travel-journal"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname.startsWith('/travel-journal') ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              Travel Journal
            </Link>

            <Link
              to="/contact"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/contact' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-sand-ivory hover:text-gold-royal'
              }`}
            >
              Contact Concierge
            </Link>
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="pt-6 border-t border-navy-royal/60 flex flex-col gap-3 pb-8">
            <Link
              to="/plan-trip"
              className="w-full text-center py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Custom Trip Planner</span>
            </Link>

            <a
              href="https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20plan%20a%20holiday."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-full text-xs font-semibold text-sand-ivory border border-gold-royal/40 hover:bg-gold-royal/10 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-royal" />
              <span>WhatsApp Concierge: +91 98400 12345</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
