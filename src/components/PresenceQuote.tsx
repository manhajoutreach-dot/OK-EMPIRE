import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export const PresenceQuote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      className="h-[60vh] flex items-center justify-center relative overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale, filter: blur, x }}
        className="max-w-4xl text-center px-6"
      >
        <span className="text-[10px] uppercase tracking-[0.6em] text-brand-cyan/40 mb-8 block font-mono">
          System Observation / 02
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tighter leading-[1.1] text-white/80">
          "Not everything is meant to be understood instantly."
        </h2>
        <div className="mt-12 flex justify-center items-center gap-4">
          <div className="h-[1px] w-12 bg-white/10" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Amon - 001</span>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
    </section>
  );
};
