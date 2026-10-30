import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Package, ArrowRight, Tag } from 'lucide-react';
import { DESTINATIONS, PACKAGES } from '../data/travelData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredDestinations = trimmed
    ? DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(trimmed) ||
        d.country.toLowerCase().includes(trimmed) ||
        d.tagline.toLowerCase().includes(trimmed) ||
        d.region.toLowerCase().includes(trimmed)
      )
    : DESTINATIONS.slice(0, 4);

  const filteredPackages = trimmed
    ? PACKAGES.filter(p =>
        p.title.toLowerCase().includes(trimmed) ||
        p.destinationName.toLowerCase().includes(trimmed) ||
        p.tripType.toLowerCase().includes(trimmed) ||
        p.overview.toLowerCase().includes(trimmed)
      )
    : PACKAGES.slice(0, 3);

  const handleSelectDestination = (slug: string) => {
    onClose();
    navigate(`/destinations/${slug}`);
  };

  const handleSelectPackage = (slug: string) => {
    onClose();
    navigate(`/packages/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-midnight/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8 animate-fadeIn">
      <div 
        className="bg-sand-ivory w-full max-w-2xl rounded-2xl shadow-luxury-dark border border-sand-border overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-sand-border bg-white">
          <Search className="w-5 h-5 text-gold-metallic mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, packages (e.g. Bali, Switzerland, Honeymoon)..."
            className="w-full text-base bg-transparent text-navy-primary placeholder-slate-muted focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-muted hover:text-navy-primary rounded-full hover:bg-sand-card transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          
          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-muted uppercase tracking-wider">Quick:</span>
            {['Kerala', 'Bali', 'Switzerland', 'Dubai', 'Honeymoon', 'Family'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-xs px-2.5 py-1 rounded-full bg-sand-card text-navy-primary hover:bg-gold-light/40 border border-sand-border transition-colors flex items-center gap-1"
              >
                <Tag className="w-3 h-3 text-gold-metallic" />
                <span>{term}</span>
              </button>
            ))}
          </div>

          {/* Destinations Category */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-muted flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-royal" />
                <span>Destinations ({filteredDestinations.length})</span>
              </h4>
            </div>

            {filteredDestinations.length === 0 ? (
              <p className="text-xs text-slate-muted italic py-1">No matching destinations found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectDestination(dest.slug)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-sand-card border border-sand-border cursor-pointer transition-all hover:border-gold-royal/50 group"
                  >
                    <img
                      src={dest.thumbnail}
                      alt={dest.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-serif text-base font-semibold text-navy-primary group-hover:text-gold-metallic truncate">
                          {dest.name}
                        </h5>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-gold-royal font-semibold">
                          {dest.region}
                        </span>
                      </div>
                      <p className="text-xs text-slate-muted truncate">{dest.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Packages Category */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-muted flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-gold-royal" />
                <span>Holiday Packages ({filteredPackages.length})</span>
              </h4>
            </div>

            {filteredPackages.length === 0 ? (
              <p className="text-xs text-slate-muted italic py-1">No matching holiday packages found.</p>
            ) : (
              <div className="space-y-2.5">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleSelectPackage(pkg.slug)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-sand-card border border-sand-border cursor-pointer transition-all hover:border-gold-royal/50 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={pkg.thumbnail}
                        alt={pkg.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="font-serif text-base font-semibold text-navy-primary group-hover:text-gold-metallic truncate">
                          {pkg.title}
                        </h5>
                        <p className="text-xs text-slate-muted truncate">
                          {pkg.destinationName} • {pkg.durationLabel} • <span className="text-gold-royal font-medium">{pkg.tripType}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-3">
                      <span className="text-[11px] text-slate-muted block">From</span>
                      <span className="text-sm font-bold text-navy-primary font-mono">₹{pkg.startingPriceINR.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Hint */}
        <div className="px-6 py-3 bg-sand-card border-t border-sand-border flex items-center justify-between text-xs text-slate-muted">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-sand-border text-navy-primary">ESC</kbd> to close</span>
          <button
            onClick={() => {
              onClose();
              navigate('/destinations');
            }}
            className="text-navy-primary hover:text-gold-metallic font-semibold flex items-center gap-1"
          >
            <span>Browse All Curations</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
