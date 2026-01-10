'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceshipProps {
    enabled: boolean;
    islands: { id: string; position: [number, number, number] }[];
    onIslandApproach: (islandId: string | null) => void;
}

// Easing for smooth movement
const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
};

export default function Spaceship({ enabled, islands, onIslandApproach }: SpaceshipProps) {
    const { camera } = useThree();

    // Refs for state
    const groupRef = useRef<THREE.Group>(null);
    const velocity = useRef(new THREE.Vector3());
    const targetRotation = useRef(new THREE.Euler());
    const keys = useRef({
        w: false, a: false, s: false, d: false,
        space: false, shift: false,
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
    });
    const mousePosition = useRef({ x: 0, y: 0 });
    const engineGlowRef = useRef<THREE.PointLight>(null);
    const trailParticlesRef = useRef<THREE.Points>(null);

    // Ship parameters
    const SPEED = 0.15;
    const BOOST_MULTIPLIER = 2.5;
    const DRAG = 0.96;
    const ROTATION_SPEED = 0.03;
    const MAX_TILT = 0.3;

    // Particle trail setup
    const trailGeometry = useMemo(() => {
        const count = 100;
        const positions = new Float32Array(count * 3);
        const opacities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
            opacities[i] = 0;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

        return geometry;
    }, []);

    // Keyboard controls
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in keys.current) {
                keys.current[key as keyof typeof keys.current] = true;
            }
            if (e.key in keys.current) {
                keys.current[e.key as keyof typeof keys.current] = true;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in keys.current) {
                keys.current[key as keyof typeof keys.current] = false;
            }
            if (e.key in keys.current) {
                keys.current[e.key as keyof typeof keys.current] = false;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [enabled]);

    // Animation loop
    useFrame((state) => {
        if (!enabled || !groupRef.current) return;

        const ship = groupRef.current;
        const time = state.clock.elapsedTime;

        // Get movement input
        const forward = (keys.current.w || keys.current.ArrowUp ? 1 : 0) -
            (keys.current.s || keys.current.ArrowDown ? 1 : 0);
        const strafe = (keys.current.d || keys.current.ArrowRight ? 1 : 0) -
            (keys.current.a || keys.current.ArrowLeft ? 1 : 0);
        const vertical = keys.current.space ? 1 : (keys.current.shift ? -1 : 0);
        const boost = keys.current.space ? BOOST_MULTIPLIER : 1;

        // Calculate movement direction based on camera
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        cameraDirection.y = 0;
        cameraDirection.normalize();

        const right = new THREE.Vector3();
        right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

        // Apply velocity
        const moveDirection = new THREE.Vector3();
        moveDirection.addScaledVector(cameraDirection, forward);
        moveDirection.addScaledVector(right, strafe);
        moveDirection.y = vertical * 0.5;
        moveDirection.normalize();

        velocity.current.addScaledVector(moveDirection, SPEED * boost);
        velocity.current.multiplyScalar(DRAG);

        // Update position
        ship.position.add(velocity.current);

        // Clamp position bounds
        ship.position.x = Math.max(-50, Math.min(50, ship.position.x));
        ship.position.y = Math.max(1, Math.min(30, ship.position.y));
        ship.position.z = Math.max(-30, Math.min(50, ship.position.z));

        // Ship banking/tilting based on velocity
        const targetTiltZ = -strafe * MAX_TILT;
        const targetTiltX = forward * MAX_TILT * 0.5;
        ship.rotation.z = lerp(ship.rotation.z, targetTiltZ, 0.1);
        ship.rotation.x = lerp(ship.rotation.x, targetTiltX, 0.1);

        // Rotate ship to face movement direction
        if (velocity.current.length() > 0.01) {
            const targetY = Math.atan2(velocity.current.x, velocity.current.z);
            ship.rotation.y = lerp(ship.rotation.y, targetY, ROTATION_SPEED);
        }

        // Engine glow intensity based on speed
        if (engineGlowRef.current) {
            const speed = velocity.current.length();
            engineGlowRef.current.intensity = 0.5 + speed * 3 + (boost > 1 ? 2 : 0);
        }

        // Update camera to follow ship
        const cameraOffset = new THREE.Vector3(0, 3, 8);
        cameraOffset.applyQuaternion(ship.quaternion);
        const targetCameraPos = ship.position.clone().add(cameraOffset);
        camera.position.lerp(targetCameraPos, 0.05);
        camera.lookAt(ship.position);

        // Check proximity to islands
        let nearestIsland: string | null = null;
        let nearestDistance = Infinity;

        for (const island of islands) {
            const islandPos = new THREE.Vector3(...island.position);
            const distance = ship.position.distanceTo(islandPos);

            if (distance < 8 && distance < nearestDistance) {
                nearestDistance = distance;
                nearestIsland = island.id;
            }
        }

        onIslandApproach(nearestIsland);

        // Update particle trail
        if (trailParticlesRef.current) {
            const positions = trailGeometry.attributes.position.array as Float32Array;
            const opacities = trailGeometry.attributes.opacity.array as Float32Array;

            // Shift particles back
            for (let i = positions.length / 3 - 1; i > 0; i--) {
                positions[i * 3] = positions[(i - 1) * 3];
                positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
                positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
                opacities[i] = opacities[i - 1] * 0.95;
            }

            // Add new particle at engine position
            const enginePos = ship.position.clone();
            enginePos.y -= 0.3;
            positions[0] = enginePos.x + (Math.random() - 0.5) * 0.2;
            positions[1] = enginePos.y + (Math.random() - 0.5) * 0.2;
            positions[2] = enginePos.z + (Math.random() - 0.5) * 0.2;
            opacities[0] = velocity.current.length() * 2;

            trailGeometry.attributes.position.needsUpdate = true;
            trailGeometry.attributes.opacity.needsUpdate = true;
        }
    });

    if (!enabled) return null;

    return (
        <>
            {/* Spaceship model */}
            <group ref={groupRef} position={[0, 10, 30]}>
                {/* Main body - sleek capsule */}
                <mesh>
                    <capsuleGeometry args={[0.3, 1.2, 8, 16]} />
                    <meshStandardMaterial
                        color="#1a2a32"
                        metalness={0.9}
                        roughness={0.2}
                        emissive="#819fa7"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Cockpit */}
                <mesh position={[0, 0.15, 0.4]}>
                    <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#2a4a5a"
                        metalness={0.5}
                        roughness={0.1}
                        emissive="#4a8a9a"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.7}
                    />
                </mesh>

                {/* Wings */}
                <mesh position={[0.6, 0, -0.2]} rotation={[0, 0, -0.3]}>
                    <boxGeometry args={[0.8, 0.05, 0.5]} />
                    <meshStandardMaterial
                        color="#1a2a32"
                        metalness={0.9}
                        roughness={0.3}
                    />
                </mesh>
                <mesh position={[-0.6, 0, -0.2]} rotation={[0, 0, 0.3]}>
                    <boxGeometry args={[0.8, 0.05, 0.5]} />
                    <meshStandardMaterial
                        color="#1a2a32"
                        metalness={0.9}
                        roughness={0.3}
                    />
                </mesh>

                {/* Engine glow */}
                <mesh position={[0, -0.1, -0.7]}>
                    <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
                    <meshBasicMaterial color="#5aafbf" transparent opacity={0.8} />
                </mesh>

                {/* Engine light */}
                <pointLight
                    ref={engineGlowRef}
                    position={[0, 0, -0.8]}
                    color="#5aafbf"
                    intensity={0.5}
                    distance={5}
                />

                {/* Accent lights */}
                <pointLight position={[0.7, 0, 0]} color="#ff4444" intensity={0.3} distance={2} />
                <pointLight position={[-0.7, 0, 0]} color="#44ff44" intensity={0.3} distance={2} />
            </group>

            {/* Engine trail particles */}
            <points ref={trailParticlesRef}>
                <primitive object={trailGeometry} attach="geometry" />
                <pointsMaterial
                    size={0.15}
                    color="#5aafbf"
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    sizeAttenuation
                />
            </points>
        </>
    );
}
