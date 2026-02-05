import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { blogPosts } from '../data/content';
import './BlogPage.css';

export const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-bg">
          <div className="hero-gradient-orb orb-1"></div>
          <div className="hero-gradient-orb orb-2"></div>
          <div className="hero-gradient-orb orb-3"></div>
        </div>
        <div className="container">
          <div className="blog-hero-content">
            <span className="blog-hero-label">Insights & Innovation</span>
            <h1 className="blog-hero-title">
              Explore Tech <span className="text-gradient">Frontiers</span>
            </h1>
            <p className="blog-hero-description">
              Deep dives into emerging technologies, industry insights, and transformative ideas shaping the future of digital innovation.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="blog-controls">
            <div className="blog-search">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="blog-categories">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-article" style={{ backgroundImage: `url(${featuredPost.image})` }}>
            <div className="featured-overlay"></div>
            <div className="featured-content">
              <div className="featured-meta">
                <span className="featured-category">{featuredPost.category}</span>
                <div className="featured-info">
                  <Calendar size={16} />
                  <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <Clock size={16} />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="featured-author">
                <img src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                <div>
                  <p className="author-name">{featuredPost.author.name}</p>
                  <div className="featured-tags">
                    {featuredPost.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="featured-btn">
                Read Full Article
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles-section">
        <div className="container">
          <div className="articles-grid">
            {regularPosts.map((post, index) => (
              <article key={post.id} className="article-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="article-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="article-category">{post.category}</span>
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-date">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="article-read-time">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="article-title">{post.title}</h3>
                  <p className="article-excerpt">{post.excerpt}</p>
                  <div className="article-footer">
                    <div className="article-author">
                      <img src={post.author.avatar} alt={post.author.name} />
                      <span>{post.author.name}</span>
                    </div>
                    <button className="article-link">
                      Read More
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Stay Updated with Latest Insights</h2>
            <p>Subscribe to our newsletter and never miss an article</p>
            <div className="cta-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
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
