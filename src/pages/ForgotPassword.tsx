import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <GlassCard className="w-full p-8 sm:p-10 bg-background/40 backdrop-blur-2xl border-white/10 shadow-2xl relative overflow-hidden">
      <Link to="/login" className="absolute top-6 left-6 text-muted hover:text-white transition-colors flex items-center gap-2 text-sm">
        <ArrowLeft size={16} /> Back
      </Link>
      
      <div className="mt-8 mb-8 text-center">
        <div className="w-16 h-16 bg-aurora-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 text-aurora-blue glow-cyan">
          <KeyRound size={28} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-muted">Enter your email and we'll send a link</p>
      </div>

      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
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
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
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
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-status-success/20 rounded-full flex items-center justify-center mx-auto mb-6 text-status-success shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
            <p className="text-muted mb-8">
              We've sent a password reset link to <br/>
              <span className="text-white font-medium">{email}</span>
            </p>
            <Link to="/login">
              <Button variant="glass" fullWidth>Return to login</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
