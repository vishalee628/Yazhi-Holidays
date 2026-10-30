import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Phone, Search, Menu, X, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDestDropdownOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-navy-midnight/95 backdrop-blur-md border-b border-navy-royal/60 shadow-luxury-dark py-3'
          : 'bg-gradient-to-b from-navy-midnight/90 via-navy-midnight/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Official Uploaded Artwork */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/yazhi-logo.jpg"
                alt="Yazhi Holidays Official Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl tracking-wide text-white font-semibold group-hover:text-gold-light transition-colors duration-200">
                Yazhi <span className="text-gold-royal">Holidays</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/80 font-sans font-medium">
                Bespoke & Curated Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            
            {/* Destinations with quick dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDestDropdownOpen(true)}
              onMouseLeave={() => setDestDropdownOpen(false)}
            >
              <Link
                to="/destinations"
                className={`flex items-center gap-1.5 transition-colors duration-200 py-2 ${
                  location.pathname.startsWith('/destinations')
                    ? 'text-gold-royal font-semibold'
                    : 'text-sand-ivory/90 hover:text-white'
                }`}
              >
                <span>Destinations</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold-royal/80 transition-transform duration-200" />
              </Link>

              {destDropdownOpen && (
                <div className="absolute top-full -left-4 w-72 bg-navy-midnight/98 border border-gold-royal/30 rounded-lg shadow-luxury-dark py-3 px-2 z-50 backdrop-blur-lg animate-fadeIn">
                  <div className="text-[11px] font-mono tracking-widest text-gold-royal/80 px-3 pb-1 border-b border-navy-royal/50 uppercase">
                    Curated Destinations
                  </div>
                  <div className="grid grid-cols-1 gap-1 pt-2">
                    <Link to="/destinations/bali" className="flex items-center justify-between px-3 py-2 text-xs text-sand-ivory hover:text-gold-light hover:bg-navy-royal/40 rounded transition-colors">
                      <span className="font-medium">Bali, Indonesia</span>
                      <span className="text-[10px] text-gold-royal/80">Tropical & Temples</span>
                    </Link>
                    <Link to="/destinations/switzerland" className="flex items-center justify-between px-3 py-2 text-xs text-sand-ivory hover:text-gold-light hover:bg-navy-royal/40 rounded transition-colors">
                      <span className="font-medium">Switzerland</span>
                      <span className="text-[10px] text-gold-royal/80">Alpine & Rails</span>
                    </Link>
                    <Link to="/destinations/kerala" className="flex items-center justify-between px-3 py-2 text-xs text-sand-ivory hover:text-gold-light hover:bg-navy-royal/40 rounded transition-colors">
                      <span className="font-medium">Kerala, India</span>
                      <span className="text-[10px] text-gold-royal/80">Backwaters & Mist</span>
                    </Link>
                    <Link to="/destinations/dubai" className="flex items-center justify-between px-3 py-2 text-xs text-sand-ivory hover:text-gold-light hover:bg-navy-royal/40 rounded transition-colors">
                      <span className="font-medium">Dubai & UAE</span>
                      <span className="text-[10px] text-gold-royal/80">Modern & Desert</span>
                    </Link>
                    <Link to="/destinations/maldives" className="flex items-center justify-between px-3 py-2 text-xs text-sand-ivory hover:text-gold-light hover:bg-navy-royal/40 rounded transition-colors">
                      <span className="font-medium">Maldives</span>
                      <span className="text-[10px] text-gold-royal/80">Water Villas</span>
                    </Link>
                    <div className="border-t border-navy-royal/40 my-1"></div>
                    <Link to="/destinations" className="text-center block text-xs font-medium text-gold-royal hover:underline py-1">
                      View All 8+ Destinations &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/packages"
              className={`transition-colors duration-200 ${
                location.pathname.startsWith('/packages')
                  ? 'text-gold-royal font-semibold'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Holiday Packages
            </Link>

            <Link
              to="/collections"
              className={`transition-colors duration-200 ${
                location.pathname === '/collections'
                  ? 'text-gold-royal font-semibold'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Experiences
            </Link>

            <Link
              to="/about"
              className={`transition-colors duration-200 ${
                location.pathname === '/about'
                  ? 'text-gold-royal font-semibold'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Our Story
            </Link>

            <Link
              to="/travel-journal"
              className={`transition-colors duration-200 ${
                location.pathname.startsWith('/travel-journal')
                  ? 'text-gold-royal font-semibold'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Travel Journal
            </Link>

            <Link
              to="/contact"
              className={`transition-colors duration-200 ${
                location.pathname === '/contact'
                  ? 'text-gold-royal font-semibold'
                  : 'text-sand-ivory/90 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search destinations and packages"
              className="p-2 text-sand-ivory/80 hover:text-gold-royal hover:bg-navy-royal/40 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Contact Line */}
            <a
              href="tel:+919840012345"
              className="hidden xl:flex items-center gap-2 text-xs text-sand-ivory/80 hover:text-gold-royal transition-colors px-2 py-1 rounded"
              title="Call Yazhi Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-gold-royal" />
              <span>+91 98400 12345</span>
            </a>

            {/* Primary CTA: Plan My Trip */}
            <Link
              to="/plan-trip"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all duration-200 shadow-gold-glow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan My Trip</span>
            </Link>

            {/* Admin Key shortcut */}
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="text-navy-secondary hover:text-gold-royal/70 p-1.5 transition-colors"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 opacity-50 hover:opacity-100" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-sand-ivory hover:text-gold-royal focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-midnight/98 border-t border-gold-royal/20 px-6 py-6 space-y-4 shadow-luxury-dark backdrop-blur-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-base">
            <Link
              to="/"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium"
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium flex items-center justify-between"
            >
              <span>Explore Destinations</span>
              <span className="text-xs text-gold-royal">8+ Places</span>
            </Link>
            <Link
              to="/packages"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium"
            >
              Holiday Packages
            </Link>
            <Link
              to="/collections"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium"
            >
              Signature Experiences
            </Link>
            <Link
              to="/about"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium"
            >
              About Yazhi Holidays
            </Link>
            <Link
              to="/travel-journal"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium"
            >
              Travel Journal
            </Link>
            <Link
              to="/contact"
              className="text-sand-ivory hover:text-gold-royal py-1.5 border-b border-navy-royal/30 font-medium"
            >
              Contact & Enquiries
            </Link>
          </nav>

          <div className="pt-4 border-t border-navy-royal/60 flex flex-col gap-3">
            <Link
              to="/plan-trip"
              className="w-full text-center py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic shadow-gold-glow"
            >
              Custom Trip Planner &rarr;
            </Link>

            <a
              href="https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20plan%20a%20holiday."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-full text-xs font-semibold text-sand-ivory border border-gold-royal/40 hover:bg-gold-royal/10 flex items-center justify-center gap-2"
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
