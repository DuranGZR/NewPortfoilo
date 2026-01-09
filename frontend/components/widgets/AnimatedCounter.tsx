"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    value,
    duration = 2000,
    className = ""
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState("0");

    // Extract numeric part and suffix
    const numericMatch = value.match(/^([\d.]+)(.*)$/);
    const targetNumber = numericMatch ? parseFloat(numericMatch[1]) : 0;
    const suffix = numericMatch ? numericMatch[2] : value;

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(targetNumber * eased);

            setDisplayValue(current.toString());

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setDisplayValue(targetNumber.toString());
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, targetNumber, duration]);

    return (
        <span ref={ref} className={className}>
            {displayValue}{suffix}
        </span>
    );
}
