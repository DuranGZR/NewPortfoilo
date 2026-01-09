"use client";

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per character
    delay?: number; // initial delay in ms
    cursor?: boolean;
}

/**
 * TypewriterText - Character-by-character reveal animation
 * Creates dynamic typing effect with blinking cursor
 */
export default function TypewriterText({
    text,
    className = "",
    speed = 80,
    delay = 500,
    cursor = true,
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    // Cursor blink effect
    useEffect(() => {
        if (!cursor) return;

        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, [cursor]);

    return (
        <span className={className}>
            {displayText}
            {cursor && (
                <motion.span
                    className="inline-block w-[3px] h-[1em] bg-[#819fa7] ml-1 align-middle"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                />
            )}
        </span>
    );
}
