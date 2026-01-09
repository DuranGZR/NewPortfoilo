'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Types
interface IslandItem {
    title: string;
    description: string;
    date?: string;
    tags?: string[];
}

interface Island3DData {
    id: string;
    title: string;
    position: [number, number, number];
    color: string;
    icon: string;
    items: IslandItem[];
}

// Island data - ana sitedeki verilerle senkronize
const islands: Island3DData[] = [
    {
        id: 'about',
        title: 'Hakkımda',
        position: [0, 2, -8],
        color: '#819fa7',
        icon: 'user',
        items: [
            { title: '', description: '' },
            { title: '', description: '' },
            { title: '', description: '' },
            { title: '', description: '' },
        ],
    },
    {
        id: 'education',
        title: 'Eğitim',
        position: [-10, 0, 3],
        color: '#6b8a92',
        icon: 'book',
        items: [
            { title: '', description: '', date: '2021 - 2025' },
            { title: '', description: '', date: '2024' },
            { title: '', description: '', date: '2024' },
        ],
    },
    {
        id: 'experience',
        title: 'Deneyim',
        position: [-6, -1, 10],
        color: '#5b7a82',
        icon: 'briefcase',
        items: [
            { title: '', description: '', date: 'Yaz 2024' },
            { title: '', description: '', date: '2023 - Devam' },
            { title: '', description: '', date: 'Mart 2024' },
            { title: '', description: '', date: 'Kasım 2023' },
        ],
    },
    {
        id: 'skills',
        title: 'Yetenekler',
        position: [10, 0, 3],
        color: '#7aa3ab',
        icon: 'zap',
        items: [
            { title: '', description: '', tags: ['TensorFlow', 'PyTorch', 'Scikit-learn'] },
            { title: '', description: '', tags: ['Python', 'TypeScript', 'JavaScript'] },
            { title: '', description: '', tags: ['React', 'Next.js', 'Docker'] },
            { title: '', description: '', tags: ['Pandas', 'PostgreSQL', 'MongoDB'] },
        ],
    },
    {
        id: 'projects',
        title: 'Projeler',
        position: [6, -1, 10],
        color: '#5b6e74',
        icon: 'rocket',
        items: [
            { title: '', description: '', tags: ['NLP', 'Transformer', '%87 Doğruluk'] },
            { title: '', description: '', tags: ['ML', 'IoT', '%92 Hassasiyet'] },
            { title: '', description: '', tags: ['AI', 'DevTools', '%40 Hız'] },
            { title: '', description: '', tags: ['YOLO', 'CV', '%95 Doğruluk'] },
        ],
    },
];

interface DetailPanelProps {
    islandId: string | null;
    onClose: () => void;
}

export default function DetailPanel({ islandId, onClose }: DetailPanelProps) {
    const t = useTranslations('resume3d');

    const island = islandId ? islands.find((i) => i.id === islandId) : null;

    return (
        <AnimatePresence>
            {island && (
                <motion.div
                    initial={{ opacity: 0, x: 80, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 80, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 250 }}
                    className="fixed top-1/2 right-8 -translate-y-1/2 w-[400px] max-h-[70vh] z-50 hidden md:block"
                >
                    {/* Main card */}
                    <div className="bg-[#0d0d0d] border border-[#819fa7]/20 rounded-2xl overflow-hidden shadow-2xl shadow-[#819fa7]/5">
                        {/* Header */}
                        <div className="relative p-6 pb-4 border-b border-[#819fa7]/10">
                            {/* Accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1"
                                style={{ background: `linear-gradient(90deg, transparent, ${island.color}, transparent)` }}
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Icon container */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${island.color}15`, border: `1px solid ${island.color}30` }}
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full"
                                            style={{ backgroundColor: island.color }}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold text-[#f3f5f9]">
                                            {t(`${island.id}.title`)}
                                        </h2>
                                        <p className="text-sm text-[#819fa7]">
                                            {t(`${island.id}.subtitle`)}
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={onClose}
                                    className="p-2 rounded-lg bg-[#1a1a1a] border border-[#819fa7]/10 hover:border-[#819fa7]/30 transition-colors"
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-4 h-4 text-[#819fa7]" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-3">
                                {island.items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.06 }}
                                        className="p-4 rounded-xl bg-[#1a1a1a]/50 border border-[#819fa7]/5 hover:border-[#819fa7]/15 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <h3 className="font-medium text-[#f3f5f9]">
                                                {t(`${island.id}.items.${index}.title`)}
                                            </h3>
                                            {item.date && (
                                                <span className="flex items-center gap-1 text-xs text-[#819fa7] bg-[#819fa7]/10 px-2 py-1 rounded-md whitespace-nowrap">
                                                    <Calendar className="w-3 h-3" />
                                                    {item.date}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-[#f3f5f9]/50 leading-relaxed">
                                            {t(`${island.id}.items.${index}.description`)}
                                        </p>

                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {item.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-2 py-0.5 text-xs rounded bg-[#819fa7]/8 text-[#819fa7]/80 border border-[#819fa7]/10"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer accent */}
                        <div
                            className="h-0.5"
                            style={{ background: `linear-gradient(90deg, transparent, ${island.color}40, transparent)` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
