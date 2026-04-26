import React, { useState } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Hero } from './components/Hero';
import { PresenceQuote } from './components/PresenceQuote';
import { AboutAndVision } from './components/AboutAndVision';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { LoadingIntro } from './components/LoadingIntro';
import { FinalTransmission } from './components/FinalTransmission';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingIntro key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.main 
          key="main"
          initial={{ opacity: 0, filter: 'brightness(1.5) blur(10px)' }}
          animate={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative selection:bg-brand-cyan/30 bg-deep-black min-h-screen"
        >
          {/* Noise Overlay is handled in index.css but added here if needed to be explicit */}
          <div className="noise" />

          {/* Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-[2px] bg-brand-cyan z-[70] origin-left shadow-[0_0_10px_#00f0ff]"
            style={{ scaleX }}
          />

          {/* Nav */}
          <nav className="fixed top-0 left-0 w-full z-[80] p-8 md:p-12 flex justify-between items-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs tracking-[0.5em] font-black uppercase border-l border-brand-cyan pl-4 pointer-events-auto cursor-pointer text-white"
            >
              OK EMPIRE
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-8 items-center pointer-events-auto"
            >
              {[
                { label: 'WORK', id: 'projects' },
                { label: 'VISION', id: 'vision' },
                { label: 'CONTACT', id: 'contact' }
              ].map(item => (
                <button 
                  key={item.label} 
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[10px] uppercase tracking-widest text-white/50 hover:text-brand-cyan transition-all font-bold"
                >
                  {item.label}
                </button>
              ))}
              <div className="w-8 h-[1px] bg-white/20 hidden md:block"></div>
            </motion.div>
          </nav>

          <BackgroundEffects />
          
          <div className="relative z-10 space-y-32 md:space-y-64">
            <Hero />
            
            <PresenceQuote />

            <div id="vision">
              <AboutAndVision />
            </div>
            
            <div id="skills">
              <Skills />
            </div>

            <div id="projects">
              <Projects />
            </div>

            <div id="contact">
              <Contact />
            </div>

            <FinalTransmission />
          </div>

          {/* Floating UI Elements */}
          <div className="fixed bottom-10 left-10 z-40 hidden lg:block opacity-20 hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-6 font-mono text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-rl] items-center">
              <span>BUILD MODE / 2026</span>
              <div className="h-12 w-[1px] bg-white mx-auto" />
              <span>CRAFTED BY AFLAH</span>
            </div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

