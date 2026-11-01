import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const trimmed = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 6000);
  };

  return (
    <footer className="bg-navy-midnight text-sand-ivory pt-16 pb-12 border-t border-navy-royal/60 relative overflow-hidden">
      {/* Subtle gold ambient top line glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold-royal/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Reassurance Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-navy-royal/40">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-navy-royal/50 flex items-center justify-center flex-shrink-0 text-gold-royal border border-gold-royal/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">100% Verified Partners</h4>
              <p className="text-xs text-sand-ivory/70">Hand-selected stays, certified chauffeurs, and licensed local guides.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-navy-royal/50 flex items-center justify-center flex-shrink-0 text-gold-royal border border-gold-royal/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Bespoke Pacing</h4>
              <p className="text-xs text-sand-ivory/70">Journeys tailored to your exact comfort, family rhythm, and travel style.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-navy-royal/50 flex items-center justify-center flex-shrink-0 text-gold-royal border border-gold-royal/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Dedicated Concierge</h4>
              <p className="text-xs text-sand-ivory/70">Direct WhatsApp support before, during, and after your departure.</p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* REDESIGNED LUXURY NEWSLETTER SECTION                      */}
        {/* ========================================================= */}
        <div className="mb-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#041329] via-[#082042] to-[#041329] border border-gold-royal/30 shadow-luxury-dark relative overflow-hidden">
          {/* Ambient decorative blur glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-royal/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gold-royal/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Column: Heading and Description */}
            <div className="max-w-xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-royal/60 border border-gold-royal/30 text-[10px] font-mono tracking-widest text-gold-light uppercase">
                <Sparkles className="w-3 h-3 text-gold-royal" />
                <span>CURATED TRAVEL DISPATCH</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                Join Our Travel Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-sand-ivory/80 leading-relaxed font-light">
                Receive seasonal domestic circuits, hidden hill retreat recommendations, and private travel stories from our specialists. Mindfully sent, zero spam.
              </p>
            </div>

            {/* Right Column: Input Field & Subscription CTA */}
            <div className="w-full lg:max-w-md">
              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter your email address..."
                      required
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-navy-royal/40 border border-gold-royal/30 rounded-xl text-white placeholder-sand-ivory/40 focus:outline-none focus:border-gold-royal focus:ring-1 focus:ring-gold-royal/50 transition-all shadow-inner font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary py-3 px-6 text-xs whitespace-nowrap shadow-md group flex-shrink-0 justify-center"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
                  </button>
                </div>

                {/* Validation Error Message */}
                {errorMessage && (
                  <p className="text-[11px] text-red-400 font-sans pl-1">
                    {errorMessage}
                  </p>
                )}

                {/* Verified Subscription Success Pill */}
                {subscribed && (
                  <div className="p-2.5 rounded-lg bg-gold-royal/15 border border-gold-royal/40 flex items-center gap-2 text-xs text-gold-light animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-gold-royal flex-shrink-0" />
                    <span>Thank you. You have been welcomed to Yazhi Curated Notes.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Info & Official Logo */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex-shrink-0">
                <img
                  src="/yazhi-logo.jpg"
                  alt="Yazhi Holidays Brand"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-white font-semibold group-hover:text-gold-light transition-colors">
                  Yazhi <span className="text-gold-royal">Holidays</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/80 font-sans font-medium">
                  Curated Travel & Bespoke Journeys
                </span>
              </div>
            </Link>

            <p className="text-sm text-sand-ivory/80 leading-relaxed max-w-sm">
              Rooted in the royal grace and strength of Tamil Nadu’s heritage emblem, Yazhi Holidays crafts discerning travel experiences across India’s most scenic destinations.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-sand-ivory/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-royal flex-shrink-0 mt-0.5" />
                <span>Sulur, Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-royal flex-shrink-0" />
                <a href="tel:6380792722" className="hover:text-gold-royal transition-colors font-medium">6380792722</a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/9196380792722?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20know%20more%20about%20your%20domestic%20holiday%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2.5 px-5"
              >
                <MessageCircle className="w-4 h-4 text-navy-midnight btn-no-move" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Domestic Destinations Column */}
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-4 flex items-center gap-2">
              <span>Destinations</span>
              <span className="w-6 h-px bg-gold-royal/60"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-ivory/75">
              <li><Link to="/destinations/ooty" className="hover:text-gold-royal transition-colors">Ooty & Nilgiri Hills</Link></li>
              <li><Link to="/destinations/kodaikanal" className="hover:text-gold-royal transition-colors">Kodaikanal</Link></li>
              <li><Link to="/destinations/munnar" className="hover:text-gold-royal transition-colors">Munnar & Alleppey</Link></li>
              <li><Link to="/destinations/coorg" className="hover:text-gold-royal transition-colors">Coorg (Kodagu)</Link></li>
              <li><Link to="/destinations/goa" className="hover:text-gold-royal transition-colors">Goa Coastal Serenity</Link></li>
              <li><Link to="/destinations/mysore" className="hover:text-gold-royal transition-colors">Mysore Palaces</Link></li>
              <li><Link to="/destinations/kashmir" className="hover:text-gold-royal transition-colors">Kashmir Valleys</Link></li>
              <li><Link to="/destinations/rameswaram-madurai-kanyakumari" className="hover:text-gold-royal transition-colors">Madurai & Rameswaram</Link></li>
              <li className="pt-1">
                <Link to="/destinations" className="text-gold-royal hover:underline font-semibold flex items-center gap-1">
                  <span>Explore All Indian Places</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Holiday Styles Column */}
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-4 flex items-center gap-2">
              <span>Holiday Styles</span>
              <span className="w-6 h-px bg-gold-royal/60"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-ivory/75">
              <li><Link to="/packages?type=Honeymoon" className="hover:text-gold-royal transition-colors">Honeymoon Escapes</Link></li>
              <li><Link to="/packages?type=Family" className="hover:text-gold-royal transition-colors">Family Holidays</Link></li>
              <li><Link to="/packages?type=Cultural" className="hover:text-gold-royal transition-colors">Heritage & Temple Circuits</Link></li>
              <li><Link to="/packages?type=Adventure" className="hover:text-gold-royal transition-colors">Hill Stations & Treks</Link></li>
              <li><Link to="/packages?type=Leisure" className="hover:text-gold-royal transition-colors">Backwaters & Slow Living</Link></li>
              <li><Link to="/plan-trip" className="text-gold-royal hover:underline font-semibold flex items-center gap-1 pt-1">
                <span>Custom Trip Planner</span>
                <ArrowRight className="w-3 h-3" />
              </Link></li>
            </ul>
          </div>

          {/* Travel Notes & Staff Portal */}
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-4 flex items-center gap-2">
              <span>Travel Notes</span>
              <span className="w-6 h-px bg-gold-royal/60"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-ivory/75">
              <li><Link to="/about" className="hover:text-gold-royal transition-colors">Our Philosophy & Team</Link></li>
              <li><Link to="/faq" className="hover:text-gold-royal transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-gold-royal transition-colors">Contact Concierge</Link></li>
              <li><Link to="/admin/login" className="hover:text-gold-royal transition-colors">Staff Portal Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-navy-royal/40 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-ivory/60 gap-4">
          <p>© {new Date().getFullYear()} Yazhi Holidays. All rights reserved. Crafted with discerning care.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gold-royal transition-colors">Privacy Policy</Link>
            <span className="text-navy-royal">•</span>
            <Link to="/terms" className="hover:text-gold-royal transition-colors">Terms of Service</Link>
            <span className="text-navy-royal">•</span>
            <Link to="/faq" className="hover:text-gold-royal transition-colors">Help & FAQs</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
