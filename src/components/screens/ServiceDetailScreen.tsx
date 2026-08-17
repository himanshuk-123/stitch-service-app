import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Clock,
  Users,
  Hourglass,
  Bed,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Tag,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ServiceDetailScreen: React.FC = () => {
  const {
    services,
    selectedServiceId,
    brandConfig,
    reviews,
    goBack,
    navigate,
    showToast,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const service =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const images =
    service.images && service.images.length > 0
      ? service.images
      : [service.image];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.about,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Service link copied to clipboard');
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    showToast(isFavorited ? 'Removed from favorites' : 'Saved to favorites');
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-24">
      {/* Top Media Gallery with Floating Nav */}
      <div className="relative h-72 w-full bg-slate-900">
        <img
          src={images[activeImageIndex]}
          alt={service.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Floating Controls */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={goBack}
            id="btn-service-back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              id="btn-service-share"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleFavorite}
              id="btn-service-heart"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
              aria-label="Favorite"
            >
              <Heart
                className={`h-4 w-4 ${isFavorited ? 'text-red-500 fill-red-500' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Carousel Pagination Badge & Dots */}
        <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {activeImageIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeImageIndex
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/50'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-4 py-5 space-y-6">
        {/* Title & Pricing Header */}
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div
            className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-blue-600"
            style={{ color: brandConfig.primaryColor }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>VERIFIED SERVICE</span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {service.title}
            </h1>
            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-slate-900">
                {brandConfig.currencySymbol}
                {service.startingPrice}
              </div>
              <div className="text-xs text-slate-500 font-medium">onwards</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 font-bold">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{service.rating}</span>
              <span className="font-normal text-slate-500">({service.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{service.durationMinutes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span>{service.professionalsCount} Professionals</span>
            </div>
          </div>
        </div>

        {/* Highlight Spec Chips */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/50 text-center space-y-1.5">
            <Hourglass
              className="h-5 w-5 text-blue-600"
              style={{ color: brandConfig.primaryColor }}
            />
            <span className="text-xs font-semibold text-slate-800">
              {service.highlightChips[0] || '1-2 Hours'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/50 text-center space-y-1.5">
            <Bed
              className="h-5 w-5 text-blue-600"
              style={{ color: brandConfig.primaryColor }}
            />
            <span className="text-xs font-semibold text-slate-800">
              {service.highlightChips[1] || 'Up to 2 BHK'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/50 text-center space-y-1.5">
            <Leaf
              className="h-5 w-5 text-blue-600"
              style={{ color: brandConfig.primaryColor }}
            />
            <span className="text-xs font-semibold text-slate-800">
              {service.highlightChips[2] || 'Eco-friendly'}
            </span>
          </div>
        </div>

        {/* About this service */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">About this service</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {service.about}
          </p>
        </div>

        {/* What's included checklist */}
        <div className="space-y-3.5">
          <h2 className="text-base font-bold text-slate-900">What's included</h2>
          <div className="space-y-3">
            {service.whatsIncluded.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className="mt-0.5 text-blue-600 shrink-0"
                  style={{ color: brandConfig.primaryColor }}
                >
                  <CheckCircle2 className="h-5 w-5 fill-blue-50" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why book with Fixora? */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-slate-900">
            Why book with {brandConfig.name}?
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 shrink-0"
              >
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Verified Professionals</h4>
                <p className="text-[11px] text-slate-500">Background-checked & trained experts.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 shrink-0"
              >
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Transparent Pricing</h4>
                <p className="text-[11px] text-slate-500">No hidden charges. Pay after service.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 shrink-0"
              >
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Easy Rescheduling</h4>
                <p className="text-[11px] text-slate-500">Free cancellation up to 2 hours before.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Customer Reviews</h2>
            <button
              onClick={() => showToast('Showing top customer reviews')}
              className="text-xs font-bold hover:underline"
              style={{ color: brandConfig.primaryColor }}
            >
              See all
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-bold"
                  style={{
                    backgroundColor: `${brandConfig.primaryColor}20`,
                    color: brandConfig.primaryColor,
                  }}
                >
                  {reviews[0]?.authorInitials || 'PS'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {reviews[0]?.authorName || 'Priya S.'}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {reviews[0]?.city || 'Bengaluru'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 italic leading-relaxed">
              {reviews[0]?.reviewText ||
                '"The team arrived on time and did a phenomenal job. My kitchen hasn\'t looked this clean since we moved in. Highly recommend the deep cleaning service!"'}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 z-30 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-extrabold text-slate-900">
              {brandConfig.currencySymbol}
              {service.startingPrice}
            </div>
            <div className="text-xs text-slate-500">onwards</div>
          </div>

          <button
            onClick={() => navigate('choose_professional', { serviceId: service.id })}
            id="btn-choose-professional"
            className="flex-1 py-3.5 px-5 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all text-center"
            style={{
              backgroundColor: brandConfig.primaryColor,
            }}
          >
            Choose a professional
          </button>
        </div>
      </div>
    </div>
  );
};
