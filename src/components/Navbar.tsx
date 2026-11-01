import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sparkles, ShieldCheck, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, [location.pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
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

  const isHome = location.pathname === '/';
  const isSolidNavbar = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isSolidNavbar
          ? 'bg-[#071D3A] border-b border-[#0B2A50] shadow-luxury-dark py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-[#041329]/95 via-[#041329]/60 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Balanced 3-Column Layout: Left (Logo), Center (Nav Links), Right (CTA & Actions) */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-6 xl:gap-8 h-16 sm:h-20">
          
          {/* ========================================================= */}
          {/* LEFT: Official Brand Logo & Identity                      */}
          {/* ========================================================= */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-3 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal/70 rounded-xl"
              aria-label="Yazhi Holidays Homepage"
            >
              {/* Preserved Official Uploaded Logo Asset (Fixed dimensions & object-contain) */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <img
                  src="/yazhi-logo.jpg"
                  alt="Yazhi Holidays Official Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Brand Typography: Strictly left-aligned & vertically centered */}
              <div className="flex flex-col justify-center items-start text-left flex-shrink-0">
                <span className="font-serif text-lg sm:text-xl lg:text-[22px] tracking-wide text-white font-semibold leading-tight group-hover:text-gold-light transition-colors duration-200 whitespace-nowrap">
                  Yazhi <span className="text-gold-royal">Holidays</span>
                </span>
                <span className="hidden sm:block text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-gold-light/85 font-sans font-medium leading-normal mt-0.5 whitespace-nowrap">
                  Your Journey, Our Passion
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
            {/* 1. Destinations */}
            <Link
              to="/destinations"
              className={`nav-link py-2 whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/destinations')
                  ? 'text-gold-royal active font-semibold'
                  : 'text-white hover:text-gold-royal'
              }`}
            >
              Destinations
            </Link>

            {/* 2. Holiday Packages */}
            <Link
              to="/packages"
              className={`nav-link py-2 whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/packages')
                  ? 'text-gold-royal active font-semibold'
                  : 'text-white hover:text-gold-royal'
              }`}
            >
              Holiday Packages
            </Link>

            {/* 3. Experiences */}
            <Link
              to="/collections"
              className={`nav-link py-2 whitespace-nowrap transition-colors ${
                location.pathname === '/collections'
                  ? 'text-gold-royal active font-semibold'
                  : 'text-white hover:text-gold-royal'
              }`}
            >
              Experiences
            </Link>

            {/* 4. Our Story */}
            <Link
              to="/about"
              className={`nav-link py-2 whitespace-nowrap transition-colors ${
                location.pathname === '/about'
                  ? 'text-gold-royal active font-semibold'
                  : 'text-white hover:text-gold-royal'
              }`}
            >
              Our Story
            </Link>


            {/* 6. Contact */}
            <Link
              to="/contact"
              className={`nav-link py-2 whitespace-nowrap transition-colors ${
                location.pathname === '/contact'
                  ? 'text-gold-royal active font-semibold'
                  : 'text-white hover:text-gold-royal'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* ========================================================= */}
          {/* RIGHT: Actions (Search, Call, Plan My Trip CTA, Mobile)  */}
          {/* ========================================================= */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4">
            
            {/* Quick Click-to-Call Contact (Desktop) */}
            <a
              href="tel:6380792722"
              className="hidden 2xl:flex items-center gap-2 text-xs font-medium text-white hover:text-gold-royal transition-colors px-2 py-1 rounded"
              title="Call Yazhi Holidays"
            >
              <Phone className="w-3.5 h-3.5 text-gold-royal" />
              <span>6380792722</span>
            </a>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search destinations and packages"
              className="p-2.5 text-white/80 hover:text-gold-royal hover:bg-navy-royal/50 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-gold-royal/50"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Primary Action Button: "Plan My Trip" */}
            <Link
              to="/plan-trip"
              className="btn-primary hidden sm:inline-flex"
            >
              <Sparkles className="w-3.5 h-3.5 btn-no-move" />
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
              className="lg:hidden p-2 text-white hover:text-gold-royal focus:outline-none focus:ring-1 focus:ring-gold-royal/50 rounded-lg"
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
          className="lg:hidden fixed inset-0 top-[64px] sm:top-[76px] bg-[#071D3A] border-t border-gold-royal/20 z-50 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <nav className="flex flex-col space-y-1 text-base">
            <Link
              to="/"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-white hover:text-gold-royal'
              }`}
            >
              Home
            </Link>

            <Link
              to="/destinations"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname.startsWith('/destinations') ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-white hover:text-gold-royal'
              }`}
            >
              Destinations
            </Link>

            <Link
              to="/packages"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname.startsWith('/packages') ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-white hover:text-gold-royal'
              }`}
            >
              Holiday Packages
            </Link>

            <Link
              to="/collections"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/collections' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-white hover:text-gold-royal'
              }`}
            >
              Signature Experiences
            </Link>

            <Link
              to="/about"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/about' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-white hover:text-gold-royal'
              }`}
            >
              Our Story & Philosophy
            </Link>


            <Link
              to="/contact"
              className={`py-3 px-3 rounded-xl font-medium transition-colors border-b border-navy-royal/30 ${
                location.pathname === '/contact' ? 'text-gold-royal font-semibold bg-navy-royal/30' : 'text-white hover:text-gold-royal'
              }`}
            >
              Contact Concierge
            </Link>
          </nav>

          {/* Mobile Bottom Actions with Updated Official Contact Info */}
          <div className="pt-6 border-t border-navy-royal/60 flex flex-col gap-3 pb-8">
            <Link
              to="/plan-trip"
              className="btn-primary w-full py-3.5"
            >
              <Sparkles className="w-4 h-4 btn-no-move" />
              <span>Custom Trip Planner</span>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:6380792722"
                className="py-3 px-2 rounded-full text-xs font-semibold text-white bg-navy-royal/60 border border-gold-royal/30 hover:bg-navy-royal flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold-royal" />
                <span>Call 6380792722</span>
              </a>

              <a
                href="https://wa.me/9196380792722?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20know%20more%20about%20your%20holiday%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 flex items-center justify-center gap-2 transition-colors"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-white/60 font-sans mt-1">
              Sulur, Coimbatore, Tamil Nadu, India
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
