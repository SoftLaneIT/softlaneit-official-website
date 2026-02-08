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


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, Sparkles, Zap, Briefcase, Clock } from 'lucide-react';
import { loadMarkdownFiles } from '../utils/markdown';
import './CareersPage.css';

interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  skills: string[];
}

export const CareersPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobFiles = import.meta.glob('../content/careers/*.md', { query: '?raw', import: 'default' });
      const loadedJobs = await loadMarkdownFiles<JobOpening>(jobFiles);
      setJobs(loadedJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div className="careers-page">

      {/* Hero Section */}
      <section className="careers-hero">
        <div className="container">
          <span className="section-label">
            <Sparkles size={16} />
            We're Hiring
          </span>
          <h1>
            Shape the Future of <span className="text-gradient">Technology</span>
          </h1>
          <p>
            Join a team of visionaries, innovators, and problem solvers building tomorrow's digital solutions today.
          </p>
          <div className="careers-stats">
            <div className="stat">
              <span className="stat-number">150+</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Open Positions</span>
            </div>
            <div className="stat">
              <span className="stat-number">Global</span>
              <span className="stat-label">Remote-First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="careers-content">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Join Our Team</span>
            <h2 className="section-title">Open Positions</h2>
            <p className="section-description">
              Find your next challenge and grow with us
            </p>
          </div>

          <div className="positions-timeline">
            {jobs.map((job) => (
              <div key={job.slug} className="position-card">
                <div className="position-header">
                  <div className="position-info">
                    <h3>{job.attributes.title}</h3>
                    <div className="position-meta">
                      <span className="meta-item">
                        <MapPin size={16} />
                        {job.attributes.location}
                      </span>
                      <span className="meta-item">
                        <Briefcase size={16} />
                        {job.attributes.department}
                      </span>
                      <span className="meta-item">
                        <Clock size={16} />
                        {job.attributes.type}
                      </span>
                    </div>
                  </div>
                  <button className="apply-btn">
                    Apply Now
                    <ArrowRight size={18} />
                  </button>
                </div>

                <p className="position-description">{job.attributes.description}</p>

                <div className="position-details">
                  <div className="detail-section">
                    <h4>
                      <CheckCircle2 size={20} />
                      Requirements
                    </h4>
                    <ul>
                      {job.attributes.requirements.map((req: string, i: number) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>
                      <Zap size={20} />
                      Skills
                    </h4>
                    <div className="skills-tags">
                      {job.attributes.skills.map((skill: string, i: number) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="no-jobs">
                <p>Loading positions...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <Link to="/" className="back-home" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};
