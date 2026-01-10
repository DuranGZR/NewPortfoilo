'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HolographicEffectProps {
    children: React.ReactNode;
    isActive: boolean;
    color?: string;
}

export default function HolographicEffect({
    children,
    isActive,
    color = '#819fa7'
}: HolographicEffectProps) {
    const [showGlitch, setShowGlitch] = useState(false);
    const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Trigger glitch effect on activation
    useEffect(() => {
        if (isActive) {
            setShowGlitch(true);
            glitchTimeoutRef.current = setTimeout(() => {
                setShowGlitch(false);
            }, 400);
        }
        return () => {
            if (glitchTimeoutRef.current) {
                clearTimeout(glitchTimeoutRef.current);
            }
        };
    }, [isActive]);

    return (
        <div className="holographic-container relative">
            {/* CSS for effects */}
            <style jsx global>{`
                @keyframes scanlines {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 4px; }
                }
                
                @keyframes glitch-1 {
                    0%, 100% { 
                        transform: translateX(0) skewX(0);
                        filter: hue-rotate(0deg);
                    }
                    10% { 
                        transform: translateX(-3px) skewX(-0.5deg);
                        filter: hue-rotate(90deg);
                    }
                    20% { 
                        transform: translateX(3px) skewX(0.5deg);
                        filter: hue-rotate(-90deg);
                    }
                    30% { 
                        transform: translateX(-2px) skewX(-0.3deg);
                        filter: hue-rotate(45deg);
                    }
                    40% { 
                        transform: translateX(2px) skewX(0.3deg);
                        filter: hue-rotate(-45deg);
                    }
                    50% { 
                        transform: translateX(-1px) skewX(-0.1deg);
                        filter: hue-rotate(0deg);
                    }
                    60%, 100% { 
                        transform: translateX(0) skewX(0);
                        filter: hue-rotate(0deg);
                    }
                }
                
                @keyframes chromatic-shift {
                    0%, 100% {
                        text-shadow: none;
                        box-shadow: none;
                    }
                    25% {
                        text-shadow: -2px 0 #ff0000, 2px 0 #00ffff;
                    }
                    50% {
                        text-shadow: 2px 0 #ff0000, -2px 0 #00ffff;
                    }
                    75% {
                        text-shadow: -1px 0 #ff0000, 1px 0 #00ffff;
                    }
                }
                
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    92% { opacity: 1; }
                    93% { opacity: 0.8; }
                    94% { opacity: 1; }
                    95% { opacity: 0.9; }
                    96% { opacity: 1; }
                }
                
                .holographic-scanlines {
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.1) 2px,
                        rgba(0, 0, 0, 0.1) 4px
                    );
                    animation: scanlines 0.5s linear infinite;
                }
                
                .holographic-glitch {
                    animation: glitch-1 0.4s ease-out;
                }
                
                .holographic-flicker {
                    animation: flicker 4s infinite;
                }
                
                .holographic-chromatic {
                    animation: chromatic-shift 0.3s ease-out;
                }
            `}</style>

            {/* Main content with effects */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                    relative
                    ${showGlitch ? 'holographic-glitch holographic-chromatic' : ''}
                    holographic-flicker
                `}
            >
                {children}

                {/* Scanlines overlay */}
                <div
                    className="absolute inset-0 pointer-events-none holographic-scanlines opacity-30 rounded-2xl"
                    style={{ mixBlendMode: 'overlay' }}
                />

                {/* Edge glow effect */}
                <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                        boxShadow: `inset 0 0 30px ${color}10, inset 0 1px 0 ${color}20`,
                    }}
                />

                {/* Holographic shimmer */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showGlitch ? 0.3 : 0 }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(45deg, transparent 30%, ${color}20 50%, transparent 70%)`,
                            transform: 'translateX(-100%)',
                            animation: showGlitch ? 'shimmer 0.5s ease-out forwards' : 'none',
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Static noise on glitch */}
            {showGlitch && (
                <motion.div
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        opacity: 0.1,
                        mixBlendMode: 'overlay',
                    }}
                />
            )}

            {/* Additional shimmer keyframes */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
