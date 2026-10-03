import React from 'react';
import { Sparkles, Flower2, Heart, Award } from 'lucide-react';

export const DualMarquee: React.FC = () => {
  const marqueeItemsRow1 = [
    'PURE DAMASK ROSE EXTRACT',
    'VOGUE BEAUTY AWARDS 2026',
    'CLINICALLY PROVEN CELLULAR REGENERATION',
    'HARVESTED IN GRASSE, FRANCE',
    '100% VEGAN & CRUELTY-FREE',
    'DERMATOLOGIST APPROVED FOR SENSITIVE COMPLEXIONS',
    'CLEAN FORMULATION • ZERO SYNTHETIC DYES',
  ];

  const marqueeItemsRow2 = [
    'REVEAL YOUR INHERENT GLOW',
    'PARIS • MILAN • TOKYO • NEW YORK',
    'BIOMIMETIC PEPTIDE COMPLEX',
    'COLD-PRESSED SQUALANE INFUSION',
    'ARTISAN RECYCLABLE GLASS FLACONS',
    'COMPLIMENTARY LUXURY SAMPLES WITH EVERY ORDER',
    'TRANSCENDENT BOTANICAL SKINCARE',
  ];

  return (
    <section className="w-full overflow-hidden border-y border-[#EEDDE0] bg-[#FAF3F3]/90 select-none py-4 space-y-3">
      {/* Track 1: Moving to the Left */}
      <div className="relative overflow-hidden w-full py-1">
        <div className="animate-marquee-left flex items-center gap-8 text-xs sm:text-sm font-serif italic tracking-[0.2em] text-[#5A484C] uppercase">
          {[...marqueeItemsRow1, ...marqueeItemsRow1].map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="hover:text-[#B76E79] transition-colors">{item}</span>
              <Flower2 className="w-3.5 h-3.5 text-[#D4A396] shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Thin elegant separator */}
      <div className="w-full border-t border-[#F2E5E8]/80" />

      {/* Track 2: Moving to the Right */}
      <div className="relative overflow-hidden w-full py-1">
        <div className="animate-marquee-right flex items-center gap-8 text-xs sm:text-sm font-sans tracking-[0.25em] text-[#7A6B6F] uppercase font-light">
          {[...marqueeItemsRow2, ...marqueeItemsRow2].map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="hover:text-[#2D2527] transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A396] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
