import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { brandConfig, login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your email or phone number');
      return;
    }
    setErrorMessage('');
    login(email);
    navigate('home');
  };

  const handleQuickDemo = () => {
    login('himanshu@example.com', 'Himanshu');
    navigate('home');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-900 text-white p-5 justify-between relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: brandConfig.primaryColor }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: brandConfig.primaryColor }}
      />

      {/* Top Bar with Skip */}
      <div className="flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: brandConfig.primaryColor }}
          />
          <span className="font-extrabold tracking-tight text-sm text-white">
            {brandConfig.name}
          </span>
        </div>
        <button
          onClick={() => navigate('home')}
          className="text-xs text-white/70 hover:text-white font-medium px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-xs"
        >
          Skip as Guest
        </button>
      </div>

      {/* Main Content Card */}
      <div className="my-auto py-6 z-10 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-[11px] font-semibold text-white/90">
            <Sparkles className="h-3.5 w-3.5" style={{ color: brandConfig.primaryColor }} />
            <span>Welcome Back</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Log in to your account
          </h1>
          <p className="text-xs text-white/60 leading-relaxed">
            Access your bookings, saved addresses, and exclusive offers.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-medium animate-in fade-in">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80 block">
              Email or Phone Number
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com or +91..."
                className="w-full bg-white/10 border border-white/15 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white/80 block">
                Password
              </label>
              <button
                type="button"
                onClick={() => setEmail('himanshu@example.com')}
                className="text-[11px] text-white/60 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/15 rounded-2xl py-3 pl-10 pr-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-slate-900 font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            style={{ backgroundColor: '#ffffff' }}
          >
            <span>Log In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="pt-2">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-3 text-[10px] text-white/40 uppercase tracking-widest font-bold">
              Instant Demo
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>Quick Demo Login (Himanshu)</span>
          </button>
        </div>
      </div>

      {/* Footer / Switch to Signup */}
      <div className="z-10 text-center py-2 space-y-3">
        <p className="text-xs text-white/70">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="font-bold text-white underline underline-offset-2 hover:text-white/90 ml-1"
          >
            Sign Up
          </button>
        </p>

        <div className="flex items-center justify-center gap-2 text-[10px] text-white/40">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};
