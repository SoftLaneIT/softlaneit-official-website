/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 * You may obtain a copy of the LICENSE at
 *
 * https://softlaneit.com/LICENSE.txt
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the LICENSE is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the LICENSE for the
 * specific language governing permissions and limitations
 * under the LICENSE.
 */

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const BRAND_ORANGE = '#F5821F';
const BRAND_ORANGE_LIGHT = '#FF9A3C';

/** Tracks the data-theme attribute so the scene adapts to light/dark. */
const useTheme = (): 'light' | 'dark' => {
    const read = () =>
        (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    const [theme, setTheme] = useState<'light' | 'dark'>(read);

    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(read()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return theme;
};

/** Deterministic PRNG (mulberry32) — keeps the render pure & the field stable. */
const mulberry32 = (seed: number) => () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Slowly drifting particle field with mouse parallax. */
const ParticleField: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const points = useRef<THREE.Points>(null);
    const COUNT = 1400;

    const positions = useMemo(() => {
        const rand = mulberry32(20260610);
        const arr = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            // distribute in a flat-ish ellipsoid shell around the camera view
            const r = 6 + rand() * 10;
            const theta = rand() * Math.PI * 2;
            const phi = Math.acos(2 * rand() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.6;
            arr[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 4;
        }
        return arr;
    }, []);

    useFrame(({ pointer, clock }) => {
        if (!points.current) return;
        const t = clock.getElapsedTime();
        points.current.rotation.y = t * 0.02 + pointer.x * 0.12;
        points.current.rotation.x = pointer.y * 0.08;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.035}
                color={theme === 'dark' ? BRAND_ORANGE_LIGHT : '#D96E0F'}
                transparent
                opacity={theme === 'dark' ? 0.55 : 0.4}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

/** Core "energy" blob — distorted sphere wrapped in a wireframe icosahedron. */
const CoreShape: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const group = useRef<THREE.Group>(null);
    const wire = useRef<THREE.Mesh>(null);

    useFrame(({ pointer, clock }) => {
        const t = clock.getElapsedTime();
        if (group.current) {
            // gentle mouse parallax
            group.current.rotation.y += ((pointer.x * 0.5) - group.current.rotation.y) * 0.04;
            group.current.rotation.x += ((-pointer.y * 0.35) - group.current.rotation.x) * 0.04;
        }
        if (wire.current) {
            wire.current.rotation.y = t * 0.12;
            wire.current.rotation.z = t * 0.06;
        }
    });

    return (
        <group ref={group} position={[2.6, 0.2, -1]}>
            <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
                {/* inner molten sphere */}
                <mesh scale={1.25}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color={BRAND_ORANGE}
                        emissive={new THREE.Color(BRAND_ORANGE).multiplyScalar(0.25)}
                        roughness={0.25}
                        metalness={0.7}
                        distort={0.38}
                        speed={1.6}
                    />
                </mesh>
                {/* outer wireframe cage */}
                <mesh ref={wire} scale={1.9}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        color={theme === 'dark' ? BRAND_ORANGE_LIGHT : '#3D3D3D'}
                        wireframe
                        transparent
                        opacity={theme === 'dark' ? 0.22 : 0.18}
                    />
                </mesh>
                {/* orbital ring */}
                <mesh rotation={[Math.PI / 2.4, 0.4, 0]} scale={2.5}>
                    <torusGeometry args={[1, 0.006, 16, 128]} />
                    <meshBasicMaterial
                        color={BRAND_ORANGE_LIGHT}
                        transparent
                        opacity={theme === 'dark' ? 0.5 : 0.35}
                    />
                </mesh>
            </Float>
        </group>
    );
};

/** Small floating accent shapes for depth. */
const Accents: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const color = theme === 'dark' ? BRAND_ORANGE_LIGHT : '#3D3D3D';
    return (
        <>
            <Float speed={2} rotationIntensity={1.2} floatIntensity={1.6}>
                <mesh position={[-4.2, 1.6, -3]} scale={0.5}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
                </mesh>
            </Float>
            <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
                <mesh position={[-2.8, -1.8, -2]} scale={0.32}>
                    <torusKnotGeometry args={[1, 0.3, 64, 12]} />
                    <meshBasicMaterial color={BRAND_ORANGE} wireframe transparent opacity={0.28} />
                </mesh>
            </Float>
            <Float speed={2.4} rotationIntensity={1.4} floatIntensity={2}>
                <mesh position={[4.6, -1.4, -4]} scale={0.4}>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
                </mesh>
            </Float>
        </>
    );
};

/** Camera rig: subtle dolly + parallax against the mouse. */
const CameraRig: React.FC = () => {
    useFrame(({ camera, pointer }) => {
        camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.03;
        camera.position.y += (pointer.y * 0.25 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
    });
    return null;
};

interface HeroSceneProps {
    /** 0..1 scroll progress — scene fades/recedes as you scroll away */
    scrollProgress?: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ scrollProgress = 0 }) => {
    const theme = useTheme();
    const reducedMotion = useMemo(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        []
    );

    return (
        <div
            className="hero-scene"
            style={{
                opacity: Math.max(0, 1 - scrollProgress * 1.4),
                transform: `translateY(${scrollProgress * 80}px) scale(${1 + scrollProgress * 0.1})`,
            }}
            aria-hidden="true"
        >
            <Canvas
                dpr={[1, 1.75]}
                camera={{ position: [0, 0, 8], fov: 42 }}
                frameloop={reducedMotion ? 'demand' : 'always'}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={theme === 'dark' ? 0.4 : 0.9} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
                <pointLight position={[-4, -2, 2]} intensity={6} color={BRAND_ORANGE} />

                <ParticleField theme={theme} />
                <CoreShape theme={theme} />
                <Accents theme={theme} />
                {!reducedMotion && <CameraRig />}
            </Canvas>
        </div>
    );
};

export default HeroScene;
