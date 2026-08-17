import React, { useState } from 'react';
import {
  Sparkles,
  User,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  Banknote,
  Info,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';

export const BookingSummaryScreen: React.FC = () => {
  const {
    services,
    professionals,
    bookingFlow,
    brandConfig,
    user,
    confirmCurrentBooking,
    navigate,
    setIsLocationModalOpen,
  } = useApp();

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(bookingFlow.paymentMethod || 'Cash / UPI after service');

  const currentService =
    services.find((s) => s.id === bookingFlow.serviceId) || services[0];
  const currentPro =
    professionals.find((p) => p.id === bookingFlow.professionalId) ||
    professionals[0];

  const servicePrice = currentPro.price || currentService.startingPrice;
  const platformFee = brandConfig.platformFee;
  const taxes = Math.round((servicePrice * brandConfig.taxRatePercent) / 100);
  const totalAmount = servicePrice + platformFee + taxes;

  const handleConfirm = () => {
    // Trigger celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const bookingId = confirmCurrentBooking();
    navigate('booking_confirmed', { bookingId });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 pb-24">
      <AppHeader title="Booking Summary" showBack={true} />

      <div className="p-4 space-y-4">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
          <div className="h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
            <img
              src={currentService.image}
              alt={currentService.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {currentService.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
              <span className="font-semibold">{currentPro.name}</span>
              <ShieldCheck
                className="h-3.5 w-3.5 text-blue-600 shrink-0"
                style={{ color: brandConfig.primaryColor }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>★ {currentPro.rating}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {currentService.durationMinutes}
              </span>
            </div>
          </div>
        </div>

        {/* Service details list card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Service details
            </h4>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between p-3.5 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <Sparkles className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900">{currentService.title}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <User className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900">{currentPro.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900">{bookingFlow.selectedDateLabel}</span>
              </div>
              <button
                onClick={() => navigate('select_datetime')}
                id="btn-change-date-summary"
                className="text-[11px] font-bold text-blue-600 hover:underline"
                style={{ color: brandConfig.primaryColor }}
              >
                CHANGE
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900">{bookingFlow.selectedTimeSlot}</span>
              </div>
              <button
                onClick={() => navigate('select_datetime')}
                id="btn-change-time-summary"
                className="text-[11px] font-bold text-blue-600 hover:underline"
                style={{ color: brandConfig.primaryColor }}
              >
                CHANGE
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900 truncate max-w-[180px]">
                  {user.savedAddresses[0]?.city || 'Jaipur'}, {user.savedAddresses[0]?.state || 'Rajasthan'}
                </span>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                id="btn-change-location-summary"
                className="text-[11px] font-bold text-blue-600 hover:underline"
                style={{ color: brandConfig.primaryColor }}
              >
                CHANGE
              </button>
            </div>
          </div>
        </div>

        {/* Price details breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Price details
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Service price</span>
              <span className="font-medium text-slate-900">
                {brandConfig.currencySymbol}{servicePrice}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Platform fee</span>
              <span className="font-medium text-slate-900">
                {brandConfig.currencySymbol}{platformFee}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Taxes & GST</span>
              <span className="font-medium text-slate-900">
                {brandConfig.currencySymbol}{taxes}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-sm font-bold text-slate-900">
              <span>Total amount</span>
              <span className="text-base font-black">
                {brandConfig.currencySymbol}{totalAmount}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>No hidden charges. You'll pay the total shown above.</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Payment method
          </h4>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600">
                <Banknote className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-slate-900">
                {selectedPayment}
              </span>
            </div>

            <button
              onClick={() => setPaymentMethodModal(true)}
              id="btn-change-payment-summary"
              className="text-xs font-bold text-blue-600 hover:underline"
              style={{ color: brandConfig.primaryColor }}
            >
              CHANGE
            </button>
          </div>
        </div>

        {/* Free cancellation note */}
        <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
          <Info className="h-4 w-4 text-slate-400 shrink-0" />
          <span>Free cancellation up to 2 hours before the appointment.</span>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 z-30 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total
            </div>
            <div className="text-xl font-black text-slate-900">
              {brandConfig.currencySymbol}{totalAmount}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            id="btn-confirm-booking"
            className="flex-1 py-3.5 px-6 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-95 transition-all text-center"
            style={{
              backgroundColor: brandConfig.primaryColor,
            }}
          >
            Confirm booking
          </button>
        </div>
      </div>

      {/* Payment Selection Modal */}
      {paymentMethodModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <h3 className="text-base font-bold text-slate-900">Choose Payment Method</h3>
            <div className="space-y-2.5">
              {[
                { id: 'Cash / UPI after service', label: 'Cash / UPI after service', icon: Banknote, desc: 'Pay technician directly after work' },
                { id: 'Online UPI / QR Code', label: 'UPI / QR Code', icon: CreditCard, desc: 'Google Pay, PhonePe, Paytm' },
                { id: 'Credit / Debit Card', label: 'Credit or Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, RuPay' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedPayment(m.id);
                    setPaymentMethodModal(false);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedPayment === m.id
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <m.icon className="h-5 w-5 text-slate-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{m.label}</div>
                      <div className="text-[10px] text-slate-500">{m.desc}</div>
                    </div>
                  </div>
                  {selectedPayment === m.id && (
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setPaymentMethodModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-100 font-bold text-xs text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
