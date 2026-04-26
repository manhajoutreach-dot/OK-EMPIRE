import { motion } from 'motion/react';
import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import React from 'react';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
      
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-brand-cyan font-bold block mb-8">
            Transmission Protocol
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-8 uppercase leading-[0.85] text-white">
            CONNECT
          </h2>
          <p className="text-white/40 text-base font-light mb-12 max-w-md leading-relaxed border-l border-white/5 pl-8 italic">
            "This system is open."
          </p>

          <div className="space-y-6">
            <a 
              href="mailto:afluk313@gmail.com" 
              className="group relative flex items-center justify-between p-8 glass rounded-sm transition-all border-white/5 overflow-hidden w-full lg:w-[450px]"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-brand-cyan shadow-[0_0_15px_#00f0ff]"></div>
              
              <div className="relative z-10 flex items-center gap-6">
                <div className="p-3 rounded-sm bg-brand-cyan/10 text-brand-cyan group-hover:scale-110 transition-all duration-500">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-brand-cyan/60 mb-1 font-bold group-hover:text-brand-cyan transition-colors">Direct Node</p>
                  <p className="text-lg font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">afluk313@gmail.com</p>
                </div>
              </div>
              
              <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:text-brand-cyan transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              
              <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a 
              href="https://instagram.com/aflu_k_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-8 glass rounded-sm transition-all border-white/5 overflow-hidden w-full lg:w-[450px]"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-brand-cyan/50"></div>
              
              <div className="relative z-10 flex items-center gap-6">
                <div className="p-3 rounded-sm bg-white/5 text-white/40 group-hover:text-brand-cyan group-hover:scale-110 transition-all duration-500">
                  <MessageSquare size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 mb-1 font-bold group-hover:text-brand-cyan transition-colors">Instagram</p>
                  <p className="text-lg font-bold tracking-tight text-white/80 group-hover:text-brand-cyan transition-colors">@aflu_k_</p>
                </div>
              </div>
              
              <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:text-brand-cyan transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              
              <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square glass rounded-sm p-16 flex flex-col justify-between relative overflow-hidden group border-white/5 bg-black/40">
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-12 block font-bold">Network Status</span>
              <div className="flex items-center gap-6 mb-8 group-hover:gap-8 transition-all duration-500">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_12px_#22c55e] animate-pulse" />
                <h3 className="text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-white/90">Online</h3>
              </div>
              <p className="text-white/40 max-w-xs text-sm leading-relaxed px-6 border-l border-white/5 italic">
                Operating at the intersection of logic and beauty. Located in the digital ether, available globally.
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-12">
               <div className="space-y-4">
                 <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 block font-bold">Location</span>
                 <div className="text-sm font-mono tracking-widest text-white/60">GMT+0 / EARTH</div>
               </div>
               <div className="flex gap-6">
                 {['GH', 'LN', 'TW'].map(s => (
                   <span key={s} className="text-[10px] font-mono tracking-[0.2em] text-white/40 hover:text-brand-cyan transition-colors cursor-pointer font-bold">
                     {s}
                   </span>
                 ))}
               </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
               <div className="text-[300px] font-display font-black leading-none">@</div>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] uppercase tracking-[0.6em] text-white/20 font-bold">
        <div className="flex items-center gap-6">
          <div className="w-10 h-[1px] bg-white/10" />
          <span>FRAGMENT SYSTEM</span>
          <div className="w-10 h-[1px] bg-white/10" />
        </div>
        <div>CRAFTED BY AFLAH © 2026</div>
        <div className="flex gap-12">
          <span className="hover:text-white transition-colors cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>WORK</span>
          <span className="hover:text-white transition-colors cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>CONTACT</span>
        </div>
      </footer>
    </section>
  );
};
