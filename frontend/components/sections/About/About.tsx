"use client";

import { motion } from 'framer-motion';
import { Code, BookOpen, Lightbulb, Target, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'projects': Code,
  'thinking': BookOpen,
  'learning': Lightbulb,
  'practical': Target
};

export default function About() {
  const t = useTranslations('about');

  const highlights = ['projects', 'thinking', 'learning', 'practical'];

  return (
    <section id="about" className="relative py-24 px-6 bg-[#0d0d0d]">
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#819fa7] px-4 py-2 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5 mb-6"
          >
            {t('title')}
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#f3f5f9] mb-4">
            {t('subtitle')}
          </h2>
        </SectionReveal>

        {/* Clean 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bio Card */}
          <SectionReveal direction="left" delay={0.1}>
            <div className="h-full p-8 rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-1 h-full min-h-[60px] bg-gradient-to-b from-[#819fa7] to-transparent rounded-full" />
                <div>
                  <h3 className="text-xl font-display font-bold text-[#f3f5f9] mb-4">
                    {t('title')}
                  </h3>
                  <p className="text-[#f3f5f9]/70 leading-relaxed">
                    {t('bio')}
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Highlights - 2x2 Grid with stagger */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((key, index) => {
              const Icon = iconMap[key];
              return (
                <SectionReveal key={key} delay={0.15 + index * 0.1} direction="right">
                  <div className="group h-full p-5 rounded-xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-[#819fa7]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-[#819fa7]" />
                    </div>
                    <h4 className="text-sm font-display font-semibold text-[#f3f5f9] mb-2 group-hover:text-[#819fa7] transition-colors">
                      {t(`highlights.items.${key}.title`)}
                    </h4>
                    <p className="text-xs text-[#f3f5f9]/50 leading-relaxed">
                      {t(`highlights.items.${key}.description`)}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        {/* Quote with reveal animation */}
        <SectionReveal delay={0.3}>
          <div className="relative p-8 rounded-2xl bg-gradient-to-r from-[#819fa7]/5 to-transparent border border-[#819fa7]/10 overflow-hidden">
            <Quote className="absolute top-4 left-4 w-12 h-12 text-[#819fa7]/10" />
            <blockquote className="text-center relative z-10">
              <p className="text-lg md:text-xl text-[#f3f5f9]/90 font-display italic max-w-2xl mx-auto">
                &quot;{t('quote')}&quot;
              </p>
            </blockquote>
          </div>
        </SectionReveal>

        {/* Status with pulse */}
        <SectionReveal delay={0.4}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#819fa7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#819fa7]"></span>
              </span>
              <span className="text-sm text-[#f3f5f9]/70">{t('status.available')}</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
