---
title: emore (emo.lk)
category: E-Commerce
image: /assets/projects/emore.webp
description: A production-grade e-commerce platform for the Sri Lankan market, built on a Next.js + NestJS monorepo with secure auth, local payments, an AI chatbot, and a hardened DevSecOps pipeline.
technologies: ['Next.js 15', 'React 19', 'NestJS 11', 'PostgreSQL 16', 'Prisma', 'Redis 7 + Bull', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'PayHere', 'Google Gemini', 'Docker', 'Nginx']
featured: true
order: 1
link: 'https://emo.lk/'
id: emore
---

emore is the official e-commerce platform behind **emo.lk**, engineered for the Sri Lankan market with a focus on performance, security, and a polished shopping experience. It is structured as a pnpm + Turborepo monorepo with a Next.js storefront and a NestJS API, deployed via hardened multi-stage Docker images.

### Key Highlights
- **Modern Storefront**: Next.js 15 (App Router) with React 19, Tailwind CSS, Framer Motion animations, Zustand state, and TanStack Query for fast, app-like browsing.
- **Robust API**: NestJS 11 on Node 22 with Prisma ORM over PostgreSQL 16, backed by Redis 7 and Bull queues for background jobs and caching.
- **Secure Authentication**: JWT in HttpOnly cookies, Google OAuth sign-in, and TOTP-based two-factor authentication.
- **Local Payments**: PayHere integration tailored for Sri Lankan (LK) transactions.
- **AI Chatbot**: Conversational shopping assistant powered by Google Gemini.
- **Bot Protection**: Cloudflare Turnstile guards forms and sensitive flows.

### Architecture & Tech Stack
- **Monorepo**: pnpm 9 workspaces + Turborepo 2
- **Frontend**: Next.js 15 (App Router, React 19), Tailwind CSS, Zustand, TanStack Query, Framer Motion
- **Backend**: NestJS 11 (Node 22), Prisma ORM
- **Database**: PostgreSQL 16
- **Cache / Queue**: Redis 7 + Bull
- **Auth**: JWT (HttpOnly cookies), Google OAuth, TOTP 2FA
- **Payments**: PayHere (LK)
- **AI**: Google Gemini (chatbot)
- **Bot Protection**: Cloudflare Turnstile
- **Infrastructure**: Docker (multi-stage, Alpine, non-root), Docker Compose, Nginx

### DevSecOps
- **CI / CD**: GitHub Actions pipelines for build, test, and deploy.
- **Security Scanning**: Trivy (containers & dependencies), Semgrep (SAST), CodeQL (code scanning), and `pnpm audit` for supply-chain checks.
