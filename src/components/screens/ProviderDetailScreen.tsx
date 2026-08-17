import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Star,
  ThumbsUp,
  ShieldCheck,
  Clock,
  MapPin,
  Heart,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';

export const ProviderDetailScreen: React.FC = () => {
  const {
    professionals,
    selectedProfessionalId,
    services,
    selectedServiceId,
    brandConfig,
    currentCity,
    navigate,
    setBookingFlow,
    showToast,
  } = useApp();

  const [isFavorited, setIsFavorited] = useState(false);

  const pro =
    professionals.find((p) => p.id === selectedProfessionalId) ||
    professionals[0];

  const currentService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const handleChooseDate = () => {
    setBookingFlow((prev) => ({
      ...prev,
      professionalId: pro.id,
      serviceId: currentService.id,
    }));
    navigate('select_datetime', { proId: pro.id, serviceId: currentService.id });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 pb-24">
      <AppHeader
        title="Provider Details"
        showBack={true}
        showHeart={true}
        isFavorited={isFavorited}
        onHeartClick={() => {
          setIsFavorited(!isFavorited);
          showToast(isFavorited ? 'Removed from favorites' : 'Saved to favorites');
        }}
      />

      <div className="p-4 space-y-6">
        {/* Profile Header Card */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="relative">
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100">
              <img
                src={pro.photo}
                alt={pro.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-1 right-1 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white border-2 border-white shadow-xs">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-3">{pro.name}</h2>

          <div className="mt-1 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold">
            Verified Professional
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-bold text-slate-900">{pro.rating}</span>
            <span>•</span>
            <span>{pro.jobsCompleted.toLocaleString()} jobs completed</span>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center space-y-1">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600"
              style={{
                backgroundColor: `${brandConfig.primaryColor}15`,
                color: brandConfig.primaryColor,
              }}
            >
              <Briefcase className="h-4.5 w-4.5" />
            </div>
            <div className="text-sm font-bold text-slate-900">{pro.experienceYears} yrs</div>
            <div className="text-[11px] text-slate-500">Experience</div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center space-y-1">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600"
              style={{
                backgroundColor: `${brandConfig.primaryColor}15`,
                color: brandConfig.primaryColor,
              }}
            >
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div className="text-sm font-bold text-slate-900">
              {(pro.jobsCompleted / 1000).toFixed(1)}k+
            </div>
            <div className="text-[11px] text-slate-500">Jobs</div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center space-y-1">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600"
              style={{
                backgroundColor: `${brandConfig.primaryColor}15`,
                color: brandConfig.primaryColor,
              }}
            >
              <Star className="h-4.5 w-4.5" />
            </div>
            <div className="text-sm font-bold text-slate-900">{pro.rating}</div>
            <div className="text-[11px] text-slate-500">Rating</div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center space-y-1">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600"
              style={{
                backgroundColor: `${brandConfig.primaryColor}15`,
                color: brandConfig.primaryColor,
              }}
            >
              <ThumbsUp className="h-4.5 w-4.5" />
            </div>
            <div className="text-sm font-bold text-slate-900">{pro.positiveRatingPercent}%</div>
            <div className="text-[11px] text-slate-500">Positive</div>
          </div>
        </div>

        {/* About Rahul */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">About {pro.name.split(' ')[0]}</h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100">
            {pro.bio}
          </p>
        </div>

        {/* Specializes in */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900">Specializes in</h3>
          <div className="flex flex-wrap gap-2">
            {pro.specializations.map((spec, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"
                style={{
                  backgroundColor: `${brandConfig.primaryColor}12`,
                  borderColor: `${brandConfig.primaryColor}25`,
                  color: brandConfig.primaryColor,
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Professional credentials */}
        <div className="space-y-2.5">
          <h3 className="text-base font-bold text-slate-900">Professional credentials</h3>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2.5">
            {pro.credentials.map((cred, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{cred}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Service Snippet */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center gap-3.5">
          <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
            <img
              src={currentService.image}
              alt={currentService.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              {currentService.title}
            </h4>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">
              {brandConfig.currencySymbol}
              {pro.price} onwards
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {currentService.durationMinutes}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {currentCity.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 z-30 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">{pro.name}</div>
            <div className="text-[11px] text-slate-500 truncate">
              {currentService.title} ...
            </div>
          </div>

          <button
            onClick={handleChooseDate}
            id="btn-choose-date"
            className="py-3 px-6 rounded-2xl text-white font-bold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all shrink-0"
            style={{
              backgroundColor: brandConfig.primaryColor,
            }}
          >
            Choose date
          </button>
        </div>
      </div>
    </div>
  );
};
