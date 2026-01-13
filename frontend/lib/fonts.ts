import { Outfit, Sora, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Display font - Premium look for headings
export const displayFont = Outfit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-display',
    display: 'swap',
});

// Body font - Clean, readable for paragraphs
export const bodyFont = Sora({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-body',
    display: 'swap',
});

// Mono font - For code snippets
export const monoFont = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-mono',
    display: 'swap',
});

// Combined className for easy application
export const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
