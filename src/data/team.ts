/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 */

import type { TeamMember, CompanyPerk } from '../types';

export const teamMembers: TeamMember[] = [
    {
        id: 'team-1',
        name: 'Alex Johnson',
        role: 'CEO & Founder',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
        social: {
            linkedin: 'https://linkedin.com/in/alexjohnson',
            twitter: 'https://twitter.com/alexjohnson',
        },
    },
    {
        id: 'team-2',
        name: 'Sarah Mitchell',
        role: 'CTO',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
        social: {
            linkedin: 'https://linkedin.com/in/sarahmitchell',
            github: 'https://github.com/sarahmitchell',
        },
    },
    {
        id: 'team-3',
        name: 'Michael Torres',
        role: 'Lead Architect',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
        social: {
            linkedin: 'https://linkedin.com/in/michaeltorres',
            github: 'https://github.com/michaeltorres',
        },
    },
    {
        id: 'team-4',
        name: 'Emily Rodriguez',
        role: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
        social: {
            linkedin: 'https://linkedin.com/in/emilyrodriguez',
            twitter: 'https://twitter.com/emilyrodriguez',
        },
    },
    {
        id: 'team-5',
        name: 'James Wilson',
        role: 'Senior Developer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
        social: {
            linkedin: 'https://linkedin.com/in/jameswilson',
            github: 'https://github.com/jameswilson',
        },
    },
    {
        id: 'team-6',
        name: 'Lisa Chen',
        role: 'Project Manager',
        image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=500&fit=crop',
        social: {
            linkedin: 'https://linkedin.com/in/lisachen',
        },
    },
];

export const companyPerks: CompanyPerk[] = [
    {
        id: 'perk-1',
        icon: 'Home',
        title: 'Global Remote-First',
        description: 'Work from anywhere in the world. True location independence with async-friendly culture and global team collaboration.',
    },
    {
        id: 'perk-2',
        icon: 'GraduationCap',
        title: 'Continuous Learning',
        description: '$3,500 annual learning budget plus dedicated innovation time. Access to courses, conferences, certifications, and tech books.',
    },
    {
        id: 'perk-3',
        icon: 'Heart',
        title: 'Holistic Wellness',
        description: 'Premium health insurance, mental health support, fitness stipend, and quarterly wellness retreats for the entire team.',
    },
    {
        id: 'perk-4',
        icon: 'Palmtree',
        title: 'Flexible Time Off',
        description: 'Unlimited PTO with mandatory minimum vacation policy. We encourage rest and recharge to maintain peak performance.',
    },
    {
        id: 'perk-5',
        icon: 'TrendingUp',
        title: 'Equity & Growth',
        description: 'Competitive salary bands with transparent progression. Stock options, performance bonuses, and profit-sharing programs.',
    },
    {
        id: 'perk-6',
        icon: 'Zap',
        title: 'Innovation Lab',
        description: 'Access to latest technologies, 20% time for passion projects, and quarterly hackathons with $10K prize pool.',
    },
];
