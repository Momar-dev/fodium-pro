import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useProData } from '../../context/ProDataContext';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (eventId: string) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { addEvent } = useProData();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('2026-12-31');
  const [time, setTime] = useState('19:00');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('Dakar');
  const [totalCapacity, setTotalCapacity] = useState('1000');
  const [standardPrice, setStandardPrice] = useState('3000');
  const [vipPrice, setVipPrice] = useState('10000');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState(
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const capacityNum = parseInt(totalCapacity, 10) || 1000;
      const stdCapacity = Math.floor(capacityNum * 0.75);
      const vipCapacity = capacityNum - stdCapacity;

      const created = addEvent({
        title: title.trim(),
        subtitle: subtitle.trim() || 'Événement produit par Kanzey Media',
        date,
        time,
        location: location.trim(),
        city,
        totalCapacity: capacityNum,
        bannerUrl,
        description: description.trim() || 'Soirée exceptionnelle organisée sur Fodium Pro.',
        status: 'upcoming',
        categories: [
          {
            id: `cat-std-${Date.now()}`,
            name: 'Pass Standard',
            price: parseInt(standardPrice, 10) || 3000,
            capacity: stdCapacity,
            sold: 0,
            description: 'Accès général à l’événement',
          },
          {
            id: `cat-vip-${Date.now()}`,
            name: 'Pass VIP',
            price: parseInt(vipPrice, 10) || 10000,
            capacity: vipCapacity,
            sold: 0,
            description: 'Accès carré réservé avec service premium',
          },
        ],
      });

      setIsSubmitting(false);
      setSuccessFeedback(true);

      setTimeout(() => {
        setSuccessFeedback(false);
        onClose();
        if (onSuccess) onSuccess(created.id);
      }, 900);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un événement"
      subtitle="Configurez les paramètres clés et la billetterie de votre manifestation"
      maxWidth="max-w-2xl"
    >
      {successFeedback ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Événement créé avec succès !</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Votre événement est désormais opérationnel dans votre espace Fodium Pro avec sa billetterie.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom & Sous-titre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Nom de l'événement <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: DAGANA AFRO FEST 2026"
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Sous-titre ou Slogan
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Le rendez-vous culturel de l'année"
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Date, Heure, Ville */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Date <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Heure de début <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  placeholder="19:00"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Ville <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Ex: Dakar, Dagana, Saint-Louis..."
                className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Lieu précis */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Lieu précis / Salle / Stade <span className="text-orange-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Ex: Stade Municipal de Dagana"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Billetterie & Quota Initial */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Configuration billetterie initiale
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Capacité totale (jauge)
                </label>
                <input
                  type="number"
                  value={totalCapacity}
                  onChange={(e) => setTotalCapacity(e.target.value)}
                  min="50"
                  step="50"
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-800 rounded-lg text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Prix Pass Standard (FCFA)
                </label>
                <input
                  type="number"
                  value={standardPrice}
                  onChange={(e) => setStandardPrice(e.target.value)}
                  min="500"
                  step="500"
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-800 rounded-lg text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Prix Pass VIP (FCFA)
                </label>
                <input
                  type="number"
                  value={vipPrice}
                  onChange={(e) => setVipPrice(e.target.value)}
                  min="1000"
                  step="1000"
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-800 rounded-lg text-sm text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Description de l'événement
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Présentez les artistes, le programme et les consignes pour vos participants..."
              className="w-full px-3.5 py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
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
                  <span>Création en cours...</span>
                </>
              ) : (
                <span>Créer l'événement</span>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
