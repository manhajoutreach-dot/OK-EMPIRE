import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export const BackgroundEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Subtle parallax for background elements
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <>
      <div className="noise" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" ref={containerRef}>
        {/* Deep Background Gradients */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] opacity-10"
        >
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-brand-cyan/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-brand-purple/20 blur-[150px] rounded-full" />
        </motion.div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ 
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => {
          const isNeon = Math.random() > 0.7;
          const color = isNeon ? (Math.random() > 0.5 ? '#00f5ff' : '#ff003c') : '#ffffff';
          const size = Math.random() * (isNeon ? 4 : 2) + 1;
          
          return (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: size + 'px',
                height: size + 'px',
                backgroundColor: color,
                boxShadow: isNeon ? `0 0 10px ${color}` : 'none',
                opacity: Math.random() * 0.3 + 0.1,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 20 + 20}s linear infinite, flicker ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>

      {/* Radial Decoration */}
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
