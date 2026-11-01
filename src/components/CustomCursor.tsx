import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium Custom Cursor for Yazhi Holidays
 * - Elegant golden dot (#F5B82E) with smooth trailing outer ring
 * - Dynamic states: expands on buttons, golden glow halo on destination cards & travel photos, scales on links
 * - Hides on text inputs, forms, and textarea to keep native text caret visible
 * - Subtle magnetic pull effect for primary CTA buttons (max 4-5px)
 * - Automatically disabled on touch & coarse pointer devices
 * - Respects prefers-reduced-motion
 * - Strictly pointer-events: none so clicks are never blocked
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Target mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  // Interpolated ring coordinates for buttery trailing
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  const [cursorState, setCursorState] = useState<
    'default' | 'button' | 'card' | 'link' | 'hidden'
  >('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices or reduced motion
    const touchCheck =
      'ontouchstart' in window ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck) {
      setIsTouchDevice(true);
      return;
    }

    // 1. Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }

      // Fast update for dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Text input or form control: hide custom cursor to keep native text caret
      if (
        target.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        setCursorState('hidden');
        return;
      }

      // Destination card or travel photo
      if (
        target.closest(
          '.destination-card, [data-cursor="card"], #happy-customers-gallery img, .tilt-card-container'
        )
      ) {
        setCursorState('card');
        return;
      }

      // Button / CTA
      if (
        target.closest(
          'button, .btn-primary, .btn-hero-primary, .btn-secondary, .btn-secondary-dark, .btn-primary-navy, [role="button"]'
        )
      ) {
        setCursorState('button');
        return;
      }

      // Clickable link
      if (target.closest('a, nav a, .nav-link, [role="link"]')) {
        setCursorState('link');
        return;
      }

      // Default state
      setCursorState('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // 2. Trailing animation loop via RAF (Lerp 0.18 for elegant, organic lag)
    const render = () => {
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    // 3. Subtle Magnetic Hover Effect for Primary CTA Buttons
    // Subtle max 4-5px translation towards mouse cursor
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const magneticBtn = target?.closest<HTMLElement>(
        '[data-magnetic="true"], .btn-hero-primary, .btn-primary'
      );

      if (magneticBtn) {
        const rect = magneticBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxDist = 5; // Subtle, restrained magnetic shift (pixels)
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        const clampedX = Math.max(-1, Math.min(1, deltaX)) * maxDist;
        const clampedY = Math.max(-1, Math.min(1, deltaY)) * maxDist;

        magneticBtn.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
        magneticBtn.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const magneticBtn = target?.closest<HTMLElement>(
        '[data-magnetic="true"], .btn-hero-primary, .btn-primary'
      );
      if (magneticBtn) {
        magneticBtn.style.transform = 'translate3d(0px, 0px, 0px)';
        magneticBtn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleMagneticMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseout', handleMagneticLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMagneticMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseout', handleMagneticLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  // Completely disabled on mobile / touch / reduced-motion
  if (isTouchDevice) {
    return null;
  }

  // Determine ring styling based on cursorState
  let ringClasses = 'w-9 h-9 border-[#F5B82E]/80 bg-[#F5B82E]/5';
  let dotClasses = 'w-2 h-2 bg-[#F5B82E] shadow-[0_0_8px_#F5B82E]';

  if (cursorState === 'button') {
    // Ring expands with smooth transition and golden glow
    ringClasses =
      'w-14 h-14 border-[#F5B82E] bg-[#F5B82E]/15 shadow-[0_0_20px_rgba(245,184,46,0.5)] scale-110';
    dotClasses = 'w-1.5 h-1.5 bg-[#FAF7F0] shadow-[0_0_10px_#FAF7F0]';
  } else if (cursorState === 'card') {
    // Subtle golden glow halo for destination & photo cards
    ringClasses =
      'w-16 h-16 border-[#F5B82E]/90 bg-[#F5B82E]/10 shadow-[0_0_28px_rgba(245,184,46,0.55)] backdrop-blur-[0.5px]';
    dotClasses = 'w-2 h-2 bg-[#F5B82E] shadow-[0_0_12px_#F5B82E]';
  } else if (cursorState === 'link') {
    // Interactive scale for clickable links
    ringClasses =
      'w-11 h-11 border-[#F8DFA0] bg-[#F8DFA0]/10 shadow-[0_0_12px_rgba(248,223,160,0.4)]';
    dotClasses = 'w-2 h-2 bg-[#F5B82E]';
  } else if (cursorState === 'hidden') {
    ringClasses = 'w-0 h-0 opacity-0';
    dotClasses = 'w-0 h-0 opacity-0';
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible && cursorState !== 'hidden' ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-[50%] -mt-[50%] rounded-full border border-solid pointer-events-none will-change-transform transition-[width,height,background-color,border-color,box-shadow,transform] duration-200 ease-out flex items-center justify-center ${ringClasses}`}
        style={{
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`,
          marginTop: cursorState === 'button' ? '-28px' : cursorState === 'card' ? '-32px' : cursorState === 'link' ? '-22px' : '-18px',
          marginLeft: cursorState === 'button' ? '-28px' : cursorState === 'card' ? '-32px' : cursorState === 'link' ? '-22px' : '-18px',
        }}
      />

      {/* Inner Precision Gold Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,box-shadow] duration-150 ease-out ${dotClasses}`}
        style={{
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
        }}
      />
    </div>
  );
};
