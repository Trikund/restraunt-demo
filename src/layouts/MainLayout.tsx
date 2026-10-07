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
      
      {/* Global ambient aurora glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
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
