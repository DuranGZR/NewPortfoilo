"use client";

/**
 * NoiseTexture - SVG-based grain overlay for premium aesthetic
 * Ultra-subtle, adds depth without distraction
 */
export default function NoiseTexture() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{
                opacity: 0.035,
                mixBlendMode: 'overlay',
            }}
        >
            <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
