import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  BarChart3,
  User,
  Plus,
  Lock,
  Building2,
  ChevronDown,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProData } from '../../context/ProDataContext';
import { UserAvatar } from '../ui/UserAvatar';

export const DesktopSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, lockWithPin } = useAuth();
  const { setOpenQuickActionModal } = useProData();

  const isAuthOrWelcome = ['/welcome', '/login', '/pin-unlock'].includes(location.pathname);
  if (isAuthOrWelcome) return null;

  const navItems = [
    {
      to: '/',
      end: true,
      label: 'Accueil Opérationnel',
      subtitle: 'En direct & alertes',
      icon: Home,
    },
    {
      to: '/events',
      label: 'Événements',
      subtitle: 'Billetterie & gestion',
      icon: Calendar,
    },
    {
      to: '/analytics',
      label: 'Tableau de bord',
      subtitle: 'Performances & ventes',
      icon: BarChart3,
    },
    {
      to: '/profile',
      label: 'Organisation & Profil',
      subtitle: user.organization.name,
      icon: User,
    },
  ];

  const handleLockPin = () => {
    lockWithPin();
    navigate('/pin-unlock');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#0B0F17] border-r border-slate-800/80 shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight font-display">
                FODIUM
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500 text-white leading-none">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Espace Organisateur</div>
          </div>
        </div>
      </div>

      {/* Organization Switcher Card */}
      <div className="p-4 border-b border-slate-800/60">
        <div className="p-3 rounded-xl bg-[#121824] border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user.organization.name}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Compte certifié
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Central Action CTA button */}
      <div className="px-4 pt-4">
        <button
          type="button"
          onClick={() => setOpenQuickActionModal(true)}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer group"
        >
          <Plus className="w-4 h-4 stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
          <span>Nouvelle action</span>
        </button>
      </div>

      {/* Navigation links */}
      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 pb-2">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div className="text-left leading-tight min-w-0">
                <div className="text-xs font-medium text-inherit truncate">{item.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{item.subtitle}</div>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer User Info & PIN quick lock */}
      <div className="p-4 border-t border-slate-800/80 bg-[#0B0F17]/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <UserAvatar size="md" name={user.name} />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.role}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLockPin}
            title="Verrouiller rapidement avec le PIN"
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Verrouiller l'écran avec le PIN"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
