import { motion } from 'framer-motion';

interface BookSpineProps {
  title: string;
  pageCount: number;
  date: string;
  isActive?: boolean;
  onClick: () => void;
}

export function BookSpine({ title, pageCount, date, isActive = false, onClick }: BookSpineProps) {
  // Calculate thickness based on page count (min 4px, max 24px)
  const thickness = Math.min(Math.max(pageCount * 2, 4), 24);
  
  // Generate a warm color variation for each book
  const hueVariation = (title.charCodeAt(0) % 20) - 10;
  const lightnessVariation = (title.charCodeAt(1) % 10) - 5;
  
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left group"
      whileHover="hover"
      animate={isActive ? 'active' : 'idle'}
    >
      <motion.div
        className="relative flex items-center gap-3"
        variants={{
          idle: { x: 0 },
          hover: { x: 12 },
          active: { x: 16 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Book spine visual */}
        <motion.div
          className="rounded-sm flex-shrink-0"
          style={{
            width: thickness,
            height: 80,
            background: `linear-gradient(
              90deg,
              hsl(${30 + hueVariation} 35% ${18 + lightnessVariation}%) 0%,
              hsl(${32 + hueVariation} 30% ${25 + lightnessVariation}%) 50%,
              hsl(${28 + hueVariation} 35% ${15 + lightnessVariation}%) 100%
            )`,
            boxShadow: isActive 
              ? '0 0 20px hsl(38 70% 45% / 0.4)' 
              : '2px 0 8px hsl(25 40% 5% / 0.3)',
          }}
          variants={{
            idle: { boxShadow: '2px 0 8px hsl(25 40% 5% / 0.3)' },
            hover: { boxShadow: '4px 0 16px hsl(25 40% 5% / 0.4), 0 0 20px hsl(38 70% 45% / 0.3)' },
            active: { boxShadow: '0 0 24px hsl(38 70% 45% / 0.5)' },
          }}
        >
          {/* Spine decoration lines */}
          <div className="absolute top-2 left-0 right-0 h-px bg-library-dust/20" />
          <div className="absolute bottom-2 left-0 right-0 h-px bg-library-dust/20" />
        </motion.div>
        
        {/* Book info - visible on hover */}
        <motion.div
          className="overflow-hidden"
          variants={{
            idle: { opacity: 0.5, width: 0 },
            hover: { opacity: 1, width: 'auto' },
            active: { opacity: 1, width: 'auto' },
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="whitespace-nowrap pr-4">
            <p className="text-sm font-medium text-library-cream truncate max-w-[150px]">
              {title || date}
            </p>
            <p className="text-xs text-library-dust/70">
              {pageCount}장
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
