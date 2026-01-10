'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface IslandItem {
    title: string;
    description: string;
    date?: string;
    tags?: string[];
}

interface IslandProps {
    id: string;
    title: string;
    position: [number, number, number];
    color: string;
    icon: string;
    items: IslandItem[];
    isSelected: boolean;
    onClick: () => void;
    onHover?: (isHovered: boolean, position: { x: number; y: number }) => void;
}

export default function Island({
    id,
    title,
    position,
    color,
    isSelected,
    onClick,
    onHover
}: IslandProps) {
    const groupRef = useRef<THREE.Group>(null);
    const platformRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const isActive = isSelected || hovered;

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (groupRef.current) {
            // Subtle scale on hover
            const targetScale = isActive ? 1.03 : 1;
            groupRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.08
            );
        }

        if (platformRef.current) {
            // Gentle breathing
            platformRef.current.position.y = Math.sin(time * 1.5 + position[0]) * 0.02;
        }

        if (ringRef.current) {
            // Slow ring rotation
            ringRef.current.rotation.z = time * 0.2;
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
                // Get screen position for tooltip
                if (onHover) {
                    const rect = (e.target as any)?.domElement?.getBoundingClientRect?.() || { left: 0, top: 0 };
                    onHover(true, { x: e.clientX || e.nativeEvent?.clientX || 0, y: e.clientY || e.nativeEvent?.clientY || 0 });
                }
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'default';
                onHover?.(false, { x: 0, y: 0 });
            }}
        >
            {/* Base shadow/glow */}
            <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[3.8, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isActive ? 0.08 : 0.03}
                />
            </mesh>

            {/* Main platform - clean cylinder */}
            <mesh ref={platformRef}>
                <cylinderGeometry args={[3.2, 3.5, 0.6, 32]} />
                <meshStandardMaterial
                    color="#0c0c0c"
                    metalness={0.95}
                    roughness={0.15}
                />
            </mesh>

            {/* Top surface accent */}
            <mesh position={[0, 0.31, 0]}>
                <cylinderGeometry args={[3.0, 3.0, 0.02, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={isActive ? 0.15 : 0.05}
                />
            </mesh>

            {/* Inner dark circle */}
            <mesh position={[0, 0.33, 0]}>
                <cylinderGeometry args={[2.4, 2.4, 0.02, 32]} />
                <meshStandardMaterial
                    color="#080808"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Outer ring - thin elegant */}
            <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.4, 3.55, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isActive ? 0.5 : 0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Bottom crystal */}
            <mesh position={[0, -0.8, 0]}>
                <coneGeometry args={[2.8, 1.5, 32]} />
                <meshStandardMaterial
                    color="#050505"
                    metalness={0.95}
                    roughness={0.1}
                />
            </mesh>

            {/* Center icon */}
            <CenterIcon icon={id} color={color} isActive={isActive} />

            {/* Title - clean typography */}
            <Text
                position={[0, 2.5, 0]}
                fontSize={0.5}
                color="#f3f5f9"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.05}
            >
                {title}
            </Text>

            {/* Selection ring */}
            {isSelected && (
                <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[3.7, 3.85, 64]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.4}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
        </group>
    );
}

// Clean minimal icon
function CenterIcon({ icon, color, isActive }: { icon: string; color: string; isActive: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    const getGeometry = () => {
        switch (icon) {
            case 'education':
                return <boxGeometry args={[0.4, 0.3, 0.08]} />;
            case 'experience':
                return <boxGeometry args={[0.35, 0.28, 0.18]} />;
            case 'skills':
                return <octahedronGeometry args={[0.25]} />;
            case 'projects':
                return <coneGeometry args={[0.15, 0.4, 6]} />;
            case 'about':
            default:
                return <dodecahedronGeometry args={[0.22]} />;
        }
    };

    return (
        <mesh ref={meshRef} position={[0, 1.2, 0]}>
            {getGeometry()}
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isActive ? 0.4 : 0.2}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    );
}
