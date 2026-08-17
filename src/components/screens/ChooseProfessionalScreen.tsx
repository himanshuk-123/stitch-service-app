import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Star,
  Clock,
  Calendar,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';

export const ChooseProfessionalScreen: React.FC = () => {
  const {
    services,
    selectedServiceId,
    professionals,
    selectedProfessionalId,
    setSelectedProfessionalId,
    brandConfig,
    currentCity,
    setIsLocationModalOpen,
    navigate,
    setBookingFlow,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'recommended' | 'top_rated' | 'lowest_price'>('recommended');

  const currentService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  let filteredPros = [...professionals];
  if (activeFilter === 'top_rated') {
    filteredPros.sort((a, b) => b.rating - a.rating);
  } else if (activeFilter === 'lowest_price') {
    filteredPros.sort((a, b) => a.price - b.price);
  } else {
    // Recommended: recommended first
    filteredPros.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));
  }

  const handleSelectPro = (proId: string) => {
    setSelectedProfessionalId(proId);
    setBookingFlow((prev) => ({
      ...prev,
      professionalId: proId,
      serviceId: currentService.id,
    }));
  };

  const handleContinue = () => {
    const proToUse = selectedProfessionalId || filteredPros[0]?.id || 'pro-rahul';
    handleSelectPro(proToUse);
    navigate('select_datetime', { proId: proToUse, serviceId: currentService.id });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 pb-24">
      <AppHeader
        title="Choose a professional"
        showBack={true}
        showFilter={true}
        onFilterClick={() => {
          const next = activeFilter === 'recommended' ? 'top_rated' : activeFilter === 'top_rated' ? 'lowest_price' : 'recommended';
          setActiveFilter(next);
        }}
      />

      <div className="p-4 space-y-4">
        {/* Selected Service Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600 shrink-0"
              style={{
                backgroundColor: `${brandConfig.primaryColor}15`,
                color: brandConfig.primaryColor,
              }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{currentService.title}</h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate max-w-[140px]">{currentCity}</span>
              </div>
              <div
                className="text-xs font-bold mt-0.5 uppercase tracking-wide"
                style={{ color: brandConfig.primaryColor }}
              >
                {brandConfig.currencySymbol}
                {currentService.startingPrice} ONWARDS
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            id="btn-change-location-pro-picker"
            className="text-xs font-bold text-blue-600 hover:underline px-2 py-1"
            style={{ color: brandConfig.primaryColor }}
          >
            CHANGE
          </button>
        </div>

        {/* Professionals available count badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 px-1">
          <CheckCircle2
            className="h-4 w-4 text-blue-600"
            style={{ color: brandConfig.primaryColor }}
          />
          <span>{filteredPros.length * 4} professionals available</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('recommended')}
            id="filter-recommended"
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'recommended'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            style={{
              backgroundColor: activeFilter === 'recommended' ? brandConfig.primaryColor : undefined,
              borderColor: activeFilter === 'recommended' ? brandConfig.primaryColor : undefined,
            }}
          >
            RECOMMENDED
          </button>

          <button
            onClick={() => setActiveFilter('top_rated')}
            id="filter-top-rated"
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'top_rated'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            style={{
              backgroundColor: activeFilter === 'top_rated' ? brandConfig.primaryColor : undefined,
              borderColor: activeFilter === 'top_rated' ? brandConfig.primaryColor : undefined,
            }}
          >
            TOP RATED
          </button>

          <button
            onClick={() => setActiveFilter('lowest_price')}
            id="filter-lowest-price"
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'lowest_price'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            style={{
              backgroundColor: activeFilter === 'lowest_price' ? brandConfig.primaryColor : undefined,
              borderColor: activeFilter === 'lowest_price' ? brandConfig.primaryColor : undefined,
            }}
          >
            LOWEST PRICE
          </button>
        </div>

        {/* Professionals List */}
        <div className="space-y-4">
          {filteredPros.map((pro) => {
            const isSelected = selectedProfessionalId === pro.id;

            return (
              <div
                key={pro.id}
                id={`pro-card-${pro.id}`}
                className={`relative bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* RECOMMENDED pill tag */}
                {pro.isRecommended && (
                  <div
                    className="absolute top-0 right-0 px-3 py-1 rounded-tr-2xl rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider text-white"
                    style={{ backgroundColor: brandConfig.primaryColor }}
                  >
                    RECOMMENDED
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <div className="relative h-18 w-18 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img
                      src={pro.photo}
                      alt={pro.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-12">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-slate-900 truncate">
                        {pro.name}
                      </h4>
                      <CheckCircle2
                        className="h-4 w-4 text-blue-600 shrink-0"
                        style={{ color: brandConfig.primaryColor }}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-slate-900">{pro.rating}</span>
                      <span className="text-slate-500">({pro.jobsCompleted.toLocaleString()} jobs)</span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {pro.experienceYears} yrs exp • {pro.serviceTitle}
                    </p>

                    <div
                      className="text-xs font-extrabold mt-1 uppercase"
                      style={{ color: brandConfig.primaryColor }}
                    >
                      {brandConfig.currencySymbol}
                      {pro.price} ONWARDS
                    </div>
                  </div>
                </div>

                {/* Available Slot info */}
                <div className="mt-3.5 px-3 py-2 rounded-xl bg-blue-50/60 border border-blue-100/60 flex items-center gap-2 text-xs font-medium text-slate-700">
                  {pro.availabilityText.includes('tomorrow') ? (
                    <Calendar className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  )}
                  <span>{pro.availabilityText}</span>
                </div>

                {/* Actions */}
                <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => navigate('provider_detail', { proId: pro.id })}
                    id={`btn-view-profile-${pro.id}`}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 active:scale-95 transition-all text-center"
                  >
                    VIEW PROFILE
                  </button>

                  <button
                    onClick={() => handleSelectPro(pro.id)}
                    id={`btn-select-pro-${pro.id}`}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold active:scale-95 transition-all text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                    style={{
                      backgroundColor: isSelected ? brandConfig.primaryColor : undefined,
                      borderColor: brandConfig.primaryColor,
                      color: isSelected ? '#ffffff' : brandConfig.primaryColor,
                    }}
                  >
                    {isSelected ? 'SELECTED ✓' : 'SELECT'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 z-30 shadow-lg max-w-md mx-auto">
        <button
          onClick={handleContinue}
          id="btn-confirm-pro-selection"
          className="w-full py-3.5 px-5 rounded-2xl text-white font-bold text-sm shadow-md uppercase tracking-wider hover:opacity-95 active:scale-[0.98] transition-all text-center"
          style={{
            backgroundColor: brandConfig.primaryColor,
          }}
        >
          {selectedProfessionalId ? 'CONTINUE WITH PROFESSIONAL' : 'SELECT A PROFESSIONAL'}
        </button>
      </div>
    </div>
  );
};
