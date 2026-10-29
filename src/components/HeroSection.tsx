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

            {/* 4 Brand Pillars directly from uploaded poster */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#1F3D2E]/10">
                <div className="w-8 h-8 rounded-lg bg-[#1F3D2E] text-[#F2B134] flex items-center justify-center font-bold text-xs">
                  🇨🇲
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#1F3D2E] block">Terroir</span>
                  <span className="text-[10px] text-[#1F3D2E]/70">10 Régions</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#1F3D2E]/10">
                <div className="w-8 h-8 rounded-lg bg-[#E67A2E] text-white flex items-center justify-center font-bold text-xs">
                  🍲
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#1F3D2E] block">Tradition</span>
                  <span className="text-[10px] text-[#1F3D2E]/70">Feu de bois</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#1F3D2E]/10">
                <div className="w-8 h-8 rounded-lg bg-[#14b8a6] text-white flex items-center justify-center font-bold text-xs">
                  🛶
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#1F3D2E] block">Mer & Nature</span>
                  <span className="text-[10px] text-[#1F3D2E]/70">Wouri & Côtes</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#1F3D2E]/10">
                <div className="w-8 h-8 rounded-lg bg-[#F2B134] text-[#1F3D2E] flex items-center justify-center font-bold text-xs">
                  ✨
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-[#1F3D2E] block">Culture</span>
                  <span className="text-[10px] text-[#1F3D2E]/70">Bamiléké & Sawa</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
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

            {/* Signature Quote Banner */}
            <div className="p-3.5 rounded-2xl bg-[#1F3D2E]/5 border border-[#1F3D2E]/10">
              <p className="text-xs text-[#1F3D2E]/80">
                Des plats faits maison, avec des ingrédients frais et locaux.
              </p>
              <span className="font-handwriting text-xl text-[#E67A2E] block mt-0.5">
                « Le goût du vrai, le goût d&apos;ici. »
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual featuring uploaded official brand assets */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring glowing with river water and sunset orange */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#14b8a6]/40 via-[#F2B134]/30 to-[#E67A2E]/40 blur-xl opacity-70 -z-10" />

              {/* Main Image Container displaying the authentic poster dish */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1F3D2E]/15 bg-[#1F3D2E] group">
                <img
                  src="/public/assets/aistudio/IMG-20261028-WA0145_63942619.jpg"
                  alt="Le Grand Assortiment du Terroir - Territoires Gourmands"
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay with metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E67A2E] text-white text-[11px] font-bold tracking-wider uppercase">
                      Plat Signature
                    </span>
                    <span className="text-xs text-white/80">Ndolé · Couscous Manioc · Dodo</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Le Grand Assortiment du Terroir
                  </h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">
                    L&apos;excellence de la gastronomie camerounaise réunie dans une assiette artisanale en terre cuite.
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <span className="font-mono text-lg font-bold text-[#F2B134] tabular-nums">
                      6 500 FCFA
                    </span>
                    <button
                      onClick={onOrderClick}
                      className="text-xs bg-white text-[#1F3D2E] hover:bg-[#F2B134] px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      Commander ce festin
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Official Logo Emblem */}
              <div className="absolute -bottom-6 -left-6 bg-[#F7E8D4] border-2 border-[#1F3D2E] rounded-2xl p-2 shadow-2xl flex items-center gap-3 animate-float max-w-[220px]">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#1F3D2E]/20 bg-white">
                  <img
                    src="/public/assets/aistudio/IMG-20261028-WA0146_c9e559a1.jpg"
                    alt="Logo Territoires Gourmands"
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left pr-1">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#3E6B3E]">100% Terroir</div>
                  <div className="font-display font-bold text-xs text-[#1F3D2E] leading-tight">Cuisine Douala & Régions</div>
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
