import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Copy, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const mockOffers = [
  {
    id: 1,
    type: 'coupon',
    title: '50% OFF',
    subtitle: 'On your first order up to ₹15',
    code: 'AURORA50',
    expires: 'Expires in 2 days',
    color: 'from-aurora-cyan to-aurora-blue'
  },
  {
    id: 2,
    type: 'restaurant',
    title: 'Free Delivery',
    subtitle: 'On orders above ₹30 at Gourmet Kitchen',
    code: 'FREEDEL',
    expires: 'Expires in 5 hrs',
    color: 'from-aurora-purple to-pink-500'
  },
  {
    id: 3,
    type: 'food',
    title: 'Buy 1 Get 1',
    subtitle: 'On all specialty pizzas this weekend',
    code: 'PIZZABOGO',
    expires: 'Expires Sunday',
    color: 'from-amber-400 to-orange-500'
  }
];

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filters = [
    { id: 'all', label: 'All Offers' },
    { id: 'coupon', label: 'Coupons' },
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'food', label: 'Food Discounts' }
  ];

  const filteredOffers = activeFilter === 'all' 
    ? mockOffers 
    : mockOffers.filter(o => o.type === activeFilter);

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-20 right-10 w-[500px] h-[500px] bg-aurora-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading 
        title={<span className="flex items-center gap-3"><Tag className="text-aurora-cyan" /> Latest Offers</span>} 
        subtitle="Exclusive deals and discounts just for you." 
      />

      <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
              activeFilter === filter.id 
                ? 'bg-aurora-cyan text-background' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer, idx) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="relative overflow-hidden group h-full flex flex-col p-0 bg-background/40">
              {/* Colored Header */}
              <div className={`p-6 bg-gradient-to-br ${offer.color} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
                <h3 className="text-3xl font-extrabold text-white mb-1 relative z-10 drop-shadow-md">{offer.title}</h3>
                <p className="text-white/90 font-medium relative z-10">{offer.subtitle}</p>
                
                {/* Sawtooth edge divider */}
                <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
                  <svg className="relative block w-[calc(100%+1.3px)] h-[12px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#0F172A" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#0F172A" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#0F172A"></path>
                  </svg>
                </div>
              </div>

              <div className="p-6 pt-8 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6 font-medium">
                  <Clock size={16} /> {offer.expires}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Tag size={16} />
                    </div>
                    <input 
                      type="text" 
                      readOnly 
                      value={offer.code}
                      className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-10 pr-4 text-center font-mono font-bold text-white tracking-widest focus:outline-none focus:border-aurora-cyan/50"
                    />
                  </div>
                  <Button 
                    variant="glass" 
                    className="w-12 h-12 !p-0 flex items-center justify-center shrink-0 border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan/10"
                    onClick={() => copyToClipboard(offer.code)}
                  >
                    {copiedCode === offer.code ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
