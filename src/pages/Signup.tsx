import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Check, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';

const PREFERENCES = [
  'Pizza', 'Indian', 'Chinese', 'Healthy', 
  'Desserts', 'Fast Food', 'Italian', 'Asian'
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
    <GlassCard className="w-full p-8 sm:p-10 bg-white/95 dark:bg-background/40 backdrop-blur-2xl border-slate-200 dark:border-foreground/10 shadow-2xl shadow-slate-200/50 dark:shadow-2xl rounded-3xl">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-foreground mb-2">Create Account</h2>
        <p className="text-slate-500 dark:text-muted-foreground font-medium">{step === 1 ? 'Join the premium food ecosystem' : 'Customize your experience'}</p>
      </div>

      {step === 1 ? (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
          <div className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" leftIcon={<User size={18} />} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} error={errors.name} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Email" type="email" placeholder="john@example.com" leftIcon={<Mail size={18} />} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} error={errors.email} />
              <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" leftIcon={<Phone size={18} />} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} error={errors.phone} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Password" type="password" placeholder="••••••••" leftIcon={<Lock size={18} />} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} error={errors.password} />
              <Input label="Confirm Password" type="password" placeholder="••••••••" leftIcon={<Lock size={18} />} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} error={errors.confirmPassword} />
            </div>
            
            <Button type="button" variant="primary" fullWidth className="mt-6 font-bold shadow-lg shadow-amber-500/20 dark:shadow-aurora-gold/20 py-3.5 text-base" onClick={handleNext}>
              Continue
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px bg-slate-200 dark:bg-foreground/10 flex-1"></div>
            <span className="text-xs text-slate-400 dark:text-muted-foreground uppercase tracking-widest font-bold">Or sign up with</span>
            <div className="h-px bg-slate-200 dark:bg-foreground/10 flex-1"></div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-foreground/10 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-foreground/5 shadow-sm transition-all text-sm font-bold text-slate-700 dark:text-foreground">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-foreground/10 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-foreground/5 shadow-sm transition-all text-sm font-bold text-slate-700 dark:text-foreground">
              <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-slate-500 dark:text-muted-foreground font-medium">
            Already have an account? <Link to="/login" className="text-amber-600 dark:text-aurora-gold font-bold hover:text-amber-700 dark:hover:text-aurora-cyan transition-colors">Sign in</Link>
          </p>
        </motion.div>
      ) : (
        <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">What do you love eating?</label>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES.map(pref => {
                const isSelected = preferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => togglePref(pref)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-aurora-gold/20 border-aurora-gold text-aurora-gold shadow-[0_0_15px_rgba(255,184,0,0.2)]' 
                        : 'bg-foreground/5 border-foreground/10 text-muted-foreground hover:bg-foreground/10'
                    }`}
                  >
                    {isSelected && <Check size={14} className="inline mr-1.5" />}
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-start gap-3 mt-4 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={formData.terms}
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
              />
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.terms ? 'bg-aurora-gold border-aurora-gold' : 'border-muted-foreground group-hover:border-aurora-gold/50'}`}>
                {formData.terms && <Check size={14} className="text-background" />}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              I agree to the <Link to="#" className="text-aurora-gold font-medium hover:underline">Terms of Service</Link> and <Link to="#" className="text-aurora-gold font-medium hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.terms && <p className="text-xs text-status-error">{errors.terms}</p>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="px-6 border border-foreground/10">Back</Button>
            <Button type="submit" variant="primary" fullWidth disabled={isLoading} className="font-bold shadow-lg shadow-aurora-gold/20">
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">Create Account <UserPlus size={18} /></span>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </GlassCard>
  );
}
