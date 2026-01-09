"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedCounter from '@/components/widgets/AnimatedCounter';
import SectionReveal from '@/components/animations/SectionReveal';

interface Skill {
  name: string;
  level: number;
}

const skillCategories = [
  {
    key: "ml",
    skills: [
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 75 },
      { name: "Transformers/BERT", level: 80 },
      { name: "Computer Vision", level: 75 },
      { name: "NLP", level: 85 },
      { name: "MLOps", level: 70 }
    ]
  },
  {
    key: "programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 75 },
      { name: "C++", level: 65 }
    ]
  },
  {
    key: "frameworks",
    skills: [
      { name: "Next.js/React", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Git", level: 90 },
      { name: "AWS", level: 70 }
    ]
  },
  {
    key: "data",
    skills: [
      { name: "Pandas/NumPy", level: 85 },
      { name: "Data Visualization", level: 80 },
      { name: "Time Series", level: 75 },
      { name: "Statistical Analysis", level: 70 }
    ]
  }
];

const stats = [
  { labelKey: "technologies", value: "25", suffix: "+" },
  { labelKey: "projects", value: "12", suffix: "" },
  { labelKey: "codeLines", value: "50", suffix: "K+" },
  { labelKey: "learningHrs", value: "2000", suffix: "+" }
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-[#f3f5f9]/80 group-hover:text-[#f3f5f9] transition-colors">{skill.name}</span>
        <span className="text-xs text-[#819fa7] font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-[#0d0d0d] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: index * 0.08,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#819fa7]/60 to-[#819fa7] relative overflow-hidden"
        >
          {/* Subtle shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileInView={{ x: '200%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.08 + 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="relative py-24 px-6 bg-[#0d0d0d]">
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

        {/* Skills Grid with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <SectionReveal
              key={category.key}
              delay={0.1 + categoryIndex * 0.1}
              direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
            >
              <div className="h-full p-6 rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 hover:-translate-y-1 transition-all duration-300">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#819fa7] to-[#5b6e74]" />
                  <h3 className="text-base font-display font-bold text-[#f3f5f9]">
                    {t(`categories.${category.key}`)}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Stats with animated counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <SectionReveal key={stat.labelKey} delay={0.4 + index * 0.08}>
              <div className="text-center p-5 rounded-xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="text-2xl md:text-3xl font-display font-bold text-[#819fa7] mb-1">
                  <AnimatedCounter value={stat.value + stat.suffix} duration={2000} />
                </div>
                <div className="text-xs text-[#f3f5f9]/40 uppercase tracking-wider">
                  {t(`stats.${stat.labelKey}`)}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
