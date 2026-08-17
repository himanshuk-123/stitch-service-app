import React, { useState } from 'react';
import {
  X,
  MapPin,
  Check,
  Plus,
  Home,
  Building,
  Navigation,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationPickerModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    currentCity,
    setCurrentCity,
    user,
    setUser,
    brandConfig,
    showToast,
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState(currentCity.split(',')[0]);

  if (!isLocationModalOpen) return null;

  const popularCities = [
    'Jaipur, Rajasthan',
    'Bengaluru, Karnataka',
    'Delhi NCR, Delhi',
    'Mumbai, Maharashtra',
    'Hyderabad, Telangana',
    'Pune, Maharashtra',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'New York, NY',
    'London, UK',
    'Dubai, UAE',
  ];

  const handleSelectCity = (city: string) => {
    setCurrentCity(city);
    setIsLocationModalOpen(false);
    showToast(`Location updated to ${city}`);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) {
      showToast('Please enter an address');
      return;
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      city: newCity,
      state: 'Rajasthan',
      street: newStreet,
      isDefault: false,
    };

    setUser((prev) => ({
      ...prev,
      savedAddresses: [newAddr, ...prev.savedAddresses],
    }));

    setCurrentCity(`${newCity}, Rajasthan`);
    setShowAddForm(false);
    showToast('New address saved successfully');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 text-blue-700"
              style={{
                backgroundColor: `${brandConfig.primaryColor}20`,
                color: brandConfig.primaryColor,
              }}
            >
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Select Service Location
              </h3>
              <p className="text-[11px] text-slate-500">
                Choose your city or saved address
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(false)}
            id="btn-close-location-modal"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Current GPS location trigger */}
          <button
            onClick={() => {
              showToast('Detected current GPS location: Jaipur, Rajasthan');
              handleSelectCity('Jaipur, Rajasthan');
            }}
            id="btn-use-current-gps-location"
            className="w-full p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3 text-blue-700 hover:bg-blue-100/80 transition-colors"
            style={{
              backgroundColor: `${brandConfig.primaryColor}12`,
              color: brandConfig.primaryColor,
            }}
          >
            <Navigation className="h-4.5 w-4.5 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold">Use Current Location</div>
              <div className="text-[10px] opacity-80">Using GPS coordinates</div>
            </div>
          </button>

          {/* Saved Addresses */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Saved Addresses
              </h4>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                style={{ color: brandConfig.primaryColor }}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add new</span>
              </button>
            </div>

            {/* Add Address Form */}
            {showAddForm && (
              <form
                onSubmit={handleAddAddress}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex gap-2">
                  {['Home', 'Work', 'Other'].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setNewLabel(lbl)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                        newLabel === lbl
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border text-slate-700'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Street / House / Area (e.g. 402, Lotus Tower)"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                />

                <input
                  type="text"
                  placeholder="City (e.g. Jaipur)"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                />

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-white font-bold text-xs"
                    style={{ backgroundColor: brandConfig.primaryColor }}
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {user.savedAddresses.map((addr) => {
                const isSelected = currentCity.includes(addr.city);
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectCity(`${addr.city}, ${addr.state}`)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 font-semibold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700">
                        {addr.label === 'Work' ? (
                          <Building className="h-4 w-4" />
                        ) : (
                          <Home className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {addr.label}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {addr.street ? `${addr.street}, ` : ''}{addr.city}, {addr.state}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check
                        className="h-4 w-4 text-blue-600"
                        style={{ color: brandConfig.primaryColor }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Cities */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Popular Cities
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {popularCities.map((c, i) => {
                const isSelected = currentCity.toLowerCase() === c.toLowerCase();
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectCity(c)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 font-bold text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    style={{
                      borderColor: isSelected ? brandConfig.primaryColor : undefined,
                    }}
                  >
                    <div className="truncate">{c}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
