'use client';

import { usePathname } from 'next/navigation';

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();

    // Check if we're on the 3D resume page
    const is3DResumePage = pathname?.includes('/3d-resume');

    // If on 3D resume page, don't render any overlays (Navigation, Footer, etc.)
    if (is3DResumePage) {
        return null;
    }

    return <>{children}</>;
}
