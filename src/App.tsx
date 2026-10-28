import React, { useState, useEffect } from 'react';
import { InteractiveRiver } from './components/InteractiveRiver';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValuesSection } from './components/ValuesSection';
import { MenuSection } from './components/MenuSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';
import { WaveDivider } from './components/WaveDivider';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MenuItem, CartItem, Order } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tg_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tg_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(it => it.item.id === item.id);
      if (existing) {
        return prev.map(it =>
          it.item.id === item.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(it => {
          if (it.item.id === itemId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(it => it.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemIds = new Set(cartItems.map(it => it.item.id));

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7E8D4] text-[#1F3D2E] relative flex flex-col font-body selection:bg-[#E67A2E] selection:text-white">
      {/* Concept Star: The Animated River winding through the website */}
      <InteractiveRiver />

      {/* Main Top Navigation */}
      <Navbar cartItems={cartItems} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section */}
        <HeroSection onOrderClick={scrollToMenu} />

        {/* Transition Wave into Values */}
        <WaveDivider fillColor="#1F3D2E" bgColor="#F7E8D4" />

        {/* 2. Nos Valeurs */}
        <ValuesSection />

        {/* Transition Wave back to Menu */}
        <WaveDivider fillColor="#F7E8D4" bgColor="#1F3D2E" flip />

        {/* 3. La Carte & Menu des Terroirs */}
        <MenuSection onAddToCart={handleAddToCart} cartItemIds={cartItemIds} />

        {/* Transition Wave into Comment ça marche */}
        <WaveDivider fillColor="#1F3D2E" bgColor="#F7E8D4" />

        {/* 5. Comment ça marche */}
        <HowItWorksSection />

        {/* Transition Wave to Galerie */}
        <WaveDivider fillColor="#F7E8D4" bgColor="#1F3D2E" flip />

        {/* 6. Galerie des Saveurs & Témoignages */}
        <GallerySection />

        {/* Transition Wave into Footer */}
        <WaveDivider fillColor="#1F3D2E" bgColor="#F7E8D4" />
      </main>

      {/* 7. Pied de Page */}
      <Footer />

      {/* Cart & Checkout Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(order: Order) => setConfirmedOrder(order)}
      />

      {/* Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
