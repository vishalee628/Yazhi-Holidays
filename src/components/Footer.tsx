import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-navy-midnight text-sand-ivory pt-16 pb-12 border-t border-navy-royal/60 relative overflow-hidden">
      {/* Subtle gold ambient glow */}
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

        {/* Main Footer Content */}
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
              Rooted in the royal grace and strength of Tamil Nadu’s heritage emblem, Yazhi Holidays crafts discerning travel experiences across India and the globe.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-sand-ivory/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-royal flex-shrink-0 mt-0.5" />
                <span>Anna Nagar, Chennai, Tamil Nadu, India — 600040</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-royal flex-shrink-0" />
                <a href="tel:+919840012345" className="hover:text-gold-royal transition-colors">+91 98400 12345</a>
                <span className="text-slate-muted">/</span>
                <a href="tel:+919444054321" className="hover:text-gold-royal transition-colors">+91 94440 54321</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-royal flex-shrink-0" />
                <a href="mailto:concierge@yazhiholidays.com" className="hover:text-gold-royal transition-colors">concierge@yazhiholidays.com</a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20inquire%20about%20a%20holiday%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal hover:brightness-110 shadow-gold-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-navy-midnight" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Destinations Column */}
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-4 flex items-center gap-2">
              <span>Destinations</span>
              <span className="w-6 h-px bg-gold-royal/60"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-ivory/75">
              <li><Link to="/destinations/bali" className="hover:text-gold-royal transition-colors">Bali, Indonesia</Link></li>
              <li><Link to="/destinations/switzerland" className="hover:text-gold-royal transition-colors">Switzerland</Link></li>
              <li><Link to="/destinations/kerala" className="hover:text-gold-royal transition-colors">Kerala Backwaters</Link></li>
              <li><Link to="/destinations/dubai" className="hover:text-gold-royal transition-colors">Dubai & UAE</Link></li>
              <li><Link to="/destinations/maldives" className="hover:text-gold-royal transition-colors">Maldives Overwater</Link></li>
              <li><Link to="/destinations/thailand" className="hover:text-gold-royal transition-colors">Thailand Karsts & Temples</Link></li>
              <li><Link to="/destinations/kashmir" className="hover:text-gold-royal transition-colors">Kashmir Valleys</Link></li>
              <li className="pt-1">
                <Link to="/destinations" className="text-gold-royal hover:underline font-semibold flex items-center gap-1">
                  <span>Explore All Places</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Package Categories */}
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-4 flex items-center gap-2">
              <span>Holiday Styles</span>
              <span className="w-6 h-px bg-gold-royal/60"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-ivory/75">
              <li><Link to="/packages?type=Honeymoon" className="hover:text-gold-royal transition-colors">Honeymoon Escapes</Link></li>
              <li><Link to="/packages?type=Family" className="hover:text-gold-royal transition-colors">Family Holidays</Link></li>
              <li><Link to="/packages?region=International" className="hover:text-gold-royal transition-colors">International Tours</Link></li>
              <li><Link to="/packages?region=Domestic" className="hover:text-gold-royal transition-colors">Domestic Journeys</Link></li>
              <li><Link to="/packages?type=Adventure" className="hover:text-gold-royal transition-colors">Adventure & Safaris</Link></li>
              <li><Link to="/packages?type=Cultural" className="hover:text-gold-royal transition-colors">Heritage & Culture</Link></li>
              <li><Link to="/plan-trip" className="text-gold-royal hover:underline font-semibold flex items-center gap-1 pt-1">
                <span>Custom Trip Planner</span>
                <ArrowRight className="w-3 h-3" />
              </Link></li>
            </ul>
          </div>

          {/* Company & Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-4 flex items-center gap-2">
              <span>Travel Notes</span>
              <span className="w-6 h-px bg-gold-royal/60"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-ivory/75 mb-5">
              <li><Link to="/about" className="hover:text-gold-royal transition-colors">Our Philosophy & Team</Link></li>
              <li><Link to="/travel-journal" className="hover:text-gold-royal transition-colors">Travel Journal / Blog</Link></li>
              <li><Link to="/faq" className="hover:text-gold-royal transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-gold-royal transition-colors">Contact Concierge</Link></li>
              <li><Link to="/admin/login" className="hover:text-gold-royal transition-colors">Staff Portal Login</Link></li>
            </ul>

            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-1.5">Join Our Travel Dispatch</span>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-xs bg-navy-royal/50 border border-navy-royal rounded text-white placeholder-sand-ivory/40 focus:outline-none focus:border-gold-royal"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-gold-royal text-navy-midnight rounded text-xs font-medium hover:bg-gold-light transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] text-gold-royal flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Thank you. Welcome to Yazhi Curated Notes.</span>
                  </p>
                )}
              </form>
            </div>
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
