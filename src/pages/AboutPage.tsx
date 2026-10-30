import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, HeartHandshake, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      
      {/* Brand Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR STORY & PHILOSOPHY</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Crafting Journeys That Resonate Beyond the Horizon
          </h1>
          <p className="text-base sm:text-lg text-slate-muted mt-4 font-light leading-relaxed">
            Yazhi Holidays was founded on a simple conviction: true travel is neither a frantic race through landmarks nor an off-the-shelf itinerary. It is an art form—thoughtfully paced, deeply human, and distinctively memorable.
          </p>
        </div>
      </section>

      {/* Brand Identity & Official Logo Section */}
      <section className="bg-navy-midnight text-white py-24 border-y border-navy-royal/60 mb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Official Logo Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl p-1 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow flex items-center justify-center">
                <img
                  src="/yazhi-logo.jpg"
                  alt="Official Yazhi Holidays Logo"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
            </div>

            {/* Right: Meaning behind the Yazhi Emblem */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-royal">
                THE SYMBOLISM OF YAZHI
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-snug">
                The Royal Guardian of South Indian Architecture, Redesigned for Global Voyage
              </h2>
              <p className="text-sm sm:text-base text-sand-ivory/85 font-light leading-relaxed">
                In classical Dravidian architecture across Tamil Nadu, the <em>Yazhi</em> (யாழி) stands guard at the threshold of majestic temples. A mythical creature possessing the courage of a lion, the grace of an elephant, and the swiftness of a steed, the Yazhi represents supreme protection, noble poise, and boundless strength.
              </p>
              <p className="text-sm sm:text-base text-sand-ivory/80 font-light leading-relaxed">
                In our official brand identity, the metallic gold Yazhi is framed inside a celestial travel ring traversed by a modern golden airplane. It symbolizes safe, protected passage across continents while staying deeply rooted in the welcoming warmth of South Indian hospitality.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-gold-light font-mono">
                <span>Deep Navy: Trust & Ocean depths</span>
                <span>•</span>
                <span>Royal Gold: Warmth & Luxury</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Planning Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
            OUR 4-STAGE CRAFT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
            How We Sculpt Your Itinerary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Listen & Discover',
              desc: 'We start by understanding your personal travel rhythm—whether you crave spontaneous discovery, gentle morning lie-ins, or adrenaline-fueled peaks.'
            },
            {
              step: '02',
              title: 'Curate & Detail',
              desc: 'Our destination specialists map seamless routes, select boutique stays, and coordinate verified private chauffeurs and local storytellers.'
            },
            {
              step: '03',
              title: 'Refine & Reassure',
              desc: 'We share transparent day-by-day blueprints with all inclusions in INR. We adjust every detail until it matches your exact expectations.'
            },
            {
              step: '04',
              title: 'Care on the Ground',
              desc: 'From the minute you step into the airport to your final journey home, our dedicated WhatsApp concierge team remains by your side 24/7.'
            }
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl p-6 border border-sand-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-gold-royal block mb-3">{item.step}</span>
                <h3 className="font-serif text-xl font-semibold text-navy-primary mb-2">{item.title}</h3>
                <p className="text-xs text-slate-muted leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitments & CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center bg-white rounded-3xl p-10 sm:p-14 border border-sand-border shadow-luxury">
        <h3 className="font-serif text-3xl sm:text-4xl text-navy-primary font-semibold mb-4">
          Ready to Begin Your Story?
        </h3>
        <p className="text-sm text-slate-muted max-w-xl mx-auto mb-8 font-light">
          Let’s discuss your next journey over a conversation. No automated bots, no high-pressure sales pitches—just thoughtful travel guidance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/plan-trip"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 transition-all shadow-gold-glow"
          >
            Design Your Trip
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-primary border border-sand-border hover:bg-sand-card transition-colors"
          >
            Contact Our Concierge
          </Link>
        </div>
      </section>

    </div>
  );
};
