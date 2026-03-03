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


import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, Share2, Check, BookOpen } from 'lucide-react';
import { loadMarkdownFiles } from '../utils/markdown';
import { Loader } from '../components/common';
import './BlogPage.css';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

export const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [posts, setPosts] = useState<any[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [deepSearch, setDeepSearch] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleShare = (slug: string, title: string) => {
    const url = `${window.location.origin}/blog/${slug}`;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => { });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
      });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const blogFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });
      const loadedPosts = await loadMarkdownFiles<BlogPost>(blogFiles);
      loadedPosts.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
      setPosts(loadedPosts);
    };
    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.attributes.category)))];

  const isSearching = searchTerm.trim().length > 0;

  const filteredPosts = posts.filter(post => {
    const title = post.attributes?.title || '';
    const excerpt = post.attributes?.excerpt || '';
    const category = post.attributes?.category || '';
    const body = post.body || '';

    const matchesSearch = !isSearching || (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deepSearch && body.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const searchResults = isSearching ? filteredPosts.slice(0, 6) : [];

  if (posts.length === 0) {
    return <Loader />;
  }

  const featuredPost = posts[0];
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
            <div className="blog-search-wrapper" ref={searchRef}>
              <div className={`blog-search ${searchFocused && isSearching ? 'search-active' : ''}`}>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => { setSearchTerm(e.target.value); setSearchFocused(true); }}
                />
                {isSearching && (
                  <button className="search-clear-btn" onClick={() => { setSearchTerm(''); setSearchFocused(false); }}>
                    ✕
                  </button>
                )}
              </div>

              {/* Deep search toggle */}
              <label className="deep-search-toggle">
                <input
                  type="checkbox"
                  checked={deepSearch}
                  onChange={(e) => setDeepSearch(e.target.checked)}
                />
                <BookOpen size={14} />
                <span>Search inside articles</span>
              </label>

              {/* Search Results Dropdown */}
              {searchFocused && isSearching && (
                <div className="search-results-dropdown">
                  {searchResults.length === 0 ? (
                    <div className="search-no-results">
                      <Search size={20} />
                      <span>No articles found for "<strong>{searchTerm}</strong>"</span>
                    </div>
                  ) : (
                    <>
                      <div className="search-results-header">
                        {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
                      </div>
                      {searchResults.map(post => (
                        <div
                          key={post.slug}
                          className="search-result-card"
                          onClick={() => { navigate(`/blog/${post.slug}`); setSearchFocused(false); setSearchTerm(''); }}
                        >
                          <img src={post.attributes.image} alt={post.attributes.title} className="search-result-img" />
                          <div className="search-result-info">
                            <span className="search-result-category">{post.attributes.category}</span>
                            <h4 className="search-result-title">{post.attributes.title}</h4>
                            <p className="search-result-excerpt">{post.attributes.excerpt}</p>
                            <div className="search-result-meta">
                              <Calendar size={12} />
                              <span>{new Date(post.attributes.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <Clock size={12} />
                              <span>{post.attributes.readTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredPosts.length > 6 && (
                        <div className="search-results-more" onClick={() => setSearchFocused(false)}>
                          Scroll down to see all {filteredPosts.length} results ↓
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
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
          <div className="featured-article" style={{ backgroundImage: `url(${featuredPost.attributes.image})` }}>
            <div className="featured-overlay"></div>
            <div className="featured-content">
              <div className="featured-meta">
                <span className="featured-category">{featuredPost.attributes.category}</span>
                <div className="featured-info">
                  <Calendar size={16} />
                  <span>{new Date(featuredPost.attributes.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <Clock size={16} />
                  <span>{featuredPost.attributes.readTime}</span>
                </div>
              </div>
              <h2 className="featured-title">{featuredPost.attributes.title}</h2>
              <p className="featured-excerpt">{featuredPost.attributes.excerpt}</p>
              <div className="featured-author">
                <img src={featuredPost.attributes.author.avatar} alt={featuredPost.attributes.author.name} />
                <div>
                  <p className="author-name">{featuredPost.attributes.author.name}</p>
                  <div className="featured-tags">
                    {featuredPost.attributes.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="tag">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="featured-actions">
                <button
                  className="featured-btn"
                  onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                >
                  Read Full Article
                  <ArrowRight size={20} />
                </button>
                <button
                  className="share-btn"
                  onClick={() => handleShare(featuredPost.slug, featuredPost.attributes.title)}
                  title="Share this article"
                >
                  {copiedSlug === featuredPost.slug ? <Check size={16} /> : <Share2 size={16} />}
                  {copiedSlug === featuredPost.slug ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles-section">
        <div className="container">
          <div className="articles-grid">
            {regularPosts.map((post, index) => (
              <article
                key={post.slug}
                className="article-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="article-image">
                  <img src={post.attributes.image} alt={post.attributes.title} loading="lazy" />
                  <span className="article-category">{post.attributes.category}</span>
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-date">
                      <Calendar size={14} />
                      {new Date(post.attributes.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="article-read-time">
                      <Clock size={14} />
                      {post.attributes.readTime}
                    </span>
                  </div>
                  <h3 className="article-title">{post.attributes.title}</h3>
                  <p className="article-excerpt">{post.attributes.excerpt}</p>
                  <div className="article-footer">
                    <div className="article-author">
                      <img src={post.attributes.author.avatar} alt={post.attributes.author.name} />
                      <span>{post.attributes.author.name}</span>
                    </div>
                    <div className="article-actions">
                      <button
                        className="article-share-btn"
                        onClick={(e) => { e.stopPropagation(); handleShare(post.slug, post.attributes.title); }}
                        title="Share this article"
                      >
                        {copiedSlug === post.slug ? <Check size={14} /> : <Share2 size={14} />}
                        <span>{copiedSlug === post.slug ? 'Copied!' : 'Share'}</span>
                      </button>
                      <button
                        className="article-link"
                        onClick={(e) => { e.stopPropagation(); navigate(`/blog/${post.slug}`); }}
                      >
                        Read More
                        <ArrowRight size={16} />
                      </button>
                    </div>
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
