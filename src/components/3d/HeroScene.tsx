"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float, Stars, Trail, Line } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// Define the parameters for our morphable TorusKnot
type KnotParams = {
    p: number;
    q: number;
    radius: number;
    tube: number;
};

type SceneState = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    color: string;
    knot: KnotParams;
};

// Morphable Shapes (Base is the first one)
const SCENE_STATES: SceneState[] = [
    // 0: Hero - Balanced & Airy (Sky Blue)
    {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1.6,
        color: "#99d5ff",
        knot: { p: 2, q: 3, radius: 1, tube: 0.22 }
    },
    // 1: Technical - Sharp & Crystalline (Amber/Solar)
    {
        position: [2.5, 0, 0],
        rotation: [0, -Math.PI / 4, 0],
        scale: 1.3,
        color: "#ff8c42",
        knot: { p: 10, q: 3, radius: 0.8, tube: 0.35 }
    },
    // 2: Flow - Smooth & Interwoven (Emerald/Neon)
    {
        position: [-2.5, 0, 0],
        rotation: [Math.PI / 8, Math.PI / 4, 0],
        scale: 1.4,
        color: "#00ff88",
        knot: { p: 3, q: 2, radius: 0.9, tube: 0.25 }
    },
    // 3: Future - Minimalist & Orbital (Deep Lavender)
    {
        position: [0, -0.5, 0],
        rotation: [Math.PI / 2, 0, Math.PI],
        scale: 1.1,
        color: "#bf94ff",
        knot: { p: 1, q: 2, radius: 1.1, tube: 0.12 }
    },
];

// Configuration for vertex identity
const TUBULAR_SEGMENTS = 200;
const RADIAL_SEGMENTS = 40;

