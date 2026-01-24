"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float, Stars, Trail, Line, Lightformer } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";
import { Preloader } from "@/components/ui/Preloader";
import { InteractiveStars } from "@/components/3d/InteractiveStars";

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
        position: [3.5, 0, 0],
        rotation: [0, -Math.PI / 4, 0],
        scale: 1.3,
        color: "#ff8c42",
        // Reduced p from 10 to 6 for a cleaner morph
        knot: { p: 6, q: 3, radius: 0.8, tube: 0.35 }
    },
    // 2: Flow - Smooth & Interwoven (Emerald/Neon)
    {
        position: [-3.5, 0, 0],
        rotation: [Math.PI / 8, Math.PI / 4, 0],
        scale: 1.4,
        color: "#00ff88",
        knot: { p: 3, q: 2, radius: 0.9, tube: 0.25 }
    },
    // 3: Future - Minimalist & Orbital (Deep Lavender)
    {
        position: [0, -0.5, 0],
        rotation: [Math.PI / 2, 0, Math.PI],
        scale: 1.3,
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
    // Use useLayoutEffect to ensure this runs synchronously before paint
    useLayoutEffect(() => {
        if (meshRef.current) {
            // Force three.js to recognize morph targets
            meshRef.current.updateMorphTargets();

            // Manual fallback to ensure morphTargetInfluences is an array
            // This prevents MeshTransmissionMaterial from crashing during background render
            if (!meshRef.current.morphTargetInfluences || meshRef.current.morphTargetInfluences.length === 0) {
                meshRef.current.morphTargetInfluences = new Array(SCENE_STATES.length).fill(0);
            }
            setReady(true);
        }
    }, [baseGeometry]);

    const [ready, setReady] = useState(false);

    const currentColor = useMemo(() => new THREE.Color(), []);

    // Smoothing reference for scroll
    const progressRef = useRef(0);
    // Smoothing reference for mouse
    const mouseRef = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        try {
            const mesh = meshRef.current;
            // Only update if ready and material exists
            if (!ready || !mesh || !mesh.morphTargetInfluences) return;
            const material = materialRef.current;
            if (!material) return;

            // EXTREMELY DEFENSIVE: Check morphTargetInfluences
            const influences = mesh.morphTargetInfluences;
            if (!influences || !Array.isArray(influences)) return;

            const progress = scrollYProgress?.get() ?? 0;
            // ... strict mode ...
            // Mouse smoothing
            // We want the model to look at the mouse. 
            // state.pointer.x is -1 to 1.
            const targetMouseX = state.pointer.x * 0.5; // Scale factor for rotation intensity
            const targetMouseY = state.pointer.y * 0.5;

            // Smooth the mouse values
            mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, targetMouseX, 0.05); // 0.05 is the damping factor
            mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, targetMouseY, 0.05);

            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            const states = SCENE_STATES;
            if (!Array.isArray(states) || states.length === 0) return;

            const numStates = states.length;
            const totalStates = numStates - 1;

            // Calculate target progress (0 to totalStates)
            const targetRaw = progress * totalStates;

            // Smooth damping: interpolation factor based on delta time
            // Adjust '4' to change the "weight" (higher = faster, lower = heavier)
            const smoothFactor = 1 - Math.exp(-4 * delta);
            progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetRaw, smoothFactor);

            const rawProgress = progressRef.current;

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

            // Add a subtle velocity-based tilt for extra polish
            const velocity = (targetRaw - rawProgress);

            mesh.position.set(pX, pY, pZ);

            // ROTATION WITH MOUSE INTERACTION
            // We adding mouseX to Y rotation (turning left/right)
            // and mouseY to X rotation (looking up/down)
            mesh.rotation.set(
                rX + (state.clock?.elapsedTime ?? 0) * 0.2 + velocity * 0.2 - mouseY,
                rY + (state.clock?.elapsedTime ?? 0) * 0.25 + velocity * 0.2 + mouseX,
                rZ
            );

            mesh.scale.setScalar(s);

            if (material.color) {
                // Use HSL interpolation for vibrant color transitions
                currentColor.set(current.color).lerpHSL(new THREE.Color(next.color), percent);
                material.color.copy(currentColor);
            }

            // Reduced peak distortion to keep shape legible
            const intensity = Math.sin(percent * Math.PI);
            material.distortion = 0.1 + intensity * 1.5;
            material.distortionScale = 0.5 + intensity * 1.0;
            material.ior = 1.2 + intensity * 0.6;
            material.chromaticAberration = 0.3 + intensity * 0.5;
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
                {ready && (
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
                )}
            </mesh>
        </Float>
    );
}

// A mesh that spans width and looks like a triangulated network
function GeometricField() {
    const groupRef = useRef<THREE.Group>(null);
    const { scrollYProgress } = useScroll();

    // Create a grid of points
    const geometry = useMemo(() => {
        // Wide plane to cover full screen: width, height, widthSegments, heightSegments
        // 60 width is plenty for desktop
        const geo = new THREE.PlaneGeometry(60, 40, 40, 25);

        // Randomize vertices slightly to get that "organic" triangulation look
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            // x, y, z processing
            // We keep z flat-ish but noisy
            pos.setZ(i, (Math.random() - 0.5) * 2);

            // Slight x/y jitter to break the perfect grid
            pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.5);
            pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 0.5);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    // Smoothing for parallax
    const scrollRef = useRef(0);

    useFrame((state, delta) => {
        if (groupRef.current) {
            const target = scrollYProgress?.get() ?? 0;
            // Smooth damping
            scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, target, 1 - Math.exp(-3 * delta));
            const p = scrollRef.current;

            // Parallax movement - moves up/farther
            groupRef.current.position.y = p * 8 - 5;
            groupRef.current.position.z = -15 + p * 2;
            groupRef.current.rotation.x = -Math.PI / 4 + p * 0.1;

            // Subtle constant wave motion
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[0, -10, -15]} rotation={[-Math.PI / 4, 0, 0]}>
            {/* The "Triangle Lines" - Wireframe */}
            <lineSegments>
                <wireframeGeometry args={[geometry]} />
                <lineBasicMaterial color="#4a90e2" opacity={0.35} transparent />
            </lineSegments>

            {/* The "Dots" - Vertices */}
            <points geometry={geometry}>
                <pointsMaterial
                    size={0.15}
                    color="#9013fe"
                    opacity={0.8}
                    transparent
                    sizeAttenuation
                />
            </points>
        </group>
    );
}

// BackgroundParallax removed in favor of InteractiveStars


export default function HeroScene() {
    return (
        <>
            <Preloader />
            {/* Global Background - Deepest Layer */}
            <div className="fixed top-0 left-0 w-full h-screen -z-50 bg-black" />

            {/* 3D Scene - Mid-Foreground (On top of background elements, behind text) */}
            <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    eventSource={typeof window !== "undefined" ? document.body : undefined}
                    eventPrefix="client"
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        pointerEvents: "none",
                    }}
                >
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <Environment resolution={256}>
                        <group rotation={[-Math.PI / 3, 0, 1]}>
                            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
                        </group>
                    </Environment>

                    <Model />
                    <GeometricField />
                    <InteractiveStars />

                    {/* Fog for depth */}
                    <fog attach="fog" args={['#000', 5, 25]} />
                </Canvas>
            </div>
        </>
    );
}
