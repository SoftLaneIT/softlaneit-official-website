import type { Service, Project, Testimonial, Stat, NavLink, BlogPost, TeamMember, JobOpening, CompanyPerk } from '../types';

export const navLinks: NavLink[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'careers', label: 'Careers', href: '#careers' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

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
        id: 'project-2',
        title: 'MediConnect Pro',
        description: 'Revolutionary healthcare ecosystem connecting patients, providers, and pharmacies. Features AI diagnosis assistance, blockchain health records, and AR-enabled consultations.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
        category: 'Healthcare',
        technologies: ['React Native', 'WebRTC', 'Blockchain', 'TensorFlow'],
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
        id: 'project-4',
        title: 'SmartFactory OS',
        description: 'Industrial IoT command center orchestrating 10,000+ connected devices. Predictive maintenance, digital twin simulation, and edge computing for zero downtime.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        category: 'IoT & Industry 4.0',
        technologies: ['Rust', 'MQTT', 'TimeSeries', 'K8s', 'Edge AI'],
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

export const stats: Stat[] = [
    { id: '1', value: 150, suffix: '+', label: 'Projects Delivered' },
    { id: '2', value: 50, suffix: '+', label: 'Happy Clients' },
    { id: '3', value: 8, suffix: '+', label: 'Years Experience' },
    { id: '4', value: 25, suffix: '+', label: 'Team Members' },
];

export const companyInfo = {
    name: 'SoftlaneIT',
    tagline: 'Innovating the Future of Technology',
    description: 'We are a forward-thinking software development company dedicated to delivering innovative, scalable, and user-centric digital solutions that drive business growth.',
    email: 'services@softlaneit.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech City, TC 12345',
    social: {
        linkedin: 'https://linkedin.com/company/softlaneit',
        twitter: 'https://twitter.com/softlaneit',
        github: 'https://github.com/softlaneit',
        facebook: 'https://facebook.com/softlaneit',
    },
};

export const blogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'The Future of AI in Enterprise Software Development',
        slug: 'future-of-ai-enterprise-software',
        excerpt: 'Explore how artificial intelligence is transforming the way we build and deploy enterprise applications, from automated testing to intelligent code generation.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
        category: 'AI & Technology',
        date: '2026-01-28',
        readTime: '8 min read',
        author: {
            name: 'David Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        tags: ['AI', 'Machine Learning', 'Enterprise', 'Software Development'],
    },
    {
        id: 'blog-2',
        title: 'Best Practices for Secure API Development',
        slug: 'secure-api-development-best-practices',
        excerpt: 'Learn the essential security practices every developer should follow when building APIs, including authentication, rate limiting, and data validation.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
        category: 'Cybersecurity',
        date: '2026-01-20',
        readTime: '6 min read',
        author: {
            name: 'Sarah Mitchell',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        },
        tags: ['API', 'Security', 'Best Practices', 'Development'],
    },
    {
        id: 'blog-3',
        title: 'Microservices vs Monolith: Making the Right Choice',
        slug: 'microservices-vs-monolith',
        excerpt: 'A comprehensive guide to understanding when to choose microservices architecture and when a monolithic approach might be the better solution for your project.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
        category: 'Architecture',
        date: '2026-01-15',
        readTime: '10 min read',
        author: {
            name: 'Michael Torres',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        },
        tags: ['Architecture', 'Microservices', 'Cloud', 'Scalability'],
    },
    {
        id: 'blog-4',
        title: 'Cloud Migration Strategies for 2026',
        slug: 'cloud-migration-strategies-2026',
        excerpt: 'Discover the most effective cloud migration strategies and learn how to minimize downtime while maximizing the benefits of cloud infrastructure.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop',
        category: 'Cloud',
        date: '2026-01-10',
        readTime: '7 min read',
        author: {
            name: 'Emily Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        },
        tags: ['Cloud', 'AWS', 'Azure', 'Migration'],
    },
    {
        id: 'blog-5',
        title: 'Building Scalable Mobile Apps with React Native',
        slug: 'scalable-mobile-apps-react-native',
        excerpt: 'Tips and techniques for building high-performance, scalable mobile applications using React Native and modern development practices.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
        category: 'Mobile Development',
        date: '2026-01-05',
        readTime: '9 min read',
        author: {
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        },
        tags: ['Mobile', 'React Native', 'iOS', 'Android'],
    },
    {
        id: 'blog-6',
        title: 'DevOps Best Practices for Continuous Delivery',
        slug: 'devops-best-practices-continuous-delivery',
        excerpt: 'Master the art of continuous integration and delivery with proven DevOps practices that accelerate your software development lifecycle.',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop',
        category: 'DevOps',
        date: '2025-12-28',
        readTime: '8 min read',
        author: {
            name: 'David Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        tags: ['DevOps', 'CI/CD', 'Automation', 'Docker'],
    },
];

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

export const jobOpenings: JobOpening[] = [
    {
        id: 'job-1',
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote / San Francisco',
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
        location: 'San Francisco',
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
