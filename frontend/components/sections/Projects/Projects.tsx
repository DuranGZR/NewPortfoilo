"use client";

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';

const projects = [
  {
    id: "sentiment-analysis",
    translationKey: "sentiment",
    metrics: [
      { labelKey: "accuracy", value: "87%" },
      { labelKey: "processing", value: "500/min" }
    ],
    tags: ["Transformers", "PyTorch", "BERT", "FastAPI", "React"]
  },
  {
    id: "predictive-maintenance",
    translationKey: "maintenance",
    metrics: [
      { labelKey: "precision", value: "92%" },
      { labelKey: "downtime", value: "65%" }
    ],
    tags: ["XGBoost", "Time Series", "IoT", "Python", "AWS"]
  },
  {
    id: "code-review-assistant",
    translationKey: "codeReview",
    metrics: [
      { labelKey: "reviewTime", value: "40%" },
      { labelKey: "bugDetection", value: "3x" }
    ],
    tags: ["GPT-4", "AST Analysis", "TypeScript", "VS Code API"]
  },
  {
    id: "warehouse-vision",
    translationKey: "warehouse",
    metrics: [
      { labelKey: "accuracy", value: "95%" },
      { labelKey: "timeSaved", value: "96%" }
    ],
    tags: ["YOLOv8", "OpenCV", "Edge AI", "Raspberry Pi"]
  }
];

export default function Projects() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="relative py-24 px-6 bg-[#0d0d0d]">
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

        {/* Projects Grid - Clean 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <SectionReveal
              key={project.id}
              delay={0.1 + index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <ProjectCard
                {...project}
                index={index}
              />
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <SectionReveal delay={0.5}>
          <div className="mt-12 text-center">
            <button className="px-6 py-3 text-sm font-medium text-[#819fa7] border border-[#819fa7]/30 rounded-xl hover:bg-[#819fa7]/5 transition-colors">
              {t('viewCaseStudies')}
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
