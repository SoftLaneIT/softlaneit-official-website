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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, MessageSquare, Building2, User } from 'lucide-react';
import { companyInfo } from '../data/content';
import './ContactPage.css';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section with Animated Grid */}
      <section className="contact-hero">
        <div className="contact-hero-grid">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="grid-cell" style={{ animationDelay: `${(i * 0.03) % 3}s` }}></div>
          ))}
        </div>
        <div className="container">
          <div className="contact-hero-content">
            <div className="hero-badge">
              <MessageSquare size={16} />
              <span>Let's Connect</span>
            </div>
            <h1 className="contact-hero-title">
              Start Your <span className="text-gradient">Digital Journey</span>
            </h1>
            <p className="contact-hero-subtitle">
              Transform your ideas into reality. Our team is ready to bring your vision to life with cutting-edge technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form - Left Side */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send us a message</h2>
                <p>Fill out the form and we'll get back to you within 24 hours</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <User size={18} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <Mail size={18} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">
                      <Building2 size={18} />
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <Phone size={18} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">
                    <Calendar size={18} />
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="software-development">Custom Software Development</option>
                    <option value="mobile-development">Mobile App Development</option>
                    <option value="cloud-infrastructure">Cloud Infrastructure</option>
                    <option value="ai-ml">AI & Machine Learning</option>
                    <option value="web-development">Web Application Development</option>
                    <option value="consulting">Technology Consulting</option>
                    <option value="cybersecurity">Cybersecurity & Compliance</option>
                    <option value="api-development">API Development & Integration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <MessageSquare size={18} />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={submitted}>
                  {submitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info - Right Side */}
            <div className="contact-info-section">
              <div className="info-card">
                <h3>Get in Touch</h3>
                <p>We're here to help and answer any question you might have</p>

                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <Mail size={24} />
                    </div>
                    <div className="info-content">
                      <h4>Email</h4>
                      <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <Phone size={24} />
                    </div>
                    <div className="info-content">
                      <h4>Phone</h4>
                      <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <MapPin size={24} />
                    </div>
                    <div className="info-content">
                      <h4>Office</h4>
                      <p>{companyInfo.address}</p>
                    </div>
                  </div>
                </div>

                <div className="info-socials">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    {companyInfo.social.linkedin && (
                      <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {companyInfo.social.twitter && (
                      <a href={companyInfo.social.twitter} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {companyInfo.social.github && (
                      <a href={companyInfo.social.github} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-highlight">
                <div className="highlight-icon">
                  <CheckCircle size={28} />
                </div>
                <h4>Quick Response</h4>
                <p>We typically respond within 24 hours on business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="container">
        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};
