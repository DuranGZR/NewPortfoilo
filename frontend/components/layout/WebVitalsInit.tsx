"use client";

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/web-vitals';

/**
 * WebVitalsInit - Client component to initialize Web Vitals tracking
 */
export default function WebVitalsInit() {
    useEffect(() => {
        initWebVitals();
    }, []);

    return null;
}
