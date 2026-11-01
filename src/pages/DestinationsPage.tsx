import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Search, RotateCcw, ArrowRight, Sparkles, ChevronRight, Compass, Globe, Mountain } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import { TripType } from '../types';

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

  const isFilteringActive = searchTerm || selectedRegion !== 'All' || selectedType !== 'All' || sortBy !== 'featured';


  return (
    <div className="min-h-screen bg-sand-ivory pt-32 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* PAGE EDITORIAL HEADER (Never obstructed by navbar)        */}
        {/* ========================================================= */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-4 shadow-sm border border-gold-royal/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE YAZHI COMPASS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Discover Your Next Destination
          </h1>

          <p className="text-base sm:text-lg text-slate-muted mt-4 font-light leading-relaxed">
            From the tranquil backwaters of Kerala and the misty slopes of Ooty to the majestic snow-capped peaks of Kashmir and the royal palaces of Rajasthan, explore our hand-curated collection of Indian domestic journeys. Each destination is paced with mindful care, premium coaches, and verified boutique stays.
          </p>
        </div>

        {/* ========================================================= */}
        {/* DOMESTIC SEGMENTATION TABS & QUICK CONTROLS               */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setSelectedType('All')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedType === 'All'
                ? 'bg-navy-midnight text-gold-royal shadow-sm'
                : 'bg-white text-slate-body border border-sand-border hover:bg-sand-card'
            }`}
          >
            <Compass className="w-4 h-4 text-gold-metallic" />
            <span>All Destinations ({DESTINATIONS.length})</span>
          </button>

          <button
            onClick={() => setSelectedType('Leisure')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedType === 'Leisure'
                ? 'bg-navy-midnight text-gold-royal shadow-sm'
                : 'bg-white text-slate-body border border-sand-border hover:bg-sand-card'
            }`}
          >
            <Mountain className="w-4 h-4 text-gold-metallic" />
            <span>Hill Stations & Leisure ({DESTINATIONS.filter(d => d.categories.includes('Leisure')).length})</span>
          </button>

          <button
            onClick={() => setSelectedType('Cultural')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedType === 'Cultural'
                ? 'bg-navy-midnight text-gold-royal shadow-sm'
                : 'bg-white text-slate-body border border-sand-border hover:bg-sand-card'
            }`}
          >
            <Sparkles className="w-4 h-4 text-gold-metallic" />
            <span>Heritage & Cultural ({DESTINATIONS.filter(d => d.categories.includes('Cultural')).length})</span>
          </button>

          <button
            onClick={() => setSelectedType('Honeymoon')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedType === 'Honeymoon'
                ? 'bg-navy-midnight text-gold-royal shadow-sm'
                : 'bg-white text-slate-body border border-sand-border hover:bg-sand-card'
            }`}
          >
            <Compass className="w-4 h-4 text-gold-metallic" />
            <span>Romantic & Honeymoon ({DESTINATIONS.filter(d => d.categories.includes('Honeymoon')).length})</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* SEARCH & FILTER CONTROLS BAR                              */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-sand-border mb-12 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destination, country, highlights..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>

            {/* Travel Style Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
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
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="featured">Sort by: Curated & Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Active filter counter & reset button */}
          <div className="flex items-center justify-between pt-3 border-t border-sand-border text-xs text-slate-muted">
            <span>
              Showing <strong className="text-navy-primary font-semibold">{filteredDestinations.length}</strong> of {DESTINATIONS.length} curated destinations
            </span>
            {isFilteringActive && (
              <button
                onClick={handleResetFilters}
                className="text-gold-metallic hover:underline font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

        </div>

        {/* ========================================================= */}
        {/* DESTINATIONS CONTENT & ASYMMETRIC EDITORIAL LAYOUT        */}
        {/* ========================================================= */}

        {filteredDestinations.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-sand-border p-8 shadow-sm">
            <MapPin className="w-12 h-12 text-slate-muted/40 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-navy-primary font-semibold">No destinations matched your criteria</h3>
            <p className="text-sm text-slate-muted mt-2 max-w-md mx-auto font-light">
              Try adjusting your search query or reset your style filters to explore all locations.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : !isFilteringActive ? (
          /* Asymmetrical Editorial Showcase (Default view) */
          <div className="space-y-12">
            
            {/* Row 1: 1 Large Featured Destination + 2 Medium Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Large Featured Panel (Cols 1-7) */}
              <div className="lg:col-span-7">
                <Link
                  to={`/destinations/${filteredDestinations[0].slug}`}
                  className="group relative block h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-luxury destination-card"
                >
                  <img
                    src={filteredDestinations[0].heroImage}
                    alt={filteredDestinations[0].name}
                    className="w-full h-full object-cover destination-card-img brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/40 to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-gold-royal text-navy-midnight font-bold shadow-sm">
                      Curated Spotlight
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-navy-midnight/80 text-sand-ivory border border-gold-royal/30 backdrop-blur-md">
                      {filteredDestinations[0].region}
                    </span>
                  </div>

                  {/* Content at Bottom */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gold-royal font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{filteredDestinations[0].country}</span>
                      <span>•</span>
                      <span>{filteredDestinations[0].duration}</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium group-hover:text-gold-light transition-colors">
                      {filteredDestinations[0].name}
                    </h2>

                    <p className="text-sm text-sand-ivory/85 line-clamp-2 max-w-xl font-light">
                      {filteredDestinations[0].description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <div>
                        <span className="text-[10px] text-sand-ivory/70 block uppercase font-mono">Starting From</span>
                        <span className="text-lg font-bold text-gold-royal font-mono">
                          ₹{filteredDestinations[0].startingPriceINR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-sand-ivory/80 ml-1">/ person</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-royal group-hover:text-gold-light">
                        <span>Discover Route</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 2 Medium Panels (Cols 8-12) */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {filteredDestinations.slice(1, 3).map((dest) => (
                  <Link
                    key={dest.id}
                    to={`/destinations/${dest.slug}`}
                    className="group relative block h-[255px] rounded-3xl overflow-hidden shadow-luxury destination-card"
                  >
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover destination-card-img brightness-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/40 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/80 text-gold-light border border-gold-royal/30 backdrop-blur-md">
                        {dest.region}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
                      <div className="text-[11px] text-gold-royal font-mono flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{dest.country}</span>
                        <span>•</span>
                        <span>{dest.duration}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-white font-medium group-hover:text-gold-light transition-colors">
                        {dest.name}
                      </h3>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <span className="text-sand-ivory/80">
                          From <strong className="text-gold-royal font-mono">₹{dest.startingPriceINR.toLocaleString('en-IN')}</strong>
                        </span>
                        <span className="text-gold-royal group-hover:underline font-semibold flex items-center gap-1 text-xs">
                          <span>Explore</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>

            {/* Row 2: Balanced Editorial Grid for Remaining Destinations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                  More Inspiring Horizons
                </h3>
                <span className="text-xs text-slate-muted">Handcrafted with private transit & verified stays</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDestinations.slice(3).map((dest) => (
                  <Link
                    key={dest.id}
                    to={`/destinations/${dest.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-border flex flex-col destination-card card-lift"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.thumbnail}
                        alt={dest.name}
                        className="w-full h-full object-cover destination-card-img"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                          {dest.region}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono text-slate-muted block mb-1">
                          {dest.country} • {dest.duration}
                        </span>
                        <h4 className="font-serif text-xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors">
                          {dest.name}
                        </h4>
                        <p className="text-xs text-slate-muted mt-2 line-clamp-2 leading-relaxed font-light">
                          {dest.tagline}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-muted block font-mono">From</span>
                          <span className="text-sm font-bold text-navy-primary font-mono">
                            ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-navy-primary group-hover:text-gold-metallic flex items-center gap-1">
                          <span>View</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gold-royal" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Filtered Results Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-luxury border border-sand-border flex flex-col destination-card card-lift"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover destination-card-img brightness-[0.9]"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                      {dest.region}
                    </span>
                    {dest.featured && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-gold-royal text-navy-midnight font-bold">
                        Curated
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-muted font-mono mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-metallic" />
                      <span>{dest.country}</span>
                      <span>•</span>
                      <span>{dest.duration}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors">
                      {dest.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-muted mt-2 line-clamp-2 leading-relaxed font-light">
                      {dest.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {dest.categories.map((c) => (
                        <span key={c} className="text-[10px] px-2.5 py-0.5 rounded bg-sand-card text-slate-body font-mono">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-sand-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-muted block font-mono">Starting From</span>
                      <span className="text-base font-bold text-navy-primary font-mono">
                        ₹{dest.startingPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-muted ml-1">/ person</span>
                    </div>

                    <span className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal group-hover:brightness-110 transition-all flex items-center gap-1">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
