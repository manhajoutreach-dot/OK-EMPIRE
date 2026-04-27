import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import React, { useRef } from 'react';

export const Hero = () => {
  const words = "I CREATE EXPERIENCES.".split(" ");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div 
        style={{ y: y2, scale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" 
      />

      <motion.div
        style={{ y: y1, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1000px] z-10 space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-brand-cyan font-bold block mb-6">
            Personal Dossier
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-display font-black tracking-tighter leading-[1] uppercase text-white">
            I don't just build.
          </h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.8 + (i * 0.15), 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="text-4xl md:text-5xl lg:text-[60px] font-display font-bold text-stroke text-transparent leading-[1] uppercase"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="max-w-md mx-auto text-sm leading-relaxed italic font-light"
        >
          "Not everything needs to be shown to be understood."
          <span className="block mt-2 font-sans not-italic text-white/70">Aspiring developer and visionary crafting digital artifacts from the future.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(0,240,255,0.4)",
              backgroundColor: "var(--brand-cyan)",
              color: "white"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ease-out cursor-pointer"
          >
            Enter My World
          </motion.button>
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 hidden sm:block">Sequence: 001-A</div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 opacity-20">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

