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

import { useState, useEffect, useRef, useCallback } from 'react';

interface CounterOptions {
    start?: number;
    end: number;
    duration?: number;
    delay?: number;
    easing?: (t: number) => number;
}

export const useCounter = (options: CounterOptions) => {
    const {
        start = 0,
        end,
        duration = 2000,
        delay = 0,
        easing = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    } = options;

    const [count, setCount] = useState(start);
    const [isRunning, setIsRunning] = useState(false);
    const frameRef = useRef<number | undefined>(undefined);

    const animate = useCallback(() => {
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);

            setCount(Math.round(start + (end - start) * easedProgress));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(step);
            } else {
                setIsRunning(false);
            }
        };

        setTimeout(() => {
            setIsRunning(true);
            frameRef.current = requestAnimationFrame(step);
        }, delay);
    }, [start, end, duration, delay, easing]);

    const startCounting = useCallback(() => {
        if (!isRunning) {
            animate();
        }
    }, [animate, isRunning]);

    const reset = useCallback(() => {
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }
        setCount(start);
        setIsRunning(false);
    }, [start]);

    useEffect(() => {
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    return { count, isRunning, startCounting, reset };
};

export default useCounter;
