import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Check, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Shipping details form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round(subtotal * appliedDiscount);
  const total = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 50;
  const toFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLOW20') {
      setAppliedDiscount(0.2);
      setPromoError('');
    } else {
      setPromoError('Invalid privilege code. Please try GLOW20');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `LR-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedId);
    setIsOrderPlaced(true);
    setIsCheckingOut(false);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2D2527]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-lg w-full bg-[#FFFDF9] shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideIn border-l border-[#F0E4E6]">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#F0E4E6] flex items-center justify-between bg-[#FDF9F9]">
          <div className="flex items-center gap-2.5">
            <h3 className="font-serif text-2xl font-normal text-[#2D2527] uppercase tracking-wide">
              YOUR BEAUTY BAG
            </h3>
            <span className="text-xs bg-[#F7E1E5] text-[#9A515D] font-bold px-2 py-0.5 rounded-full tabular-nums">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Bag"
            className="p-2 text-[#7A6B6F] hover:text-[#2D2527] hover:bg-[#F7ECEE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order Placed Success View */}
        {isOrderPlaced ? (
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FCE7EC] text-[#B76E79] flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif text-[#2D2527] uppercase">
              MERCI POUR VOTRE COMMANDE
            </h4>
            <p className="text-xs sm:text-sm text-[#665457] max-w-sm font-light">
              Your luxury order <strong className="text-[#2D2527] font-mono font-bold">{orderNumber}</strong> has been received by our Parisian atelier. A confirmation receipt has been sent to your email.
            </p>

            <div className="p-5 bg-[#FAF5F2] rounded-2xl border border-[#EDE1DD] text-xs text-[#665457] w-full text-left space-y-1.5 font-light">
              <div>Recipient: <strong className="text-[#2D2527] font-medium">{customerName || 'Lumière Rose Guest'}</strong></div>
              <div>Address: <strong className="text-[#2D2527] font-medium">{deliveryAddress || 'Standard Delivery'}</strong></div>
              <div>Complimentary: <strong>Rose Deluxe Travel Flacon (10ml) included</strong></div>
            </div>

            <button
              onClick={() => {
                setIsOrderPlaced(false);
                onClose();
              }}
              className="btn-sweep btn-sweep-dark w-full py-3.5 font-medium text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-md"
            >
              Continue Exploring Collections
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout View */
          <div className="p-6 flex-1 overflow-y-auto space-y-5">
            <button
              onClick={() => setIsCheckingOut(false)}
              className="text-xs text-[#B76E79] hover:underline font-medium flex items-center gap-1 cursor-pointer"
            >
              ← Back to Bag Summary
            </button>

            <h4 className="text-xl font-serif text-[#2D2527] uppercase">
              Shipping & Flacon Dispatch
            </h4>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#665457] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Camille Laurent"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl text-xs sm:text-sm text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#665457] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="camille@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl text-xs sm:text-sm text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#665457] mb-1">
                  Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="740 Park Avenue, Apt 12B, New York, NY"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl text-xs sm:text-sm text-[#2D2527] focus:outline-hidden focus:border-[#B76E79] resize-none"
                />
              </div>

              <div className="p-4 bg-[#FDF0F3] rounded-2xl border border-[#F2CBD2] text-xs text-[#665457] space-y-1">
                <div className="font-bold text-[#9A515D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B76E79]" />
                  <span>The 30-Day Luminous Guarantee</span>
                </div>
                <p className="font-light">
                  If your complexion does not feel noticeably radiant within 30 days, we honor hassle-free complimentary returns.
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8D8D5] flex justify-between items-baseline">
                <span className="text-xs uppercase font-medium text-[#665457]">Total to Authorize:</span>
                <span className="text-2xl font-serif font-medium text-[#2D2527] tabular-nums">
                  ${total}
                </span>
              </div>

              <button
                type="submit"
                className="btn-sweep btn-sweep-dark w-full py-4 font-medium text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-lg active:scale-[0.98]"
              >
                Confirm & Dispatch Order
              </button>
            </form>
          </div>
        ) : (
          /* Normal Bag List View */
          <>
            {/* Free shipping progress bar */}
            <div className="px-6 py-3.5 bg-[#FAF5F2] border-b border-[#EDE1DD]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-[#665457] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#B76E79]" />
                  {toFreeShipping === 0 ? (
                    <span className="text-emerald-800 font-semibold">
                      Complimentary Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#2D2527] font-semibold">${toFreeShipping}</strong> for Complimentary Shipping
                    </span>
                  )}
                </span>
                <span className="font-mono text-[#8C7A7E] text-[11px] tabular-nums">{shippingPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8D8D5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B76E79] transition-all duration-300 rounded-full"
                  style={{ width: `${shippingPercent}%` }}
                />
              </div>
            </div>

            {/* Bag Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#FAF2F4] flex items-center justify-center text-[#B76E79]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-xl font-normal text-[#2D2527] uppercase">
                    Your Bag is Empty
                  </h4>
                  <p className="text-xs text-[#7A6B6F] max-w-xs font-light">
                    Explore our bestselling Damask Rose elixirs and velvet barrier creams to begin your ritual.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 px-6 py-2.5 bg-[#2D2527] text-white rounded-full text-xs font-medium uppercase tracking-wider hover:bg-[#43373A] transition-colors cursor-pointer"
                  >
                    Discover Bestsellers
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 bg-[#FAF6F3] rounded-2xl border border-[#EDE1DD] items-center justify-between"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-xl border border-[#E8D8D5] bg-white shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h5 className="font-serif text-sm font-medium text-[#2D2527] truncate">
                        {item.product.name}
                      </h5>
                      <div className="text-[11px] text-[#8C7A7E] font-light">
                        {item.product.volume}
                      </div>
                      <div className="font-serif text-sm text-[#2D2527] tabular-nums font-medium">
                        ${item.product.price}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        title="Remove"
                        className="text-[#A8989B] hover:text-[#B76E79] p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-[#E0CFD3] rounded-full bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 hover:bg-[#FAF2F4] text-[#665457] text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 hover:bg-[#FAF2F4] text-[#665457] text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code & Bottom Checkout Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#F0E4E6] bg-[#FCF8F7] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege Code (e.g. GLOW20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white border border-[#E0CFD3] rounded-full px-4 py-2 text-xs uppercase font-medium focus:outline-hidden focus:border-[#B76E79]"
                    />
                    <button
                      type="submit"
                      className="btn-sweep btn-sweep-dark px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="text-[11px] text-emerald-800 font-medium">
                      Privilege code GLOW20 applied: 20% discount granted!
                    </div>
                  )}
                  {promoError && (
                    <div className="text-[11px] text-rose-700 font-medium">
                      {promoError}
                    </div>
                  )}
                </form>

                {/* Subtotals & Total */}
                <div className="space-y-2 text-xs text-[#665457]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium text-[#2D2527] tabular-nums">${subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-[#B76E79]">
                      <span>First Order Privilege (20%):</span>
                      <span className="font-medium tabular-nums">−${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Standard Shipping:</span>
                    <span className="font-medium text-emerald-800">
                      {toFreeShipping === 0 ? 'Complimentary ($0)' : '$8'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#E8D4D8] flex justify-between items-baseline">
                    <span className="text-xs uppercase font-medium tracking-wider text-[#2D2527]">
                      Estimated Total:
                    </span>
                    <span className="text-2xl font-serif font-medium text-[#2D2527] tabular-nums">
                      ${total + (toFreeShipping === 0 ? 0 : 8)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="btn-sweep btn-sweep-dark w-full py-4 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#E6C2BA]" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
