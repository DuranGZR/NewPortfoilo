'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyBeamProps {
    color: string;
    isActive: boolean;
    height?: number;
}

export default function EnergyBeam({ color, isActive, height = 8 }: EnergyBeamProps) {
    const beamRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Rising particles
    const particles = useMemo(() => {
        const count = 30;
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.5;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = Math.random() * height;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
            speeds[i] = Math.random() * 2 + 1;
        }

        return { positions, speeds, count };
    }, [height]);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (beamRef.current) {
            // Pulse effect
            const pulse = isActive ? 0.8 + Math.sin(time * 4) * 0.2 : 0;
            (beamRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.15;

            // Scale animation on activation
            const targetScale = isActive ? 1 : 0;
            beamRef.current.scale.y = THREE.MathUtils.lerp(beamRef.current.scale.y, targetScale, 0.1);
        }

        if (coreRef.current) {
            const pulse = isActive ? 0.6 + Math.sin(time * 6) * 0.4 : 0;
            (coreRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.4;
        }

        // Animate particles
        if (particlesRef.current && isActive) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particles.count; i++) {
                positions[i * 3 + 1] += particles.speeds[i] * 0.02;

                // Reset when reaching top
                if (positions[i * 3 + 1] > height) {
                    positions[i * 3 + 1] = 0;
                }
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
            (particlesRef.current.material as THREE.PointsMaterial).opacity = 0.6;
        } else if (particlesRef.current) {
            (particlesRef.current.material as THREE.PointsMaterial).opacity = 0;
        }
    });

    return (
        <group position={[0, 0.5, 0]}>
            {/* Outer beam glow */}
            <mesh ref={beamRef} position={[0, height / 2, 0]}>
                <cylinderGeometry args={[0.8, 0.3, height, 16, 1, true]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Core beam */}
            <mesh ref={coreRef} position={[0, height / 2, 0]}>
                <cylinderGeometry args={[0.15, 0.08, height, 8, 1, true]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Rising particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particles.positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    color={color}
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Base glow ring */}
            {isActive && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <ringGeometry args={[0.2, 0.8, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.3}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            )}
        </group>
    );
}
