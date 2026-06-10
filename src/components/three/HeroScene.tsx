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
import * as THREE from 'three';

const BRAND_ORANGE = '#F5821F';
const BRAND_ORANGE_LIGHT = '#FF9A3C';
const GLOBE_POS: [number, number, number] = [2.7, 0.15, -0.8];

/** Soft circular sprite so points render as glowing dots, not squares. */
let _dotTexture: THREE.CanvasTexture | null = null;
const getDotTexture = () => {
    if (_dotTexture) return _dotTexture;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.8)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    _dotTexture = new THREE.CanvasTexture(c);
    return _dotTexture;
};

/** Deterministic PRNG (mulberry32) — keeps renders pure & geometry stable. */
const mulberry32 = (seed: number) => () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

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

/** Fibonacci-sphere point distribution — even, clean, "digital globe" look. */
const fibonacciSphere = (count: number, radius: number) => {
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        arr[i * 3] = Math.cos(theta) * r * radius;
        arr[i * 3 + 1] = y * radius;
        arr[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    return arr;
};

/* ------------------------------------------------------------------ */
/* Digital network globe — dotted sphere + glowing connection arcs     */
/* ------------------------------------------------------------------ */
const NetworkGlobe: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const group = useRef<THREE.Group>(null);
    const globe = useRef<THREE.Group>(null);
    const RADIUS = 1.55;

    const dots = useMemo(() => fibonacciSphere(700, RADIUS), []);

    // network arcs between surface points (quadratic curves lifted off the surface)
    const arcs = useMemo(() => {
        const rand = mulberry32(99);
        const segs: number[] = [];
        const ARCS = 7;
        for (let a = 0; a < ARCS; a++) {
            const p = (i: number) => new THREE.Vector3(dots[i * 3], dots[i * 3 + 1], dots[i * 3 + 2]);
            const i1 = Math.floor(rand() * 700);
            const i2 = Math.floor(rand() * 700);
            const start = p(i1);
            const end = p(i2);
            const mid = start.clone().add(end).multiplyScalar(0.5);
            const lift = 1 + start.distanceTo(end) / (RADIUS * 2.2);
            mid.setLength(RADIUS * lift);
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const pts = curve.getPoints(24);
            for (let i = 0; i < pts.length - 1; i++) {
                segs.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
            }
        }
        return new Float32Array(segs);
    }, [dots]);

    useFrame(({ pointer, clock }) => {
        const t = clock.getElapsedTime();
        if (globe.current) {
            globe.current.rotation.y = t * 0.12;
        }
        if (group.current) {
            group.current.rotation.y += ((pointer.x * 0.35) - group.current.rotation.y) * 0.04;
            group.current.rotation.x += ((-pointer.y * 0.25) - group.current.rotation.x) * 0.04;
        }
    });

    return (
        <group position={GLOBE_POS}>
            <group ref={group} rotation={[0.25, 0, 0.18]}>
                <group ref={globe}>
                    {/* surface dots */}
                    <points>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[dots, 3]} />
                        </bufferGeometry>
                        <pointsMaterial
                            size={0.035}
                            map={getDotTexture()}
                            alphaTest={0.01}
                            color={theme === 'dark' ? BRAND_ORANGE_LIGHT : '#D96E0F'}
                            transparent
                            opacity={0.9}
                            sizeAttenuation
                            depthWrite={false}
                        />
                    </points>

                    {/* fine wireframe shell */}
                    <mesh>
                        <sphereGeometry args={[RADIUS, 24, 18]} />
                        <meshBasicMaterial
                            color={theme === 'dark' ? BRAND_ORANGE : '#3D3D3D'}
                            wireframe
                            transparent
                            opacity={theme === 'dark' ? 0.05 : 0.06}
                        />
                    </mesh>

                    {/* network connection arcs */}
                    <lineSegments>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[arcs, 3]} />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color={BRAND_ORANGE_LIGHT}
                            transparent
                            opacity={theme === 'dark' ? 0.28 : 0.25}
                        />
                    </lineSegments>
                </group>

                {/* equator highlight ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[RADIUS * 1.18, 0.0045, 8, 128]} />
                    <meshBasicMaterial
                        color={BRAND_ORANGE_LIGHT}
                        transparent
                        opacity={theme === 'dark' ? 0.4 : 0.3}
                    />
                </mesh>
            </group>
        </group>
    );
};

/* ------------------------------------------------------------------ */
/* Circuit ring — networked nodes + traces orbiting the globe          */
/* ------------------------------------------------------------------ */
const CircuitRing: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const group = useRef<THREE.Group>(null);

    const { nodes, lines } = useMemo(() => {
        const rand = mulberry32(1337);
        const N = 72;
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < N; i++) {
            const angle = (i / N) * Math.PI * 2;
            const radius = 2.5 + (rand() - 0.5) * 0.5;
            pts.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                (rand() - 0.5) * 0.6,
                Math.sin(angle) * radius * 0.92
            ));
        }
        const nodeArr = new Float32Array(N * 3);
        pts.forEach((p, i) => p.toArray(nodeArr, i * 3));

        const segs: number[] = [];
        for (let i = 0; i < N; i++) {
            const a = pts[i];
            const b = pts[(i + 1) % N];
            segs.push(a.x, a.y, a.z, b.x, b.y, b.z);
            // rare short chords only — keeps the ring clean, not a tangle of wires
            if (rand() > 0.94) {
                const c = pts[(i + 3 + Math.floor(rand() * 3)) % N];
                segs.push(a.x, a.y, a.z, c.x, c.y, c.z);
            }
        }
        return { nodes: nodeArr, lines: new Float32Array(segs) };
    }, []);

    useFrame(({ clock }) => {
        if (!group.current) return;
        group.current.rotation.y = clock.getElapsedTime() * 0.06;
    });

    const lineColor = theme === 'dark' ? BRAND_ORANGE_LIGHT : '#D96E0F';

    return (
        <group ref={group} position={GLOBE_POS} rotation={[0.5, 0, -0.14]}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    map={getDotTexture()}
                    alphaTest={0.01}
                    color={lineColor}
                    transparent
                    opacity={theme === 'dark' ? 0.8 : 0.65}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[lines, 3]} />
                </bufferGeometry>
                <lineBasicMaterial
                    color={lineColor}
                    transparent
                    opacity={theme === 'dark' ? 0.10 : 0.09}
                />
            </lineSegments>
        </group>
    );
};

