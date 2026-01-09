"use client";

import { motion } from 'framer-motion';

interface SectionDividerProps {
    className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
    return (
        <div className={`relative py-12 ${className}`}>
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative max-w-2xl mx-auto"
            >
                {/* Main gradient line */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#819fa7]/50 to-transparent" />

                {/* Center accent dot */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#819fa7]/60"
                />
            </motion.div>
        </div>
    );
}
