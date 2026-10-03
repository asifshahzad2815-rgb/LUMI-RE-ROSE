import React, { useState } from 'react';
import { Send, Check, Sparkles, Heart, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#FAF2F2] border-t border-[#EEDDE0] text-[#4A3E41] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand statement block */}
        <div className="pb-12 border-b border-[#E8D4D8] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A396]" />
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-widest text-[#2D2527] uppercase">
                LUMIÈRE ROSE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#736366] max-w-md font-light">
              Haute skincare formulated with cold-distilled French botanicals. Conscious, vegan, and clinically validated luxury.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label htmlFor="footer-newsletter" className="block text-xs uppercase font-medium tracking-[0.2em] text-[#665457]">
                Join the Radiance Circle • Receive 15% Off Your Next Order
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#E0CFD3] rounded-full px-5 py-3 text-xs sm:text-sm text-[#2D2527] placeholder-[#A08E92] focus:outline-hidden focus:border-[#B76E79] transition-colors"
                />
                <button
                  type="submit"
                  className="btn-sweep btn-sweep-dark px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-full flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-700 font-medium">
                  Welcome to Lumière Rose. Your privilege voucher has been sent to your inbox.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-xs">
          {/* Col 1: Shop & Formulations */}
          <div className="space-y-3.5">
            <h4 className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[#2D2527]">
              Atelier Collections
            </h4>
            <ul className="space-y-2 text-[#665457] font-light">
              <li>
                <button onClick={() => onNavigateSection('shop')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
                  Cellulaire Rose Droplets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('skincare')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
                  Velours Barrier Creams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('makeup')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
                  Satin Éclat Lip Oils
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('gallery')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
                  Sticky Visual Gallery (6 Works)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('shop')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
                  Gift Discovery Flacons
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Service */}
          <div className="space-y-3.5">
            <h4 className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[#2D2527]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-[#665457] font-light">
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Complimentary Shipping Over $50
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Track Your Flacon Order
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  30-Day Luminous Guarantee & Returns
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Skin Concierge & Consultation
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Frequently Asked Questions
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: About & Sustainability */}
          <div className="space-y-3.5">
            <h4 className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[#2D2527]">
              House Philosophy
            </h4>
            <ul className="space-y-2 text-[#665457] font-light">
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-[#B76E79] transition-colors cursor-pointer">
                  The Grasse Rose Harvest
                </button>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  100% Recyclable Artisan Glass
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Clean Botany & Vegan Charter
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Press Inquiries & Lookbook
                </span>
              </li>
              <li>
                <span className="hover:text-[#B76E79] cursor-pointer">
                  Careers at Lumière Rose
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Flagships & Socials */}
          <div className="space-y-3.5">
            <h4 className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[#2D2527]">
              Flagship Boutiques
            </h4>
            <div className="space-y-2 text-[#665457] font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A396] shrink-0 mt-0.5" />
                <span>28 Rue Saint-Honoré, 75001 Paris, France</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A396] shrink-0 mt-0.5" />
                <span>450 Madison Avenue, New York, NY 10022</span>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B76E79]">
                  Follow Us:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#FCE7EC] text-[#2D2527] flex items-center justify-center border border-[#E8D4D8] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-[#8C7A7E]">@lumiererose</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Payment Method Icons & Legal */}
        <div className="pt-8 mt-4 border-t border-[#E8D4D8] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8C7A7E]">
          <div className="font-light">
            © 2026 Lumière Rose Haute Skincare. All rights reserved. Made in France.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-white border border-[#E0CFD3] rounded font-medium text-[#2D2527] text-[10px] tracking-wider">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E0CFD3] rounded font-medium text-[#2D2527] text-[10px] tracking-wider">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E0CFD3] rounded font-medium text-[#2D2527] text-[10px] tracking-wider">
              MASTERCARD
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E0CFD3] rounded font-medium text-[#2D2527] text-[10px] tracking-wider">
              AMEX
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E0CFD3] rounded font-medium text-[#2D2527] text-[10px] tracking-wider">
              PayPal
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E0CFD3] rounded font-medium text-[#2D2527] text-[10px] tracking-wider">
              Klarna
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
