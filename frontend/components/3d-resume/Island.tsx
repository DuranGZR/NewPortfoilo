'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Types
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
}

export default function Island({
    id,
    title,
    position,
    color,
    icon,
    isSelected,
    onClick
}: IslandProps) {
    const groupRef = useRef<THREE.Group>(null);
    const platformRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const glowIntensity = isSelected ? 0.8 : hovered ? 0.5 : 0.2;

    useFrame((state) => {
        if (groupRef.current) {
            // Smooth scale animation
            const targetScale = hovered || isSelected ? 1.05 : 1;
            groupRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.08
            );
        }

        if (platformRef.current) {
            // Subtle breathing effect
            const breathe = Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.02;
            platformRef.current.position.y = breathe;
        }

        if (ringRef.current) {
            // Slow rotation
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
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
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'default';
            }}
        >
            {/* Base glow effect */}
            <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[3.5, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={glowIntensity * 0.15}
                />
            </mesh>

            {/* Main hexagonal platform */}
            <mesh ref={platformRef} position={[0, 0, 0]}>
                <cylinderGeometry args={[3, 3, 0.4, 6]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.6}
                    roughness={0.3}
                    emissive={color}
                    emissiveIntensity={glowIntensity * 0.3}
                />
            </mesh>

            {/* Inner platform layer */}
            <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[2.2, 2.4, 0.15, 6]} />
                <meshStandardMaterial
                    color="#0d0d0d"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Decorative ring */}
            <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[1.8, 1.8, 0.08, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={glowIntensity * 0.5}
                />
            </mesh>

            {/* Crystalline bottom */}
            <mesh position={[0, -0.8, 0]}>
                <coneGeometry args={[2.5, 1.8, 6]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.3}
                />
            </mesh>

            {/* Outer glowing ring */}
            <mesh ref={ringRef} position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.1, 3.3, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={glowIntensity * 0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Floating icon */}
            <FloatingIcon icon={icon} color={color} isActive={isSelected || hovered} />

            {/* Title */}
            <Text
                position={[0, 2.8, 0]}
                fontSize={0.5}
                color="#f3f5f9"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#0d0d0d"
            >
                {title}
            </Text>

            {/* Selection indicators */}
            {isSelected && (
                <>
                    <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[3.5, 3.7, 32]} />
                        <meshBasicMaterial
                            color="#f3f5f9"
                            transparent
                            opacity={0.4}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[3.9, 4.0, 32]} />
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.25}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Floating icon with elegant animation
function FloatingIcon({ icon, color, isActive }: { icon: string; color: string; isActive: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle float
            meshRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
            // Slow rotation
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            // Scale on active
            const scale = isActive ? 1.2 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        }
        if (glowRef.current) {
            glowRef.current.position.y = meshRef.current?.position.y || 1.5;
        }
    });

    const getGeometry = () => {
        switch (icon) {
            case 'book':
                return <boxGeometry args={[0.45, 0.35, 0.08]} />;
            case 'briefcase':
                return <boxGeometry args={[0.4, 0.3, 0.2]} />;
            case 'zap':
                return <octahedronGeometry args={[0.28]} />;
            case 'rocket':
                return <coneGeometry args={[0.18, 0.45, 8]} />;
            case 'user':
            default:
                return <sphereGeometry args={[0.25, 16, 16]} />;
        }
    };

    return (
        <>
            {/* Icon glow */}
            <mesh ref={glowRef} position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isActive ? 0.15 : 0.08}
                />
            </mesh>

            {/* Icon mesh */}
            <mesh ref={meshRef} position={[0, 1.5, 0]}>
                {getGeometry()}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isActive ? 0.6 : 0.3}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
        </>
    );
}
