"use client";

import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';

export default function AIAssistant() {
  const t = useTranslations('aiAssistant');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const sampleQuestions = [
    t('sampleQuestions.q1'),
    t('sampleQuestions.q2'),
    t('sampleQuestions.q3'),
    t('sampleQuestions.q4')
  ];

  const features = [
    { title: t('features.realtime.title'), desc: t('features.realtime.desc') },
    { title: t('features.context.title'), desc: t('features.context.desc') },
    { title: t('features.learning.title'), desc: t('features.learning.desc') }
  ];

  return (
    <section id="ai-assistant" className="relative py-24 px-6 overflow-hidden bg-[#0d0d0d]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(#819fa7 1px, transparent 1px),
          linear-gradient(90deg, #819fa7 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5">
            <Sparkles className="w-4 h-4 text-[#819fa7]" />
            <span className="text-xs font-light tracking-[0.3em] uppercase text-[#819fa7]">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f3f5f9] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#f3f5f9]/60 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </SectionReveal>

        {/* Chat Interface Preview */}
        <SectionReveal delay={0.2}>
          <div className="relative">
            {/* Chat Container */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/80 border border-[#819fa7]/20 backdrop-blur-xl overflow-hidden">

              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-[#819fa7]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#819fa7]/20 border border-[#819fa7]/30 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#819fa7]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f3f5f9]">{t('chatHeader.title')}</h3>
                    <p className="text-xs text-[#f3f5f9]/50">{t('chatHeader.poweredBy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#819fa7] animate-pulse" />
                  <span className="text-xs text-[#819fa7] ml-2">{t('status')}</span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-6 min-h-[400px] flex flex-col justify-center items-center">

                {/* Sample Questions */}
                <div className="w-full max-w-xl space-y-4">
                  <p className="text-sm text-[#f3f5f9]/60 text-center mb-6">
                    {t('sampleQuestionsTitle')}
                  </p>

                  {sampleQuestions.map((question, index) => (
                    <SectionReveal key={question} delay={0.3 + index * 0.1} direction="left">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => setSelectedQuestion(question)}
                        className={`
                          w-full p-4 rounded-lg text-left transition-all
                          ${selectedQuestion === question
                            ? 'bg-[#819fa7]/15 border border-[#819fa7]/40'
                            : 'bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/30'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#f3f5f9]/80">{question}</span>
                          <ArrowRight className={`
                            w-4 h-4 transition-all
                            ${selectedQuestion === question ? 'text-[#819fa7]' : 'text-[#f3f5f9]/30'}
                          `} />
                        </div>
                      </motion.button>
                    </SectionReveal>
                  ))}
                </div>

                {/* Coming Soon Note */}
                <SectionReveal delay={0.7}>
                  <div className="mt-12 text-center">
                    <div className="inline-block px-6 py-3 rounded-lg bg-[#819fa7]/5 border border-[#819fa7]/20">
                      <p className="text-sm text-[#f3f5f9]/60">
                        <span className="text-[#819fa7] font-semibold">{t('inDevelopment')}:</span> {t('inDevelopmentDesc')}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Chat Input (Disabled) */}
              <div className="px-6 py-4 border-t border-[#819fa7]/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    disabled
                    placeholder={t('inputPlaceholder')}
                    className="flex-1 px-4 py-3 rounded-lg bg-[#1a1a1a]/50 border border-[#819fa7]/20 text-[#f3f5f9]/50 text-sm placeholder:text-[#f3f5f9]/30 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="px-6 py-3 rounded-lg bg-[#819fa7]/20 text-[#819fa7]/50 text-sm font-medium cursor-not-allowed"
                  >
                    {t('sendButton')}
                  </button>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {features.map((feature, index) => (
                <SectionReveal key={feature.title} delay={0.8 + index * 0.1}>
                  <div className="h-full p-4 rounded-lg bg-[#1a1a1a]/40 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
                    <h4 className="text-sm font-semibold text-[#f3f5f9] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[#f3f5f9]/50">
                      {feature.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Notify Me */}
        <SectionReveal delay={1}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#f3f5f9]/50 mb-4">
              {t('notifyQuestion')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-lg bg-[#819fa7]/10 border border-[#819fa7]/30 text-[#819fa7] text-sm font-medium hover:bg-[#819fa7]/15 transition-all"
            >
              {t('notifyButton')}
            </motion.button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
