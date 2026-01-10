'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import HolographicEffect from './HolographicEffect';
import { AboutPanel, EducationPanel, ExperiencePanel, SkillsPanel, ProjectsPanel } from './panels';

// Island data with colors
const islandConfig: Record<string, { color: string; title: string; subtitle: string }> = {
    about: { color: '#819fa7', title: 'about', subtitle: 'about' },
    education: { color: '#6b8a92', title: 'education', subtitle: 'education' },
    experience: { color: '#5b7a82', title: 'experience', subtitle: 'experience' },
    skills: { color: '#7aa3ab', title: 'skills', subtitle: 'skills' },
    projects: { color: '#5b6e74', title: 'projects', subtitle: 'projects' },
};

interface DetailPanelProps {
    islandId: string | null;
    onClose: () => void;
}

export default function DetailPanel({ islandId, onClose }: DetailPanelProps) {
    const t = useTranslations('resume3d');
    const config = islandId ? islandConfig[islandId] : null;

    // Render the appropriate panel based on islandId
    const renderPanelContent = () => {
        if (!islandId || !config) return null;

        switch (islandId) {
            case 'about':
                return <AboutPanel color={config.color} />;
            case 'education':
                return <EducationPanel color={config.color} />;
            case 'experience':
                return <ExperiencePanel color={config.color} />;
            case 'skills':
                return <SkillsPanel color={config.color} />;
            case 'projects':
                return <ProjectsPanel color={config.color} />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {config && islandId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Center container for the line and panel */}
                    <div className="relative flex items-center justify-center">

                        {/* Phase 1: Vertical line that grows from center */}
                        <motion.div
                            className="absolute w-[2px] rounded-full"
                            style={{
                                background: `linear-gradient(to top, transparent, ${config.color}, transparent)`,
                                boxShadow: `0 0 20px ${config.color}, 0 0 40px ${config.color}50`,
                            }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: [0, 300, 300, 0],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                times: [0, 0.4, 0.6, 1],
                                ease: "easeInOut",
                            }}
                        />

                        {/* Phase 2: Horizontal line that expands */}
                        <motion.div
                            className="absolute h-[2px] rounded-full"
                            style={{
                                background: `linear-gradient(to right, transparent, ${config.color}, transparent)`,
                                boxShadow: `0 0 15px ${config.color}`,
                            }}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: [0, 0, 600, 600],
                                opacity: [0, 0, 1, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                times: [0, 0.35, 0.7, 1],
                                ease: "easeInOut",
                            }}
                        />

                        {/* Phase 3: Panel that expands from center */}
                        <motion.div
                            className="relative w-full max-w-2xl"
                            onClick={(e) => e.stopPropagation()}
                            initial={{
                                scaleX: 0,
                                scaleY: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scaleX: [0, 0, 0.02, 1],
                                scaleY: [0, 0, 1, 1],
                                opacity: [0, 0, 1, 1],
                            }}
                            exit={{
                                scaleX: 0,
                                scaleY: 0,
                                opacity: 0,
                                transition: { duration: 0.25, ease: "easeIn" }
                            }}
                            transition={{
                                duration: 0.9,
                                times: [0, 0.3, 0.5, 1],
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ originX: 0.5, originY: 0.5 }}
                        >
                            <HolographicEffect isActive={!!islandId} color={config.color}>
                                <div
                                    className="overflow-hidden rounded-2xl"
                                    style={{
                                        background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
                                        border: `1px solid ${config.color}30`,
                                        boxShadow: `
                                            0 0 60px ${config.color}15,
                                            0 25px 50px rgba(0,0,0,0.8),
                                            inset 0 1px 0 ${config.color}10
                                        `
                                    }}
                                >
                                    {/* Top accent line */}
                                    <motion.div
                                        className="h-[2px]"
                                        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 0.7, duration: 0.4 }}
                                    />

                                    {/* Header with close button */}
                                    <motion.div
                                        className="flex items-center justify-between p-5 pb-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-1 h-6 rounded-full"
                                                style={{ background: config.color }}
                                            />
                                            <h2 className="text-lg font-semibold text-white">
                                                {t(`${islandId}.title`)}
                                            </h2>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-white/50" />
                                        </button>
                                    </motion.div>

                                    {/* Dynamic Panel Content */}
                                    <motion.div
                                        className="p-5 max-h-[65vh] overflow-y-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.65 }}
                                    >
                                        {renderPanelContent()}
                                    </motion.div>

                                    {/* Bottom accent */}
                                    <div
                                        className="h-px"
                                        style={{ background: `linear-gradient(90deg, transparent, ${config.color}30, transparent)` }}
                                    />
                                </div>
                            </HolographicEffect>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
