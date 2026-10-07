import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

export default function MainLayout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden selection:bg-aurora-cyan/30 pb-20 md:pb-0">
      <Navbar />
      
      {/* Optimized ambient glows (Removed excessive blur CSS to fix extreme lagging) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-aurora-cyan/10 to-transparent rounded-full -z-10 pointer-events-none opacity-50 mix-blend-screen" style={{ transform: 'translate3d(0,0,0)' }}></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-aurora-purple/10 to-transparent rounded-full -z-10 pointer-events-none opacity-50 mix-blend-screen" style={{ transform: 'translate3d(0,0,0)' }}></div>
      
      <main className="flex-1 relative z-0">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            {currentOutlet}
          </PageTransition>
        </AnimatePresence>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
}
