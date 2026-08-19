import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SignupScreen: React.FC = () => {
  const { brandConfig, signup, navigate } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jaipur, Rajasthan');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms & Conditions to proceed');
      return;
    }
    setErrorMessage('');
    signup(name, email, phone, city);
    navigate('home');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-900 text-white p-5 justify-between relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: brandConfig.primaryColor }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: brandConfig.primaryColor }}
      />

      {/* Top Bar with Back/Skip */}
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

      {/* Main Content Form */}
      <div className="my-auto py-4 z-10 space-y-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-[11px] font-semibold text-white/90">
            <Sparkles className="h-3.5 w-3.5" style={{ color: brandConfig.primaryColor }} />
            <span>Create Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Join {brandConfig.name} today
          </h1>
          <p className="text-xs text-white/60 leading-relaxed">
            Get instant access to top-rated home service professionals.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-medium animate-in fade-in">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-white/80 block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-white/10 border border-white/15 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-white/80 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/10 border border-white/15 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-white/80 block">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white/10 border border-white/15 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-white/80 block">
              City / Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-800 border border-white/15 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/40 transition-all"
              >
                <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-white/80 block">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-white/10 border border-white/15 rounded-2xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
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

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-white/20 text-blue-600 focus:ring-0 bg-white/10"
            />
            <label htmlFor="agree-terms" className="text-[11px] text-white/70 leading-tight">
              I agree to the{' '}
              <span className="text-white underline">Terms of Service</span> and{' '}
              <span className="text-white underline">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-slate-900 font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-3"
            style={{ backgroundColor: '#ffffff' }}
          >
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Footer / Switch to Login */}
      <div className="z-10 text-center py-2 space-y-2">
        <p className="text-xs text-white/70">
          Already have an account?{' '}
          <button
            onClick={() => navigate('login')}
            className="font-bold text-white underline underline-offset-2 hover:text-white/90 ml-1"
          >
            Log In
          </button>
        </p>

        <div className="flex items-center justify-center gap-2 text-[10px] text-white/40">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Your information is safe & protected</span>
        </div>
      </div>
    </div>
  );
};
