'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Suspense } from 'react';
import Island from './Island';
import Environment3D from './Environment3D';
import CameraController from './CameraController';
import DetailPanel from './DetailPanel';

// Define types locally
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

// Island data - ana sitedeki verilerle senkronize
const islands: Island3DData[] = [
    {
        id: 'about',
        title: 'Hakkımda',
        position: [0, 2, -8],
        color: '#819fa7',
        icon: 'user',
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
        position: [-10, 0, 3],
        color: '#6b8a92',
        icon: 'book',
        items: [
            { title: 'Bilgisayar Mühendisliği Lisans', description: '', date: '2021 - 2025' },
            { title: 'Derin Öğrenme Uzmanlığı', description: '', date: '2024' },
            { title: 'AWS Sertifikalı ML', description: '', date: '2024' },
        ],
    },
    {
        id: 'experience',
        title: 'Deneyim',
        position: [-6, -1, 10],
        color: '#5b7a82',
        icon: 'briefcase',
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
        position: [10, 0, 3],
        color: '#7aa3ab',
        icon: 'zap',
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
        position: [6, -1, 10],
        color: '#5b6e74',
        icon: 'rocket',
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
}

export default function World3D({ selectedIsland, onIslandSelect }: World3DProps) {
    return (
        <>
            <Canvas
                camera={{ position: [0, 10, 28], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
                style={{ background: '#0d0d0d' }}
            >
                <Suspense fallback={null}>
                    {/* Lighting - Soft and elegant */}
                    <ambientLight intensity={0.4} />
                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={0.6}
                        color="#f3f5f9"
                    />
                    <pointLight position={[-15, 10, -10]} intensity={0.3} color="#819fa7" distance={50} />
                    <pointLight position={[15, 10, 10]} intensity={0.3} color="#819fa7" distance={50} />

                    {/* Environment */}
                    <Environment3D />

                    {/* Islands with subtle Float animation */}
                    {islands.map((island) => (
                        <Float
                            key={island.id}
                            speed={1}
                            rotationIntensity={0.02}
                            floatIntensity={0.3}
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
                                onClick={() => onIslandSelect(island.id)}
                            />
                        </Float>
                    ))}

                    {/* Camera Controller */}
                    <CameraController
                        selectedIsland={selectedIsland}
                        islands={islands}
                    />

                    {/* Controls */}
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        minDistance={15}
                        maxDistance={50}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI / 2.2}
                        dampingFactor={0.05}
                        rotateSpeed={0.4}
                        enableDamping={true}
                    />
                </Suspense>
            </Canvas>

            {/* Detail Panel */}
            <DetailPanel
                islandId={selectedIsland}
                onClose={() => onIslandSelect(null)}
            />
        </>
    );
}
