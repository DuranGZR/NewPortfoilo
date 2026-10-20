"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useMessages, useLocale } from 'next-intl';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

interface ProjectItem {
  key: string;
  slug: string;
  defaultImage: string;
}

const PROJECT_LIST: ProjectItem[] = [
  { key: 'aliagaAI', slug: 'aliaga-ai', defaultImage: '/projects/aliagaai.png' },
  { key: 'aiDreamInterpreter', slug: 'ai-dream-interpreter', defaultImage: '/projects/dream-interpreter.png' },
  { key: 'kayipQR', slug: 'kayip-qr', defaultImage: '/projects/kayipqr.png' },
  { key: 'weDo', slug: 'wedo', defaultImage: '/projects/wedo-card.png' },
  { key: 'visualAI', slug: 'real-time-visual-understanding', defaultImage: '/projects/visual-ai.png' },
];

export default function Projects() {
  const t = useTranslations('projects');
  const messages = useMessages() as any;
  const locale = useLocale();

  const [currentIndex, setCurrentIndex] = useState(2); // Start at center (kayipQR)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROJECT_LIST.length);
  }, []);

  // Auto rotate every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(nextProject, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextProject]);

  const handleCardClick = (index: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(nextProject, 5000);
    }
    setCurrentIndex(index);
  };

  const activeProjectMeta = PROJECT_LIST[currentIndex];
  const items = messages?.projects?.items || {};
  const activeData = items[activeProjectMeta.key] || {};

  return (
    <section
      id="projects"
      className="relative md:min-h-screen flex flex-col justify-center py-20 sm:py-24 md:py-28 lg:py-32 px-4 md:px-8 bg-[#0d0d0d] content-visibility-auto overflow-hidden"
    >
      {/* Background dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-[1140px] w-full mx-auto md:my-auto flex flex-col justify-center">
        {/* Header Layout (Matching Richard Miculob's work-header) */}
        <SectionReveal delay={0}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 md:mb-12">
            <div>
              <div className="font-mono text-xs font-semibold tracking-[0.2em] text-[#819fa7] uppercase mb-2">
                {t('badge')}
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-[54px] font-display font-extrabold text-[#f3f5f9] tracking-tight leading-[1.08]">
                {t('title')}
              </h2>
              <p className="text-sm sm:text-base text-white/50 max-w-xl mt-3 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            <a
              href="https://github.com/DuranGZR?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-white/10 shrink-0"
            >
              {t('viewMore')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </SectionReveal>

        {/* 3D Album Coverflow Carousel & Active Project Details */}
        <SectionReveal delay={0.15}>
          <div className="relative w-full my-4 sm:my-8 flex flex-col items-center select-none">
          <div
            className="relative w-full max-w-[980px] h-[240px] sm:h-[300px] md:h-[350px] flex items-center justify-center"
            style={{ perspective: '1100px' }}
          >
            {PROJECT_LIST.map((proj, idx) => {
              const projData = items[proj.key] || {};
              const imgSrc = projData.image || proj.defaultImage;
              const pos = (idx - currentIndex + PROJECT_LIST.length) % PROJECT_LIST.length;

              // Compute transforms for 5 slots matching Richard's coverflow
              let transform = '';
              let opacity = 0;
              let zIndex = 1;
              let isCenter = false;

              if (pos === 0) {
                // Center active card
                transform = 'translate(-50%, -50%) scale(1)';
                opacity = 1;
                zIndex = 30;
                isCenter = true;
              } else if (pos === 1) {
                // Immediate right
                transform = 'translate(calc(-50% + 240px), -50%) scale(0.74)';
                opacity = 0.85;
                zIndex = 20;
              } else if (pos === PROJECT_LIST.length - 1) {
                // Immediate left
                transform = 'translate(calc(-50% - 240px), -50%) scale(0.74)';
                opacity = 0.85;
                zIndex = 20;
              } else if (pos === 2) {
                // Far right
                transform = 'translate(calc(-50% + 400px), -50%) scale(0.55)';
                opacity = 0.3;
                zIndex = 10;
              } else {
                // Far left
                transform = 'translate(calc(-50% - 400px), -50%) scale(0.55)';
                opacity = 0.3;
                zIndex = 10;
              }

              return (
                <div
                  key={proj.key}
                  onClick={() => handleCardClick(idx)}
                  className={`absolute top-1/2 left-1/2 w-[300px] sm:w-[420px] md:w-[480px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCenter
                      ? 'border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(129,159,167,0.18)] cursor-default'
                      : 'border border-white/10 hover:opacity-100 hover:scale-[0.78] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)]'
                  }`}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={projData.title || proj.key}
                    className="w-full h-full object-cover select-none pointer-events-none bg-[#141414]"
                    draggable={false}
                  />
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/35 hover:bg-transparent transition-colors" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Project Details Box (Matching Richard Miculob's work-info) */}
        <div className="max-w-[780px] mx-auto text-center px-4 mt-8 md:mt-12 space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-[34px] font-display font-bold text-[#f3f5f9] tracking-tight">
            {activeData.title || 'Project'}
          </h3>

          <p className="text-sm sm:text-[15px] leading-relaxed text-white/60 max-w-[650px] mx-auto">
            {activeData.tagline || ''}
          </p>

          <div className="pt-2">
            <Link
              href={`/${locale}/projects/${activeProjectMeta.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#819fa7] border-b border-white hover:border-[#819fa7] pb-1 transition-all duration-200 group"
            >
              <span>{t('viewProject')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        </SectionReveal>
      </div>
    </section>
  );
}
