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


import React, { useEffect, useState } from 'react';
import { useScrollAnimation } from '../../hooks';
import { Code2, Smartphone, CloudCog, Brain, Globe, Lightbulb, Shield, Network } from 'lucide-react';
import { loadMarkdownFiles } from '../../utils/markdown';
import './Services.css';

interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
}

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
    const [services, setServices] = useState<any[]>([]);
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ wait: services.length });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2, wait: services.length });

    useEffect(() => {
        const fetchServices = async () => {
            const serviceFiles = import.meta.glob('../../content/services/*.md', { query: '?raw', import: 'default' });
            const loadedServices = await loadMarkdownFiles<Service>(serviceFiles);
            // Sort to maintain order if needed, or rely on file naming
            setServices(loadedServices);
        };
        fetchServices();
    }, []);

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
                        const IconComponent = iconMap[service.attributes.icon] || Code2;
                        return (
                            <div
                                key={service.slug}
                                className="service-card"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="service-icon">
                                    {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                                </div>
                                <h3 className="service-title">{service.attributes.title}</h3>
                                <p className="service-description">{service.attributes.description}</p>
                                <ul className="service-features">
                                    {(service.attributes.features || []).map((feature: string, idx: number) => (
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
