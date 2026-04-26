import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { soundService } from '../services/soundService';

export const LoadingIntro = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [phase, setPhase] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    const timers = [
      setTimeout(() => { setPhase(1); soundService.playGlitch(); }, 0),
      setTimeout(() => { setPhase(2); soundService.playGlitch(); }, 2200),
      setTimeout(() => { setPhase(3); soundService.playGlitch(); }, 4200),
      setTimeout(() => { setPhase(4); soundService.playGlitch(); }, 6500),
      setTimeout(() => { setPhase(5); soundService.playTargetLock(); }, 7500),
      setTimeout(() => { setPhase(6); soundService.playScanHum(2); }, 8500),
      setTimeout(() => { setPhase(7); soundService.playTargetLock(); }, 10500),
      setTimeout(() => { setPhase(8); soundService.playAccessGranted(); }, 11500),
      setTimeout(() => setPhase(9), 12500),
      setTimeout(() => onComplete(), 13500),
    ];

    return () => {
      clearTimeout(skipTimer);
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-mono text-white">
      <div className="noise opacity-[0.03] z-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute top-8 right-8 z-[200] text-[9px] uppercase tracking-[0.5em] text-white/20 hover:text-white/60 transition-colors font-bold border border-white/10 hover:border-white/30 px-4 py-2"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence>
          {phase >= 1 && phase < 4 && (
            <div className="absolute space-y-4 text-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-[10px] uppercase tracking-[0.8em] text-white/40">
                {`> Initializing system...`}
              </motion.div>
              {phase >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-[10px] uppercase tracking-[0.8em] text-white/40">
                  {`> Loading identity...`}
                </motion.div>
              )}
              {phase >= 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-[10px] uppercase tracking-[0.8em] text-white/40">
                  {`> Verifying core...`}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 4 && phase < 9 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }, duration: 1.5 }}
              className="relative z-20 text-center"
            >
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-[0.4em] text-[#ff0033]" style={{ textShadow: '0 0 30px rgba(255,0,51,0.5)' }}>
                OK EMPIRE
              </h2>
              <motion.div animate={{ opacity: [0, 0.1, 0, 0.05, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute inset-0 bg-[#ff0033] mix-blend-overlay pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>

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
                <motion.div animate={{ borderColor: phase === 7 ? "#ff0033" : "#00ff88", opacity: phase >= 8 ? 0.8 : 0.2 }} className="absolute inset-0 border rounded-full transition-colors duration-500" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-dashed border-[#00ff88]/10 rounded-full" />
                <motion.div animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }} className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-12 transition-colors duration-500" />
                <motion.div animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }} className="absolute bottom-0 left-1/2 -ml-[1px] w-[2px] h-12 transition-colors duration-500" />
                <motion.div animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }} className="absolute left-0 top-1/2 -mt-[1px] w-12 h-[2px] transition-colors duration-500" />
                <motion.div animate={{ backgroundColor: phase === 7 ? "#ff0033" : "#00ff88" }} className="absolute right-0 top-1/2 -mt-[1px] w-12 h-[2px] transition-colors duration-500" />
                <div className="absolute bottom-[-120px] text-center w-[400px]">
                  <AnimatePresence mode="wait">
                    {phase === 7 && <motion.span key="locked" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] uppercase tracking-[1em] text-[#ff0033] font-bold block" style={{ textShadow: '0 0 10px rgba(255,0,51,0.5)' }}>TARGET LOCKED</motion.span>}
                    {phase === 8 && <motion.span key="granted" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: [0.9, 1.1, 1] }} className="text-xs uppercase tracking-[1.2em] text-[#00ff88] font-black block" style={{ textShadow: '0 0 20px rgba(0,255,136,0.6)' }}>ACCESS GRANTED</motion.span>}
                    {phase < 7 && <motion.span key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-[9px] uppercase tracking-[0.8em] text-[#00ff88] block">Authenticating Protocol...</motion.span>}
                  </AnimatePresence>
                  {phase === 8 && <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-px bg-[#00ff88]/50 mt-4 shadow-[0_0_10px_#00ff88]" />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 8 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 4, opacity: [0, 0.4, 0] }} transition={{ duration: 1, ease: "easeOut" }} className="absolute inset-0 bg-white/5 rounded-full z-10 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full border border-white/20 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 9 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[110] bg-[#0a0a0a]" transition={{ duration: 1 }} />
        )}
      </AnimatePresence>
    </div>
  );
};
