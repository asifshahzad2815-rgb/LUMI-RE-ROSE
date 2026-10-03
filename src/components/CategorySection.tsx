import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORY_CARDS } from '../data/mockData';

interface CategorySectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium mb-1.5">
            <span>THE THREE PILLARS</span>
            <span>•</span>
            <span>BEAUTY ATELIER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D2527] uppercase">
            EXPLORE CATEGORIES
          </h2>
          <p className="text-xs sm:text-sm text-[#736366] max-w-xl font-light mt-1">
            Immerse yourself in our conscious sensory rituals, from cellular skincare to couture rose gold tints.
          </p>
        </div>

        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7A7E] border border-[#E8D4D8] px-4 py-2 rounded-full self-start sm:self-auto bg-[#FAF4F5]">
          3 Signature Worlds
        </span>
      </div>

      {/* Row of 3 Large Rounded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {CATEGORY_CARDS.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.title)}
            className="group relative min-h-[420px] sm:min-h-[480px] rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#2D2527] shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl flex flex-col justify-between p-7 sm:p-9 border border-[#EADCE0]"
          >
            {/* Lifestyle Image Background */}
            <img
              src={cat.image}
              alt={cat.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Measured Scrim Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2527]/90 via-[#2D2527]/40 to-[#2D2527]/20 transition-opacity duration-300 group-hover:opacity-85" />

            {/* Top Bar: Item Count & Arrow Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono tracking-wider text-[#FCE7EC] bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase">
                {cat.itemCount}
              </span>

              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#FCE7EC] group-hover:text-[#2D2527] group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Content: Category Title & Subtitle */}
            <div className="relative z-10 space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white uppercase tracking-tight">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#E8D8D5] font-light leading-relaxed max-w-xs">
                {cat.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-[#FCE7EC] font-medium group-hover:text-white transition-colors">
                <span>Discover Collection</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
