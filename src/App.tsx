import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { ServiceDetailScreen } from './components/screens/ServiceDetailScreen';
import { ChooseProfessionalScreen } from './components/screens/ChooseProfessionalScreen';
import { ProviderDetailScreen } from './components/screens/ProviderDetailScreen';
import { SelectDateTimeScreen } from './components/screens/SelectDateTimeScreen';
import { BookingSummaryScreen } from './components/screens/BookingSummaryScreen';
import { BookingConfirmedScreen } from './components/screens/BookingConfirmedScreen';
import { MyBookingsScreen } from './components/screens/MyBookingsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CustomizerDrawer } from './components/modals/CustomizerDrawer';
import { LocationPickerModal } from './components/modals/LocationPickerModal';
import { SearchModal } from './components/modals/SearchModal';
import { NotificationCenterModal } from './components/modals/NotificationCenterModal';
import { BookingDetailModal } from './components/modals/BookingDetailModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { Sparkles, Sliders, Smartphone, Laptop } from 'lucide-react';

const ScreenRenderer: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'home':
      return <HomeScreen />;
    case 'explore':
      return <ExploreScreen />;
    case 'service_detail':
      return <ServiceDetailScreen />;
    case 'choose_professional':
      return <ChooseProfessionalScreen />;
    case 'provider_detail':
      return <ProviderDetailScreen />;
    case 'select_datetime':
      return <SelectDateTimeScreen />;
    case 'booking_summary':
      return <BookingSummaryScreen />;
    case 'booking_confirmed':
      return <BookingConfirmedScreen />;
    case 'my_bookings':
      return <MyBookingsScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <HomeScreen />;
  }
};

const ToastContainer: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto">
        {toastMessage}
      </div>
    </div>
  );
};

const MainApp: React.FC = () => {
  const { brandConfig, setIsCustomizerOpen } = useApp();
  const [deviceFrame, setDeviceFrame] = React.useState<'mobile' | 'fluid'>('mobile');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 text-slate-800 antialiased selection:bg-blue-100">
      {/* Top Floating White-Label Toolbar for buyers & testers */}
      <header className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex items-center justify-between px-4 py-2 text-white text-xs mb-2 z-20">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: brandConfig.primaryColor }}
          />
          <span className="font-bold tracking-tight text-white/90">
            {brandConfig.name} <span className="font-normal text-white/60">Platform</span>
          </span>
          <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80 font-mono">
            White-Label Ready
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Frame toggles */}
          <div className="hidden sm:flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
            <button
              onClick={() => setDeviceFrame('mobile')}
              className={`p-1.5 rounded-md transition-all ${
                deviceFrame === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Mobile Device Preview"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setDeviceFrame('fluid')}
              className={`p-1.5 rounded-md transition-all ${
                deviceFrame === 'fluid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Expanded Responsive Preview"
            >
              <Laptop className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(true)}
            id="btn-floating-customize-brand"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 font-bold shadow-sm hover:bg-slate-100 active:scale-95 transition-all text-xs"
          >
            <Sliders className="h-3.5 w-3.5 text-blue-600" style={{ color: brandConfig.primaryColor }} />
            <span>Customize Brand</span>
          </button>
        </div>
      </header>

      {/* Main Container / Device Mockup */}
      <main
        className={`w-full transition-all duration-300 bg-white shadow-2xl flex flex-col relative overflow-hidden ${
          deviceFrame === 'mobile'
            ? 'max-w-md rounded-none sm:rounded-[36px] sm:border-[8px] sm:border-slate-800/80 min-h-screen sm:min-h-[844px] sm:max-h-[92vh]'
            : 'max-w-2xl rounded-2xl min-h-screen sm:min-h-[850px]'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Dynamic Screen Viewport */}
        <div className="flex-1 overflow-y-auto relative flex flex-col">
          <ScreenRenderer />
        </div>

        {/* Global Floating Modals & Drawers */}
        <CustomizerDrawer />
        <LocationPickerModal />
        <SearchModal />
        <NotificationCenterModal />
        <BookingDetailModal />
        <EditProfileModal />
        <ToastContainer />
      </main>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
