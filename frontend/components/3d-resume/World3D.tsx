'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import Island from './Island';
import Environment3D from './Environment3D';
import CameraController from './CameraController';
import DetailPanel from './DetailPanel';
import IntroSequence from './IntroSequence';

interface IslandItem {
    title: string;
    description: string;
    date?: string;
    tags?: string[];
}

interface Island3DData {
    id: string;
    title: string;
    position: [number, number, number];
    color: string;
    icon: string;
    items: IslandItem[];
}

const islands: Island3DData[] = [
    {
        id: 'about',
        title: 'Hakkımda',
        position: [0, 1, -8],
        color: '#819fa7',
        icon: 'about',
        items: [
            { title: 'Bilgisayar Mühendisliğinden Hesaplamalı Zekaya', description: '' },
            { title: 'Üretim Odaklı Projeler', description: '' },
            { title: 'Sistem Düşünürü', description: '' },
            { title: 'Sürekli Öğrenen', description: '' },
        ],
    },
    {
        id: 'education',
        title: 'Eğitim',
        position: [-10, 0, 4],
        color: '#7a9ea6',
        icon: 'education',
        items: [
            { title: 'Bilgisayar Mühendisliği Lisans', description: '', date: '2021 - 2025' },
            { title: 'Derin Öğrenme Uzmanlığı', description: '', date: '2024' },
            { title: 'AWS Sertifikalı ML', description: '', date: '2024' },
        ],
    },
    {
        id: 'experience',
        title: 'Deneyim',
        position: [-6, -0.5, 12],
        color: '#6a8e96',
        icon: 'experience',
        items: [
            { title: 'AI Mühendisliği Stajyeri', description: '', date: 'Yaz 2024' },
            { title: 'Serbest ML Geliştirici', description: '', date: '2023 - Devam' },
            { title: 'AI Hackathon 2024 - 2. Yer', description: '', date: 'Mart 2024' },
            { title: 'Üniversite ML Yarışması - 1. Yer', description: '', date: 'Kasım 2023' },
        ],
    },
    {
        id: 'skills',
        title: 'Yetenekler',
        position: [10, 0, 4],
        color: '#8ab0b8',
        icon: 'skills',
        items: [
            { title: 'AI ve Makine Öğrenmesi', description: '', tags: ['TensorFlow', 'PyTorch', 'Scikit-learn'] },
            { title: 'Programlama', description: '', tags: ['Python', 'TypeScript', 'JavaScript'] },
            { title: 'Frameworkler ve Araçlar', description: '', tags: ['React', 'Next.js', 'Docker'] },
            { title: 'Veri ve Analitik', description: '', tags: ['Pandas', 'PostgreSQL', 'MongoDB'] },
        ],
    },
    {
        id: 'projects',
        title: 'Projeler',
        position: [6, -0.5, 12],
        color: '#5a7e86',
        icon: 'projects',
        items: [
            { title: 'Sosyal Medya Duygu Analizi Motoru', description: '', tags: ['NLP', 'Transformer'] },
            { title: 'Kestirimci Bakım Sistemi', description: '', tags: ['ML', 'IoT'] },
            { title: 'Kod İnceleme Asistanı', description: '', tags: ['AI', 'DevTools'] },
            { title: 'Depo Görüş Sistemi', description: '', tags: ['YOLO', 'CV'] },
        ],
    },
];

interface World3DProps {
    selectedIsland: string | null;
    onIslandSelect: (id: string | null) => void;
    introComplete?: boolean;
    skipIntro?: boolean;
    onIntroComplete?: () => void;
}

// Tooltip descriptions for each island
const tooltipDescriptions: Record<string, string> = {
    about: 'Kim olduğumu ve vizyonumu keşfet',
    education: 'Akademik geçmişim ve sertifikalarım',
    experience: 'Aldığım eğitimler ve sertifikalar',
    skills: 'Teknik yeteneklerim ve araçlar',
    projects: 'Geliştirdiğim AI/ML projeleri',
};

