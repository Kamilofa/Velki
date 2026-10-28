import React from 'react';
import { Smartphone, ChefHat, Bike, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Tu commandes',
      subtitle: 'En quelques clics',
      description: 'Choisis tes plats préférés et tes jus naturels pressés. Précise tes préférences de piment et ton quartier à Douala.',
      icon: <Smartphone className="w-8 h-8 text-[#E67A2E]" />,
      badge: 'Simple & Rapide',
    },
    {
      step: '02',
      title: 'On prépare',
      subtitle: 'Dans le secret des marmites',
      description: 'Nos mamans et chefs expérimentés mijotent à la commande avec les épices fraîches du terroir et poissons du quai de Youpwè.',
      icon: <ChefHat className="w-8 h-8 text-[#F2B134]" />,
      badge: 'Fait Maison & Frais',
    },
    {
      step: '03',
      title: 'On livre',
      subtitle: 'Encore chaud à ta porte',
      description: 'Nos livreurs sillonnent Douala en moto avec des sacs isothermes. Reçois ton festin fumant en 35 à 50 minutes chrono.',
      icon: <Bike className="w-8 h-8 text-[#14b8a6]" />,
      badge: 'Chaud & Isotherme',
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-20 bg-[#1F3D2E] text-[#F7E8D4] relative overflow-hidden">
      {/* Dynamic River Flow Visual connecting the 3 steps */}
      <div className="absolute top-1/2 left-0 right-0 h-16 -translate-y-1/2 pointer-events-none opacity-25 hidden lg:block">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 60">
          <path
            d="M0,30 Q300,5 600,30 T1200,30"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="8"
            strokeDasharray="12 8"
            className="animate-shimmer"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-handwriting text-2xl sm:text-3xl text-[#F2B134] block">
            Du Wouri à votre table
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F7E8D4] tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="font-body text-base sm:text-lg text-[#F7E8D4]/80 text-balance">
            Trois étapes simples et fluides reliées par le fleuve des saveurs camerounaises.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => (
            <div
              key={st.step}
              className="relative bg-white/5 border border-white/10 hover:border-[#F2B134]/40 rounded-3xl p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 flex flex-col justify-between group shadow-lg"
            >
              {/* Step Number water drop badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  {st.icon}
                </div>
                <div className="font-mono text-3xl font-extrabold text-[#F2B134]/40 group-hover:text-[#F2B134] transition-colors">
                  {st.step}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[#F2B134]">
                  {st.badge}
                </span>
                <h3 className="font-display font-bold text-2xl text-white pt-2">
                  {st.title}
                </h3>
                <p className="font-handwriting text-lg text-[#E67A2E]">
                  « {st.subtitle} »
                </p>
                <p className="font-body text-sm text-[#F7E8D4]/80 leading-relaxed pt-1">
                  {st.description}
                </p>
              </div>

              {/* Water connector link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-teal-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {idx === 0 ? 'Moins de 2 min' : idx === 1 ? 'Cuisson minute' : 'Express à Douala'}
                </span>
                {idx < 2 && (
                  <ArrowRight className="w-4 h-4 text-[#F2B134] hidden lg:block group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Douala Delivery zones coverage callout */}
        <div className="mt-14 inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/15 text-xs text-[#F7E8D4]">
          <span className="font-bold text-[#F2B134]">Zones desservies à Douala :</span>
          <span>Akwa · Bonanjo · Bonapriso · Deïdo · Bali · Makèpè · Kotto · Denver · Logpom · Bépanda · Bonabéri</span>
        </div>
      </div>
    </section>
  );
};
