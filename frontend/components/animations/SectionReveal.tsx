"use client";

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

const directionOffsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
};

/**
 * SectionReveal - Scroll-triggered reveal with blur, scale, and fade
 * Wraps content for cinematic section entrances
 */
export default function SectionReveal({
    children,
    className = "",
    delay = 0,
    direction = 'up',
}: SectionRevealProps) {
    const offset = directionOffsets[direction];

    const variants: Variants = {
        hidden: {
            opacity: 0,
            filter: 'blur(8px)',
            scale: 0.96,
            ...offset,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