/* ------------------------------------------------------------------ */
/* Data packets — bright dots streaming along the circuit ring         */
/* ------------------------------------------------------------------ */
const DataPackets: React.FC = () => {
    const ref = useRef<THREE.Points>(null);
    const COUNT = 12;
    const positions = useMemo(() => new Float32Array(COUNT * 3), []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        const attr = ref.current.geometry.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < COUNT; i++) {
            const angle = t * 0.3 + (i / COUNT) * Math.PI * 2;
            attr.setXYZ(
                i,
                Math.cos(angle) * 2.55,
                Math.sin(angle * 3 + i) * 0.24,
                Math.sin(angle) * 2.4
            );
        }
        attr.needsUpdate = true;
    });

    return (
        <group position={GLOBE_POS} rotation={[0.5, 0, -0.14]}>
            <points ref={ref}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    map={getDotTexture()}
                    alphaTest={0.01}
                    color="#FFD9B0"
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>
        </group>
    );
};

/* ------------------------------------------------------------------ */
/* Digital grid floor — endless "flythrough" wireframe plane           */
/* ------------------------------------------------------------------ */
const GridFloor: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const ref = useRef<THREE.Group>(null);
    const CELL = 1.25;

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.position.z = (clock.getElapsedTime() * 0.35) % CELL;
    });

    return (
        <group ref={ref} position={[0, -2.4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[40, 30, 32, 24]} />
                <meshBasicMaterial
                    color={theme === 'dark' ? BRAND_ORANGE : '#3D3D3D'}
                    wireframe
                    transparent
                    opacity={theme === 'dark' ? 0.07 : 0.06}
                />
            </mesh>
        </group>
    );
};

/* ------------------------------------------------------------------ */
/* Ambient particle field with mouse parallax                          */
/* ------------------------------------------------------------------ */
const ParticleField: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const points = useRef<THREE.Points>(null);
    const COUNT = 1100;

    const positions = useMemo(() => {
        const rand = mulberry32(20260610);
        const arr = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
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
                size={0.03}
                map={getDotTexture()}
                alphaTest={0.01}
                color={theme === 'dark' ? BRAND_ORANGE_LIGHT : '#D96E0F'}
                transparent
                opacity={theme === 'dark' ? 0.4 : 0.3}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
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
    const paused = scrollProgress >= 0.98;

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
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 8], fov: 42 }}
                frameloop={reducedMotion || paused ? 'demand' : 'always'}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ParticleField theme={theme} />
                <GridFloor theme={theme} />
                <CircuitRing theme={theme} />
                <DataPackets />
                <NetworkGlobe theme={theme} />
                {!reducedMotion && <CameraRig />}
            </Canvas>
        </div>
    );
};

export default HeroScene;
