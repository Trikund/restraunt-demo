import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6">
        <ArrowLeft size={14} /> Back to Sign In
      </Link>
      
      <div className="mb-6 text-center">
        <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/25 rounded-2xl flex items-center justify-center mx-auto mb-3.5 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <KeyRound size={26} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">Reset Password</h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">Enter your email and we'll send a password recovery link</p>
      </div>

      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <Input 
              label="Email Address"
              type="email"
              placeholder="Enter your registered email"
              leftIcon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              disabled={isLoading}
              className="mt-4 font-bold shadow-lg shadow-amber-500/20 py-3.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full mx-auto"
                />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-4"
          >
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">Check your email</h3>
            <p className="text-xs text-slate-400 mb-6">
              We've sent a password reset link to <br/>
              <span className="text-white font-medium">{email}</span>
            </p>
            <Link to="/login">
              <Button variant="glass" fullWidth className="border-white/10 text-xs">Return to login</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
