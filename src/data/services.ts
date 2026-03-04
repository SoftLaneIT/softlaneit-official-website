/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 */

import type { Service } from '../types';

export const services: Service[] = [
    {
        id: 'software-development',
        icon: 'Code2',
        title: 'Custom Software Development',
        description: 'Engineer bespoke software solutions that scale with your business. From concept to deployment, we build robust applications optimized for performance and growth.',
        features: ['Enterprise Architecture', 'Microservices Design', 'System Integration', 'Legacy Modernization'],
    },
    {
        id: 'mobile-development',
        icon: 'Smartphone',
        title: 'Mobile App Development',
        description: 'Craft intuitive mobile experiences that users love. Native and cross-platform solutions designed for maximum performance and engagement.',
        features: ['Native iOS & Android', 'Flutter & React Native', 'Mobile-First Design', 'App Store Optimization'],
    },
    {
        id: 'cloud-solutions',
        icon: 'CloudCog',
        title: 'Cloud Infrastructure',
        description: 'Build resilient cloud-native architectures that power your digital transformation. Seamlessly migrate, scale, and optimize your infrastructure.',
        features: ['Multi-Cloud Strategy', 'Kubernetes Orchestration', 'Serverless Computing', 'Infrastructure as Code'],
    },
    {
        id: 'ai-ml',
        icon: 'Brain',
        title: 'AI & Machine Learning',
        description: 'Harness the power of artificial intelligence to unlock insights, automate workflows, and drive innovation across your organization.',
        features: ['Deep Learning Models', 'Natural Language AI', 'Computer Vision', 'MLOps & AutoML'],
    },
    {
        id: 'web-development',
        icon: 'Globe',
        title: 'Web Application Development',
        description: 'Create lightning-fast, responsive web applications using cutting-edge frameworks. Build digital experiences that convert visitors into customers.',
        features: ['Next.js & React', 'Progressive Web Apps', 'Headless CMS', 'Real-time Applications'],
    },
    {
        id: 'consulting',
        icon: 'Lightbulb',
        title: 'Technology Consulting',
        description: 'Navigate complex technology decisions with confidence. Our experts provide strategic guidance to align your tech stack with business objectives.',
        features: ['Digital Transformation', 'Architecture Review', 'Tech Stack Selection', 'Performance Audits'],
    },
    {
        id: 'cybersecurity',
        icon: 'Shield',
        title: 'Cybersecurity & Compliance',
        description: 'Protect your digital assets with enterprise-grade security. From vulnerability assessments to compliance management, we safeguard your business.',
        features: ['Penetration Testing', 'SOC 2 Compliance', 'Zero Trust Architecture', 'Security Monitoring'],
    },
    {
        id: 'api-integration',
        icon: 'Network',
        title: 'API Development & Integration',
        description: 'Connect your ecosystem with seamless API solutions. Build scalable APIs and integrate third-party services effortlessly.',
        features: ['RESTful & GraphQL APIs', 'API Gateway Design', 'Webhook Architecture', 'Third-party Integrations'],
    },
];
