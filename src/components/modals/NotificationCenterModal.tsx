import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Tag,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationCenterModal: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationAsRead,
    brandConfig,
    navigate,
  } = useApp();

  if (!isNotificationOpen) return null;

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
              <Bell className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Notifications</h3>
              <p className="text-[11px] text-slate-500">
                Service updates and exclusive offers
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationOpen(false)}
            id="btn-close-notifications"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {(!notifications || notifications.length === 0) ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="font-semibold text-slate-600">No notifications yet</p>
              <p className="text-[11px] text-slate-400 mt-1">We'll alert you here about your bookings & promos.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  if (markNotificationAsRead) markNotificationAsRead(n.id);
                  if (n.type === 'booking') {
                    setIsNotificationOpen(false);
                    navigate('my_bookings');
                  } else if (n.type === 'promo') {
                    setIsNotificationOpen(false);
                    navigate('explore');
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  !n.isRead
                    ? 'bg-blue-50/40 border-blue-200'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white shadow-xs shrink-0"
                  style={{ color: brandConfig.primaryColor }}
                >
                  {n.type === 'booking' ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                  ) : n.type === 'promo' ? (
                    <Tag className="h-4.5 w-4.5 text-blue-600" />
                  ) : (
                    <Clock className="h-4.5 w-4.5 text-amber-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {n.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {n.message}
                  </p>
                </div>

                {!n.isRead && (
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: brandConfig.primaryColor }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
