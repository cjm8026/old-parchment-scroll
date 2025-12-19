import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BookshelfSilhouette } from './BookshelfSilhouette';
import { FloatingDust } from './FloatingDust';
import { LightRays } from './LightRays';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';

interface LibrarySpaceProps {
  children: ReactNode;
  showAmbientEffects?: boolean;
}

export function LibrarySpace({ children, showAmbientEffects = true }: LibrarySpaceProps) {
  const timeOfDay = useTimeOfDay();

  // Time-based lighting adjustments
  const lightingStyles = {
    day: {
      overlay: 'hsl(45 60% 75% / 0.05)',
      brightness: 1.05,
    },
    afternoon: {
      overlay: 'hsl(38 70% 55% / 0.08)',
      brightness: 1,
    },
    evening: {
      overlay: 'hsl(28 50% 35% / 0.12)',
      brightness: 0.92,
    },
  };

  const currentLighting = lightingStyles[timeOfDay];

  return (
    <motion.div 
      className="relative min-h-screen library-atmosphere overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: `brightness(${currentLighting.brightness})`,
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Background bookshelf silhouettes */}
      <BookshelfSilhouette />
      
      {/* Time-based color overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundColor: currentLighting.overlay,
        }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      />
      
      {/* Ambient effects - only when not actively writing */}
      {showAmbientEffects && (
        <>
          <LightRays />
          <FloatingDust />
        </>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
