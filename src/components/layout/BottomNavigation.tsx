import React from 'react';
import { Home, Search, Calendar, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, brandConfig } = useApp();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'explore' as const, label: 'Explore', icon: Search },
    { id: 'bookings' as const, label: 'Bookings', icon: Calendar },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 shadow-sm">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3.5 transition-all duration-200 ${
                isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all ${
                  isActive ? 'bg-blue-100/70' : 'bg-transparent'
                }`}
                style={{
                  backgroundColor: isActive
                    ? `${brandConfig.primaryColor}18` // ~10% opacity
                    : 'transparent',
                }}
              >
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    color: isActive ? brandConfig.primaryColor : undefined,
                  }}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
              </div>
              <span
                className={`text-[11px] font-medium mt-0.5 ${
                  isActive ? 'font-semibold' : 'text-slate-500'
                }`}
                style={{
                  color: isActive ? brandConfig.primaryColor : undefined,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
