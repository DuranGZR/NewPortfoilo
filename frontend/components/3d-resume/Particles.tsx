'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
    count?: number;
    spread?: number;
}

export default function Particles({ count = 500, spread = 80 }: ParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);

    // Generate random positions for particles
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles in a spherical volume
            const radius = Math.random() * spread;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = (Math.random() - 0.3) * spread * 0.5; // Bias upward
            positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            sizes[i] = Math.random() * 2 + 0.5;
            speeds[i] = Math.random() * 0.5 + 0.2;
        }

        return { positions, sizes, speeds };
    }, [count, spread]);

    // Animation loop
    useFrame((state) => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
            const time = state.clock.elapsedTime;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const speed = particles.speeds[i];

                // Gentle floating motion
                positions[i3 + 1] += Math.sin(time * speed + i) * 0.002;

                // Slow drift
                positions[i3] += Math.sin(time * 0.1 + i * 0.5) * 0.001;
                positions[i3 + 2] += Math.cos(time * 0.1 + i * 0.3) * 0.001;
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;

            // Subtle rotation of entire particle system
            pointsRef.current.rotation.y = time * 0.02;
        }

        // Pulsing opacity
        if (materialRef.current) {
            materialRef.current.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                size={0.15}
                color="#819fa7"
                transparent
                opacity={0.5}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Floating orbs for additional atmosphere
export function FloatingOrbs() {
    const orbsRef = useRef<THREE.Group>(null);

    const orbs = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 60,
                Math.random() * 20 - 5,
                (Math.random() - 0.5) * 60
            ] as [number, number, number],
            scale: Math.random() * 2 + 1,
            speed: Math.random() * 0.3 + 0.1,
            phase: Math.random() * Math.PI * 2
        }));
    }, []);

    useFrame((state) => {
        if (orbsRef.current) {
            orbsRef.current.children.forEach((orb, i) => {
                const data = orbs[i];
                orb.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * data.speed + data.phase) * 2;
                (orb as THREE.Mesh).material = (orb as THREE.Mesh).material as THREE.MeshBasicMaterial;
                ((orb as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
                    0.03 + Math.sin(state.clock.elapsedTime * data.speed * 0.5 + data.phase) * 0.02;
            });
        }
    });

    return (
        <group ref={orbsRef}>
            {orbs.map((orb, i) => (
                <mesh key={i} position={orb.position} scale={orb.scale}>
                    <sphereGeometry args={[3, 16, 16]} />
                    <meshBasicMaterial
                        color="#819fa7"
                        transparent
                        opacity={0.03}
                    />
                </mesh>
            ))}
        </group>
    );
}
