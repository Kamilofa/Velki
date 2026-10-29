import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ZoomIn, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/menu';

export const GallerySection: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Le Grand Assortiment du Terroir',
      region: 'Signature Cameroun',
      image: '/public/assets/aistudio/IMG-20261028-WA0145_63942619.jpg',
      caption: 'Ndolé royal aux crevettes et bœuf, couscous de manioc fin et tranches dorées de plantains mûrs.',
    },
    {
      id: 2,
      title: 'Emblème Territoires Gourmands',
      region: 'Identité Culinaire',
      image: '/public/assets/aistudio/IMG-20261028-WA0146_c9e559a1.jpg',
      caption: 'Le fleuve Wouri au crépuscule, pirogue sawa, carte du Cameroun aux motifs traditionnels et mets du terroir.',
    },
    {
      id: 3,
      title: 'Charte & Motifs du Terroir',
      region: 'Origines & Valeurs',
      image: '/public/assets/aistudio/IMG-20261028-WA0147_1fd01de7.jpg',
      caption: 'L\'univers de marque : authenticité, partage, terroir, savoir-faire et fierté nationale.',
    },
    {
      id: 4,
      title: 'Poisson Braisé de Youpwè & Bobolo',
      region: 'Littoral Douala',
      image: '/src/assets/images/poisson_braise_douala_1793227839193.jpg',
      caption: 'Bar grillé au feu de bois avec bobolo artisanal et piment maison de Douala.',
    },
    {
      id: 5,
      title: 'Poulet DG aux Plantains Caramélisés',
      region: 'Centre & Ouest',
      image: '/src/assets/images/poulet_dg_specialty_1793227838069.jpg',
      caption: 'Le met des grandes fêtes, fondant et relevé aux fines herbes et légumes croquants.',
    },
    {
      id: 6,
      title: 'Foléré Pressé & Gingembre Pur',
      region: 'Grand Nord & Littoral',
      image: '/src/assets/images/jus_naturels_folere_1793227838590.jpg',
      caption: 'Boissons fraîches naturelles riches en goût et en vitalité tropicale.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof galleryItems[0] | null>(null);

  const prevSlide = () => {
    setActiveIndex(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galerie" className="py-20 bg-[#F7E8D4] text-[#1F3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-handwriting text-2xl sm:text-3xl text-[#E67A2E] block">
            Une fête pour les yeux et les papilles
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1F3D2E] tracking-tight">
            Galerie de Nos Saveurs
          </h2>
          <p className="font-body text-base text-[#1F3D2E]/80 text-balance">
            Chaque plat est une œuvre culinaire façonnée selon les règles de l&apos;art gastronomique camerounais.
          </p>
        </div>

        {/* Circular Dishes Gallery Display */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`group flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  activeIndex === idx ? 'scale-105' : 'opacity-90 hover:opacity-100 hover:scale-105'
                }`}
              >
                {/* Circular Image Container with water ripple aura */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#14b8a6] via-[#E67A2E] to-[#F2B134] shadow-xl group-hover:rotate-3 transition-transform">
                  <div className="w-full h-full rounded-full overflow-hidden border-3 border-[#F7E8D4] relative bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                    </div>
                  </div>
                </div>

                {/* Caption below circle */}
                <div className="mt-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#E67A2E] block">
                    {item.region}
                  </span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1F3D2E] line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials from Douala residents */}
        <div className="mt-20 pt-16 border-t border-[#1F3D2E]/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-handwriting text-2xl text-[#3E6B3E] block">
              Ils ont goûté, ils ont adoré
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1F3D2E]">
              Les Gourmets de Douala Témoignent
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-[#1F3D2E]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F2B134] mb-3">
                    {Array.from({ length: t.rating }).map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="font-body text-sm text-[#1F3D2E]/85 italic leading-relaxed mb-4">
                    {t.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F3D2E]/10 flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-sm text-[#1F3D2E]">{t.name}</h5>
                    <span className="text-xs text-[#1F3D2E]/60">{t.location}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#E67A2E] bg-[#E67A2E]/10 px-2 py-0.5 rounded">
                    {t.dish}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Photo Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer animate-in fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-[#F7E8D4] max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#1F3D2E] p-6 text-left"
          >
            <div className="rounded-2xl overflow-hidden h-72 mb-4">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs uppercase font-bold text-[#E67A2E]">{selectedPhoto.region}</span>
            <h3 className="font-display font-bold text-2xl text-[#1F3D2E] mt-1">{selectedPhoto.title}</h3>
            <p className="text-sm text-[#1F3D2E]/80 mt-2 leading-relaxed">{selectedPhoto.caption}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1F3D2E] text-white text-xs font-bold hover:bg-[#E67A2E] transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
