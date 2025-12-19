import { motion, AnimatePresence } from 'framer-motion';

interface CrystalGuideProps {
  isVisible: boolean;
}

export function CrystalGuide({ isVisible }: CrystalGuideProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Crystal core */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, hsl(48 85% 85%) 0%, hsl(45 90% 70%) 40%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />
          
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-4"
            style={{
              background: 'radial-gradient(circle, hsl(45 90% 70% / 0.4) 0%, transparent 60%)',
            }}
            animate={{
              scale: [1, 1.5, 1.2],
              opacity: [0.4, 0.7, 0],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          />
          
          {/* Sparkle particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-crystal-core rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, (i - 1) * 20],
                y: [0, -15 - i * 5],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.15,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
