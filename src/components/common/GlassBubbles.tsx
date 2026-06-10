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

import React, { useEffect, useRef } from 'react';
import './GlassBubbles.css';

export interface BubbleConfig {
    /** Diameter in px */
    size: number;
    /** CSS top, e.g. '20%' */
    top: string;
    /** CSS left, e.g. '80%' */
    left: string;
    /** Parallax speed multiplier (-1..1). Negative = moves opposite to scroll */
    speed: number;
    /** Float animation delay in s */
    delay?: number;
}

interface GlassBubblesProps {
    bubbles: BubbleConfig[];
}

/**
 * Water-bubble glass orbs that parallax at independent speeds while the
 * section scrolls through the viewport. Transforms are written directly to
 * the DOM inside one rAF-throttled scroll handler — zero React re-renders.
 */
export const GlassBubbles: React.FC<GlassBubblesProps> = ({ bubbles }) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let ticking = false;
        const update = () => {
            ticking = false;
            const wrap = wrapRef.current;
            if (!wrap) return;
            const rect = wrap.getBoundingClientRect();
            const vh = window.innerHeight;
            // -1 (below viewport) .. 0 (centered) .. 1 (above viewport)
            const centered = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
            for (let i = 0; i < bubbles.length; i++) {
                const el = itemRefs.current[i];
                if (!el) continue;
                const y = centered * bubbles[i].speed * 160;
                el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
            }
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [bubbles]);

    return (
        <div className="glass-bubbles" ref={wrapRef} aria-hidden="true">
            {bubbles.map((b, i) => (
                <div
                    key={i}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    className="glass-bubble-track"
                    style={{ top: b.top, left: b.left }}
                >
                    <div
                        className="glass-bubble"
                        style={{
                            width: b.size,
                            height: b.size,
                            animationDelay: `${b.delay ?? 0}s`,
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default GlassBubbles;
