import { motion } from 'motion/react';
import React from 'react';
import { SectionHeader } from './AboutAndVision';
import { Code2, Database, Layout, Palette, Terminal, Zap } from 'lucide-react';

const skills = [
  { name: 'Core Architecture', level: 95, icon: Terminal, color: 'brand-cyan' },
  { name: 'Digital Aesthetics', level: 90, icon: Palette, color: 'brand-purple' },
  { name: 'Frontend Engineering', level: 98, icon: Code2, color: 'brand-cyan' },
  { name: 'System Logic', level: 85, icon: Zap, color: 'brand-red' },
  { name: 'Motion Design', level: 92, icon: Layout, color: 'brand-purple' },
  { name: 'Scalability', level: 88, icon: Database, color: 'white' },
];

export const Skills = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader 
        number="02"
        title="Synthesized Skills"
        subtitle="The technical foundation powering cinematic motion and complex logic."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 1, 
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="border-t border-white/10 pt-14 relative group"
          >
            {/* Hover reveal glow */}
            <div className="absolute -top-[1px] left-0 w-0 group-hover:w-full h-[2px] bg-brand-cyan transition-all duration-1000 ease-in-out shadow-[0_0_20px_#00f0ff]" />
            
            <div className="flex justify-between items-start mb-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 group-hover:text-brand-cyan transition-colors font-bold">
                {skill.name} / v.1.0
              </span>
              <skill.icon size={20} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white/5 text-[9px] uppercase tracking-wider border border-white/5 font-mono group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/20 transition-all">
                  Performance++
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-[9px] uppercase tracking-wider border border-white/5 font-mono group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/20 transition-all">
                  Scalable.sys
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Stability Index</div>
                <div className="h-[1px] flex-1 bg-white/5" />
                <div className="font-mono text-[11px] text-brand-cyan opacity-40 group-hover:opacity-100 transition-opacity">
                  {skill.level}.00
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
