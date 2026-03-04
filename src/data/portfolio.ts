/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 */

import type { Project, Testimonial } from '../types';

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'Quantum Trading Analytics',
        description: 'Next-generation financial intelligence platform with real-time market analysis, predictive modeling, and algorithmic trading capabilities powered by advanced AI.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        category: 'FinTech',
        technologies: ['Next.js', 'TypeScript', 'Python', 'TimescaleDB', 'WebSocket'],
    },

    {
        id: 'project-3',
        title: 'NeuralCommerce',
        description: 'AI-first marketplace revolutionizing online shopping with neural product matching, voice commerce, and augmented reality try-ons. Personalization at scale.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        category: 'E-Commerce',
        technologies: ['Next.js', 'GraphQL', 'AWS Lambda', 'Neo4j', 'Three.js'],
    },
    {
        id: 'project-5',
        title: 'Cortex AI Assistant',
        description: 'Enterprise cognitive platform with contextual understanding, multi-modal interactions, and intelligent workflow automation. Deployed across 50+ Fortune 500 companies.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        category: 'Artificial Intelligence',
        technologies: ['Python', 'GPT-4', 'LangChain', 'Vector DB', 'Kubernetes'],
    },
    {
        id: 'project-6',
        title: 'MetaProperty Universe',
        description: 'Immersive 3D property marketplace blending physical and virtual real estate. Virtual tours, NFT deeds, and metaverse integration redefining property transactions.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        category: 'Web3 & PropTech',
        technologies: ['React', 'Three.js', 'Solidity', 'IPFS', 'WebGL'],
    },
];

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechVentures Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        content: 'SoftlaneIT delivered beyond our expectations. Their team transformed our legacy systems into a modern, scalable platform that has significantly improved our operational efficiency.',
        rating: 5,
    },
    {
        id: '2',
        name: 'Michael Chen',
        role: 'CEO',
        company: 'FinanceFlow',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        content: 'Working with SoftlaneIT was a game-changer for our startup. They understood our vision and built a product that our users love. Highly recommended!',
        rating: 5,
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        role: 'Product Director',
        company: 'HealthTech Solutions',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        content: 'The mobile app they developed for us has received outstanding feedback from our users. Their attention to detail and focus on user experience is remarkable.',
        rating: 5,
    },
];