function Model() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const { scrollYProgress } = useScroll();

    // Pre-generate geometries and extract position attributes for morph targets
    const baseGeometry = useMemo(() => {
        const dummy = new THREE.BoxGeometry(0.01, 0.01, 0.01);
        try {
            const geos = SCENE_STATES.map(s =>
                new THREE.TorusKnotGeometry(
                    s.knot.radius,
                    s.knot.tube,
                    TUBULAR_SEGMENTS,
                    RADIAL_SEGMENTS,
                    s.knot.p,
                    s.knot.q
                )
            );

            const base = geos[0];
            if (!base) return dummy;

            // Extract valid positions only
            const morphPositions = geos
                .filter(g => g && g.attributes && g.attributes.position)
                .map(geo => geo.attributes.position);

            if (morphPositions.length > 0) {
                base.morphAttributes = {
                    position: morphPositions
                };
            }

            return base;
        } catch (e) {
            console.error("Geometry Init Error:", e);
            return dummy;
        }
    }, []);

    // CRITICAL: Force morph target initialization before the first render
    useEffect(() => {
        if (meshRef.current) {
            // Force three.js to recognize morph targets
            meshRef.current.updateMorphTargets();

            // Manual fallback to ensure morphTargetInfluences is an array
            // This prevents MeshTransmissionMaterial from crashing during background render
            if (!meshRef.current.morphTargetInfluences || meshRef.current.morphTargetInfluences.length === 0) {
                meshRef.current.morphTargetInfluences = new Array(SCENE_STATES.length).fill(0);
            }
        }
    }, [baseGeometry]);

    const currentColor = useMemo(() => new THREE.Color(), []);

    useFrame((state, delta) => {
        try {
            const mesh = meshRef.current;
            const material = materialRef.current;
            if (!mesh || !material) return;

            // EXTREMELY DEFENSIVE: Check morphTargetInfluences
            const influences = mesh.morphTargetInfluences;
            if (!influences || !Array.isArray(influences)) return;

            const progress = scrollYProgress?.get() ?? 0;
            const states = SCENE_STATES;
            if (!Array.isArray(states) || states.length === 0) return;

            const numStates = states.length;
            const totalStates = numStates - 1;
            const rawProgress = progress * totalStates;

            const influencesLen = influences.length;
            for (let i = 0; i < numStates; i++) {
                if (i < influencesLen) {
                    influences[i] = Math.max(0, 1 - Math.abs(rawProgress - i));
                }
            }

            const index = Math.floor(rawProgress);
            const nextIndex = Math.min(index + 1, totalStates);
            const percent = rawProgress - index;

            const current = states[index] || states[0];
            const next = states[nextIndex] || states[totalStates];

            if (!current || !next || !current.position || !next.position) return;

            // Interpolate shared values
            const pX = THREE.MathUtils.lerp(current.position[0], next.position[0], percent);
            const pY = THREE.MathUtils.lerp(current.position[1], next.position[1], percent);
            const pZ = THREE.MathUtils.lerp(current.position[2], next.position[2], percent);

            const rX = THREE.MathUtils.lerp(current.rotation[0], next.rotation[0], percent);
            const rY = THREE.MathUtils.lerp(current.rotation[1], next.rotation[1], percent);
            const rZ = THREE.MathUtils.lerp(current.rotation[2], next.rotation[2], percent);

            const s = THREE.MathUtils.lerp(current.scale, next.scale, percent);

            mesh.position.set(pX, pY, pZ);
            mesh.rotation.set(
                rX + (state.clock?.elapsedTime ?? 0) * 0.2,
                rY + (state.clock?.elapsedTime ?? 0) * 0.25,
                rZ
            );
            mesh.scale.setScalar(s);

            if (material.color) {
                currentColor.set(current.color).lerp(new THREE.Color(next.color), percent);
                material.color.copy(currentColor);
            }

            const intensity = Math.sin(percent * Math.PI);
            material.distortion = 0.1 + intensity * 2.5;
            material.distortionScale = 0.5 + intensity * 1.5;
            material.ior = 1.2 + intensity * 0.6;
            material.chromaticAberration = 0.3 + intensity * 1.2;
        } catch (e) {
            // Logs once per error type to avoid spamming
            if (state.clock.elapsedTime < 2) {
                console.error("Critical Model Frame Error:", e);
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} geometry={baseGeometry}>
                <MeshTransmissionMaterial
                    ref={materialRef}
                    backside
                    backsideThickness={5}
                    thickness={1.5}
                    roughness={0.02}
                    anisotropy={0.5}
                    transmission={1}
                    temporalDistortion={0.1}
                    background={new THREE.Color('#050505')}
                />
            </mesh>
        </Float>
    );
}

function AbstractLines() {
    // Generate random curves
    const count = 15;
    const lines = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => {
            const points = [];
            const yOffset = (i - count / 2) * 2;
            for (let x = -15; x <= 15; x++) {
                points.push(
                    new THREE.Vector3(
                        x,
                        yOffset + Math.sin(x * 0.5 + i) * 2,
                        -5 + Math.cos(x * 0.3) * 2 // depth variation
                    )
                );
            }
            return new THREE.CatmullRomCurve3(points);
        });
    }, []);

    const { scrollYProgress } = useScroll();
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            // Parallax effect on the whole group
            const p = scrollYProgress?.get() ?? 0;
            groupRef.current.position.y = p * 5; // Move up as we scroll down (inverse parallax)
            groupRef.current.rotation.z = p * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={[0, -5, -10]}>
            {lines && lines.map((curve, i) => {
                if (!curve) return null;
                const points = typeof curve.getPoints === 'function' ? curve.getPoints(50) : [];
                return (
                    <Line
                        key={i}
                        points={points}
                        color={i % 2 === 0 ? "#4a90e2" : "#9013fe"}
                        opacity={0.3}
                        transparent
                        lineWidth={1}
                    />
                );
            })}
        </group>
    );
}

// Background that moves with camera slightly for depth
function BackgroundParallax() {
    const starsRef = useRef<any>(null);
    const { scrollYProgress } = useScroll();

    useFrame(() => {
        if (starsRef.current) {
            starsRef.current.rotation.y = (scrollYProgress?.get() ?? 0) * 0.5;
        }
    })

    return (
        <group ref={starsRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    )
}

export default function HeroScene() {
    return (
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <ambientLight intensity={0.5} />
                <Environment preset="city" />

                <Model />
                <AbstractLines />
                <BackgroundParallax />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000', 5, 25]} />
            </Canvas>
        </div>
    );
}
