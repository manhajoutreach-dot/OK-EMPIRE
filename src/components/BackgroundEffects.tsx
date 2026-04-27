import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

const PARTICLE_COUNT = 30;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const isNeon = Math.random() > 0.7;
  const color = isNeon ? (Math.random() > 0.5 ? '#00f5ff' : '#ff003c') : '#ffffff';
  return {
    id: i,
    isNeon,
    color,
    size: Math.random() * (isNeon ? 4 : 2) + 1,
    opacity: Math.random() * 0.3 + 0.1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    floatDuration: Math.random() * 20 + 20,
    flickerDuration: Math.random() * 3 + 2,
    delay: Math.random() * 10,
  };
});

export const BackgroundEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -100]);
  const rotate = useTransform(scrollY, [0, 2000], [0, 45]);

  return (
    <>
      <div className="noise" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" ref={containerRef}>
        <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] opacity-10">
          <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] bg-brand-cyan/20 blur-[180px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-brand-purple/20 blur-[180px] rounded-full" />
        </motion.div>

        <motion.div 
          style={{ y: y2, backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
          className="absolute inset-0 opacity-[0.1]" 
        />

        <div className="absolute inset-0 overflow-hidden">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size + 'px',
                height: p.size + 'px',
                backgroundColor: p.color,
                boxShadow: p.isNeon ? `0 0 10px ${p.color}` : 'none',
                opacity: p.opacity,
                top: p.top + '%',
                left: p.left + '%',
                animation: `float ${p.floatDuration}s linear infinite, flicker ${p.flickerDuration}s ease-in-out infinite alternate`,
                animationDelay: `${p.delay}s`
              }}
            />
          ))}
        </div>

        <motion.div 
          style={{ rotate, y: y2 }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] pointer-events-none opacity-[0.03]"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="2,8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1,4" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
            <path d="M100 10 L100 25 M190 100 L175 100 M100 190 L100 175 M10 100 L25 100" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>

        <style>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-50vh) translateX(30px); }
            100% { transform: translateY(-100vh) translateX(-20px); }
          }
          @keyframes flicker {
            0% { opacity: 0.1; transform: scale(0.8); }
            100% { opacity: 0.4; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </>
  );
};
