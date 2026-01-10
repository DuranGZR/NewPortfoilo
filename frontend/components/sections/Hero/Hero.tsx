"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import GradientMesh from '@/components/effects/GradientMesh';
import TypewriterText from '@/components/animations/TypewriterText';

// Dynamically import 3D component
const Avatar3D = dynamic(() => import('@/components/3d/Avatar3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#819fa7]/20 to-[#5b6e74]/10 animate-pulse" />
    </div>
  )
});

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0a0a0a] to-[#0d0d0d]" />

      {/* Animated Gradient Mesh */}
      <GradientMesh />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">
                {t('name')}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xl md:text-2xl font-display font-medium mb-6 text-[#819fa7]"
            >
              {t('title')}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base md:text-lg text-[#f3f5f9]/60 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="btn-primary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('cta.primary')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#ai-assistant"
                className="btn-secondary group backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 text-[#819fa7]" />
                {t('cta.secondary')}
              </motion.a>
            </motion.div>
          </div>

          {/* Right - 3D Globe */}
          <motion.div
            className="hidden lg:flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="relative w-[400px] h-[400px] flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Avatar3D />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-[#5b6e74]"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">{t('scrollHint')}</span>
          <div className="w-5 h-8 rounded-full border border-[#5b6e74]/50 flex items-start justify-center p-1.5 backdrop-blur-sm">
            <motion.div
              className="w-1 h-2 bg-[#819fa7] rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
