import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Instagram, ArrowUpRight, Heart } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const InstagramFeed: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const posts = [
    {
      id: 'ugc-1',
      handle: '@celine.beautydiary',
      likes: '1.4k',
      image: IMAGES.heroModel,
      caption: 'The way the Rose Nectar catches the morning sun. Zero filters needed ✨',
    },
    {
      id: 'ugc-2',
      handle: '@parisian_minimalist',
      likes: '2.1k',
      image: IMAGES.serumBottle,
      caption: 'My vanity staple for 2026. The glass flacon is pure sculpture.',
    },
    {
      id: 'ugc-3',
      handle: '@eva_radiance',
      likes: '980',
      image: IMAGES.skincareLifestyle,
      caption: 'Evening barrier therapy ritual with the Velours Crème ☁️',
    },
    {
      id: 'ugc-4',
      handle: '@atelier.rose',
      likes: '3.2k',
      image: IMAGES.makeupLifestyle,
      caption: 'Satin lip oil layered over velvet pencil. That rose gold sheen...',
    },
    {
      id: 'ugc-5',
      handle: '@botanical_apothecary',
      likes: '1.8k',
      image: IMAGES.botanicalStory,
      caption: 'Cold-pressed Damask roses and raw botanicals in progress.',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium mb-1">
            <Instagram className="w-3.5 h-3.5 text-[#D4A396]" />
            <span>COMMUNITY & CREATORS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#2D2527] uppercase">
            @LUMIEREROSE ON INSTAGRAM
          </h2>
          <p className="text-xs sm:text-sm text-[#736366] font-light mt-1">
            Tag <strong className="text-[#2D2527]">#LumiereGlow</strong> on Instagram to be featured in our Parisian lookbook.
          </p>
        </div>

        {/* Arrow Scroll Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="btn-sweep btn-sweep-outline w-9 h-9 rounded-full border border-[#E8D4D8] flex items-center justify-center cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="btn-sweep btn-sweep-outline w-9 h-9 rounded-full border border-[#E8D4D8] flex items-center justify-center cursor-pointer shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 snap-x snap-mandatory"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative w-64 sm:w-72 aspect-square rounded-3xl overflow-hidden bg-neutral-100 shadow-sm border border-[#EDE1DD] shrink-0 snap-start cursor-pointer"
          >
            <img
              src={post.image}
              alt={post.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Hover Scrim & Caption */}
            <div className="absolute inset-0 bg-[#2D2527]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#F9D6DC] font-medium">{post.handle}</span>
                <span className="flex items-center gap-1 text-[11px] text-white/90">
                  <Heart className="w-3.5 h-3.5 fill-[#F9D6DC] text-[#F9D6DC]" />
                  {post.likes}
                </span>
              </div>

              <p className="text-xs text-[#F2EAE7] font-light leading-snug line-clamp-3">
                {post.caption}
              </p>

              <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#FCE7EC] font-bold">
                <span>View on Instagram</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
