import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X, Search, Check, Building2 } from 'lucide-react';
import { useLocationContext, POPULAR_CITIES } from '../context/LocationContext';

export default function LocationModal() {
  const { city, area, isModalOpen, setIsModalOpen, setCityAndArea, detectGPSLocation, isDetecting } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityTab, setSelectedCityTab] = useState(city);

  if (!isModalOpen) return null;

  const currentHub = POPULAR_CITIES.find(h => h.city.toLowerCase() === selectedCityTab.toLowerCase()) || POPULAR_CITIES[0];

  const filteredCities = POPULAR_CITIES.filter(c => 
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.areas.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleUseCurrentLocation = async () => {
    await detectGPSLocation();
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">Select Your Location</h3>
                <p className="text-xs text-slate-400">Discover restaurants delivering to your doorstep</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Auto Detect Button */}
            <button
              onClick={handleUseCurrentLocation}
              disabled={isDetecting}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-aurora-cyan/10 border border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan hover:text-[#111111] transition-all font-bold group"
            >
              <div className="flex items-center gap-3">
                <Navigation size={20} className={isDetecting ? 'animate-spin' : 'group-hover:scale-110 transition-transform'} />
                <div className="text-left">
                  <div className="text-sm font-extrabold">Use Current Location (GPS)</div>
                  <div className="text-xs opacity-80 font-normal">Auto-detect via GPS or Network</div>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                {isDetecting ? 'Detecting...' : 'Detect'}
              </span>
            </button>

            {/* Search Input */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search city, area, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aurora-cyan transition-all"
              />
            </div>

            {/* Popular Cities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 size={14} /> Popular Cities
                </span>
                <span className="text-xs text-aurora-cyan font-medium">Selected: {city}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredCities.map((c) => {
                  const isCurrent = city.toLowerCase() === c.city.toLowerCase();
                  const isTabActive = selectedCityTab.toLowerCase() === c.city.toLowerCase();
                  return (
                    <button
                      key={c.city}
                      onClick={() => {
                        setSelectedCityTab(c.city);
                        setCityAndArea(c.city, c.areas[0]);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-aurora-cyan text-[#111111] shadow-[0_0_12px_rgba(255,184,0,0.4)]'
                          : isTabActive
                          ? 'bg-white/15 text-white border border-white/20'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {isCurrent && <Check size={12} />}
                      {c.city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Areas in Selected City */}
            {currentHub && (
              <div className="pt-2 border-t border-white/8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Select Locality in {selectedCityTab}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {currentHub.areas.map((loc) => {
                    const isSelected = city.toLowerCase() === selectedCityTab.toLowerCase() && area.toLowerCase() === loc.toLowerCase();
                    return (
                      <button
                        key={loc}
                        onClick={() => setCityAndArea(selectedCityTab, loc)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-aurora-cyan/15 text-aurora-cyan border border-aurora-cyan/30'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        <span className="truncate">{loc}</span>
                        {isSelected && <Check size={14} className="shrink-0 ml-1 text-aurora-cyan" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
