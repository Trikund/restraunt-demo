import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Check, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';

const PREFERENCES = [
  'North Indian', 'South Indian', 'Tiffin Meals', 'Biryani', 
  'Chinese', 'Healthy & Diet', 'Desserts', 'Fast Food'
];

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', password: '', confirmPassword: '', terms: false 
  });
  const [preferences, setPreferences] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) { newErrors.name = 'Full name is required'; valid = false; }
    if (!formData.email) { newErrors.email = 'Email is required'; valid = false; } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Invalid email'; valid = false; }
    if (!formData.phone) { newErrors.phone = 'Phone number is required'; valid = false; }
    if (!formData.password) { newErrors.password = 'Password is required'; valid = false; } 
    else if (formData.password.length < 6) { newErrors.password = 'Must be at least 6 characters'; valid = false; }
    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; valid = false; }
    
    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};
    if (!formData.terms) { newErrors.terms = 'You must accept the terms'; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    }
  };

  const togglePref = (pref: string) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/25 rounded-2xl flex items-center justify-center mx-auto mb-3.5 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <UserPlus size={26} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">Create Account</h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          {step === 1 ? 'Sign up to order delicious food & manage tiffins' : 'Choose your food preferences'}
        </p>
      </div>

      {step === 1 ? (
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}>
          <div className="space-y-3.5">
            <Input 
              label="Full Name" 
              placeholder="Enter your full name" 
              leftIcon={<User size={18} />} 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              error={errors.name} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input 
                label="Email" 
                type="email" 
                placeholder="name@example.com" 
                leftIcon={<Mail size={18} />} 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                error={errors.email} 
              />
              <Input 
                label="Phone" 
                type="tel" 
                placeholder="Enter mobile number" 
                leftIcon={<Phone size={18} />} 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                error={errors.phone} 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                leftIcon={<Lock size={18} />} 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                error={errors.password} 
              />
              <Input 
                label="Confirm Password" 
                type="password" 
                placeholder="••••••••" 
                leftIcon={<Lock size={18} />} 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                error={errors.confirmPassword} 
              />
            </div>
            
            <Button 
              type="button" 
              variant="primary" 
              fullWidth 
              className="mt-4 font-bold shadow-lg shadow-amber-500/20 py-3.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950" 
              onClick={handleNext}
            >
              Continue to Preferences →
            </Button>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Or sign up with</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <Phone size={15} className="text-amber-400" />
              Mobile OTP
            </button>
          </div>

          <p className="text-center mt-5 text-xs text-slate-400 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 font-bold hover:text-amber-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      ) : (
        <motion.form initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 block">
              What do you love eating?
            </label>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES.map(pref => {
                const isSelected = preferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => togglePref(pref)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {isSelected && <Check size={13} className="inline mr-1" />}
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-start gap-2.5 mt-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={formData.terms}
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.terms ? 'bg-amber-500 border-amber-500' : 'border-slate-500 group-hover:border-amber-400'}`}>
                {formData.terms && <Check size={12} className="text-slate-950 stroke-[3]" />}
              </div>
            </div>
            <span className="text-xs text-slate-400 leading-relaxed">
              I agree to the <span className="text-amber-400 font-medium">Terms of Service</span> and <span className="text-amber-400 font-medium">Privacy Policy</span>.
            </span>
          </label>
          {errors.terms && <p className="text-xs text-rose-400 font-medium">{errors.terms}</p>}

          <div className="flex gap-3 pt-3">
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="px-5 border border-white/10 text-xs">
              Back
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              disabled={isLoading} 
              className="font-bold shadow-lg shadow-amber-500/20 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm py-3"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">Create Account <UserPlus size={16} /></span>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
