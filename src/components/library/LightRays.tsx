import { motion } from 'framer-motion';

export function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main light ray from top right */}
      <motion.div
        className="absolute -top-20 right-1/4 w-64 h-[120%] origin-top"
        style={{
          background: 'linear-gradient(180deg, hsl(40 80% 60% / 0.12) 0%, hsl(38 70% 50% / 0.04) 50%, transparent 80%)',
          transform: 'rotate(-15deg)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.6, 0.9, 0.5],
          skewX: [-2, 2, -1, 3, -2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary softer ray */}
      <motion.div
        className="absolute -top-10 right-1/3 w-40 h-[100%] origin-top"
        style={{
          background: 'linear-gradient(180deg, hsl(42 75% 55% / 0.08) 0%, transparent 60%)',
          transform: 'rotate(-8deg)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Ambient glow at top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(38 70% 50% / 0.15) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
