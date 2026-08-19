import React from 'react';
import { ChevronRight, ShieldCheck, Tag, CalendarCheck, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';
import { BottomNavigation } from '../layout/BottomNavigation';

export const ExploreScreen: React.FC = () => {
  const {
    brandConfig,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    services,
    navigate,
    setIsSearchOpen,
  } = useApp();

  const currentCategory =
    categories.find((c) => c.id === selectedCategoryId) || categories[0];

  const categoryServices = services.filter(
    (s) => s.categoryId === currentCategory.id
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/60">
      <div className="shrink-0">
        <AppHeader
          title={`${currentCategory.name} Services`}
          showBack={true}
          showSearch={true}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        {/* Category Horizontal Switcher */}
        <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = cat.id === currentCategory.id;
            return (
              <button
                key={cat.id}
                id={`cat-chip-${cat.id}`}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={{
                  backgroundColor: isSelected ? brandConfig.primaryColor : undefined,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-6">
        {/* Hero Card */}
        <div className="relative h-56 rounded-3xl overflow-hidden shadow-sm">
          <img
            src={currentCategory.heroImage}
            alt={currentCategory.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium w-fit mb-2 text-white/95">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified professionals</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1">
              Home {currentCategory.name}
            </h2>
            <p className="text-xs text-white/80 leading-relaxed max-w-[280px]">
              {currentCategory.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Choose a cleaning service Section */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">
            Choose a {currentCategory.name.toLowerCase()} service
          </h3>

          <div className="space-y-3">
            {categoryServices.map((svc) => (
              <div
                key={svc.id}
                id={`service-card-${svc.id}`}
                onClick={() => navigate('service_detail', { serviceId: svc.id })}
                className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
              >
                <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {svc.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 my-1">
                    <span className="font-semibold text-slate-900">
                      {brandConfig.currencySymbol}
                      {svc.startingPrice} <span className="font-normal text-[11px] text-slate-500">onwards</span>
                    </span>
                    <span>•</span>
                    <span>{svc.durationMinutes}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {svc.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {svc.subtitle || svc.about}
                  </p>
                </div>

                <div className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EVERY SERVICE INCLUDES card */}
        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/60 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            EVERY SERVICE INCLUDES
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center space-y-1.5 p-2">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-xs text-blue-600"
                style={{ color: brandConfig.primaryColor }}
              >
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Verified professionals
              </span>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-2">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-xs text-blue-600"
                style={{ color: brandConfig.primaryColor }}
              >
                <Tag className="h-4.5 w-4.5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Upfront pricing
              </span>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-2">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-xs text-blue-600"
                style={{ color: brandConfig.primaryColor }}
              >
                <CalendarCheck className="h-4.5 w-4.5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Easy rescheduling
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
