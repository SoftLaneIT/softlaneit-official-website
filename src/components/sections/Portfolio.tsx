
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks';
import { loadMarkdownFiles } from '../../utils/markdown';
import './Portfolio.css';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
}

const categories = ['All', 'Web Application', 'Mobile App', 'E-Commerce', 'IoT', 'AI/ML', 'FinTech', 'Healthcare'];

export const Portfolio: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [projects, setProjects] = useState<any[]>([]);
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ wait: projects.length });
    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.2, wait: projects.length });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const projectFiles = import.meta.glob('../../content/projects/*.md', { query: '?raw', import: 'default' });
            const loadedProjects = await loadMarkdownFiles<Project>(projectFiles);
            setProjects(loadedProjects);
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.attributes.category === activeCategory || project.attributes.category.includes(activeCategory));

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
                            key={project.slug}
                            className="portfolio-card"
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => navigate(`/projects/${project.slug}`)}
                        >
                            <div className="portfolio-card-image">
                                <img src={project.attributes.image} alt={project.attributes.title} loading="lazy" />
                                <div className="portfolio-card-overlay">
                                    <span className="portfolio-card-category">{project.attributes.category}</span>
                                    <h3 className="portfolio-card-title">{project.attributes.title}</h3>
                                    <p className="portfolio-card-description">{project.attributes.description}</p>
                                    <div className="portfolio-card-tech">
                                        {(project.attributes.technologies || []).slice(0, 3).map((tech: string, idx: number) => (
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
