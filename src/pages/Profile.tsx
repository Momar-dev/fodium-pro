import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Building2,
  Lock,
  CreditCard,
  Bell,
  ShieldCheck,
  Check,
  KeyRound,
  LogOut,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/ui/UserAvatar';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, changePin, lockWithPin, logout } = useAuth();

  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [notifSales, setNotifSales] = useState(true);
  const [notifQuotas, setNotifQuotas] = useState(true);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      changePin(newPin);
      setPinSuccess(true);
      setTimeout(() => {
        setPinSuccess(false);
        setPinModalOpen(false);
        setNewPin('');
      }, 900);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Profil & Organisation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Paramètres du compte administrateur Kanzey Media et informations légales
        </p>
      </div>

      {/* User Identity Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <UserAvatar size="xl" name={user.name} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">{user.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold">
                Directeur Général
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.organization.name} · Dakar, Sénégal</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {user.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                {user.phone}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Organization Legal Information */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-orange-400" />
          <h3 className="text-base font-bold text-white">Informations de l'Organisation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <span className="text-slate-500 block mb-0.5">Raison sociale</span>
            <span className="font-semibold text-white">{user.organization.legalName}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <span className="text-slate-500 block mb-0.5">NINEA & Registre de Commerce (RCCM)</span>
            <span className="font-semibold text-white font-mono">{user.organization.ninea} · {user.organization.rccm}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <span className="text-slate-500 block mb-0.5">Siège social</span>
            <span className="font-semibold text-white">{user.organization.address}, {user.organization.city}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <span className="text-slate-500 block mb-0.5">Contact administratif</span>
            <span className="font-semibold text-white">{user.organization.email} · {user.organization.phone}</span>
          </div>
        </div>
      </div>

      {/* Associated Accounts for Payouts */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Comptes d’Encaissement Associés</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div className="text-[11px] font-bold text-[#1DC4FF] mb-1">Wave Business</div>
            <div className="font-mono text-white font-bold">{user.organization.waveBusinessId}</div>
            <div className="text-[10px] text-emerald-400 mt-1">Versement instantané activé</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div className="text-[11px] font-bold text-[#FF6600] mb-1">Orange Money Marchand</div>
            <div className="font-mono text-white font-bold">{user.organization.omMarchandId}</div>
            <div className="text-[10px] text-emerald-400 mt-1">Compte PRO certifié</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div className="text-[11px] font-bold text-slate-300 mb-1">Compte Bancaire (RIB/IBAN)</div>
            <div className="font-mono text-white font-bold truncate">{user.organization.bankAccount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Virements sous 24h</div>
          </div>
        </div>
      </div>

      {/* Security & PIN Settings */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-400" />
            <div>
              <h3 className="text-base font-bold text-white">Sécurité & Déverrouillage PIN</h3>
              <p className="text-xs text-slate-400">
                Code secret à 4 chiffres pour déverrouiller l'écran rapidement sur cet appareil
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPinModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Modifier le PIN
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-white">Statut du code PIN</div>
            <div className="text-[11px] text-slate-400">
              Code actuel actif : <span className="font-mono text-orange-400 font-bold">{user.pinCode}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              lockWithPin();
              navigate('/pin-unlock');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Tester le verrouillage
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-bold text-white">Alertes & Notifications</h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 cursor-pointer">
            <div>
              <div className="font-semibold text-white">Alertes de ventes en temps réel</div>
              <div className="text-[11px] text-slate-400">Recevoir une notification push à chaque achat de billet</div>
            </div>
            <input
              type="checkbox"
              checked={notifSales}
              onChange={() => setNotifSales(!notifSales)}
              className="w-4 h-4 rounded text-orange-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 cursor-pointer">
            <div>
              <div className="font-semibold text-white">Alertes de franchissement de quotas (90%)</div>
              <div className="text-[11px] text-slate-400">Être notifié quand une catégorie de billet est presque épuisée</div>
            </div>
            <input
              type="checkbox"
              checked={notifQuotas}
              onChange={() => setNotifQuotas(!notifQuotas)}
              className="w-4 h-4 rounded text-orange-500"
            />
          </label>
        </div>
      </div>

      {/* Change PIN Modal */}
      {pinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setPinModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#121824] border border-slate-800 rounded-2xl p-6 text-center shadow-2xl">
            {pinSuccess ? (
              <div className="py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Code PIN mis à jour !</h3>
              </div>
            ) : (
              <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="text-base font-bold text-white">Nouveau Code PIN</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Entrez exactement 4 chiffres pour votre nouveau code de déverrouillage
                  </p>
                </div>
                <div>
                  <input
                    type="password"
                    maxLength={4}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ex: 2026"
                    required
                    className="w-full text-center text-2xl tracking-widest font-mono py-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPinModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={newPin.length !== 4}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs cursor-pointer"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
