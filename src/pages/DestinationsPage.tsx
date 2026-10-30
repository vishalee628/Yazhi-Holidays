import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Search, Filter, RotateCcw, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import { RegionType, TripType } from '../types';

export const DestinationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryParam = searchParams.get('query') || '';
  const regionParam = searchParams.get('region') || 'All';
  const typeParam = searchParams.get('type') || 'All';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam);
  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // Search term
      const matchesSearch = 
        !searchTerm.trim() ||
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchTerm.toLowerCase());

      // Region filter
      const matchesRegion =
        selectedRegion === 'All' || dest.region === selectedRegion;

      // Type filter
      const matchesType =
        selectedType === 'All' || dest.categories.includes(selectedType as TripType);

      return matchesSearch && matchesRegion && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPriceINR - b.startingPriceINR;
      if (sortBy === 'price-desc') return b.startingPriceINR - a.startingPriceINR;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchTerm, selectedRegion, selectedType, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All');
    setSelectedType('All');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Editorial Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE YAZHI COMPASS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Explore Destinations
          </h1>
          <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
            From the tranquil backwaters of South India to the majestic heights of the Swiss Alps, explore handpicked destinations crafted for discerning travelers.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-border mb-10 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-muted absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destination, country..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="All">All Regions (Domestic & Intl)</option>
                <option value="Domestic">Domestic Tours (India)</option>
                <option value="International">International Destinations</option>
              </select>
            </div>

            {/* Trip Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="All">All Travel Styles</option>
                <option value="Honeymoon">Honeymoon & Romantic</option>
                <option value="Family">Family Holidays</option>
                <option value="Cultural">Cultural & Heritage</option>
                <option value="Adventure">Adventure & Expeditions</option>
                <option value="Leisure">Slow Living & Leisure</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="featured">Sort by: Curated & Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Active filter count & Reset */}
          <div className="flex items-center justify-between pt-3 border-t border-sand-border text-xs text-slate-muted">
            <span>
              Showing <strong className="text-navy-primary font-semibold">{filteredDestinations.length}</strong> of {DESTINATIONS.length} curated destinations
            </span>
            {(searchTerm || selectedRegion !== 'All' || selectedType !== 'All' || sortBy !== 'featured') && (
              <button
                onClick={handleResetFilters}
                className="text-gold-metallic hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Destinations Result Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand-border p-8">
            <MapPin className="w-12 h-12 text-slate-muted/40 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-navy-primary font-semibold">No destinations matched your criteria</h3>
            <p className="text-sm text-slate-muted mt-2 max-w-md mx-auto">
              Try adjusting your search terms or clearing the region/style filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div 
                key={dest.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border flex flex-col destination-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover destination-card-img brightness-[0.9]"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                      {dest.region}
                    </span>
                    {dest.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-gold-royal text-navy-midnight font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-muted font-mono mb-1">
                      <MapPin className="w-3 h-3 text-gold-metallic" />
                      <span>{dest.country}</span>
                      <span>•</span>
                      <span>{dest.duration}</span>
                    </div>

                    <Link to={`/destinations/${dest.slug}`}>
                      <h2 className="font-serif text-2xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors">
                        {dest.name}
                      </h2>
                    </Link>

                    <p className="text-xs text-slate-muted mt-2 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {dest.categories.map((c) => (
                        <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-sand-card text-slate-body font-mono">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-sand-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-muted block font-mono">Starting From</span>
                      <span className="text-base font-bold text-navy-primary font-mono">
                        ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-muted ml-1">/ person</span>
                    </div>

                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal hover:brightness-110 transition-all flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
