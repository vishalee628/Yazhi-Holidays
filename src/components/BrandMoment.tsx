import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrandMoment: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const destinationPoints = [
    { name: 'Ooty', angle: '0deg', translate: 'translate(130px, 0px)' },
    { name: 'Munnar', angle: '60deg', translate: 'translate(65px, 112px)' },
    { name: 'Kodaikanal', angle: '120deg', translate: 'translate(-65px, 112px)' },
    { name: 'Sulur / HQ', angle: '180deg', translate: 'translate(-130px, 0px)' },
    { name: 'Goa', angle: '240deg', translate: 'translate(-65px, -112px)' },
    { name: 'Kashmir', angle: '300deg', translate: 'translate(65px, -112px)' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-navy-midnight overflow-hidden border-y border-gold-royal/20"
      aria-label="The Yazhi Journey Brand Moment"
    >
      {/* Background radial gradient & ambient stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-royal/40 via-navy-midnight to-navy-midnight pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-royal/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Interactive Gold Orbital Flight Path around Yazhi Logo */}
          <div className="lg:col-span-6 flex items-center justify-center overflow-visible py-4">
            
            <div className="relative w-64 h-64 min-[390px]:w-72 min-[390px]:h-72 sm:w-80 sm:h-80 flex items-center justify-center scale-[0.82] min-[360px]:scale-90 min-[375px]:scale-95 sm:scale-100 origin-center transition-transform">
              
              {/* Outer Decorative Gold Boundary Orbit */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                viewBox="0 0 320 320"
              >
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  stroke="#F5B82E"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                  className="opacity-40"
                />

                {/* Animated Gold Flight Path Curve drawing around logo */}
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  stroke="url(#brandGoldSolid)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="880"
                  strokeDashoffset={isInView ? '0' : '880'}
                  style={{
                    transition: 'stroke-dashoffset 2.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: 'drop-shadow(0 0 10px rgba(245, 184, 46, 0.6))'
                  }}
                  strokeLinecap="round"
                />

                {/* Inner counter-rotating subtle orbit */}
                <circle
                  cx="160"
                  cy="160"
                  r="105"
                  stroke="#F5B82E"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  className="opacity-25 animate-spin-slow"
                />

                <defs>
                  <linearGradient id="brandGoldSolid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#F5B82E" />
                    <stop offset="100%" stopColor="#DDA52A" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Destination labels positioned along the orbital circumference */}
              {destinationPoints.map((pt, idx) => (
                <div
                  key={pt.name}
                  className={`absolute flex items-center justify-center transition-all duration-700 ${
                    isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: pt.translate,
                    transitionDelay: `${300 + idx * 150}ms`
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-royal border border-white block shadow-[0_0_8px_#F5B82E]" />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-navy-primary/90 border border-gold-royal/40 text-[10px] font-mono text-sand-ivory whitespace-nowrap shadow-md pointer-events-none group-hover:scale-110 transition-transform">
                      {pt.name}
                    </span>
                  </div>
                </div>
              ))}

              {/* Centerpiece: Original Yazhi Holidays Logo with Restrained Metallic Aura */}
              <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-2 bg-navy-midnight border-2 border-gold-royal/80 shadow-[0_0_40px_rgba(245,184,46,0.35)] flex items-center justify-center transition-transform hover:scale-105 duration-500">
                <img
                  src="/yazhi-logo.jpg"
                  alt="Yazhi Holidays Official Emblem"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

            </div>

          </div>

          {/* Right Column: Narrative Brand Statement */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-royal/60 border border-gold-royal/30 text-[11px] font-mono tracking-widest text-gold-light uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-royal" />
              <span>THE YAZHI PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              Every Journey <br className="hidden sm:block" />
              <span className="italic font-light text-gold-light">Has a Story.</span>
            </h2>

            <p className="text-base sm:text-lg text-sand-ivory/85 font-light leading-relaxed max-w-xl">
              Let Yazhi Holidays help you discover yours.
            </p>

            <p className="text-xs sm:text-sm text-sand-ivory/70 leading-relaxed font-light max-w-xl">
              Inspired by the mythical Yazhi—a timeless South Indian emblem of grace, courage, and protection—every holiday we craft is infused with heartfelt hospitality, thoughtful pacing, and uncompromising travel standards.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <Link
                to="/plan-trip"
                className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 text-center"
              >
                <span>Plan Your Trip</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </Link>

              <Link
                to="/about"
                className="btn-secondary-dark w-full sm:w-auto px-6 sm:px-7 py-3.5 text-center"
              >
                <span>Read Our Heritage</span>
                <ArrowRight className="w-3.5 h-3.5 btn-arrow text-gold-royal" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
