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


import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { getMarkdownFile, type MarkdownContent } from '../utils/markdown';
import { Loader } from '../components/common';
import './BlogDetail.css';

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

export const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<MarkdownContent<BlogPost> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                const blogFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });
                const loadedPost = await getMarkdownFile<BlogPost>(blogFiles, slug);
                setPost(loadedPost);
            }
            setLoading(false);
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!post) {
        return (
            <div className="not-found-container">
                <h2>Post not found</h2>
                <Link to="/blog" className="back-link">Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="blog-detail">
            <div className="blog-detail-hero" style={{ backgroundImage: `url(${post.attributes.image})` }}>
                <div className="blog-detail-overlay"></div>
                <div className="container">
                    <div className="blog-detail-header">
                        <Link to="/blog" className="back-nav">
                            <ArrowLeft size={20} />
                            Back to Blog
                        </Link>
                        <div className="blog-detail-meta">
                            <span className="blog-category">{post.attributes.category}</span>
                            <span className="meta-separator">•</span>
                            <div className="meta-item">
                                <Calendar size={16} />
                                <span>{new Date(post.attributes.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <span className="meta-separator">•</span>
                            <div className="meta-item">
                                <Clock size={16} />
                                <span>{post.attributes.readTime}</span>
                            </div>
                        </div>
                        <h1 className="blog-detail-title">{post.attributes.title}</h1>
                        <div className="blog-author-large">
                            <img src={post.attributes.author.avatar} alt={post.attributes.author.name} />
                            <div className="author-info">
                                <span className="author-name">{post.attributes.author.name}</span>
                                <span className="author-title">Author</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="blog-content-wrapper">
                    <div className="blog-main-content">
                        <Markdown>{post.body}</Markdown>
                    </div>

                    <div className="blog-sidebar">
                        <div className="sidebar-widget">
                            <h3>Tags</h3>
                            <div className="tags-cloud">
                                {post.attributes.tags.map(tag => (
                                    <span key={tag} className="tag-pill">
                                        <Tag size={12} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="sidebar-widget">
                            <h3>Share</h3>
                            <button className="share-btn">
                                <Share2 size={16} />
                                Share Article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
