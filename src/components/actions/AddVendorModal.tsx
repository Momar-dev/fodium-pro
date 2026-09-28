import React, { useState } from 'react';
import { UserCheck, Check, Phone, Percent, MapPin } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useProData } from '../../context/ProDataContext';

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventId?: string;
}

export const AddVendorModal: React.FC<AddVendorModalProps> = ({
  isOpen,
  onClose,
  defaultEventId,
}) => {
  const { events, addVendor } = useProData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+221 ');
  const [email, setEmail] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId || events[0]?.id || '');
  const [quota, setQuota] = useState('150');
  const [commissionRate, setCommissionRate] = useState('10');
  const [city, setCity] = useState('Dakar');
  const [status, setStatus] = useState<'actif' | 'en_attente'>('actif');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedEventId) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addVendor({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        eventId: selectedEventId,
        eventTitle: selectedEvent?.title || 'Événement',
        quota: parseInt(quota, 10) || 100,
        commissionRate: parseInt(commissionRate, 10) || 10,
        city: city.trim(),
        status,
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setName('');
        setEmail('');
      }, 900);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter un vendeur physique"
      subtitle="Habilitez un point de vente ou promoteur pour distribuer des billets"
      maxWidth="max-w-lg"
    >
      {success ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Vendeur ajouté avec succès !</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Le vendeur a été enregistré et assigné à la billetterie de l'événement avec son quota dédié.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom & Contact */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Nom complet du vendeur / Point de vente <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Babacar Seck (Boutique Almadies)"
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Numéro Mobile (Wave / OM) <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+221 77 000 00 00"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Zone géographique / Ville <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="Ex: Dagana Centre, Médina, Thiaroye"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Événement assigné */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Événement assigné <span className="text-orange-400">*</span>
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

          {/* Quota & Commission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Quota de billets alloués
              </label>
              <input
                type="number"
                min="10"
                step="10"
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Taux de commission (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                />
                <Percent className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Statut initial */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Statut initial
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus('actif')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  status === 'actif'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                Actif immédiatement
              </button>
              <button
                type="button"
                onClick={() => setStatus('en_attente')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  status === 'en_attente'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                En attente de validation
              </button>
            </div>
          </div>

          {/* Buttons */}
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
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Enregistrer le vendeur</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
