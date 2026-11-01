import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max degrees of tilt, e.g. 6deg for tasteful restraint
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = x / rect.width;
    const yPct = y / rect.height;

    // Calculate restrained tilt
    const tiltX = (0.5 - yPct) * maxTilt;
    const tiltY = (xPct - 0.5) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`
    );

    // Subtle specular gold/light reflection
    setGlareStyle({
      background: `radial-gradient(circle at ${xPct * 100}% ${yPct * 100}%, rgba(245, 184, 46, 0.18) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
      opacity: 1
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform ease-out will-change-transform ${className}`}
      style={{
        transform: transformStyle,
        transitionDuration: isHovered ? '120ms' : '500ms',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}

      {/* Subtle Specular Sheen Overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-10"
        style={glareStyle}
      />
    </div>
  );
};
