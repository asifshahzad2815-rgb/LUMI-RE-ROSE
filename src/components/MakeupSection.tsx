import React from 'react';
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';
import { MAKEUP_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface MakeupSectionProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

export const MakeupSection: React.FC<MakeupSectionProps> = ({
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <section id="makeup" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#F2E5E8]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A396]" />
            <span>COUTURE ROSE GOLD PIGMENTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D2527] uppercase">
            MAKEUP & GLOW ATELIER
          </h2>
          <p className="text-xs sm:text-sm text-[#736366] max-w-xl font-light">
            Weightless satin lip oils, sheer cheek flushes, and glass skin highlighters designed to enhance, never mask, your natural radiance.
          </p>
        </div>

        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7A7E] border border-[#E8D4D8] px-4 py-2 rounded-full self-start sm:self-auto bg-[#FAF4F5]">
          Breathable Satin Formulas
        </span>
      </div>

      {/* Makeup Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {MAKEUP_PRODUCTS.map((product) => {
          const favorited = isWishlisted(product.id);

          return (
            <div
              key={product.id}
              className="group bg-[#FAF6F3] rounded-3xl p-6 sm:p-7 border border-[#EFE5E2] hover:border-[#D4A396]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] px-2.5 py-1 rounded-full bg-white text-[#9A515D] border border-[#F0D5DA] shadow-2xs">
                    {product.badge || 'Makeup'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onQuickView(product)}
                      title="Quick Look"
                      className="btn-sweep btn-sweep-outline w-8 h-8 rounded-full flex items-center justify-center border border-[#EAD7DA] shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleWishlist(product)}
                      title="Wishlist"
                      className={`btn-sweep w-8 h-8 rounded-full flex items-center justify-center border shadow-2xs cursor-pointer ${
                        favorited
                          ? 'bg-[#FDF0F3] border-[#F2CBD2] text-[#B76E79]'
                          : 'btn-sweep-outline border-[#EAD7DA] text-[#665457]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-[#B76E79]' : ''}`} />
                    </button>
                  </div>
                </div>

                <div
                  onClick={() => onQuickView(product)}
                  className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white/70 p-3 mb-4 cursor-pointer flex items-center justify-center border border-[#F0E5E2] group-hover:bg-white transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="text-[11px] text-[#B76E79] font-serif italic mb-1">
                  {product.frenchName}
                </div>

                <h3
                  onClick={() => onQuickView(product)}
                  className="font-serif text-xl font-normal text-[#2D2527] tracking-tight group-hover:text-[#B76E79] transition-colors cursor-pointer leading-snug"
                >
                  {product.name}
                </h3>

                <p className="text-xs text-[#827174] mt-1 font-light line-clamp-2">
                  {product.tagline}
                </p>

                <div className="flex items-center gap-1.5 mt-3 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                  <span className="font-bold text-[#2D2527] tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[#8C7A7E] font-light">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EDE1DD] flex items-center justify-between gap-2">
                <span className="font-serif text-2xl font-medium text-[#2D2527] tabular-nums">
                  ${product.price}
                </span>

                <button
                  onClick={() => onAddToCart(product)}
                  className="btn-sweep btn-sweep-dark px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
