import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CrystalGuide } from './CrystalGuide';

interface ParchmentProps {
  children: ReactNode;
  showCrystal?: boolean;
}

export function Parchment({ children, showCrystal = false }: ParchmentProps) {
  return (
    <motion.div 
      className="parchment relative rounded-sm p-6 md:p-10 min-h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Subtle paper texture */}
      <div 
        className="absolute inset-0 rounded-sm opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Left edge shadow for depth */}
      <div 
        className="absolute left-0 top-2 bottom-2 w-2"
        style={{
          background: 'linear-gradient(90deg, hsl(35 25% 75% / 0.4) 0%, transparent 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-library-deep font-serif">
        {children}
      </div>
      
      {/* Crystal guide for save confirmation */}
      <CrystalGuide isVisible={showCrystal} />
    </motion.div>
  );
}
