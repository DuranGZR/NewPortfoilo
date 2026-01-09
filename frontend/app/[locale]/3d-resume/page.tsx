'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Monitor } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Dynamic import for 3D components (no SSR)
const World3D = dynamic(() => import('@/components/3d-resume/World3D'), {
    ssr: false,
    loading: () => <LoadingScreen />
});

function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center gap-6">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
                <Loader2 className="w-12 h-12 text-[#819fa7]" />
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#f3f5f9]/70 text-lg"
            >
                Dünya yükleniyor...
            </motion.p>
        </div>
    );
}

function MobileWarning() {
    const t = useTranslations('resume3d');

    return (
        <div className="fixed inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center gap-6 p-8 text-center md:hidden z-50">
            <Monitor className="w-16 h-16 text-[#819fa7]" />
            <h2 className="text-xl font-bold text-[#f3f5f9]">{t('mobileWarning')}</h2>
            <p className="text-[#f3f5f9]/60 max-w-sm">
                {t('mobileDescription')}
            </p>
            <Link
                href="/"
                className="mt-4 px-6 py-3 bg-[#819fa7] text-[#0d0d0d] rounded-lg font-medium hover:bg-[#819fa7]/90 transition-colors"
            >
                {t('backToSite')}
            </Link>
        </div>
    );
}

export default function Resume3DPage() {
    const t = useTranslations('resume3d');
    const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

    return (
        <div className="fixed inset-0 bg-[#0d0d0d] overflow-hidden">
            {/* Mobile Warning */}
            <MobileWarning />

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed top-6 left-6 z-50 hidden md:block"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#819fa7]/20 rounded-lg text-[#f3f5f9]/80 hover:text-[#f3f5f9] hover:border-[#819fa7]/40 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">{t('backToSite')}</span>
                </Link>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            >
                <div className="px-6 py-3 bg-[#1a1a1a]/80 backdrop-blur-lg border border-[#819fa7]/20 rounded-full">
                    <p className="text-sm text-[#f3f5f9]/60">
                        {t('instructions')}
                    </p>
                </div>
            </motion.div>

            {/* 3D World */}
            <Suspense fallback={<LoadingScreen />}>
                <World3D
                    selectedIsland={selectedIsland}
                    onIslandSelect={setSelectedIsland}
                />
            </Suspense>
        </div>
    );
}
