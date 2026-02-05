import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../data/content';
import { Logo } from '../common/Logo';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const location = useLocation();
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
        setIsMobileMenuOpen(false);
        
        // Scroll to top first
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // If not on home page, navigate to home first
        if (location.pathname !== '/') {
            setTimeout(() => {
                window.location.href = '/' + href;
            }, 300);
        } else {
            setTimeout(() => {
                const targetId = href.replace('#', '');
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Logo className="navbar-logo-svg" variant="white" height={42} />
                </Link>

                <div className={`navbar-links ${isMobileMenuOpen ? 'navbar-links-open' : ''}`}>
                    {navLinks.filter(link => !['blog', 'careers', 'contact'].includes(link.id)).map((link) => (
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
                    <Link 
                        to="/blog" 
                        className={`navbar-link ${location.pathname === '/blog' ? 'navbar-link-active' : ''}`}
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
                    >
                        Blog
                        <span className="navbar-link-underline"></span>
                    </Link>
                    <Link 
                        to="/careers" 
                        className={`navbar-link ${location.pathname === '/careers' ? 'navbar-link-active' : ''}`}
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
                    >
                        Careers
                        <span className="navbar-link-underline"></span>
                    </Link>
                    <Link
                        to="/contact"
                        className="navbar-cta"
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
                    >
                        Get Started
                    </Link>
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
