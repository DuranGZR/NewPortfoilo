'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
}

export default function CameraController({ selectedIsland, islands }: CameraControllerProps) {
    const { camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3(0, 8, 25));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
    const isAnimating = useRef(false);

    // Update target when island is selected
    useEffect(() => {
        if (selectedIsland) {
            const island = islands.find((i) => i.id === selectedIsland);
            if (island) {
                const [x, y, z] = island.position;

                // Camera position - closer and at better angle
                targetPosition.current.set(x + 3, y + 5, z + 12);
                targetLookAt.current.set(x, y, z);
                isAnimating.current = true;
            }
        } else {
            // Return to overview position
            targetPosition.current.set(0, 8, 25);
            targetLookAt.current.set(0, 0, 0);
            isAnimating.current = true;
        }
    }, [selectedIsland, islands]);

    // Smooth camera animation
    useFrame(() => {
        if (isAnimating.current) {
            // Lerp camera position
            camera.position.lerp(targetPosition.current, 0.04);

            // Check if animation is complete
            const distance = camera.position.distanceTo(targetPosition.current);
            if (distance < 0.05) {
                isAnimating.current = false;
            }
        }
    });

    return null;
}
