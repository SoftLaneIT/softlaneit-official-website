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

import { useRef, useCallback } from 'react';

interface TiltOptions {
    /** Max rotation in degrees */
    max?: number;
    /** Scale on hover */
    scale?: number;
    /** Perspective in px */
    perspective?: number;
    /** Disable (e.g. mobile) */
    disabled?: boolean;
}

/**
 * 3D tilt-on-hover effect. Attach the returned handlers + ref to a card.
 * Also sets `--glare-x` / `--glare-y` CSS vars (in %) for glare/spotlight effects.
 */
export const useTilt = <T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) => {
    const { max = 10, scale = 1.02, perspective = 900, disabled = false } = options;
    const ref = useRef<T>(null);
    const frame = useRef<number>(0);

    const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
        if (disabled || !ref.current) return;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1

        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const rotateY = (px - 0.5) * 2 * max;
            const rotateX = (0.5 - py) * 2 * max;
            el.style.transform =
                `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
            el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
            el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
        });
    }, [disabled, max, scale, perspective]);

    const onMouseLeave = useCallback(() => {
        if (!ref.current) return;
        cancelAnimationFrame(frame.current);
        ref.current.style.transform =
            `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }, [perspective]);

    return { ref, onMouseMove, onMouseLeave };
};

export default useTilt;
