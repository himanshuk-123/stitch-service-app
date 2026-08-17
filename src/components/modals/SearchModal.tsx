import React, { useState } from 'react';
import {
  X,
  Search,
  Star,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    services,
    professionals,
    brandConfig,
    navigate,
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      s.about.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPros = professionals.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.serviceTitle.toLowerCase().includes(query.toLowerCase()) ||
      p.specializations.some((spec) =>
        spec.toLowerCase().includes(query.toLowerCase())
      )
  );

  const trendingTags = [
    'Deep Cleaning',
    'AC Service',
    'Electrician',
    'Plumber',
    'Kitchen Clean',
    'Sofa Washing',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-b-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-top duration-300">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-100 rounded-2xl">
            <Search className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, cleaners, electricians..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsSearchOpen(false)}
            id="btn-close-search"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1"
          >
            Cancel
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Trending Searches when no query */}
          {!query && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Trending Searches</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Matches */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Services ({filteredServices.length})
            </h4>

            {filteredServices.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No matching services found</p>
            ) : (
              <div className="space-y-2">
                {filteredServices.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('service_detail', { serviceId: svc.id });
                    }}
                    className="p-3 rounded-2xl border border-slate-100 hover:border-slate-300 flex items-center justify-between cursor-pointer group bg-slate-50/50 hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                          {svc.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-semibold text-slate-900">
                            {brandConfig.currencySymbol}{svc.startingPrice} onwards
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-600">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            {svc.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Professionals Matches */}
          {filteredPros.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Professionals ({filteredPros.length})
              </h4>

              <div className="space-y-2">
                {filteredPros.map((pro) => (
                  <div
                    key={pro.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('provider_detail', { proId: pro.id });
                    }}
                    className="p-3 rounded-2xl border border-slate-100 hover:border-slate-300 flex items-center justify-between cursor-pointer group bg-slate-50/50 hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={pro.photo}
                          alt={pro.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                          {pro.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          ★ {pro.rating} • {pro.experienceYears} yrs exp • {pro.serviceTitle}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
