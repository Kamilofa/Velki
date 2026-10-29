import React from 'react';
import { CheckCircle2, Printer, Share2, PhoneCall, Clock, MapPin, MessageSquare, Utensils } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsAppMessage = () => {
    const text = `Bonjour Territoires Gourmands ! Je viens de valider ma commande ${order.orderNumber} pour ${order.customerName} à ${order.deliveryQuartier}. Total : ${order.total.toLocaleString('fr-FR')} FCFA. Merci !`;
    const url = `https://wa.me/237612345678?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-[#F7E8D4] max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#1F3D2E] text-[#1F3D2E] p-6 space-y-6 my-8 text-left">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#3E6B3E]/15 text-[#3E6B3E] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#3E6B3E]" />
          </div>

          <h3 className="font-display font-black text-2xl text-[#1F3D2E]">
            Commande Confirmée !
          </h3>
          <p className="font-handwriting text-lg text-[#E67A2E]">
            « Nos chefs allument les fourneaux pour toi ! »
          </p>

          <div className="inline-block bg-[#1F3D2E] text-white px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
            RÉFÉRENCE : {order.orderNumber}
          </div>
        </div>

        {/* Digital Official Receipt Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#1F3D2E]/15 shadow-sm space-y-4 print:shadow-none">
          <div className="flex justify-between items-start pb-3 border-b border-[#1F3D2E]/10">
            <div>
              <div className="font-display font-extrabold text-sm text-[#1F3D2E]">Territoires Gourmands</div>
              <div className="text-[11px] text-[#1F3D2E]/60">Douala, Cameroun · #TerritoiresGourmands</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase bg-[#3E6B3E]/10 text-[#3E6B3E] px-2 py-0.5 rounded">
                {order.paymentStatus === 'completed' ? 'Payé par Orange Money / MoMo' : 'À régler à la livraison'}
              </span>
              <div className="text-[10px] text-[#1F3D2E]/50 mt-1">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>

          {/* Client & Delivery Info */}
          <div className="text-xs space-y-1 text-[#1F3D2E]/80">
            <div><strong className="text-[#1F3D2E]">Client :</strong> {order.customerName} ({order.customerPhone})</div>
            <div><strong className="text-[#1F3D2E]">Quartier :</strong> {order.deliveryQuartier}</div>
            <div><strong className="text-[#1F3D2E]">Adresse :</strong> {order.deliveryAddress}</div>
            {order.customerEmail && (
              <div className="text-[#3E6B3E] font-medium pt-1">
                ✓ Reçu officiel détaillé expédié à : {order.customerEmail}
              </div>
            )}
          </div>

          {/* Itemized Table */}
          <div className="pt-2 border-t border-[#1F3D2E]/10 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#1F3D2E]/50 tracking-wider">Détail des mets</span>
            {order.items.map(({ item, quantity }) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="font-medium">
                  {quantity}x {item.name}
                </span>
                <span className="font-mono tabular-nums">
                  {(item.price * quantity).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-3 border-t border-[#1F3D2E]/10 space-y-1 text-xs">
            <div className="flex justify-between text-[#1F3D2E]/70">
              <span>Sous-total</span>
              <span className="font-mono tabular-nums">{order.subtotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between text-[#1F3D2E]/70">
              <span>Frais de livraison</span>
              <span className="font-mono tabular-nums">{order.deliveryFee.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#1F3D2E] pt-2 border-t border-[#1F3D2E]/10">
              <span>Total Réglé</span>
              <span className="font-mono text-lg text-[#5A2E1A] tabular-nums">
                {order.total.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>
        </div>

        {/* Live Delivery Timeline */}
        <div className="p-4 rounded-2xl bg-white/60 border border-[#1F3D2E]/10">
          <span className="text-xs font-bold text-[#1F3D2E] block mb-3">Suivi en direct à Douala</span>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
            <div className="text-[#3E6B3E] font-bold">
              <div className="w-6 h-6 rounded-full bg-[#3E6B3E] text-white flex items-center justify-center mx-auto mb-1">✓</div>
              Reçue
            </div>
            <div className="text-[#E67A2E] font-bold animate-pulse">
              <div className="w-6 h-6 rounded-full bg-[#E67A2E] text-white flex items-center justify-center mx-auto mb-1">♨</div>
              En cuisine
            </div>
            <div className="text-[#1F3D2E]/50">
              <div className="w-6 h-6 rounded-full bg-[#1F3D2E]/20 text-[#1F3D2E] flex items-center justify-center mx-auto mb-1">🛵</div>
              En moto
            </div>
            <div className="text-[#1F3D2E]/50">
              <div className="w-6 h-6 rounded-full bg-[#1F3D2E]/20 text-[#1F3D2E] flex items-center justify-center mx-auto mb-1">★</div>
              Livrée
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={shareWhatsAppMessage}
            className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-display font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-[#20ba5a] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Confirmer sur WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl border border-[#1F3D2E]/20 text-[#1F3D2E] font-display font-bold text-xs flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le reçu</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs text-[#1F3D2E]/70 hover:text-[#1F3D2E] font-semibold text-center block"
        >
          Retour à la boutique
        </button>
      </div>
    </div>
  );
};
