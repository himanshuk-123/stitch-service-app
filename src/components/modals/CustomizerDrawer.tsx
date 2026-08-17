import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Palette,
  DollarSign,
  Layers,
  RotateCcw,
  Download,
  Upload,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandConfig } from '../../types';

export const CustomizerDrawer: React.FC = () => {
  const {
    isCustomizerOpen,
    setIsCustomizerOpen,
    brandConfig,
    updateBrandConfig,
    resetToDefaults,
    showToast,
  } = useApp();

  const [formConfig, setFormConfig] = useState<BrandConfig>(brandConfig);

  if (!isCustomizerOpen) return null;

  const colorPresets = [
    { name: 'Royal Blue (Fixora Default)', primary: '#2563eb', secondary: '#1d4ed8' },
    { name: 'Emerald Green (Eco Clean)', primary: '#059669', secondary: '#047857' },
    { name: 'Electric Violet (Premium Pro)', primary: '#7c3aed', secondary: '#6d28d9' },
    { name: 'Sunset Rose (Glamour & Home)', primary: '#e11d48', secondary: '#be123c' },
    { name: 'Warm Amber (Handyman & Tech)', primary: '#d97706', secondary: '#b45309' },
    { name: 'Midnight Charcoal (Luxury Modern)', primary: '#0f172a', secondary: '#334155' },
    { name: 'Teal Cyan (Fresh Living)', primary: '#0891b2', secondary: '#0e7490' },
  ];

  const presets = [
    {
      name: 'Fixora India (₹ INR)',
      config: {
        name: 'Fixora',
        tagline: 'Delivering trusted home services',
        primaryColor: '#2563eb',
        secondaryColor: '#1d4ed8',
        currency: 'INR',
        currencySymbol: '₹',
        platformFee: 40,
        taxRatePercent: 8,
      },
    },
    {
      name: 'HomeBreeze USA ($ USD)',
      config: {
        name: 'HomeBreeze',
        tagline: 'Instant 5-star home maintenance',
        primaryColor: '#059669',
        secondaryColor: '#047857',
        currency: 'USD',
        currencySymbol: '$',
        platformFee: 5,
        taxRatePercent: 7,
      },
    },
    {
      name: 'UrbanCraft UK (£ GBP)',
      config: {
        name: 'UrbanCraft',
        tagline: 'Vetted tradespeople at your door',
        primaryColor: '#7c3aed',
        secondaryColor: '#6d28d9',
        currency: 'GBP',
        currencySymbol: '£',
        platformFee: 4,
        taxRatePercent: 20,
      },
    },
    {
      name: 'SwiftServe UAE (AED)',
      config: {
        name: 'SwiftServe',
        tagline: 'Premium Dubai on-demand technicians',
        primaryColor: '#d97706',
        secondaryColor: '#b45309',
        currency: 'AED',
        currencySymbol: 'AED ',
        platformFee: 25,
        taxRatePercent: 5,
      },
    },
  ];

  const handleApply = (newConf: Partial<BrandConfig>) => {
    const fullConfig: BrandConfig = {
      ...brandConfig,
      ...newConf,
    };
    updateBrandConfig(fullConfig);
    setFormConfig(fullConfig);
    showToast('Brand configuration applied in real-time!');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(brandConfig, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `${brandConfig.name.toLowerCase()}-brand-config.json`);
    dl.click();
    showToast('Config exported as JSON');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.name && parsed.primaryColor) {
            handleApply(parsed);
          }
        } catch {
          showToast('Invalid JSON file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100 text-blue-700"
              style={{
                backgroundColor: `${brandConfig.primaryColor}20`,
                color: brandConfig.primaryColor,
              }}
            >
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                White-Label Brand Customizer
              </h3>
              <p className="text-[11px] text-slate-500">
                Rebrand and repackage this app instantly for any client
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(false)}
            id="btn-close-customizer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Quick 1-Click Client Presets */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Layers className="h-3.5 w-3.5 text-slate-500" />
              <span>1-Click White-Label Presets</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApply(p.config)}
                  id={`preset-${idx}`}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 text-left transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-slate-200"
                      style={{ backgroundColor: p.config.primaryColor }}
                    />
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                      {p.config.name}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Currency: <span className="font-semibold">{p.config.currencySymbol}</span> • Tax: {p.config.taxRatePercent}%
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Core Brand Identity Fields */}
          <div className="space-y-4 pt-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Brand Identity
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                App / Platform Name
              </label>
              <input
                type="text"
                value={formConfig.name}
                onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Fixora, HandyPro"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={formConfig.tagline}
                onChange={(e) => setFormConfig({ ...formConfig, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Delivering trusted home services"
              />
            </div>
          </div>

          {/* Color Palette Selection */}
          <div className="space-y-3 pt-1">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Palette className="h-3.5 w-3.5 text-slate-500" />
              <span>Theme Colors</span>
            </label>

            <div className="space-y-2">
              {colorPresets.map((c, i) => {
                const isActive = formConfig.primaryColor.toLowerCase() === c.primary.toLowerCase();
                return (
                  <button
                    key={i}
                    onClick={() => setFormConfig({ ...formConfig, primaryColor: c.primary, secondaryColor: c.secondary })}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isActive ? 'border-slate-900 bg-slate-50 font-bold' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full shadow-xs"
                        style={{ backgroundColor: c.primary }}
                      />
                      <span className="text-xs text-slate-800">{c.name}</span>
                    </div>
                    {isActive && <Check className="h-4 w-4 text-slate-900" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-slate-600 font-medium">Custom Hex:</span>
              <input
                type="color"
                value={formConfig.primaryColor}
                onChange={(e) => setFormConfig({ ...formConfig, primaryColor: e.target.value })}
                className="w-9 h-9 rounded-lg cursor-pointer border-0 p-0"
              />
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded-md text-slate-700">
                {formConfig.primaryColor}
              </span>
            </div>
          </div>

          {/* Financials & Currency */}
          <div className="space-y-3 pt-1">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <DollarSign className="h-3.5 w-3.5 text-slate-500" />
              <span>Currency & Pricing Structure</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={formConfig.currencySymbol}
                  onChange={(e) => setFormConfig({ ...formConfig, currencySymbol: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 text-center"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Platform Fee
                </label>
                <input
                  type="number"
                  value={formConfig.platformFee}
                  onChange={(e) => setFormConfig({ ...formConfig, platformFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 text-center"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={formConfig.taxRatePercent}
                  onChange={(e) => setFormConfig({ ...formConfig, taxRatePercent: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 text-center"
                />
              </div>
            </div>
          </div>

          {/* Import / Export / Reset */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export JSON</span>
              </button>

              <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={() => {
                resetToDefaults();
                showToast('Reset to original default configuration');
              }}
              className="flex items-center gap-1 text-slate-500 hover:text-red-600 font-medium py-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="w-1/3 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100"
          >
            Close
          </button>

          <button
            onClick={() => {
              handleApply(formConfig);
              setIsCustomizerOpen(false);
            }}
            id="btn-save-customizer-changes"
            className="w-2/3 py-3 rounded-2xl text-white font-bold text-xs shadow-md active:scale-95 transition-all text-center"
            style={{ backgroundColor: formConfig.primaryColor }}
          >
            Save & Apply Branding
          </button>
        </div>
      </div>
    </div>
  );
};
