import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import React from 'react';

export const Hero = () => {
  const words = "I CREATE EXPERIENCES.".split(" ");

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Soft background glow for text focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-[1000px] z-10 space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-brand-cyan font-bold block mb-4">
            Personal Dossier
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-display font-black tracking-tighter leading-[1] uppercase text-white">
            I don't just build.
          </h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1 + (i * 0.1),
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="max-w-md mx-auto text-sm leading-relaxed italic font-light"
        >
          "Not everything needs to be shown to be understood."
          <span className="block mt-2 font-sans not-italic text-white/70">Aspiring developer and visionary crafting digital artifacts from the future.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,240,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-cyan transition-all duration-500 ease-out"
          >
            Enter My World
          </motion.button>
          
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 hidden sm:block">Sequence: 001-A</div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 opacity-20">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
