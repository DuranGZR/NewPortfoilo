"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

/**
 * GlassCard - Frosted glass morphism card component
 * Premium glassmorphism with blur, transparency, and subtle glow
 */
export default function GlassCard({
    children,
    className = "",
    hover = true,
    glow = false,
}: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                "relative rounded-2xl overflow-hidden",
                "bg-[#1a1a1a]/40 backdrop-blur-xl",
                "border border-[#819fa7]/10",
                hover && "transition-all duration-300",
                className
            )}
            whileHover={hover ? {
                y: -4,
                borderColor: 'rgba(129, 159, 167, 0.25)',
                boxShadow: glow
                    ? '0 0 40px rgba(129, 159, 167, 0.15), 0 20px 40px -20px rgba(0, 0, 0, 0.5)'
                    : '0 20px 40px -20px rgba(0, 0, 0, 0.5)',
            } : undefined}
            transition={{ duration: 0.3 }}
        >
            {/* Inner glow effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(129, 159, 167, 0.06), transparent 40%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
