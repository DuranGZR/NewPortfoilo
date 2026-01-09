"use client";

import { Brain, Target, Zap, GitBranch, Users, Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

  return (
    <section id="thinking" className="relative py-24 px-6 bg-[#0d0d0d]">
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#819fa7] px-4 py-2 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5 mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#f3f5f9] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#f3f5f9]/50 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </SectionReveal>

        {/* Clean 3x2 Grid */}
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

        {/* Quote */}
        <SectionReveal delay={0.5}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#f3f5f9]/40 italic">
              "{t('quote')}"
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
