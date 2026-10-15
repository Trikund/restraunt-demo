import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Phone, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailData, setEmailData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrors({ phone: 'Enter a valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    setIsLoading(true);

    if (!otpSent) {
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
      }, 800);
    } else {
      if (!otp || otp.length < 4) {
        setErrors({ otp: 'Enter the 4-digit OTP' });
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!emailData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(emailData.email)) newErrors.email = 'Invalid email format';
    if (!emailData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <LogIn size={26} />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Login to AuroraFood</h2>
        <p className="text-xs text-slate-400 mt-1">Enter your details to track orders & tiffin meals</p>
      </div>

      {/* Mode Switcher Tabs (Swiggy / Zomato style) */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-5 text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => { setAuthMode('phone'); setErrors({}); }}
          className={`py-2.5 rounded-xl transition-all cursor-pointer ${
            authMode === 'phone'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📱 Mobile OTP
        </button>
        <button
          type="button"
          onClick={() => { setAuthMode('email'); setErrors({}); }}
          className={`py-2.5 rounded-xl transition-all cursor-pointer ${
            authMode === 'email'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ✉️ Email & Password
        </button>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        {authMode === 'phone' ? (
          <motion.form 
            key="phone-form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handlePhoneSubmit} 
            className="space-y-4"
          >
            {!otpSent ? (
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Mobile Number</label>
                <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-3.5 py-3 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
                  <span className="text-xs font-bold text-amber-400 mr-2.5 pr-2.5 border-r border-white/10 flex items-center gap-1.5">
                    <Phone size={14} /> +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="bg-transparent border-0 text-white text-xs focus:outline-none w-full font-medium"
                    maxLength={13}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between">
                  <span className="text-slate-300">OTP sent to <strong className="text-white">+91 {phone}</strong></span>
                  <button 
                    type="button" 
                    onClick={() => { setOtpSent(false); setOtp(''); }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Enter 4-Digit OTP</label>
                  <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-3.5 py-3 focus-within:border-amber-400">
                    <KeyRound size={16} className="text-amber-400 mr-2.5" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="e.g. 1 2 3 4"
                      className="bg-transparent border-0 text-white text-sm tracking-widest focus:outline-none w-full font-mono font-bold"
                      maxLength={4}
                    />
                  </div>
                  {errors.otp && <p className="text-xs text-rose-400 mt-1">{errors.otp}</p>}
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className="mt-2 font-bold shadow-lg shadow-amber-500/20 py-3.5 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {otpSent ? 'Verify & Continue' : 'Get OTP & Login'} <ArrowRight size={15} />
                </span>
              )}
            </Button>
          </motion.form>
        ) : (
          <motion.form 
            key="email-form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleEmailSubmit} 
            className="space-y-3.5"
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              leftIcon={<Mail size={16} />}
              value={emailData.email}
              onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
              error={errors.email}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
                value={emailData.password}
                onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
                error={errors.password}
              />
              <div className="flex justify-end pt-1">
                <Link to="/forgot-password" className="text-xs font-semibold text-amber-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className="mt-2 font-bold shadow-lg shadow-amber-500/20 py-3.5 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={15} />
                </span>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px bg-white/10 flex-1"></div>
        <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">or continue with</span>
        <div className="h-px bg-white/10 flex-1"></div>
      </div>

      {/* Google 1-Tap */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Switch to Signup */}
      <p className="text-center mt-5 text-xs text-slate-400 font-medium">
        Don't have an account?{' '}
        <Link to="/signup" className="text-amber-400 font-bold hover:text-amber-300 transition-colors">
          Create one now
        </Link>
      </p>

      {/* Food Trust Badge */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>100% Safe & Secure Food Delivery Login</span>
      </div>
    </div>
  );
}
