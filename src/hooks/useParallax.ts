import { useState, useEffect, useCallback } from 'react';

interface ParallaxOptions {
    speed?: number;
    direction?: 'up' | 'down';
    disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
    const { speed = 0.5, direction = 'up', disabled = false } = options;
    const [offset, setOffset] = useState(0);

    const handleScroll = useCallback(() => {
        if (disabled) return;

        const scrollY = window.scrollY;
        const parallaxOffset = direction === 'up' ? scrollY * speed : -scrollY * speed;
        setOffset(parallaxOffset);
    }, [speed, direction, disabled]);

    useEffect(() => {
        if (disabled) return;

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, disabled]);

    return {
        offset,
        style: {
            transform: `translateY(${offset}px)`,
            willChange: 'transform',
        },
    };
};

export default useParallax;
