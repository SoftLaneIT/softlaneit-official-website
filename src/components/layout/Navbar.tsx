import React, { useState, useEffect } from 'react';
import { navLinks } from '../../data/content';
import logoDark from '../../assets/images/logo-dark.png';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navLinks.map(link => link.id);
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
                    <img src={logoDark} alt="SoftlaneIT" className="navbar-logo-img" />
                </a>

                <div className={`navbar-links ${isMobileMenuOpen ? 'navbar-links-open' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={`navbar-link ${activeSection === link.id ? 'navbar-link-active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                            <span className="navbar-link-underline"></span>
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="navbar-cta"
                        onClick={(e) => handleNavClick(e, '#contact')}
                    >
                        Get Started
                    </a>
                </div>

                <button
                    className={`navbar-hamburger ${isMobileMenuOpen ? 'navbar-hamburger-open' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
