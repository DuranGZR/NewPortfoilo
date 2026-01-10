"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

const projects = [
  {
    id: "visual-ai",
    translationKey: "visualAI",
    metrics: [
      { labelKey: "technologies", value: "AI/CV" }
    ],
    tags: ["Python", "Ollama", "LLaVA", "OpenCV"],
    github: "https://github.com/DuranGZR/Real-Time-Visual-Understanding"
  },
  {
    id: "handwriting",
    translationKey: "handwriting",
    metrics: [
      { labelKey: "technologies", value: "DL" }
    ],
    tags: ["TensorFlow", "Keras", "OpenCV", "CNN"],
    github: "https://github.com/DuranGZR/El_Yazisi_Tahmin"
  },
  {
    id: "diabetes",
    translationKey: "diabetes",
    metrics: [
      { labelKey: "technologies", value: "ML" }
    ],
    tags: ["Scikit-learn", "Pandas", "NumPy", "Python"],
    github: "https://github.com/DuranGZR/Diabetes_Prediction"
  },
  {
    id: "xox-bot",
    translationKey: "xoxBot",
    metrics: [
      { labelKey: "technologies", value: "RL" }
    ],
    tags: ["Python", "Q-Learning", "Reinforcement Learning"],
    github: "https://github.com/DuranGZR/XOX_Bot"
  },
  {
    id: "salary-prediction",
    translationKey: "salary",
    metrics: [
      { labelKey: "technologies", value: "ML" }
    ],
    tags: ["Scikit-learn", "Feature Engineering", "Python"],
    github: "https://github.com/DuranGZR/Salary_Prediction_with_Mahcine_Learning"
  },
  {
    id: "neuron",
    translationKey: "neuron",
    metrics: [
      { labelKey: "technologies", value: "NN" }
    ],
    tags: ["Python", "NumPy", "Neural Networks"],
    github: "https://github.com/DuranGZR/Simple-Artificial-Neuron"
  },
  {
    id: "pharmacy",
    translationKey: "pharmacy",
    metrics: [
      { labelKey: "technologies", value: "App" }
    ],
    tags: ["C#", "Database", "OOP"],
    github: "https://github.com/DuranGZR/Pharmacy_Automation"
  },
  {
    id: "bus-ticket",
    translationKey: "busTicket",
    metrics: [
      { labelKey: "technologies", value: "App" }
    ],
    tags: ["Java", "OOP", "Data Structures"],
    github: "https://github.com/DuranGZR/A_Bus_Ticket_Reservation_System"
  }
];

const INITIAL_DISPLAY_COUNT = 4;

export default function Projects() {
  const t = useTranslations('projects');
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreProjects = projects.length > INITIAL_DISPLAY_COUNT;

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index >= INITIAL_DISPLAY_COUNT ? (index - INITIAL_DISPLAY_COUNT) * 0.1 : 0 }}
              >
                <SectionReveal
                  delay={index < INITIAL_DISPLAY_COUNT ? 0.1 + index * 0.1 : 0}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <ProjectCard
                    {...project}
                    index={index}
                  />
                </SectionReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button */}
        {hasMoreProjects && (
          <SectionReveal delay={0.5}>
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#819fa7] border border-[#819fa7]/30 rounded-xl hover:bg-[#819fa7]/10 hover:border-[#819fa7]/50 transition-all duration-300"
              >
                <span>{showAll ? t('showLess') : t('viewCaseStudies')}</span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
              {!showAll && (
                <p className="mt-2 text-xs text-[#f3f5f9]/30">
                  +{projects.length - INITIAL_DISPLAY_COUNT} {t('moreProjects')}
                </p>
              )}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
}
