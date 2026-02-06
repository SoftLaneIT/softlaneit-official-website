import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    wait?: any; // Can be any value that changes when we should re-check ref
}

interface ScrollAnimationReturn {
    ref: RefObject<HTMLDivElement | null>;
    isVisible: boolean;
    hasAnimated: boolean;
}

export const useScrollAnimation = (
    options: ScrollAnimationOptions = {}
): ScrollAnimationReturn => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true,
        wait = false // New option to wait for content/loading
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        // If we're waiting for something (like data loading), don't set up observer yet
        // OR if the ref is still null, we iterate again when 'wait' changes
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasAnimated(true);

                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce, wait]); // Add wait to dependencies

    return { ref, isVisible, hasAnimated };
};

export default useScrollAnimation;
