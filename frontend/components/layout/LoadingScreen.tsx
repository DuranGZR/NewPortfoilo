"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * LoadingScreen - Premium animated loader
 * Full-screen with logo animation and fade out
 */
export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 300);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        // Fallback: hide after 2s
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0d0d0d]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center gap-8">
                        {/* Animated Logo/Text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative"
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-[#819fa7]/20 blur-3xl rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Logo text */}
                            <motion.h1
                                className="relative text-4xl md:text-5xl font-display font-bold text-gradient"
                                animate={{
                                    textShadow: [
                                        '0 0 20px rgba(129, 159, 167, 0.3)',
                                        '0 0 40px rgba(129, 159, 167, 0.5)',
                                        '0 0 20px rgba(129, 159, 167, 0.3)',
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                DG
                            </motion.h1>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="w-48 h-0.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#819fa7] to-[#5b6e74] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Loading dots */}
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-[#819fa7]/50"
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
