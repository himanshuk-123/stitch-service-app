import React from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BookingDetailModal: React.FC = () => {
  const {
    selectedBookingForDetail,
    setSelectedBookingForDetail,
    brandConfig,
    cancelBooking,
    showToast,
  } = useApp();

  if (!selectedBookingForDetail) return null;

  const b = selectedBookingForDetail;

  const handleCall = () => {
    showToast(`Calling professional at +91 98765 01234...`);
  };

  const handleChat = () => {
    showToast(`Opening live chat with ${b.professionalName}...`);
  };

  const handleDownloadReceipt = () => {
    showToast(`Receipt downloaded for ${b.id}`);
  };

  const handleCancel = () => {
    cancelBooking(b.id);
    setSelectedBookingForDetail(null);
    showToast(`Booking ${b.id} has been cancelled`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              BOOKING DETAILS
            </div>
            <h3 className="text-base font-bold text-slate-900">{b.id}</h3>
          </div>

          <button
            onClick={() => setSelectedBookingForDetail(null)}
            id="btn-close-booking-detail"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Status Tracker */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Service Status</span>
              <span className="text-xs font-bold text-blue-700 uppercase" style={{ color: brandConfig.primaryColor }}>
                {b.status.replace('_', ' ')}
              </span>
            </div>

            {/* Stepper bar */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <div className="h-1.5 rounded-full bg-blue-600" style={{ backgroundColor: brandConfig.primaryColor }} />
              <div className={`h-1.5 rounded-full ${b.status !== 'cancelled' ? 'bg-blue-600' : 'bg-slate-200'}`} style={{ backgroundColor: b.status !== 'cancelled' ? brandConfig.primaryColor : undefined }} />
              <div className={`h-1.5 rounded-full ${b.status === 'in_progress' || b.status === 'completed' ? 'bg-blue-600' : 'bg-slate-200'}`} />
              <div className={`h-1.5 rounded-full ${b.status === 'completed' ? 'bg-blue-600' : 'bg-slate-200'}`} />
            </div>

            <p className="text-[11px] text-slate-600">
              {b.status === 'confirmed' && 'Your booking is confirmed. Partner is preparing for your appointment.'}
              {b.status === 'in_progress' && 'Partner has arrived and service is currently in progress.'}
              {b.status === 'completed' && 'Service was successfully completed. Thank you!'}
              {b.status === 'cancelled' && 'This booking has been cancelled.'}
            </p>
          </div>

          {/* Professional Card with Call / Chat */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={b.professionalPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'}
                  alt={b.professionalName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-slate-900">{b.professionalName}</h4>
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" style={{ color: brandConfig.primaryColor }} />
                </div>
                <p className="text-[10px] text-slate-500">Service Professional</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCall}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
                aria-label="Call Professional"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                onClick={handleChat}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 active:scale-95 transition-all"
                style={{
                  backgroundColor: `${brandConfig.primaryColor}15`,
                  color: brandConfig.primaryColor,
                }}
                aria-label="Chat Professional"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Service details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Schedule & Location
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Sparkles className="h-4 w-4 text-slate-400" />
                <span className="font-semibold">{b.serviceTitle}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{b.date}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{b.timeSlot}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{b.location}</span>
              </div>
            </div>
          </div>

          {/* Financials & Receipt */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Payment Summary
              </h4>
              <button
                onClick={handleDownloadReceipt}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                style={{ color: brandConfig.primaryColor }}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Receipt</span>
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Service Charge</span>
                <span>{brandConfig.currencySymbol}{b.servicePrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Platform Fee</span>
                <span>{brandConfig.currencySymbol}{b.platformFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes & GST</span>
                <span>{brandConfig.currencySymbol}{b.taxes}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex items-center justify-between font-bold text-slate-900 text-sm">
                <span>Total Due</span>
                <span className="text-base font-black">
                  {brandConfig.currencySymbol}{b.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          {b.status === 'confirmed' ? (
            <>
              <button
                onClick={handleCancel}
                className="w-1/2 py-3 rounded-2xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Cancel Booking</span>
              </button>
              <button
                onClick={() => {
                  setSelectedBookingForDetail(null);
                  showToast('Service verified and confirmed');
                }}
                className="w-1/2 py-3 rounded-2xl text-white font-bold text-xs shadow-md active:scale-95 transition-all text-center"
                style={{ backgroundColor: brandConfig.primaryColor }}
              >
                Done
              </button>
            </>
          ) : (
            <button
              onClick={() => setSelectedBookingForDetail(null)}
              className="w-full py-3 rounded-2xl text-white font-bold text-xs shadow-md"
              style={{ backgroundColor: brandConfig.primaryColor }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
