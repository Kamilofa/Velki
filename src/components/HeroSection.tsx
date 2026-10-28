import React from 'react';
import { ArrowRight, MapPin, Sparkles, Droplets, ShieldCheck, Clock } from 'lucide-react';

interface HeroSectionProps {
  onOrderClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderClick }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Decorative Palm Fronds & African Bogolan geometry in corners */}
      <div className="absolute top-10 right-0 w-72 h-72 md:w-96 md:h-96 pointer-events-none opacity-20 overflow-hidden z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#3E6B3E] fill-current">
          <path d="M40,0 Q120,40 180,120 Q140,160 40,200 Q80,110 40,0 Z" />
          <path d="M60,20 Q130,60 170,130" stroke="#E67A2E" strokeWidth="2" fill="none" />
          <path d="M70,40 Q135,80 160,140" stroke="#F2B134" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Message, Slogan, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Regional Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F3D2E]/10 border border-[#1F3D2E]/15 text-[#1F3D2E] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E67A2E]" />
              <MapPin className="w-3.5 h-3.5 text-[#E67A2E]" />
              <span>Service de restauration en ligne · Douala, Cameroun</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F3D2E] tracking-tight leading-[1.1] text-balance">
              La richesse du Cameroun{' '}
              <span className="font-handwriting font-normal text-[#E67A2E] text-4xl sm:text-5xl md:text-6xl lg:text-7xl block sm:inline">
                dans chaque plat !
              </span>
            </h1>

            {/* Slogan & Subtitle */}
            <p className="font-body text-lg sm:text-xl text-[#1F3D2E]/85 max-w-2xl leading-relaxed">
              Cuisine traditionnelle, produits locaux et passion dans chaque bouchée.
              <span className="block mt-1 font-semibold text-[#5A2E1A]">
                « Redécouvre ton territoire en saveur » · #TerritoiresGourmands
              </span>
            </p>

            {/* Trust and Feature Points */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#1F3D2E]/75 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3E6B3E]" />
                100% Ingrédients du Terroir
              </span>
              <span aria-hidden="true" className="text-[#E67A2E]">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E67A2E]" />
                Livraison Chaude à Douala (35-50 min)
              </span>
              <span aria-hidden="true" className="text-[#E67A2E]">·</span>
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-teal-600" />
                Jus Pressés Pur Fruit
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOrderClick}
                className="water-btn group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#E67A2E] text-white font-display font-bold text-base shadow-xl hover:shadow-orange-600/30 transition-all cursor-pointer active:scale-98"
              >
                <span>Commander maintenant</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#valeurs"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-[#1F3D2E] text-[#1F3D2E] hover:bg-[#1F3D2E] hover:text-[#F7E8D4] font-display font-semibold text-base transition-all"
              >
                <span>Nos Valeurs & Recettes</span>
              </a>
            </div>

            {/* Live Social Proof / Orders today banner */}
            <div className="pt-4 flex items-center gap-4 border-t border-[#1F3D2E]/10">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-[#1F3D2E] text-[#F7E8D4] text-xs font-bold flex items-center justify-center border-2 border-[#F7E8D4]">
                  DO
                </div>
                <div className="w-9 h-9 rounded-full bg-[#E67A2E] text-white text-xs font-bold flex items-center justify-center border-2 border-[#F7E8D4]">
                  AK
                </div>
                <div className="w-9 h-9 rounded-full bg-[#3E6B3E] text-white text-xs font-bold flex items-center justify-center border-2 border-[#F7E8D4]">
                  BP
                </div>
              </div>
              <div className="text-xs text-[#1F3D2E]/80">
                <span className="font-bold text-[#1F3D2E]">+120 repas livrés</span> aujourd&apos;hui à Akwa, Bonanjo, Bonapriso et Makèpè
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Cameroonian Ndolé Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring glowing with river water and sunset orange */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#14b8a6]/40 via-[#F2B134]/30 to-[#E67A2E]/40 blur-xl opacity-70 -z-10" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1F3D2E]/15 bg-[#1F3D2E] group">
                <img
                  src="/src/assets/images/hero_ndole_cameroon_1793227837919.jpg"
                  alt="Ndolé Royal de Douala avec crevettes, miondo et plantains"
                  className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay with metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E67A2E] text-white text-[11px] font-bold tracking-wider uppercase">
                      Spécialité du Wouri
                    </span>
                    <span className="text-xs text-white/80">Littoral · Sawa</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Ndolé Royal de Douala
                  </h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">
                    Crevettes fraîches de Youpwè, bœuf fumé fondant, miondo artisanal et plantains mûrs dorés.
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <span className="font-mono text-lg font-bold text-[#F2B134] tabular-nums">
                      4 500 FCFA
                    </span>
                    <button
                      onClick={onOrderClick}
                      className="text-xs bg-white text-[#1F3D2E] hover:bg-[#F2B134] px-3 py-1.5 rounded-lg font-bold transition-colors"
                    >
                      Commander ce plat
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Organic Natural Juices */}
              <div className="absolute -bottom-6 -left-6 bg-[#F7E8D4] border-2 border-[#1F3D2E] rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-float">
                <div className="w-11 h-11 rounded-xl bg-[#3E6B3E] flex items-center justify-center text-white shadow-inner">
                  <Droplets className="w-6 h-6 text-teal-300" />
                </div>
                <div className="text-left pr-2">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#3E6B3E]">100% Pressé Frais</div>
                  <div className="font-display font-bold text-sm text-[#1F3D2E]">Jus de Foléré & Gingembre</div>
                </div>
              </div>

              {/* Floating Star Emblem: Douala authenticity */}
              <div className="absolute -top-4 -right-4 bg-[#F2B134] text-[#1F3D2E] p-3 rounded-2xl shadow-lg border-2 border-[#1F3D2E] rotate-6">
                <div className="text-center font-display">
                  <span className="text-[10px] block font-extrabold uppercase tracking-widest">Douala</span>
                  <span className="text-base font-black">7j / 7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
