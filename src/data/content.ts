/*
 * Copyright (c) 2026, SoftlaneIT (https://softlaneit.com/) All Rights Reserved.
 *
 * SoftlaneIT licenses this file to you under the Apache License,
 * Version 2.0 (the "LICENSE"); you may not use this file except
 * in compliance with the LICENSE.
 *
 * This file is a barrel re-export for backwards compatibility.
 * Data is now organized by domain — see individual files in /data/:
 *   - navigation.ts  → navLinks
 *   - company.ts     → companyInfo, stats
 *   - services.ts    → services
 *   - portfolio.ts   → projects, testimonials
 *   - team.ts        → teamMembers, companyPerks
 *   - careers.ts     → jobOpenings
 */

export { navLinks } from './navigation';
export { companyInfo, stats } from './company';
export { services } from './services';
export { projects, testimonials } from './portfolio';
export { teamMembers, companyPerks } from './team';
export { jobOpenings } from './careers';
export { blogPosts } from './blogs';
