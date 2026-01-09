import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'tr';

export default getRequestConfig(async ({ requestLocale }) => {
    // Await requestLocale since it's a Promise in Next.js 15+
    const requested = await requestLocale;

    // Fallback to default locale if undefined or invalid
    const locale = requested && locales.includes(requested as Locale)
        ? requested
        : defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});
