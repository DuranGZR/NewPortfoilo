"use client";

import { Brain, Target, Zap, GitBranch, Users, Lightbulb, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionReveal from '@/components/animations/SectionReveal';

const principles = [
  { key: "firstPrinciples", icon: Brain },
  { key: "outcome", icon: Target },
  { key: "iterations", icon: Zap },
  { key: "systems", icon: GitBranch },
  { key: "debugging", icon: Users },
  { key: "curiosity", icon: Lightbulb }
];

export default function Thinking() {
  const t = useTranslations('thinking');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="thinking" className="relative py-12 md:py-24 px-4 md:px-6 bg-[#0d0d0d] content-visibility-auto">
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-6 md:mb-16">
          <span className="inline-block text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#819fa7] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5 mb-3 md:mb-6">
            {t('badge')}
          </span>
          <h2 className="text-xl md:text-4xl lg:text-5xl font-display font-bold text-[#f3f5f9] mb-2 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-xs md:text-base text-[#f3f5f9]/50 max-w-xl mx-auto hidden md:block">
            {t('subtitle')}
          </p>
        </SectionReveal>

        {/* ===== MOBILE LAYOUT - Accordion Style ===== */}
        <div className="md:hidden space-y-2">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={principle.key}
                className="rounded-xl bg-[#1a1a1a]/60 border border-[#819fa7]/10 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#819fa7]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#819fa7]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#f3f5f9]">
                      {t(`principles.${principle.key}.title`)}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-[#819fa7] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-3 pb-3 text-sm text-[#f3f5f9]/60 leading-relaxed">
                        {t(`principles.${principle.key}.description`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Quote - Mobile */}
          <div className="mt-4 text-center">
            <p className="text-sm text-[#f3f5f9]/40 italic px-4">
              "{t('quote')}"
            </p>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT - Original Grid ===== */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              const directions: ('up' | 'left' | 'right')[] = ['left', 'up', 'right', 'left', 'up', 'right'];
              return (
                <SectionReveal
                  key={principle.key}
                  delay={0.1 + index * 0.08}
                  direction={directions[index]}
                >
                  <div className="group h-full p-5 rounded-xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#819fa7]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#819fa7]" />
                    </div>
                    <h3 className="text-sm font-display font-semibold text-[#f3f5f9] mb-2 group-hover:text-[#819fa7] transition-colors">
                      {t(`principles.${principle.key}.title`)}
                    </h3>
                    <p className="text-xs text-[#f3f5f9]/50 leading-relaxed">
                      {t(`principles.${principle.key}.description`)}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          {/* Quote - Desktop */}
          <SectionReveal delay={0.5}>
            <div className="mt-12 text-center">
              <p className="text-sm text-[#f3f5f9]/40 italic">
                "{t('quote')}"
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
