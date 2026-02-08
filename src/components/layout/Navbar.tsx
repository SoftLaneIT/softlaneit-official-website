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

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/content';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position - only if menu is closed to prevent jumping
            if (!isMobileMenuOpen) {
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
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        // Scroll to top first
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // If not on home page, navigate to home first
        if (location.pathname !== '/') {
            setTimeout(() => {
                navigate('/' + href);
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

    const isDarkHeroPage = location.pathname.startsWith('/blog') || location.pathname.startsWith('/projects/');

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isDarkHeroPage ? 'navbar-dark-hero' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Logo className="navbar-logo-svg" variant="default" height={42} />
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
                        className={`navbar-link ${location.pathname.startsWith('/blog') ? 'navbar-link-active' : ''}`}
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
                    <ThemeToggle />
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
