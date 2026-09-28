import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Tag, Image, Clock, Check, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ProEvent, EventStatus } from '../../types';
import { useProData } from '../../context/ProDataContext';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ProEvent | null;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const { updateEvent } = useProData();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState<EventStatus>('ongoing');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setSubtitle(event.subtitle || '');
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location);
      setCity(event.city);
      setStatus(event.status);
      setDescription(event.description || '');
      setBannerUrl(event.bannerUrl || '');
      setSavedSuccess(false);
    }
  }, [event, isOpen]);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateEvent(event.id, {
      title,
      subtitle,
      date,
      time,
      location,
      city,
      status,
      description,
      bannerUrl,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const sampleBanners = [
    {
      label: 'Festival / Concert',
      url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Scène Afro / Walo',
      url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Gala / Soirée VIP',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Stade / Plein air',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modifier l'événement"
      subtitle={`Mise à jour des informations pour "${event.title}"`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Événement mis à jour avec succès ! Synchronisation en cours...</span>
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Titre officiel de l'événement <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Slogan ou sous-titre
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="ex: Le grand festival culturel du Walo"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Date, Heure, Statut */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Date <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Horaires
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="ex: 18:00 - 04:00"
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Statut de la billetterie
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as EventStatus)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
            >
              <option value="ongoing">En cours (En vente)</option>
              <option value="upcoming">À venir (Programmé)</option>
              <option value="completed">Terminé</option>
              <option value="draft">Brouillon</option>
            </select>
          </div>
        </div>

        {/* Lieu et Ville */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Lieu exact
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Ville / Région
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Description de l'événement
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
          />
        </div>

        {/* Visual Banner */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Bannière de l'événement (URL d'affiche)
          </label>
          <input
            type="url"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F17] border border-slate-700 focus:border-orange-500 text-xs text-white focus:outline-none"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {sampleBanners.map((b, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setBannerUrl(b.url)}
                className={`relative rounded-xl overflow-hidden h-14 border text-left cursor-pointer transition-all ${
                  bannerUrl === b.url
                    ? 'border-orange-500 ring-2 ring-orange-500/40'
                    : 'border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={b.url} alt={b.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-1 text-center">
                  <span className="text-[10px] text-white font-medium">{b.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white shadow-lg shadow-orange-500/25 cursor-pointer transition-all"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </Modal>
  );
};
