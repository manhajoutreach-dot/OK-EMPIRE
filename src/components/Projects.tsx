import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
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

const ProjectCard = ({ project, index }: { project: any; index: number; key: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -40 : 40]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm glass mb-10 border border-white/5 bg-black/40">
        <motion.img
          style={{ y: imageY, scale: 1.2 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-50 group-hover:brightness-75 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-0 right-0 p-6">
          <div className="w-2 h-2 bg-brand-cyan shadow-[0_0_15px_#00f0ff] animate-pulse" />
        </div>
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4">
          <div className="h-[1px] w-10 bg-brand-cyan/40" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-cyan font-bold">
            {index === 0 ? 'Production Live' : 'Restricted'}
          </span>
        </div>
      </div>

      <div className="space-y-8 px-6 border-l border-white/5 relative">
        <div className="absolute top-0 left-0 w-[2px] h-0 group-hover:h-full bg-brand-cyan transition-all duration-1000 shadow-[0_0_15px_#00f0ff]" />
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-brand-cyan transition-colors">FRAGMENT {project.id}</span>
          <div className="h-[1px] w-8 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-30 font-mono">X-REF: {project.id}</span>
        </div>
        
        <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase group-hover:text-brand-cyan transition-colors duration-700 leading-none">
          {project.title}
        </h3>
        
        <div className="text-[11px] uppercase tracking-[0.3em] text-brand-cyan/60 font-medium pb-3 border-b border-white/5 inline-block w-full">
          {project.category}
        </div>
        
        <p className="text-white/50 text-base leading-relaxed max-w-md font-light opacity-80 pb-6">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 pt-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-mono opacity-50 group-hover:opacity-100 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/5 transition-all duration-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto">
      <SectionHeader
        number="03"
        title="Artifacts"
        subtitle="Deployment of high-performance systems and real-world digital solutions."
      />

      <div className="grid md:grid-cols-2 gap-32">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="mt-40 text-center">
        <motion.button
          whileHover={{ scale: 1.05, color: "var(--brand-cyan)" }}
          whileTap={{ scale: 0.95 }}
          className="text-mono text-sm uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all duration-500 flex items-center gap-4 mx-auto"
        >
          View Archive <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};

