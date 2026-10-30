import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-midnight text-white flex items-center justify-center p-4 pt-20 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-gold-royal/10 pointer-events-none"></div>

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-full mx-auto p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow">
          <img src="/yazhi-logo.jpg" alt="Yazhi Holidays" className="w-full h-full object-cover rounded-full" />
        </div>

        <span className="text-xs font-mono tracking-widest text-gold-royal uppercase block">
          404 — OFF THE MAP
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal">
          A Trail Less Traveled
        </h1>

        <p className="text-sm text-sand-ivory/80 leading-relaxed font-light">
          The page or destination you are seeking cannot be found. Allow our compass to guide you back to our curated journeys.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/destinations"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-sand-ivory border border-gold-royal/30 hover:bg-navy-royal/40"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};
