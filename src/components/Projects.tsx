import { motion } from 'motion/react';
import React from 'react';
import { SectionHeader } from './AboutAndVision';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'Manhaj Outreach',
    category: 'A digital platform built for a college.',
    description: 'This project includes both frontend and backend development. It focuses on delivering structured content, accessibility, and real-world outreach.',
    image: '/screenshot-102.png',
    tags: ['Full Stack', 'Accessibility', 'Digital Outreach']
  },
  {
    id: '02',
    title: '[ DATA REDACTED ]',
    category: 'Classified',
    description: 'Project specifications currently under restricted access protocol.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    tags: ['Reserved', 'Encrypted']
  }
];

export const Projects = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader
        number="03"
        title="Artifacts"
        subtitle="Deployment of high-performance systems and real-world digital solutions."
      />

      <div className="grid md:grid-cols-2 gap-20">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm glass mb-8 border border-white/5 bg-black/40">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 bg-brand-cyan shadow-[0_0_12px_#00f0ff] animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                <div className="h-[1px] w-8 bg-brand-cyan/40" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-brand-cyan/80 font-bold">
                  {i === 0 ? 'Production Live' : 'Restricted'}
                </span>
              </div>
            </div>

            <div className="space-y-6 px-4 border-l border-white/5 relative">
              <div className="absolute top-0 left-0 w-[2px] h-0 group-hover:h-3/4 bg-brand-cyan transition-all duration-700 shadow-[0_0_10px_#00f0ff]" />
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-brand-cyan transition-colors">FRAGMENT {project.id}</span>
                <div className="h-[1px] w-6 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 font-mono">X-REF: {project.id}</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase group-hover:text-brand-cyan transition-colors duration-500">{project.title}</h3>
              <div className="text-[10px] uppercase tracking-[0.25em] text-brand-cyan/60 font-medium pb-2 border-b border-white/5 inline-block w-full">
                {project.category}
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-md font-light opacity-80 pb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.2em] font-mono opacity-50 group-hover:opacity-100 group-hover:border-brand-cyan/30 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-mono text-sm uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
        >
          View Archive <ArrowRight className="w-4 h-4 inline-block ml-2 mb-1" />
        </motion.button>
      </div>
    </section>
  );
};
