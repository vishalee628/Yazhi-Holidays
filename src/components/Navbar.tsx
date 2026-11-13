import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  ChevronRight, 
  Home, 
  MapPin, 
  Package, 
  Camera, 
  HeartHandshake, 
  MessageCircle,
  X 
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

// 6 Core Mobile Navigation Items requested by user
const MOBILE_NAV_LINKS = [
  { 
    num: '01', 
    label: 'Home', 
    path: '/', 
    subtitle: 'Curated Indian Escapes & Circuits', 
    icon: Home 
  },
  { 
    num: '02', 
    label: 'About Us', 
    path: '/about', 
    subtitle: 'The Yazhi Heritage & Philosophy', 
    icon: HeartHandshake 
  },
  { 
    num: '03', 
    label: 'Destinations', 
    path: '/destinations', 
    subtitle: 'Ooty, Munnar, Kashmir & Beyond', 
    icon: MapPin 
  },
  { 
    num: '04', 
    label: 'Tour Packages', 
    path: '/packages', 
    subtitle: 'Handcrafted Verified Itineraries', 
    icon: Package 
  },
  { 
    num: '05', 
    label: 'Happy Customers', 
    path: '/#happy-customers-gallery', 
    subtitle: 'Authentic Travel Moments & Reviews', 
    icon: Camera, 
    isScroll: true 
  },
  { 
    num: '06', 
    label: 'Contact Us', 
    path: '/contact', 
    subtitle: 'Sulur Concierge Desk & Direct Call', 
    icon: Phone 
  },
];

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
    <>
      {/* ========================================================= */}
      {/* 1. FLOATING-STYLE MOBILE NAVBAR HEADER (Mobile Only < lg) */}
      {/* ========================================================= */}
      <header className="lg:hidden fixed top-2.5 sm:top-3.5 inset-x-2.5 sm:inset-x-4 z-50">
        <div 
          className={`w-full rounded-2xl transition-all duration-300 px-3.5 sm:px-4 py-2.5 flex items-center justify-between border ${
            scrolled
              ? 'bg-[#041329]/95 backdrop-blur-2xl border-gold-royal/50 shadow-[0_12px_36px_rgba(4,19,41,0.85)]'
              : 'bg-[#041329]/90 backdrop-blur-xl border-gold-royal/35 shadow-[0_8px_30px_rgba(4,19,41,0.65)]'
          }`}
        >
          {/* Left: Brand Logo & Typography with breathing room */}
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Yazhi Holidays Homepage"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <img
                src="/yazhi-logo.jpg"
                alt="Yazhi Holidays Official Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="font-serif text-base min-[360px]:text-lg sm:text-xl tracking-wide text-white font-semibold leading-tight group-hover:text-gold-light transition-colors whitespace-nowrap">
                Yazhi <span className="text-gold-royal">Holidays</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-gold-light/85 font-mono leading-none mt-0.5 whitespace-nowrap">
                Curated Escapes
              </span>
            </div>
          </Link>

          {/* Right: Search Trigger & Animated Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search destinations and packages"
              className="w-9 h-9 rounded-xl bg-navy-royal/50 hover:bg-navy-royal border border-gold-royal/30 text-white/90 hover:text-gold-royal flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-gold-royal/50 shadow-sm"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Stylish Animated Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-navy-royal/80 to-navy-midnight/90 border border-gold-royal/40 hover:border-gold-royal/80 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-royal/50 transition-all duration-300 active:scale-95 shadow-sm"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span 
                className={`w-5 h-[2px] bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              <span 
                className={`w-3.5 h-[2px] self-end mr-0.5 bg-gradient-to-r from-gold-light to-gold-royal rounded-full transition-all duration-200 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`w-5 h-[2px] bg-gradient-to-r from-gold-metallic via-gold-royal to-gold-light rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. FULL-SCREEN LUXURY MOBILE NAVIGATION EXPERIENCE        */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[60] bg-[#041329] flex flex-col justify-between overflow-y-auto animate-menu-scale"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Subtle Golden Star Dust / Constellation Overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F5B82E_1px,transparent_1px)] [background-size:28px_28px]" />
          
          {/* Ambient Golden Glow Aura */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gold-royal/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-navy-royal/40 blur-3xl pointer-events-none" />

          {/* Top Header inside Full-Screen Menu */}
          <div className="relative z-10 px-4 pt-4 sm:px-6 sm:pt-6 flex items-center justify-between border-b border-navy-royal/50 pb-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0">
                <img
                  src="/yazhi-logo.jpg"
                  alt="Yazhi Holidays"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-lg font-semibold text-white leading-tight">
                  Yazhi <span className="text-gold-royal">Holidays</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light/80 font-mono">
                  Bespoke Indian Journeys
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-navy-royal/60 border border-gold-royal/40 text-gold-royal hover:bg-gold-royal hover:text-navy-midnight flex items-center justify-center transition-colors shadow-sm focus:outline-none"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation Links List (Staggered Animation & Grand Typography) */}
          <nav className="relative z-10 px-4 sm:px-6 py-6 sm:py-8 space-y-3 sm:space-y-4 my-auto" aria-label="Mobile Navigation Links">
            {MOBILE_NAV_LINKS.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.isScroll
                ? false
                : location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={(e) => {
                    if (item.isScroll && location.pathname === '/') {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      const el = document.getElementById('happy-customers-gallery');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 min-h-[60px] animate-menu-item ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-royal/20 via-navy-royal/60 to-transparent border-l-4 border-gold-royal shadow-sm ring-1 ring-gold-royal/30'
                      : 'hover:bg-navy-royal/40 active:bg-navy-royal/60 border-l-4 border-transparent'
                  }`}
                  style={{ animationDelay: `${index * 55 + 70}ms` }}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Number and Icon Roundel */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light text-navy-midnight shadow-[0_0_14px_rgba(245,184,46,0.7)]'
                        : 'bg-navy-royal/70 border border-gold-royal/30 text-gold-royal group-hover:border-gold-royal/60'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex flex-col text-left min-w-0 transition-transform duration-300 group-hover:translate-x-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl min-[360px]:text-[26px] sm:text-3xl font-medium text-white group-hover:text-gold-light leading-snug">
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-gold-royal text-navy-midnight font-bold tracking-wider animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-sand-ivory/65 font-sans font-light truncate mt-0.5">
                        {item.subtitle}
                      </span>

                      {/* Smooth Golden Underline Indicator when active */}
                      {isActive && (
                        <div className="w-12 h-[2px] bg-gradient-to-r from-gold-light to-gold-royal rounded-full mt-1.5" />
                      )}
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5 flex-shrink-0 ${
                    isActive ? 'text-gold-royal' : 'text-sand-ivory/30 group-hover:text-gold-royal/70'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Bottom Concierge & Reservation Actions */}
          <div className="relative z-10 p-4 sm:p-6 border-t border-navy-royal/50 bg-navy-midnight/90 space-y-3.5">
            <Link
              to="/plan-trip"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full py-4 min-h-[50px] justify-center text-center shadow-gold-glow text-xs sm:text-sm font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-4 h-4 btn-no-move" />
              <span>Plan My Custom Trip</span>
            </Link>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:6380792722"
                className="py-3 px-2 rounded-xl text-xs font-semibold text-white bg-navy-royal/60 border border-gold-royal/30 hover:bg-navy-royal flex items-center justify-center gap-1.5 transition-colors min-h-[46px]"
              >
                <Phone className="w-3.5 h-3.5 text-gold-royal flex-shrink-0" />
                <span className="truncate">Call 6380792722</span>
              </a>

              <a
                href="https://wa.me/9196380792722?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20know%20more%20about%20your%20holiday%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 flex items-center justify-center gap-1.5 transition-colors min-h-[46px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="text-center text-[10px] text-white/50 font-sans pt-1">
              Sulur, Coimbatore, Tamil Nadu, India • Mon - Sun 9:00 AM - 9:00 PM
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. DESKTOP / LAPTOP HEADER (Unchanged, 100% Preserved)   */}
      {/* ========================================================= */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isSolidNavbar
            ? 'bg-[#071D3A] border-b border-[#0B2A50] shadow-luxury-dark py-2 sm:py-3'
            : 'bg-gradient-to-b from-[#041329]/95 via-[#041329]/60 to-transparent py-2.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4 lg:gap-6 xl:gap-8 h-14 sm:h-16 lg:h-20">
            
            {/* LEFT: Official Brand Logo & Identity */}
            <div className="flex items-center flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal/70 rounded-xl"
                aria-label="Yazhi Holidays Homepage"
              >
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                  <img
                    src="/yazhi-logo.jpg"
                    alt="Yazhi Holidays Official Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                <div className="flex flex-col justify-center items-start text-left flex-shrink-0">
                  <span className="font-serif text-base min-[360px]:text-lg sm:text-xl lg:text-[22px] tracking-wide text-white font-semibold leading-tight group-hover:text-gold-light transition-colors duration-200 whitespace-nowrap">
                    Yazhi <span className="text-gold-royal">Holidays</span>
                  </span>
                  <span className="hidden sm:block text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-gold-light/85 font-sans font-medium leading-normal mt-0.5 whitespace-nowrap">
                    Your Journey, Our Passion
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER: Desktop Navigation Links */}
            <nav 
              className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 text-[13px] xl:text-sm font-medium tracking-wide"
              aria-label="Main Navigation"
            >
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

            {/* RIGHT: Desktop Actions */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-4">
              <a
                href="tel:6380792722"
                className="hidden 2xl:flex items-center gap-2 text-xs font-medium text-white hover:text-gold-royal transition-colors px-2 py-1 rounded"
                title="Call Yazhi Holidays"
              >
                <Phone className="w-3.5 h-3.5 text-gold-royal" />
                <span>6380792722</span>
              </a>

              <button
                onClick={onOpenSearch}
                aria-label="Search destinations and packages"
                className="p-2.5 text-white/80 hover:text-gold-royal hover:bg-navy-royal/50 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-gold-royal/50"
                title="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <Link
                to="/plan-trip"
                className="btn-primary hidden sm:inline-flex"
              >
                <Sparkles className="w-3.5 h-3.5 btn-no-move" />
                <span>Plan My Trip</span>
              </Link>

              <Link
                to="/admin/login"
                title="Concierge Portal"
                className="text-navy-secondary hover:text-gold-royal/70 p-1.5 transition-colors focus:outline-none rounded hidden md:block"
                aria-label="Staff Administration Login"
              >
                <ShieldCheck className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity" />
              </Link>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};