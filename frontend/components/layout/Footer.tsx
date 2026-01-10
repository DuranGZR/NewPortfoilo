"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: Github, href: 'https://github.com/DuranGZR', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/durangezer', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@durangezer.com', label: 'Email' }
];

const quickLinks = [
  { nameKey: 'about', href: '/#about' },
  { nameKey: 'projects', href: '/#projects' },
  { nameKey: 'skills', href: '/#skills' },
  { nameKey: 'experience', href: '/#experience' },
  { nameKey: 'roadmap', href: '/#roadmap' }
];


export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const currentYear = new Date().getFullYear();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#0d0d0d] border-t border-[#819fa7]/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#0d0d0d]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand Section */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-display font-bold text-[#f3f5f9] mb-4">
                Duran Gezer
              </h3>
              <p className="text-sm text-[#f3f5f9]/60 leading-relaxed mb-6 max-w-sm">
                {t('tagline')}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group w-10 h-10 rounded-xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 flex items-center justify-center text-[#819fa7]/70 hover:text-[#819fa7] hover:border-[#819fa7]/40 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-sm font-display font-semibold text-[#819fa7] uppercase tracking-wider mb-5">
                {t('quickLinks')}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.nameKey}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="group flex items-center gap-2 text-sm text-[#f3f5f9]/60 hover:text-[#819fa7] transition-colors"
                    >
                      <span>{tNav(link.nameKey)}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-sm font-display font-semibold text-[#819fa7] uppercase tracking-wider mb-5">
                {t('getInTouch')}
              </h4>
              <p className="text-sm text-[#f3f5f9]/60 mb-5 leading-relaxed">
                {t('getInTouchDesc')}
              </p>
              <motion.a
                href="mailto:contact@durangezer.com"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#f3f5f9] bg-[#1a1a1a]/50 border border-[#819fa7]/10 rounded-xl hover:border-[#819fa7]/40 transition-all group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4 text-[#819fa7]" />
                {t('sendMessage')}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#819fa7]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#f3f5f9]/40 flex items-center gap-1">
            © {currentYear} Duran Gezer. {t('builtWith')}
            <Heart className="w-3 h-3 text-[#819fa7]/50 inline mx-1" />
            Next.js
          </p>
          <p className="text-xs text-[#f3f5f9]/40">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
