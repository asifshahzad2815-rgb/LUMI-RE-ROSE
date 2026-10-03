import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section id="shop" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium">
            <span>MOST COVETED BOTANICALS</span>
            <span>•</span>
            <span>PARISIAN ATELIER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D2527] uppercase">
            BESTSELLERS
          </h2>
          <p className="text-xs sm:text-sm text-[#736366] max-w-xl font-light">
            Award-winning elixirs, velvet creams, and satin lip oils celebrated by dermatologists and beauty editors worldwide.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#8C7A7E] font-medium tracking-wider uppercase bg-[#FAF2F4] px-4 py-2 rounded-full border border-[#F2DEE2]">
          <span>Curated 4 Cult Formulations</span>
        </div>
      </div>

      {/* Grid of 4 Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {products.slice(0, 4).map((product) => {
          const isAdded = addedIds[product.id];
          const favorited = isWishlisted(product.id);

          return (
            <div
              key={product.id}
              className="group bg-[#FAF6F3] rounded-3xl p-5 sm:p-6 border border-[#EFE5E2] hover:border-[#D4A396]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Top Badge & Action Icons */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] px-2.5 py-1 rounded-full bg-white text-[#9A515D] border border-[#F0D5DA] shadow-2xs">
                    {product.badge || product.category}
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
                      title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
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

                {/* High-quality Product Cutout Image on Soft Pastel Background */}
                <div
                  onClick={() => onQuickView(product)}
                  className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white/70 p-3 mb-4 cursor-pointer flex items-center justify-center border border-[#F0E5E2] group-hover:bg-white transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] tracking-wider uppercase font-medium bg-white/90 backdrop-blur-xs text-[#2D2527] px-2 py-0.5 rounded shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Quick View
                  </div>
                </div>

                {/* Subtitle & French Heritage Name */}
                <div className="text-[11px] text-[#B76E79] font-serif italic mb-1">
                  {product.frenchName}
                </div>

                {/* Product Name */}
                <h3
                  onClick={() => onQuickView(product)}
                  className="font-serif text-lg sm:text-xl font-normal text-[#2D2527] tracking-tight group-hover:text-[#B76E79] transition-colors cursor-pointer leading-snug"
                >
                  {product.name}
                </h3>

                {/* Volume / Tagline */}
                <p className="text-xs text-[#827174] mt-1 font-light line-clamp-2">
                  {product.tagline}
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span className="font-bold text-[#2D2527] tabular-nums ml-1">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[#D4A396]">•</span>
                  <span className="text-[#8C7A7E] font-light">
                    {product.reviewsCount} reviews
                  </span>
                </div>
              </div>

              {/* Bottom Row: Price & Add to Cart Button */}
              <div className="mt-5 pt-4 border-t border-[#EDE1DD] flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-xl sm:text-2xl font-medium text-[#2D2527] tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#A8989B] line-through font-light tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`btn-sweep px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'btn-sweep-dark'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
