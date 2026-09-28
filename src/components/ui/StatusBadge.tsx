import React from 'react';
import { EventStatus } from '../../types';

interface StatusBadgeProps {
  status: EventStatus | 'actif' | 'en_attente' | 'inactif' | 'hors_ligne' | 'confirme' | 'en_discussion' | 'contrat_signe' | 'livre' | 'en_impression' | 'en_traitement' | 'paye';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'ongoing':
      case 'actif':
      case 'confirme':
      case 'livre':
      case 'paye':
        return {
          label: status === 'ongoing' ? 'En vente' : status === 'confirme' ? 'Confirmé' : status === 'livre' ? 'Livré' : status === 'paye' ? 'Payé' : 'Actif',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'upcoming':
      case 'contrat_signe':
      case 'en_impression':
        return {
          label: status === 'upcoming' ? 'À venir' : status === 'contrat_signe' ? 'Contrat signé' : 'En impression',
          color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 'en_attente':
      case 'en_discussion':
      case 'en_traitement':
        return {
          label: status === 'en_discussion' ? 'En discussion' : status === 'en_traitement' ? 'En traitement' : 'En attente',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'completed':
      case 'inactif':
      case 'hors_ligne':
        return {
          label: status === 'completed' ? 'Terminé' : status === 'hors_ligne' ? 'Hors ligne' : 'Inactif',
          color: 'bg-slate-800 text-slate-400 border-slate-700',
          dot: 'bg-slate-500',
        };
      default:
        return {
          label: status,
          color: 'bg-slate-800 text-slate-400 border-slate-700',
          dot: 'bg-slate-500',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};
