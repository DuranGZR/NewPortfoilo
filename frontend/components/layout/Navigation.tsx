"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Command } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/widgets/LanguageSwitcher';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'thinking', href: '#thinking' },
  { key: 'roadmap', href: '#roadmap' }
];

export default function Navigation() {
  const t = useTranslations('navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(13, 13, 13, 0)', 'rgba(13, 13, 13, 0.9)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 border-b border-[#819fa7]/10' : 'py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left Side: Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl font-display font-bold text-[#f3f5f9] group-hover:text-[#819fa7] transition-colors">
              DG
            </span>
          </motion.a>

          {/* Right Side: Navigation + Actions */}
          <div className="hidden md:flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-2">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isActive
                      ? 'text-[#819fa7]'
                      : 'text-[#f3f5f9]/70 hover:text-[#f3f5f9]'
                      }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    {t(link.key)}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#819fa7]/10 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* 3D Resume Link */}
              <motion.a
                href="/3d-resume"
                className="relative px-4 py-2 text-sm font-medium text-[#819fa7] hover:text-[#819fa7] transition-colors rounded-lg flex items-center gap-2 bg-[#819fa7]/5 border border-[#819fa7]/20 hover:border-[#819fa7]/40"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                whileHover={{ y: -2 }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3L2 8l10 5 10-5-10-5z" />
                  <path d="M2 16l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                {t('3dresume')}
              </motion.a>
            </nav>

            {/* Divider */}
            <div className="h-5 w-px bg-[#819fa7]/20" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              <motion.button
                onClick={() => {
                  const event = new KeyboardEvent('keydown', {
                    key: 'k',
                    metaKey: true,
                    ctrlKey: true,
                    bubbles: true
                  });
                  document.dispatchEvent(event);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a]/50 border border-[#819fa7]/20 rounded-lg hover:border-[#819fa7]/40 hover:bg-[#1a1a1a]/70 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-4 h-4 text-[#819fa7]/70 group-hover:text-[#819fa7] transition-colors" />
                <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-[#0d0d0d] border border-[#819fa7]/20 rounded text-[#819fa7]/60">
                  <Command className="w-3 h-3" />K
                </kbd>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#f3f5f9] hover:text-[#819fa7] transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu with stagger */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 right-0 bottom-0 w-72 bg-[#0d0d0d]/98 backdrop-blur-2xl border-l border-[#819fa7]/10 z-40 md:hidden"
      >
        <div className="pt-24 px-6 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.key}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-lg font-medium text-[#f3f5f9]/80 hover:text-[#819fa7] transition-colors py-3 px-4 rounded-lg hover:bg-[#819fa7]/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 20
              }}
              transition={{ delay: isMobileMenuOpen ? index * 0.05 : 0 }}
            >
              {t(link.key)}
            </motion.a>
          ))}

          <div className="pt-6 mt-4 border-t border-[#819fa7]/10">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
