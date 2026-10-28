import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Heart, Utensils, Droplets } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#1F3D2E] text-[#F7E8D4] pt-16 pb-12 relative overflow-hidden border-t-2 border-[#1F3D2E]/40">
      {/* African pattern decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#14b8a6] via-[#E67A2E] to-[#F2B134]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-left">
          {/* Col 1: Brand Info & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E67A2E] to-[#F2B134] flex items-center justify-center p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#1F3D2E] flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-[#F2B134]" />
                </div>
              </div>
              <span className="font-display font-extrabold text-xl text-[#F7E8D4]">
                Territoires Gourmands
              </span>
            </div>

            <p className="font-handwriting text-2xl text-[#F2B134] leading-snug">
              « Redécouvre ton territoire en saveur »
            </p>

            <p className="font-body text-xs text-[#F7E8D4]/75 leading-relaxed">
              Service de restauration en ligne de cuisine camerounaise authentique et de jus naturels pressés, basé au cœur de Douala.
            </p>

            <div className="text-xs font-mono font-bold text-[#E67A2E]">
              #TerritoiresGourmands
            </div>
          </div>

          {/* Col 2: Horaires & Quartiers */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-white uppercase tracking-wider text-xs">
              Livraison à Douala
            </h4>

            <div className="space-y-2 text-xs text-[#F7E8D4]/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F2B134] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Lundi - Dimanche</span>
                  <span>10h30 à 22h30 (Service continu)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 text-[#E67A2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Secteurs desservis</span>
                  <span>Akwa, Bonanjo, Bonapriso, Deïdo, Bali, Makèpè, Kotto, Denver, Logpom, Bépanda, Bonabéri.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Commandes & WhatsApp */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-white uppercase tracking-wider text-xs">
              Ligne directe & WhatsApp
            </h4>

            <p className="text-xs text-[#F7E8D4]/75">
              Une envie particulière ou un événement d&apos;entreprise ? Écris-nous directement sur WhatsApp.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="https://wa.me/237699000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow hover:bg-[#20ba5a] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Commander sur WhatsApp (+237)</span>
              </a>

              <a
                href="tel:+237699000000"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F2B134]" />
                <span>+237 699 00 00 00 / 677 00 00 00</span>
              </a>
            </div>
          </div>

          {/* Col 4: Réseaux Sociaux & Signature */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-white uppercase tracking-wider text-xs">
              Rejoins la communauté
            </h4>

            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#E67A2E] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook Territoires Gourmands"
              >
                <span className="font-display font-black text-sm">fb</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#E67A2E] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram Territoires Gourmands"
              >
                <span className="font-display font-black text-sm">ig</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#E67A2E] flex items-center justify-center text-white transition-colors"
                aria-label="TikTok Territoires Gourmands"
              >
                <span className="font-display font-black text-sm">tk</span>
              </a>
            </div>

            <div className="pt-2">
              <div className="font-handwriting text-2xl text-[#F2B134]">
                « Le goût du vrai, le goût d&apos;ici. »
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7E8D4]/60 gap-4">
          <div>
            © {new Date().getFullYear()} Territoires Gourmands Douala. Tous droits réservés.
          </div>
          <div className="flex items-center gap-1">
            <span>Fait avec amour au Cameroun</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>pour les amoureux du terroir</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
