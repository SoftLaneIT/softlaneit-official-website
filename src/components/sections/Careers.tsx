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

import { useScrollAnimation } from '../../hooks';
import { teamMembers, jobOpenings, companyPerks } from '../../data/content';
import { Home, GraduationCap, Heart, Palmtree, TrendingUp, Zap } from 'lucide-react';
import './Careers.css';

const perkIconMap: Record<string, React.ElementType> = {
  Home,
  GraduationCap,
  Heart,
  Palmtree,
  TrendingUp,
  Zap,
};

export const Careers = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="careers" className="careers-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isVisible ? 'animate-fade-in' : ''}`}>
          <span className="section-label">Join Our Team</span>
          <h2 className="section-title">
            Build the Future <span className="text-gradient">With Us</span>
          </h2>
          <p className="section-description">
            We're always looking for talented individuals who are passionate about technology and innovation.
          </p>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h3 className={`subsection-title ${isVisible ? 'animate-fade-in' : ''}`}>
            Meet Our Team
          </h3>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`team-card ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="team-social">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="team-card-info">
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Perks */}
        <div className="perks-section">
          <h3 className={`subsection-title ${isVisible ? 'animate-fade-in' : ''}`}>
            Why Work With Us
          </h3>
          <div className="perks-grid">
            {companyPerks.map((perk, index) => {
              const PerkIcon = perkIconMap[perk.icon];
              return (
              <div
                key={perk.id}
                className={`perk-card ${isVisible ? 'animate-scale-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="perk-icon">
                  {PerkIcon && <PerkIcon size={28} strokeWidth={1.5} />}
                </div>
                <h4 className="perk-title">{perk.title}</h4>
                <p className="perk-description">{perk.description}</p>
              </div>
            )})}
          </div>
        </div>

        {/* Job Openings */}
        <div className="jobs-section">
          <h3 className={`subsection-title ${isVisible ? 'animate-fade-in' : ''}`}>
            Open Positions
          </h3>
          <div className="jobs-list">
            {jobOpenings.map((job, index) => (
              <div
                key={job.id}
                className={`job-card ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="job-main">
                  <div className="job-info">
                    <h4 className="job-title">{job.title}</h4>
                    <div className="job-meta">
                      <span className="job-department">{job.department}</span>
                      <span className="job-location">{job.location}</span>
                      <span className="job-type">{job.type}</span>
                    </div>
                  </div>
                  <div className="job-tags">
                    {job.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="job-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <a href={`/careers/${job.id}`} className="job-apply-btn">
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`careers-cta ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="cta-content">
            <h3>Don't see a role that fits?</h3>
            <p>We're always interested in meeting talented people. Send us your resume!</p>
          </div>
          <a href="mailto:careers@softlaneit.com" className="btn-primary">
            Send Your Resume
          </a>
        </div>
      </div>
    </section>
  );
};
