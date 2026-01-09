'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
] as const;

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    const switchLanguage = (newLocale: string) => {
        if (newLocale === locale) {
            setIsOpen(false);
            return;
        }

        startTransition(() => {
            // Remove current locale from pathname and add new one
            const pathWithoutLocale = pathname.replace(`/${locale}`, '');
            router.replace(`/${newLocale}${pathWithoutLocale}`);
            setIsOpen(false);
        });
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1a]/50 hover:bg-[#1a1a1a]/70 border border-[#819fa7]/20 hover:border-[#819fa7]/40 transition-all duration-200"
                aria-label="Change language"
            >
                <span className="text-base">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-[#f3f5f9]/80">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                    className={`w-4 h-4 text-[#819fa7]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 rounded-lg bg-secondary/95 backdrop-blur-xl border border-white/10 shadow-xl z-50 overflow-hidden"
                        >
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => switchLanguage(language.code)}
                                    disabled={isPending}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${language.code === locale
                                        ? 'bg-accent-cyan/10 text-accent-cyan'
                                        : 'text-text-primary hover:bg-white/5'
                                        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-2xl">{language.flag}</span>
                                    <div className="flex-1">
                                        <div className="font-medium">{language.name}</div>
                                        <div className="text-xs text-text-muted">{language.code.toUpperCase()}</div>
                                    </div>
                                    {language.code === locale && (
                                        <svg className="w-5 h-5 text-accent-cyan" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
