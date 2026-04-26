import { motion, AnimatePresence, useInView } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { soundService } from '../services/soundService';

export const HUDProfile = () => {
  const [phase, setPhase] = useState(0); // 0: Scanning, 1: Analyzing, 2: Reveal
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    // Phase 0 Sound
    soundService.playScanHum(1.5);

    const timers = [
      setTimeout(() => {
        setPhase(1);
        soundService.playTargetLock();
      }, 1500),
      setTimeout(() => {
        setPhase(2);
        soundService.playAccessGranted();
      }, 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-48 h-48 md:w-64 md:h-64 mx-auto lg:mx-0">
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 rounded-full bg-deep-black border border-white/5 shadow-2xl" />

      {/* 2. IMAGE LAYER */}
      <div className="absolute inset-0 overflow-hidden rounded-full border border-white/10 glass z-10">
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05, filter: 'grayscale(100%) contrast(130%) brightness(0.9) blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'grayscale(100%) contrast(130%) brightness(0.9) blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative"
            >
              <img 
                src="/profile_identity.png" 
                alt="Identity"
                className="w-full h-full object-cover scale-110"
              />
              {/* Cinematic Texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
              <div className="absolute inset-0 bg-brand-cyan/5 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan/Analyzing Text Overlay */}
        <AnimatePresence>
          {phase < 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20"
            >
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] text-brand-cyan font-mono flex flex-col items-center gap-3"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-brand-cyan/20 border-t-brand-cyan rounded-full animate-spin" />
                <span>{phase === 0 ? "Scanning Identity..." : "Analyzing Node..."}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. SCAN LAYER (HUD) */}
      <motion.div 
        animate={{ opacity: phase === 2 ? 0.3 : 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-30 pointer-events-none"
      >
        {/* Main Circular HUD */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-brand-cyan/20 rounded-full border-dashed"
        />
        
        {/* Scanning Rings */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-t-2 border-l-2 border-brand-cyan/40 rounded-full"
        />

        {/* Pulse Ring */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-8px] border border-brand-cyan/10 rounded-full"
        />

        {/* Vertical Moving Scan Line */}
        <AnimatePresence>
          {phase < 2 && (
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: ["0%", "100%", "0%"] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[2px] bg-brand-cyan/50 shadow-[0_0_15px_#00f0ff] z-40"
            />
          )}
        </AnimatePresence>

        {/* Corner Brackets (HUD) */}
        <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-brand-cyan/40" />
        <div className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-brand-cyan/40" />
        <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-brand-cyan/40" />
        <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-brand-cyan/40" />

        {/* Side HUD Telemetry */}
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-30">
          <div className="flex flex-col gap-1">
            <span className="text-[5px] font-mono tracking-widest text-brand-cyan uppercase">Identity.ID</span>
            <div className="h-px w-8 bg-brand-cyan/30" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[5px] font-mono tracking-widest text-brand-cyan uppercase">Status.OK</span>
            <div className="h-px w-10 bg-brand-cyan/30" />
          </div>
        </div>
      </motion.div>

      {/* Confirmation Text */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 left-0 right-0 text-center"
          >
            <span className="text-[8px] uppercase tracking-[0.4em] text-brand-cyan font-bold block blur-[0.3px]">
              Identity Confirmed
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
