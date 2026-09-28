import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Ticket,
  Plus,
  ArrowRight,
  TrendingUp,
  Search,
  Filter,
  Edit3,
  Trash2,
  Globe,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useProData } from '../context/ProDataContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { EventStatus, ProEvent } from '../types';
import { EditEventModal } from '../components/events/EditEventModal';
import { DeleteEventModal } from '../components/events/DeleteEventModal';
import { PublicTicketPreviewModal } from '../components/events/PublicTicketPreviewModal';

export const EventsList: React.FC = () => {
  const navigate = useNavigate();
  const { events, setOpenQuickActionModal, setActiveQuickAction } = useProData();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const [editingEvent, setEditingEvent] = useState<ProEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<ProEvent | null>(null);
  const [publicPreviewEvent, setPublicPreviewEvent] = useState<ProEvent | null>(null);

  const filteredEvents = events.filter((ev) => {
    const matchesFilter = filterStatus === 'all' || ev.status === filterStatus;
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.city.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Mes Événements
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Gérez vos billetteries, jauges de vente et équipes terrain
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveQuickAction('event');
          }}
          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Créer un événement</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#121824] border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'ongoing', label: 'En cours' },
            { id: 'upcoming', label: 'À venir' },
            { id: 'completed', label: 'Terminés' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un événement ou ville..."
            className="w-full pl-9 pr-3.5 py-2 bg-[#121824] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const fillRate = Math.round((event.ticketsSold / event.totalCapacity) * 100);

          return (
            <motion.div
              key={event.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl bg-[#121824] border border-slate-800/90 hover:border-slate-700/80 shadow-lg overflow-hidden flex flex-col justify-between group"
            >
              {/* Event Image Banner with Scrim */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
                <img
                  src={event.bannerUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/40 to-transparent" />

                {/* Top Status & Date Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <StatusBadge status={event.status} />
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold">
                    {event.date}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white font-display tracking-tight drop-shadow-md">
                    {event.title}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    <span className="truncate">{event.location}, {event.city}</span>
                  </div>
                </div>
              </div>

              {/* Event Metrics & Gauge */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Gauge */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400 font-medium">Progression billetterie</span>
                      <span className="text-white font-bold font-mono">{fillRate}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                        style={{ width: `${fillRate}%` }}
                      />
                    </div>
                  </div>

                  {/* 2 Key Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <div className="p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 font-medium">Billets vendus</div>
                      <div className="text-sm font-extrabold text-white font-mono tabular-nums mt-0.5">
                        {event.ticketsSold.toLocaleString()}{' '}
                        <span className="text-[10px] text-slate-500 font-normal">/ {event.totalCapacity}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 font-medium">Chiffre d’affaires</div>
                      <div className="text-sm font-extrabold text-emerald-400 font-mono tabular-nums mt-0.5">
                        {event.totalRevenue.toLocaleString()} <span className="text-[9px] text-slate-400">FCFA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer group-hover:bg-orange-500 shadow-sm"
                  >
                    <span>Gérer</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPublicPreviewEvent(event)}
                    className="w-9 h-9 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-400 hover:text-orange-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Voir la page de billetterie publique"
                    aria-label="Lien public"
                  >
                    <Globe className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingEvent(event)}
                    className="w-9 h-9 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Modifier l'événement"
                    aria-label="Modifier"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingEvent(event)}
                    className="w-9 h-9 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-rose-500/40 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Supprimer l'événement"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Event Modal */}
      <EditEventModal
        isOpen={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        event={editingEvent}
      />

      {/* Delete Event Modal */}
      <DeleteEventModal
        isOpen={!!deletingEvent}
        onClose={() => setDeletingEvent(null)}
        event={deletingEvent}
      />

      {/* Public Ticket Preview Modal */}
      <PublicTicketPreviewModal
        isOpen={!!publicPreviewEvent}
        onClose={() => setPublicPreviewEvent(null)}
        event={publicPreviewEvent}
      />

      {filteredEvents.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
          <p className="text-sm text-slate-400">Aucun événement ne correspond à vos filtres.</p>
          <button
            type="button"
            onClick={() => {
              setFilterStatus('all');
              setSearch('');
            }}
            className="text-xs text-orange-400 font-bold underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
