import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';

interface StickyGalleryProps {
  onSelectImage?: (item: GalleryItem) => void;
}

export const StickyGallery: React.FC<StickyGalleryProps> = ({ onSelectImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled relative to the viewport
      const totalScrollableDistance = containerHeight - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);

      // Determine active index based on progress (0 to 5)
      const currentIndex = Math.min(
        GALLERY_ITEMS.length - 1,
        Math.floor(clampedProgress * GALLERY_ITEMS.length)
      );
      setActiveImageIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Manual nudge functions for clicking left/right
  const handleManualNudge = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const step = (containerRef.current.offsetHeight - window.innerHeight) / (GALLERY_ITEMS.length - 1);
    const targetScroll =
      direction === 'right'
        ? window.scrollY + step
        : window.scrollY - step;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Calculate percentage of track shift
  // For 6 images, shifting across ~75% of the track displays all 6 cards
  const translateXPercent = scrollProgress * 78;

  return (
    <div
      id="gallery"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#FAF5F2]"
    >
      {/* Sticky Viewport Container: stays pinned at top while user scrolls vertically */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-8 border-y border-[#EADCE0]">
        {/* Gallery Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A396]" />
              <span>THE VISUAL ATELIER</span>
              <span>•</span>
              <span>STICKY SCROLL HORIZONTAL</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D2527] uppercase">
              EDITORIAL GALLERY (6 WORKS)
            </h2>
            <p className="text-xs sm:text-sm text-[#736366] font-light mt-1">
              Scroll down to glide horizontally through our six visual stories, capturing the essence of botanical luxury.
            </p>
          </div>

          {/* Interactive Navigation Controls & Scroll Progress */}
          <div className="flex items-center gap-4 self-start sm:self-auto">
            {/* Progress Counter */}
            <div className="text-xs font-mono font-bold text-[#8C7A7E] tracking-wider uppercase bg-white/80 px-3 py-1.5 rounded-full border border-[#E8D4D8]">
              <span>Image {activeImageIndex + 1} of {GALLERY_ITEMS.length}</span>
            </div>

            {/* Manual Left/Right buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleManualNudge('left')}
                aria-label="Previous Gallery Image"
                className="btn-sweep btn-sweep-outline w-10 h-10 rounded-full border border-[#E8D4D8] flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualNudge('right')}
                aria-label="Next Gallery Image"
                className="btn-sweep btn-sweep-outline w-10 h-10 rounded-full border border-[#E8D4D8] flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Track containing all 6 Images */}
        <div className="w-full overflow-hidden my-auto py-4">
          <div
            ref={trackRef}
            style={{
              transform: `translate3d(-${translateXPercent}%, 0px, 0px)`,
              transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="flex items-center gap-6 sm:gap-8 pl-4 sm:pl-8 w-max will-change-transform"
          >
            {GALLERY_ITEMS.map((item, index) => {
              const isCurrent = activeImageIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectImage?.(item)}
                  className={`group relative w-[290px] sm:w-[380px] md:w-[460px] lg:w-[500px] h-[380px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden bg-white shadow-md border transition-all duration-500 cursor-pointer shrink-0 flex flex-col justify-between p-6 sm:p-7 ${
                    isCurrent
                      ? 'border-[#B76E79] shadow-2xl ring-2 ring-[#B76E79]/20'
                      : 'border-[#EDE1DD] hover:border-[#D4A396]'
                  }`}
                >
                  {/* Photo background */}
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2527]/90 via-[#2D2527]/30 to-transparent transition-opacity duration-300 group-hover:opacity-85" />

                  {/* Top Bar with Tag and Number */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-[11px] font-bold tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-serif italic text-[#FCE7EC] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Captions & French Title */}
                  <div className="relative z-10 space-y-1.5 text-white">
                    <div className="text-xs font-serif italic text-[#E6C2BA]">
                      {item.frenchTitle}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white uppercase">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F0E4E6] font-light leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-[#FCE7EC] group-hover:text-white transition-colors">
                      <span>View Closer</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Bar & Horizontal Dots */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20 pt-2 border-t border-[#EDE1DD]">
          <div className="flex items-center gap-2">
            {GALLERY_ITEMS.map((_, i) => (
              <div
                key={`dot-${i}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImageIndex === i
                    ? 'w-8 bg-[#B76E79]'
                    : 'w-2 bg-[#D8C7C9]'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-[#8C7A7E] font-light">
            <span className="hidden sm:inline">Keep scrolling to unstick & explore brand philosophy</span>
            <span className="sm:hidden">Scroll to unstick</span>
          </div>
        </div>
      </div>
    </div>
  );
};
