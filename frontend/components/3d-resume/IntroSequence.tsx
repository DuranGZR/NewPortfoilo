'use client';

import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IntroSequenceProps {
    onComplete: () => void;
    skip?: boolean;
}

// Bezier curve control points for cinematic camera path
const CAMERA_PATH = {
    // Start: Deep space, far from islands
    start: new THREE.Vector3(0, 80, 200),
    // Control point 1: Sweeping arc
    control1: new THREE.Vector3(-50, 50, 100),
    // Control point 2: Coming closer
    control2: new THREE.Vector3(30, 25, 50),
    // End: Overview position - closer to islands
    end: new THREE.Vector3(0, 15, 32),
};

// Look-at targets along the path
const LOOK_AT_PATH = {
    start: new THREE.Vector3(0, 0, -100),
    control1: new THREE.Vector3(0, 0, -20),
    control2: new THREE.Vector3(0, 0, 0),
    end: new THREE.Vector3(0, 0, 0),
};

// Easing function for smooth animation
const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const easeInOutCubic = (t: number): number => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Cubic bezier interpolation
function cubicBezier(
    t: number,
    p0: THREE.Vector3,
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    p3: THREE.Vector3
): THREE.Vector3 {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const result = new THREE.Vector3();
    result.copy(p0).multiplyScalar(uuu);
    result.add(p1.clone().multiplyScalar(3 * uu * t));
    result.add(p2.clone().multiplyScalar(3 * u * tt));
    result.add(p3.clone().multiplyScalar(ttt));

    return result;
}

export default function IntroSequence({ onComplete, skip = false }: IntroSequenceProps) {
    const { camera } = useThree();
    const progressRef = useRef(0);
    const [isComplete, setIsComplete] = useState(false);
    const startTimeRef = useRef<number | null>(null);

    const INTRO_DURATION = 4.5; // seconds

    // Handle skip
    useEffect(() => {
        if (skip && !isComplete) {
            // Jump to end position immediately
            camera.position.copy(CAMERA_PATH.end);
            camera.lookAt(LOOK_AT_PATH.end);
            setIsComplete(true);
            onComplete();
        }
    }, [skip, isComplete, camera, onComplete]);

    useFrame((state) => {
        if (isComplete || skip) return;

        // Initialize start time
        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const rawProgress = Math.min(elapsed / INTRO_DURATION, 1);

        // Apply easing for smooth feel
        progressRef.current = easeInOutCubic(rawProgress);
        const t = progressRef.current;

        // Calculate camera position along bezier curve
        const newPosition = cubicBezier(
            t,
            CAMERA_PATH.start,
            CAMERA_PATH.control1,
            CAMERA_PATH.control2,
            CAMERA_PATH.end
        );

        // Calculate look-at target along bezier curve
        const newLookAt = cubicBezier(
            t,
            LOOK_AT_PATH.start,
            LOOK_AT_PATH.control1,
            LOOK_AT_PATH.control2,
            LOOK_AT_PATH.end
        );

        // Apply camera transforms
        camera.position.copy(newPosition);
        camera.lookAt(newLookAt);

        // Check completion
        if (rawProgress >= 1 && !isComplete) {
            setIsComplete(true);
            onComplete();
        }
    });

    return null; // This is a controller component, no visual output
}
