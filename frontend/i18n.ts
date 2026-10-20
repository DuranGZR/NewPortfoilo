import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'tr';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

function deepMerge(target: any, source: any): any {
    if (!source || typeof source !== 'object') return target;
    const output = { ...target };
    for (const key of Object.keys(source)) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key]) &&
            key in target &&
            typeof target[key] === 'object' &&
            !Array.isArray(target[key])
        ) {
            output[key] = deepMerge(target[key], source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
    // Await requestLocale since it's a Promise in Next.js 15+
    const requested = await requestLocale;

    // Fallback to default locale if undefined or invalid
    const locale = requested && locales.includes(requested as Locale)
        ? requested
        : defaultLocale;

    const baseMessages = (await import(`./messages/${locale}.json`)).default;

    try {
        const res = await fetch(`${API_URL}/translations/${locale}`, {
            next: { revalidate: 10 }
        });
        if (res.ok) {
            const data = await res.json();
            if (data?.content && Object.keys(data.content).length > 0) {
                return {
                    locale,
                    messages: deepMerge(baseMessages, data.content)
                };
            }
        }
    } catch {
        // Silently fallback to base local messages if backend is unreachable
    }

    return {
        locale,
        messages: baseMessages
    };
});
