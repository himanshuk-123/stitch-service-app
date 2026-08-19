import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';
import { BottomNavigation } from '../layout/BottomNavigation';
import { BookingStatus } from '../../types';

export const MyBookingsScreen: React.FC = () => {
  const {
    bookings,
    brandConfig,
    setSelectedBookingForDetail,
    navigate,
    setIsSearchOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'in_progress';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/60">
            <CheckCircle2 className="h-3 w-3" />
            Confirmed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200/60">
            <Clock3 className="h-3 w-3" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] font-semibold border border-red-200/60">
            <XCircle className="h-3 w-3" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/70">
      <div className="shrink-0">
        <AppHeader
          title="My Bookings"
          showBack={false}
          showSearch={true}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        {/* Tabs Switcher */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            id="tab-upcoming-bookings"
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={{
              backgroundColor: activeTab === 'upcoming' ? brandConfig.primaryColor : undefined,
            }}
          >
            Upcoming
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            id="tab-completed-bookings"
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={{
              backgroundColor: activeTab === 'completed' ? brandConfig.primaryColor : undefined,
            }}
          >
            Completed
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            id="tab-cancelled-bookings"
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
              activeTab === 'cancelled'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={{
              backgroundColor: activeTab === 'cancelled' ? brandConfig.primaryColor : undefined,
            }}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center space-y-3 shadow-xs">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto">
              <Calendar className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No {activeTab} bookings</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              When you schedule a service, your booking details and live status will show up here.
            </p>
            <button
              onClick={() => navigate('explore')}
              id="btn-empty-book-now"
              className="py-2.5 px-5 rounded-xl text-white font-bold text-xs shadow-xs"
              style={{ backgroundColor: brandConfig.primaryColor }}
            >
              Book a Service
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              id={`booking-card-${b.id}`}
              onClick={() => setSelectedBookingForDetail(b)}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={b.serviceImage}
                      alt={b.serviceTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {b.serviceTitle}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                      <span className="font-medium">{b.professionalName}</span>
                      <span>•</span>
                      <span className="text-[11px] text-slate-500">Verified Pro</span>
                    </div>
                  </div>
                </div>

                <div>{getStatusBadge(b.status)}</div>
              </div>

              {/* Detail specs box */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    DATE & TIME
                  </div>
                  <div className="font-semibold text-slate-800 text-[11px] leading-tight">
                    {b.dateShort || b.date}
                  </div>
                  <div className="text-[11px] text-slate-500">{b.timeSlot}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    LOCATION
                  </div>
                  <div className="font-semibold text-slate-800 text-[11px] truncate">
                    {b.location}
                  </div>
                </div>
              </div>

              {/* Price & Link */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-base font-extrabold text-slate-900">
                    {brandConfig.currencySymbol}{b.totalAmount}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {b.paymentMethod}
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: brandConfig.primaryColor }}
                >
                  <span>View booking</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Need another service? Card */}
        <div className="p-5 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-center space-y-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mx-auto"
            style={{
              backgroundColor: `${brandConfig.primaryColor}15`,
              color: brandConfig.primaryColor,
            }}
          >
            <Briefcase className="h-5 w-5" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900">Need another service?</h4>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xs mx-auto">
              Explore our wide range of professional home services.
            </p>
          </div>

          <button
            onClick={() => navigate('explore')}
            id="btn-book-another-service"
            className="w-full py-3 px-4 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-50 active:scale-95 transition-all"
            style={{
              borderColor: brandConfig.primaryColor,
              color: brandConfig.primaryColor,
            }}
          >
            Book a service
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
