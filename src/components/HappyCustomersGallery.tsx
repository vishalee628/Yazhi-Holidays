import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Users, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Maximize2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { CustomerMemory } from '../types';
import { getCustomerMemories, getDynamicDestinations } from '../services/customerMemoryService';
import { checkAdminAuth } from '../services/authService';
import { Link } from 'react-router-dom';

export const HappyCustomersGallery: React.FC = () => {
  const [memories, setMemories] = useState<CustomerMemory[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('All Memories');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [filterTabs, setFilterTabs] = useState<string[]>([]);

  const refreshMemories = useCallback(() => {
    const published = getCustomerMemories(false);
    setMemories(published);

    const dests = getDynamicDestinations();
    setFilterTabs(dests);

    const admin = checkAdminAuth();
    setIsAdminLoggedIn(Boolean(admin));
  }, []);

  useEffect(() => {
    refreshMemories();

    window.addEventListener('yazhi_memories_updated', refreshMemories);
    window.addEventListener('storage', refreshMemories);
    return () => {
      window.removeEventListener('yazhi_memories_updated', refreshMemories);
      window.removeEventListener('storage', refreshMemories);
    };
  }, [refreshMemories]);

  // Filter memories based on selected destination
  const filteredMemories = useMemo(() => {
    if (selectedDestination === 'All Memories') {
      return memories;
    }
    if (selectedDestination === 'Other Indian Destinations') {
      const topDests = ['Ooty', 'Kodaikanal', 'Munnar', 'Coorg', 'Kerala', 'Goa', 'Mysore', 'Wayanad'];
      return memories.filter(m => !topDests.includes(m.destination));
    }
    return memories.filter(m => m.destination.toLowerCase() === selectedDestination.toLowerCase());
  }, [memories, selectedDestination]);

  // Lightbox navigation handlers
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const handlePrevPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredMemories.length === 0) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredMemories.length) % filteredMemories.length);
  }, [lightboxIndex, filteredMemories.length]);

  const handleNextPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredMemories.length === 0) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredMemories.length);
  }, [lightboxIndex, filteredMemories.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleCloseLightbox, handlePrevPhoto, handleNextPhoto]);

  const currentPhoto = lightboxIndex !== null ? filteredMemories[lightboxIndex] : null;

  return (
    <section 
      id="happy-customers-gallery" 
      className="py-24 bg-sand-card border-t border-sand-border relative overflow-hidden"
      aria-label="Happy Customers Gallery"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-royal/5 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-midnight/5 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-ivory border border-gold-royal/30 text-gold-metallic text-xs font-mono uppercase tracking-widest mb-3 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-gold-royal" />
            <span>AUTHENTIC TRAVEL MOMENTS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal tracking-tight">
            Happy Customers – Memories from Our Trips
          </h2>

          <p className="text-sm sm:text-base text-slate-muted mt-4 font-light leading-relaxed">
            “Every journey creates a beautiful memory. Explore the happy moments our travellers experienced with Yazhi Holidays.”
          </p>
        </div>

        {/* Dynamic Destination Filter Bar */}
        {memories.length > 0 && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
            {filterTabs.map((dest) => {
              const isActive = selectedDestination === dest;
              return (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`text-xs px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-navy-midnight text-gold-royal border border-gold-royal shadow-sm scale-105'
                      : 'bg-white text-slate-body border border-sand-border hover:bg-sand-ivory hover:border-gold-royal/40'
                  }`}
                >
                  {dest}
                </button>
              );
            })}
          </div>
        )}

        {/* CONTENT AREA: Gallery Grid or Elegant Empty State */}
        {memories.length === 0 ? (
          /* ========================================================= */
          /* ELEGANT EMPTY STATE (Requirement 6)                      */
          /* ========================================================= */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-sand-border shadow-luxury max-w-3xl mx-auto text-center relative overflow-hidden group">
            {/* Subtle glow border */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold-royal/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-sand-card border border-gold-royal/30 flex items-center justify-center mx-auto mb-6 text-gold-royal shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-gold-metallic block mb-2">
              REAL EXPERIENCES IN THE MAKING
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl text-navy-primary font-normal mb-4">
              Your next beautiful memory starts here!
            </h3>

            <p className="text-xs sm:text-sm text-slate-muted max-w-xl mx-auto leading-relaxed mb-8">
              Explore the happy moments our travellers experienced with Yazhi Holidays. Our travellers are currently enjoying handpicked domestic tours across Ooty, Kodaikanal, Munnar, Coorg, and beyond. Verified customer photographs uploaded by our concierge team will appear here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/packages"
                className="btn-primary py-3 px-7 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Browse Domestic Tours</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/plan-trip"
                className="btn-outline-gold py-3 px-7 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Plan A Custom Holiday</span>
              </Link>

              {isAdminLoggedIn && (
                <Link
                  to="/admin"
                  className="text-xs font-mono text-gold-metallic underline hover:text-navy-primary block sm:inline mt-2 sm:mt-0"
                >
                  Admin Portal &rarr; Upload Customer Memories
                </Link>
              )}
            </div>
          </div>
        ) : filteredMemories.length === 0 ? (
          /* Empty for selected filter */
          <div className="bg-white rounded-2xl p-12 border border-sand-border text-center max-w-md mx-auto">
            <Compass className="w-10 h-10 text-gold-royal mx-auto mb-3 opacity-60" />
            <h4 className="font-serif text-lg text-navy-primary font-semibold mb-1">
              No Photos in {selectedDestination} Yet
            </h4>
            <p className="text-xs text-slate-muted mb-4">
              Try choosing another destination tab or view "All Memories".
            </p>
            <button
              onClick={() => setSelectedDestination('All Memories')}
              className="text-xs font-semibold text-gold-metallic hover:underline"
            >
              Show All Customer Memories &rarr;
            </button>
          </div>
        ) : (
          /* ========================================================= */
          /* MASONRY-STYLE PHOTO GRID (Requirement 1 & 4)              */
          /* ========================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[280px]">
            {filteredMemories.map((photo, index) => {
              // Asymmetric masonry heights for dynamic rhythm
              const isTall = index % 5 === 0 || index % 7 === 0;
              const isWide = index === 2 || index === 8;

              return (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(index)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-luxury border border-sand-border bg-navy-midnight transition-all duration-500 hover:shadow-2xl hover:border-gold-royal/50 hover:-translate-y-1 ${
                    isTall ? 'sm:row-span-2' : ''
                  } ${isWide ? 'lg:col-span-2' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenLightbox(index);
                    }
                  }}
                  aria-label={`View photo from ${photo.destination}`}
                >
                  {/* Photo image with smooth hover zoom */}
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || `Happy customers in ${photo.destination}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md shadow-sm">
                      <MapPin className="w-2.5 h-2.5 text-gold-royal" />
                      <span>{photo.destination}</span>
                    </span>

                    {photo.tripType && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-white/90 text-navy-primary backdrop-blur-md shadow-sm">
                        <Users className="w-2.5 h-2.5 text-slate-muted" />
                        <span>{photo.tripType}</span>
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay with Lightbox trigger icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/90 via-navy-midnight/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-royal">
                        <Calendar className="w-3 h-3" />
                        <span>{photo.tripDate}</span>
                      </div>
                      
                      <div className="w-7 h-7 rounded-full bg-gold-royal/20 border border-gold-royal/40 flex items-center justify-center text-gold-royal">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {photo.caption && (
                      <p className="text-xs text-sand-ivory/95 font-medium line-clamp-2 leading-relaxed">
                        “{photo.caption}”
                      </p>
                    )}
                  </div>

                  {/* Subtle persistent bottom bar for mobile clarity */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-navy-midnight/70 to-transparent sm:hidden flex items-center justify-between text-white text-[11px]">
                    <span className="font-semibold truncate text-white">{photo.destination}</span>
                    <span className="text-gold-royal font-mono text-[10px]">{photo.tripDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL (Requirement 1)                 */}
      {/* ========================================================= */}
      {lightboxIndex !== null && currentPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-navy-midnight/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Photo Details"
        >
          {/* Top Bar: Title, Counter & Close */}
          <div className="flex items-center justify-between text-white border-b border-navy-royal/50 pb-3 z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-royal" />
              <div>
                <h4 className="font-serif text-base sm:text-lg font-semibold text-white">
                  {currentPhoto.destination}
                </h4>
                <span className="text-[11px] font-mono text-gold-royal">
                  {currentPhoto.tripType || 'Domestic Tour'} • {currentPhoto.tripDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-sand-ivory/70 hidden sm:inline">
                {lightboxIndex + 1} of {filteredMemories.length}
              </span>

              <button
                onClick={handleCloseLightbox}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Photo Display with Next / Previous navigation */}
          <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden">
            {/* Prev Button */}
            {filteredMemories.length > 1 && (
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-navy-midnight/80 hover:bg-gold-royal hover:text-navy-midnight border border-gold-royal/30 text-white flex items-center justify-center transition-all shadow-lg"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Photo Image */}
            <div className="max-h-[75vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.caption || currentPhoto.destination}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-gold-royal/20 animate-fadeIn"
              />
            </div>

            {/* Next Button */}
            {filteredMemories.length > 1 && (
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-navy-midnight/80 hover:bg-gold-royal hover:text-navy-midnight border border-gold-royal/30 text-white flex items-center justify-center transition-all shadow-lg"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Caption & Info */}
          <div className="max-w-3xl mx-auto w-full bg-navy-royal/40 border border-gold-royal/20 rounded-xl p-3 sm:p-4 text-center text-sand-ivory z-20 backdrop-blur-sm">
            {currentPhoto.caption ? (
              <p className="text-xs sm:text-sm font-light italic leading-relaxed">
                “{currentPhoto.caption}”
              </p>
            ) : (
              <p className="text-xs text-sand-ivory/70 font-mono">
                Genuine travel memories captured on Yazhi Holidays domestic circuit.
              </p>
            )}
            
            <div className="flex items-center justify-center gap-4 mt-2 text-[11px] font-mono text-gold-metallic">
              <span>Verified Customer Memory</span>
              <span>•</span>
              <span>Yazhi Holidays Concierge</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
