import { motion } from 'framer-motion';

interface MemoryEntryProps {
  content: string;
  timestamp: string;
  isFirst?: boolean;
}

export function MemoryEntry({ content, timestamp, isFirst = false }: MemoryEntryProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Timestamp - very subtle */}
      {isFirst && (
        <p className="text-[10px] text-library-wood/40 mb-2 tracking-wide">
          {timestamp}
        </p>
      )}
      
      {/* Memory content */}
      <p className="text-base leading-relaxed text-library-deep/90 font-serif">
        {content}
      </p>
    </motion.div>
  );
}
