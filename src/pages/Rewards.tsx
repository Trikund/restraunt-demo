import { motion } from 'framer-motion';
import { Gift, Award, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';

export default function Rewards() {
  const currentPoints = 1250;
  const nextTierPoints = 2000;
  const progress = (currentPoints / nextTierPoints) * 100;

  const history = [
    { id: 1, action: 'Order from Gourmet Kitchen', points: '+45', date: 'Oct 24, 2023', type: 'earn' },
    { id: 2, action: 'Redeemed ₹10 Off Coupon', points: '-500', date: 'Oct 12, 2023', type: 'spend' },
    { id: 3, action: 'First Anniversary Bonus', points: '+200', date: 'Oct 01, 2023', type: 'earn' },
    { id: 4, action: 'Order from Spice Route', points: '+28', date: 'Sep 28, 2023', type: 'earn' },
  ];

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading 
        title={<span className="flex items-center gap-3"><Gift className="text-aurora-purple" /> Aurora Rewards</span>} 
        subtitle="Earn TasteCoins on every order and unlock exclusive perks." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Main Balance Card */}
        <div className="lg:col-span-8">
          <GlassCard className="p-8 md:p-10 bg-gradient-to-br from-aurora-purple/20 to-aurora-blue/10 border-aurora-purple/30 relative overflow-hidden h-full flex flex-col justify-center">
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 opacity-10">
              <Award size={300} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div>
                <p className="text-aurora-cyan font-bold tracking-wider uppercase text-sm mb-2">Total TasteCoins</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">{currentPoints.toLocaleString()}</h2>
                  <span className="text-2xl text-aurora-purple">TC</span>
                </div>
                <p className="text-slate-300">Equals ~₹12.50 in value</p>
              </div>

              <div className="w-full md:w-1/2 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2"><Award size={18} className="text-aurora-purple" /> Gold Member</h4>
                    <p className="text-xs text-slate-400">{(nextTierPoints - currentPoints).toLocaleString()} TC to Platinum</p>
                  </div>
                  <span className="text-sm font-bold text-aurora-cyan">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-aurora-cyan to-aurora-purple rounded-full relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <GlassCard className="p-6 bg-background/50 border-white/10 hover:border-aurora-cyan/30 transition-colors group cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-aurora-cyan/10 text-aurora-cyan flex items-center justify-center">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-aurora-cyan transition-colors">Redeem Coins</h4>
                <p className="text-xs text-slate-400">Convert TC to discounts</p>
              </div>
            </div>
            <ChevronRight className="text-slate-500 group-hover:text-aurora-cyan transition-colors" />
          </GlassCard>
          
          <GlassCard className="p-6 bg-background/50 border-white/10 hover:border-aurora-purple/30 transition-colors group cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-aurora-purple/10 text-aurora-purple flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-aurora-purple transition-colors">Ways to Earn</h4>
                <p className="text-xs text-slate-400">Discover earning methods</p>
              </div>
            </div>
            <ChevronRight className="text-slate-500 group-hover:text-aurora-purple transition-colors" />
          </GlassCard>
        </div>
      </div>

      {/* History */}
      <h3 className="text-xl font-bold text-white mb-6">Recent History</h3>
      <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden max-w-4xl">
        {history.map((item, idx) => (
          <div key={item.id} className={`p-4 md:p-6 flex items-center justify-between ${idx !== history.length - 1 ? 'border-b border-white/5' : ''}`}>
            <div>
              <p className="font-bold text-white mb-1">{item.action}</p>
              <p className="text-xs text-slate-400">{item.date}</p>
            </div>
            <div className={`font-mono font-bold text-lg ${item.type === 'earn' ? 'text-status-success' : 'text-status-error'}`}>
              {item.points} TC
            </div>
          </div>
        ))}
        <div className="p-4 bg-white/5 text-center">
          <button className="text-sm font-bold text-aurora-cyan hover:text-white transition-colors">View All History</button>
        </div>
      </div>
    </div>
  );
}
