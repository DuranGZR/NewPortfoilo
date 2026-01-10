'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

interface EducationPanelProps {
    color: string;
}

export default function EducationPanel({ color }: EducationPanelProps) {
    const t = useTranslations('experience');
    const t3d = useTranslations('resume3d.education');

    const certifications = [
        { key: 'mlCamp', icon: Award },
        { key: 'featureEng', icon: Award },
        { key: 'pythonDS', icon: Award },
    ];

    const courses = [
        'dataStructures', 'oop', 'database', 'algorithms',
        'ai', 'imageProcessing', 'computerNetworks', 'webProgramming'
    ];

    return (
        <div className="space-y-5">
            {/* University - Featured Card */}
            <motion.div
                className="p-5 rounded-2xl relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                    border: `1px solid ${color}30`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* Background glow */}
                <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
                    style={{ background: color }}
                />

                <div className="relative flex items-start gap-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${color}25`, border: `1px solid ${color}40` }}
                    >
                        <GraduationCap className="w-7 h-7" style={{ color }} />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">
                            {t('items.degree.title')}
                        </h3>
                        <p className="text-white/60 text-sm mt-1">
                            {t('items.degree.organization')}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 text-xs text-white/40">
                                <Calendar className="w-3 h-3" />
                                {t('items.degree.period')}
                            </div>
                            <div
                                className="px-2 py-0.5 rounded text-xs font-medium"
                                style={{ background: `${color}20`, color }}
                            >
                                GPA: 2.84/4.0
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Certifications Timeline */}
            <div>
                <motion.h4
                    className="text-sm font-medium text-white/50 mb-3 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <Award className="w-4 h-4" />
                    {t('categories.certifications')}
                </motion.h4>

                <div className="space-y-2">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.key}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                        >
                            {/* Timeline dot */}
                            <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: color }}
                            />

                            <div className="flex-1 min-w-0">
                                <h5 className="text-sm font-medium text-white/90 truncate">
                                    {t(`items.${cert.key}.title`)}
                                </h5>
                                <p className="text-xs text-white/40">
                                    {t(`items.${cert.key}.organization`)} • {t(`items.${cert.key}.period`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div>
                <motion.h4
                    className="text-sm font-medium text-white/50 mb-3 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <BookOpen className="w-4 h-4" />
                    {t('coursesTitle')}
                </motion.h4>

                <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                >
                    {courses.map((course, index) => (
                        <motion.span
                            key={course}
                            className="px-3 py-1.5 text-xs rounded-lg bg-white/[0.03] border border-white/5 text-white/60 hover:border-white/15 hover:text-white/80 transition-colors cursor-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.03 }}
                        >
                            {t(`courses.${course}.title`)}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
