import React from 'react';
import { motion } from 'motion/react';

export const FinalTransmission = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-deep-black">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.8em] text-brand-cyan/40 font-bold block">
              End of Line
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-white shadow-brand-cyan/20 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              Final Transmission
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-light text-white/60 tracking-wide">
              This is not the end.
            </p>
            <p className="text-2xl md:text-3xl font-light text-white/40 tracking-wide italic">
              Just the beginning.
            </p>
          </div>

          <div className="pt-12 flex flex-col items-center gap-4 text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
              <span>Signal active</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-40 h-[1px] bg-white/5" />
              <span>Connection open</span>
              <div className="w-40 h-[1px] bg-white/5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.05, 0.02]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border border-brand-cyan/20 blur-sm"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.01, 0.03, 0.01]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border border-brand-cyan/10 blur-md"
        />
      </div>
    </section>
  );
};
