"use client";

import { motion } from 'framer-motion';
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

      <div className="relative z-10 max-w-4xl mx-auto">
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#819fa7] via-[#819fa7]/50 to-[#819fa7]/10" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const isActive = milestone.status === 'active';
              const isLeft = index % 2 === 0;
              const goals = t.raw(`milestones.${milestone.key}.goals`) as string[];
              const focus = milestone.status !== 'active' ? t(`milestones.${milestone.key}.focus`) : null;

              return (
                <SectionReveal
                  key={milestone.key}
                  delay={0.1 + index * 0.15}
                  direction={isLeft ? 'left' : 'right'}
                >
                  <div className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row-reverse md:text-right' : 'md:flex-row'
                    }`}>

                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${isActive
                          ? 'bg-[#819fa7]/20 border-[#819fa7] shadow-lg shadow-[#819fa7]/20'
                          : milestone.status === 'upcoming'
                            ? 'bg-[#1a1a1a] border-[#819fa7]/50'
                            : 'bg-[#0d0d0d] border-[#819fa7]/20'
                          }`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      >
                        {isActive ? (
                          <Target className="w-5 h-5 text-[#819fa7]" />
                        ) : milestone.status === 'upcoming' ? (
                          <Clock className="w-5 h-5 text-[#819fa7]/60" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#819fa7]/40" />
                        )}
                      </motion.div>

                      {/* Pulse effect for active */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-[#819fa7]/20 animate-ping" />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'
                      }`}>
                      <motion.div
                        className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 text-left ${isActive
                          ? 'bg-[#819fa7]/5 border-[#819fa7]/30 shadow-lg shadow-[#819fa7]/5'
                          : 'bg-[#1a1a1a]/50 border-[#819fa7]/10 hover:border-[#819fa7]/25'
                          }`}
                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {/* Period Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-mono font-medium px-3 py-1.5 rounded-full ${isActive
                            ? 'bg-[#819fa7]/20 text-[#819fa7]'
                            : 'bg-[#1a1a1a] text-[#819fa7]/60'
                            }`}>
                            {t(`milestones.${milestone.key}.period`)}
                          </span>
                          {isActive && (
                            <span className="text-xs text-[#819fa7] flex items-center gap-1.5">
                              <span className="w-2 h-2 bg-[#819fa7] rounded-full animate-pulse" />
                              {t('active')}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-display font-bold text-[#f3f5f9] mb-4">
                          {t(`milestones.${milestone.key}.title`)}
                        </h3>

                        {/* Goals */}
                        <ul className="space-y-2 mb-4">
                          {goals.map((goal: string, idx: number) => (
                            <motion.li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-[#f3f5f9]/60"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + index * 0.1 + idx * 0.05 }}
                            >
                              <ArrowRight className="w-4 h-4 text-[#819fa7] mt-0.5 flex-shrink-0" />
                              <span>{goal}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Progress or Focus */}
                        {milestone.progress && (
                          <div className="pt-4 border-t border-[#819fa7]/10">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-[#819fa7]" />
                              <span className="text-[#f3f5f9]/60">
                                <strong className="text-[#819fa7]">{milestone.progress.completed}</strong>/{milestone.progress.total} {t('completed')}
                              </span>
                            </div>
                            {/* Progress Bar */}
                            <div className="mt-2 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-[#819fa7] to-[#5b6e74] rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(milestone.progress.completed / milestone.progress.total) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}
                        {focus && (
                          <div className="pt-4 border-t border-[#819fa7]/10">
                            <p className="text-sm text-[#819fa7]/80 italic">"{focus}"</p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <SectionReveal delay={0.8}>
          <div className="mt-16 text-center">
            <p className="text-sm text-[#f3f5f9]/40 max-w-lg mx-auto">
              {t('bottomNote')}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
