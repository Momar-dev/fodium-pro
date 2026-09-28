import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Sparkles, Bell, Shield, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProData } from '../../context/ProDataContext';
import { UserAvatar } from '../ui/UserAvatar';

export const TopNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, lockWithPin } = useAuth();
  const { setOpenQuickActionModal } = useProData();

  const isAuthOrWelcome = ['/welcome', '/login', '/pin-unlock'].includes(location.pathname);
  if (isAuthOrWelcome) return null;

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Accueil Opérationnel';
    if (location.pathname.startsWith('/events/')) return 'Gestion d’Événement';
    if (location.pathname === '/events') return 'Tous les Événements';
    if (location.pathname === '/analytics') return 'Tableau de Bord Analytique';
    if (location.pathname === '/profile') return 'Profil & Organisation';
    return 'Espace Pro';
  };

  return (
    <header className="sticky top-0 z-20 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-sm">
              F
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight font-display">
              FODIUM
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider px-1 py-0.5 rounded bg-orange-500 text-white">
              PRO
            </span>
          </Link>
        </div>

        {/* Desktop Title & Breadcrumbs */}
        <div className="hidden md:flex items-center gap-2">
          <h1 className="text-base font-bold text-white tracking-tight">{getPageTitle()}</h1>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-medium">{user.organization.name}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ventes en direct</span>
        </div>

        {/* Lock with PIN button */}
        <button
          type="button"
          onClick={() => {
            lockWithPin();
            navigate('/pin-unlock');
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          title="Verrouiller la session par code PIN"
        >
          <Lock className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Verrouiller PIN</span>
        </button>

        {/* Mobile Profile Icon */}
        <Link
          to="/profile"
          className="md:hidden flex items-center"
          title="Voir le profil"
        >
          <UserAvatar size="sm" name={user.name} />
        </Link>

        {/* Switch to Welcome Universe */}
        <Link
          to="/welcome"
          className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 transition-colors hidden lg:flex items-center gap-1"
        >
          <span>Univers</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
};
