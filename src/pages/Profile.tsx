import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Package, Heart, MapPin, 
  CreditCard, Gift, Bell, Settings, LogOut, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Input from '../components/Input';

const TABS = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'rewards', label: 'Rewards & Offers', icon: Gift },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading 
        title={<span className="flex items-center gap-3"><User className="text-aurora-blue" /> Your Profile</span>} 
        subtitle="Manage your account, preferences, and details." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassCard className="p-6 bg-background/60 border-white/10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-purple p-0.5">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Alex Johnson</h3>
              <p className="text-sm text-aurora-cyan font-medium">Foodie Elite Member</p>
            </div>
          </GlassCard>

          <GlassCard className="p-2 bg-background/40 border-white/5 flex flex-col gap-1">
            {/* Quick Links */}
            <div className="px-3 pb-2 pt-2 border-b border-white/5 mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Shortcuts</p>
              <Link to="/orders" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                  <Package size={18} className="text-aurora-cyan" /> Orders
                </div>
                <ChevronRight size={16} className="text-slate-500 group-hover:text-white" />
              </Link>
              <Link to="/wishlist" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                  <Heart size={18} className="text-food-coral" /> Wishlist
                </div>
                <ChevronRight size={16} className="text-slate-500 group-hover:text-white" />
              </Link>
              <Link to="/rewards" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                  <Gift size={18} className="text-aurora-purple" /> Rewards
                </div>
                <ChevronRight size={16} className="text-slate-500 group-hover:text-white" />
              </Link>
            </div>

            <div className="px-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Account</p>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    activeTab === tab.id 
                      ? 'bg-white/10 text-white font-semibold shadow-inner' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-aurora-purple' : ''} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4 px-3 pt-4 border-t border-white/5">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left text-status-error hover:bg-status-error/10">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </GlassCard>
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-8">
          <GlassCard className="p-8 min-h-[500px] bg-background/50 border-white/10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Alex" />
                    <Input label="Last Name" defaultValue="Johnson" />
                  </div>
                  <Input label="Email Address" defaultValue="alex.johnson@example.com" type="email" />
                  <Input label="Phone Number" defaultValue="+1 (555) 123-4567" type="tel" />
                  
                  <div className="pt-4 border-t border-white/10 mt-6">
                    <Button variant="primary" className="shadow-[0_0_15px_rgba(34,211,238,0.2)]">Save Changes</Button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Saved Addresses</h2>
                    <Button variant="ghost" size="sm" className="bg-white/5 border border-white/10">+ Add New</Button>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <GlassCard className="p-4 bg-white/5 border-aurora-cyan/30">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-aurora-cyan" />
                        <h4 className="font-bold text-white">Home</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-aurora-cyan/20 text-aurora-cyan ml-auto">DEFAULT</span>
                      </div>
                      <p className="text-sm text-slate-400">124 Culinary Avenue, Floor 4<br/>Food District, NY 10001</p>
                    </GlassCard>
                    <GlassCard className="p-4 bg-background/50 border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-slate-400" />
                        <h4 className="font-bold text-white">Work</h4>
                      </div>
                      <p className="text-sm text-slate-400">88 Tech Park, Building C<br/>Innovation Sector, NY 10002</p>
                    </GlassCard>
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                    <Button variant="ghost" size="sm" className="bg-white/5 border border-white/10">+ Add Card</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <GlassCard className="p-4 bg-white/5 border-aurora-purple/30 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-xs font-bold border border-white/10">VISA</div>
                        <div>
                          <p className="font-bold text-white">•••• •••• •••• 4242</p>
                          <p className="text-xs text-slate-400">Expires 12/28</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-aurora-purple bg-aurora-purple/20 px-2 py-1 rounded">DEFAULT</span>
                    </GlassCard>
                    <GlassCard className="p-4 bg-background/50 border-white/5 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-xs font-bold border border-white/10">MC</div>
                        <div>
                          <p className="font-bold text-white">•••• •••• •••• 5555</p>
                          <p className="text-xs text-slate-400">Expires 08/26</p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              )}

              {activeTab === 'rewards' && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Rewards & Offers</h2>
                    <Button variant="glass" size="sm" onClick={() => window.location.href='/rewards'}>Go to Hub</Button>
                  </div>
                  <GlassCard className="p-6 bg-gradient-to-br from-food-amber/20 to-food-orange/10 border-food-amber/30 text-center">
                    <Gift size={48} className="text-food-amber mx-auto mb-4" />
                    <h3 className="text-3xl font-extrabold text-white mb-2">2,450 <span className="text-xl font-medium text-food-amber">TasteCoins</span></h3>
                    <p className="text-slate-300 mb-6">You're 550 coins away from Elite status!</p>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-gradient-to-r from-food-amber to-food-orange w-[80%] rounded-full" />
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Notifications</h2>
                    <Button variant="ghost" size="sm">Mark all as read</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-aurora-cyan/30 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-aurora-cyan" />
                      <div className="w-10 h-10 rounded-full bg-aurora-cyan/20 flex items-center justify-center shrink-0">
                        <Package size={18} className="text-aurora-cyan" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Order Delivered!</h4>
                        <p className="text-sm text-slate-400 mb-2">Your order from Sushi Master has been delivered. Enjoy your meal!</p>
                        <span className="text-xs text-slate-500 font-medium">2 hours ago</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-white/5 opacity-80">
                      <div className="w-10 h-10 rounded-full bg-food-amber/10 flex items-center justify-center shrink-0">
                        <Gift size={18} className="text-food-amber" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">500 Bonus TasteCoins</h4>
                        <p className="text-sm text-slate-400 mb-2">You earned 500 bonus coins for ordering 3 times this week.</p>
                        <span className="text-xs text-slate-500 font-medium">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-xl"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">App Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white mb-4">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-slate-300 group-hover:text-white transition-colors">Order Updates</span>
                          <div className="w-10 h-6 bg-aurora-cyan rounded-full p-1 flex justify-end transition-colors">
                            <div className="w-4 h-4 bg-background rounded-full shadow-md" />
                          </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-slate-300 group-hover:text-white transition-colors">Promotions & Offers</span>
                          <div className="w-10 h-6 bg-white/20 rounded-full p-1 flex justify-start transition-colors">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="font-bold text-white mb-4">Security</h3>
                      <Button variant="ghost" className="w-full justify-start border border-white/10 text-slate-300">Change Password</Button>
                      <Button variant="ghost" className="w-full justify-start border border-status-error/30 text-status-error hover:bg-status-error/10 mt-3">Delete Account</Button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
