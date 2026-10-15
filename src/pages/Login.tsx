import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/25 rounded-2xl flex items-center justify-center mx-auto mb-3.5 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <LogIn size={26} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">Welcome Back</h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">Sign in to access your orders, tiffins, and saved dishes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail size={18} />}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          error={errors.email}
        />
        
        <div className="space-y-1">
          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock size={18} />}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
          />
          <div className="flex justify-end pt-1">
            <Link to="/forgot-password" className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mt-0.5">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          className="mt-5 font-bold shadow-lg shadow-amber-500/20 py-3.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full mx-auto"
            />
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign In <LogIn size={17} />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px bg-white/10 flex-1"></div>
        <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Or continue with</span>
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

      <p className="text-center mt-6 text-xs text-slate-400 font-medium">
        Don't have an account?{' '}
        <Link to="/signup" className="text-amber-400 font-bold hover:text-amber-300 transition-colors">
          Create one now
        </Link>
      </p>
    </div>
  );
}
