import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  Check,
  Truck,
  Plus,
  Minus,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { Product } from '../types';

interface OrderCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onOrderSuccess: (orderId: string, product: Product, quantity: number, total: number) => void;
}

export const OrderCardModal: React.FC<OrderCardModalProps> = ({
  isOpen,
  onClose,
  product,
  onOrderSuccess,
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('GLOW20');
  const [discountPercent, setDiscountPercent] = useState(0.2); // Default 20% privilege code!
  const [promoMessage, setPromoMessage] = useState('20% privilege code GLOW20 applied');

  // Customer contact & shipping
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Confirmation view state
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  // Formatting card number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  // Formatting expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setExpiry(raw);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(raw);
  };

  const subtotal = product.price * quantity;
  const discountAmount = Math.round(subtotal * discountPercent);
  const shipping = subtotal >= 50 ? 0 : 8;
  const finalTotal = subtotal - discountAmount + shipping;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLOW20') {
      setDiscountPercent(0.2);
      setPromoMessage('20% privilege code applied!');
    } else if (promoCode.trim().toUpperCase() === 'ROSE10') {
      setDiscountPercent(0.1);
      setPromoMessage('10% privilege code applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid promo code');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `LR-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderId(orderId);
    onOrderSuccess(orderId, product, quantity, finalTotal);
  };

  const handleClose = () => {
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-10 flex justify-center items-center">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#2D2527]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl bg-[#FFFDF9] rounded-3xl sm:rounded-[36px] shadow-2xl border border-[#F0E4E6] overflow-hidden animate-fadeIn my-auto max-h-[92vh] flex flex-col font-sans text-[#2D2527]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E4E6] bg-[#FAF5F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B76E79]" />
            <h3 className="font-serif text-lg sm:text-xl font-normal uppercase tracking-wider text-[#2D2527]">
              {confirmedOrderId ? 'ORDER CONFIRMATION' : 'SECURE ORDER & PAYMENT'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-[#7A6B6F] hover:text-[#2D2527] hover:bg-[#F2E5E8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {confirmedOrderId ? (
          /* Confirmation Receipt State */
          <div className="p-6 sm:p-10 text-center flex-1 overflow-y-auto flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FCE7EC] text-[#B76E79] flex items-center justify-center shadow-xs">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#9A515D] bg-[#FDF0F3] px-3 py-1 rounded-full border border-[#F2CBD2]">
                Order Successfully Placed
              </span>
              <h4 className="font-serif text-3xl sm:text-4xl text-[#2D2527] uppercase">
                {confirmedOrderId}
              </h4>
              <p className="text-xs sm:text-sm text-[#665457] font-light max-w-md mx-auto">
                Thank you, <strong className="font-medium text-[#2D2527]">{name || 'valued patron'}</strong>. Your botanical flacon has been secured and dispatched to our packaging atelier.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="w-full max-w-lg bg-[#FAF6F3] rounded-2xl p-5 border border-[#EDE1DD] text-left space-y-4">
              <div className="flex items-center gap-4 pb-3 border-b border-[#EDE1DD]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-18 h-18 object-cover rounded-xl border border-[#E8D8D5] bg-white shrink-0"
                />
                <div className="space-y-1">
                  <div className="font-serif text-base text-[#2D2527] font-medium leading-tight">
                    {product.name}
                  </div>
                  <div className="text-xs text-[#8C7A7E] font-light">
                    Quantity: {quantity} • {product.volume}
                  </div>
                  <div className="text-xs text-[#2D2527] font-serif font-medium">
                    Total: ${finalTotal}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#665457] font-light">
                <div>
                  <span className="text-[#8C7A7E] block text-[10px] uppercase font-semibold">Payment Method:</span>
                  <span className="text-[#2D2527] font-mono">
                    Card ending in {cardNumber.slice(-4) || '••••'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C7A7E] block text-[10px] uppercase font-semibold">Delivery Estimate:</span>
                  <span className="text-[#2D2527]">2–4 business days</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#8C7A7E] block text-[10px] uppercase font-semibold">Shipping Address:</span>
                  <span className="text-[#2D2527]">{address ? `${address}, ${city}` : 'Standard Shipping Address'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn-sweep btn-sweep-dark w-full max-w-lg py-4 font-medium text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-md"
            >
              Continue Exploring Collection
            </button>
          </div>
        ) : (
          /* Side-by-Side: Product Summary on Left, Order & Card Form on Right */
          <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Product Summary */}
            <div className="lg:col-span-5 bg-[#FAF5F2] p-5 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EFE5E2]">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#8C7A7E] font-medium">
                  [SELECTED BOTANICAL FORMULATION]
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-white border border-[#E8D8D5] shadow-xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#9A515D] uppercase border border-[#F0D5DA]">
                    {product.badge || 'Haute Botanique'}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-serif italic text-[#B76E79]">
                    {product.frenchName}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#2D2527] uppercase">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#7A6B6F] mt-1 font-light leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#665457] font-medium uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#E0CFD3] rounded-full bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 hover:bg-[#FAF2F4] text-[#665457] text-xs cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold tabular-nums min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 hover:bg-[#FAF2F4] text-[#665457] text-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Privilege Code Input */}
                <div className="pt-2 border-t border-[#EDE1DD] space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Privilege Code (GLOW20)"
                      className="flex-1 bg-white border border-[#E0CFD3] rounded-xl px-3 py-1.5 text-xs uppercase font-medium focus:outline-hidden focus:border-[#B76E79]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCode}
                      className="btn-sweep btn-sweep-dark px-3.5 py-1.5 rounded-xl text-xs uppercase font-medium cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div className="text-[11px] text-emerald-800 font-medium">
                      {promoMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="pt-4 mt-4 border-t border-[#EDE1DD] space-y-2 text-xs text-[#665457]">
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span className="font-medium text-[#2D2527]">${product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal ({quantity} {quantity === 1 ? 'flacon' : 'flacons'}):</span>
                  <span className="font-medium text-[#2D2527]">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B76E79]">
                    <span>Privilege Discount ({discountPercent * 100}%):</span>
                    <span className="font-medium">−${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium text-emerald-800">
                    {shipping === 0 ? 'Complimentary ($0)' : '$8'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8D4D8] flex justify-between items-baseline">
                  <span className="font-serif text-sm font-medium uppercase text-[#2D2527]">
                    Total to Authorize:
                  </span>
                  <span className="font-serif text-2xl font-medium text-[#2D2527] tabular-nums">
                    ${finalTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Form for Customer, Shipping & Card Details */}
            <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                {/* Section 1: Customer Contact */}
                <div>
                  <h5 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A7E] mb-2 flex items-center gap-1.5">
                    <span>1. Customer & Delivery Contact</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                    />
                  </div>
                </div>

                {/* Section 2: Shipping Address */}
                <div>
                  <h5 className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C7A7E] mb-2">
                    2. Flacon Delivery Address
                  </h5>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Street Address (e.g. 740 Park Avenue) *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                    />
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        placeholder="City *"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Postal Code *"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-[#FAF5F2] border border-[#E8D8D5] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Payment Card Details */}
                <div className="p-4 bg-[#FCF8F7] rounded-2xl border border-[#F0DFE3] space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs uppercase font-bold tracking-[0.2em] text-[#2D2527] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#B76E79]" />
                      <span>3. Card Details & Authorization</span>
                    </h5>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium">
                      <Lock className="w-3 h-3 text-emerald-700" />
                      <span>256-bit Encrypted</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {/* Card Number */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#8C7A7E] mb-1">
                        Card Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="•••• •••• •••• ••••"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full bg-white border border-[#E0CFD3] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono tracking-wider text-[#2D2527] focus:outline-hidden focus:border-[#B76E79] pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#8C7A7E] font-mono">
                          VISA/MC
                        </span>
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#8C7A7E] mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="CAMILLE LAURENT"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-[#E0CFD3] rounded-xl px-3.5 py-2 text-xs uppercase tracking-wider text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                      />
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-[#8C7A7E] mb-1">
                          Expiry Date (MM/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="08/28"
                          value={expiry}
                          onChange={handleExpiryChange}
                          className="w-full bg-white border border-[#E0CFD3] rounded-xl px-3.5 py-2 text-xs font-mono text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-[#8C7A7E] mb-1">
                          CVV / CVC (3-4 digits) *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          value={cvv}
                          onChange={handleCvvChange}
                          className="w-full bg-white border border-[#E0CFD3] rounded-xl px-3.5 py-2 text-xs font-mono text-[#2D2527] focus:outline-hidden focus:border-[#B76E79]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-sweep btn-sweep-dark w-full py-4 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-[#E6C2BA] stroke-[2.5]" />
                    <span>Confirm Order & Pay ${finalTotal}</span>
                  </button>

                  <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-[#8C7A7E]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B76E79]" />
                    <span>Complimentary gift packaging & 30-day return policy</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
