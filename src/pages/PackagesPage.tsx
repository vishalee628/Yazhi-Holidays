import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Search, Filter, RotateCcw, CheckCircle2, ChevronRight, Sparkles, Clock, MapPin } from 'lucide-react';
import { PACKAGES } from '../data/travelData';
import { TripType, RegionType } from '../types';
import { EnquiryModal } from '../components/EnquiryModal';

export const PackagesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get('type') || 'All';
  const regionParam = searchParams.get('region') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>(typeParam);
  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedPackageForEnquiry, setSelectedPackageForEnquiry] = useState<{ slug: string; title: string } | null>(null);

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesSearch =
        !searchTerm.trim() ||
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.overview.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === 'All' || pkg.tripType === selectedType;

      const matchesRegion =
        selectedRegion === 'All' || pkg.region === selectedRegion;

      return matchesSearch && matchesType && matchesRegion;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPriceINR - b.startingPriceINR;
      if (sortBy === 'price-desc') return b.startingPriceINR - a.startingPriceINR;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchTerm, selectedType, selectedRegion, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedRegion('All');
    setSortBy('featured');
    setSearchParams({});
  };

  const handleOpenEnquiry = (slug: string, title: string) => {
    setSelectedPackageForEnquiry({ slug, title });
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HANDCRAFTED ITINERARIES</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Curated Holiday Packages
          </h1>
          <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
            Each holiday is an artfully planned voyage. Transparent pricing in INR, hand-selected stays, verified private transport, and personal concierge guidance.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-border mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-muted absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search packages (e.g. Bali, Swiss, Kerala)..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>

            {/* Trip Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-ivory border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                <option value="All">All Trip Styles</option>
                <option value="Honeymoon">Honeymoon & Romantic</option>
                <option value="Family">Family Holidays</option>
                <option value="Cultural">Cultural & Heritage</option>
                <option value="Adventure">Adventure & Expeditions</option>
              </select>
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
                <option value="International">International Packages</option>
              </select>
            </div>

            {/* Sort */}
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

          <div className="flex items-center justify-between pt-3 border-t border-sand-border text-xs text-slate-muted">
            <span>
              Showing <strong className="text-navy-primary font-semibold">{filteredPackages.length}</strong> holiday packages
            </span>
            {(searchTerm || selectedType !== 'All' || selectedRegion !== 'All' || sortBy !== 'featured') && (
              <button
                onClick={handleResetFilters}
                className="text-gold-metallic hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand-border p-8">
            <Package className="w-12 h-12 text-slate-muted/40 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-navy-primary font-semibold">No packages matched your filter</h3>
            <p className="text-sm text-slate-muted mt-2 max-w-md mx-auto">
              Please try adjusting your search terms or clearing your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border flex flex-col sm:flex-row group transition-all hover:border-gold-royal/50"
              >
                <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover destination-card-img"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                      {pkg.tripType}
                    </span>
                  </div>
                </div>

                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-muted mb-1 font-mono">
                      <span>{pkg.destinationName}</span>
                      <span className="text-gold-metallic font-semibold">{pkg.durationLabel}</span>
                    </div>

                    <Link to={`/packages/${pkg.slug}`}>
                      <h2 className="font-serif text-2xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors leading-snug">
                        {pkg.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-slate-muted mt-2 line-clamp-2 leading-relaxed">
                      {pkg.overview}
                    </p>

                    <div className="mt-4 pt-3 border-t border-sand-border space-y-1.5">
                      {pkg.inclusions.slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-body">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-royal flex-shrink-0 mt-0.5" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-muted uppercase font-mono block">From</span>
                      <span className="text-base font-bold text-navy-primary font-mono">
                        ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-muted block">per person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        className="px-3.5 py-2 rounded-lg text-xs font-semibold text-navy-primary border border-sand-border hover:bg-sand-ivory transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleOpenEnquiry(pkg.slug, pkg.title)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal hover:brightness-110 transition-all shadow-sm"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultPackageSlug={selectedPackageForEnquiry?.slug}
        defaultPackageTitle={selectedPackageForEnquiry?.title}
      />

    </div>
  );
};
