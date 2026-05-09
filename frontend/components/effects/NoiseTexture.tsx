"use client";

/**
 * NoiseTexture - SVG-based grain overlay for premium aesthetic
 * Optimized: Uses a repeating static SVG data URI instead of a full-screen dynamic SVG filter
 */
export default function NoiseTexture() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{
                opacity: 0.035,
                mixBlendMode: 'overlay',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
            }}
        />
    );
}
