'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, Calendar, Building, Users, Briefcase, CheckCircle } from 'lucide-react';

interface ExperiencePanelProps {
    color: string;
}

export default function ExperiencePanel({ color }: ExperiencePanelProps) {
    const t = useTranslations('experience');
    const t3d = useTranslations('resume3d.experience');

    // Topluluk aktiviteleri
    const communityActivities = [
        { key: 'hsdDevOps', icon: Briefcase, isActive: true },
        { key: 'cyberSecurityOrg', icon: Users, isActive: false },
    ];

    // Sertifikalar
    const certifications = [
        { key: 'machineLearning', icon: Award },
        { key: 'cloudNight', icon: Award },
    ];

    return (
        <div className="space-y-5">
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
                    <Users className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{t3d('title')}</h3>
                    <p className="text-sm text-white/40">{t3d('subtitle')}</p>
                </div>
            </motion.div>

            {/* Topluluk Aktiviteleri Bölümü */}
            <div>
                <motion.h4 
                    className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <Users className="w-4 h-4" />
                    Topluluk Aktiviteleri
                </motion.h4>
                <div className="space-y-2">
                    {communityActivities.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.key}
                                className="p-3 rounded-xl relative overflow-hidden transition-all group cursor-pointer border-2"
                                style={{
                                    background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
                                    borderColor: `${color}40`
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                whileHover={{ scale: 1.02, borderColor: `${color}60` }}
                            >
                                {/* Status badge */}
                                <div
                                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider flex items-center gap-1"
                                    style={{ 
                                        background: item.isActive ? `${color}30` : 'rgba(255,255,255,0.1)',
                                        color: item.isActive ? color : 'rgba(255,255,255,0.5)'
                                    }}
                                >
                                    {item.isActive ? (
                                        <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            Aktif
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-3 h-3" />
                                            Tamamlandı
                                        </>
                                    )}
                                </div>

                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${color}25, ${color}15)`,
                                            border: `1px solid ${color}30`
                                        }}
                                    >
                                        <IconComponent className="w-5 h-5" style={{ color }} />
                                    </div>

                                    <div className="flex-1 min-w-0 pr-16">
                                        <h5 className="font-medium text-white text-sm">
                                            {t(`items.${item.key}.title`)}
                                        </h5>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            <span className="flex items-center gap-1 text-[11px] text-white/50">
                                                <Building className="w-3 h-3" />
                                                {t(`items.${item.key}.organization`)}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-white/40">
                                                <Calendar className="w-3 h-3" />
                                                {t(`items.${item.key}.period`)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Sertifikalar Bölümü */}
            <div>
                <motion.h4 
                    className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    <Award className="w-4 h-4" />
                    Sertifikalar
                </motion.h4>
                <div className="space-y-2">
                    {certifications.map((cert, index) => {
                        const IconComponent = cert.icon;
                        return (
                            <motion.div
                                key={cert.key}
                                className="p-3 rounded-xl relative overflow-hidden transition-all group cursor-pointer border"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    borderColor: 'rgba(255,255,255,0.08)'
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                whileHover={{ 
                                    scale: 1.02, 
                                    borderColor: `${color}40`,
                                    background: `rgba(255,255,255,0.04)`
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        <IconComponent className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-medium text-white/90 text-sm group-hover:text-white transition-colors">
                                            {t(`items.${cert.key}.title`)}
                                        </h5>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex items-center gap-1 text-[11px] text-white/50">
                                                <Building className="w-3 h-3" />
                                                {t(`items.${cert.key}.organization`)}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-white/40">
                                                <Calendar className="w-3 h-3" />
                                                {t(`items.${cert.key}.period`)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
