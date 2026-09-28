import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Ticket,
  Users,
  CreditCard,
  PieChart,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { useProData } from '../context/ProDataContext';
import { StatCard } from '../components/ui/StatCard';

export const AnalyticsDashboard: React.FC = () => {
  const { events, vendors, sales } = useProData();
  const [selectedPeriod, setSelectedPeriod] = useState<'30d' | '90d' | 'year' | 'all'>('year');

  const totalConsolidatedRevenue = events.reduce((sum, e) => sum + e.totalRevenue, 0);
  const totalTicketsSold = events.reduce((sum, e) => sum + e.ticketsSold, 0);
  const totalCapacityAll = events.reduce((sum, e) => sum + e.totalCapacity, 0);

  // Payment Breakdown
  const paymentBreakdown = [
    { label: 'Wave Mobile Money', percentage: 56, amount: Math.round(totalConsolidatedRevenue * 0.56), color: 'bg-[#1DC4FF]' },
    { label: 'Orange Money Sénégal', percentage: 32, amount: Math.round(totalConsolidatedRevenue * 0.32), color: 'bg-[#FF6600]' },
    { label: 'Cartes Bancaires (Visa/MC)', percentage: 8, amount: Math.round(totalConsolidatedRevenue * 0.08), color: 'bg-purple-500' },
    { label: 'Espèces / Guichets', percentage: 4, amount: Math.round(totalConsolidatedRevenue * 0.04), color: 'bg-emerald-400' },
  ];

  // Channel breakdown
  const onlineSales = Math.round(totalTicketsSold * 0.65);
  const vendorSales = totalTicketsSold - onlineSales;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-orange-400 font-semibold mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Pilotage Analytique & Stratégique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Tableau de Bord Analytique
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Analyse comparative de vos ventes, canaux d’encaissement et rentabilité
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#121824] border border-slate-800 self-start sm:self-auto">
          {[
            { id: '30d', label: '30 jours' },
            { id: '90d', label: '3 mois' },
            { id: 'year', label: 'Année 2026' },
            { id: 'all', label: 'Historique' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedPeriod(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedPeriod === tab.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 High-Level Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Chiffre d’Affaires Consolidé"
          value={`${(totalConsolidatedRevenue / 1000000).toFixed(2)}M`}
          subValue="17 110 000 FCFA au total"
          trend="+38.4% vs 2025"
          trendType="positive"
          icon={TrendingUp}
        />

        <StatCard
          label="Volume Total de Billets"
          value={totalTicketsSold.toLocaleString()}
          subValue={`Sur ${totalCapacityAll.toLocaleString()} places`}
          trend={`${Math.round((totalTicketsSold / totalCapacityAll) * 100)}% taux global`}
          trendType="positive"
          icon={Ticket}
        />

        <StatCard
          label="Part Paiements Mobiles"
          value="88%"
          subValue="Wave + Orange Money"
          trend="Validation < 3s"
          trendType="positive"
          icon={CreditCard}
        />

        <StatCard
          label="Force de Vente Terrain"
          value={`${vendors.length} Vendeurs`}
          subValue="1 280 000 FCFA générés"
          trend="35% du volume global"
          trendType="neutral"
          icon={Users}
        />
      </div>

      {/* 2 Grid: Monthly Trends & Payment Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Performance by Event Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Recettes comparées par événement
              </h3>
              <p className="text-xs text-slate-400">
                Chiffre d'affaires collecté en FCFA par manifestation
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Consolidé</span>
          </div>

          {/* Clean Bar Visualization */}
          <div className="space-y-4">
            {events.map((ev) => {
              const share = Math.round((ev.totalRevenue / totalConsolidatedRevenue) * 100);

              return (
                <div key={ev.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{ev.title} ({ev.city})</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-mono">{share}%</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {ev.totalRevenue.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Payment Mix Breakdown */}
        <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Mix des Moyens de Paiement
            </h3>
            <p className="text-xs text-slate-400">
              Répartition des encaissements par opérateur
            </p>
          </div>

          <div className="space-y-4">
            {paymentBreakdown.map((pm, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${pm.color}`} />
                    <span className="text-slate-200 font-semibold">{pm.label}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{pm.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pm.color}`}
                    style={{ width: `${pm.percentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono text-right">
                  {pm.amount.toLocaleString()} FCFA
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribution Channels: Online vs Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Canaux de Distribution
          </h3>
          <p className="text-xs text-slate-400">
            Comparaison entre achat en ligne direct et points de vente physiques
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Vente en ligne (Web/Mobile)</span>
              <span className="text-2xl font-black text-white font-mono">65%</span>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                {onlineSales.toLocaleString()} billets écoulés
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Réseau Vendeurs & Guichets</span>
              <span className="text-2xl font-black text-orange-400 font-mono">35%</span>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                {vendorSales.toLocaleString()} billets physiques
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Efficacité Opérationnelle
          </h3>
          <p className="text-xs text-slate-400">
            Indicateurs de sécurité et d'admission aux entrées
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Taux de faux billets / rejets</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">0.8%</span>
              <div className="text-[11px] text-slate-500 mt-1">
                Grâce au QR dynamique Fodium
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Cadence moyenne d'entrée</span>
              <span className="text-2xl font-black text-white font-mono">1.8s</span>
              <div className="text-[11px] text-slate-500 mt-1">
                Temps par festivalier au scan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
