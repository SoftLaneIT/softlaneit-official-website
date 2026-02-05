import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks';
import { projects } from '../../data/content';
import './Portfolio.css';

const categories = ['All', 'Web Application', 'Mobile App', 'E-Commerce', 'IoT', 'AI/ML'];

export const Portfolio: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <section id="portfolio" className="portfolio section">
            <div className="portfolio-bg">
                <div className="portfolio-gradient"></div>
            </div>

            <div className="container">
                <div
                    ref={headerRef}
                    className={`portfolio-header ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="portfolio-label">Our Portfolio</span>
                    <h2 className="section-title">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        Explore our portfolio of successful projects that showcase our expertise
                        and commitment to excellence.
                    </p>
                </div>

                {/* Category Filter */}
                <div className={`portfolio-filters ${headerVisible ? 'visible' : ''}`}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`portfolio-filter ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div
                    ref={gridRef}
                    className={`portfolio-grid ${gridVisible ? 'visible' : ''}`}
                >
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="portfolio-card"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="portfolio-card-image">
                                <img src={project.image} alt={project.title} loading="lazy" />
                                <div className="portfolio-card-overlay">
                                    <span className="portfolio-card-category">{project.category}</span>
                                    <h3 className="portfolio-card-title">{project.title}</h3>
                                    <p className="portfolio-card-description">{project.description}</p>
                                    <div className="portfolio-card-tech">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="portfolio-tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
