import React from 'react';
import {
  MapPin,
  ChevronDown,
  Bell,
  Palette,
  Search,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  Zap,
  Snowflake,
  Tv,
  Paintbrush,
  ShieldCheck,
  Tag,
  CalendarCheck,
  ArrowRight,
  Clock,
  Star,
  Ticket,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNavigation } from '../layout/BottomNavigation';

export const HomeScreen: React.FC = () => {
  const {
    brandConfig,
    user,
    currentCity,
    setIsLocationModalOpen,
    setIsNotificationOpen,
    setIsCustomizerOpen,
    setIsSearchOpen,
    categories,
    services,
    navigate,
    setSelectedCategoryId,
  } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="h-6 w-6" />;
      case 'Wrench':
        return <Wrench className="h-6 w-6" />;
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      case 'Snowflake':
        return <Snowflake className="h-6 w-6" />;
      case 'Tv':
        return <Tv className="h-6 w-6" />;
      case 'Paintbrush':
        return <Paintbrush className="h-6 w-6" />;
      default:
        return <Sparkles className="h-6 w-6" />;
    }
  };

  const popularServices = services.filter((s) => s.isPopular);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/70">
      {/* Top Header Bar with Brand Logo, Location & Palette/Notification Controls */}
      <div className="shrink-0 bg-white px-4 pt-3 pb-2.5 border-b border-slate-100 flex items-center justify-between z-20 shadow-2xs">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-2.5">
          {/* Brand Logo Badge */}
          <div
            className="flex items-center justify-center w-8 h-8 rounded-xl text-white font-black text-xs shadow-xs shrink-0"
            style={{ backgroundColor: brandConfig.primaryColor }}
          >
            {brandConfig.logoUrl ? (
              <img src={brandConfig.logoUrl} alt={brandConfig.name} className="w-5 h-5 object-contain" />
            ) : (
              <Sparkles className="h-4.5 w-4.5 text-white" />
            )}
          </div>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            id="btn-location-header"
            className="flex flex-col text-left group"
          >
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm text-slate-900 tracking-tight">{brandConfig.name}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <MapPin className="h-3 w-3 shrink-0" style={{ color: brandConfig.primaryColor }} />
              <span className="truncate max-w-[130px] sm:max-w-[180px]">{currentCity}</span>
              <ChevronDown className="h-3 w-3 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Right Icon Actions: Palette (Customize Brand) + Bell (Notifications) */}
        <div className="flex items-center gap-2">
          {/* Color Palette Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            id="btn-customize-brand-header"
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all shadow-xs border border-slate-200/60"
            aria-label="Customize Brand"
            title="Customize Brand & Theme"
          >
            <Palette className="h-4.5 w-4.5" style={{ color: brandConfig.primaryColor }} />
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            id="btn-notifications-header"
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all shadow-xs border border-slate-200/60"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2 ring-white"
              style={{ backgroundColor: brandConfig.primaryColor }}
            />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-6">
        {/* User Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {getGreeting()}, {user.name} <span>👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            What do you need help with today?
          </p>
        </div>

        {/* Search Bar Input */}
        <div
          onClick={() => setIsSearchOpen(true)}
          id="search-bar-trigger"
          className="flex items-center justify-between px-3.5 py-3 bg-white border border-slate-200 rounded-xl shadow-xs cursor-pointer hover:border-slate-300 transition-all text-slate-400 group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="text-sm text-slate-400 font-normal">Search for a service</span>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
        </div>

        {/* What do you need help with? Categories */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3">
            What do you need help with?
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  navigate('explore', { categoryId: cat.id });
                }}
                className="flex flex-col items-center justify-center group"
              >
                <div
                  className="flex items-center justify-center w-15 h-15 rounded-2xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:scale-105 group-active:scale-95 transition-all shadow-xs"
                  style={{
                    backgroundColor: `${brandConfig.primaryColor}10`,
                    borderColor: `${brandConfig.primaryColor}20`,
                    color: brandConfig.primaryColor,
                  }}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-semibold text-slate-700 mt-2 text-center truncate max-w-[72px]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Offer Banner */}
        <div
          className="relative overflow-hidden rounded-2xl p-5 text-white shadow-md transition-transform active:scale-[0.99]"
          style={{
            background: `linear-gradient(135deg, ${brandConfig.primaryColor} 0%, ${brandConfig.secondaryColor || '#1d4ed8'} 100%)`,
          }}
        >
          <div className="relative z-10 max-w-[65%] space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wide uppercase backdrop-blur-xs">
              OFFER
            </div>
            <div className="text-2xl font-extrabold tracking-tight">20% OFF</div>
            <div className="text-xs font-semibold text-white/95">
              Your first service booking
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Book trusted professionals near you
            </p>
            <button
              onClick={() => {
                setSelectedCategoryId('cleaning');
                navigate('explore', { categoryId: 'cleaning' });
              }}
              id="btn-promo-book-now"
              className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-50 transition-colors active:scale-95"
            >
              Book Now
            </button>
          </div>

          {/* Graphic decoration */}
          <div className="absolute right-3 bottom-2 opacity-30 text-white pointer-events-none">
            <Ticket className="w-28 h-28 transform rotate-12" strokeWidth={1.2} />
          </div>
        </div>

        {/* Popular Services Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">Popular services</h2>
            <button
              onClick={() => navigate('explore')}
              id="btn-see-all-services"
              className="text-xs font-bold hover:underline"
              style={{ color: brandConfig.primaryColor }}
            >
              See all
            </button>
          </div>

          <div className="space-y-3.5">
            {popularServices.map((svc) => (
              <div
                key={svc.id}
                id={`popular-service-${svc.id}`}
                onClick={() => navigate('service_detail', { serviceId: svc.id })}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rating Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800">{svc.rating}</span>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {svc.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{svc.durationMinutes}</span>
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 pt-0.5">
                      {brandConfig.currencySymbol}
                      {svc.startingPrice}{' '}
                      <span className="text-xs font-normal text-slate-500">onwards</span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs"
                    style={{
                      backgroundColor: `${brandConfig.primaryColor}15`,
                      color: brandConfig.primaryColor,
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose Brand? Value propositions */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-slate-900">
            Why choose {brandConfig.name}?
          </h2>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 shrink-0"
                style={{
                  backgroundColor: `${brandConfig.primaryColor}15`,
                  color: brandConfig.primaryColor,
                }}
              >
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Verified Professionals</h4>
                <p className="text-[11px] text-slate-500">Background checked & trained</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 shrink-0"
                style={{
                  backgroundColor: `${brandConfig.primaryColor}15`,
                  color: brandConfig.primaryColor,
                }}
              >
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Transparent Pricing</h4>
                <p className="text-[11px] text-slate-500">No hidden costs or fees</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 shrink-0"
                style={{
                  backgroundColor: `${brandConfig.primaryColor}15`,
                  color: brandConfig.primaryColor,
                }}
              >
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Easy Booking</h4>
                <p className="text-[11px] text-slate-500">Schedule at your convenience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
