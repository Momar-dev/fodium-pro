import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  QrCode,
  Smartphone,
  Sparkles,
  Ticket,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ProEvent } from '../../types';
import { useProData } from '../../context/ProDataContext';

interface PublicTicketPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ProEvent | null;
}

export const PublicTicketPreviewModal: React.FC<PublicTicketPreviewModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const { updateEvent } = useProData();
  const [copied, setCopied] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [paymentSimulationDone, setPaymentSimulationDone] = useState(false);
  const [simulating, setSimulating] = useState(false);

  if (!event) return null;

  const publicUrl = `https://fodium.sn/e/${event.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎟️ Prenez vos billets pour ${event.title} (${event.date} à ${event.city}) directement sur Fodium : ${publicUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSimulatePublicSale = (method: 'Wave' | 'Orange Money') => {
    setSimulating(true);
    const cat = event.categories[selectedCategoryIndex] || event.categories[0];
    const amount = cat ? cat.price * ticketQuantity : 3000 * ticketQuantity;

    setTimeout(() => {
      // Update categories sold
      const updatedCategories = event.categories.map((c, idx) => {
        if (idx === selectedCategoryIndex) {
          return {
            ...c,
            sold: c.sold + ticketQuantity,
          };
        }
        return c;
      });

      updateEvent(event.id, {
        ticketsSold: event.ticketsSold + ticketQuantity,
        totalRevenue: event.totalRevenue + amount,
        categories: updatedCategories,
      });

      setSimulating(false);
      setPaymentSimulationDone(true);
      setTimeout(() => {
        setPaymentSimulationDone(false);
      }, 4000);
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lien Public & Synchronisation Fodium"
      subtitle={`Billetterie Grand Public pour ${event.title}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Sync Status Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-emerald-500/10 border border-orange-500/30 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <span>Synchronisation Fodium Pro ↔ Fodium Public à 100%</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                EN DIRECT
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Toute modification effectuée dans Fodium Pro (tarifs, jauges, descriptions) est répercutée instantanément sur la page grand public. Dès qu'un client achète un billet via Wave ou Orange Money, votre jauge et vos recettes s'actualisent en temps réel.
            </p>
          </div>
        </div>

        {/* Public Link Share Card */}
        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Lien public direct pour vos acheteurs
            </span>
            <span className="text-[11px] text-slate-400">Prêt pour vos campagnes</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-orange-400 truncate select-all">
              {publicUrl}
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Partager sur WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Live Buyer Simulation / Phone Mockup */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#141B28] to-[#0B0F17] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-white">
                Aperçu mobile côté spectateur (Fodium Public)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Testez le flux d'achat</span>
          </div>

          {/* Ticket Picker Simulation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {event.categories.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedCategoryIndex === idx
                    ? 'bg-orange-500/15 border-orange-500/50 ring-1 ring-orange-500/50'
                    : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{cat.name}</span>
                  <span className="text-xs font-mono font-bold text-orange-400">
                    {cat.price.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {cat.sold} vendus sur {cat.capacity} disponibles
                </div>
              </button>
            ))}
          </div>

          {/* Buyer Quantity & Simulated 1-Click Pay */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-medium">Nombre de billets :</span>
              <div className="flex items-center bg-[#0B0F17] rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => setTicketQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-slate-400 hover:text-white font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-2 text-xs font-mono font-bold text-white">
                  {ticketQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setTicketQuantity((q) => Math.min(10, q + 1))}
                  className="px-2.5 py-1 text-slate-400 hover:text-white font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={simulating}
                onClick={() => handleSimulatePublicSale('Wave')}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>{simulating ? 'Paiement...' : 'Tester Achat Wave'}</span>
              </button>
              <button
                type="button"
                disabled={simulating}
                onClick={() => handleSimulatePublicSale('Orange Money')}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>{simulating ? 'Paiement...' : 'Tester Achat OM'}</span>
              </button>
            </div>
          </div>

          {/* Success Feedback */}
          {paymentSimulationDone && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Achat public simulé avec succès ! +{ticketQuantity} billet(s) comptabilisés en direct dans votre Fodium Pro.
              </span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors"
          >
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </Modal>
  );
};
