"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export function InteractiveStars({ count = 3000 }) {
    const mesh = useRef<THREE.Points>(null);
    const material = useRef<THREE.ShaderMaterial>(null);
    const { scrollYProgress } = useScroll();

    // Generate random points in a sphere/box
    const [positions, sizes, randoms] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const randoms = new Float32Array(count); // For random twinkle timing

        for (let i = 0; i < count; i++) {
            // Spread stars wide
            const r = 80;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            sizes[i] = Math.random();
            randoms[i] = Math.random();
        }
        return [positions, sizes, randoms];
    }, [count]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#ffffff') }
    }), []);

    // Parallax + Mouse Update + Rotation
    useFrame((state) => {
        if (material.current) {
            material.current.uniforms.uTime.value = state.clock.elapsedTime;
            // Dampen mouse movement for smoother light effect
            const x = THREE.MathUtils.lerp(material.current.uniforms.uMouse.value.x, state.pointer.x, 0.1);
            const y = THREE.MathUtils.lerp(material.current.uniforms.uMouse.value.y, state.pointer.y, 0.1);
            material.current.uniforms.uMouse.value.set(x, y);
        }

        if (mesh.current) {
            // Slow background rotation
            mesh.current.rotation.y = state.clock.elapsedTime * 0.02;

            // Scroll Parallax (Optional - if we want them to move with scroll)
            // const scroll = scrollYProgress?.get() ?? 0;
            // mesh.current.rotation.x = scroll * 0.2;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={material}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={uniforms}
                vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          attribute float aSize;
          attribute float aRandom;
          varying float vSize;
          varying float vRandom;
          varying vec2 vScreenPos;
          varying float vDistance;

          void main() {
            vSize = aSize;
            vRandom = aRandom;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Standard projection
            gl_Position = projectionMatrix * mvPosition;
            
            // Calculate Normalized Device Coordinates (NDC) for interaction
            vec2 ndc = gl_Position.xy / gl_Position.w;

            // Calculate distance to mouse in NDC space
            float dist = distance(ndc, uMouse);
            vDistance = dist;

            // --- MAGNETIC ATTRACTION ---
            // Direction vector from star to mouse
            vec2 dir = uMouse - ndc;
            
            // Attraction strength based on distance (closer = stronger pull)
            // Radius 0.6, max pull strength 0.4
            float attraction = smoothstep(0.6, 0.0, dist) * 0.4;
            
            // Move the star towards the mouse in screen space
            // Multiply by gl_Position.w to maintain perspective correctness in clip space
            gl_Position.xy += dir * attraction * gl_Position.w;
            
            // Update vScreenPos for fragment shader (using the new position)
            vScreenPos = gl_Position.xy / gl_Position.w;

            // Scale up stars when near mouse
            float scale = 1.0 + smoothstep(0.5, 0.0, dist) * 3.0; 

            gl_PointSize = (150.0 * aSize * scale) / -mvPosition.z; 
          }
        `}
                fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying float vSize;
          varying float vRandom;
          varying vec2 vScreenPos;
          varying float vDistance;

          void main() {
             float d = distance(gl_PointCoord, vec2(0.5));
             if (d > 0.5) discard;

             float twinkle = sin(uTime * 2.0 + vRandom * 10.0) * 0.5 + 0.5;
             
             // Highlight based on distance (using the morphed distance)
             float highlight = 1.0 - smoothstep(0.0, 0.5, vDistance);
             
             // Colors: Slate White -> Sky Blue / Indigo
             vec3 baseColor = vec3(0.9, 0.95, 1.0);
             // Mix between Sky Blue (#38bdf8) and Indigo (#6366f1)
             vec3 activeColor = mix(vec3(0.22, 0.74, 0.97), vec3(0.39, 0.40, 0.94), highlight);
             
             vec3 finalColor = mix(baseColor, activeColor, highlight);
             
             // Base Alpha boosted significantly for visibility
             float alpha = (0.5 + twinkle * 0.3) + (highlight * 0.5);

             gl_FragColor = vec4(finalColor, alpha); 
          }
        `}
            />
        </points>
    );
}
