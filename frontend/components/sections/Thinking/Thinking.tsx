"use client";

import { useState, useRef } from 'react';
import { Brain, Target, Zap, GitBranch, Users, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
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
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const target = children[index];
    if (target) {
      const targetCenter = target.offsetLeft + target.offsetWidth / 2;
      const scrollPosition = targetCenter - container.offsetWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollCenter = container.scrollLeft + container.offsetWidth / 2;
    const children = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section id="thinking" className="relative md:min-h-screen flex flex-col justify-center py-20 sm:py-24 md:py-28 lg:py-32 px-4 md:px-6 bg-[#0d0d0d] content-visibility-auto">
      {/* Koyu degrade arka plan (Monokrom, Hakkımda & Deneyim ile birebir aynı) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] w-full mx-auto md:my-auto">
        {/* Section Header (Hakkımda & Deneyim ile aynı tipografi) */}
        <SectionReveal delay={0}>
          <div className="mb-6 sm:mb-16">
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#819fa7] uppercase mb-1.5 sm:mb-2">
              {t('badge')}
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-[54px] font-display font-extrabold text-[#f3f5f9] tracking-tight leading-[1.1] mb-2 sm:mb-3">
              {t('title')}
            </h2>
            <p className="text-xs sm:text-[15px] leading-relaxed sm:leading-[1.8] text-white/60 max-w-[680px]">
              {t('subtitle')}
            </p>
          </div>
        </SectionReveal>

        {/* ========================================================
            MOBİL GÖRÜNÜM: Swipeable Kartlar (md:hidden)
           ======================================================== */}
        <div className="md:hidden">
          {/* Swipeable Snap Carousel */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none py-1 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              const isActive = activeIndex === index;
              return (
                <div
                  key={principle.key}
                  className={`snap-center shrink-0 w-[84vw] max-w-[320px] rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#141414] border-white/20 shadow-lg'
                      : 'bg-[#111111]/70 border-white/10 opacity-70'
                  }`}
                >
                  <div>
                    {/* Top row: Number & Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-semibold text-[#819fa7] tracking-widest select-none">
                        0{index + 1} / 0{principles.length}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#819fa7]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-display font-bold text-[#f3f5f9] mb-2 leading-snug">
                      {t(`principles.${principle.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] leading-[1.7] text-white/65">
                      {t(`principles.${principle.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Prev / Next + Dots Indicator */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 px-1">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="text-xs font-mono font-medium text-white/60 hover:text-white disabled:opacity-20 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{locale === 'tr' ? 'Önceki' : 'Prev'}</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {principles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Kart 0${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToCard(Math.min(principles.length - 1, activeIndex + 1))}
              disabled={activeIndex === principles.length - 1}
              className="text-xs font-mono font-medium text-white/60 hover:text-white disabled:opacity-20 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <span>{locale === 'tr' ? 'Sonraki' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            MASAÜSTÜ GÖRÜNÜM: 6 İlke - Editoryal Numaralandırılmış Grid (Kutusuz, Çizgili, Ferah)
           ======================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <SectionReveal key={principle.key} delay={0.06 + index * 0.05}>
                <div className="group relative flex flex-col pt-6 border-t border-white/10 hover:border-white/30 transition-all duration-300">
                  {/* Üst Satır: Numara (01-06) ve Minimal İkon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-[#819fa7] tracking-widest select-none">
                      0{index + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#819fa7] group-hover:text-white group-hover:border-white/20 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* İlke Başlığı */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#f3f5f9] mb-2.5 group-hover:text-white transition-colors">
                    {t(`principles.${principle.key}.title`)}
                  </h3>

                  {/* İlke Açıklaması */}
                  <p className="text-[14.5px] leading-[1.75] text-white/60">
                    {t(`principles.${principle.key}.description`)}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
