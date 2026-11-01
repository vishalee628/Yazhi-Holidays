import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'revealing' | 'expanding' | 'finished'>('revealing');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session or prefers reduced motion
    const alreadySeen = sessionStorage.getItem('yazhi_cinematic_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadySeen || prefersReducedMotion) {
      setPhase('finished');
      if (onComplete) onComplete();
      return;
    }

    // Show intro
    setIsVisible(true);

    // Phase 1 -> Phase 2 after 1100ms
    const timer1 = setTimeout(() => {
      setPhase('expanding');
    }, 1100);

    // Phase 2 -> Finished after 2100ms total
    const timer2 = setTimeout(() => {
      finishIntro();
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const finishIntro = () => {
    sessionStorage.setItem('yazhi_cinematic_intro_seen', 'true');
    setPhase('finished');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (phase === 'finished' || !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-navy-midnight overflow-hidden transition-opacity duration-700 pointer-events-auto ${
        phase === 'expanding' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Welcome to Yazhi Holidays"
      role="dialog"
    >
      {/* Golden Light Sweep Beam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-gold-royal/15 to-transparent transform -skew-x-12 animate-light-sweep" />
      </div>

      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gold-royal/10 blur-[120px] pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={finishIntro}
        className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-gold-light/80 hover:text-white border border-gold-royal/30 hover:border-gold-royal bg-navy-primary/60 backdrop-blur-md transition-all flex items-center gap-1.5"
      >
        <span>SKIP</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Centerpiece: Yazhi Brand Emblem & Flight Path Ring */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Flight Path Ring around Logo */}
        <div className="relative flex items-center justify-center">
          {/* Outer expanding ring */}
          <div
            className={`absolute -inset-4 sm:-inset-6 rounded-full border border-gold-royal/40 transition-transform duration-1000 ease-out ${
              phase === 'expanding' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* SVG Flight Path Orbit with gold plane dot */}
          <svg
            className="w-32 h-32 sm:w-40 sm:h-40 animate-spin-slow pointer-events-none"
            viewBox="0 0 160 160"
            fill="none"
          >
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="url(#introGoldGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="opacity-70"
            />
            {/* Golden flight path tracer */}
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="url(#introGoldSolid)"
              strokeWidth="2.5"
              strokeDasharray="90 380"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="introGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F5B82E" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#DDA52A" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="introGoldSolid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F5B82E" />
                <stop offset="100%" stopColor="#DDA52A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Yazhi Official Logo with Metallic Glow */}
          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold-royal/80 shadow-[0_0_35px_rgba(245,184,46,0.45)] bg-navy-midnight flex items-center justify-center p-1.5 transition-all">
            <img
              src="/yazhi-logo.jpg"
              alt="Yazhi Holidays"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
        </div>

        {/* Brand Text Reveal */}
        <div className="mt-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-royal/60 border border-gold-royal/30 text-[10px] font-mono tracking-widest text-gold-light uppercase">
            <Sparkles className="w-3 h-3 text-gold-royal" />
            <span>The Yazhi Journey</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-wide">
            Every journey begins with a dream.
          </h2>

          <p className="text-xs text-sand-ivory/70 tracking-widest uppercase font-mono">
            Yazhi Holidays • Handcrafted Luxury Journeys
          </p>
        </div>
      </div>
    </div>
  );
};
