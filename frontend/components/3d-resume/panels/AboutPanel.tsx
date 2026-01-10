'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles, Brain, TrendingUp, Code, MapPin, Briefcase } from 'lucide-react';

interface AboutPanelProps {
    color: string;
}

export default function AboutPanel({ color }: AboutPanelProps) {
    const t = useTranslations('about');
    const t3d = useTranslations('resume3d.about');

    const highlights = [
        { key: 'projects', icon: Code },
        { key: 'thinking', icon: Brain },
        { key: 'learning', icon: TrendingUp },
        { key: 'practical', icon: Sparkles },
    ];

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <motion.div
                className="flex items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* Avatar */}
                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                        border: `1px solid ${color}30`
                    }}
                >
                    <div
                        className="w-12 h-12 rounded-xl"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
                    />
                    {/* Glow effect */}
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`
                        }}
                    />
                </div>

                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">Duran Gezer</h3>
                    <p className="text-white/50 mt-1">AI/ML Engineer</p>
                    <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-sm text-white/40">İzmir, Türkiye</span>
                    </div>
                </div>
            </motion.div>

            {/* Bio */}
            <motion.div
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <p className="text-sm text-white/60 leading-relaxed">
                    {t('bio')}
                </p>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-3">
                {highlights.map((highlight, index) => {
                    const Icon = highlight.icon;
                    return (
                        <motion.div
                            key={highlight.key}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: `${color}15`, border: `1px solid ${color}20` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color }} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-white/90">
                                        {t(`highlights.items.${highlight.key}.title`)}
                                    </h4>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        {t(`highlights.items.${highlight.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Quote */}
            <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                <p className="text-white/30 italic text-sm">"{t('quote')}"</p>
            </motion.div>

            {/* Status Badges */}
            <motion.div
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                    <Briefcase className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-xs font-medium" style={{ color }}>
                        {t('status.available')}
                    </span>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="text-xs text-white/50">{t('status.graduating')}</span>
                </div>
            </motion.div>
        </div>
    );
}
