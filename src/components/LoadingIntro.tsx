import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { soundService } from '../services/soundService';

export const LoadingIntro = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const targetText = "OK EMPIRE";
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    const runSequence = async () => {
      try {
        // Phase 1: Boot Text
        setPhase(1);
        await new Promise(r => setTimeout(r, 1200)); // Increased delay for readability
        setPhase(2);
        await new Promise(r => setTimeout(r, 1000));
        setPhase(3);
        await new Promise(r => setTimeout(r, 1200));

        // Phase 2: Terminal UI reveal
        setPhase(4);
        await new Promise(r => setTimeout(r, 1500));

        // Phase 3: Auto Typing
        setPhase(5);
        for (let i = 0; i <= targetText.length; i++) {
          setTypedText(targetText.slice(0, i));
          if (i > 0) {
            soundService.playKeyClick().catch(() => {}); // Prevent audio errors from breaking sequence
          }
          await new Promise(r => setTimeout(r, 180 + Math.random() * 120));
        }
        await new Promise(r => setTimeout(r, 800));

        // Phase 4: Enter Action
        setPhase(6);
        soundService.playEnterClick().catch(() => {});
        await new Promise(r => setTimeout(r, 1000));

        // Phase 5: Scanning
        setPhase(7);
        soundService.playScanHum(1.5).catch(() => {});
        await new Promise(r => setTimeout(r, 2500));

        // Phase 6: Access Granted
        setPhase(8);
        soundService.playAccessGranted().catch(() => {});
        await new Promise(r => setTimeout(r, 2000));

        // Phase 7: Split Transition
        setPhase(9);
        await new Promise(r => setTimeout(r, 1500));
        onComplete();
      } catch (err) {
        console.error("Intro sequence failed:", err);
        onComplete(); // Fallback to site
      }
    };

    runSequence();

    return () => clearTimeout(skipTimer);
  }, [onComplete]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const numbers = "0123456789".split("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-mono text-white bg-black">
      {/* Noise overlay - moved to very back */}
      <div className="absolute inset-0 noise opacity-[0.04] z-[102] pointer-events-none" />
      
      {/* Split Panels (Doors) */}
      <motion.div 
        animate={{ x: phase === 9 ? "-100%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#080808] z-[110] border-r border-white/5"
      />
      <motion.div 
        animate={{ x: phase === 9 ? "100%" : "0%" }}
        transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#080808] z-[110] border-l border-white/5"
      />

      <AnimatePresence>
        {showSkip && phase < 9 && (
          <motion.button
            key="skip-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            whileHover={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute top-10 right-10 z-[200] text-[10px] uppercase tracking-[0.5em] text-white transition-all font-black border border-white/10 px-6 py-3 hover:bg-white/5 bg-black/20 backdrop-blur-sm"
          >
            Skip Intro
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-[150] flex flex-col items-center justify-center w-full max-w-3xl px-8 h-full">
        
        {/* Phase 1-3: Boot Text Cluster */}
        <div className="h-24 flex items-center justify-center relative w-full mb-8">
          <AnimatePresence mode="wait">
            {phase >= 1 && phase <= 4 && (
              <motion.div 
                key="boot-text-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-5 text-center"
              >
                {[
                  { p: 1, text: "> Initializing system..." },
                  { p: 2, text: "> Loading identity..." },
                  { p: 3, text: "> Verifying core..." }
                ].map((item) => (
                  <div key={item.p} className="h-5 overflow-hidden">
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} 
                      animate={{ 
                        opacity: phase >= item.p ? 1 : 0, 
                        y: phase >= item.p ? 0 : 15 
                      }} 
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-[11px] md:text-xs uppercase tracking-[0.8em] text-white/80 font-medium"
                    >
                      {item.text}
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase 4-8: Terminal UI Core */}
        <div className="relative w-full flex flex-col items-center">
          <AnimatePresence>
            {phase >= 4 && phase < 9 && (
              <motion.div
                key="terminal-identity-ui"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(30px)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full space-y-16 flex flex-col items-center"
              >
                {/* Visual Background Element */}
                <div className="grid grid-cols-10 gap-x-12 gap-y-6 opacity-[0.06] select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.8]">
                  {[...alphabet, ...numbers].map((char, i) => (
                    <span key={i} className="text-4xl font-black">{char}</span>
                  ))}
                </div>

                {/* The Terminal Frame */}
                <div className="relative glass border border-white/10 p-12 md:p-16 w-full max-w-xl rounded-sm overflow-hidden bg-black/60 shadow-2xl backdrop-blur-xl">
                  {/* Top Scanning Line Effect */}
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent z-20" 
                  />
                  
                  <div className="space-y-12 text-center relative z-10">
                    <div className="space-y-6">
                      <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black block">System Access Identity</span>
                      <div className="h-16 flex items-center justify-center">
                        <div className="text-3xl md:text-5xl font-display font-black tracking-[0.4em] text-white uppercase relative">
                          {typedText}
                          <motion.span 
                            animate={{ opacity: [1, 0, 1] }} 
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-[4px] h-10 md:h-12 bg-brand-cyan ml-4 align-middle shadow-[0_0_15px_#00f0ff]"
                          />
                          {phase === 6 && (
                            <motion.div 
                              initial={{ scale: 0.9, opacity: 1 }}
                              animate={{ scale: 1.8, opacity: 0 }}
                              className="absolute inset-x-[-40px] inset-y-[-20px] border-2 border-brand-cyan rounded-md"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="h-32">
                      {phase >= 7 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          <div className="flex flex-col items-center gap-6">
                            <span className="text-[10px] uppercase tracking-[0.8em] text-white/50 font-black animate-pulse">
                              {phase === 8 ? "AUTHENTICATION COMPLETE" : "SCANNING SYSTEM CORE..."}
                            </span>
                            
                            <div className="w-64 h-[1px] bg-white/20 relative overflow-hidden">
                              {phase === 7 && (
                                <motion.div 
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-y-0 w-1/3 bg-brand-cyan shadow-[0_0_15px_#00f0ff]"
                                />
                              )}
                              {phase === 8 && (
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  className="absolute inset-y-0 bg-[#00ff88] shadow-[0_0_20px_#00ff88]"
                                />
                              )}
                            </div>
                          </div>

                          {phase === 8 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1.1 }}
                              className="text-[#00ff88] text-lg md:text-xl font-black tracking-[1.5em] uppercase pt-4"
                              style={{ textShadow: '0 0 30px rgba(0,255,136,0.7)' }}
                            >
                              ACCESS GRANTED
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* High-fidelity Corner Detailing */}
                  <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-white/40" />
                  <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/40" />
                  <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-white/40" />
                  <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-white/40" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
