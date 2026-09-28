import React, { useState } from 'react';
import {
  CalendarPlus,
  Ticket,
  UserCheck,
  ShieldCheck,
  Handshake,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useProData } from '../../context/ProDataContext';
import { CreateEventModal } from './CreateEventModal';
import { PhysicalTicketModal } from './PhysicalTicketModal';
import { AddVendorModal } from './AddVendorModal';
import { AddAgentModal } from './AddAgentModal';
import { AddPartnerModal } from './AddPartnerModal';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: (eventId: string) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  onClose,
  onEventCreated,
}) => {
  const { activeQuickAction, setActiveQuickAction } = useProData();

  const handleSelectAction = (action: 'event' | 'ticket' | 'vendor' | 'agent' | 'partner') => {
    setActiveQuickAction(action);
  };

  const handleCloseActiveAction = () => {
    setActiveQuickAction(null);
  };

  const actions = [
    {
      id: 'event' as const,
      title: 'Créer un événement',
      subtitle: 'Nouveau festival, concert, conférence avec billetterie',
      icon: CalendarPlus,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      badge: 'Prioritaire',
    },
    {
      id: 'ticket' as const,
      title: 'Demander des billets physiques',
      subtitle: 'Carnets fiduciaires sécurisés avec hologramme & QR code',
      icon: Ticket,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badge: 'Impression',
    },
    {
      id: 'vendor' as const,
      title: 'Ajouter un vendeur',
      subtitle: 'Habiliter un point de vente physique avec quota et commission',
      icon: UserCheck,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      badge: 'Réseau',
    },
    {
      id: 'agent' as const,
      title: 'Ajouter un agent de contrôle',
      subtitle: 'Accréditation terminal scanner & attribution de porte d’accès',
      icon: ShieldCheck,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badge: 'Sécurité',
    },
    {
      id: 'partner' as const,
      title: 'Ajouter un partenaire',
      subtitle: 'Sponsor, média, exposant, sécurité, restauration, etc.',
      icon: Handshake,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      badge: '8 catégories',
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && !activeQuickAction && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Bottom Sheet on mobile / Card on desktop */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-lg bg-[#121824] border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Mobile handle */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-700" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-orange-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Nouvelle Action Fodium Pro
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Que voulez-vous créer ?</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action list */}
              <div className="p-4 sm:p-6 space-y-2.5 max-h-[70vh] overflow-y-auto">
                {actions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => handleSelectAction(act.id)}
                      className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-[#0B0F17] hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${act.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                              {act.title}
                            </span>
                            {act.badge && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                {act.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{act.subtitle}</div>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer info */}
              <div className="px-6 py-3 bg-[#0B0F17] border-t border-slate-800/70 text-center">
                <span className="text-[11px] text-slate-400">
                  Toutes les actions mettent à jour instantanément vos équipes et vos ventes.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Child modals triggered by action sheet */}
      <CreateEventModal
        isOpen={activeQuickAction === 'event'}
        onClose={handleCloseActiveAction}
        onSuccess={(id) => {
          handleCloseActiveAction();
          onClose();
          if (onEventCreated) onEventCreated(id);
        }}
      />

      <PhysicalTicketModal
        isOpen={activeQuickAction === 'ticket'}
        onClose={() => {
          handleCloseActiveAction();
          onClose();
        }}
      />

      <AddVendorModal
        isOpen={activeQuickAction === 'vendor'}
        onClose={() => {
          handleCloseActiveAction();
          onClose();
        }}
      />

      <AddAgentModal
        isOpen={activeQuickAction === 'agent'}
        onClose={() => {
          handleCloseActiveAction();
          onClose();
        }}
      />

      <AddPartnerModal
        isOpen={activeQuickAction === 'partner'}
        onClose={() => {
          handleCloseActiveAction();
          onClose();
        }}
      />
    </>
  );
};
