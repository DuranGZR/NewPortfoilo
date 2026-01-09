'use client';

import { NextIntlClientProvider } from 'next-intl';

// No Navigation, Footer, or other overlays for the 3D Resume page
// This layout only includes essential providers
export default function Resume3DLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-screen overflow-hidden">
            {children}
        </div>
    );
}
