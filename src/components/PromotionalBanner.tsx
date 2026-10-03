import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, Gift } from 'lucide-react';

interface PromotionalBannerProps {
  onClaimOffer: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onClaimOffer }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'GLOW20';

  const handleCopy = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-gradient-to-r from-[#FDF2F4] via-[#FCECEF] to-[#FAF5F0] border border-[#F2DEE2] p-6 sm:p-10 md:p-12 shadow-sm">
        {/* Subtle decorative background aura */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#F5D8DE]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#EBDAD2]/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Column: Offer Details */}
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Small "Limited Time Offer" Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE0E5] text-[#9A515D] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase border border-[#F2CBD2]">
              <Sparkles className="w-3 h-3 text-[#B76E79]" />
              <span>Limited Time Offer</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2D2527] leading-[1.1]">
              20% OFF YOUR FIRST ORDER
            </h2>

            <p className="text-xs sm:text-sm text-[#665457] leading-relaxed max-w-xl font-light">
              Experience the restorative power of French botanical skincare. Apply privilege code <strong className="font-semibold text-[#2D2527]">{promoCode}</strong> during checkout, plus enjoy complimentary standard shipping on all orders over $50.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-[#8C7A7E]">
              <span className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#B76E79]" />
                <span>Complimentary luxury gift box</span>
              </span>
              <span>•</span>
              <span>Valid for all new skincare & makeup rituals</span>
            </div>
          </div>

          {/* Right Column: Interactive Code & CTA Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3.5 w-full sm:w-auto shrink-0">
            {/* Click to Copy Coupon Chip */}
            <button
              onClick={handleCopy}
              className="btn-sweep btn-sweep-outline w-full sm:w-auto px-5 py-3 rounded-2xl border border-[#E8D4D8] flex items-center justify-between gap-3 text-xs tracking-wider uppercase font-semibold shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#B76E79]" />
                <span>Code: <span className="font-mono font-bold text-sm tracking-widest text-[#B76E79]">{promoCode}</span></span>
              </div>
              <span className="text-[11px] font-normal flex items-center gap-1">
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </span>
            </button>

            {/* CTA Button */}
            <button
              onClick={onClaimOffer}
              className="btn-sweep btn-sweep-dark w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium rounded-2xl shadow-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Shop With 20% Off</span>
              <ArrowRight className="w-4 h-4 text-[#E6C2BA]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
