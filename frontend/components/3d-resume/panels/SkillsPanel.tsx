'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Brain, Code, Wrench, Database, Zap } from 'lucide-react';

interface SkillsPanelProps {
    color: string;
}

const skillCategories = [
    {
        key: 'ml',
        icon: Brain,
        skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NumPy']
    },
    {
        key: 'programming',
        icon: Code,
        skills: ['Python', 'JavaScript', 'TypeScript', 'C#', 'C++', 'Java', 'Kotlin', 'SQL']
    },
    {
        key: 'frameworks',
        icon: Wrench,
        skills: ['React', 'Next.js', 'FastAPI', 'Docker', 'Git', 'Pandas']
    },
    {
        key: 'data',
        icon: Database,
        skills: ['Veri Analizi', 'Feature Engineering', 'Model Evaluation', 'PostgreSQL', 'MongoDB']
    }
];

export default function SkillsPanel({ color }: SkillsPanelProps) {
    const t = useTranslations('skills');
    const t3d = useTranslations('resume3d.skills');

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
                    <Zap className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{t3d('title')}</h3>
                    <p className="text-sm text-white/40">{t3d('subtitle')}</p>
                </div>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3">
                {skillCategories.map((category, catIndex) => {
                    const Icon = category.icon;
                    return (
                        <motion.div
                            key={category.key}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + catIndex * 0.08 }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ background: `${color}15`, border: `1px solid ${color}20` }}
                                >
                                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                                </div>
                                <h4 className="text-sm font-medium text-white/80">
                                    {t(`categories.${category.key}`)}
                                </h4>
                            </div>

                            {/* Skills Chips */}
                            <div className="flex flex-wrap gap-1.5">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        key={skill}
                                        className="px-2 py-1 text-[11px] rounded-md bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white/80 transition-colors cursor-default"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.25 + catIndex * 0.08 + skillIndex * 0.02 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-4 gap-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                {[
                    { value: '25+', label: t('stats.technologies') },
                    { value: '15+', label: t('stats.projects') },
                    { value: '50K+', label: t('stats.codeLines') },
                    { value: '1000+', label: t('stats.learningHrs') }
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="text-center p-2 rounded-lg bg-white/[0.02]"
                    >
                        <div className="text-lg font-bold" style={{ color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
