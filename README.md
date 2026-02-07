
# SoftlaneIT Official Website

A modern, high-performance website for SoftlaneIT.

## Managing Content

The website's content (Blogs, Services, Projects, Careers, Testimonials) is stored in the `src/content` directory as Markdown (`.md`) files.

### 1. Adding a Blog Post
1.  Go to `src/content/blog/`.
2.  Create a new file, e.g., `my-new-post.md`.
3.  Add the frontmatter at the top:
    ```markdown
    ---
    title: The Future of AI
    excerpt: A brief summary for the card view.
    date: 2024-03-20
    author: Jane Doe
    image: https://images.unsplash.com/...
    category: Technology
    slug: the-future-of-ai
    readTime: 5 min read
    ---
    
    Your blog post content goes here...
    ```

### 2. Adding a Project case study
1.  Go to `src/content/projects/`.
2.  Create a new `.md` file.
3.  Frontmatter:
    ```markdown
    ---
    title: E-Commerce Platform
    description: A scalable solution for retail.
    image: https://images.unsplash.com/...
    category: Web Development
    slug: ecommerce-platform
    client: Retail Corp
    duration: 3 months
    technologies: [React, Node.js, AWS]
    ---
    
    Project details...
    ```

### 3. Adding a Service
1.  Go to `src/content/services/`.
2.  Create a new `.md` file.
3.  Frontmatter:
    ```markdown
    ---
    id: cloud-computing
    icon: Cloud  # Matches Lucide icon name
    title: Cloud Solutions
    description: We help you migrate to the cloud.
    features:
      - Scalability
      - Security
      - Cost Efficiency
    slug: cloud-solutions
    ---
    
    Detailed description...
    ```

### 4. Adding a Career Opening
1.  Go to `src/content/careers/`.
2.  Create a new `.md` file.
3.  Frontmatter:
    ```markdown
    ---
    title: Senior Frontend Engineer
    department: Engineering
    location: Remote
    type: Full-time
    slug: senior-frontend-engineer
    ---
    
    Job description...
    ```

### 5. Adding a Testimonial
1.  Go to `src/content/testimonials/`.
2.  Create a new `.md` file.
3.  Frontmatter:
    ```markdown
    ---
    id: 1
    name: John Smith
    role: CEO
    company: Tech Corp
    avatar: https://images.unsplash.com/...
    rating: 5
    ---
    
    "SoftlaneIT is amazing!"
    ```

## Deployment

The project is configured for GitHub Pages.

1.  **Build the project**:
    ```bash
    npm run build
    ```

2.  **Deploy**:
    Commit and push your changes to the `main` branch. The GitHub Action (if configured) or manual deployment will handle the rest.

    To deploy manually to `gh-pages`:
    ```bash
    npm run deploy
    ```
    *(Make sure `homepage` in `package.json` and `base` in `vite.config.ts` are set correctly)*
