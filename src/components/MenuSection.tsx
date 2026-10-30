import React, { useState } from 'react';
import { Plus, Check, Info, Flame, Search, Sparkles } from 'lucide-react';
import { MenuItem, DishCategory } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, event?: React.MouseEvent) => void;
  cartItemIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItemIds }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | DishCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    // Fire river floating animation event
    const event = new CustomEvent('add-dish-to-river', {
      detail: {
        item: { name: item.name, image: item.image },
        clientX: e.clientX,
        clientY: e.clientY,
      },
    });
    window.dispatchEvent(event);

    onAddToCart(item, e);
  };

  return (
    <section id="menu" className="py-20 bg-[#F7E8D4] text-[#1F3D2E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-handwriting text-2xl sm:text-3xl text-[#E67A2E] block">
            Fraîcheur & authenticité du jour
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1F3D2E] tracking-tight">
            La Carte des Terroirs
          </h2>
          <p className="font-body text-base text-[#1F3D2E]/80 text-balance">
            Des recettes mijotées chaque matin à Douala avec des ingrédients frais du marché local et des épices rares du pays.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1F3D2E]/10">
          {/* Category Tabs (Segmented functional buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#1F3D2E]/10 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#1F3D2E] text-[#F7E8D4] shadow-md'
                  : 'text-[#1F3D2E] hover:bg-white/40'
              }`}
            >
              Tous ({MENU_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveCategory('plats')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'plats'
                  ? 'bg-[#1F3D2E] text-[#F7E8D4] shadow-md'
                  : 'text-[#1F3D2E] hover:bg-white/40'
              }`}
            >
              Plats Cuisinés
            </button>
            <button
              onClick={() => setActiveCategory('jus')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'jus'
                  ? 'bg-[#1F3D2E] text-[#F7E8D4] shadow-md'
                  : 'text-[#1F3D2E] hover:bg-white/40'
              }`}
            >
              Jus Naturels Pressés
            </button>
            <button
              onClick={() => setActiveCategory('accompagnements')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'accompagnements'
                  ? 'bg-[#1F3D2E] text-[#F7E8D4] shadow-md'
                  : 'text-[#1F3D2E] hover:bg-white/40'
              }`}
            >
              Accompagnements
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F3D2E]/50" />
            <input
              type="text"
              placeholder="Rechercher ndolé, foléré..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1F3D2E]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#E67A2E] text-[#1F3D2E] placeholder-[#1F3D2E]/40"
            />
          </div>
        </div>

        {/* Menu Grid: 3-column desktop, 2-column tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => {
            const isAdded = cartItemIds.has(item.id);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#1F3D2E]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[#1F3D2E]/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-[#1F3D2E]/10"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('IMG-20261028-WA0145')) {
                        target.src = '/assets/images/IMG-20261028-WA0145_63942619.jpg';
                      }
                    }}
                  />

                  {/* Top Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#1F3D2E]/90 text-white backdrop-blur-sm">
                      {item.region}
                    </span>

                    {item.popular && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#E67A2E] text-white flex items-center gap-1 shadow">
                        <Sparkles className="w-3 h-3" /> Populaire
                      </span>
                    )}
                  </div>

                  {/* Volume badge for drinks */}
                  {item.volume && (
                    <div className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/95 text-[#1F3D2E] shadow">
                      {item.volume}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Item Title and Spicy Indicator */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#1F3D2E] leading-snug">
                        {item.name}
                      </h3>
                      {item.spicyLevel && (
                        <div className="flex items-center text-red-600 shrink-0" title={`Piment niveau ${item.spicyLevel}/3`}>
                          {Array.from({ length: item.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="font-body text-xs sm:text-sm text-[#1F3D2E]/70 line-clamp-3 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer of Card: Price & Add Button */}
                  <div className="pt-4 border-t border-[#1F3D2E]/10 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-semibold text-[#1F3D2E]/50">Prix portion</span>
                      <span className="font-mono text-xl font-extrabold text-[#5A2E1A] tabular-nums">
                        {item.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItemForModal(item)}
                        className="p-2.5 rounded-xl border border-[#1F3D2E]/20 text-[#1F3D2E] hover:bg-[#1F3D2E]/5 transition-colors"
                        title="Voir la recette et les ingrédients"
                        aria-label={`Détails de ${item.name}`}
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={e => handleAdd(item, e)}
                        className={`water-btn flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
                          isAdded
                            ? 'bg-[#3E6B3E] text-white'
                            : 'bg-[#E67A2E] text-white hover:shadow-orange-500/30'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Ajouté</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Ajouter</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-[#1F3D2E]/10 max-w-lg mx-auto p-8">
            <p className="font-display font-bold text-lg text-[#1F3D2E]">Aucun plat ne correspond à votre recherche</p>
            <p className="text-sm text-[#1F3D2E]/70 mt-1">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#1F3D2E] text-white text-xs font-bold rounded-lg"
            >
              Voir toute la carte
            </button>
          </div>
        )}
      </div>

      {/* Dish Details Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#F7E8D4] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#1F3D2E] text-[#1F3D2E] p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1F3D2E] text-white flex items-center justify-center hover:bg-[#E67A2E] transition-colors"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="rounded-2xl overflow-hidden h-48 relative">
              <img
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('IMG-20261028-WA0145')) {
                    target.src = '/assets/images/IMG-20261028-WA0145_63942619.jpg';
                  }
                }}
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-[#1F3D2E]/90 text-white text-xs font-bold">
                {selectedItemForModal.region}
              </div>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-2xl text-[#1F3D2E]">
                {selectedItemForModal.name}
              </h3>
              <p className="font-handwriting text-lg text-[#E67A2E] mt-0.5">
                Cuisine authentique du Cameroun
              </p>
              <p className="text-sm text-[#1F3D2E]/80 mt-2 leading-relaxed">
                {selectedItemForModal.description}
              </p>
            </div>

            {selectedItemForModal.heritageStory && (
              <div className="p-4 rounded-xl bg-white/70 border border-[#1F3D2E]/10">
                <span className="text-[11px] uppercase font-bold text-[#5A2E1A] tracking-wider block mb-1">
                  Histoire & Terroir
                </span>
                <p className="text-xs text-[#1F3D2E]/80 italic">
                  « {selectedItemForModal.heritageStory} »
                </p>
              </div>
            )}

            <div>
              <span className="text-[11px] uppercase font-bold text-[#1F3D2E]/70 tracking-wider block mb-2">
                Ingrédients Authentiques
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedItemForModal.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white text-[#1F3D2E] px-2.5 py-1 rounded-lg border border-[#1F3D2E]/10"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1F3D2E]/15">
              <div className="font-mono text-2xl font-bold text-[#5A2E1A]">
                {selectedItemForModal.price.toLocaleString('fr-FR')} FCFA
              </div>

              <button
                onClick={e => {
                  handleAdd(selectedItemForModal, e);
                  setSelectedItemForModal(null);
                }}
                className="water-btn px-6 py-3 rounded-xl bg-[#E67A2E] text-white font-display font-bold text-sm shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter à ma commande</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
