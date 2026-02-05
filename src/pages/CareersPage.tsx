import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight, CheckCircle2, Sparkles, Zap, Heart, TrendingUp, Globe } from 'lucide-react';
import { jobOpenings, companyPerks } from '../data/content';
import './CareersPage.css';

const iconMap: Record<string, any> = {
  'Globe': Globe,
  'GraduationCap': Sparkles,
  'Heart': Heart,
  'Palmtree': Zap,
  'TrendingUp': TrendingUp,
  'Zap': Zap,
};

export const CareersPage = () => {
  return (
    <div className="careers-page">
      {/* Animated Background */}
      <div className="careers-bg">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              animationDelay: `${(i * 0.4) % 20}s`,
              animationDuration: `${15 + (i * 0.3) % 10}s`,
            }}
          />
        ))}
      </div>

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

      {/* Why Join Us - Perks Section */}
      <section className="careers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Benefits & Perks</span>
            <h2 className="section-title">
              Why <span className="text-gradient">SoftlaneIT</span>
            </h2>
            <p className="section-description">
              We invest in our people because they're our greatest asset
            </p>
          </div>
          <div className="perks-grid">
            {companyPerks.map((perk) => {
              const IconComponent = iconMap[perk.icon] || Sparkles;
              return (
                <div key={perk.id} className="perk-card">
                  <div className="perk-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3>{perk.title}</h3>
                  <p>{perk.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="careers-content">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Join Our Team</span>
            <h2 className="section-title">Open Positions</h2>
            <p className="section-description">
              Find your next challenge and grow with us
            </p>
          </div>
          
          <div className="positions-timeline">
            {jobOpenings.map((job) => (
              <div key={job.id} className="position-card">
                <div className="position-header">
                  <div className="position-info">
                    <h3>{job.title}</h3>
                    <div className="position-meta">
                      <span className="meta-item">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                      <span className="meta-item">
                        <Briefcase size={16} />
                        {job.department}
                      </span>
                      <span className="meta-item">
                        <Clock size={16} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="apply-btn">
                    Apply Now
                    <ArrowRight size={18} />
                  </button>
                </div>
                
                <p className="position-description">{job.description}</p>
                
                <div className="position-details">
                  <div className="detail-section">
                    <h4>
                      <CheckCircle2 size={20} />
                      Requirements
                    </h4>
                    <ul>
                      {job.requirements.map((req, i) => (
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
                      {job.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <div className="container">
          <h2>Don't See Your Role?</h2>
          <p>We're always looking for exceptional talent. Send us your resume and let's talk about your future.</p>
          <button className="cta-btn">
            Send General Application
            <ArrowRight size={20} />
          </button>
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
