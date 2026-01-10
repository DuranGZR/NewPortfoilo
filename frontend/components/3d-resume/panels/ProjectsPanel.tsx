'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Rocket, Github, ExternalLink, Eye, Camera, Brain, Activity, Gamepad2, DollarSign, Pill, Bus } from 'lucide-react';

interface ProjectsPanelProps {
    color: string;
}

const projects = [
    {
        key: 'visualAI',
        icon: Camera,
        techs: ['Python', 'Ollama', 'LLaVA', 'OpenCV'],
        github: 'https://github.com/DuranGZR/Real-Time-Visual-Understanding'
    },
    {
        key: 'handwriting',
        icon: Brain,
        techs: ['TensorFlow', 'Keras', 'CNN', 'OpenCV'],
        github: 'https://github.com/DuranGZR/El_Yazisi_Tahmin'
    },
    {
        key: 'diabetes',
        icon: Activity,
        techs: ['Scikit-learn', 'Pandas', 'NumPy'],
        github: 'https://github.com/DuranGZR/Diabetes_Prediction'
    },
    {
        key: 'xoxBot',
        icon: Gamepad2,
        techs: ['Python', 'Q-Learning', 'RL'],
        github: 'https://github.com/DuranGZR/XOX_Bot'
    },
    {
        key: 'salary',
        icon: DollarSign,
        techs: ['Scikit-learn', 'Feature Eng.'],
        github: 'https://github.com/DuranGZR/Salary_Prediction_with_Mahcine_Learning'
    },
    {
        key: 'pharmacy',
        icon: Pill,
        techs: ['C#', 'Database'],
        github: 'https://github.com/DuranGZR/Pharmacy_Automation'
    },
];

export default function ProjectsPanel({ color }: ProjectsPanelProps) {
    const t = useTranslations('projects');
    const t3d = useTranslations('resume3d.projects');

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
                    <Rocket className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{t3d('title')}</h3>
                    <p className="text-sm text-white/40">{t3d('subtitle')}</p>
                </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-1">
                {projects.map((project, index) => {
                    const Icon = project.icon;
                    return (
                        <motion.div
                            key={project.key}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at top left, ${color}10 0%, transparent 50%)`
                                }}
                            />

                            {/* Icon */}
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                                    style={{ background: `${color}15`, border: `1px solid ${color}20` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color }} />
                                </div>

                                {/* GitHub link */}
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github className="w-3.5 h-3.5 text-white/50 hover:text-white/80" />
                                </a>
                            </div>

                            {/* Title */}
                            <h4 className="text-sm font-medium text-white/90 mb-1 line-clamp-2">
                                {t(`items.${project.key}.title`)}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-white/40 mb-3 line-clamp-2">
                                {t(`items.${project.key}.tagline`)}
                            </p>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-1">
                                {project.techs.slice(0, 3).map((tech, techIndex) => (
                                    <span
                                        key={tech}
                                        className="px-1.5 py-0.5 text-[10px] rounded bg-white/[0.04] text-white/50"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.techs.length > 3 && (
                                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-white/[0.04] text-white/40">
                                        +{project.techs.length - 3}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* View all link */}
            <motion.div
                className="text-center pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <a
                    href="https://github.com/DuranGZR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                    <Github className="w-3.5 h-3.5" />
                    Tüm projeler için GitHub'ı ziyaret edin
                    <ExternalLink className="w-3 h-3" />
                </a>
            </motion.div>
        </div>
    );
}
