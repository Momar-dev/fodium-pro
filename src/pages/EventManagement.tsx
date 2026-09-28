import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  DollarSign,
  Users,
  Shield,
  Handshake,
  FileText,
  Scan,
  AlertTriangle,
  Plus,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Percent,
  Receipt,
  Download,
  Sparkles,
  Edit3,
  Trash2,
  Globe,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useProData } from '../context/ProDataContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { UserAvatar } from '../components/ui/UserAvatar';
import { PARTNER_CATEGORIES } from '../types';
import { EditEventModal } from '../components/events/EditEventModal';
import { DeleteEventModal } from '../components/events/DeleteEventModal';
import { PublicTicketPreviewModal } from '../components/events/PublicTicketPreviewModal';

export const EventManagement: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const {
    getEventById,
    vendors,
    agents,
    partners,
    expenses,
    accessControl,
    setActiveQuickAction,
  } = useProData();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'ticketing'
    | 'finance'
    | 'team'
    | 'vendors'
    | 'agents'
    | 'partners'
    | 'control'
    | 'documents'
  >('overview');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublicPreviewOpen, setIsPublicPreviewOpen] = useState(false);

  const event = getEventById(eventId || '') || getEventById('walo-up-2026');

  if (!event) {
    return (
      <div className="p-12 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Événement introuvable</h3>
        <button
          onClick={() => navigate('/events')}
          className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold"
        >
          Retour aux événements
        </button>
      </div>
    );
  }

  // Filter items specifically for this event
  const eventVendors = vendors.filter((v) => v.eventId === event.id);
  const eventAgents = agents.filter((a) => a.eventId === event.id);
  const eventPartners = partners.filter((p) => p.eventId === event.id);
  const eventExpenses = expenses.filter((e) => e.eventId === event.id);

  const totalExpenses = eventExpenses.reduce((sum, item) => sum + item.amount, 0);
  const netMargin = event.totalRevenue - totalExpenses;
  const fillRate = Math.round((event.ticketsSold / event.totalCapacity) * 100);

  const tabs = [
    { id: 'overview', label: 'Vue d’ensemble', icon: Sparkles },
    { id: 'ticketing', label: 'Billetterie', icon: Ticket },
    { id: 'finance', label: 'Finances & Dépenses', icon: DollarSign },
    { id: 'team', label: 'Équipe & Accès', icon: Users },
    { id: 'vendors', label: `Vendeurs (${eventVendors.length})`, icon: Users },
    { id: 'agents', label: `Agents (${eventAgents.length})`, icon: Shield },
    { id: 'partners', label: `Partenaires (${eventPartners.length})`, icon: Handshake },
    { id: 'control', label: 'Contrôle d’accès', icon: Scan },
    { id: 'documents', label: 'Documents & Rapport', icon: FileText },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="w-9 h-9 rounded-xl bg-[#121824] border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Retour à la liste des événements"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-400">Événement</span>
              <span className="text-slate-600">·</span>
              <StatusBadge status={event.status} />
              <span className="text-xs text-orange-400 font-bold">{event.city}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Fodium Public Live Preview Button */}
          <button
            type="button"
            onClick={() => setIsPublicPreviewOpen(true)}
            className="px-3 py-2 rounded-xl bg-orange-500/15 border border-orange-500/35 hover:bg-orange-500/25 text-orange-400 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Voir la page de billetterie grand public"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Page Publique Fodium</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction('ticket')}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5 text-emerald-400" />
            <span>Billets physiques</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuickAction('vendor')}
            className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Ajouter vendeur</span>
          </button>

          {/* Edit Event Button */}
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Modifier les détails de l'événement"
            aria-label="Modifier l'événement"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Delete Event Button */}
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 flex items-center justify-center transition-colors cursor-pointer"
            title="Supprimer cet événement"
            aria-label="Supprimer cet événement"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-800 overflow-x-auto pb-px">
        <div className="flex items-center gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-orange-500 text-white bg-slate-800/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/15'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT 1: VUE D'ENSEMBLE */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <div className="text-xs text-slate-400 font-medium mb-1">Billets vendus</div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {event.ticketsSold.toLocaleString()}{' '}
                <span className="text-xs text-slate-500 font-normal">/ {event.totalCapacity}</span>
              </div>
              <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                  style={{ width: `${fillRate}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 mt-1.5">{fillRate}% de jauge atteinte</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <div className="text-xs text-slate-400 font-medium mb-1">Chiffre d’affaires brut</div>
              <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                {event.totalRevenue.toLocaleString()} <span className="text-xs text-slate-400">FCFA</span>
              </div>
              <div className="text-[11px] text-emerald-400/80 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Encaissements 100% sécurisés</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <div className="text-xs text-slate-400 font-medium mb-1">Dépenses engagées</div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {totalExpenses.toLocaleString()} <span className="text-xs text-slate-400">FCFA</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                {eventExpenses.length} postes comptables
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <div className="text-xs text-slate-400 font-medium mb-1">Marge nette prévisionnelle</div>
              <div className="text-2xl font-black text-orange-400 font-mono tabular-nums">
                {netMargin.toLocaleString()} <span className="text-xs text-slate-400">FCFA</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Rentabilité actuelle : {Math.round((netMargin / event.totalRevenue) * 100)}%
              </div>
            </div>
          </div>

          {/* Operational summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                À propos de l'événement
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {event.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Date & Horaires :</span>
                  <span className="font-semibold text-white">{event.date} ({event.time})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lieu & Ville :</span>
                  <span className="font-semibold text-white">{event.location}, {event.city}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Organisateur légal :</span>
                  <span className="font-semibold text-white">{event.organizerName}</span>
                </div>
              </div>
            </div>

            {/* Quick alert and actions */}
            <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Actions directes événement
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('ticketing')}
                  className="w-full text-left p-3 rounded-xl bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Ajuster les quotas de billets</span>
                  <Ticket className="w-3.5 h-3.5 text-orange-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('control')}
                  className="w-full text-left p-3 rounded-xl bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Tableau de contrôle d'accès</span>
                  <Scan className="w-3.5 h-3.5 text-rose-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('documents')}
                  className="w-full text-left p-3 rounded-xl bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Télécharger le manifeste billetterie</span>
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: BILLETTERIE */}
      {activeTab === 'ticketing' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Catégories & Tarification</h3>
              <p className="text-xs text-slate-400">
                Suivi des jauges et des encaissements par type de pass
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveQuickAction('ticket')}
              className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Commander billets physiques</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {event.categories.map((cat) => {
              const catFill = Math.round((cat.sold / cat.capacity) * 100);
              const catRev = cat.sold * cat.price;

              return (
                <div
                  key={cat.id}
                  className="p-5 rounded-3xl bg-[#121824] border border-slate-800/90 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{cat.name}</span>
                    <span className="text-sm font-extrabold text-orange-400 font-mono">
                      {cat.price.toLocaleString()} FCFA
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-tight">
                    {cat.description || 'Accès officiel'}
                  </p>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">Vendus / Capacité</span>
                      <span className="text-white font-mono font-bold">
                        {cat.sold} / {cat.capacity} ({catFill}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${catFill}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Revenus catégorie :</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {catRev.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: FINANCES & DÉPENSES */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          {/* Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Encaissements bruts (CA)</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {event.totalRevenue.toLocaleString()} FCFA
              </span>
              <div className="mt-2 text-[11px] text-slate-400">
                Wave : 58% · Orange Money : 32% · CB : 10%
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Dépenses opérationnelles</span>
              <span className="text-2xl font-black text-rose-400 font-mono">
                {totalExpenses.toLocaleString()} FCFA
              </span>
              <div className="mt-2 text-[11px] text-slate-400">
                Scène, sécurité, communication, logistique
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Résultat Net Prévisionnel</span>
              <span className="text-2xl font-black text-white font-mono">
                {netMargin.toLocaleString()} FCFA
              </span>
              <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
                Rentabilité brute de {Math.round((netMargin / event.totalRevenue) * 100)}%
              </div>
            </div>
          </div>

          {/* Expenses list */}
          <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Postes de dépenses ({eventExpenses.length})
              </h3>
              <span className="text-xs text-slate-400">Comptabilité analytique</span>
            </div>

            <div className="divide-y divide-slate-800">
              {eventExpenses.map((exp) => (
                <div key={exp.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-white">{exp.title}</div>
                    <div className="text-[11px] text-slate-400">
                      Fournisseur : {exp.vendorName} · {exp.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">
                      {exp.amount.toLocaleString()} FCFA
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        exp.status === 'paye'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {exp.status === 'paye' ? 'Payé' : 'En attente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: ÉQUIPE & ACCÈS */}
      {activeTab === 'team' && (
        <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Équipe d'organisation & Accès
              </h3>
              <p className="text-xs text-slate-400">
                Membres de l'organisation ayant des privilèges d'administration
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar size="sm" name="Momar Diop" />
                <div>
                  <div className="font-semibold text-white">Momar Diop</div>
                  <div className="text-[11px] text-slate-400">Directeur Général · Kanzey Media</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[11px] font-semibold">
                Super Admin
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  EN
                </div>
                <div>
                  <div className="font-semibold text-white">El Hadj Ndao</div>
                  <div className="text-[11px] text-slate-400">Régisseur Général & Technique</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold">
                Responsable Opérations
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  AB
                </div>
                <div>
                  <div className="font-semibold text-white">Awa Ba</div>
                  <div className="text-[11px] text-slate-400">Responsable Billetterie & Caisses</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                Gestionnaire Billetterie
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: VENDEURS */}
      {activeTab === 'vendors' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Réseau de Vendeurs Physiques ({eventVendors.length})
              </h3>
              <p className="text-xs text-slate-400">
                Points relais, promoteurs et billetterie décentralisée
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveQuickAction('vendor')}
              className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Ajouter un vendeur</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventVendors.map((vnd) => (
              <div
                key={vnd.id}
                className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{vnd.name}</h4>
                    <p className="text-xs text-slate-400">{vnd.phone} · {vnd.city}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      vnd.status === 'actif'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {vnd.status === 'actif' ? 'Actif' : 'En attente'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block">Ventes</span>
                    <span className="font-mono font-bold text-white">{vnd.ticketsSold} / {vnd.quota}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">CA Généré</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {vnd.revenueGenerated.toLocaleString()} F
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Commission</span>
                    <span className="font-mono font-bold text-orange-400">{vnd.commissionRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: AGENTS DE CONTRÔLE */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Agents de Contrôle d'Accès ({eventAgents.length})
              </h3>
              <p className="text-xs text-slate-400">
                Terminaux de scan mobiles et agents postés aux portiques
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveQuickAction('agent')}
              className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Accréditer un agent</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eventAgents.map((agt) => (
              <div
                key={agt.id}
                className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
                      {agt.matricule.replace('AGT-WALO-', 'P')}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{agt.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{agt.matricule}</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connecté" />
                </div>

                <div className="text-xs text-slate-300 bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Affectation :</span>
                  <span className="font-semibold">{agt.assignedGate}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Scans effectués :</span>
                  <span className="font-mono font-bold text-emerald-400">{agt.scansCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: PARTENAIRES & STANDS */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Partenaires & Accréditations ({eventPartners.length})
              </h3>
              <p className="text-xs text-slate-400">
                Sponsors, médias, institutions, prestataires, sécurité & restauration
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveQuickAction('partner')}
              className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Ajouter un partenaire</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventPartners.map((part) => {
              const catConfig = PARTNER_CATEGORIES.find((c) => c.id === part.category);

              return (
                <div
                  key={part.id}
                  className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{part.company}</h4>
                      <p className="text-xs text-slate-400">{part.contactName} ({part.phone})</p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${catConfig?.badgeColor || 'bg-slate-800 text-slate-300'}`}
                    >
                      {catConfig?.label || part.category}
                    </span>
                  </div>

                  {part.notes && (
                    <p className="text-xs text-slate-300 bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                      {part.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">
                      {part.boothLocation ? `Emplacement : ${part.boothLocation}` : 'Convention : Signée'}
                    </span>
                    {part.contributionValue ? (
                      <span className="font-mono font-bold text-emerald-400">
                        {part.contributionValue.toLocaleString()} FCFA
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Échange marchandise</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 8: CONTRÔLE D'ACCÈS EN TEMPS RÉEL */}
      {activeTab === 'control' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Billets Contrôlés</span>
              <span className="text-3xl font-black text-white font-mono">
                {accessControl.totalScanned}
              </span>
              <div className="text-[11px] text-emerald-400 mt-2">
                {accessControl.validTickets} entrées valides autorisées
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Tentatives Rejetées</span>
              <span className="text-3xl font-black text-rose-400 font-mono">
                {accessControl.invalidAttempts}
              </span>
              <div className="text-[11px] text-slate-400 mt-2">
                Billets déjà scannés ou faux QR
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Pic d'affluence</span>
              <span className="text-2xl font-bold text-orange-400">
                {accessControl.peakHour}
              </span>
              <div className="text-[11px] text-slate-400 mt-2">
                Flux moyen : {accessControl.currentRatePerHour} scans/h
              </div>
            </div>
          </div>

          {/* Gates breakdown */}
          <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Répartition par porte d'accès
            </h3>

            <div className="space-y-3">
              {accessControl.gates.map((gate, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div>
                      <span className="font-bold text-white">{gate.gateName}</span>
                      <span className="text-slate-500 ml-2">(Agent: {gate.agentName})</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">
                      {gate.scanned} entrées
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${(gate.scanned / accessControl.totalScanned) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 9: DOCUMENTS & RAPPORT */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Rapports Officiels & Documents Légaux
              </h3>
              <p className="text-xs text-slate-400">
                Génération des attestations, bordereaux SACEM/SODAV et clôture
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-xs font-bold text-white">
                    Bordereau Officiel des Recettes Billetterie (SODAV)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Déclaration certifiée des 742 billets vendus pour les droits d'auteurs
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Téléchargement du bordereau officiel SODAV généré en PDF.')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">
                    Rapport de Clôture & Rapprochement Bancaire Wave / OM
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Relevé détaillé des 1 860 000 FCFA avec références de transactions
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Téléchargement du relevé financier complet généré en PDF.')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
      />

      {/* Delete Event Modal */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        event={event}
        onDeleted={() => {
          navigate('/events');
        }}
      />

      {/* Public Ticket Preview & Sync Modal */}
      <PublicTicketPreviewModal
        isOpen={isPublicPreviewOpen}
        onClose={() => setIsPublicPreviewOpen(false)}
        event={event}
      />
    </div>
  );
};
