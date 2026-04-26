import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { soundService } from '../services/soundService';

export const LoadingIntro = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase(1);
        soundService.playGlitch();
      }, 0),      // Line 1
      setTimeout(() => {
        setPhase(2);
        soundService.playGlitch();
      }, 2200),   // Line 2
      setTimeout(() => {
        setPhase(3);
        soundService.playGlitch();
      }, 4200),   // Line 3
      setTimeout(() => {
        setPhase(4);
        soundService.playGlitch();
      }, 6500),   // OK EMPIRE (Warning Red)
      setTimeout(() => {
        setPhase(5);
        soundService.playTargetLock();
      }, 7500),   // Target Entry
      setTimeout(() => {
        setPhase(6);
        soundService.playScanHum(2);
      }, 8500),   // Scanning
      setTimeout(() => {
        setPhase(7);
        soundService.playTargetLock();
      }, 10500),  // Lock to Center (Red)
      setTimeout(() => {
        setPhase(8);
        soundService.playAccessGranted();
      }, 11500),  // Access Granted (Green)
      setTimeout(() => onComplete(), 13500)  // Transition
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-mono text-white">
      <div className="noise opacity-[0.03] z-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        
        {/* PHASE 1-3: Boot Sequence */}
        <AnimatePresence>
          {phase >= 1 && phase < 4 && (
            <div className="absolute space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-[10px] uppercase tracking-[0.8em] text-white/40"
              >
                {`> Initializing system...`}
              </motion.div>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="text-[10px] uppercase tracking-[0.8em] text-white/40"
                >
                  {`> Loading identity...`}
                </motion.div>
              )}
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="text-[10px] uppercase tracking-[0.8em] text-white/40"
                >
                  {`> Verifying core...`}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* PHASE 4+: OK EMPIRE Header */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: phase >= 9 ? 0 : [0.6, 1, 0.6],
                scale: 1,
              }}
              transition={{ 
                opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                duration: 1.5
              }}
              className="relative z-20 text-center"
            >
              <h2 
                className="text-4xl md:text-6xl font-display font-black tracking-[0.4em] text-[#ff0033]"
                style={{ textShadow: '0 0 30px rgba(255,0,51,0.5)' }}
              >
                OK EMPIRE
              </h2>
              {/* Subtle flicker overlay */}
              <motion.div 
                animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute inset-0 bg-[#ff0033] mix-blend-overlay pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Targeting System Overlay (Phases 5-8) */}
        <AnimatePresence>
          {phase >= 5 && phase < 9 && (
            <motion.div
              initial={{ x: 400, y: -200, opacity: 0, scale: 1.5 }}
              animate={{ 
                opacity: 1,
                scale: phase === 7 ? 0.9 : 1,
                x: phase >= 7 ? 0 : (phase === 6 ? [0, 50, -50, 0] : 100),
                y: phase >= 7 ? 0 : (phase === 6 ? [0, -30, 30, 0] : -50),
              }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ 
                x: phase === 6 ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 1.2, ease: "easeInOut" },
                y: phase === 6 ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 0.6 },
                opacity: { duration: 1 }
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Target Rings */}
                <motion.div 
                  animate={{ 
                    borderColor: phase === 7 ? "#ff0033" : "#00ff88",
                    opacity: phase >= 8 ? 0.8 : 0.2
                  }}
                  className="absolute inset-0 border rounded-full transition-colors duration-500" 
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-dashed border-[#00ff88]/10 rounded-full" 
                />
                
                {/* Crosshair Elements */}
                <motion.div 
                  animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }}
                  className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-12 transition-colors duration-500" 
                />
                <motion.div 
                  animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }}
                  className="absolute bottom-0 left-1/2 -ml-[1px] w-[2px] h-12 transition-colors duration-500" 
                />
                <motion.div 
                  animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }}
                  className="absolute left-0 top-1/2 -mt-[1px] w-12 h-[2px] transition-colors duration-500" 
                />
                <motion.div 
                  animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }}
                  className="absolute right-0 top-1/2 -mt-[1px] w-12 h-[2px] transition-colors duration-500" 
                />

                {/* Status Text Label */}
                <div className="absolute bottom-[-120px] text-center w-[400px]">
                  <AnimatePresence mode="wait">
                    {phase === 7 && (
                      <motion.span 
                        key="locked"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-[1em] text-[#ff0033] font-bold block"
                        style={{ textShadow: '0 0 10px rgba(255,0,51,0.5)' }}
                      >
                        TARGET LOCKED
                      </motion.span>
                    )}
                    {phase === 8 && (
                      <motion.span 
                        key="granted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: [0.9, 1.1, 1],
                        }}
                        className="text-xs uppercase tracking-[1.2em] text-[#00ff88] font-black block"
                        style={{ textShadow: '0 0 20px rgba(0,255,136,0.6)' }}
                      >
                        ACCESS GRANTED
                      </motion.span>
                    )}
                    {phase < 7 && (
                      <motion.span 
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        className="text-[9px] uppercase tracking-[0.8em] text-[#00ff88] block"
                      >
                        Authenticating Protocol...
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {phase === 8 && (
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "100%" }}
                       className="h-px bg-[#00ff88]/50 mt-4 shadow-[0_0_10px_#00ff88]"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Light Burst Pulse */}
      <AnimatePresence>
        {phase === 8 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 0.4, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-white/5 rounded-full z-10 flex items-center justify-center pointer-events-none"
          >
             <div className="w-full h-full border border-white/20 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Transition Flash */}
      <AnimatePresence>
        {phase === 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[110] bg-[#0a0a0a]"
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
