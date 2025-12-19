import { motion } from 'framer-motion';

interface ChapterDividerProps {
  title?: string;
  date?: string;
}

export function ChapterDivider({ title, date }: ChapterDividerProps) {
  return (
    <motion.div 
      className="chapter-divider py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative line */}
      <div className="relative flex items-center justify-center">
        <div 
          className="absolute w-48 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(35 25% 35%) 50%, transparent 100%)',
          }}
        />
        
        {/* Center ornament */}
        <div className="relative z-10 px-4 bg-library-parchment">
          <div 
            className="w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(38 50% 45%) 0%, hsl(35 40% 35%) 100%)',
            }}
          />
        </div>
      </div>
      
      {/* Chapter label */}
      <div className="text-center mt-4">
        {title ? (
          <p className="text-sm font-medium text-library-wood-light/80">
            {title}
          </p>
        ) : (
          <p className="text-xs text-library-wood/50">
            새 장 · {date || ''}
          </p>
        )}
      </div>
    </motion.div>
  );
}
