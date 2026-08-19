import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Check,
  CheckCircle2,
  Home,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from '../layout/AppHeader';

export const SelectDateTimeScreen: React.FC = () => {
  const {
    services,
    selectedServiceId,
    professionals,
    selectedProfessionalId,
    brandConfig,
    currentCity,
    user,
    bookingFlow,
    setBookingFlow,
    setIsLocationModalOpen,
    navigate,
    showToast,
  } = useApp();

  const currentService =
    services.find((s) => s.id === selectedServiceId) || services[0];
  const currentPro =
    professionals.find((p) => p.id === selectedProfessionalId) ||
    professionals[0];

  // Dynamic next 7 days dates generator
  const getDates = () => {
    const dates = [];
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const dayNum = d.getDate();
      const monthStr = months[d.getMonth()];
      const dayLabel = i === 0 ? 'TODAY' : i === 1 ? 'TOM' : days[d.getDay()];
      const fullLabel = `${i === 0 ? 'Monday, ' : ''}${dayNum} ${monthStr}`;

      dates.push({
        id: `date-${i}`,
        dayLabel,
        dayNum,
        monthStr,
        fullDateString: d.toISOString().split('T')[0],
        displayDate: `${d.toLocaleDateString('en-US', { weekday: 'long' })}, ${dayNum} ${d.toLocaleDateString('en-US', { month: 'long' })}`,
        isToday: i === 0,
      });
    }
    return dates;
  };

  const datesList = getDates();
  const [selectedDateObj, setSelectedDateObj] = useState(datesList[0]);

  const timeSlots = [
    '9:00 AM – 10:00 AM',
    '10:30 AM – 11:30 AM',
    '12:00 PM – 1:00 PM',
    '2:30 PM – 3:30 PM',
    '4:00 PM – 5:00 PM',
    '6:00 PM – 7:00 PM',
  ];

  const [selectedSlot, setSelectedSlot] = useState('10:30 AM – 11:30 AM');

  const selectedAddress =
    user.savedAddresses.find((a) => a.id === bookingFlow.addressId) ||
    user.savedAddresses[0] || {
      id: 'addr-1',
      label: 'Home',
      city: 'Jaipur',
      state: 'Rajasthan',
      street: 'Vaishali Nagar',
    };

  const handleContinue = () => {
    setBookingFlow((prev) => ({
      ...prev,
      selectedDate: selectedDateObj.fullDateString,
      selectedDateLabel: selectedDateObj.displayDate,
      selectedTimeSlot: selectedSlot,
      addressId: selectedAddress.id,
      serviceId: currentService.id,
      professionalId: currentPro.id,
    }));
    navigate('booking_summary');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/70">
      <div className="shrink-0">
        <AppHeader title="Select date & time" showBack={true} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-6">
        {/* Top Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
          <h3 className="text-base font-bold text-slate-900">
            {currentService.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="h-5 w-5 rounded-full overflow-hidden shrink-0 bg-slate-100">
              <img
                src={currentPro.photo}
                alt={currentPro.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-semibold text-slate-900">{currentPro.name}</span>
            <span>•</span>
            <span className="text-blue-600 font-medium" style={{ color: brandConfig.primaryColor }}>
              Verified Professional
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
            <span className="font-bold text-slate-900">
              {brandConfig.currencySymbol}
              {currentPro.price} onwards
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {currentService.durationMinutes}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 truncate max-w-[130px]">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {currentCity}
            </span>
          </div>
        </div>

        {/* Choose a date */}
        <div className="space-y-2.5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Choose a date</h3>
            <p className="text-xs text-slate-500">
              Select a convenient day for your service
            </p>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {datesList.map((item) => {
              const isSelected = selectedDateObj.id === item.id;
              return (
                <button
                  key={item.id}
                  id={`btn-date-${item.id}`}
                  onClick={() => setSelectedDateObj(item)}
                  className={`flex flex-col items-center justify-center min-w-[62px] py-3 px-2 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                  style={{
                    backgroundColor: isSelected ? brandConfig.primaryColor : undefined,
                    borderColor: isSelected ? brandConfig.primaryColor : undefined,
                  }}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {item.dayLabel}
                  </span>
                  <span className="text-xl font-black mt-0.5">{item.dayNum}</span>
                  <span
                    className={`text-[10px] font-medium ${
                      isSelected ? 'text-white/90' : 'text-slate-500'
                    }`}
                  >
                    {item.monthStr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Available time slots */}
        <div className="space-y-2.5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Available time slots</h3>
            <p className="text-xs text-slate-500">
              Choose a convenient arrival window
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {timeSlots.map((slot, idx) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={idx}
                  id={`btn-timeslot-${idx}`}
                  onClick={() => setSelectedSlot(slot)}
                  className={`relative py-3 px-3 rounded-2xl text-xs font-semibold transition-all text-center ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  style={{
                    borderColor: isSelected ? brandConfig.primaryColor : undefined,
                    backgroundColor: isSelected ? `${brandConfig.primaryColor}12` : undefined,
                  }}
                >
                  {slot}
                  {isSelected && (
                    <div
                      className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white"
                      style={{ backgroundColor: brandConfig.primaryColor }}
                    >
                      <Check className="h-2.5 w-2.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability guarantee notice */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
          <CheckCircle2
            className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5"
            style={{ color: brandConfig.primaryColor }}
          />
          <div>
            <div className="text-xs font-bold text-slate-900">
              {currentPro.name.split(' ')[0]} is available for this time slot
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Your professional will arrive within the selected one-hour window.
            </p>
          </div>
        </div>

        {/* Service location card */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Service location</h3>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              id="btn-change-address-time-screen"
              className="text-xs font-bold text-blue-600 hover:underline"
              style={{ color: brandConfig.primaryColor }}
            >
              Change
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600"
              style={{
                backgroundColor: `${brandConfig.primaryColor}15`,
                color: brandConfig.primaryColor,
              }}
            >
              <Home className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {selectedAddress.label || 'Home'}
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[240px]">
                {selectedAddress.street || ''} {selectedAddress.city}, {selectedAddress.state}
              </p>
            </div>
          </div>
        </div>

        {/* Request another time */}
        <div className="pt-2 text-center">
          <p className="text-xs text-slate-500 mb-2">Can't find a convenient time?</p>
          <button
            onClick={() => showToast('Custom time request submitted')}
            id="btn-request-custom-time"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all"
          >
          </button>
        </div>
      </div>

      {/* Fixed Bottom Price Bar */}
      <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 z-30 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-lg font-black text-slate-900">
              {brandConfig.currencySymbol}
              {currentPro.price} onwards
            </div>
            <div className="text-[11px] text-slate-500">Estimated service price</div>
          </div>

          <button
            onClick={handleContinue}
            id="btn-continue-to-summary"
            className="py-3.5 px-7 rounded-2xl text-white font-bold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all uppercase tracking-wider"
            style={{
              backgroundColor: brandConfig.primaryColor,
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
