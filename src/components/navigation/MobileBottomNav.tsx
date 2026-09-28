import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Plus, BarChart3, User } from 'lucide-react';
import { useProData } from '../../context/ProDataContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { setOpenQuickActionModal } = useProData();

  // If on login, welcome, or pin screen, don't show the bottom nav
  const isAuthOrWelcome = ['/welcome', '/login', '/pin-unlock'].includes(location.pathname);
  if (isAuthOrWelcome) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 pb-safe">
      <div className="flex items-center justify-around h-16 relative max-w-md mx-auto">
        {/* 1. ACCUEIL */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 h-full transition-colors ${
              isActive ? 'text-orange-500 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Accueil</span>
        </NavLink>

        {/* 2. ÉVÉNEMENTS */}
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 h-full transition-colors ${
              isActive ? 'text-orange-500 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Événements</span>
        </NavLink>

        {/* 3. CENTRAL ACTION BUTTON (+) */}
        <div className="relative -top-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setOpenQuickActionModal(true)}
            className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-500/35 border-2 border-[#0B0F17] flex items-center justify-center active:scale-90 hover:scale-105 transition-all cursor-pointer"
            aria-label="Nouvelle action rapide"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. TABLEAU DE BORD */}
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 h-full transition-colors ${
              isActive ? 'text-orange-500 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <BarChart3 className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Dashboard</span>
        </NavLink>

        {/* 5. PROFIL */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 h-full transition-colors ${
              isActive ? 'text-orange-500 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Profil</span>
        </NavLink>
      </div>
    </div>
  );
};
