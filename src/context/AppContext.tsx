import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrandConfig,
  ServiceCategory,
  ServiceItem,
  Professional,
  CustomerReview,
  UserProfile,
  Booking,
  ScreenType,
  BookingFlowState,
  Address,
} from '../types';
import {
  defaultBrandConfig,
  defaultCategories,
  defaultServices,
  defaultProfessionals,
  defaultReviews,
  defaultUser,
  defaultInitialBookings,
} from '../data/initialData';

interface AppContextType {
  // Navigation
  currentScreen: ScreenType;
  activeTab: 'home' | 'explore' | 'bookings' | 'profile';
  navigate: (screen: ScreenType, payload?: { serviceId?: string; proId?: string; categoryId?: string; bookingId?: string }) => void;
  goBack: () => void;
  setActiveTab: (tab: 'home' | 'explore' | 'bookings' | 'profile') => void;

  // Selected Entities
  selectedCategoryId: string;
  selectedServiceId: string;
  selectedProfessionalId: string;
  selectedBookingId: string;
  setSelectedCategoryId: (id: string) => void;
  setSelectedServiceId: (id: string) => void;
  setSelectedProfessionalId: (id: string) => void;
  setSelectedBookingId: (id: string) => void;

  // Data
  brandConfig: BrandConfig;
  updateBrandConfig: (newConfig: Partial<BrandConfig>) => void;
  resetBrandConfig: () => void;

  categories: ServiceCategory[];
  updateCategory: (cat: ServiceCategory) => void;
  addCategory: (cat: ServiceCategory) => void;

  services: ServiceItem[];
  updateService: (svc: ServiceItem) => void;
  addService: (svc: ServiceItem) => void;

  professionals: Professional[];
  updateProfessional: (pro: Professional) => void;
  addProfessional: (pro: Professional) => void;

  reviews: CustomerReview[];
  addReview: (rev: CustomerReview) => void;

