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
