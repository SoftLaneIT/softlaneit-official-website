import { Service, Project, Testimonial, Stat, NavLink } from '../types';

export const navLinks: NavLink[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

export const services: Service[] = [
    {
        id: 'software-development',
        icon: '💻',
        title: 'Custom Software Development',
        description: 'Build scalable, enterprise-grade software solutions tailored to your unique business requirements.',
        features: ['Enterprise Applications', 'API Development', 'System Integration', 'Legacy Modernization'],
    },
    {
        id: 'mobile-development',
        icon: '📱',
        title: 'Mobile App Development',
        description: 'Create stunning, high-performance mobile applications for iOS and Android platforms.',
        features: ['iOS & Android Apps', 'Cross-Platform Solutions', 'UI/UX Design', 'App Maintenance'],
    },
    {
        id: 'cloud-solutions',
        icon: '☁️',
        title: 'Cloud Solutions',
        description: 'Leverage the power of cloud computing with our comprehensive cloud architecture and migration services.',
        features: ['Cloud Architecture', 'AWS/Azure/GCP', 'DevOps & CI/CD', 'Cloud Migration'],
    },
    {
        id: 'ai-ml',
        icon: '🤖',
        title: 'AI & Machine Learning',
        description: 'Transform your business with intelligent automation and data-driven decision making.',
        features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
    },
    {
        id: 'web-development',
        icon: '🌐',
        title: 'Web Development',
        description: 'Design and develop modern, responsive web applications that drive engagement and conversions.',
        features: ['React/Angular/Vue', 'Progressive Web Apps', 'E-Commerce Solutions', 'CMS Development'],
    },
    {
        id: 'consulting',
        icon: '💡',
        title: 'IT Consulting',
        description: 'Strategic technology consulting to help you navigate digital transformation with confidence.',
        features: ['Digital Strategy', 'Technology Roadmap', 'Process Optimization', 'Technical Audit'],
    },
];

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'FinTech Dashboard',
        description: 'A comprehensive financial analytics platform with real-time data visualization and AI-powered insights.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        category: 'Web Application',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
    {
        id: 'project-2',
        title: 'Healthcare Mobile App',
        description: 'Patient management system with telemedicine capabilities and secure health records.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
        category: 'Mobile App',
        technologies: ['React Native', 'Firebase', 'Node.js'],
    },
    {
        id: 'project-3',
        title: 'E-Commerce Platform',
        description: 'Scalable multi-vendor marketplace with AI-powered recommendations and payment integration.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        category: 'E-Commerce',
        technologies: ['Next.js', 'Stripe', 'AWS', 'MongoDB'],
    },
    {
        id: 'project-4',
        title: 'IoT Management System',
        description: 'Industrial IoT platform for monitoring and managing connected devices at scale.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        category: 'IoT',
        technologies: ['Python', 'MQTT', 'Docker', 'Kubernetes'],
    },
    {
        id: 'project-5',
        title: 'AI Chatbot Platform',
        description: 'Enterprise conversational AI solution with multi-language support and CRM integration.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        category: 'AI/ML',
        technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    },
    {
        id: 'project-6',
        title: 'Real Estate Platform',
        description: 'Property listing and management platform with virtual tours and smart matching.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        category: 'Web Application',
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebGL'],
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
    email: 'hello@softlaneit.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech City, TC 12345',
    social: {
        linkedin: 'https://linkedin.com/company/softlaneit',
        twitter: 'https://twitter.com/softlaneit',
        github: 'https://github.com/softlaneit',
        facebook: 'https://facebook.com/softlaneit',
    },
};
