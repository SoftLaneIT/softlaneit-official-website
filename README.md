# SoftlaneIT Official Website

<div align="center">

![SoftlaneIT](https://img.shields.io/badge/SoftlaneIT-Official%20Website-ff6500?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)

**A modern, responsive corporate website for SoftlaneIT - Innovating the Future of Digital Solutions**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

### 🎨 Modern UI/UX
- **Custom Cursor & Torch Effect** - Interactive cursor with ambient glow that follows mouse movement in hero section
- **Smooth Animations** - CSS animations and transitions throughout the site
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Dark Theme** - Elegant dark color scheme with orange accent colors

### 📄 Pages
- **Home** - Landing page with hero, services, portfolio, testimonials, and contact sections
- **Blog** - Company blog with articles and insights
- **Careers** - Job listings and company culture showcase
- **Contact** - Dedicated contact page with form

### 🧩 Components
- **Navbar** - Fixed navigation with smooth scroll and active state indicators
- **Hero** - Eye-catching hero section with interactive torch light effect
- **Services** - Showcase of company services with Lucide icons
- **Portfolio** - Project showcase gallery
- **Testimonials** - Client testimonials slider
- **About** - Company information and stats
- **Footer** - Comprehensive footer with links and social media

### 🎯 Interactive Features
- Scroll-to-section navigation
- Parallax scrolling effects
- Counter animations for statistics
- Form validation
- Mobile-responsive hamburger menu

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Framework |
| **TypeScript** | 5.8 | Type Safety |
| **Vite** | 7.3 | Build Tool & Dev Server |
| **React Router DOM** | 7.x | Client-side Routing |
| **Lucide React** | Latest | Modern Icons |
| **CSS3** | - | Styling & Animations |

---

## 📁 Project Structure

```
softlaneit-official-website/
├── public/                  # Static assets
├── src/
│   ├── assets/
│   │   └── images/          # Logo and image files
│   ├── components/
│   │   ├── common/          # Reusable components (Button, Logo)
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── sections/        # Page sections (Hero, Services, etc.)
│   ├── data/
│   │   └── content.ts       # Site content and data
│   ├── hooks/               # Custom React hooks
│   │   ├── useCounter.ts
│   │   ├── useParallax.ts
│   │   └── useScrollAnimation.ts
│   ├── pages/               # Route pages
│   │   ├── BlogPage.tsx
│   │   ├── CareersPage.tsx
│   │   └── ContactPage.tsx
│   ├── styles/
│   │   ├── animations.css   # Keyframe animations
│   │   └── variables.css    # CSS custom properties
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main App component
│   ├── App.css              # App styles
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/PramithaMJ/softlaneit-official-website.git
   cd softlaneit-official-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/variables.css`:

```css
:root {
  --primary-orange: #ff6500;
  --gray-900: #0a0a0a;
  /* ... more variables */
}
```

### Content
Update site content in `src/data/content.ts`:

```typescript
export const companyInfo = {
  name: 'SoftlaneIT',
  tagline: 'Innovating the Future',
  // ... more content
};
```

---

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` folder, ready for deployment to:
- Vercel
- Netlify
- AWS S3
- GitHub Pages
- Any static hosting service

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software owned by **SoftlaneIT**.

---

## 📞 Contact

**SoftlaneIT**
- Website: [softlaneit.com](https://softlaneit.com)
- Email: info@softlaneit.com
- LinkedIn: [SoftlaneIT](https://linkedin.com/company/softlaneit)

---

<div align="center">

**Built with ❤️ by SoftlaneIT Team**

© 2026 SoftlaneIT. All rights reserved.

</div>
