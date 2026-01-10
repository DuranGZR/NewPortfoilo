'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Environment3D() {
    const nebulaRef = useRef<THREE.Points>(null);
    const dustRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Slow nebula rotation
        if (nebulaRef.current) {
            nebulaRef.current.rotation.y = time * 0.002;
            nebulaRef.current.rotation.x = time * 0.001;
        }

        // Cosmic dust drift
        if (dustRef.current) {
            dustRef.current.rotation.y = time * 0.003;
        }
    });

    // Create vibrant nebula clouds - multiple layers for depth
    const nebula = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        // More vibrant nebula colors
        const nebulaColors = [
            new THREE.Color('#2a0a4e'), // Deep violet
            new THREE.Color('#0a2a5e'), // Deep blue
            new THREE.Color('#4a1a4e'), // Purple-magenta
            new THREE.Color('#1a3a6e'), // Royal blue
            new THREE.Color('#3a0a3e'), // Dark magenta
            new THREE.Color('#0a4a6e'), // Teal
            new THREE.Color('#5a1a3e'), // Wine
        ];

        for (let i = 0; i < count; i++) {
            // Create organic cloud-like clusters
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const baseRadius = 250 + Math.random() * 350;

            // Create multiple cloud clusters
            const clusterAngle = Math.floor(Math.random() * 5) * (Math.PI * 2 / 5);
            const clusterOffset = Math.sin(theta * 4 + clusterAngle) * 80 + Math.cos(phi * 3) * 60;
            const radius = baseRadius + clusterOffset;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Gradient colors based on position for realistic nebula look
            const colorIndex = Math.floor((theta / (Math.PI * 2)) * nebulaColors.length);
            const color = nebulaColors[colorIndex % nebulaColors.length];

            // Add slight variation
            const variation = 0.8 + Math.random() * 0.4;
            colors[i * 3] = color.r * variation;
            colors[i * 3 + 1] = color.g * variation;
            colors[i * 3 + 2] = color.b * variation;

            sizes[i] = 3 + Math.random() * 6;
        }

        return { positions, colors, sizes };
    }, []);

    // Cosmic dust particles
    const dust = useMemo(() => {
        const count = 1500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 80 + Math.random() * 200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Warm golden dust
            const brightness = 0.3 + Math.random() * 0.4;
            colors[i * 3] = brightness;
            colors[i * 3 + 1] = brightness * 0.9;
            colors[i * 3 + 2] = brightness * 0.7;
        }

        return { positions, colors };
    }, []);

    // Bright visible stars with varied colors
    const brightStars = useMemo(() => {
        const count = 500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const starColors = [
            new THREE.Color('#ffffff'), // White
            new THREE.Color('#fff5e0'), // Warm white
            new THREE.Color('#e0e8ff'), // Cool white
            new THREE.Color('#ffd4a8'), // Orange
            new THREE.Color('#a8d4ff'), // Blue
            new THREE.Color('#ffe8e8'), // Red-ish
        ];

        for (let i = 0; i < count; i++) {
            const radius = 150 + Math.random() * 350;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            const color = starColors[Math.floor(Math.random() * starColors.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = 0.5 + Math.random() * 2;
        }

        return { positions, colors, sizes };
    }, []);

    return (
        <>
            {/* Deep space background */}
            <color attach="background" args={['#020209']} />

            {/* Main star field - dense background */}
            <Stars
                radius={500}
                depth={200}
                count={8000}
                factor={5}
                saturation={0.2}
                fade
                speed={0.05}
            />

            {/* Secondary star layer */}
            <Stars
                radius={400}
                depth={150}
                count={4000}
                factor={3}
                saturation={0.1}
                fade
                speed={0.08}
            />

            {/* Distant dim stars */}
            <Stars
                radius={600}
                depth={250}
                count={3000}
                factor={2}
                saturation={0}
                fade
                speed={0.02}
            />

            {/* Nebula clouds */}
            <points ref={nebulaRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[nebula.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[nebula.colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={3}
                    vertexColors
                    transparent
                    opacity={0.15}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Bright colored stars */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[brightStars.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[brightStars.colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={1.5}
                    vertexColors
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Cosmic dust */}
            {/* Sun - distant and bright */}
            <points ref={dustRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[dust.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[dust.colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.4}
                    vertexColors
                    transparent
                    opacity={0.25}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            {/* ========== MAIN VISIBLE PLANETS ========== */}

            {/* Sun - visible top right, distant */}
            <RealisticSun position={[180, 80, -250]} size={18} />

            {/* Saturn-like ringed planet - visible right */}
            <RingedPlanet
                position={[140, -20, -160]}
                size={12}
                color="#c9a962"
                ringColor="#d4c4a0"
            />

            {/* Jupiter-like gas giant - visible left */}
            <GasGiant
                position={[-120, 40, -180]}
                size={15}
            />

            {/* ========== DISCOVERABLE PLANETS ========== */}

            {/* Mars-like red planet - far left */}
            <RealisticPlanet
                position={[-280, 30, -100]}
                size={8}
                color="#c1440e"
                hasAtmosphere
                atmosphereColor="#ff6b4a"
            />

            {/* Earth-like planet - far right */}
            <RealisticPlanet
                position={[320, 50, -80]}
                size={10}
                color="#1e4d6e"
                hasAtmosphere
                atmosphereColor="#5ea8d4"
            />

            {/* Purple ice giant - above/back */}
            <RealisticPlanet
                position={[-50, 150, -300]}
                size={11}
                color="#5a4a7a"
                hasAtmosphere
                atmosphereColor="#8a7aaa"
            />

            {/* Small rocky moon - below */}
            <RealisticPlanet position={[80, -100, -200]} size={5} color="#6a6a6a" />

            {/* Orange desert planet - back right */}
            <RealisticPlanet
                position={[250, -60, 150]}
                size={9}
                color="#c98a4a"
                hasAtmosphere
                atmosphereColor="#daa06a"
            />

            {/* Second ringed planet - far back left */}
            <RingedPlanet
                position={[-300, 20, 200]}
                size={10}
                color="#7a8a9a"
                ringColor="#a0b0c0"
            />


            {/* Distant second sun - very far back */}
            <RealisticSun position={[0, 60, 450]} size={20} />


            {/* Ambient light with slight blue tint for space feel */}
            <ambientLight intensity={0.15} color="#8090a0" />
        </>
    );
}

// Realistic sun with corona effect
function RealisticSun({ position, size }: { position: [number, number, number]; size: number }) {
    const coronaRef = useRef<THREE.Mesh>(null);
    const outerGlowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (coronaRef.current) {
            coronaRef.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.08);
        }
        if (outerGlowRef.current) {
            outerGlowRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
        }
    });

    return (
        <group position={position}>
            {/* Core - bright white */}
            <mesh>
                <sphereGeometry args={[size, 48, 48]} />
                <meshBasicMaterial color="#fffff8" />
            </mesh>

            {/* Inner corona */}
            <mesh ref={coronaRef}>
                <sphereGeometry args={[size * 1.3, 32, 32]} />
                <meshBasicMaterial color="#fff8e0" transparent opacity={0.5} />
            </mesh>

            {/* Middle glow */}
            <mesh>
                <sphereGeometry args={[size * 1.8, 32, 32]} />
                <meshBasicMaterial color="#ffeecc" transparent opacity={0.25} />
            </mesh>

            {/* Outer glow */}
            <mesh ref={outerGlowRef}>
                <sphereGeometry args={[size * 2.5, 32, 32]} />
                <meshBasicMaterial color="#ffeedd" transparent opacity={0.1} />
            </mesh>

            {/* Sun rays - very faint */}
            <mesh>
                <sphereGeometry args={[size * 4, 32, 32]} />
                <meshBasicMaterial color="#fff5e0" transparent opacity={0.03} />
            </mesh>

            {/* Light source */}
            <pointLight intensity={0.8} distance={800} color="#fff5e0" />
        </group>
    );
}

// Realistic planet with optional atmosphere
function RealisticPlanet({
    position,
    size,
    color,
    hasAtmosphere = false,
    atmosphereColor = '#ffffff'
}: {
    position: [number, number, number];
    size: number;
    color: string;
    hasAtmosphere?: boolean;
    atmosphereColor?: string;
}) {
    const planetRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (planetRef.current) {
            planetRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <group position={position}>
            {/* Planet body */}
            <mesh ref={planetRef}>
                <sphereGeometry args={[size, 48, 48]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.05}
                    roughness={0.9}
                />
            </mesh>

            {/* Shadow side gradient */}
            <mesh>
                <sphereGeometry args={[size * 1.001, 48, 48]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Atmosphere glow */}
            {hasAtmosphere && (
                <>
                    <mesh>
                        <sphereGeometry args={[size * 1.08, 32, 32]} />
                        <meshBasicMaterial
                            color={atmosphereColor}
                            transparent
                            opacity={0.15}
                        />
                    </mesh>
                    <mesh>
                        <sphereGeometry args={[size * 1.15, 32, 32]} />
                        <meshBasicMaterial
                            color={atmosphereColor}
                            transparent
                            opacity={0.05}
                        />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Saturn-like planet with detailed rings
function RingedPlanet({
    position,
    size,
    color,
    ringColor
}: {
    position: [number, number, number];
    size: number;
    color: string;
    ringColor: string;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={[0.2, 0, 0.1]}>
            {/* Planet body */}
            <mesh>
                <sphereGeometry args={[size, 64, 64]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.1}
                    roughness={0.8}
                />
            </mesh>

            {/* Atmosphere */}
            <mesh>
                <sphereGeometry args={[size * 1.05, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.1} />
            </mesh>

            {/* Inner ring - dense */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size * 1.4, size * 1.7, 128]} />
                <meshBasicMaterial
                    color={ringColor}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Middle ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size * 1.75, size * 2.0, 128]} />
                <meshBasicMaterial
                    color={ringColor}
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer ring - faint */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size * 2.1, size * 2.4, 128]} />
                <meshBasicMaterial
                    color={ringColor}
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

// Jupiter-like gas giant with bands
function GasGiant({
    position,
    size
}: {
    position: [number, number, number];
    size: number;
}) {
    const planetRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (planetRef.current) {
            planetRef.current.rotation.y = state.clock.elapsedTime * 0.015;
        }
    });

    return (
        <group position={position}>
            {/* Main body - Jupiter colors */}
            <mesh ref={planetRef}>
                <sphereGeometry args={[size, 64, 64]} />
                <meshStandardMaterial
                    color="#c4a574"
                    metalness={0.05}
                    roughness={0.8}
                />
            </mesh>

            {/* Band layer 1 - darker */}
            <mesh rotation={[0, 0, 0]}>
                <sphereGeometry args={[size * 1.002, 64, 64]} />
                <meshBasicMaterial
                    color="#8b6914"
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Atmosphere */}
            <mesh>
                <sphereGeometry args={[size * 1.06, 32, 32]} />
                <meshBasicMaterial
                    color="#e8d4a8"
                    transparent
                    opacity={0.08}
                />
            </mesh>

            {/* Great red spot hint */}
            <mesh position={[size * 0.7, size * 0.2, size * 0.5]}>
                <sphereGeometry args={[size * 0.15, 16, 16]} />
                <meshBasicMaterial
                    color="#c45030"
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </group>
    );
}

// Professional Comet with smooth glowing trail
function Comet({
    startPosition,
    endPosition,
    duration = 20,
    delay = 0,
    color = '#a0d0ff'
}: {
    startPosition: [number, number, number];
    endPosition: [number, number, number];
    duration?: number;
    delay?: number;
    color?: string;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const trailMeshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const innerGlowRef = useRef<THREE.Mesh>(null);

    // Trail positions history for smooth line
    const positionHistory = useRef<THREE.Vector3[]>([]);
    const maxTrailLength = 120;

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const adjustedTime = time - delay;

        if (adjustedTime < 0 || !groupRef.current) return;

        // Calculate progress with smooth easing
        const rawProgress = (adjustedTime % duration) / duration;
        // Add slight arc to trajectory
        const arcHeight = Math.sin(rawProgress * Math.PI) * 30;

        // Interpolate position
        const x = startPosition[0] + (endPosition[0] - startPosition[0]) * rawProgress;
        const y = startPosition[1] + (endPosition[1] - startPosition[1]) * rawProgress + arcHeight;
        const z = startPosition[2] + (endPosition[2] - startPosition[2]) * rawProgress;

        groupRef.current.position.set(x, y, z);

        // Point comet in direction of travel
        const direction = new THREE.Vector3(
            endPosition[0] - startPosition[0],
            endPosition[1] - startPosition[1] + Math.cos(rawProgress * Math.PI) * 30,
            endPosition[2] - startPosition[2]
        ).normalize();
        groupRef.current.lookAt(x - direction.x, y - direction.y, z - direction.z);

        // Pulse glow effects
        const pulse = 1 + Math.sin(time * 6) * 0.15;
        const pulse2 = 1 + Math.sin(time * 4 + 1) * 0.1;

        if (glowRef.current) {
            glowRef.current.scale.setScalar(pulse);
        }
        if (innerGlowRef.current) {
            innerGlowRef.current.scale.setScalar(pulse2);
        }

        // Update trail history
        const currentPos = new THREE.Vector3(x, y, z);

        // Only add if moved enough distance
        if (positionHistory.current.length === 0 ||
            currentPos.distanceTo(positionHistory.current[0]) > 0.5) {
            positionHistory.current.unshift(currentPos.clone());
            if (positionHistory.current.length > maxTrailLength) {
                positionHistory.current.pop();
            }
        }

        // Update trail mesh geometry
        if (trailMeshRef.current && positionHistory.current.length > 2) {
            const points = positionHistory.current;
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, points.length * 2, 0.8, 8, false);

            // Apply tapering - make trail thinner towards end
            const positionAttr = tubeGeometry.attributes.position;
            const vertex = new THREE.Vector3();

            for (let i = 0; i < positionAttr.count; i++) {
                vertex.fromBufferAttribute(positionAttr, i);

                // Find closest point on curve to determine taper
                const closestPoint = curve.getPoint(0);
                let minDist = Infinity;
                let tValue = 0;

                for (let t = 0; t <= 1; t += 0.02) {
                    const pt = curve.getPoint(t);
                    const dist = vertex.distanceTo(pt);
                    if (dist < minDist) {
                        minDist = dist;
                        tValue = t;
                    }
                }

                // Taper based on position along curve
                const taper = Math.pow(1 - tValue, 0.5);
                const currentRadius = minDist;
                const newRadius = currentRadius * taper;

                // Scale vertex towards curve center
                if (currentRadius > 0.01) {
                    const scale = newRadius / currentRadius;
                    const center = curve.getPoint(tValue);
                    vertex.sub(center).multiplyScalar(scale).add(center);
                    positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
                }
            }

            trailMeshRef.current.geometry.dispose();
            trailMeshRef.current.geometry = tubeGeometry;
        }
    });

    return (
        <group ref={groupRef} position={startPosition}>
            {/* Comet core - super bright */}
            <mesh>
                <sphereGeometry args={[0.6, 24, 24]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Inner bright glow */}
            <mesh ref={innerGlowRef}>
                <sphereGeometry args={[1.2, 24, 24]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Color glow layer 1 */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2, 24, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Outer soft glow */}
            <mesh>
                <sphereGeometry args={[4, 24, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Very outer haze */}
            <mesh>
                <sphereGeometry args={[8, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.03}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Trail mesh - smooth tube */}
            <mesh ref={trailMeshRef}>
                <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1)]), 4, 0.5, 8, false]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.5}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Point light for glow effect */}
            <pointLight
                intensity={1}
                distance={50}
                color={color}
            />
        </group>
    );
}
