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
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { CustomizerDrawer } from './components/modals/CustomizerDrawer';
import { LocationPickerModal } from './components/modals/LocationPickerModal';
import { SearchModal } from './components/modals/SearchModal';
import { NotificationCenterModal } from './components/modals/NotificationCenterModal';
import { BookingDetailModal } from './components/modals/BookingDetailModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { Sparkles, Sliders, Smartphone, Laptop, Eye, EyeOff } from 'lucide-react';

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
    case 'login':
      return <LoginScreen />;
    case 'signup':
      return <SignupScreen />;
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
  const [deviceFrame, setDeviceFrame] = React.useState<'mobile' | 'fluid'>('mobile');

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 text-slate-800 antialiased selection:bg-blue-100 relative">
      {/* Top Device Frame Mode Toggle Bar */}
      <div className="hidden sm:flex items-center gap-2 mb-3 z-20">
        <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-white/10 backdrop-blur-md shadow-lg">
          <button
            onClick={() => setDeviceFrame('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceFrame === 'mobile'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
            title="Mobile Device Preview"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile View</span>
          </button>
          <button
            onClick={() => setDeviceFrame('fluid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceFrame === 'fluid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
            title="Expanded Preview"
          >
            <Laptop className="h-3.5 w-3.5" />
            <span>Desktop View</span>
          </button>
        </div>
      </div>

      {/* Main Container / Device Mockup */}
      <main
        className={`w-full transition-all duration-300 bg-white shadow-2xl flex flex-col relative overflow-hidden ${
          deviceFrame === 'mobile'
            ? 'max-w-md rounded-none sm:rounded-[36px] sm:border-[8px] sm:border-slate-800/80 h-screen sm:h-[844px] sm:max-h-[92vh]'
            : 'max-w-2xl rounded-2xl h-screen sm:h-[850px] sm:max-h-[92vh]'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Dynamic Screen Viewport */}
        <div className="flex-1 relative flex flex-col overflow-hidden h-full">
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
