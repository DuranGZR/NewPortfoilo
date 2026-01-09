"use client";

import { motion } from 'framer-motion';

/**
 * GradientMesh - Animated gradient blobs for Hero background
 * Creates organic, fluid motion with overlapping gradients
 */
export default function GradientMesh() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary blob - top left */}
            <motion.div
                className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(129, 159, 167, 0.12) 0%, transparent 60%)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary blob - bottom right */}
            <motion.div
                className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(91, 110, 116, 0.1) 0%, transparent 60%)',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* Tertiary blob - center */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(129, 159, 167, 0.06) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Accent blob - floating */}
            <motion.div
                className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(129, 159, 167, 0.08) 0%, transparent 70%)',
                }}
                animate={{
                    x: [0, 80, 0],
                    y: [0, -60, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
