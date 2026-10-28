import React from 'react';
import { Award, Users, Sprout, Flame, Heart } from 'lucide-react';
import { BRAND_VALUES } from '../data/menu';

export const ValuesSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'authenticite':
        return <Award className="w-6 h-6 text-[#E67A2E]" />;
      case 'partage':
        return <Users className="w-6 h-6 text-[#F2B134]" />;
      case 'terroir':
        return <Sprout className="w-6 h-6 text-[#3E6B3E]" />;
      case 'savoir-faire':
        return <Flame className="w-6 h-6 text-[#E67A2E]" />;
      case 'fierte':
      default:
        return <Heart className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <section id="valeurs" className="py-20 bg-[#1F3D2E] text-[#F7E8D4] relative overflow-hidden">
      {/* Discreet African Bogolan Filigree in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-bogolan-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-handwriting text-2xl sm:text-3xl text-[#F2B134] block">
            L&apos;âme de notre cuisine
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F7E8D4] tracking-tight">
            Nos Valeurs Fondatrices
          </h2>
          <p className="font-body text-base sm:text-lg text-[#F7E8D4]/80 text-balance">
            Territoires Gourmands n&apos;est pas qu&apos;un restaurant : c&apos;est une passerelle vivante entre les terroirs fertiles du Cameroun et votre table à Douala.
          </p>
        </div>

        {/* 5 Values Icons in Row / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {BRAND_VALUES.map((val, idx) => (
            <div
              key={val.id}
              className="bg-white/5 border border-white/10 hover:border-[#F2B134]/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getIcon(val.id)}
                </div>

                <div className="text-xs font-mono text-[#F2B134] mb-1 font-semibold">
                  0{idx + 1}
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-1">
                  {val.title}
                </h3>

                <p className="font-handwriting text-base text-[#E67A2E] mb-3">
                  « {val.quote} »
                </p>

                <p className="font-body text-xs sm:text-sm text-[#F7E8D4]/75 leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#F7E8D4]/50">
                <span>Cameroun Pur</span>
                <span className="text-[#F2B134]">✓ Garanti</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote banner */}
        <div className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#F2B134]">
            « Quand la marmite chante au Cameroun, c&apos;est toute la terre qui raconte son histoire. »
          </p>
          <span className="block mt-2 font-display text-xs uppercase tracking-widest text-white/70">
            L&apos;équipe de cuisine de Territoires Gourmands · Douala
          </span>
        </div>
      </div>
    </section>
  );
};
