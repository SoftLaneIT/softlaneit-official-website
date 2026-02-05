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
    const frameRef = useRef<number>();

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
