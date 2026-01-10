'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

interface ExperiencePanelProps {
    color: string;
}

export default function ExperiencePanel({ color }: ExperiencePanelProps) {
    const t = useTranslations('experience');
    const t3d = useTranslations('resume3d.experience');

    const certificates = [
        { key: 'machineLearning', org: 'Miuul', year: '2024', featured: true },
        { key: 'csharp', org: 'Udemy', year: '2024', featured: false },
        { key: 'cloudNight', org: 'HSD İnönü - Huawei', year: '2025', featured: false },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <motion.div
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                    <Award className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{t3d('title')}</h3>
                    <p className="text-sm text-white/40">{t3d('subtitle')}</p>
                </div>
            </motion.div>

            {/* Certificate Cards */}
            <div className="space-y-3">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={cert.key}
                        className={`p-4 rounded-xl relative overflow-hidden transition-all group cursor-pointer ${cert.featured ? 'border-2' : 'border'
                            }`}
                        style={{
                            background: cert.featured
                                ? `linear-gradient(135deg, ${color}10 0%, transparent 100%)`
                                : 'rgba(255,255,255,0.02)',
                            borderColor: cert.featured ? `${color}40` : 'rgba(255,255,255,0.05)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.08 }}
                        whileHover={{ scale: 1.02, borderColor: `${color}60` }}
                    >
                        {/* Featured badge */}
                        {cert.featured && (
                            <div
                                className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider"
                                style={{ background: `${color}30`, color }}
                            >
                                Öne Çıkan
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex items-start gap-4">
                            {/* Certificate icon/badge */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative"
                                style={{
                                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                                    border: `1px solid ${color}30`
                                }}
                            >
                                <Award className="w-6 h-6" style={{ color }} />
                                {/* Glow on hover */}
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ boxShadow: `0 0 20px ${color}40` }}
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white group-hover:text-white/90 transition-colors">
                                    {t(`items.${cert.key}.title`)}
                                </h4>

                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="flex items-center gap-1 text-xs text-white/50">
                                        <Building className="w-3 h-3" />
                                        {cert.org}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-white/40">
                                        <Calendar className="w-3 h-3" />
                                        {cert.year}
                                    </span>
                                </div>

                                <p className="text-sm text-white/40 mt-2 leading-relaxed">
                                    {t(`items.${cert.key}.description`)}
                                </p>
                            </div>
                        </div>

                        {/* Hover gradient */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{
                                background: `linear-gradient(90deg, ${color}05 0%, transparent 50%)`
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom note */}
            <motion.p
                className="text-center text-xs text-white/30 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Sürekli öğrenmeye devam ediyorum
            </motion.p>
        </div>
    );
}
