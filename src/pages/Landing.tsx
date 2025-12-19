import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LibrarySpace } from '@/components/library/LibrarySpace';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <LibrarySpace showAmbientEffects={true}>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        {/* Main content area */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        >
          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-wide mb-6"
            style={{
              color: 'hsl(40 30% 88%)',
              textShadow: '0 2px 20px hsl(38 70% 45% / 0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          >
            내 기억의 도서관
          </motion.h1>

          {/* Subtle decorative line */}
          <motion.div
            className="mx-auto w-24 h-px mb-10"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(38 60% 55% / 0.5) 50%, transparent 100%)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          />

          {/* Enter button */}
          <motion.button
            onClick={() => navigate('/library')}
            className="relative px-10 py-4 font-serif text-lg tracking-wider transition-all duration-500"
            style={{
              color: 'hsl(40 35% 85%)',
              background: 'linear-gradient(180deg, hsl(30 30% 20% / 0.6) 0%, hsl(28 35% 15% / 0.8) 100%)',
              border: '1px solid hsl(38 40% 35% / 0.4)',
              borderRadius: '2px',
              boxShadow: '0 4px 20px hsl(25 40% 8% / 0.5), inset 0 1px 0 hsl(40 30% 40% / 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
            whileHover={{
              boxShadow: '0 6px 30px hsl(38 70% 45% / 0.3), inset 0 1px 0 hsl(40 30% 50% / 0.3)',
              borderColor: 'hsl(38 50% 45% / 0.6)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            기록 시작
          </motion.button>
        </motion.div>

        {/* Bottom ambient glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(30 35% 18% / 0.6) 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>
    </LibrarySpace>
  );
};

export default Landing;
