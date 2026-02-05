import { useScrollAnimation } from '../../hooks';
import { blogPosts } from '../../data/content';
import './Blog.css';

export const Blog = () => {
  const { ref, isVisible } = useScrollAnimation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="blog-section" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-fade-in' : ''}`}>
          <span className="section-label">Insights & Resources</span>
          <h2 className="section-title">
            Latest from Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="section-description">
            Stay updated with the latest trends, insights, and best practices in software development and technology.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`blog-card ${isVisible ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <div className="blog-author">
                    <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                    <span className="author-name">{post.author.name}</span>
                  </div>
                  <a href={`/blog/${post.slug}`} className="blog-link">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`blog-cta ${isVisible ? 'animate-fade-in' : ''}`}>
          <a href="/blog" className="btn-secondary">
            View All Articles
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
