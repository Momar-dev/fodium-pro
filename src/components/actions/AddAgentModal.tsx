import React, { useState } from 'react';
import { Shield, Check, Phone, BadgeCheck } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useProData } from '../../context/ProDataContext';

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventId?: string;
}

export const AddAgentModal: React.FC<AddAgentModalProps> = ({
  isOpen,
  onClose,
  defaultEventId,
}) => {
  const { events, addAgent } = useProData();

  const [name, setName] = useState('');
  const [matricule, setMatricule] = useState(`AGT-${Math.floor(100 + Math.random() * 900)}`);
  const [phone, setPhone] = useState('+221 ');
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId || events[0]?.id || '');
  const [assignedGate, setAssignedGate] = useState('Porte Principale Ouest (Pelouse)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedEventId) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addAgent({
        name: name.trim(),
        matricule: matricule.trim(),
        phone: phone.trim(),
        eventId: selectedEventId,
        eventTitle: selectedEvent?.title || 'Événement',
        assignedGate: assignedGate.trim(),
        status: 'actif',
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setName('');
      }, 900);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter un agent de contrôle & sécurité"
      subtitle="Attribuez un terminal de scan et une porte d'accès à un membre de sécurité"
      maxWidth="max-w-lg"
    >
      {success ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Agent accrédité avec succès !</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            L'agent est configuré pour le contrôle d'accès sur l'application mobile scanner Fodium Pro.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Nom complet de l'agent <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Moussa Ndiaye"
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Matricule d'accréditation <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                />
                <BadgeCheck className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Téléphone mobile <span className="text-orange-400">*</span>
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
          </div>

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

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Porte / Portique d'accès assigné
            </label>
            <select
              value={assignedGate}
              onChange={(e) => setAssignedGate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
            >
              <option value="Porte Principale Ouest (Pelouse)">Porte Principale Ouest (Pelouse)</option>
              <option value="Porte VIP & Accréditations Nord">Porte VIP & Accréditations Nord</option>
              <option value="Porte Est (Dépose Navettes & Bus)">Porte Est (Dépose Navettes & Bus)</option>
              <option value="Accès Coulisses & Artistes Backstage">Accès Coulisses & Artistes Backstage</option>
            </select>
          </div>

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
                  <span>Attribution...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Enregistrer l'agent</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
