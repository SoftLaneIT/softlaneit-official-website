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

import { useEffect, useRef, useState } from 'react';

/**
 * Returns 0..1 progress of an element scrolling through the viewport.
 * 0 = element top at viewport bottom, 1 = element bottom at viewport top.
 * Cheap (rAF-throttled, passive listener).
 */
export const useScrollProgress = <T extends HTMLElement = HTMLDivElement>() => {
    const ref = useRef<T>(null);
    const [progress, setProgress] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const update = () => {
            ticking.current = false;
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = rect.height + vh;
            const passed = vh - rect.top;
            setProgress(Math.min(1, Math.max(0, passed / total)));
        };

        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
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
    }, []);

    return { ref, progress };
};

export default useScrollProgress;
