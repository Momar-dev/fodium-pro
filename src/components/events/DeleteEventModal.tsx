import React, { useState } from 'react';
import { AlertTriangle, Trash2, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ProEvent } from '../../types';
import { useProData } from '../../context/ProDataContext';

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ProEvent | null;
  onDeleted?: () => void;
}

export const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onDeleted,
}) => {
  const { deleteEvent } = useProData();
  const [confirmInput, setConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!event) return null;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteEvent(event.id);
      setIsDeleting(false);
      onClose();
      if (onDeleted) onDeleted();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Supprimer l'événement"
      subtitle={`Action irréversible pour "${event.title}"`}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Warning Badge */}
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-rose-200">Attention, cette suppression est définitive</div>
            <p className="text-slate-300 leading-relaxed">
              L'événement sera retiré de la billetterie en direct et de votre cockpit. 
              {event.ticketsSold > 0 ? (
                <span className="block mt-1 text-amber-300 font-semibold">
                  ⚠️ Note : {event.ticketsSold} billets ont déjà été vendus ({event.totalRevenue.toLocaleString()} FCFA). Les historiques de paiement Wave/OM restent archivés dans vos exports comptables.
                </span>
              ) : (
                <span className="block mt-1 text-slate-400">
                  Aucun billet n'a encore été vendu sur cet événement.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Event quick review */}
        <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">{event.title}</div>
            <div className="text-[11px] text-slate-400">{event.date} · {event.city}</div>
          </div>
          <span className="text-xs font-mono font-bold text-orange-400">
            {event.ticketsSold} billets
          </span>
        </div>

        {/* Confirmation Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-lg shadow-rose-600/30 cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Suppression...' : 'Supprimer définitivement'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
