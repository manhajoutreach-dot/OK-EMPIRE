import { motion } from 'motion/react';
import { Eye, Sparkles, Target } from 'lucide-react';
import React from 'react';
import { HUDProfile } from './HUDProfile';

export const SectionHeader = ({ title, subtitle, number }: { title: string; subtitle: string; number: string }) => (
  <div className="mb-20">
    <h2 className="text-[10px] uppercase tracking-[0.8em] text-brand-cyan mb-6 font-bold block">
      {number} / Transmission
    </h2>
    <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase">
      {title}
    </h3>
    <div className="flex items-center gap-6">
      <div className="h-[1px] w-12 bg-white/20" />
      <p className="text-white/40 font-light max-w-xl text-sm uppercase tracking-widest italic leading-relaxed">
        "{subtitle}"
      </p>
    </div>
  </div>
);

export const AboutAndVision = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5, // Delay slightly for HUD reveal
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden relative">
      {/* Visual Connection Line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute top-[40%] left-[20%] right-[40%] h-[1px] bg-gradient-to-r from-brand-cyan to-transparent origin-left hidden lg:block z-0"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid lg:grid-cols-2 gap-20 items-start relative z-10"
      >
        <div className="space-y-16">
          <motion.div variants={itemVariants}>
            <HUDProfile />
          </motion.div>
          
          <div className="space-y-12">
            <motion.div variants={itemVariants}>
              <SectionHeader 
                number="01"
                title="Presence"
                subtitle="The echo of my craft transcends the logic of its code."
              />
            </motion.div>
            
            <div className="space-y-6 text-white/60 leading-relaxed text-base font-light border-l border-white/5 pl-8">
              {[
                "I am not just a developer. I am a curator of digital time.",
                "My journey began in the silence of curiosity, where I discovered that software is not just a tool—it is a language of emotion.",
                "Every pixel is a conscious choice. Every interaction is a heartbeat.",
                "I build experiences that don't just solve problems; they linger in the mind."
              ].map((text, i) => (
                <motion.p key={i} variants={lineVariants}>
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative group h-full flex flex-col justify-center lg:pt-32"
        >
          <div className="glass p-12 rounded-sm relative z-10 space-y-12 overflow-hidden border-white/10 bg-black/40">
             <div className="absolute top-0 left-0 w-[2px] h-full bg-brand-cyan shadow-[0_0_15px_#00f0ff]"></div>
             
             <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4 text-brand-cyan">
                   <Target className="w-5 h-5" />
                   <h3 className="text-xs uppercase tracking-[0.4em] font-bold">The Vision</h3>
                </div>
                <p className="text-sm font-light opacity-60 leading-relaxed">
                   To define the next generation of web interaction, moving beyond static grids into immersive, cinematic digital worlds that feel alive.
                </p>
             </motion.div>

             <motion.div variants={itemVariants} className="space-y-4 border-t border-white/5 pt-8">
                <div className="flex items-center gap-4 text-brand-purple">
                   <Sparkles className="w-5 h-5" />
                   <h3 className="text-xs uppercase tracking-[0.4em] font-bold">The Protocol</h3>
                </div>
                <p className="text-sm font-light opacity-60 leading-relaxed">
                   Complexity hidden behind absolute simplicity. We create depth through nuance, ensuring that every frame tells a story.
                </p>
             </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
