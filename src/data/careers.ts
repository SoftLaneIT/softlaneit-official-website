/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 */

import type { JobOpening } from '../types';

export const jobOpenings: JobOpening[] = [
    {
        id: 'job-1',
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote / Colombo',
        type: 'Full-time',
        description: 'We are looking for an experienced Full Stack Developer to join our growing team.',
        requirements: [
            '5+ years of experience in full stack development',
            'Proficiency in React, Node.js, and TypeScript',
            'Experience with cloud platforms (AWS/Azure/GCP)',
            'Strong problem-solving skills',
        ],
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    },
    {
        id: 'job-2',
        title: 'AI/ML Engineer',
        department: 'AI Research',
        location: 'Remote',
        type: 'Full-time',
        description: 'Join our AI team to build cutting-edge machine learning solutions.',
        requirements: [
            '3+ years of experience in ML/AI development',
            'Strong background in Python and ML frameworks',
            'Experience with NLP or Computer Vision',
            'PhD or Masters in CS/AI preferred',
        ],
        skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'MLOps'],
    },
    {
        id: 'job-3',
        title: 'DevOps Engineer',
        department: 'Infrastructure',
        location: 'New York / Remote',
        type: 'Full-time',
        description: 'Help us build and maintain scalable infrastructure solutions.',
        requirements: [
            '4+ years of DevOps experience',
            'Expert knowledge of CI/CD pipelines',
            'Experience with Kubernetes and Docker',
            'Strong scripting abilities',
        ],
        skills: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'AWS'],
    },
    {
        id: 'job-4',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote / Colombo',
        type: 'Full-time',
        description: 'Create beautiful and intuitive user experiences for our products.',
        requirements: [
            '3+ years of UI/UX design experience',
            'Proficiency in Figma and design systems',
            'Portfolio showcasing web and mobile designs',
            'Understanding of accessibility standards',
        ],
        skills: ['Figma', 'UI Design', 'Prototyping', 'Design Systems'],
    },
    {
        id: 'job-5',
        title: 'Cybersecurity Analyst',
        department: 'Security',
        location: 'Remote',
        type: 'Full-time',
        description: 'Protect our clients with comprehensive security solutions.',
        requirements: [
            '3+ years of cybersecurity experience',
            'Security certifications (CISSP, CEH)',
            'Experience with penetration testing',
            'Knowledge of compliance frameworks',
        ],
        skills: ['Penetration Testing', 'SIEM', 'Compliance', 'Network Security'],
    },
];