  user: UserProfile;
  updateUser: (updatedUser: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;

  bookings: Booking[];
  bookingFlow: BookingFlowState;
  setBookingFlow: React.Dispatch<React.SetStateAction<BookingFlowState>>;
  confirmCurrentBooking: () => string; // returns booking ID
  cancelBooking: (id: string) => void;
  rescheduleBooking: (id: string, date: string, time: string) => void;

  // Modals & UI Controls
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  selectedBookingForDetail: Booking | null;
  setSelectedBookingForDetail: (booking: Booking | null) => void;
  viewMode: 'mobile_frame' | 'responsive';
  setViewMode: (mode: 'mobile_frame' | 'responsive') => void;

  // Active City
  currentCity: string;
  setCurrentCity: (city: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Screen Stack
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);
  const [activeTab, setActiveTabState] = useState<'home' | 'explore' | 'bookings' | 'profile'>('home');

  // Selected Entities
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cleaning');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('home-deep-cleaning');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>('pro-rahul');
  const [selectedBookingId, setSelectedBookingId] = useState<string>('FXR-260817-1042');

  // Brand config with local storage
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    const saved = localStorage.getItem('fixora_brand_config');
    return saved ? JSON.parse(saved) : defaultBrandConfig;
  });

  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    const saved = localStorage.getItem('fixora_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('fixora_services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [professionals, setProfessionals] = useState<Professional[]>(() => {
    const saved = localStorage.getItem('fixora_professionals');
    return saved ? JSON.parse(saved) : defaultProfessionals;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('fixora_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fixora_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('fixora_bookings');
    return saved ? JSON.parse(saved) : defaultInitialBookings;
  });

  // Booking Flow State
  const [bookingFlow, setBookingFlow] = useState<BookingFlowState>({
    serviceId: 'home-deep-cleaning',
    professionalId: 'pro-rahul',
    selectedDate: '2026-08-17',
    selectedDateLabel: 'Monday, 17 August',
    selectedTimeSlot: '10:30 AM – 11:30 AM',
    addressId: 'addr-1',
    paymentMethod: 'Cash / UPI after service',
  });

  // UI Modals
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'mobile_frame' | 'responsive'>('mobile_frame');
  const [currentCity, setCurrentCity] = useState('Jaipur, Rajasthan');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fixora_brand_config', JSON.stringify(brandConfig));
  }, [brandConfig]);

  useEffect(() => {
    localStorage.setItem('fixora_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('fixora_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('fixora_professionals', JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem('fixora_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fixora_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const navigate = (
    screen: ScreenType,
    payload?: { serviceId?: string; proId?: string; categoryId?: string; bookingId?: string }
  ) => {
    if (payload?.serviceId) {
      setSelectedServiceId(payload.serviceId);
      setBookingFlow((prev) => ({ ...prev, serviceId: payload.serviceId! }));
    }
    if (payload?.proId) {
      setSelectedProfessionalId(payload.proId);
      setBookingFlow((prev) => ({ ...prev, professionalId: payload.proId! }));
    }
    if (payload?.categoryId) {
      setSelectedCategoryId(payload.categoryId);
    }
    if (payload?.bookingId) {
      setSelectedBookingId(payload.bookingId);
    }

    if (screen === 'home') setActiveTabState('home');
    else if (screen === 'explore') setActiveTabState('explore');
    else if (screen === 'my_bookings') setActiveTabState('bookings');
    else if (screen === 'profile') setActiveTabState('profile');

    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // Remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);

      if (prevScreen === 'home') setActiveTabState('home');
      else if (prevScreen === 'explore') setActiveTabState('explore');
      else if (prevScreen === 'my_bookings') setActiveTabState('bookings');
      else if (prevScreen === 'profile') setActiveTabState('profile');
    } else {
      setCurrentScreen('home');
      setActiveTabState('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setActiveTab = (tab: 'home' | 'explore' | 'bookings' | 'profile') => {
    setActiveTabState(tab);
    if (tab === 'home') setCurrentScreen('home');
    if (tab === 'explore') setCurrentScreen('explore');
    if (tab === 'bookings') setCurrentScreen('my_bookings');
    if (tab === 'profile') setCurrentScreen('profile');
    setScreenHistory(['home', tab === 'home' ? 'home' : tab === 'bookings' ? 'my_bookings' : tab]);
  };

  const updateBrandConfig = (newConfig: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Brand settings updated');
  };

  const resetBrandConfig = () => {
    setBrandConfig(defaultBrandConfig);
    setCategories(defaultCategories);
    setServices(defaultServices);
    setProfessionals(defaultProfessionals);
    setBookings(defaultInitialBookings);
    setUser(defaultUser);
    showToast('Reset to default template');
  };

  const updateCategory = (cat: ServiceCategory) => {
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
  };

  const addCategory = (cat: ServiceCategory) => {
    setCategories((prev) => [...prev, cat]);
  };

  const updateService = (svc: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === svc.id ? svc : s)));
  };

  const addService = (svc: ServiceItem) => {
    setServices((prev) => [...prev, svc]);
  };

  const updateProfessional = (pro: Professional) => {
    setProfessionals((prev) => prev.map((p) => (p.id === pro.id ? pro : p)));
  };

  const addProfessional = (pro: Professional) => {
    setProfessionals((prev) => [...prev, pro]);
  };

  const addReview = (rev: CustomerReview) => {
    setReviews((prev) => [rev, ...prev]);
  };

  const updateUser = (updatedUser: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
    showToast('Profile updated');
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const address: Address = { ...newAddr, id };
    setUser((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, address],
    }));
    showToast('New address saved');
  };

  const confirmCurrentBooking = (): string => {
    const currentService = services.find((s) => s.id === bookingFlow.serviceId) || services[0];
    const currentPro = professionals.find((p) => p.id === bookingFlow.professionalId) || professionals[0];
    const selectedAddr = user.savedAddresses.find((a) => a.id === bookingFlow.addressId) || user.savedAddresses[0];

    const servicePrice = currentPro.price || currentService.startingPrice;
    const platformFee = brandConfig.platformFee;
    const taxes = Math.round((servicePrice * brandConfig.taxRatePercent) / 100);
    const totalAmount = servicePrice + platformFee + taxes;

    // Generate readable ID like FXR-260817-1042
    const prefix = brandConfig.name.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const todayStr = '260817';
    const newId = `${prefix}-${todayStr}-${randomNum}`;

    const newBooking: Booking = {
      id: newId,
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      serviceImage: currentService.image,
      professionalId: currentPro.id,
      professionalName: currentPro.name,
      professionalPhoto: currentPro.photo,
      date: bookingFlow.selectedDateLabel,
      dateShort: bookingFlow.selectedDateLabel.includes(',') ? bookingFlow.selectedDateLabel.split(',')[0] + ',' + bookingFlow.selectedDateLabel.split(',')[1]?.substring(0, 7) : bookingFlow.selectedDateLabel,
      timeSlot: bookingFlow.selectedTimeSlot,
      location: `${selectedAddr.city}, ${selectedAddr.state}`,
      addressDetails: selectedAddr,
      servicePrice,
      platformFee,
      taxes,
      totalAmount,
      paymentMethod: bookingFlow.paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setBookingFlow((prev) => ({ ...prev, latestBookingId: newId }));
    setSelectedBookingId(newId);
    return newId;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
    showToast('Booking cancelled');
  };

  const rescheduleBooking = (id: string, date: string, time: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              date,
              timeSlot: time,
              status: 'confirmed' as const,
            }
          : b
      )
    );
    showToast('Booking rescheduled successfully');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        activeTab,
        navigate,
        goBack,
        setActiveTab,
        selectedCategoryId,
        selectedServiceId,
        selectedProfessionalId,
        selectedBookingId,
        setSelectedCategoryId,
        setSelectedServiceId,
        setSelectedProfessionalId,
        setSelectedBookingId,
        brandConfig,
        updateBrandConfig,
        resetBrandConfig,
        categories,
        updateCategory,
        addCategory,
        services,
        updateService,
        addService,
        professionals,
        updateProfessional,
        addProfessional,
        reviews,
        addReview,
        user,
        updateUser,
        addAddress,
        bookings,
        bookingFlow,
        setBookingFlow,
        confirmCurrentBooking,
        cancelBooking,
        rescheduleBooking,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        selectedBookingForDetail,
        setSelectedBookingForDetail,
        viewMode,
        setViewMode,
        currentCity,
        setCurrentCity,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
