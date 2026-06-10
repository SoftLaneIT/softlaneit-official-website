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

import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyInfo } from '../../data/content';
import { Button } from '../common';
import {
    SiReact, SiTypescript, SiNextdotjs, SiNodedotjs,
    SiGo, SiOpenjdk, SiGithub, SiKubernetes, SiDocker, SiTerraform,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import {
    ShieldCheck, Code2, Infinity as InfinityIcon, Brain, CloudCog, Network,
} from 'lucide-react';
import './Hero.css';

/* What we do + what we build with — rendered as a slim marquee strip */
const TECH_STRIP: { Icon: React.ComponentType<{ size?: number | string }>; label: string }[] = [
    { Icon: Code2, label: 'Software Engineering' },
    { Icon: SiReact, label: 'React' },
    { Icon: ShieldCheck, label: 'Cybersecurity' },
    { Icon: SiTypescript, label: 'TypeScript' },
    { Icon: InfinityIcon, label: 'DevOps' },
    { Icon: FaAws, label: 'AWS' },
    { Icon: Brain, label: 'AI / ML' },
    { Icon: SiKubernetes, label: 'Kubernetes' },
    { Icon: CloudCog, label: 'Cloud Solutions' },
    { Icon: SiGo, label: 'Go' },
    { Icon: Network, label: 'Solution Architecture' },
    { Icon: SiNodedotjs, label: 'Node.js' },
    { Icon: SiNextdotjs, label: 'Next.js' },
    { Icon: SiOpenjdk, label: 'Java' },
    { Icon: SiDocker, label: 'Docker' },
    { Icon: SiTerraform, label: 'Terraform' },
    { Icon: SiGithub, label: 'GitHub' },
];

const HeroScene = lazy(() =>
    import('../three/HeroScene').then((m) => ({ default: m.HeroScene }))
);

export const Hero: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(
        () => window.matchMedia('(max-width: 768px)').matches
    );
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // defer so the entrance transition actually plays
        const raf = requestAnimationFrame(() => setIsLoaded(true));
        const mq = window.matchMedia('(max-width: 768px)');
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);
        return () => {
            cancelAnimationFrame(raf);
            mq.removeEventListener('change', onChange);
        };
    }, []);

    // Scroll-driven parallax: 0 at top, 1 when hero fully scrolled past
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const vh = window.innerHeight;
                setScrollProgress(Math.min(1, Math.max(0, window.scrollY / vh)));
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Smoothed cursor follower
    useEffect(() => {
        let animationFrameId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const animate = () => {
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;
            setMousePosition({ x: currentX, y: currentY });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                targetX = e.clientX - rect.left;
                targetY = e.clientY - rect.top;
            }
        };

        const heroElement = heroRef.current;
        if (heroElement && !isMobile) {
            heroElement.addEventListener('mousemove', handleMouseMove);
            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile]);

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/contact');
    };

    const handleLearnMore = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const contentParallax: React.CSSProperties = {
        transform: `translateY(${scrollProgress * -60}px)`,
        opacity: 1 - scrollProgress * 1.1,
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* Custom Cursor */}
            {!isMobile && (
                <>
                    <div
                        className="hero-cursor"
                        style={{ left: mousePosition.x, top: mousePosition.y }}
                    ></div>
                    <div
                        className="hero-cursor-glow"
                        style={{ left: mousePosition.x, top: mousePosition.y }}
                    ></div>
                </>
            )}

            {/* Layered Background */}
            <div className="hero-bg" style={{ transform: `translateY(${scrollProgress * 120}px)` }}>
                <div className="hero-gradient"></div>
                <div className="hero-grid" style={{ transform: `translateY(${scrollProgress * -40}px)` }}></div>
                <div className="hero-aurora hero-aurora-1"></div>
                <div className="hero-aurora hero-aurora-2"></div>
            </div>

            {/* 3D Scene (lazy, desktop-first) */}
            {!isMobile && (
                <Suspense fallback={null}>
                    <HeroScene scrollProgress={scrollProgress} />
                </Suspense>
            )}

            {/* Content */}
            <div className="hero-container" style={contentParallax}>
                <div className={`hero-content ${isLoaded ? 'hero-content-loaded' : ''}`}>
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        <span>Innovating the Future</span>
                    </div>

                    <h1 className="hero-title">
                        We Build
                        <span className="hero-title-gradient"> Digital Solutions </span>
                        That Drive Success
                    </h1>

                    <p className="hero-subtitle">
                        {companyInfo.description}
                    </p>

                    <div className="hero-cta">
                        <Button variant="primary" size="lg" onClick={handleGetStarted}>
                            Get Started
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hero-cta-arrow">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Button>
                        <Button variant="outline" size="lg" onClick={handleLearnMore}>
                            Learn More
                        </Button>
                    </div>

                    {/* Tech & services strip */}
                    <div className="hero-tech-strip" aria-label="Our technologies and services">
                        <div className="hero-tech-track">
                            {[...TECH_STRIP, ...TECH_STRIP].map((tech, i) => (
                                <div className="hero-tech-chip" key={`${tech.label}-${i}`} title={tech.label}>
                                    <tech.Icon size={14} />
                                    <span>{tech.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Scroll Indicator */}
            <div className="hero-scroll-modern" onClick={handleLearnMore} style={{ opacity: 1 - scrollProgress * 2 }}>
                <div className="hero-scroll-line"></div>
                <div className="hero-scroll-arrows">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 10l5 5 5-5" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 10l5 5 5-5" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;
