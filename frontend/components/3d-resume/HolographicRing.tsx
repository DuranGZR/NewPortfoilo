'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicRingProps {
    radius: number;
    color: string;
    speed?: number;
    isActive?: boolean;
    yOffset?: number;
}

export default function HolographicRing({
    radius,
    color,
    speed = 0.5,
    isActive = false,
    yOffset = 0
}: HolographicRingProps) {
    const ringRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (ringRef.current) {
            ringRef.current.rotation.z = time * speed;
            // Pulse effect when active
            const scale = isActive ? 1 + Math.sin(time * 3) * 0.05 : 1;
            ringRef.current.scale.setScalar(scale);
        }

        if (innerRingRef.current) {
            innerRingRef.current.rotation.z = -time * speed * 0.7;
        }
    });

    const opacity = isActive ? 0.6 : 0.3;

    return (
        <group position={[0, yOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Outer ring */}
            <mesh ref={ringRef}>
                <ringGeometry args={[radius, radius + 0.15, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner ring */}
            <mesh ref={innerRingRef}>
                <ringGeometry args={[radius * 0.7, radius * 0.7 + 0.1, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity * 0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Dashed ring effect */}
            <DashedRing radius={radius * 0.85} color={color} isActive={isActive} />
        </group>
    );
}

// Dashed ring for tech-style effect
function DashedRing({ radius, color, isActive }: { radius: number; color: string; isActive: boolean }) {
    const dashRef = useRef<THREE.LineLoop>(null);

    useFrame((state) => {
        if (dashRef.current) {
            dashRef.current.rotation.z = state.clock.elapsedTime * 0.3;
        }
    });

    const points = [];
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        if (i % 2 === 0) {
            points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
        }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <lineLoop ref={dashRef} geometry={geometry}>
            <lineBasicMaterial
                color={color}
                transparent
                opacity={isActive ? 0.5 : 0.2}
            />
        </lineLoop>
    );
}

// Data stream effect - vertical lines rising
export function DataStream({
    color,
    height = 3,
    isActive = false
}: {
    color: string;
    height?: number;
    isActive: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current && isActive) {
            groupRef.current.children.forEach((child, i) => {
                const mesh = child as THREE.Mesh;
                mesh.position.y = ((state.clock.elapsedTime * 2 + i * 0.5) % height) - 0.5;
                (mesh.material as THREE.MeshBasicMaterial).opacity =
                    0.3 * (1 - mesh.position.y / height);
            });
        }
    });

    if (!isActive) return null;

    return (
        <group ref={groupRef}>
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * 1.5;
                const z = Math.sin(angle) * 1.5;
                return (
                    <mesh key={i} position={[x, 0, z]}>
                        <boxGeometry args={[0.02, 0.3, 0.02]} />
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
