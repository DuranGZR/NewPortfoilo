"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Lightbulb, Target, Cpu, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import SectionReveal from '@/components/animations/SectionReveal';
import GlassCard from '@/components/ui/GlassCard';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const statusColors = {
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'planned': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  const statusIcons = {
    'completed': <CheckCircle2 className="w-3 h-3" />,
    'in-progress': <Cpu className="w-3 h-3 animate-pulse" />,
    'planned': <Lightbulb className="w-3 h-3" />
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Back Button - Glassmorphism */}
      <div className="sticky top-0 z-50 bg-[#0d0d0d]/60 backdrop-blur-xl border-b border-[#819fa7]/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-[#819fa7] hover:text-[#f3f5f9] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header with reveal animation */}
        <SectionReveal delay={0}>
          <div className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <motion.span
                className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full border backdrop-blur-sm ${statusColors[project.status]}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {statusIcons[project.status]}
                {project.status.replace('-', ' ')}
              </motion.span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient">{project.title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#f3f5f9]/70 mb-8 max-w-3xl leading-relaxed">
              {project.oneLiner}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#819fa7] to-[#5b6e74] text-[#0d0d0d] rounded-xl font-medium hover:shadow-lg hover:shadow-[#819fa7]/20 transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#819fa7]/30 text-[#819fa7] rounded-xl font-medium hover:bg-[#819fa7]/10 hover:border-[#819fa7]/50 backdrop-blur-sm transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-4 h-4" />
                  View Code
                </motion.a>
              )}
            </div>
          </div>
        </SectionReveal>

        {/* Problem Section */}
        <SectionReveal delay={0.1}>
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-[#f3f5f9] mb-6 flex items-center gap-3">
              <span className="text-[#819fa7] font-mono">01.</span> The Problem
            </h2>
            <GlassCard className="p-8">
              <p className="text-[#f3f5f9]/80 leading-relaxed text-lg mb-8">
                {project.problem}
              </p>
              <div>
                <h3 className="text-lg font-display font-semibold text-[#f3f5f9] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#819fa7]" />
                  Key Constraints
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.constraints.map((constraint, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-[#f3f5f9]/70 p-3 rounded-lg bg-[#0d0d0d]/40"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-[#819fa7] mt-0.5">→</span>
                      <span>{constraint}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </section>
        </SectionReveal>

        {/* Solution Section */}
        <SectionReveal delay={0.15}>
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-[#f3f5f9] mb-6 flex items-center gap-3">
              <span className="text-[#819fa7] font-mono">02.</span> The Approach
            </h2>
            <div className="space-y-6">
              <GlassCard className="p-8">
                <p className="text-[#f3f5f9]/80 leading-relaxed text-lg">
                  {project.approach}
                </p>
              </GlassCard>

              {/* Model Choice Card - Premium */}
              <GlassCard className="p-8" glow>
                <h3 className="text-lg font-display font-semibold text-[#f3f5f9] mb-6 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#819fa7]" />
                  Model Choice
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-[#0d0d0d]/60">
                    <span className="text-xs font-bold text-[#819fa7] uppercase tracking-wider">Selected Model</span>
                    <p className="text-xl font-display font-semibold text-[#f3f5f9] mt-2">{project.modelChoice.name}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d0d0d]/40">
                    <span className="text-xs font-bold text-[#819fa7] uppercase tracking-wider">Rationale</span>
                    <p className="text-[#f3f5f9]/70 mt-2 leading-relaxed">{project.modelChoice.rationale}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </section>
        </SectionReveal>

        {/* Results Section */}
        <SectionReveal delay={0.2}>
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-[#f3f5f9] mb-6 flex items-center gap-3">
              <span className="text-[#819fa7] font-mono">03.</span> Results & Evaluation
            </h2>

            {/* Metrics Grid - Animated */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {project.evaluation.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <GlassCard className="p-6 text-center">
                    <motion.div
                      className="text-3xl md:text-4xl font-display font-bold text-[#819fa7] mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-sm text-[#f3f5f9]/60 uppercase tracking-wider">{metric.name}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <GlassCard className="p-8 mb-6">
              <h3 className="text-lg font-display font-semibold text-[#f3f5f9] mb-3">Evaluation Approach</h3>
              <p className="text-[#f3f5f9]/70 leading-relaxed">
                {project.evaluation.approach}
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-l-4 border-l-[#819fa7]" glow>
              <h3 className="text-lg font-display font-semibold text-[#f3f5f9] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#819fa7]" />
                Outcome
              </h3>
              <p className="text-[#f3f5f9]/80 leading-relaxed text-lg">
                {project.outcome}
              </p>
            </GlassCard>
          </section>
        </SectionReveal>

        {/* Lessons Learned */}
        <SectionReveal delay={0.25}>
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-[#f3f5f9] mb-6 flex items-center gap-3">
              <span className="text-[#819fa7] font-mono">04.</span> Lessons Learned
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.learnings.map((learning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#819fa7]/10 flex items-center justify-center text-[#819fa7] text-sm font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[#f3f5f9]/70 leading-relaxed">{learning}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Tech Stack */}
        <SectionReveal delay={0.3}>
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-[#f3f5f9] mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 text-sm text-[#f3f5f9]/80 bg-[#1a1a1a]/60 backdrop-blur-sm rounded-lg border border-[#819fa7]/10 hover:border-[#819fa7]/30 hover:bg-[#819fa7]/5 transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Tags */}
        {project.tags.length > 0 && (
          <SectionReveal delay={0.35}>
            <section>
              <h2 className="text-2xl font-display font-bold text-[#f3f5f9] mb-6">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1.5 text-xs font-medium text-[#819fa7] bg-[#819fa7]/10 backdrop-blur-sm rounded-full border border-[#819fa7]/20 hover:bg-[#819fa7]/20 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}
