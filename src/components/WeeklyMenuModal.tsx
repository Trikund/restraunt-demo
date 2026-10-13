import { X, Calendar, Utensils, Moon, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import Button from './Button';

export interface DaySchedule {
  lunch: string;
  dinner: string;
}

export type WeeklySchedule = Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday', DaySchedule>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  vendorType?: string;
  weeklySchedule?: WeeklySchedule;
}

const DEFAULT_SCHEDULE: WeeklySchedule = {
  Monday: {
    lunch: '4 Butter Phulka, Punjabi Rajma Masala, Steamed Basmati Rice, Onion Salad',
    dinner: '4 Tawa Phulka, Mix Veg Sabzi, Yellow Moong Dal Tadka, Pickle'
  },
  Tuesday: {
    lunch: '4 Phulka, Aloo Gobi Matar, Chana Dal Fry, Jeera Rice, Mint Chutney',
    dinner: '4 Phulka, Palak Paneer, Masoor Dal, Fresh Kachumber'
  },
  Wednesday: {
    lunch: '4 Phulka, Kadhi Pakora with Methi, Steamed Rice, Boondi Raita',
    dinner: '4 Phulka, Bhindi Do Pyaza, Arhar Dal Tadka, Papad'
  },
  Thursday: {
    lunch: '4 Phulka, Shahi Paneer, Pindi Chole, Steamed Rice, Sirka Onion',
    dinner: '4 Phulka, Baingan Bharta, Panchmel Dal, Green Salad'
  },
  Friday: {
    lunch: '4 Phulka, Black Chana Curry, Jeera Aloo, Steamed Rice, Curd',
    dinner: '4 Phulka, Soya Chaap Gravy, Dal Makhani, Mixed Salad'
  },
  Saturday: {
    lunch: '4 Butter Phulka, Paneer Bhurji, Dal Tadka, Peas Pulao, Sweet Lassi',
    dinner: '4 Phulka, Aloo Shimla Mirch, Yellow Dal, Papad'
  },
  Sunday: {
    lunch: '4 Ghee Phulka, Special Dal Makhani, Matar Paneer, Dum Biryani Rice, Gulab Jamun',
    dinner: '4 Phulka, Khichdi with Desi Ghee OR Seasonal Sabzi + Dal, Roasted Papad'
  }
};

export default function WeeklyMenuModal({ 
  isOpen, 
  onClose, 
  vendorName, 
  vendorType = 'Tiffin Service',
  weeklySchedule = DEFAULT_SCHEDULE 
}: Props) {
  if (!isOpen) return null;

  const daysList: Array<keyof WeeklySchedule> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday
  const dayNameMapping: Record<number, keyof WeeklySchedule> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  const todayName = dayNameMapping[currentDayIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <GlassCard className="max-w-2xl w-full p-6 md:p-8 border-aurora-cyan/40 bg-background/95 shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider px-2.5 py-0.5 rounded bg-aurora-cyan/10 border border-aurora-cyan/20 flex items-center gap-1">
              <Calendar size={12} /> 7-Day Rotating Timetable
            </span>
            <span className="text-xs text-slate-400">
              {vendorType}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {vendorName} — <span className="text-aurora-cyan">Weekly Thali Schedule</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Menu changes daily with fresh seasonal ingredients. Today's active menu is highlighted below.
          </p>
        </div>

        {/* Schedule List (Scrollable) */}
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 hide-scrollbar">
          {daysList.map((day) => {
            const isToday = day === todayName;
            const item = weeklySchedule[day] || DEFAULT_SCHEDULE[day];

            return (
              <div 
                key={day}
                className={`p-4 rounded-2xl border transition-all ${
                  isToday 
                    ? 'bg-aurora-cyan/10 border-aurora-cyan shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-aurora-cyan/50' 
                    : 'bg-white/5 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isToday ? 'text-aurora-cyan' : 'text-white'}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-aurora-cyan text-[#111111] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Sparkles size={10} /> Today's Menu
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Check size={12} className="text-emerald-400" /> Hot Fresh Delivery
                  </span>
                </div>

                {/* Lunch & Dinner items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Lunch */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Utensils size={13} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lunch (12:30 PM)</span>
                      <p className="text-slate-200 font-medium leading-relaxed mt-0.5">{item.lunch}</p>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Moon size={13} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dinner (8:00 PM)</span>
                      <p className="text-slate-200 font-medium leading-relaxed mt-0.5">{item.dinner}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer / CTAs */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            Want daily deliveries? Subscriptions start at <span className="text-white font-bold">₹549/week</span>.
          </p>

          <div className="flex gap-2 w-full sm:w-auto">
            <Link to="/subscriptions" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="sm" 
                rightIcon={<ArrowRight size={14} />}
                className="w-full sm:w-auto font-bold"
              >
                View Subscription Plans
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
