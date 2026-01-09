"use client";

import { Target, Clock, Circle, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';

const milestones = [
  { key: "now", status: "active", progress: { completed: 2, total: 4 } },
  { key: "6months", status: "upcoming" },
  { key: "1year", status: "future" },
  { key: "2years", status: "future" }
];

export default function Roadmap() {
  const t = useTranslations('roadmap');

  return (
    <section id="roadmap" className="relative py-24 px-6 bg-[#0d0d0d]">
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]" />

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

        {/* Clean 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((milestone, index) => {
            const isActive = milestone.status === 'active';
            const goals = t.raw(`milestones.${milestone.key}.goals`) as string[];
            const focus = milestone.status !== 'active' ? t(`milestones.${milestone.key}.focus`) : null;

            return (
              <SectionReveal
                key={milestone.key}
                delay={0.1 + index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`h-full p-6 rounded-2xl border transition-colors hover:-translate-y-1 transition-all duration-300 ${isActive
                  ? 'bg-[#819fa7]/5 border-[#819fa7]/30'
                  : 'bg-[#1a1a1a]/50 border-[#819fa7]/10 hover:border-[#819fa7]/25'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#819fa7]/20' : 'bg-[#1a1a1a]'
                        }`}>
                        {isActive ? (
                          <Target className="w-5 h-5 text-[#819fa7]" />
                        ) : milestone.status === 'upcoming' ? (
                          <Clock className="w-5 h-5 text-[#819fa7]/60" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#819fa7]/40" />
                        )}
                      </div>
                      <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full ${isActive
                        ? 'bg-[#819fa7]/20 text-[#819fa7]'
                        : 'bg-[#1a1a1a] text-[#819fa7]/60'
                        }`}>
                        {t(`milestones.${milestone.key}.period`)}
                      </span>
                    </div>
                    {isActive && (
                      <span className="text-xs text-[#819fa7] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#819fa7] rounded-full animate-pulse" />
                        {t('active')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-display font-bold text-[#f3f5f9] mb-3">
                    {t(`milestones.${milestone.key}.title`)}
                  </h3>

                  {/* Goals */}
                  <ul className="space-y-2 mb-4">
                    {goals.map((goal: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#f3f5f9]/60">
                        <ArrowRight className="w-3 h-3 text-[#819fa7] mt-0.5 flex-shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Progress or Focus */}
                  {milestone.progress && (
                    <div className="pt-3 border-t border-[#819fa7]/10">
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-[#819fa7]" />
                        <span className="text-[#f3f5f9]/60">
                          <strong className="text-[#819fa7]">{milestone.progress.completed}</strong>/{milestone.progress.total} {t('completed')}
                        </span>
                      </div>
                    </div>
                  )}
                  {focus && (
                    <div className="pt-3 border-t border-[#819fa7]/10">
                      <p className="text-xs text-[#819fa7]/80 italic">"{focus}"</p>
                    </div>
                  )}
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom Note */}
        <SectionReveal delay={0.5}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#f3f5f9]/40">
              {t('bottomNote')}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
