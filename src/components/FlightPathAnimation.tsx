import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Mountain, Landmark, Trees, Waves, Castle, ChevronRight, ArrowRight, MapPin } from 'lucide-react';

export const FlightPathAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [busProgress, setBusProgress] = useState(0);

  // Desktop bus coordinates along the horizontal path
  const [desktopBusPos, setDesktopBusPos] = useState<{ x: number; y: number; angle: number }>({ x: 50, y: 115, angle: 0 });

  // Mobile bus coordinates along the vertical serpentine highway
  const [mobileBusPos, setMobileBusPos] = useState<{ x: number; y: number; angle: number }>({ x: 180, y: 25, angle: 90 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth synchronized calculation for tour bus position along both routes
  useEffect(() => {
    if (!isVisible) return;
    let animId: number;
    let startTime: number | null = null;
    const duration = 16000; // 16s cinematic road trip loop

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;
      const progress = elapsed / duration;
      setBusProgress(progress);

      // Desktop highway calculations
      const dPath = desktopPathRef.current;
      if (dPath) {
        try {
          const totalLen = dPath.getTotalLength();
          const currentLen = progress * totalLen;
          const pt = dPath.getPointAtLength(currentLen);
          const aheadLen = Math.min(totalLen, currentLen + 2);
          const aheadPt = dPath.getPointAtLength(aheadLen);
          const angle = Math.atan2(aheadPt.y - pt.y, aheadPt.x - pt.x) * (180 / Math.PI);
          setDesktopBusPos({ x: pt.x, y: pt.y, angle });
        } catch {}
      }

      // Mobile serpentine highway calculations
      const mPath = mobilePathRef.current;
      if (mPath) {
        try {
          const totalLen = mPath.getTotalLength();
          const currentLen = progress * totalLen;
          const pt = mPath.getPointAtLength(currentLen);
          const aheadLen = Math.min(totalLen, currentLen + 2);
          const aheadPt = mPath.getPointAtLength(aheadLen);
          const angle = Math.atan2(aheadPt.y - pt.y, aheadPt.x - pt.x) * (180 / Math.PI);
          setMobileBusPos({ x: pt.x, y: pt.y, angle });
        } catch {}
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  // Desktop waypoints (Unchanged)
  const desktopWaypoints = [
    {
      name: 'Ooty & Nilgiri Hills',
      shortName: 'Ooty',
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
      shortName: 'Munnar',
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
      shortName: 'Madurai',
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
      shortName: 'Mysore',
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
      shortName: 'Goa',
      slug: 'hampi',
      scenery: 'Sunlit Shores & Stone Temples',
      code: 'HMP',
      x: '92%',
      y: '60%',
      progressThreshold: 0.92,
      icon: Waves
    }
  ];

  // Dedicated Mobile Scenic Road Trip Waypoints
  const mobileWaypoints = [
    {
      name: 'Ooty & Nilgiri Hills',
      shortName: 'Ooty',
      slug: 'ooty',
      scenery: 'Tea Terraces & Hill Railway',
      code: 'OTY',
      tag: 'Hill Station',
      icon: Mountain,
      threshold: 0.16,
      nodeX: 275,
      nodeY: 135,
      side: 'left' as const,
      top: 92
    },
    {
      name: 'Munnar & Backwaters',
      shortName: 'Munnar',
      slug: 'munnar',
      scenery: 'Misty Valleys & Alleppey Lagoons',
      code: 'MNR',
      tag: 'Backwaters',
      icon: Trees,
      threshold: 0.38,
      nodeX: 85,
      nodeY: 265,
      side: 'right' as const,
      top: 222
    },
    {
      name: 'Kodaikanal Pines',
      shortName: 'Kodaikanal',
      slug: 'kodaikanal',
      scenery: 'Pillar Rocks & Shola Forests',
      code: 'KOD',
      tag: 'Misty Peaks',
      icon: Trees,
      threshold: 0.60,
      nodeX: 275,
      nodeY: 395,
      side: 'left' as const,
      top: 352
    },
    {
      name: 'Mysore & Coorg',
      shortName: 'Coorg',
      slug: 'coorg',
      scenery: 'Palaces & Coffee Country',
      code: 'CRG',
      tag: 'Heritage & Mist',
      icon: Castle,
      threshold: 0.82,
      nodeX: 85,
      nodeY: 525,
      side: 'right' as const,
      top: 482
    },
    {
      name: 'Goa Coastal Serenity',
      shortName: 'Goa',
      slug: 'goa',
      scenery: 'Sunlit Shores & Portuguese Heritage',
      code: 'GOA',
      tag: 'Coastal Bliss',
      icon: Waves,
      threshold: 0.96,
      nodeX: 180,
      nodeY: 620,
      side: 'center' as const,
      top: 585
    }
  ];

  // Active stop index for mobile status pill
  const activeMobileIndex = busProgress < 0.25 ? 0 : busProgress < 0.48 ? 1 : busProgress < 0.70 ? 2 : busProgress < 0.88 ? 3 : 4;
  const currentMobileStop = mobileWaypoints[activeMobileIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 sm:py-20 bg-navy-midnight overflow-hidden border-y border-gold-royal/20"
      aria-label="Interactive Yazhi Indian Tour Bus Route"
    >
      {/* Background Starry / Golden Dust Ambient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#F5B82E_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Atmospheric golden glow beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gold-royal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-royal/60 border border-gold-royal/30 text-[10px] sm:text-[11px] font-mono tracking-widest text-gold-light uppercase mb-2.5 sm:mb-3 shadow-sm">
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

        {/* ========================================================= */}
        {/* 1. DESKTOP/LAPTOP VERSION (Preserved 100% Exactly)        */}
        {/* ========================================================= */}
        <div className="hidden md:block">
          <div className="relative w-full h-56 sm:h-64">
            
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="busRouteGradientDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#F5B82E" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#DDA52A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F8DFA0" stopOpacity="0.85" />
                </linearGradient>

                <filter id="goldHighwayGlowDesktop" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>

                {/* Headlight beam gradient */}
                <linearGradient id="headlightBeamDesktop" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#F5B82E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F8DFA0" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Indian Landscape Silhouettes (Mountains, Temples, Waterfalls, Palms) */}
              <g className="opacity-25 pointer-events-none">
                <path
                  d="M 0 190 Q 60 110 130 140 T 260 130 T 400 160 T 540 120 T 700 150 T 860 110 T 1000 170 L 1000 200 L 0 200 Z"
                  fill="#0B2A50"
                />
                <path
                  d="M 50 170 L 120 90 L 180 160 L 250 100 L 320 170 L 600 170 L 680 80 L 760 170 L 880 70 L 960 170 Z"
                  fill="#071D3A"
                  opacity="0.6"
                />
                <path
                  d="M 505 180 L 512 130 L 522 130 L 524 110 L 520 110 L 520 100 L 515 95 L 525 95 L 525 180 Z"
                  fill="#DDA52A"
                  opacity="0.3"
                />
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
                ref={desktopPathRef}
                id="yazhiBusHighwayDesktop"
                d="M 50 115 C 180 40, 320 35, 450 115 C 580 195, 720 50, 950 115"
                stroke="url(#busRouteGradientDesktop)"
                strokeWidth="3"
                fill="none"
                filter="url(#goldHighwayGlowDesktop)"
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
                transform={`translate(${desktopBusPos.x}, ${desktopBusPos.y}) rotate(${desktopBusPos.angle})`}
                className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ pointerEvents: 'none' }}
              >
                {/* Headlight Golden Beam Projecting Forward */}
                <polygon
                  points="18,-4 55,-12 55,12 18,4"
                  fill="url(#headlightBeamDesktop)"
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
            {desktopWaypoints.map((wp) => {
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
                      className={`relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-tr from-navy-midnight via-navy-royal to-gold-royal border border-gold-royal transition-all duration-300 group-hover:scale-125 ${
                        isPassed
                          ? 'shadow-[0_0_12px_#F5B82E] text-gold-royal'
                          : 'shadow-sm text-sand-ivory/60'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </span>
                  </Link>

                  {/* Waypoint Label */}
                  <div className="mt-2 text-center transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                    <span className="block text-[11px] font-mono tracking-wider text-gold-royal font-bold drop-shadow">
                      {wp.code}
                    </span>
                    <span className="block text-xs font-serif text-white font-medium whitespace-nowrap drop-shadow-md">
                      {wp.name}
                    </span>
                    <span className="text-[9px] font-sans text-sand-ivory/70 whitespace-nowrap">
                      {wp.scenery}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CINEMATIC MOBILE ROAD-TRIP EXPERIENCE (Dedicated View) */}
        {/* ========================================================= */}
        <div className="block md:hidden">
          
          {/* Active Route Ticker Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-navy-royal/90 via-[#0B2A50] to-navy-midnight border border-gold-royal/35 shadow-luxury-dark mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-royal animate-ping flex-shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-light font-bold flex-shrink-0">
                ACTIVE CIRCUIT:
              </span>
              <span className="text-xs font-serif text-white truncate font-medium">
                {currentMobileStop.name}
              </span>
            </div>
            <Link
              to={`/destinations/${currentMobileStop.slug}`}
              className="text-[11px] font-mono text-gold-royal hover:text-gold-light font-semibold flex items-center gap-0.5 flex-shrink-0 pl-2"
            >
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5 text-gold-royal" />
            </Link>
          </div>

          {/* Serpentine Road Canvas with Prominent Travelling Bus */}
          <div className="relative w-full h-[650px] max-w-[370px] mx-auto overflow-hidden rounded-2xl bg-gradient-to-b from-navy-midnight/80 via-navy-royal/30 to-navy-midnight/90 border border-gold-royal/20 shadow-luxury-dark p-2">
            
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 360 670"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
            >
              <defs>
                <linearGradient id="mobileRoadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F8DFA0" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#F5B82E" stopOpacity="1" />
                  <stop offset="70%" stopColor="#DDA52A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="mobileHeadlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#F5B82E" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#F8DFA0" stopOpacity="0" />
                </linearGradient>

                <filter id="mobileGoldHighwayGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Distant Nilgiri Mountain Silhouette in Mobile Background */}
              <g className="opacity-20 pointer-events-none">
                <path
                  d="M 0 100 Q 90 40 180 80 T 360 60 L 360 200 L 0 200 Z"
                  fill="#0B2A50"
                />
                <path
                  d="M 0 350 Q 90 290 180 330 T 360 310 L 360 450 L 0 450 Z"
                  fill="#071D3A"
                />
              </g>

              {/* Connecting Dotted Route Leader Lines from Road to Destination Cards */}
              <g stroke="#F5B82E" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.45" fill="none">
                {/* Stop 1 (Ooty): Card on Left */}
                <line x1="275" y1="135" x2="200" y2="135" />
                {/* Stop 2 (Munnar): Card on Right */}
                <line x1="85" y1="265" x2="160" y2="265" />
                {/* Stop 3 (Kodaikanal): Card on Left */}
                <line x1="275" y1="395" x2="200" y2="395" />
                {/* Stop 4 (Coorg): Card on Right */}
                <line x1="85" y1="525" x2="160" y2="525" />
              </g>

              {/* Wide Asphalt Highway Base Bed */}
              <path
                d="M 180 25 C 180 75, 275 80, 275 135 C 275 195, 85 205, 85 265 C 85 325, 275 335, 275 395 C 275 455, 85 465, 85 525 C 85 575, 180 575, 180 620"
                stroke="#051528"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Golden Outer Curb Glow Edge */}
              <path
                d="M 180 25 C 180 75, 275 80, 275 135 C 275 195, 85 205, 85 265 C 85 325, 275 335, 275 395 C 275 455, 85 465, 85 525 C 85 575, 180 575, 180 620"
                stroke="#DDA52A"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.25"
                filter="url(#mobileGoldHighwayGlow)"
              />

              {/* Asphalt Road Surface */}
              <path
                d="M 180 25 C 180 75, 275 80, 275 135 C 275 195, 85 205, 85 265 C 85 325, 275 335, 275 395 C 275 455, 85 465, 85 525 C 85 575, 180 575, 180 620"
                stroke="#0B2342"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Animated Traversed Golden Ribbon Path */}
              <path
                ref={mobilePathRef}
                id="yazhiMobileBusHighway"
                d="M 180 25 C 180 75, 275 80, 275 135 C 275 195, 85 205, 85 265 C 85 325, 275 335, 275 395 C 275 455, 85 465, 85 525 C 85 575, 180 575, 180 620"
                stroke="url(#mobileRoadGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#mobileGoldHighwayGlow)"
                className="transition-all duration-1000"
                strokeDasharray="900"
                strokeDashoffset={isVisible ? '0' : '900'}
                style={{
                  transition: 'stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {/* Dashed Center Dividing Lines */}
              <path
                d="M 180 25 C 180 75, 275 80, 275 135 C 275 195, 85 205, 85 265 C 85 325, 275 335, 275 395 C 275 455, 85 465, 85 525 C 85 575, 180 575, 180 620"
                stroke="#FAF7F0"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                opacity="0.6"
                fill="none"
              />

              {/* Waypoint Station Beacons along the Road */}
              {mobileWaypoints.map((wp, idx) => {
                const isPassed = busProgress >= wp.threshold;
                const isActive = activeMobileIndex === idx;

                return (
                  <g key={wp.code} transform={`translate(${wp.nodeX}, ${wp.nodeY})`}>
                    {/* Pulsing Glow Ring */}
                    <circle
                      r={isActive ? "10" : "7"}
                      fill="none"
                      stroke="#F5B82E"
                      strokeWidth="1.5"
                      className={isActive ? "animate-ping opacity-75" : "opacity-30"}
                    />
                    {/* Node Circle */}
                    <circle
                      r="5.5"
                      fill={isPassed || isActive ? "#F5B82E" : "#071D3A"}
                      stroke="#FAF7F0"
                      strokeWidth="1.5"
                      style={{
                        filter: isActive ? 'drop-shadow(0 0 8px #F5B82E)' : 'none'
                      }}
                    />
                  </g>
                );
              })}

              {/* Prominent Travelling Luxury Tour Bus Graphic */}
              <g
                transform={`translate(${mobileBusPos.x}, ${mobileBusPos.y}) rotate(${mobileBusPos.angle})`}
                className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ pointerEvents: 'none' }}
              >
                {/* Forward Glowing Headlight Cones */}
                <polygon
                  points="18,-4 52,-13 52,13 18,4"
                  fill="url(#mobileHeadlightBeam)"
                  className="opacity-80 animate-pulse"
                />

                {/* Bus Chassis Shadow */}
                <rect
                  x="-17"
                  y="-7"
                  width="36"
                  height="14"
                  rx="3.5"
                  fill="#041329"
                  opacity="0.75"
                  transform="translate(0, 3)"
                  filter="blur(2px)"
                />

                {/* Tour Bus Main Coach Body (Ivory Livery) */}
                <rect
                  x="-17"
                  y="-8"
                  width="36"
                  height="16"
                  rx="4"
                  fill="#FAF7F0"
                  stroke="#F5B82E"
                  strokeWidth="1.2"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(245,184,46,0.95))' }}
                />

                {/* Royal Gold Side Accent Band */}
                <rect x="-16" y="-0.5" width="34" height="3.5" fill="#F5B82E" />

                {/* Tinted Panoramic Passenger Windows */}
                <rect x="-14" y="-6.5" width="5.5" height="4.5" rx="1" fill="#071D3A" />
                <rect x="-7" y="-6.5" width="5.5" height="4.5" rx="1" fill="#071D3A" />
                <rect x="0" y="-6.5" width="5.5" height="4.5" rx="1" fill="#071D3A" />
                <rect x="7" y="-6.5" width="5.5" height="4.5" rx="1" fill="#071D3A" />

                {/* Front Windshield Curved Glass */}
                <path
                  d="M 14 -6.5 L 17 -3.5 L 17 3.5 L 14 6.5 Z"
                  fill="#0B2A50"
                  stroke="#DDA52A"
                  strokeWidth="0.6"
                />

                {/* Roof AC Pod */}
                <rect x="-9" y="-9.8" width="16" height="2" rx="1" fill="#DDA52A" />

                {/* Dual Chrome Touring Wheels */}
                <circle cx="-10" cy="8" r="2.5" fill="#071D3A" stroke="#F5B82E" strokeWidth="0.8" />
                <circle cx="9" cy="8" r="2.5" fill="#071D3A" stroke="#F5B82E" strokeWidth="0.8" />
                <circle cx="-10" cy="-8" r="2.2" fill="#071D3A" />
                <circle cx="9" cy="-8" r="2.2" fill="#071D3A" />

                {/* Front Projector Headlights */}
                <circle cx="17" cy="-3.5" r="1.4" fill="#FFFCE6" />
                <circle cx="17" cy="3.5" r="1.4" fill="#FFFCE6" />

                {/* Tail-lights (Ruby Red) */}
                <circle cx="-17" cy="-5" r="1" fill="#EF4444" />
                <circle cx="-17" cy="5" r="1" fill="#EF4444" />
              </g>

            </svg>

            {/* Interactive Destination Stop Cards Placed Alongside the Scenic Road */}
            {mobileWaypoints.map((wp, idx) => {
              const Icon = wp.icon;
              const isPassed = busProgress >= wp.threshold;
              const isActive = activeMobileIndex === idx;

              // Positioning styles based on side
              const positionClass = wp.side === 'left'
                ? 'left-2.5 max-w-[195px] min-[390px]:max-w-[210px]'
                : wp.side === 'right'
                ? 'right-2.5 max-w-[195px] min-[390px]:max-w-[210px]'
                : 'left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[280px]';

              return (
                <Link
                  key={wp.code}
                  to={`/destinations/${wp.slug}`}
                  className={`absolute rounded-xl p-2.5 transition-all duration-300 z-10 block backdrop-blur-md border ${positionClass} ${
                    isActive
                      ? 'bg-gradient-to-r from-navy-midnight/95 to-navy-royal/95 border-gold-royal shadow-[0_0_15px_rgba(245,184,46,0.3)] ring-1 ring-gold-royal/50 scale-[1.02]'
                      : isPassed
                      ? 'bg-navy-midnight/85 border-gold-royal/30 hover:border-gold-royal/50'
                      : 'bg-navy-midnight/70 border-navy-royal/60 opacity-85 hover:opacity-100'
                  }`}
                  style={{ top: `${wp.top}px` }}
                  aria-label={`Explore ${wp.name}`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-gold-royal text-navy-midnight shadow-[0_0_8px_#F5B82E]'
                        : isPassed
                        ? 'bg-navy-royal text-gold-royal border border-gold-royal/30'
                        : 'bg-navy-royal/50 text-sand-ivory/60'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[9px] font-mono font-bold tracking-wider text-gold-royal">
                          {wp.code}
                        </span>
                        {isActive ? (
                          <span className="px-1.5 py-0.2 rounded-full text-[8px] font-mono uppercase bg-gold-royal text-navy-midnight font-bold animate-pulse">
                            En Route
                          </span>
                        ) : isPassed ? (
                          <span className="text-[8px] font-mono text-emerald-400">
                            ✓ Circuit
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono text-sand-ivory/50">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-sm font-semibold text-white leading-tight truncate">
                        {wp.shortName}
                      </h4>
                      <p className="text-[9px] text-sand-ivory/70 truncate font-light mt-0.5">
                        {wp.scenery}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}

          </div>

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