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

import React from 'react';
import { useTilt } from '../../hooks';
import './TiltCard.css';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Max tilt in degrees */
    max?: number;
    /** Hover scale */
    scale?: number;
    /** Render a moving glare highlight */
    glare?: boolean;
    children: React.ReactNode;
}

/**
 * Wraps content in a mouse-tracked 3D tilt card with optional glare.
 * Tilt is disabled automatically on coarse pointers (touch devices).
 */
export const TiltCard: React.FC<TiltCardProps> = ({
    max = 8,
    scale = 1.015,
    glare = true,
    children,
    className = '',
    ...rest
}) => {
    const isTouch =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>({
        max,
        scale,
        disabled: isTouch,
    });

    return (
        <div
            ref={ref}
            className={`tilt-card ${className}`}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            {...rest}
        >
            {children}
            {glare && !isTouch && <div className="tilt-card-glare" aria-hidden="true"></div>}
        </div>
    );
};

export default TiltCard;
