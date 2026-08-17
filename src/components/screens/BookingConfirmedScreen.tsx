import React from 'react';
import {
  Check,
  Copy,
  Sparkles,
  User,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BookingConfirmedScreen: React.FC = () => {
  const {
    bookings,
    selectedBookingId,
    user,
    brandConfig,
    navigate,
    showToast,
  } = useApp();

  const currentBooking =
    bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleCopyId = () => {
    navigator.clipboard?.writeText(currentBooking.id);
    showToast('Booking ID copied to clipboard');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 p-4 space-y-6 pb-12">
      {/* Top Success Header */}
      <div className="flex flex-col items-center text-center pt-6 space-y-3">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 shadow-md">
          <Check className="h-10 w-10 stroke-[3]" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Booking confirmed!
        </h1>
        <p className="text-xs text-slate-500 max-w-xs">
          Your service has been successfully scheduled.
        </p>
      </div>

      {/* Personalized message card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs text-xs text-slate-700 leading-relaxed">
        You're all set, <span className="font-bold text-slate-900">{user.name}</span>.{' '}
        <span className="font-semibold text-slate-900">
          {currentBooking.professionalName}
        </span>{' '}
        will arrive at your selected time to provide your{' '}
        {currentBooking.serviceTitle.toLowerCase()} service.
      </div>

      {/* BOOKING ID card with Copy */}
      <div className="space-y-1.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              BOOKING ID
            </div>
            <div className="text-base font-black text-slate-900 tracking-wide mt-0.5">
              {currentBooking.id}
            </div>
          </div>

          <button
            onClick={handleCopyId}
            id="btn-copy-booking-id"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95 transition-all"
            style={{
              backgroundColor: `${brandConfig.primaryColor}15`,
              color: brandConfig.primaryColor,
            }}
            aria-label="Copy booking ID"
          >
            <Copy className="h-4.5 w-4.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 text-center">
          Keep this ID for your records.
        </p>
      </div>

      {/* Booking details Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900">Booking details</h3>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="p-3.5 flex items-center gap-3.5 text-xs">
            <Sparkles className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                SERVICE
              </div>
              <div className="font-semibold text-slate-900">
                {currentBooking.serviceTitle}
              </div>
            </div>
          </div>

          <div className="p-3.5 flex items-center gap-3.5 text-xs">
            <User className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                PROFESSIONAL
              </div>
              <div className="flex items-center gap-1 font-semibold text-slate-900">
                <span>{currentBooking.professionalName}</span>
                <ShieldCheck
                  className="h-3.5 w-3.5 text-blue-600"
                  style={{ color: brandConfig.primaryColor }}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 flex items-center gap-3.5 text-xs">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                DATE
              </div>
              <div className="font-semibold text-slate-900">
                {currentBooking.date}
              </div>
            </div>
          </div>

          <div className="p-3.5 flex items-center gap-3.5 text-xs">
            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                TIME
              </div>
              <div className="font-semibold text-slate-900">
                {currentBooking.timeSlot}
              </div>
            </div>
          </div>

          <div className="p-3.5 flex items-center gap-3.5 text-xs">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                LOCATION
              </div>
              <div className="font-semibold text-slate-900">
                {currentBooking.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AMOUNT DUE AFTER SERVICE card */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between shadow-xs">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
            AMOUNT DUE AFTER SERVICE
          </div>
          <div className="text-xs text-slate-600 mt-0.5">
            {currentBooking.paymentMethod}
          </div>
        </div>
        <div
          className="text-xl font-black text-blue-700"
          style={{ color: brandConfig.primaryColor }}
        >
          {brandConfig.currencySymbol}{currentBooking.totalAmount}
        </div>
      </div>

      {/* What happens next Timeline */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">What happens next</h3>

        <div className="space-y-4 relative pl-2">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5 shadow-xs"
              style={{ backgroundColor: brandConfig.primaryColor }}
            >
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Professional prepares</h4>
              <p className="text-[11px] text-slate-500">
                {currentBooking.professionalName} receives booking details.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Professional arrives</h4>
              <p className="text-[11px] text-slate-500">
                He arrives during the selected window.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Service completed</h4>
              <p className="text-[11px] text-slate-500">
                Pay {brandConfig.currencySymbol}{currentBooking.totalAmount} after completion.
              </p>
            </div>
          </div>
        </div>

        {/* Protection guarantee */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600">
          <ShieldCheck
            className="h-4 w-4 text-blue-600"
            style={{ color: brandConfig.primaryColor }}
          />
          <span>You're protected by {brandConfig.name}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => navigate('my_bookings')}
          id="btn-view-my-booking-after-confirm"
          className="w-full py-3.5 px-5 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-95 transition-all text-center"
          style={{
            backgroundColor: brandConfig.primaryColor,
          }}
        >
          View my booking
        </button>

        <button
          onClick={() => navigate('home')}
          id="btn-back-to-home-after-confirm"
          className="w-full py-3 px-5 rounded-2xl bg-transparent hover:bg-slate-100 font-bold text-xs text-blue-600 transition-colors text-center"
          style={{ color: brandConfig.primaryColor }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
