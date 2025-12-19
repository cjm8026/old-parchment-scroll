import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WritingDeskProps {
  children: ReactNode;
  isActive?: boolean;
}

export function WritingDesk({ children, isActive = false }: WritingDeskProps) {
  return (
    <motion.div 
      className="relative"
      animate={{
        y: isActive ? -10 : 0,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Desk surface */}
      <div className="desk-surface rounded-t-lg px-6 py-4 md:px-10 md:py-6">
        {/* Wood grain texture suggestion */}
        <div 
          className="absolute inset-0 rounded-t-lg opacity-20 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 40px,
                hsl(35 30% 25% / 0.3) 40px,
                hsl(35 30% 25% / 0.3) 41px
              )
            `,
          }}
        />
        
        {/* Desk edge highlight */}
        <div 
          className="absolute top-0 left-4 right-4 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(40 35% 50% / 0.3) 50%, transparent 100%)',
          }}
        />
        
        {/* Content area */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
      
      {/* Desk bottom edge */}
      <div 
        className="h-4 rounded-b-lg"
        style={{
          background: 'linear-gradient(180deg, hsl(28 35% 18%) 0%, hsl(25 30% 12%) 100%)',
          boxShadow: '0 4px 16px hsl(25 40% 5% / 0.5)',
        }}
      />
    </motion.div>
  );
}
