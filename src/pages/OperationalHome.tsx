import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Ticket,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Plus,
  Users,
  Shield,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useProData } from '../context/ProDataContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';

export const OperationalHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    events,
    sales,
    vendors,
    agents,
    partners,
    setOpenQuickActionModal,
    setActiveQuickAction,
  } = useProData();

  // Flagship current event: WALO UP 2026
  const featuredEvent = events.find((e) => e.id === 'walo-up-2026') || events[0];

  const fillPercentage = featuredEvent
    ? Math.round((featuredEvent.ticketsSold / featuredEvent.totalCapacity) * 100)
    : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. TOP OPERATIONAL HERO: "QUE SE PASSE-T-IL MAINTENANT ?" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-orange-400 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Opérations en temps réel · {user.organization.name}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Activité Opérationnelle
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Suivi en direct de votre événement phare et des flux de ventes sur le terrain
          </p>
        </div>

        {/* Quick Action Trigger */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setOpenQuickActionModal(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Action rapide</span>
          </button>
        </div>
      </div>

      {/* 2. OPERATIONAL SPOTLIGHT: WALO UP 2026 (Événement Actuel en Vente) */}
      {featuredEvent && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#162032] via-[#101726] to-[#0B0F17] border border-orange-500/30 p-5 sm:p-7 shadow-xl">
          {/* Background image preview with high-grade gradient scrim */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src={featuredEvent.bannerUrl}
              alt={featuredEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/90 to-transparent" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[11px] font-bold">
                    Événement phare en cours
                  </span>
                  <StatusBadge status={featuredEvent.status} />
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {featuredEvent.location}, {featuredEvent.city}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  {featuredEvent.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/events/${featuredEvent.id}`)}
                className="self-start sm:self-center px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer shrink-0"
              >
                <span>Gérer l'événement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Instant Operational Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-2xl bg-[#0B0F17]/80 border border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-orange-400" />
                  Billets vendus
                </div>
                <div className="text-lg sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                  {featuredEvent.ticketsSold.toLocaleString()}{' '}
                  <span className="text-xs text-slate-500 font-normal">/ {featuredEvent.totalCapacity}</span>
                </div>
                <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0F17]/80 border border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Chiffre d’affaires
                </div>
                <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                  {featuredEvent.totalRevenue.toLocaleString()} <span className="text-xs text-slate-400">FCFA</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">100% collecté Wave / OM</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0F17]/80 border border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Taux de remplissage
                </div>
                <div className="text-lg sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                  {fillPercentage}%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Reste {featuredEvent.totalCapacity - featuredEvent.ticketsSold} places
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0F17]/80 border border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Date de l'événement
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  27 Déc. 2026
                </div>
                <div className="text-[11px] text-orange-400 font-semibold mt-1">
                  18:00 · Stade Dagana
                </div>
              </div>
            </div>

            {/* Alert Banner if present */}
            {featuredEvent.alertMessage && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="text-white">Alerte opérationnelle : </strong>
                  {featuredEvent.alertMessage}
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/events/${featuredEvent.id}`)}
                  className="text-amber-400 hover:text-white font-bold underline shrink-0 cursor-pointer"
                >
                  Résoudre
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. TWO-COLUMN OPERATIONAL WORKFLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: DIRECT SALES STREAM & DISPATCH */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Recent Sales Feed */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121824] border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Dernières transactions en direct
                </h3>
              </div>
              <span className="text-xs text-slate-400">Flux instantané</span>
            </div>

            <div className="space-y-2.5">
              {sales.slice(0, 5).map((sale) => (
                <div
                  key={sale.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[#0B0F17] border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 ${
                        sale.paymentMethod === 'wave'
                          ? 'bg-[#1DC4FF]/10 border-[#1DC4FF]/30 text-[#1DC4FF]'
                          : sale.paymentMethod === 'orange_money'
                          ? 'bg-[#FF6600]/10 border-[#FF6600]/30 text-[#FF6600]'
                          : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                      }`}
                    >
                      {sale.paymentMethod === 'wave'
                        ? 'W'
                        : sale.paymentMethod === 'orange_money'
                        ? 'OM'
                        : 'CB'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white truncate">{sale.buyerName}</span>
                        <span className="text-[11px] text-slate-400">({sale.quantity}x {sale.categoryName})</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{sale.timestamp}</span>
                        <span>·</span>
                        <span>
                          {sale.channel === 'online' ? 'Vente en ligne' : `Vendeur: ${sale.vendorName}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono tabular-nums">
                      +{sale.amount.toLocaleString()} FCFA
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Validé</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Team & Vendors Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Top Vendors */}
            <div className="p-5 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  Réseau Vendeurs ({vendors.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveQuickAction('vendor');
                  }}
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                >
                  + Ajouter
                </button>
              </div>

              <div className="space-y-2">
                {vendors.slice(0, 3).map((vnd) => (
                  <div
                    key={vnd.id}
                    className="p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{vnd.name}</div>
                      <div className="text-[10px] text-slate-400">{vnd.city}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-white">{vnd.ticketsSold} billets</div>
                      <div className="text-[10px] text-emerald-400">
                        {vnd.revenueGenerated.toLocaleString()} FCFA
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Control Agents */}
            <div className="p-5 rounded-3xl bg-[#121824] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  Contrôle d'accès ({agents.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveQuickAction('agent');
                  }}
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                >
                  + Accréditer
                </button>
              </div>

              <div className="space-y-2">
                {agents.slice(0, 3).map((agt) => (
                  <div
                    key={agt.id}
                    className="p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{agt.name}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                        {agt.assignedGate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400">{agt.scansCount} scans</div>
                      <div className="text-[10px] text-slate-400">Batt. {agt.batteryLevel}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OPERATIONAL SHORTCUTS & PARTNERS */}
        <div className="space-y-6">
          {/* Quick Operational Shortcuts */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121824] border border-slate-800/90 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Raccourcis Opérationnels
            </h3>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setActiveQuickAction('ticket');
                }}
                className="w-full text-left p-3 rounded-2xl bg-[#0B0F17] hover:bg-slate-800/60 border border-slate-800 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                      Billets physiques
                    </div>
                    <div className="text-[10px] text-slate-400">Commander des carnets QR</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveQuickAction('partner');
                }}
                className="w-full text-left p-3 rounded-2xl bg-[#0B0F17] hover:bg-slate-800/60 border border-slate-800 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                      Ajouter un partenaire
                    </div>
                    <div className="text-[10px] text-slate-400">Sponsor, média, exposant...</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/events')}
                className="w-full text-left p-3 rounded-2xl bg-[#0B0F17] hover:bg-slate-800/60 border border-slate-800 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                      Tous les événements
                    </div>
                    <div className="text-[10px] text-slate-400">{events.length} manifestations enregistrées</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Confirmed Key Partners */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121824] border border-slate-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Partenaires & Accréditations ({partners.length})
              </h3>
              <span className="text-[10px] text-slate-400">WALO UP 2026</span>
            </div>

            <div className="space-y-2">
              {partners.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="p-2.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-white truncate">{p.company}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{p.category}</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {p.status === 'confirme' ? 'Confirmé' : p.status === 'contrat_signe' ? 'Signé' : 'En cours'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
