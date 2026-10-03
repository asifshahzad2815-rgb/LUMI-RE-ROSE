import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DualMarquee } from './components/DualMarquee';
import { PromotionalBanner } from './components/PromotionalBanner';
import { FeaturedProducts } from './components/FeaturedProducts';
import { SkincareSection } from './components/SkincareSection';
import { CategorySection } from './components/CategorySection';
import { MakeupSection } from './components/MakeupSection';
import { StickyGallery } from './components/StickyGallery';
import { BrandStorySection } from './components/BrandStorySection';
import { BlogSection } from './components/BlogSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderCardModal } from './components/OrderCardModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { SearchModal, ProductDetailModal, AccountModal } from './components/Modals';
import { BESTSELLER_PRODUCTS } from './data/mockData';
import { Product, CartItem, GalleryItem } from './types';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  // 1. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumiererose_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        product: BESTSELLER_PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumiererose_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [BESTSELLER_PRODUCTS[0].id];
  });

  // 3. User Name
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('lumiererose_user') || 'Camille Laurent';
  });

  // 4. Modal Open States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 5. Order Card Form Modal (Triggered by "Add to Cart")
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // 6. Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('lumiererose_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('lumiererose_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Configure "Add to Cart" to open the Order Form where the user enters card details!
  const handleOpenOrderForm = (product: Product) => {
    setOrderModalProduct(product);
    setIsOrderModalOpen(true);
  };

  // Order Success from the Card Form
  const handleOrderSuccess = (orderId: string, product: Product, quantity: number, total: number) => {
    // Also record into cart history
    setCart((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity }];
    });

    showToast(`Order #${orderId} confirmed! $${total} authorized on card.`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Added «${product.name}» to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  // Smooth scroll utility for navigation menu items
  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      const navOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2D2527] font-sans selection:bg-[#FCE7EC] selection:text-[#2D2527]">
      {/* 1. Header: Minimalist Navbar with only logo outside on tablet/mobile */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Model with Glowing Skin + "REVEAL YOUR NATURAL GLOW." + "Shop Now" */}
        <HeroSection
          onShopNow={() => scrollToSection('shop')}
          onExploreGallery={() => scrollToSection('gallery')}
        />

        {/* Marquee Section: Elements move one to the right and one to the left */}
        <DualMarquee />

        {/* 3. Promotional Ad Banner: Special offer "20% OFF YOUR FIRST ORDER" with promo code GLOW20 */}
        <PromotionalBanner onClaimOffer={() => scrollToSection('shop')} />

        {/* 4. Featured Products Section (#shop) */}
        <FeaturedProducts
          products={BESTSELLER_PRODUCTS}
          onAddToCart={handleOpenOrderForm}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 5. Dedicated Skincare Section (#skincare) */}
        <SkincareSection
          onAddToCart={handleOpenOrderForm}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* Category Section: Row of 3 large rounded cards (Skincare, Makeup, Fragrance) */}
        <CategorySection onSelectCategory={(cat) => scrollToSection(cat.toLowerCase() === 'skincare' ? 'skincare' : cat.toLowerCase() === 'makeup' ? 'makeup' : 'shop')} />

        {/* 6. Dedicated Makeup Section (#makeup) */}
        <MakeupSection
          onAddToCart={handleOpenOrderForm}
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 7. Sticky Horizontal Scrolling Gallery Section (#gallery) */}
        <StickyGallery
          onSelectImage={(item: GalleryItem) => {
            showToast(`Viewing «${item.title}» from the visual archive`);
          }}
        />

        {/* 8. Brand Story / Testimonial Section (#about) */}
        <BrandStorySection />

        {/* 9. Dedicated Blog & Editorial Section (#blog) */}
        <BlogSection />

        {/* 10. Instagram Feed / Gallery: Horizontal scrollable row of UGC showcasing products in use */}
        <InstagramFeed />
      </main>

      {/* 11. Comprehensive Footer with newsletter signup, social media links, customer service, and payment icons */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Floating Arrow at Bottom of Website: returns to first section when clicked */}
      <ScrollToTopButton />

      {/* Order & Card Details Modal (Opens directly when clicking "Add to Cart") */}
      <OrderCardModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={orderModalProduct}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Slide-Over Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={BESTSELLER_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleOpenOrderForm}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? isWishlisted(selectedProduct.id) : false}
      />

      {/* Member Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        userName={userName}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#2D2527] text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-[#E8D4D8]/20 animate-slideUp text-xs font-medium tracking-wide">
          <div className="w-5 h-5 rounded-full bg-[#B76E79] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-semibold text-[#FCE7EC] underline hover:text-white cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
