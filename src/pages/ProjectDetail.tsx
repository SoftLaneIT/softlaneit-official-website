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
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ExternalLink, Code2, PlayCircle, Share2, Check } from 'lucide-react';
import { getMarkdownFile, type MarkdownContent } from '../utils/markdown';
import { Loader } from '../components/common';
import './ProjectDetail.css';

interface Project {
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    link?: string;
    demo?: string;
}

export const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<MarkdownContent<Project> | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = window.location.href;
        const title = project?.attributes.title || 'SoftlaneIT Portfolio';
        if (navigator.share) {
            navigator.share({ title, url }).catch(() => { });
        } else {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    useEffect(() => {
        const fetchProject = async () => {
            if (slug) {
                const projectFiles = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default' });
                const loadedProject = await getMarkdownFile<Project>(projectFiles, slug);
                setProject(loadedProject);
            }
            setLoading(false);
        };

        fetchProject();
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!project) {
        return (
            <div className="not-found-container">
                <h2>Project not found</h2>
            </div>
        );
    }

    return (
        <div className="project-detail">
            <div className="project-hero" style={{ backgroundImage: `url(${project.attributes.image})` }}>
                <div className="project-overlay"></div>
                <div className="container">
                    <div className="project-header">
                        <span className="project-category">{project.attributes.category}</span>
                        <h1 className="project-title">{project.attributes.title}</h1>
                        <p className="project-subtitle">{project.attributes.description}</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="project-content-grid">
                    <div className="project-main">
                        <div className="project-description">
                            <Markdown>{project.body}</Markdown>
                        </div>
                    </div>

                    <div className="project-sidebar">
                        <div className="tech-stack">
                            <h3>Technologies</h3>
                            <div className="tech-tags">
                                {(project.attributes.technologies || []).map((tech: string, index: number) => (
                                    <span key={index} className="tech-tag">
                                        <Code2 size={14} />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.attributes.link && (
                            <a href={project.attributes.link} target="_blank" rel="noopener noreferrer" className="project-cta">
                                Visit Live Site
                                <ExternalLink size={18} />
                            </a>
                        )}
                        {project.attributes.demo && (
                            <a href={project.attributes.demo} target="_blank" rel="noopener noreferrer" className="project-cta project-cta-demo" style={{ marginTop: '1rem', backgroundColor: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>
                                Watch Demo
                                <PlayCircle size={18} />
                            </a>
                        )}

                        <div className="sidebar-widget" style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Share</h3>
                            <button className="project-cta project-cta-demo" onClick={handleShare} style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                {copied ? <Check size={18} /> : <Share2 size={18} />}
                                {copied ? 'Link Copied!' : 'Share Project'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
