import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingState({ message = 'Loading...', fullScreen = false }: LoadingStateProps) {
  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-12 w-full';

  return (
    <div className={containerClass}>
      <div className="relative w-16 h-16 mb-4">
        {/* Outer glowing ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-aurora-cyan/20 border-t-aurora-cyan"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulsing ring */}
        <motion.div 
          className="absolute inset-2 rounded-full border-4 border-aurora-purple/20 border-b-aurora-purple"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Center dot */}
        <motion.div 
          className="absolute inset-6 rounded-full bg-aurora-blue shadow-[0_0_15px_rgba(59,130,246,0.6)]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {message && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted font-medium tracking-wide animate-pulse"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
