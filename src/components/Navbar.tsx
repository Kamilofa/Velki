import React, { useState, useEffect } from 'react';
import { ShoppingBag, Utensils, Droplets, Menu, X, PhoneCall } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItems, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1F3D2E]/95 backdrop-blur-md text-[#F7E8D4] shadow-lg border-b border-white/10 py-3'
          : 'bg-[#1F3D2E]/85 backdrop-blur-sm text-[#F7E8D4] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand Zone with authentic emblem */}
          <a
            href="#"
            className="flex items-center gap-3 group text-left whitespace-nowrap shrink-0"
            aria-label="Territoires Gourmands - Accueil"
          >
            {/* Authentic Brand Logo from uploaded asset */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#F2B134] shadow-md group-hover:scale-105 transition-transform bg-[#F7E8D4]">
              <img
                src="/assets/images/IMG-20261028-WA0146_c9e559a1.jpg"
                alt="Logo Territoires Gourmands Cameroun"
                className="w-full h-full object-cover scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#F7E8D4] group-hover:text-[#F2B134] transition-colors leading-tight">
                Territoires Gourmands
              </span>
              <span className="font-handwriting text-sm text-[#E67A2E] leading-none">
                Redécouvre ton territoire en saveur
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#F7E8D4]/85">
            <a
              href="#menu"
              className="hover:text-[#F2B134] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              La Carte
            </a>
            <a
              href="#valeurs"
              className="hover:text-[#F2B134] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Nos Valeurs
            </a>
            <a
              href="#comment-ca-marche"
              className="hover:text-[#F2B134] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Comment ça marche
            </a>
            <a
              href="#galerie"
              className="hover:text-[#F2B134] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Galerie & Terroir
            </a>
            <a
              href="#contact"
              className="hover:text-[#F2B134] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Contact Douala
            </a>
          </nav>

          {/* Zone 3: 1 primary action: Cart button with live amount */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="water-btn group relative flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#E67A2E] text-white font-display font-semibold text-xs sm:text-sm shadow-md hover:shadow-orange-500/30 whitespace-nowrap shrink-0 transition-all active:scale-95"
              aria-label={`Panier avec ${totalCount} articles`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#F2B134] text-[#1F3D2E] text-[10px] font-black flex items-center justify-center animate-bounce">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Mon Panier</span>
              {totalAmount > 0 && (
                <span className="border-l border-white/30 pl-2 font-mono tabular-nums text-xs font-bold text-[#F7E8D4]">
                  {totalAmount.toLocaleString('fr-FR')} F
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#F7E8D4] hover:bg-white/10 transition-colors"
              aria-label="Ouvrir le menu mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1F3D2E] border-t border-white/10 px-4 pt-4 pb-6 mt-2 space-y-3 shadow-2xl">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#F7E8D4] hover:text-[#F2B134]"
          >
            La Carte des Plats & Jus
          </a>
          <a
            href="#valeurs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#F7E8D4] hover:text-[#F2B134]"
          >
            Nos Valeurs & Terroirs
          </a>
          <a
            href="#comment-ca-marche"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#F7E8D4] hover:text-[#F2B134]"
          >
            Comment ça marche
          </a>
          <a
            href="#galerie"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#F7E8D4] hover:text-[#F2B134]"
          >
            Galerie & Spécialités
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#F7E8D4] hover:text-[#F2B134]"
          >
            Contact & Quartiers desservis
          </a>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#F7E8D4]/70">
            <span>Douala · 7j/7 : 10h30 - 22h30</span>
            <a href="tel:+237612345678" className="flex items-center gap-1 text-[#F2B134]">
              <PhoneCall className="w-3.5 h-3.5" /> +237 6 12 34 56 78
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
