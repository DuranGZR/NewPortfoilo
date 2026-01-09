"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ProjectCardProps {
  id: string;
  translationKey: string;
  metrics: {
    labelKey: string;
    value: string;
  }[];
  tags: string[];
  index: number;
}

export default function ProjectCard({
  id,
  translationKey,
  metrics,
  tags,
  index
}: ProjectCardProps) {
  const t = useTranslations('projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group"
    >
      <Link href={`/projects/${id}`}>
        <motion.div
          className="h-full p-6 rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 cursor-pointer overflow-hidden relative"
          whileHover={{
            y: -4,
            borderColor: 'rgba(129, 159, 167, 0.3)',
            backgroundColor: 'rgba(26, 26, 26, 0.7)'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle hover glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#819fa7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#819fa7]/60" />
                <span className="text-xs text-[#819fa7]/70">{t(`items.${translationKey}.period`)}</span>
              </div>
              <h3 className="text-lg font-display font-bold text-[#f3f5f9] group-hover:text-[#819fa7] transition-colors duration-300">
                {t(`items.${translationKey}.title`)}
              </h3>
            </div>
            <motion.div
              className="w-10 h-10 rounded-full border border-[#819fa7]/20 flex items-center justify-center text-[#819fa7]/50"
              whileHover={{
                backgroundColor: '#819fa7',
                borderColor: '#819fa7',
                color: '#0d0d0d',
                rotate: 45
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Tagline */}
          <p className="relative z-10 text-sm text-[#f3f5f9]/60 mb-4 leading-relaxed line-clamp-2">
            {t(`items.${translationKey}.tagline`)}
          </p>

          {/* Impact */}
          <div className="relative z-10 mb-4 p-3 rounded-lg bg-[#0d0d0d]/50 border-l-2 border-[#819fa7]/30">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-[#819fa7] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[#f3f5f9]/70 leading-relaxed line-clamp-2">
                {t(`items.${translationKey}.impact`)}
              </p>
            </div>
          </div>

          {/* Metrics with stagger */}
          <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="text-center p-2.5 rounded-lg bg-[#0d0d0d]/40"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="text-lg font-display font-bold text-[#819fa7]">
                  {metric.value}
                </div>
                <div className="text-[10px] text-[#f3f5f9]/40 uppercase tracking-wider">
                  {t(`metrics.${metric.labelKey}`)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags with stagger */}
          <div className="relative z-10 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="px-2.5 py-1 text-[10px] font-medium text-[#819fa7]/80 bg-[#819fa7]/5 rounded-md border border-[#819fa7]/10 hover:bg-[#819fa7]/10 hover:border-[#819fa7]/20 transition-colors"
              >
                {tag}
              </motion.span>
            ))}
            {tags.length > 4 && (
              <span className="px-2.5 py-1 text-[10px] text-[#f3f5f9]/40">
                +{tags.length - 4}
              </span>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
