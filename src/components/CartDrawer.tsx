import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { CartItem, DeliveryQuartier, PaymentMethod, Order } from '../types';
import { DOUALA_QUARTIERS } from '../data/menu';
import { saveOrder } from '../services/supabaseClient';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'payment_process'>('cart');
  const [selectedQuartier, setSelectedQuartier] = useState<DeliveryQuartier>(DOUALA_QUARTIERS[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange_money');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatedUssdState, setSimulatedUssdState] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? selectedQuartier.fee : 0;
  const total = subtotal + deliveryFee;

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setStep('checkout');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      return;
    }

    setIsSubmitting(true);
    setStep('payment_process');

    if (paymentMethod === 'orange_money') {
      setSimulatedUssdState('Envoi de la notification push Orange Money (#150#)...');
      await new Promise(r => setTimeout(r, 1200));
      setSimulatedUssdState('Veuillez composer votre code secret Orange Money sur votre téléphone...');
      await new Promise(r => setTimeout(r, 1400));
      setSimulatedUssdState('Paiement Orange Money validé avec succès !');
    } else if (paymentMethod === 'momo') {
      setSimulatedUssdState('Connexion au serveur MTN Mobile Money (*126#)...');
      await new Promise(r => setTimeout(r, 1200));
      setSimulatedUssdState('Approbation du débit MoMo reçue !');
    } else {
      setSimulatedUssdState('Commande enregistrée pour règlement en espèces à la livraison.');
      await new Promise(r => setTimeout(r, 800));
    }

    // Generate certified Order
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TG-${randomNum}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}_${randomNum}`,
      orderNumber,
      customerName,
      customerPhone,
      customerEmail: customerEmail.trim() || undefined,
      deliveryQuartier: selectedQuartier.name,
      deliveryAddress,
      deliveryInstructions: deliveryInstructions.trim() || undefined,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'cash_on_delivery' : 'completed',
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: 40,
    };

    // Save to Supabase and LocalStorage
    await saveOrder(newOrder);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E67A2E', '#F2B134', '#1F3D2E', '#14b8a6'],
      });
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    onClearCart();
    onClose();
    onOrderSuccess(newOrder);
    setStep('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#F7E8D4] text-[#1F3D2E] w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative border-l-2 border-[#1F3D2E]/20">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1F3D2E]/15 flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1F3D2E] text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#F2B134]" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-[#1F3D2E]">
                {step === 'cart'
                  ? 'Votre Panier'
                  : step === 'checkout'
                  ? 'Finaliser la Commande'
                  : 'Paiement en cours'}
              </h3>
              <span className="text-xs text-[#1F3D2E]/60">Territoires Gourmands · Douala</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#1F3D2E]/70 hover:text-[#1F3D2E] hover:bg-[#1F3D2E]/10 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {step === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#1F3D2E]/10 text-[#1F3D2E] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 text-[#1F3D2E]/40" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#1F3D2E]">Votre panier est vide</h4>
                  <p className="text-xs text-[#1F3D2E]/70 max-w-xs mx-auto">
                    Découvrez nos délicieux plats du terroir camerounais et nos jus naturels pour commencer !
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-[#E67A2E] text-white rounded-xl font-display font-bold text-xs"
                  >
                    Explorer la carte
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#1F3D2E]/10 shadow-sm flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#1F3D2E]/10"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm text-[#1F3D2E] truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-[#E67A2E] tabular-nums mt-0.5">
                          {(item.price * quantity).toLocaleString('fr-FR')} FCFA
                        </div>

                        {/* Quantity selector */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-[#1F3D2E]/10 hover:bg-[#1F3D2E]/20 text-[#1F3D2E] flex items-center justify-center transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold w-5 text-center tabular-nums">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-[#1F3D2E]/10 hover:bg-[#1F3D2E]/20 text-[#1F3D2E] flex items-center justify-center transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Delivery Quartier selector inside Cart */}
                  <div className="mt-6 p-4 rounded-2xl bg-white border border-[#1F3D2E]/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1F3D2E]">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#E67A2E]" /> Quartier de livraison à Douala :
                      </span>
                      <span className="font-mono text-[#E67A2E]">{selectedQuartier.fee} F</span>
                    </div>

                    <select
                      value={selectedQuartier.id}
                      onChange={e => {
                        const q = DOUALA_QUARTIERS.find(item => item.id === e.target.value);
                        if (q) setSelectedQuartier(q);
                      }}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#1F3D2E]/20 bg-[#F7E8D4]/30 text-[#1F3D2E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E67A2E]"
                    >
                      {DOUALA_QUARTIERS.map(q => (
                        <option key={q.id} value={q.id}>
                          {q.name} (+{q.fee} FCFA) ~ {q.estimatedTime}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4 text-left">
              <div className="p-3 bg-white/80 rounded-xl border border-[#1F3D2E]/10 text-xs text-[#1F3D2E]/80">
                <span className="font-bold text-[#1F3D2E]">Livraison express à Douala :</span> {selectedQuartier.name} (~{selectedQuartier.estimatedTime})
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3D2E] mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Samuel Eto'o"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-[#1F3D2E]/20 focus:outline-none focus:ring-2 focus:ring-[#E67A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3D2E] mb-1">
                  Numéro de téléphone Cameroun * (Orange ou MTN)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +237 699 12 34 56 ou 677..."
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-[#1F3D2E]/20 focus:outline-none focus:ring-2 focus:ring-[#E67A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3D2E] mb-1">
                  Email (pour réception du reçu officiel)
                </label>
                <input
                  type="email"
                  placeholder="Ex: monadresse@gmail.com"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-[#1F3D2E]/20 focus:outline-none focus:ring-2 focus:ring-[#E67A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3D2E] mb-1">
                  Adresse précise / Repère à {selectedQuartier.name} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rue des Cocotiers, Immeuble face pharmacie"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-[#1F3D2E]/20 focus:outline-none focus:ring-2 focus:ring-[#E67A2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F3D2E] mb-1">
                  Instructions de cuisine (piment à part, miondo chaud...)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Piment séparé dans un petit ravier svp."
                  value={deliveryInstructions}
                  onChange={e => setDeliveryInstructions(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-[#1F3D2E]/20 focus:outline-none focus:ring-2 focus:ring-[#E67A2E]"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-[#1F3D2E] mb-2">
                  Mode de règlement
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('orange_money')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'orange_money'
                        ? 'border-[#E67A2E] bg-[#E67A2E]/10 font-bold text-[#E67A2E]'
                        : 'border-[#1F3D2E]/20 bg-white text-[#1F3D2E]/70'
                    }`}
                  >
                    <span className="block text-xs font-bold">Orange Money</span>
                    <span className="text-[10px] text-[#1F3D2E]/60 block mt-0.5">#150#</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-[#F2B134] bg-[#F2B134]/15 font-bold text-[#1F3D2E]'
                        : 'border-[#1F3D2E]/20 bg-white text-[#1F3D2E]/70'
                    }`}
                  >
                    <span className="block text-xs font-bold">MTN MoMo</span>
                    <span className="text-[10px] text-[#1F3D2E]/60 block mt-0.5">*126#</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#3E6B3E] bg-[#3E6B3E]/10 font-bold text-[#3E6B3E]'
                        : 'border-[#1F3D2E]/20 bg-white text-[#1F3D2E]/70'
                    }`}
                  >
                    <span className="block text-xs font-bold">Espèces</span>
                    <span className="text-[10px] text-[#1F3D2E]/60 block mt-0.5">À la réception</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'payment_process' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#E67A2E] border-t-transparent rounded-full animate-spin mx-auto" />
              <h4 className="font-display font-bold text-lg text-[#1F3D2E]">Traitement sécurisé</h4>
              <p className="text-sm text-[#1F3D2E]/80 max-w-xs mx-auto animate-pulse">
                {simulatedUssdState}
              </p>
              <div className="text-xs text-[#1F3D2E]/50 flex items-center justify-center gap-1.5 pt-4">
                <ShieldCheck className="w-4 h-4 text-[#3E6B3E]" /> Transaction sécurisée SSL / Mobile Money Cameroun
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with Totals & Actions */}
        {cartItems.length > 0 && step !== 'payment_process' && (
          <div className="p-5 border-t border-[#1F3D2E]/15 bg-white/90 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#1F3D2E]/70">
                <span>Sous-total plats & jus</span>
                <span className="font-mono tabular-nums">{subtotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-[#1F3D2E]/70">
                <span>Frais de livraison ({selectedQuartier.name.split(' ')[0]})</span>
                <span className="font-mono tabular-nums">{deliveryFee.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#1F3D2E] pt-2 border-t border-[#1F3D2E]/10">
                <span>Total à régler</span>
                <span className="font-mono text-lg text-[#5A2E1A] tabular-nums">
                  {total.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={handleStartCheckout}
                className="water-btn w-full py-3.5 rounded-xl bg-[#E67A2E] text-white font-display font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>Commander ({total.toLocaleString('fr-FR')} FCFA)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 rounded-xl border border-[#1F3D2E]/20 text-xs font-bold text-[#1F3D2E]"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="water-btn flex-1 py-3.5 rounded-xl bg-[#3E6B3E] text-white font-display font-bold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Confirmer & Payer</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
