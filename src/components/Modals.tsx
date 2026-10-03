import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Sparkles,
  Check,
  User,
  Package,
  Award,
  Leaf,
  Droplets,
} from 'lucide-react';
import { Product } from '../types';

// 1. SEARCH MODAL
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.frenchName.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.keyIngredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase())) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  const popularSearches = ['Damask Rose', 'Squalane Serum', 'Velours Crème', 'Lip Oil', 'Glow', 'Moisturizer'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-start">
      <div onClick={onClose} className="fixed inset-0 bg-[#2D2527]/60 backdrop-blur-xs transition-opacity" />

      <div className="relative z-10 w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#F0E4E6] overflow-hidden animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F0E4E6] flex items-center gap-3 bg-[#FCF8F7]">
          <Search className="w-5 h-5 text-[#B76E79] shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search serums, creams, lip oils, ingredients..."
            className="flex-1 text-sm sm:text-base font-light text-[#2D2527] placeholder-[#A08E92] focus:outline-hidden bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#8C7A7E] hover:text-[#2D2527]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-sweep btn-sweep-outline text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-[#E8D8D5] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 bg-[#FAF5F2] border-b border-[#EDE1DD] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C7A7E] shrink-0">
            Suggested:
          </span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="btn-sweep btn-sweep-pill text-xs border border-[#E0CFD3] px-3 py-1 rounded-full shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C7A7E] px-1">
            {query.trim() ? `Formulations Found (${filtered.length})` : 'Curated Bestsellers'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-serif text-[#2D2527]">
                No botanical formulations found for “{query}”
              </p>
              <p className="text-xs text-[#8C7A7E] font-light">
                Try searching for “rose”, “serum”, “lip oil”, or “cream”.
              </p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group flex items-center gap-4 p-3 hover:bg-[#FAF4F5] rounded-2xl border border-transparent hover:border-[#F0D5DA] transition-all cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#E8D8D5] bg-white shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[#B76E79] font-serif italic">
                    {product.frenchName}
                  </div>
                  <h4 className="font-serif text-sm font-medium text-[#2D2527] truncate group-hover:text-[#B76E79]">
                    {product.name}
                  </h4>
                  <div className="text-xs text-[#8C7A7E] font-light line-clamp-1">
                    {product.tagline}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-serif text-base font-medium text-[#2D2527] tabular-nums">
                    ${product.price}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B76E79]">
                    View Flacon →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// 2. PRODUCT DETAIL MODAL
interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-10 flex justify-center items-center">
      <div onClick={onClose} className="fixed inset-0 bg-[#2D2527]/60 backdrop-blur-xs transition-opacity" />

      <div className="relative z-10 w-full max-w-4xl bg-[#FFFDF9] rounded-3xl sm:rounded-[36px] shadow-2xl border border-[#F0E4E6] overflow-hidden animate-fadeIn my-auto max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#FCE7EC] text-[#2D2527] flex items-center justify-center shadow-md transition-colors cursor-pointer border border-[#E8D8D5]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Product Photo & Flacon Details */}
          <div className="md:col-span-6 bg-[#FAF5F2] p-6 sm:p-10 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-[#EFE5E2]">
            <div className="w-full flex items-center justify-between text-xs text-[#8C7A7E]">
              <span className="font-mono tracking-widest uppercase">{product.volume}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#9A515D] text-[10px] font-bold uppercase border border-[#F0D5DA]">
                {product.badge || 'Haute Botanique'}
              </span>
            </div>

            <div className="w-full my-6 aspect-4/3 rounded-2xl overflow-hidden bg-white shadow-sm border border-[#E8D8D5]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="w-full text-center text-xs text-[#7A6B6F] font-serif italic pt-2 border-t border-[#E8D8D5]/80">
              «Pure Grasse Damask Rose • Distilled at First Light»
            </div>
          </div>

          {/* Right Column: Information, Key Ingredients & Add to Cart */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-serif italic text-[#B76E79]">
                  {product.frenchName}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2D2527] tracking-tight uppercase mt-0.5">
                  {product.name}
                </h3>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between py-2 border-y border-[#EDE1DD]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-[#2D2527] tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#A8989B] line-through font-light tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  <span className="font-bold text-[#2D2527] tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[#8C7A7E] font-light">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#665457] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Key Bio-Active Ingredients */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A7E] block mb-2">
                  Active Clinical Botanicals
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.keyIngredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1 bg-[#FAF2F4] text-[#7A4E56] rounded-full text-xs font-medium border border-[#F2DEE2]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Benefits */}
              <div className="p-3.5 bg-[#FAF6F3] rounded-2xl border border-[#EDE1DD] space-y-1.5 text-xs text-[#5A484C]">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 font-light">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#EDE1DD] space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className={`btn-sweep flex-1 py-4 px-6 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] ${
                    added
                      ? 'bg-emerald-800 text-white'
                      : 'btn-sweep-dark'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#E6C2BA]" />
                      <span>Add to Bag • ${product.price}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist"
                  className={`btn-sweep w-14 rounded-full border flex items-center justify-center cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#FDF0F3] border-[#F2CBD2] text-[#B76E79]'
                      : 'btn-sweep-outline border-[#E0CFD3] text-[#665457]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#B76E79]' : ''}`} />
                </button>
              </div>

              <div className="text-[11px] text-[#8C7A7E] text-center font-light">
                Complimentary luxury samples & gift wrapping included automatically.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. ACCOUNT MODAL
interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center">
      <div onClick={onClose} className="fixed inset-0 bg-[#2D2527]/60 backdrop-blur-xs" />

      <div className="relative z-10 w-full max-w-md bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F0E4E6] animate-fadeIn space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E4E6]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF2F4] text-[#B76E79] font-serif text-lg font-medium flex items-center justify-center border border-[#F0D5DA]">
              {userName.charAt(0) || 'L'}
            </div>
            <div>
              <h4 className="font-serif text-lg font-normal text-[#2D2527] uppercase">
                {userName || 'Lumière Patron'}
              </h4>
              <span className="text-xs text-[#8C7A7E] font-light">
                Tier: <strong className="text-[#B76E79] font-semibold">Rose Gold Privilège</strong>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#7A6B6F] hover:text-[#2D2527] rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Petal Points Balance */}
        <div className="p-5 rounded-2xl bg-[#FAF5F2] border border-[#EDE1DD] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8C7A7E]">
            <span className="uppercase tracking-wider">Rose Petal Loyalty Points</span>
            <Sparkles className="w-4 h-4 text-[#D4A396]" />
          </div>
          <div className="font-serif text-3xl font-medium text-[#2D2527] tabular-nums">
            450 Petals
          </div>
          <p className="text-[11px] text-[#7A6B6F] font-light">
            Redeemable for complimentary deluxe flacons and private Grasse harvest previews.
          </p>
        </div>

        {/* Order History */}
        <div className="space-y-2 text-xs">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A7E]">
            Recent Atelier Dispatches
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-[#E8D8D5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#B76E79]" />
              <div>
                <span className="font-medium text-[#2D2527] block">Order #LR-84920</span>
                <span className="text-[#8C7A7E] text-[11px]">Cellulaire Rose Droplets • Dispatched</span>
              </div>
            </div>
            <span className="text-emerald-800 font-bold text-[11px]">Delivered</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-sweep btn-sweep-dark w-full py-3.5 font-medium text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-md"
        >
          Close Member View
        </button>
      </div>
    </div>
  );
};
