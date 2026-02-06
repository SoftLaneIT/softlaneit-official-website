
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks';
import { loadMarkdownFiles } from '../../utils/markdown';
import './Testimonials.css';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
}

export const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ wait: testimonials.length });
    const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2, wait: testimonials.length });

    useEffect(() => {
        const fetchTestimonials = async () => {
            const testimonialFiles = import.meta.glob('../../content/testimonials/*.md', { query: '?raw', import: 'default' });
            const loadedTestimonials = await loadMarkdownFiles<Testimonial>(testimonialFiles);
            setTestimonials(loadedTestimonials);
        };
        fetchTestimonials();
    }, []);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    if (testimonials.length === 0) {
        return null;
    }

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section id="testimonials" className="testimonials section">
            <div className="testimonials-bg">
                <div className="testimonials-gradient"></div>
                <div className="testimonials-orb"></div>
            </div>

            <div className="container">
                <div
                    ref={headerRef}
                    className={`testimonials-header ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="testimonials-label">Testimonials</span>
                    <h2 className="section-title">
                        What Our <span className="text-gradient">Clients Say</span>
                    </h2>
                    <p className="section-subtitle">
                        Don't just take our word for it. Here's what our clients have to say
                        about working with us.
                    </p>
                </div>

                <div
                    ref={contentRef}
                    className={`testimonials-content ${contentVisible ? 'visible' : ''}`}
                >
                    <div className="testimonial-card">
                        <div className="testimonial-quote">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                        </div>

                        <p className="testimonial-text">{activeTestimonial.body}</p>

                        <div className="testimonial-rating">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    viewBox="0 0 24 24"
                                    fill={i < activeTestimonial.attributes.rating ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    className={i < activeTestimonial.attributes.rating ? 'star-filled' : 'star-empty'}
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>

                        <div className="testimonial-author">
                            <img
                                src={activeTestimonial.attributes.avatar}
                                alt={activeTestimonial.attributes.name}
                                className="testimonial-avatar"
                            />
                            <div>
                                <h4 className="testimonial-name">{activeTestimonial.attributes.name}</h4>
                                <p className="testimonial-role">{activeTestimonial.attributes.role}, {activeTestimonial.attributes.company}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="testimonials-nav">
                        <button
                            className="testimonials-nav-btn"
                            onClick={handlePrev}
                            aria-label="Previous testimonial"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="testimonials-dots">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`testimonials-dot ${index === activeIndex ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            className="testimonials-nav-btn"
                            onClick={handleNext}
                            aria-label="Next testimonial"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
