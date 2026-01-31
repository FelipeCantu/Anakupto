"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, PerspectiveCamera, ContactShadows, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ModernShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} castShadow>
                {/* Torus Knot for a complex, modern shape */}
                <torusKnotGeometry args={[1, 0.35, 128, 32]} />
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={5}
                    thickness={2}
                    roughness={0}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={1}
                    anisotropicBlur={3}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    background={new THREE.Color("#000000")}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    );
}

function FloatingParticles() {
    const count = 100;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -5 + Math.random() * 10;
            const yFactor = -5 + Math.random() * 10;
            const zFactor = -5 + Math.random() * 10;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </instancedMesh>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
            <pointLight position={[10, 10, -10]} intensity={1} color="#38bdf8" />

            <Environment preset="city" />

            <ModernShape />
            <FloatingParticles />

            <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
            </EffectComposer>
        </>
    );
}

export function AboutVisual() {
    return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* Dark background for contrast */}
            <div className="absolute inset-0 bg-[#020617]" />

            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: false }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
