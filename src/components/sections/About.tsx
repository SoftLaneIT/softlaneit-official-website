import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, useParallax } from '../../hooks';
import { stats } from '../../data/content';
import './About.css';

interface CounterProps {
    end: number;
    suffix?: string;
    shouldStart: boolean;
}

const Counter: React.FC<CounterProps> = ({ end, suffix = '', shouldStart }) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!shouldStart || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(end * eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [shouldStart, end]);

    return <>{count}{suffix}</>;
};

export const About: React.FC = () => {
    const { ref: contentRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });
    const { style: parallaxStyle } = useParallax({ speed: 0.2 });

    return (
        <section id="about" className="about section">
            {/* Parallax Background */}
            <div className="about-bg" style={parallaxStyle}>
                <div className="about-gradient"></div>
                <div className="about-pattern"></div>
            </div>

            <div className="container">
                <div className="about-grid">
                    {/* Left Content */}
                    <div
                        ref={contentRef}
                        className={`about-content ${isVisible ? 'visible' : ''}`}
                    >
                        <span className="about-label">About Us</span>
                        <h2 className="about-title">
                            Transforming Ideas Into
                            <span className="text-gradient"> Digital Reality</span>
                        </h2>
                        <p className="about-description">
                            Founded with a vision to bridge the gap between innovative ideas and powerful
                            technology solutions, SoftlaneIT has grown into a trusted partner for businesses
                            worldwide.
                        </p>
                        <p className="about-description">
                            Our team of expert developers, designers, and strategists work collaboratively to
                            deliver solutions that not only meet but exceed expectations. We believe in building
                            long-term partnerships based on transparency, excellence, and results.
                        </p>

                        <div className="about-features">
                            <div className="about-feature">
                                <div className="about-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Quality First</h4>
                                    <p>We never compromise on code quality and best practices</p>
                                </div>
                            </div>
                            <div className="about-feature">
                                <div className="about-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>On-Time Delivery</h4>
                                    <p>Meeting deadlines is our commitment to every project</p>
                                </div>
                            </div>
                            <div className="about-feature">
                                <div className="about-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                        <path d="M16 3.13a4 4 0 010 7.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Dedicated Support</h4>
                                    <p>24/7 support and maintenance for all our solutions</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        className={`about-stats ${statsVisible ? 'visible' : ''}`}
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={stat.id}
                                className="about-stat"
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <span className="about-stat-value">
                                    <Counter end={stat.value} suffix={stat.suffix} shouldStart={statsVisible} />
                                </span>
                                <span className="about-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
