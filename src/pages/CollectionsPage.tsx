import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/travelData';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED TRAVEL COLLECTIONS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Journeys Grouped by Feeling
          </h1>
          <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
            Every holiday serves a distinct emotional need. Explore our curated collections designed for couples, multigenerational families, nature seekers, and slow travelers.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-luxury border border-sand-border flex flex-col destination-card"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover destination-card-img brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-gold-royal text-navy-midnight font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs font-mono text-gold-light uppercase tracking-wider block mb-1">
                    {col.subtitle}
                  </span>
                  <h2 className="font-serif text-3xl font-medium text-white group-hover:text-gold-light transition-colors">
                    {col.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-muted leading-relaxed font-light mb-6">
                  {col.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-sand-border">
                  <span className="text-xs font-mono text-slate-muted uppercase">Category: {col.category}</span>
                  <Link
                    to={`/packages?type=${col.category}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-primary hover:text-gold-metallic group-hover:translate-x-1 transition-all"
                  >
                    <span>Browse Collection Packages</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-royal" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