export default function World3D({
    selectedIsland,
    onIslandSelect,
    introComplete = true,
    skipIntro = false,
    onIntroComplete
}: World3DProps) {
    const [internalIntroComplete, setInternalIntroComplete] = useState(introComplete);
    const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const orbitControlsRef = useRef<any>(null);

    // Sync intro state
    useEffect(() => {
        setInternalIntroComplete(introComplete);
    }, [introComplete]);

    // Handle intro completion
    const handleIntroComplete = () => {
        setInternalIntroComplete(true);
        onIntroComplete?.();
    };

    // Handle island hover
    const handleIslandHover = (islandId: string, isHovered: boolean, position: { x: number; y: number }) => {
        if (isHovered) {
            setHoveredIsland(islandId);
            setTooltipPosition(position);
        } else if (hoveredIsland === islandId) {
            setHoveredIsland(null);
        }
    };

    // Disable orbit controls during intro
    useEffect(() => {
        if (orbitControlsRef.current) {
            orbitControlsRef.current.enabled = internalIntroComplete;
        }
    }, [internalIntroComplete]);

    return (
        <>
            <Canvas
                camera={{ position: [0, 80, 200], fov: 55 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
                style={{ background: '#050505' }}
                onPointerMove={(e) => {
                    if (hoveredIsland) {
                        setTooltipPosition({ x: e.clientX, y: e.clientY });
                    }
                }}
            >
                <Suspense fallback={null}>
                    {/* Clean lighting setup */}
                    <ambientLight intensity={0.25} color="#e0e8ec" />

                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={0.5}
                        color="#f5f8fa"
                    />

                    <pointLight
                        position={[-15, 10, -10]}
                        intensity={0.2}
                        color="#819fa7"
                        distance={50}
                    />
                    <pointLight
                        position={[15, 8, 10]}
                        intensity={0.15}
                        color="#819fa7"
                        distance={40}
                    />

                    {/* Environment */}
                    <Environment3D />

                    {/* Intro Sequence */}
                    {!internalIntroComplete && (
                        <IntroSequence
                            onComplete={handleIntroComplete}
                            skip={skipIntro}
                        />
                    )}

                    {/* Islands */}
                    {islands.map((island) => (
                        <Float
                            key={island.id}
                            speed={1.2}
                            rotationIntensity={0.01}
                            floatIntensity={0.2}
                            floatingRange={[-0.05, 0.05]}
                        >
                            <Island
                                id={island.id}
                                title={island.title}
                                position={island.position}
                                color={island.color}
                                icon={island.icon}
                                items={island.items}
                                isSelected={selectedIsland === island.id}
                                onClick={() => internalIntroComplete && onIslandSelect(island.id)}
                                onHover={(isHovered, pos) => handleIslandHover(island.id, isHovered, pos)}
                            />
                        </Float>
                    ))}

                    {/* Camera Controller - only active after intro */}
                    {internalIntroComplete && (
                        <CameraController
                            selectedIsland={selectedIsland}
                            islands={islands}
                            introComplete={internalIntroComplete}
                        />
                    )}

                    {/* Controls - disabled during intro */}
                    <OrbitControls
                        ref={orbitControlsRef}
                        enabled={internalIntroComplete && !selectedIsland}
                        enablePan={false}
                        enableZoom={true}
                        minDistance={18}
                        maxDistance={50}
                        minPolarAngle={Math.PI / 5}
                        maxPolarAngle={Math.PI / 2.1}
                        dampingFactor={0.05}
                        rotateSpeed={0.4}
                        enableDamping={true}
                    />
                </Suspense>
            </Canvas>

            {/* Tooltip */}
            {hoveredIsland && !selectedIsland && internalIntroComplete && (
                <div
                    className="fixed pointer-events-none z-50 transition-opacity duration-150"
                    style={{
                        left: tooltipPosition.x + 15,
                        top: tooltipPosition.y + 15,
                    }}
                >
                    <div
                        className="px-4 py-3 rounded-xl backdrop-blur-md border max-w-[200px]"
                        style={{
                            background: 'rgba(8, 8, 8, 0.9)',
                            borderColor: islands.find(i => i.id === hoveredIsland)?.color + '40' || 'rgba(255,255,255,0.1)',
                            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${islands.find(i => i.id === hoveredIsland)?.color}20`
                        }}
                    >
                        <div
                            className="text-sm font-medium mb-1"
                            style={{ color: islands.find(i => i.id === hoveredIsland)?.color || '#fff' }}
                        >
                            {islands.find(i => i.id === hoveredIsland)?.title}
                        </div>
                        <div className="text-xs text-white/50">
                            {tooltipDescriptions[hoveredIsland]}
                        </div>
                        <div className="text-[10px] text-white/30 mt-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
                            Tıkla ve keşfet
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Panel */}
            <DetailPanel
                islandId={selectedIsland}
                onClose={() => onIslandSelect(null)}
            />
        </>
    );
}
