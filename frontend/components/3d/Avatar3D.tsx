"use client";

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Mouse interaction - camera parallax
function CameraController() {
  const { camera } = useThree();
  const [mouse] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (typeof window !== 'undefined') {
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    }
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  return null;
}

// Neural network style sphere with wireframe
function NeuralSphere() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Transparent core */}
      <Sphere args={[2.0, 64, 64]}>
        <meshPhysicalMaterial
          color="#819fa7"
          emissive="#819fa7"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.15}
          transmission={0.9}
          thickness={0.5}
        />
      </Sphere>

      {/* Dense wireframe network */}
      <Sphere args={[2.0, 24, 24]}>
        <meshBasicMaterial
          color="#819fa7"
          wireframe
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Outer sparse wireframe */}
      <Sphere args={[2.05, 12, 12]}>
        <meshBasicMaterial
          color="#5b6e74"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
}

// Neural nodes - organized floating points with data pulses
function NeuralNodes({ nodes }: { nodes: Array<{ x: number; y: number; z: number; delay: number }> }) {
  const nodesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;

      // Animate individual nodes
      nodesRef.current.children.forEach((child, i) => {
        const node = nodes[i];
        const pulse = Math.sin(state.clock.getElapsedTime() * 2 + node.delay) * 0.5 + 0.5;
        child.scale.setScalar(0.8 + pulse * 0.4);
      });
    }
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#819fa7"
            emissive="#819fa7"
            emissiveIntensity={1.0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Neural connections - lines between nearby nodes
function NeuralConnections({ nodes }: { nodes: Array<{ x: number; y: number; z: number }> }) {
  const linesRef = useRef<THREE.Group>(null);
  const pulsesRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const conns = [];
    const maxDistance = 1.2;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          conns.push({
            start: new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z),
            end: new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z),
            distance: distance,
            delay: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.0
          });
        }
      }
    }
    return conns;
  }, [nodes]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;

      // Animate line opacity
      linesRef.current.children.forEach((child: any, i) => {
        if (child.material) {
          const pulse = Math.sin(state.clock.getElapsedTime() * 1.5 + connections[i].delay) * 0.3 + 0.4;
          child.material.opacity = pulse * (1 - connections[i].distance / 1.2) * 0.3;
        }
      });
    }

    // Animate pulses along connections
    if (pulsesRef.current) {
      pulsesRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;

      pulsesRef.current.children.forEach((child: any, i) => {
        const conn = connections[i];
        const t = (state.clock.getElapsedTime() * conn.speed + conn.delay) % 1;

        // Interpolate position along the line
        child.position.lerpVectors(conn.start, conn.end, t);

        // Fade in/out at start/end
        const fadeDist = 0.2;
        let opacity = 1.0;
        if (t < fadeDist) opacity = t / fadeDist;
        if (t > 1 - fadeDist) opacity = (1 - t) / fadeDist;

        if (child.material) {
          child.material.opacity = opacity * 0.8;
        }
      });
    }
  });

  return (
    <>
      {/* Connection lines */}
      <group ref={linesRef}>
        {connections.map((conn, i) => {
          const points = [conn.start, conn.end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: '#819fa7',
            transparent: true,
            opacity: 0.2
          });
          const line = new THREE.Line(geometry, material);

          return <primitive key={i} object={line} />;
        })}
      </group>

      {/* Data pulses */}
      <group ref={pulsesRef}>
        {connections.map((conn, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              color="#819fa7"
              emissive="#819fa7"
              emissiveIntensity={2.0}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

// Particle streams - data flowing outward
function ParticleStreams() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const particleCount = 200;
    const pos = new Float32Array(particleCount * 3);
    const vel = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = Math.random() * 1.5;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      vel.push({
        x: Math.sin(phi) * Math.cos(theta) * 0.02,
        y: Math.sin(phi) * Math.sin(theta) * 0.02,
        z: Math.cos(phi) * 0.02
      });
    }

    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < velocities.length; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        const dist = Math.sqrt(
          pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2
        );

        // Reset particle if too far
        if (dist > 4.5) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          const radius = Math.random() * 1.5;

          pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          pos[i * 3 + 2] = radius * Math.cos(phi);
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#819fa7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating data points with organic movement
function FloatingDataPoints() {
  const pointsRef = useRef<THREE.Group>(null);

  const dataPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 4.5 + Math.random() * 1.5;

      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        offset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        radius: radius
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.children.forEach((child, i) => {
        const point = dataPoints[i];
        const time = state.clock.getElapsedTime();

        // Organic floating movement
        child.position.x = point.x + Math.sin(time * point.speed + point.offset) * 0.3;
        child.position.y = point.y + Math.cos(time * point.speed * 0.7 + point.offset) * 0.3;
        child.position.z = point.z + Math.sin(time * point.speed * 0.5 + point.offset) * 0.3;

        // Pulsing
        const scale = 0.8 + Math.sin(time * 2 + point.offset) * 0.2;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={pointsRef}>
      {dataPoints.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#5b6e74"
            emissive="#5b6e74"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Rotating geometric rings - AI/tech aesthetic
function GeometricRings() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
      outerRingRef.current.rotation.x = Math.PI / 6;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z = -state.clock.getElapsedTime() * 0.2;
      middleRingRef.current.rotation.y = Math.PI / 4;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = state.clock.getElapsedTime() * 0.25;
      innerRingRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <>
      {/* Outer data ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3.2, 0.02, 6, 6]} />
        <meshStandardMaterial
          color="#819fa7"
          emissive="#819fa7"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Middle processing ring */}
      <mesh ref={middleRingRef}>
        <torusGeometry args={[2.8, 0.018, 8, 8]} />
        <meshStandardMaterial
          color="#5b6e74"
          emissive="#5b6e74"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Inner neural ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.3, 0.015, 12, 12]} />
        <meshStandardMaterial
          color="#819fa7"
          emissive="#819fa7"
          emissiveIntensity={0.4}
        />
      </mesh>
    </>
  );
}

// Dynamic lighting with color shifts
function DynamicLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (light1Ref.current) {
      const intensity = 1.5 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      light1Ref.current.intensity = intensity;
    }
    if (light2Ref.current) {
      const intensity = 0.8 + Math.cos(state.clock.getElapsedTime() * 0.7) * 0.2;
      light2Ref.current.intensity = intensity;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={light1Ref} position={[6, 6, 6]} intensity={1.5} color="#819fa7" />
      <pointLight ref={light2Ref} position={[-6, -6, 3]} intensity={0.8} color="#5b6e74" />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#819fa7" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.7}
        color="#819fa7"
      />
    </>
  );
}

export default function Avatar3D() {
  // Generate nodes once at the top level so we can share them
  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 80; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2.3 + Math.random() * 1.8;

      nodePositions.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        delay: Math.random() * Math.PI * 2,
      });
    }
    return nodePositions;
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 40 }}
        style={{ background: 'transparent' }}
      >
        {/* Dynamic Lighting */}
        <DynamicLights />

        {/* Camera Parallax */}
        <CameraController />

        {/* 3D Elements - Neural Network Visualization */}
        <group scale={1.0}>
          <NeuralSphere />
          <NeuralNodes nodes={nodes} />
          <NeuralConnections nodes={nodes} />
          <ParticleStreams />
          <FloatingDataPoints />
          <GeometricRings />
        </group>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          minDistance={9}
          maxDistance={9}
          enableDamping={false}
        />
      </Canvas>
    </div>
  );
}
