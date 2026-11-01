import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Mountain, Landmark, Trees, Waves, Castle } from 'lucide-react';

export const FlightPathAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [busProgress, setBusProgress] = useState(0);
  const [busPosition, setBusPosition] = useState<{ x: number; y: number; angle: number }>({ x: 50, y: 115, angle: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth fallback calculation for tour bus position along the curve across all devices
  useEffect(() => {
    if (!isVisible) return;
    let animId: number;
    let startTime: number | null = null;
    const duration = 16000; // 16s loop

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;
      const progress = elapsed / duration;
      setBusProgress(progress);

      const path = pathRef.current;
      if (path) {
        try {
          const totalLen = path.getTotalLength();
          const currentLen = progress * totalLen;
          const pt = path.getPointAtLength(currentLen);
          // Look slightly ahead to calculate tangent angle
          const aheadLen = Math.min(totalLen, currentLen + 2);
          const aheadPt = path.getPointAtLength(aheadLen);
          const angle = Math.atan2(aheadPt.y - pt.y, aheadPt.x - pt.x) * (180 / Math.PI);
          setBusPosition({ x: pt.x, y: pt.y, angle });
        } catch {
          // SVG totalLength fallback
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  const waypoints = [
    {
      name: 'Ooty & Nilgiri Hills',
      slug: 'ooty',
      scenery: 'Tea Terraces & Mountain Rails',
      code: 'OTY',
      x: '11%',
      y: '53%',
      progressThreshold: 0.08,
      icon: Mountain
    },
    {
      name: 'Munnar & Alleppey',
      slug: 'munnar',
      scenery: 'Misty Valleys & Backwaters',
      code: 'MNR',
      x: '31%',
      y: '28%',
      progressThreshold: 0.28,
      icon: Trees
    },
    {
      name: 'Madurai & Rameswaram',
      slug: 'rameswaram-madurai-kanyakumari',
      scenery: 'Sacred Gopurams & Sea Bridge',
      code: 'MDU',
      x: '52%',
      y: '72%',
      progressThreshold: 0.50,
      icon: Landmark
    },
    {
      name: 'Mysore & Coorg',
      slug: 'coorg',
      scenery: 'Royal Palaces & Coffee Mist',
      code: 'MYS',
      x: '74%',
      y: '38%',
      progressThreshold: 0.73,
      icon: Castle
    },
    {
      name: 'Goa & Hampi',
      slug: 'hampi',
      scenery: 'Sunlit Shores & Stone Temples',
      code: 'HMP',
      x: '92%',
      y: '60%',
      progressThreshold: 0.92,
      icon: Waves
    }
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 bg-navy-midnight overflow-hidden border-y border-gold-royal/20"
      aria-label="Interactive Yazhi Indian Tour Bus Route"
    >
      {/* Background Starry / Golden Dust Ambient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#F5B82E_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Atmospheric golden glow beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gold-royal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-royal/60 border border-gold-royal/30 text-[11px] font-mono tracking-widest text-gold-light uppercase mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gold-royal animate-spin-slow" />
            <span>The Yazhi Grand Route</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            Where Will Your Story Begin?
          </h3>
          <p className="text-xs sm:text-sm text-sand-ivory/75 mt-2 font-light leading-relaxed">
            Follow our golden touring highway connecting Tamil Nadu with India’s most breathtaking hill stations, sacred heritage temples, and mist-veiled backwaters.
          </p>
        </div>

        {/* The Golden Highway Tour Bus Route SVG Canvas */}
        <div className="relative w-full h-52 sm:h-64">
          
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="busRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#F5B82E" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#DDA52A" stopOpacity="1" />
                <stop offset="100%" stopColor="#F8DFA0" stopOpacity="0.85" />
              </linearGradient>

              <filter id="goldHighwayGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>

              {/* Headlight beam gradient */}
              <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#F5B82E" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F8DFA0" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Indian Landscape Silhouettes (Mountains, Temples, Waterfalls, Palms) */}
            <g className="opacity-25 pointer-events-none">
              {/* Western Ghats & Nilgiri Hills silhouette */}
              <path
                d="M 0 190 Q 60 110 130 140 T 260 130 T 400 160 T 540 120 T 700 150 T 860 110 T 1000 170 L 1000 200 L 0 200 Z"
                fill="#0B2A50"
              />
              {/* Distant Mountain Peaks */}
              <path
                d="M 50 170 L 120 90 L 180 160 L 250 100 L 320 170 L 600 170 L 680 80 L 760 170 L 880 70 L 960 170 Z"
                fill="#071D3A"
                opacity="0.6"
              />
              {/* Temple Gopuram Silhouette in center-left */}
              <path
                d="M 505 180 L 512 130 L 522 130 L 524 110 L 520 110 L 520 100 L 515 95 L 525 95 L 525 180 Z"
                fill="#DDA52A"
                opacity="0.3"
              />
              {/* Coconut Palms near coastal section */}
              <path
                d="M 910 180 Q 915 150 920 130 M 920 130 Q 900 120 890 125 M 920 130 Q 930 115 945 120 M 920 130 Q 915 110 910 105"
                stroke="#DDA52A"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
            </g>

            {/* Background dashed route corridor */}
            <path
              d="M 50 115 C 180 40, 320 35, 450 115 C 580 195, 720 50, 950 115"
              stroke="#0B2A50"
              strokeWidth="4"
              strokeDasharray="8 8"
              fill="none"
            />

            {/* Animated Golden Highway Path */}
            <path
              ref={pathRef}
              id="yazhiBusHighway"
              d="M 50 115 C 180 40, 320 35, 450 115 C 580 195, 720 50, 950 115"
              stroke="url(#busRouteGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#goldHighwayGlow)"
              className={`transition-all duration-1000 ${
                isVisible ? 'flight-line-active' : 'opacity-30'
              }`}
              strokeDasharray="1200"
              strokeDashoffset={isVisible ? '0' : '1200'}
              style={{
                transition: 'stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />

            {/* Premium Indian Tour Bus Graphic Traveling the Route */}
            <g
              transform={`translate(${busPosition.x}, ${busPosition.y}) rotate(${busPosition.angle})`}
              className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ pointerEvents: 'none' }}
            >
              {/* Headlight Golden Beam Projecting Forward */}
              <polygon
                points="18,-4 55,-12 55,12 18,4"
                fill="url(#headlightBeam)"
                className="opacity-70 animate-pulse"
              />

              {/* Tour Bus Body Shadow */}
              <rect
                x="-16"
                y="-6"
                width="34"
                height="12"
                rx="3"
                fill="#041329"
                opacity="0.6"
                filter="blur(2px)"
                transform="translate(0, 2)"
              />

              {/* Tour Bus Main Coach Body (Ivory & Gold Luxury Livery) */}
              <rect
                x="-16"
                y="-7"
                width="34"
                height="14"
                rx="3.5"
                fill="#FAF7F0"
                stroke="#F5B82E"
                strokeWidth="1.2"
                className="drop-shadow-[0_0_10px_rgba(245,184,46,0.9)]"
              />

              {/* Coach Royal Gold Side Stripe Accent */}
              <rect
                x="-15"
                y="0"
                width="32"
                height="3"
                fill="#F5B82E"
              />

              {/* Tinted Panoramic Passenger Windows */}
              <rect x="-13" y="-5.5" width="5" height="4" rx="0.8" fill="#071D3A" />
              <rect x="-6" y="-5.5" width="5" height="4" rx="0.8" fill="#071D3A" />
              <rect x="1" y="-5.5" width="5" height="4" rx="0.8" fill="#071D3A" />
              <rect x="8" y="-5.5" width="5" height="4" rx="0.8" fill="#071D3A" />

              {/* Curved Front Windshield Glass */}
              <path
                d="M 14 -5.5 L 17 -3 L 17 3 L 14 5.5 Z"
                fill="#0B2A50"
                stroke="#DDA52A"
                strokeWidth="0.5"
              />

              {/* Roof AC / Ventilation Pod */}
              <rect
                x="-8"
                y="-8.5"
                width="14"
                height="2"
                rx="1"
                fill="#DDA52A"
              />

              {/* Chrome Dual Wheels */}
              <circle cx="-10" cy="7" r="2.2" fill="#071D3A" stroke="#F5B82E" strokeWidth="0.8" />
              <circle cx="9" cy="7" r="2.2" fill="#071D3A" stroke="#F5B82E" strokeWidth="0.8" />
              <circle cx="-10" cy="-7" r="1.8" fill="#071D3A" />
              <circle cx="9" cy="-7" r="1.8" fill="#071D3A" />

              {/* Glowing Headlight Beacons */}
              <circle cx="17" cy="-3.5" r="1.2" fill="#FFF7CC" />
              <circle cx="17" cy="3.5" r="1.2" fill="#FFF7CC" />
            </g>
          </svg>

          {/* Interactive Domestic Destination Waypoint Markers */}
          {waypoints.map((wp) => {
            const Icon = wp.icon;
            const isPassed = isVisible && busProgress >= wp.progressThreshold;

            return (
              <div
                key={wp.code}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: wp.x, top: wp.y }}
              >
                {/* Pulse Ring and Waypoint Marker */}
                <Link
                  to={`/destinations/${wp.slug}`}
                  className="relative flex items-center justify-center p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-royal"
                  aria-label={`Explore ${wp.name}`}
                >
                  <span
                    className={`animate-ping absolute inline-flex h-6 w-6 rounded-full bg-gold-royal transition-opacity ${
                      isPassed ? 'opacity-50' : 'opacity-20'
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-gradient-to-tr from-navy-midnight via-navy-royal to-gold-royal border border-gold-royal transition-all duration-300 group-hover:scale-125 ${
                      isPassed
                        ? 'shadow-[0_0_12px_#F5B82E] text-gold-royal'
                        : 'shadow-sm text-sand-ivory/60'
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                </Link>

                {/* Waypoint Label */}
                <div className="mt-2 text-center transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                  <span className="block text-[10px] sm:text-[11px] font-mono tracking-wider text-gold-royal font-bold drop-shadow">
                    {wp.code}
                  </span>
                  <span className="hidden sm:block text-xs font-serif text-white font-medium whitespace-nowrap drop-shadow-md">
                    {wp.name}
                  </span>
                  <span className="hidden md:block text-[9px] font-sans text-sand-ivory/70 whitespace-nowrap">
                    {wp.scenery}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Footer Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center text-xs text-sand-ivory/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-royal" />
            <span className="font-mono text-gold-light uppercase text-[11px] tracking-wider">
              Bespoke Indian Circuits
            </span>
          </div>
          <span className="hidden sm:inline text-gold-royal/50">•</span>
          <span>Luxury touring coaches, certified chauffeurs & hand-curated domestic itineraries</span>
        </div>

      </div>
    </div>
  );
};
