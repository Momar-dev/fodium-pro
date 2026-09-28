import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DesktopSidebar } from '../navigation/DesktopSidebar';
import { TopNavbar } from '../navigation/TopNavbar';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { QuickActionModal } from '../actions/QuickActionModal';
import { useProData } from '../../context/ProDataContext';

export const ProLayout: React.FC = () => {
  const { openQuickActionModal, setOpenQuickActionModal } = useProData();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthOrWelcome = ['/welcome', '/login', '/pin-unlock'].includes(location.pathname);

  if (isAuthOrWelcome) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-8">
        <TopNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Central Quick Action Sheet / Modal */}
      <QuickActionModal
        isOpen={openQuickActionModal}
        onClose={() => setOpenQuickActionModal(false)}
        onEventCreated={(eventId) => {
          navigate(`/events/${eventId}`);
        }}
      />
    </div>
  );
};
