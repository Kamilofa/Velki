import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const openWhatsApp = () => {
    const text = 'Bonjour Territoires Gourmands ! Je souhaite me renseigner sur le menu du jour et passer commande à Douala.';
    const url = `https://wa.me/237699000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3">
      {/* Floating Action Button */}
      <button
        onClick={openWhatsApp}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer border-2 border-white/40"
        aria-label="Contacter le restaurant par WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        {/* Ripple ping */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
      </button>

      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1F3D2E] text-white px-3.5 py-2 rounded-2xl shadow-xl border border-white/20 text-xs animate-in fade-in">
          <span>Envie de commander par WhatsApp ?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white ml-1"
            aria-label="Fermer le message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
