import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles, Droplets, ShieldCheck, Eye, Compass, Move } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onExploreGallery }) => {
  // Track normalized gaze coordinates (-1 to +1)
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [cursorPixel, setCursorPixel] = useState({ x: 0, y: 0 });
  const [isInsideHero, setIsInsideHero] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(IMAGES.heroModel);

  const heroRef = useRef<HTMLDivElement>(null);
  const targetGaze = useRef({ x: 0, y: 0 });
  const smoothedGaze = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Preload and ensure reliable image loading across environments
  useEffect(() => {
    const candidateSources = [
      IMAGES.heroModel,
      './images/hero_model_glowing_skin_1791011022215.jpg',
      '/images/hero_model_glowing_skin_1791011022215.jpg',
      IMAGES.skincareLifestyle,
    ];

    let isMounted = true;
    let index = 0;

    const tryNextImage = () => {
      if (index >= candidateSources.length) return;
      const src = candidateSources[index];
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isMounted) {
          setCurrentImageSrc(src);
          setImageLoaded(true);
        }
      };
      img.onerror = () => {
        index++;
        tryNextImage();
      };
    };

    tryNextImage();

    return () => {
      isMounted = false;
    };
  }, []);

  // Global cursor tracking across the ENTIRE page
  useEffect(() => {
    const calculateGazeVector = (clientX: number, clientY: number) => {
      // Find the woman's face coordinate on the screen
      let faceScreenX = window.innerWidth * 0.65;
      let faceScreenY = window.innerHeight * 0.40;

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Woman's face anchor: ~62% horizontal, ~36% vertical of the hero section
        faceScreenX = rect.left + rect.width * 0.62;
        faceScreenY = rect.top + rect.height * 0.36;
      }

      // Delta from face to mouse cursor anywhere on the page
      const deltaX = clientX - faceScreenX;
      const deltaY = clientY - faceScreenY;

      // Range calibration: reaches max turn angle at reasonable viewport distance
      const maxDistanceX = window.innerWidth * 0.55;
      const maxDistanceY = window.innerHeight * 0.55;

      const normX = Math.max(-1, Math.min(1, deltaX / maxDistanceX));
      const normY = Math.max(-1, Math.min(1, deltaY / maxDistanceY));

      targetGaze.current = { x: normX, y: normY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      calculateGazeVector(e.clientX, e.clientY);
      setCursorPixel({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        calculateGazeVector(touch.clientX, touch.clientY);
      }
    };

    // Device orientation for mobile/tablets
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.min(1, Math.max(-1, e.gamma / 30));
        const tiltY = Math.min(1, Math.max(-1, (e.beta - 45) / 30));
        targetGaze.current = { x: tiltX, y: tiltY };
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    // 60FPS fluid physics loop with organic damping (Lerp)
    const animate = () => {
      const factor = 0.09; // Silky smooth head inertia
      smoothedGaze.current.x += (targetGaze.current.x - smoothedGaze.current.x) * factor;
      smoothedGaze.current.y += (targetGaze.current.y - smoothedGaze.current.y) * factor;

      setGaze({
        x: smoothedGaze.current.x,
        y: smoothedGaze.current.y,
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // 3D head rotation & optical parallax
  // When cursor is to the right (gaze.x > 0), face turns right (rotateY > 0)
  // When cursor is to the left (gaze.x < 0), face turns left (rotateY < 0)
  // When cursor is above (gaze.y < 0), head tilts up (rotateX > 0)
  // When cursor is below (gaze.y > 0), head tilts down (rotateX < 0)
  const maxRotateY = 22; // Degrees of horizontal head turn
  const maxRotateX = 16; // Degrees of vertical head tilt
  const maxRotateZ = 4;  // Subtle biomechanical head roll
  const maxShiftX = 26;  // Horizontal parallax translation
  const maxShiftY = 18;  // Vertical parallax translation

  const rotateY = gaze.x * maxRotateY;
  const rotateX = -gaze.y * maxRotateX;
  const rotateZ = gaze.x * gaze.y * maxRotateZ;
  const shiftX = gaze.x * maxShiftX;
  const shiftY = gaze.y * maxShiftY;

  // Eye gaze catchlight & skin specular sheen offset
  const sheenOffsetX = 60 + gaze.x * 24;
  const sheenOffsetY = 36 + gaze.y * 22;

  // Degrees readout for the active tracking badge
  const displayYaw = Math.round(rotateY);
  const displayPitch = Math.round(-rotateX);

  return (
    <section
      ref={heroRef}
      onMouseEnter={() => setIsInsideHero(true)}
      onMouseLeave={() => setIsInsideHero(false)}
      className="relative w-full overflow-hidden bg-[#FAF6F3]"
      style={{ minHeight: '680px' }}
    >
      <div className="relative min-h-[660px] sm:min-h-[740px] lg:min-h-[820px] w-full flex items-center perspective-[1200px]">
        {/* 3D Interactive Portrait Layer: Woman's Face Follows Mouse Cursor */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main portrait container with transform-origin anchored at the model's head/face (around 62% X, 35% Y) */}
          <div
            className="w-full h-full relative will-change-transform"
            style={{
              transform: `scale(1.15) translate3d(${shiftX}px, ${shiftY}px, 0px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
              transformOrigin: '62% 35%',
              transition: 'transform 0.04s linear',
            }}
          >
            {/* The Model's High-Quality Glowing Skin Photo with multi-tier fallback */}
            <img
              src={currentImageSrc}
              alt="Lumière Rose Haute Skincare — Model with luminous radiant skin whose gaze follows cursor"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallbackTried1) {
                  target.dataset.fallbackTried1 = 'true';
                  target.src = './images/hero_model_glowing_skin_1791011022215.jpg';
                } else if (!target.dataset.fallbackTried2) {
                  target.dataset.fallbackTried2 = 'true';
                  target.src = '/images/hero_model_glowing_skin_1791011022215.jpg';
                } else if (!target.dataset.fallbackTried3) {
                  target.dataset.fallbackTried3 = 'true';
                  target.src = IMAGES.skincareLifestyle;
                }
              }}
              className={`w-full h-full object-cover object-[62%_28%] transition-opacity duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />

            {/* Dynamic Specular Light & Gaze Reflection Sheen: follows cursor across her face */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-opacity duration-300"
              style={{
                background: `radial-gradient(ellipse 420px 340px at ${sheenOffsetX}% ${sheenOffsetY}%, rgba(255, 240, 235, 0.65), rgba(255, 220, 215, 0.25) 45%, transparent 75%)`,
                opacity: 0.9,
              }}
            />

            {/* Fine ocular catchlight iris reflection tracking the gaze */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75"
              style={{
                background: `radial-gradient(circle 180px at ${sheenOffsetX}% ${sheenOffsetY}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
              }}
            />
          </div>
        </div>

        {/* Ambient Warm Gradient Scrim: ensures contrast for text on the left while keeping face luminous on the right */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2527]/95 via-[#2D2527]/55 to-transparent sm:bg-gradient-to-r sm:from-[#2D2527]/90 sm:via-[#2D2527]/50 sm:to-transparent pointer-events-none" />

        {/* Dynamic Gaze Tracking Indicator Badge */}
        <div className="absolute top-24 right-4 sm:right-8 z-20 flex items-center gap-2.5 bg-[#2D2527]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] text-white/95 shadow-xl pointer-events-none select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C2BA] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F9D6DC]"></span>
          </span>
          <Eye className="w-3.5 h-3.5 text-[#F9D6DC]" />
          <span className="font-sans font-medium tracking-wide">
            Face Tracking Active
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#E6C2BA] bg-white/10 px-2 py-0.5 rounded-md">
            Yaw {displayYaw > 0 ? `+${displayYaw}°` : `${displayYaw}°`} • Pitch {displayPitch > 0 ? `+${displayPitch}°` : `${displayPitch}°`}
          </span>
        </div>

        {/* Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl text-white space-y-6 sm:space-y-8">
            {/* Elegant Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F9D6DC] font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C2BA]" />
              <span>THE 2026 BOTANICAL HARVEST</span>
            </div>

            {/* Elegant & Large Text Overlay */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal leading-[1.06] tracking-tight text-white uppercase [text-wrap:balance]">
              REVEAL YOUR NATURAL GLOW.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#F2EAE7] font-light leading-relaxed max-w-xl">
              An alchemical union of organic French Damask Rose, cold-pressed olive squalane, and triple-molecular hyaluronic acid. Designed to awaken your skin’s inherent light.
            </p>

            {/* Prominent Call to Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopNow}
                className="btn-sweep btn-sweep-blush group px-9 py-4 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full shadow-xl flex items-center justify-center gap-3 cursor-pointer hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-[#B76E79] transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreGallery}
                className="btn-sweep btn-sweep-glass px-8 py-4 backdrop-blur-md border border-white/25 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>View Gallery</span>
              </button>
            </div>

            {/* Quiet trust credentials */}
            <div className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-[#E8D8D5] font-light tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C2BA]" />
                <span>100% Cruelty-Free & Vegan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C2BA]" />
                <span>Dermatologically Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C2BA]" />
                <span>Recyclable French Flacons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
