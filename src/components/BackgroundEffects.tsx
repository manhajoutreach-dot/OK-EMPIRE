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
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <>
      <div className="noise" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" ref={containerRef}>
        <motion.div style={{ y: y1 }} className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] opacity-10">
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-brand-cyan/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-brand-purple/20 blur-[150px] rounded-full" />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

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

        <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1,4" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
            <path d="M100 20 L100 30 M180 100 L170 100 M100 180 L100 170 M20 100 L30 100" stroke="white" strokeWidth="1" />
          </svg>
        </div>

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
