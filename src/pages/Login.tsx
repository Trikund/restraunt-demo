import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
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
    <GlassCard className="w-full p-8 sm:p-10 bg-white/95 dark:bg-background/40 backdrop-blur-2xl border-slate-200 dark:border-foreground/10 shadow-2xl shadow-slate-200/50 dark:shadow-2xl rounded-3xl">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-amber-100 dark:bg-aurora-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-aurora-gold shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:shadow-[0_0_20px_rgba(255,184,0,0.2)]">
          <LogIn size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-foreground mb-2">Welcome Back</h2>
        <p className="text-slate-500 dark:text-muted-foreground font-medium">Sign in to continue your culinary journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail size={18} />}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          error={errors.email}
        />
        
        <div className="space-y-1">
          <Input 
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock size={18} />}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
          />
          <div className="flex justify-end pt-1">
            <Link to="/forgot-password" className="text-xs font-bold text-amber-600 dark:text-aurora-gold hover:text-amber-700 dark:hover:text-aurora-cyan transition-colors mt-1">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          className="mt-6 font-bold shadow-lg shadow-amber-500/20 dark:shadow-aurora-gold/20 py-3.5 text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full mx-auto"
            />
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign In <LogIn size={18} />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px bg-slate-200 dark:bg-foreground/10 flex-1"></div>
        <span className="text-xs text-slate-400 dark:text-muted-foreground uppercase tracking-widest font-bold">Or continue with</span>
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
        Don't have an account?{' '}
        <Link to="/signup" className="text-amber-600 dark:text-aurora-gold font-bold hover:text-amber-700 dark:hover:text-aurora-cyan transition-colors">
          Create one now
        </Link>
      </p>
    </GlassCard>
  );
}
