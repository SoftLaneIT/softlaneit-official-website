import React, { useEffect, useState, useRef } from 'react';
import { useParallax } from '../../hooks';
import { companyInfo } from '../../data/content';
import { Button } from '../common';
import './Hero.css';

export const Hero: React.FC = () => {
    const { style: parallaxStyle } = useParallax({ speed: 0.3, direction: 'up' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

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
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleGetStarted = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLearnMore = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* Custom Cursor */}
            <div 
                className="hero-cursor"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                }}
            ></div>

            {/* Cursor-following Glow */}
            <div 
                className="hero-cursor-glow"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                }}
            ></div>

            {/* Animated Background */}
            <div className="hero-bg" style={parallaxStyle}>
                <div className="hero-gradient"></div>
                <div className="hero-grid"></div>
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="hero-orb hero-orb-3"></div>
            </div>

            {/* Floating Elements */}
            <div className="hero-floating">
                <div className="hero-float-element hero-float-1">{'</>'}</div>
                <div className="hero-float-element hero-float-2">{'{ }'}</div>
                <div className="hero-float-element hero-float-3">{'( )'}</div>
            </div>

            {/* Content */}
            <div className="hero-container">
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

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">150+</span>
                            <span className="hero-stat-label">Projects</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">50+</span>
                            <span className="hero-stat-label">Clients</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">8+</span>
                            <span className="hero-stat-label">Years</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll">
                <div className="hero-scroll-mouse">
                    <div className="hero-scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
