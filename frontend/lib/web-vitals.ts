/**
 * Web Vitals tracking utility
 * Monitors Core Web Vitals (LCP, INP, CLS, FCP, TTFB)
 */

type MetricType = 'CLS' | 'FCP' | 'LCP' | 'TTFB' | 'INP';

interface WebVitalMetric {
    name: MetricType;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    delta: number;
    id: string;
}

// Thresholds based on Google's Web Vitals guidelines
const thresholds: Record<MetricType, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
};

function getRating(name: MetricType, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = thresholds[name];
    if (value <= threshold.good) return 'good';
    if (value > threshold.poor) return 'poor';
    return 'needs-improvement';
}

function logMetric(metric: WebVitalMetric) {
    const color = {
        good: '#10b981',
        'needs-improvement': '#f59e0b',
        poor: '#ef4444',
    }[metric.rating];

    console.log(
        `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
        `color: ${color}; font-weight: bold;`
    );
}

export function reportWebVitals(onPerfEntry?: (metric: WebVitalMetric) => void) {
    if (typeof window === 'undefined') return;

    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        const handleMetric = (metric: { name: string; value: number; delta: number; id: string }) => {
            const name = metric.name as MetricType;
            const webVitalMetric: WebVitalMetric = {
                name,
                value: metric.value,
                rating: getRating(name, metric.value),
                delta: metric.delta,
                id: metric.id,
            };

            logMetric(webVitalMetric);
            onPerfEntry?.(webVitalMetric);
        };

        onCLS(handleMetric);
        onFCP(handleMetric);
        onLCP(handleMetric);
        onTTFB(handleMetric);
        onINP(handleMetric);
    }).catch(() => {
        console.log('[Web Vitals] Library not available');
    });
}

export function initWebVitals() {
    if (process.env.NODE_ENV === 'development') {
        reportWebVitals();
    }
}
