import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Heart,
  ChevronRight,
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onNavigateSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#FAF2F2] border-b border-[#F2DFE2] text-[#4A3E41] text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4A396]" />
        <span>Complimentary Rose Scented Deluxe Sample & Free Shipping on Orders Over $50</span>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E4E6] shadow-xs'
            : 'bg-[#FFFDF9] border-b border-[#F7ECEE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* 1. Left Zone: Brand Logo (Always visible on all screens) */}
            <div className="flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col focus-visible:outline-hidden"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4A396] transition-transform duration-300 group-hover:scale-125" />
                  <span className="font-serif text-2xl sm:text-3xl font-medium tracking-widest text-[#2D2527] uppercase">
                    LUMIÈRE ROSE
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.28em] text-[#8C7A7E] uppercase font-light pl-4 -mt-1">
                  Haute Botanique • Paris
                </span>
              </a>
            </div>

            {/* 2. Center Zone: Desktop Navigation Links (Hidden on tablets & mobile <lg) */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-semibold text-[#4A3E41]">
              <button
                onClick={() => handleLinkClick('shop')}
                className="hover:text-[#B76E79] transition-colors py-2 relative group focus:outline-hidden cursor-pointer"
              >
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A396] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => handleLinkClick('skincare')}
                className="hover:text-[#B76E79] transition-colors py-2 relative group focus:outline-hidden cursor-pointer"
              >
                Skincare
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A396] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => handleLinkClick('makeup')}
                className="hover:text-[#B76E79] transition-colors py-2 relative group focus:outline-hidden cursor-pointer"
              >
                Makeup
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A396] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => handleLinkClick('gallery')}
                className="hover:text-[#B76E79] transition-colors py-2 relative group focus:outline-hidden cursor-pointer flex items-center gap-1.5"
              >
                <span>Gallery</span>
                <span className="text-[9px] bg-[#F7E1E5] text-[#9A515D] font-bold px-1.5 py-0.2 rounded-full">
                  Sticky
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A396] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className="hover:text-[#B76E79] transition-colors py-2 relative group focus:outline-hidden cursor-pointer"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A396] transition-all duration-200 group-hover:w-full" />
              </button>
              <button
                onClick={() => handleLinkClick('blog')}
                className="hover:text-[#B76E79] transition-colors py-2 relative group focus:outline-hidden cursor-pointer"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A396] transition-all duration-200 group-hover:w-full" />
              </button>
            </nav>

            {/* 3. Right Zone on Desktop: User Icons (Search, Account, Cart) */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={onOpenSearch}
                aria-label="Search collection"
                className="p-2 text-[#4A3E41] hover:text-[#B76E79] hover:bg-[#FDF2F4] rounded-full transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenAccount}
                aria-label="User Account"
                className="p-2 text-[#4A3E41] hover:text-[#B76E79] hover:bg-[#FDF2F4] rounded-full transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenCart}
                aria-label={`Shopping Cart (${cartCount})`}
                className="relative p-2.5 text-[#2D2527] hover:bg-[#FDF2F4] rounded-full transition-colors cursor-pointer flex items-center"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#B76E79] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Tablet & Mobile: ONLY the logo is outside; the hamburger button opens the complete menu containing all functions */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                className="p-2.5 text-[#2D2527] hover:bg-[#FDF2F4] rounded-xl transition-colors cursor-pointer border border-[#EEDDE0]"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Slide-Over Menu for Tablets and Mobile Devices */}
      {/* (All menu functions, search, account, cart, categories, and links are contained inside) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#2D2527]/50 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <div
          className={`fixed inset-y-0 right-0 max-w-sm sm:max-w-md w-full bg-[#FFFDF9] shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out border-l border-[#F0E4E6] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#F0E4E6] flex items-center justify-between bg-[#FDF9F9]">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-medium tracking-widest text-[#2D2527] uppercase">
                LUMIÈRE ROSE
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#8C7A7E] uppercase font-light">
                Haute Skincare & Cosmetics
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation"
              className="p-2 text-[#4A3E41] hover:text-[#2D2527] hover:bg-[#F7ECEE] rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Function Contained Inside Menu */}
          <div className="p-6 pb-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#FAF5F2] hover:bg-[#F5EDE8] rounded-2xl text-[#6D5D61] text-xs uppercase tracking-wider font-medium border border-[#EFE4E0] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#D4A396]" />
              <span>Search Serums, Lip Oils, Creams...</span>
            </button>
          </div>

          {/* Primary Navigation Links Contained Within Menu */}
          <div className="px-6 py-2 flex-1 space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B5A4A7] px-2 py-2">
              Collections & Curations
            </div>

            <button
              onClick={() => handleLinkClick('shop')}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[#2D2527] hover:bg-[#FDF2F4] text-sm uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>Shop All Formulations</span>
              <ChevronRight className="w-4 h-4 text-[#D4A396]" />
            </button>

            <button
              onClick={() => handleLinkClick('skincare')}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[#2D2527] hover:bg-[#FDF2F4] text-sm uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>Skincare (Radiance & Hydration)</span>
              <ChevronRight className="w-4 h-4 text-[#D4A396]" />
            </button>

            <button
              onClick={() => handleLinkClick('makeup')}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[#2D2527] hover:bg-[#FDF2F4] text-sm uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>Makeup (Rose Gold Pigments)</span>
              <ChevronRight className="w-4 h-4 text-[#D4A396]" />
            </button>

            <button
              onClick={() => handleLinkClick('gallery')}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-[#FCEDF0] text-[#9A515D] text-sm uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>Sticky Visual Gallery</span>
                <span className="text-[9px] bg-white text-[#9A515D] px-2 py-0.5 rounded-full font-sans font-bold">
                  6 Photos
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9A515D]" />
            </button>

            <button
              onClick={() => handleLinkClick('about')}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[#2D2527] hover:bg-[#FDF2F4] text-sm uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>About & Botanical Story</span>
              <ChevronRight className="w-4 h-4 text-[#D4A396]" />
            </button>

            <button
              onClick={() => handleLinkClick('blog')}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[#2D2527] hover:bg-[#FDF2F4] text-sm uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <span>Beauty Blog & Journal</span>
              <ChevronRight className="w-4 h-4 text-[#D4A396]" />
            </button>
          </div>

          {/* User Functions Contained Inside Menu (Cart & Account) */}
          <div className="p-6 border-t border-[#F0E4E6] bg-[#FCF8F7] space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B5A4A7] px-1">
              Your Member Services
            </div>

            <div className="flex gap-2.5">
              {/* Cart Button inside Menu */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="btn-sweep btn-sweep-dark flex-1 py-3 px-4 rounded-2xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#E6C2BA]" />
                <span>Bag ({cartCount})</span>
              </button>

              {/* Account Button inside Menu */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="btn-sweep btn-sweep-outline py-3 px-4 border border-[#E8D8D5] rounded-2xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4 text-[#D4A396]" />
                <span>Account</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-[#7A6B6F] text-center font-serif italic">
              «Clean luxury, clinical botany, effortless radiance.»
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
