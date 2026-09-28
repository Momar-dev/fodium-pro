import React, { useState } from 'react';
import { Ticket, ShieldCheck, Check, Truck, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useProData } from '../../context/ProDataContext';

interface PhysicalTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventId?: string;
}

export const PhysicalTicketModal: React.FC<PhysicalTicketModalProps> = ({
  isOpen,
  onClose,
  defaultEventId,
}) => {
  const { events, addPhysicalTicketRequest } = useProData();

  const [selectedEventId, setSelectedEventId] = useState(defaultEventId || events[0]?.id || '');
  const [ticketCategoryId, setTicketCategoryId] = useState('cat-std');
  const [quantity, setQuantity] = useState('200');
  const [secureFormat, setSecureFormat] = useState<'hologramme_qr' | 'standard_qr'>('hologramme_qr');
  const [deliveryAddress, setDeliveryAddress] = useState('Boutique Kanzey Relais, Dagana Centre');
  const [contactName, setContactName] = useState('Amadou Ndiaye');
  const [contactPhone, setContactPhone] = useState('+221 77 641 23 89');
  const [notes, setNotes] = useState('Carnets à souche avec numérotation séquentielle.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !quantity) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const targetCategory = selectedEvent?.categories.find((c) => c.id === ticketCategoryId) || selectedEvent?.categories[0];

      addPhysicalTicketRequest({
        eventId: selectedEventId,
        eventTitle: selectedEvent?.title || 'Événement',
        ticketCategoryId: targetCategory?.id || 'std',
        ticketCategoryName: targetCategory ? `${targetCategory.name} (${targetCategory.price.toLocaleString()} FCFA)` : 'Pass Standard',
        quantity: parseInt(quantity, 10) || 100,
        secureFormat,
        deliveryAddress,
        contactName,
        contactPhone,
        notes,
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Demande de billets physiques sécurisés"
      subtitle="Commande de carnets imprimés avec bande holographique et QR code infalsifiable"
      maxWidth="max-w-xl"
    >
      {success ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Demande enregistrée avec succès !</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Votre ordre d'impression fiducaire a été transmis à l'atelier partenaire. Livraison sous 48h ouvrées.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Événement cible */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Événement concerné <span className="text-orange-400">*</span>
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.city} — {ev.date})
                </option>
              ))}
            </select>
          </div>

          {/* Catégorie & Quantité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Catégorie de billet
              </label>
              <select
                value={ticketCategoryId}
                onChange={(e) => setTicketCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              >
                {selectedEvent?.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.price.toLocaleString()} FCFA)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Quantité souhaitée (en carnets de 50)
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Sécurisation */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Niveau de sécurisation fiduciaire
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                  secureFormat === 'hologramme_qr'
                    ? 'bg-orange-500/10 border-orange-500/50 text-white'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="secureFormat"
                  checked={secureFormat === 'hologramme_qr'}
                  onChange={() => setSecureFormat('hologramme_qr')}
                  className="mt-1"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Hologramme + QR Infalsifiable
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Bande argentée 3D anti-photocopie et scan dynamique sécurisé.
                  </div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                  secureFormat === 'standard_qr'
                    ? 'bg-orange-500/10 border-orange-500/50 text-white'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="secureFormat"
                  checked={secureFormat === 'standard_qr'}
                  onChange={() => setSecureFormat('standard_qr')}
                  className="mt-1"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-orange-400" />
                    QR Code Standard
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Papier cartonné 300g avec code-barres et QR individuel numéroté.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Point de livraison & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Adresse de livraison ou Point Relais <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                placeholder="Ex: Siège Kanzey Almadies ou Dagana Relais"
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Destinataire & Téléphone de réception <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                placeholder="+221 77 000 00 00"
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Instructions particulières pour l'imprimeur
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Numérotation de 0001 à 0300, découpe talon détachable..."
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-xs font-bold text-white shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Traitement de la commande...</span>
                </>
              ) : (
                <>
                  <Truck className="w-4 h-4" />
                  <span>Commander les billets physiques</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
