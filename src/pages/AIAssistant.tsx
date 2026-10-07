import { useEffect } from 'react';
import AIChatUI from '../components/AIChatUI';

export default function AIAssistant() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col pt-20">
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <AIChatUI isFullScreen={true} />
    </div>
  );
}
