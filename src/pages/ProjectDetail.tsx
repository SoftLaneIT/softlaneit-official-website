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
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react';
import { getMarkdownFile, type MarkdownContent } from '../utils/markdown';
import './ProjectDetail.css';

interface Project {
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
}

export const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<MarkdownContent<Project> | null>(null);
    const [loading, setLoading] = useState(true);

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
        return <div className="loading-container">Loading...</div>;
    }

    if (!project) {
        return (
            <div className="not-found-container">
                <h2>Project not found</h2>
                <Link to="/#portfolio" className="back-link">Back to Portfolio</Link>
            </div>
        );
    }

    return (
        <div className="project-detail">
            <div className="project-hero" style={{ backgroundImage: `url(${project.attributes.image})` }}>
                <div className="project-overlay"></div>
                <div className="container">
                    <Link to="/#portfolio" className="back-nav">
                        <ArrowLeft size={20} />
                        Back to Portfolio
                    </Link>
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

                        <button className="project-cta">
                            Visit Live Site
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
