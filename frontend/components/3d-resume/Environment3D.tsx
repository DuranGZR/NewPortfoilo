'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Environment3D() {
    const gridRef = useRef<THREE.GridHelper>(null);

    // Subtle grid animation
    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
        }
    });

    return (
        <>
            {/* Atmospheric fog */}
            <fog attach="fog" args={['#0d0d0d', 35, 80]} />

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.8}
                    roughness={0.4}
                />
            </mesh>

            {/* Grid lines - subtle */}
            <gridHelper
                ref={gridRef}
                args={[150, 50, '#1a2a30', '#0d1518']}
                position={[0, -4.9, 0]}
            />

            {/* Ambient glow underneath */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.8, 0]}>
                <circleGeometry args={[30, 64]} />
                <meshBasicMaterial
                    color="#819fa7"
                    transparent
                    opacity={0.03}
                />
            </mesh>

            {/* Background sphere */}
            <mesh scale={[-1, 1, 1]}>
                <sphereGeometry args={[120, 32, 32]} />
                <meshBasicMaterial
                    side={THREE.BackSide}
                    color="#050508"
                />
            </mesh>

            {/* Subtle ambient orbs */}
            <mesh position={[-25, 5, -30]}>
                <sphereGeometry args={[5, 16, 16]} />
                <meshBasicMaterial color="#819fa7" transparent opacity={0.02} />
            </mesh>
            <mesh position={[25, 8, -25]}>
                <sphereGeometry args={[4, 16, 16]} />
                <meshBasicMaterial color="#5b6e74" transparent opacity={0.02} />
            </mesh>
        </>
    );
}
