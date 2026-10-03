import React from 'react';
import { Star, Quote, Award, Sparkles, CheckCircle2, Leaf } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { IMAGES } from '../assets/images';

export const BrandStorySection: React.FC = () => {
  const currentTestimonial = TESTIMONIALS[0];

  return (
    <section id="about" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Split-Screen Layout: Ingredients Photo on one side, Testimonial & Philosophy on other */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
        {/* Left Column: Photo of Botanical Product Ingredients */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#EADCE0] aspect-4/3 sm:aspect-5/4 group bg-[#FAF5F2]">
            <img
              src={IMAGES.botanicalStory}
              alt="Lumière Rose botanical ingredients: organic Damask rose petals, cold-pressed squalane, and bio-fermented botanicals"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/images/botanical_ingredients_story_1791011102426.jpg';
              }}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2527]/75 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FCE7EC] bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/25">
                ORGANIC DAMASK ROSE HARVEST • GRASSE
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Wild Botanicals Distilled at Dawn
              </h4>
            </div>
          </div>

          {/* Floating Organic Certification Card */}
          <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#EFE2E5] max-w-[240px] text-xs text-[#2D2527] space-y-1 hidden sm:block z-20">
            <div className="flex items-center gap-2 text-[#B76E79] font-bold">
              <Leaf className="w-4 h-4" />
              <span>Bio-Active Purity</span>
            </div>
            <p className="text-[11px] text-[#7A6B6F] font-light leading-snug">
              Cold-pressed under 28°C to preserve 100% of essential bio-flavonoids.
            </p>
          </div>
        </div>

        {/* Right Column: Customer Testimonial & Brand Philosophy Text */}
        <div className="lg:col-span-6 space-y-8">
          {/* Brand Philosophy Text */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A396]" />
              <span>OUR BOTANICAL PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D2527] leading-[1.15]">
              Formulated With Reverence For Natural Radiance
            </h2>

            <p className="text-sm sm:text-base text-[#665457] leading-relaxed font-light">
              At Lumière Rose, we believe true luxury lies in uncompromising ingredient integrity. We reject synthetic silicones, filler waxes, and artificial fragrance in favor of pure, nutrient-dense French botanical essences that communicate directly with your skin cells.
            </p>
          </div>

          {/* Customer Testimonial Box */}
          <div className="bg-[#FAF5F2] rounded-3xl p-6 sm:p-8 border border-[#EFE4E0] shadow-sm relative space-y-4">
            <Quote className="w-8 h-8 text-[#D4A396] opacity-60 absolute top-6 right-6" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
              ))}
              <span className="text-xs text-[#7A6B6F] font-medium ml-2 uppercase tracking-wider">
                5.0 Verified Review
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-base sm:text-lg italic text-[#2D2527] leading-relaxed">
              {currentTestimonial.quote}
            </p>

            {/* Author Credit */}
            <div className="pt-2 border-t border-[#EDE1DD] flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-[#2D2527]">
                  {currentTestimonial.author}
                </div>
                <div className="text-xs text-[#8C7A7E] font-light">
                  {currentTestimonial.role}
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified Buyer</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
