import React, { useState } from 'react';
import { Handshake, Check, Building, Phone, Mail, DollarSign } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useProData } from '../../context/ProDataContext';
import { PartnerCategory, PARTNER_CATEGORIES } from '../../types';

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventId?: string;
}

export const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  isOpen,
  onClose,
  defaultEventId,
}) => {
  const { events, addPartner } = useProData();

  const [company, setCompany] = useState('');
  const [category, setCategory] = useState<PartnerCategory>('sponsor');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+221 ');
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId || events[0]?.id || '');
  const [contributionValue, setContributionValue] = useState('1000000');
  const [status, setStatus] = useState<'confirme' | 'en_discussion' | 'contrat_signe'>('confirme');
  const [boothLocation, setBoothLocation] = useState('Stand Village Festival A1');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !contactName.trim() || !selectedEventId) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addPartner({
        name: company.trim(),
        company: company.trim(),
        category,
        contactName: contactName.trim(),
        email: email.trim() || 'contact@partenaire.sn',
        phone: phone.trim() || '+221 77 000 00 00',
        eventId: selectedEventId,
        eventTitle: selectedEvent?.title || 'Événement',
        status,
        contributionValue: contributionValue ? parseInt(contributionValue, 10) : undefined,
        boothLocation: ['exposant', 'restauration', 'sponsor'].includes(category) ? boothLocation : undefined,
        notes: notes.trim() || undefined,
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setCompany('');
        setContactName('');
      }, 900);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter un partenaire ou sponsor"
      subtitle="Enregistrez une alliance stratégique, un exposant ou un prestataire officiel"
      maxWidth="max-w-2xl"
    >
      {success ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Partenaire ajouté avec succès !</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Le partenaire est enregistré sous la catégorie « {PARTNER_CATEGORIES.find(c => c.id === category)?.label} » avec son statut contractuel.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Entreprise & Catégorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Nom de l'entreprise ou Marque <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  placeholder="Ex: Sonatel, Wave, Dakar Actu..."
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Catégorie de partenariat <span className="text-orange-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PartnerCategory)}
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              >
                {PARTNER_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} — {cat.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Événement assigné */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Événement associé <span className="text-orange-400">*</span>
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

          {/* Contact Référent */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Interlocuteur / Contact <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                placeholder="Ex: Aminata Fall"
                className="w-full px-3 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Téléphone
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+221 77 000 00 00"
                  className="w-full pl-8 pr-3 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Email professionnel
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@partenaire.sn"
                  className="w-full pl-8 pr-3 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Dynamic contextual fields according to Category */}
          {['sponsor', 'exposant', 'restauration'].includes(category) && (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  {category === 'sponsor' ? 'Montant Sponsoring / Dotation (FCFA)' : 'Redevance Stand (FCFA)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={contributionValue}
                    onChange={(e) => setContributionValue(e.target.value)}
                    step="50000"
                    className="w-full pl-8 pr-3 py-2 bg-[#0B0F17] border border-slate-800 rounded-lg text-sm text-white font-mono"
                  />
                  <DollarSign className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Emplacement réservé / Stand
                </label>
                <input
                  type="text"
                  value={boothLocation}
                  onChange={(e) => setBoothLocation(e.target.value)}
                  placeholder="Ex: Stand Platine A, Food Court B2..."
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-800 rounded-lg text-sm text-white"
                />
              </div>
            </div>
          )}

          {/* Statut Contractuel */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Statut du partenariat
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('confirme')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer text-center ${
                  status === 'confirme'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                Confirmé
              </button>
              <button
                type="button"
                onClick={() => setStatus('contrat_signe')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer text-center ${
                  status === 'contrat_signe'
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                Contrat signé
              </button>
              <button
                type="button"
                onClick={() => setStatus('en_discussion')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer text-center ${
                  status === 'en_discussion'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-400'
                }`}
              >
                En discussion
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Contreparties & Notes conventionnelles
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Présence logo sur tous les billets, 10 pass VIP offerts, mention micro..."
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Actions */}
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
                  <Handshake className="w-4 h-4" />
                  <span>Valider le partenariat</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
