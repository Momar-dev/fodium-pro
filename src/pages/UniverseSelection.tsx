import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Bus,
  ArrowRight,
  Shield,
  Sparkles,
  Users,
  Ticket,
  BarChart3,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export const UniverseSelection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [transportModalOpen, setTransportModalOpen] = useState(false);

  const handleEnterEventPro = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
            F
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-white text-lg tracking-tight font-display">FODIUM</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500 text-white">
              PRO
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Écosystème Professionnel Fodium
        </div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto py-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-orange-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sélection de votre univers métier</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Pilotez vos opérations avec Fodium Pro
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Choisissez l’univers d’exploitation adapté à votre secteur d’activité pour accéder à votre console de gestion.
          </p>
        </div>

        {/* 2 Universe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* UNIVERS 1: ÉVÉNEMENT (Actif & Disponible) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#161F30] to-[#0E1523] border-2 border-orange-500/50 shadow-2xl shadow-orange-500/10 flex flex-col justify-between relative group"
          >
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Opérationnel
              </span>
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-6">
                <Calendar className="w-7 h-7" />
              </div>

              <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-1">
                Univers 01
              </div>
              <h2 className="text-2xl font-black text-white font-display mb-3">
                FODIUM ÉVÉNEMENT
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                La plateforme tout-en-un pour créer, organiser, vendre, contrôler et piloter vos événements culturels et sportifs au Sénégal.
              </p>

              {/* Modules inclus */}
              <div className="space-y-2.5 mb-8 border-t border-slate-800/80 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Billetterie Digitale & Physique :</strong> Vente en ligne & carnets QR</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Gestion des Vendeurs :</strong> Quotas, commissions & points relais</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Agents & Contrôle d'accès :</strong> Scanners portiques sécurisés</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Partenaires & Sponsors :</strong> 8 catégories d’accréditations</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnterEventPro}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <span>Entrer dans Fodium Pro</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* UNIVERS 2: TRANSPORT (Bientôt Disponible) */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#121824]/60 border border-slate-800/80 flex flex-col justify-between relative opacity-85 hover:opacity-100 transition-opacity"
          >
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Bientôt disponible
              </span>
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-6">
                <Bus className="w-7 h-7" />
              </div>

              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                Univers 02
              </div>
              <h2 className="text-2xl font-black text-slate-200 font-display mb-3">
                FODIUM TRANSPORT
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Le module dédié aux transporteurs, flottes de navettes événementielles et lignes de bus spéciales vers vos manifestations.
              </p>

              {/* Modules à venir */}
              <div className="space-y-2.5 mb-8 border-t border-slate-800/80 pt-4 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                  <span>Gestion des flottes de bus & navettes événementielles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                  <span>Attribution des chauffeurs et billetterie trajet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                  <span>Suivi GPS en temps réel & synchronisation retours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                  <span>Validation des passagers aux points de ramassage</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTransportModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700/60 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>En savoir plus</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pb-4 text-center text-xs text-slate-400">
        © 2026 Kanzey Media Group · Fodium Pro — Dakar, Sénégal · Tous droits réservés.
      </div>

      {/* Modal Transport "Bientôt disponible" */}
      {transportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setTransportModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-[#121824] border border-slate-800 rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fodium Transport arrive bientôt !</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Nous finalisons l'interconnexion avec les transporteurs agréés de Dakar et des régions pour proposer la réservation de navettes synchronisées avec vos billets d'événements.
            </p>
            <button
              type="button"
              onClick={() => setTransportModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Compris, retour aux événements
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
