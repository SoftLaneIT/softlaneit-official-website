import React from 'react';
import { useScrollAnimation } from '../../hooks';
import { services } from '../../data/content';
import { Code2, Smartphone, CloudCog, Brain, Globe, Lightbulb, Shield, Network } from 'lucide-react';
import './Services.css';

const iconMap: Record<string, React.ElementType> = {
    Code2,
    Smartphone,
    CloudCog,
    Brain,
    Globe,
    Lightbulb,
    Shield,
    Network,
};

export const Services: React.FC = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section id="services" className="services section">
            <div className="services-bg">
                <div className="services-gradient"></div>
            </div>

            <div className="container">
                <div
                    ref={headerRef}
                    className={`services-header ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="services-label">Our Services</span>
                    <h2 className="section-title">
                        Comprehensive <span className="text-gradient">IT Solutions</span>
                    </h2>
                    <p className="section-subtitle">
                        From concept to deployment, we provide end-to-end technology solutions
                        that help businesses innovate, scale, and succeed.
                    </p>
                </div>

                <div
                    ref={cardsRef}
                    className={`services-grid ${cardsVisible ? 'visible' : ''}`}
                >
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon];
                        return (
                        <div
                            key={service.id}
                            className="service-card"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="service-icon">
                                {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="service-hover-glow"></div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
