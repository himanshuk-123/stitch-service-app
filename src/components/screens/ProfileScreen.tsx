import React from 'react';
import {
  Calendar,
  MapPin,
  CreditCard,
  Bell,
  Sliders,
  HelpCircle,
  ShieldCheck,
  FileText,
  Star,
  ChevronRight,
  LogOut,
  LogIn,
  Edit3,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';
import { BottomNavigation } from '../layout/BottomNavigation';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    isLoggedIn,
    logout,
    brandConfig,
    setIsCustomizerOpen,
    setIsLocationModalOpen,
    setIsNotificationOpen,
    setIsEditProfileOpen,
    navigate,
    showToast,
  } = useApp();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/70">
      <div className="shrink-0">
        <AppHeader
          title="Profile"
          showBack={false}
          showFilter={false}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-6">
        {/* User Card / Guest Card */}
        {isLoggedIn ? (
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 text-lg font-black"
                style={{
                  backgroundColor: `${brandConfig.primaryColor}20`,
                  color: brandConfig.primaryColor,
                }}
              >
                {user.avatarText || user.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                <p className="text-xs text-slate-500">{user.phone}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              id="btn-edit-profile-trigger"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
              aria-label="Edit Profile"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-white font-bold text-lg">
                ?
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Guest User</h3>
                <p className="text-xs text-white/60">Log in to view bookings & manage profile</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => navigate('login')}
                className="flex-1 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition-all text-center"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('signup')}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all text-center"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {/* White-Label Rebranding Banner */}
        <div
          onClick={() => setIsCustomizerOpen(true)}
          id="btn-open-white-label-customizer"
          className="relative overflow-hidden p-4 rounded-3xl text-white shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-[0.99] group"
          style={{
            background: `linear-gradient(135deg, ${brandConfig.primaryColor} 0%, #1e1b4b 100%)`,
          }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1 max-w-[80%]">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-xs">
                <Sparkles className="h-3 w-3" />
                <span>White-Label Customizer</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Customize Branding & Theme
              </h4>
              <p className="text-[11px] text-white/80 leading-relaxed">
                Adjust brand name, colors, currency, pricing, and services in real time to sell to any client.
              </p>
            </div>

            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-white backdrop-blur-xs group-hover:translate-x-1 transition-transform">
              <Sliders className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        {/* MY ACCOUNT section */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            MY ACCOUNT
          </h4>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            <button
              onClick={() => navigate('my_bookings')}
              id="menu-my-bookings"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">My Bookings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              onClick={() => setIsLocationModalOpen(true)}
              id="menu-saved-addresses"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-800">Saved Addresses</span>
                  <p className="text-[10px] text-slate-400">
                    {user.savedAddresses.length} addresses saved
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              onClick={() => showToast('Payment settings available')}
              id="menu-payment-methods"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Payment Methods</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              onClick={() => setIsNotificationOpen(true)}
              id="menu-notifications"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <Bell className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Notifications</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* SUPPORT & PREFERENCES section */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            SUPPORT & PREFERENCES
          </h4>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            <button
              onClick={() => showToast('Fixora 24/7 Support: support@fixora.app')}
              id="menu-help-center"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Help Center</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              onClick={() => showToast('Privacy Policy: All customer data is encrypted & secured.')}
              id="menu-privacy-policy"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Privacy Policy</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              onClick={() => showToast('Terms of Service: Standard On-Demand Services Agreement')}
              id="menu-terms-of-service"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Terms of Service</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              onClick={() => showToast('Thank you for rating 5 stars!')}
              id="menu-rate-app"
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Rate {brandConfig.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Log out / Log in action button */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              navigate('login');
            }}
            id="btn-logout"
            className="w-full py-3 px-4 rounded-2xl bg-white border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('login')}
            id="btn-login"
            className="w-full py-3 px-4 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
            style={{ backgroundColor: brandConfig.primaryColor }}
          >
            <LogIn className="h-4 w-4" />
            <span>Log in to your account</span>
          </button>
        )}

        {/* Footer info */}
        <div className="text-center pt-2 pb-4">
          <p className="text-[11px] font-semibold text-slate-400">
            {brandConfig.name} v2.4.0 • White-Label Edition
          </p>
          <p className="text-[10px] text-slate-400">
            Engineered for high-growth on-demand platforms
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
