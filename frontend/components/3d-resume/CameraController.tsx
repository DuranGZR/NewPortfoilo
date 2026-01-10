'use client';

import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Camera modes for state machine
type CameraMode = 'intro' | 'overview' | 'transitioning' | 'focused';

// Define types locally
interface Island3DData {
    id: string;
    title: string;
    position: [number, number, number];
    color: string;
    icon: string;
    items: { title: string; description: string; date?: string; tags?: string[] }[];
}

interface CameraControllerProps {
    selectedIsland: string | null;
    islands: Island3DData[];
    introComplete?: boolean;
}

// Easing functions for cinematic feel
const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const easeInOutCubic = (t: number): number => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function CameraController({
    selectedIsland,
    islands,
    introComplete = true
}: CameraControllerProps) {
    const { camera } = useThree();

    // Enhanced state management
    const [mode, setMode] = useState<CameraMode>(introComplete ? 'overview' : 'intro');

    // Animation refs
    const targetPosition = useRef(new THREE.Vector3(0, 15, 32));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
    const startPosition = useRef(new THREE.Vector3());
    const startLookAt = useRef(new THREE.Vector3());

    // Transition timing
    const transitionProgress = useRef(0);
    const transitionDuration = useRef(1.5); // seconds
    const transitionStartTime = useRef<number | null>(null);

    // Orbit effect for focused state
    const orbitAngle = useRef(0);
    const orbitCenter = useRef(new THREE.Vector3());
    const orbitRadius = useRef(12);

    // Handle intro completion
    useEffect(() => {
        if (introComplete && mode === 'intro') {
            setMode('overview');
        }
    }, [introComplete, mode]);

    // Update target when island is selected
    useEffect(() => {
        if (mode === 'intro') return;

        if (selectedIsland) {
            const island = islands.find((i) => i.id === selectedIsland);
            if (island) {
                const [x, y, z] = island.position;

                // Store current position as start
                startPosition.current.copy(camera.position);
                startLookAt.current.copy(targetLookAt.current);

                // Set target position - cinematic close-up angle
                targetPosition.current.set(x + 4, y + 6, z + 14);
                targetLookAt.current.set(x, y + 0.5, z);

                // Setup orbit
                orbitCenter.current.set(x, y + 0.5, z);
                orbitRadius.current = 14;
                orbitAngle.current = 0;

                // Start transition
                transitionProgress.current = 0;
                transitionStartTime.current = null;
                transitionDuration.current = 1.2;
                setMode('transitioning');
            }
        } else if (mode === 'focused' || mode === 'transitioning') {
            // Store current position as start
            startPosition.current.copy(camera.position);
            startLookAt.current.copy(targetLookAt.current);

            // Return to overview position
            targetPosition.current.set(0, 15, 32);
            targetLookAt.current.set(0, 0, 0);

            // Start transition
            transitionProgress.current = 0;
            transitionStartTime.current = null;
            transitionDuration.current = 1.0;
            setMode('transitioning');
        }
    }, [selectedIsland, islands, mode, camera]);

    // Animation frame
    useFrame((state) => {
        if (mode === 'intro') return;

        const time = state.clock.elapsedTime;

        if (mode === 'transitioning') {
            // Initialize transition start time
            if (transitionStartTime.current === null) {
                transitionStartTime.current = time;
            }

            // Calculate progress with easing
            const elapsed = time - transitionStartTime.current;
            const rawProgress = Math.min(elapsed / transitionDuration.current, 1);
            transitionProgress.current = easeOutExpo(rawProgress);

            // Interpolate position
            camera.position.lerpVectors(
                startPosition.current,
                targetPosition.current,
                transitionProgress.current
            );

            // Smooth look-at interpolation
            const currentLookAt = new THREE.Vector3().lerpVectors(
                startLookAt.current,
                targetLookAt.current,
                transitionProgress.current
            );
            camera.lookAt(currentLookAt);

            // Check completion
            if (rawProgress >= 1) {
                if (selectedIsland) {
                    setMode('focused');
                    orbitAngle.current = 0;
                } else {
                    setMode('overview');
                }
            }
        } else if (mode === 'focused' && selectedIsland) {
            // Subtle orbit effect around the island
            orbitAngle.current += 0.0008; // Very slow orbit

            const island = islands.find((i) => i.id === selectedIsland);
            if (island) {
                const [x, y, z] = island.position;

                // Calculate orbital position
                const orbitX = x + Math.sin(orbitAngle.current) * 2;
                const orbitZ = z + 14 + Math.cos(orbitAngle.current) * 1;
                const orbitY = y + 6 + Math.sin(orbitAngle.current * 0.5) * 0.3;

                // Smooth lerp to orbit position
                camera.position.lerp(
                    new THREE.Vector3(orbitX, orbitY, orbitZ),
                    0.02
                );

                // Always look at island center
                camera.lookAt(orbitCenter.current);
            }
        } else if (mode === 'overview') {
            // Gentle breathing effect in overview
            const breathe = Math.sin(time * 0.3) * 0.5;
            const targetWithBreathe = new THREE.Vector3(
                targetPosition.current.x,
                targetPosition.current.y + breathe,
                targetPosition.current.z
            );

            camera.position.lerp(targetWithBreathe, 0.02);
            camera.lookAt(targetLookAt.current);
        }
    });

    return null;
}
