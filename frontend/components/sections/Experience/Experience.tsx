"use client";

import { GraduationCap, Briefcase, Award, FileCheck, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';

const timelineData = [
  {
    categoryKey: "education",
    icon: GraduationCap,
    items: [
      {
        key: "degree", highlights: [
          "Advanced coursework in Deep Learning, NLP, Computer Vision",
          "Senior project: Production-ready sentiment analysis system",
          "Teaching Assistant for Introduction to Python Programming"
        ]
      }
    ]
  },
  {
    categoryKey: "experience",
    icon: Briefcase,
    items: [
      {
        key: "intern", highlights: [
          "Developed predictive maintenance system reducing downtime by 65%",
          "Optimized inference speed by 40% through model quantization"
        ]
      },
      {
        key: "freelance", highlights: [
          "Built sentiment analysis tool processing 500+ posts/minute",
          "Delivered warehouse vision system with 95% accuracy"
        ]
      }
    ]
  },
  {
    categoryKey: "competitions",
    icon: Award,
    items: [
      { key: "hackathon", highlights: [] },
      { key: "mlChallenge", highlights: [] }
    ]
  },
  {
    categoryKey: "certifications",
    icon: FileCheck,
    items: [
      { key: "deepLearning", highlights: [] },
      { key: "aws", highlights: [] }
    ]
  }
];

export default function Experience() {
  const t = useTranslations('experience');

  return (
    <section id="experience" className="relative py-24 px-6 bg-[#0d0d0d]">
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
          {timelineData.map((category, categoryIndex) => (
            <SectionReveal
              key={category.categoryKey}
              delay={0.1 + categoryIndex * 0.1}
              direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
            >
              <div className="h-full p-6 rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#819fa7]/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-[#819fa7]" />
                  </div>
                  <h3 className="text-base font-display font-bold text-[#f3f5f9]">
                    {t(`categories.${category.categoryKey}`)}
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.key} className="pl-4 border-l-2 border-[#819fa7]/20">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-semibold text-[#f3f5f9]">
                          {t(`items.${item.key}.title`)}
                        </h4>
                        <span className="text-xs text-[#f3f5f9]/40 font-mono">
                          {t(`items.${item.key}.period`)}
                        </span>
                      </div>
                      <p className="text-xs text-[#819fa7] mb-1">{t(`items.${item.key}.organization`)}</p>
                      <p className="text-xs text-[#f3f5f9]/50">{t(`items.${item.key}.description`)}</p>

                      {item.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {item.highlights.slice(0, 2).map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs text-[#f3f5f9]/40">
                              <ChevronRight className="w-3 h-3 text-[#819fa7] mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
