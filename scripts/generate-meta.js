import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDirs = [
    { source: '../src/content/blog', dest: 'blog', urlPrefix: 'blog' },
    { source: '../src/content/projects', dest: 'projects', urlPrefix: 'projects' }
];

const distPath = path.resolve(__dirname, '../dist');
const distIndexFile = path.resolve(distPath, 'index.html');

console.log('Generating dynamic meta tags for content...');

// Make sure build has already completed
if (!fs.existsSync(distIndexFile)) {
    console.error(`dist/index.html not found. Make sure to run 'vite build' first.`);
    process.exit(1);
}

const htmlTemplate = fs.readFileSync(distIndexFile, 'utf8');

contentDirs.forEach(({ source, dest, urlPrefix }) => {
    const dir = path.resolve(__dirname, source);
    if (!fs.existsSync(dir)) return;

    try {
        const files = fs.readdirSync(dir);
        const mdFiles = files.filter(f => f.endsWith('.md'));

        mdFiles.forEach(file => {
            const filePath = path.join(dir, file);
            const content = fs.readFileSync(filePath, 'utf8');

            // Parse frontmatter
            const parsed = fm(content);
            const attrs = parsed.attributes;

            const title = attrs.title ? `${attrs.title} | SoftlaneIT` : 'SoftlaneIT - Innovating the Future of Technology';
            const description = attrs.description || attrs.excerpt || 'Read more from SoftlaneIT.';
            const image = attrs.image || '/logo-icon-black.png';
            const slug = file.replace('.md', '');
            const permalink = `https://softlaneit.com/${urlPrefix}/${slug}`;

            console.log(`Processing ${urlPrefix}: ${slug}`);

            // Replace meta tags
            let changedHtml = htmlTemplate
                .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
                .replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/gi, `<meta name="description" content="${description}" />`)
                .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/gi, `<meta property="og:title" content="${title}" />`)
                .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/gi, `<meta property="og:description" content="${description}" />`)
                .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/gi, `<meta property="og:url" content="${permalink}" />`)
                // If og:url isn't present, we can just insert it before og:type
                .replace(/<meta\s+property="og:type"\s+content="website"\s*\/>/gi, `<meta property="og:url" content="${permalink}" />\n  <meta property="og:type" content="article" />`)
                .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/>/gi, `<meta property="og:image" content="${image}" />`)
                .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/gi, `<meta name="twitter:title" content="${title}" />`) // Just in case it's there
                .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/gi, `<meta name="twitter:description" content="${description}" />`)
                .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/>/gi, `<meta name="twitter:image" content="${image}" />`);

            // Ensure twitter components if not replaced
            if (!changedHtml.includes('<meta name="twitter:title"')) {
                changedHtml = changedHtml.replace(/<meta\s+name="twitter:card".*?\/>/gi,
                    `<meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${title}" />\n  <meta name="twitter:description" content="${description}" />`
                );
            }

            // Create dest folder
            const destDir = path.resolve(distPath, dest, slug);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            // Write index.html for this route
            fs.writeFileSync(path.join(destDir, 'index.html'), changedHtml);
        });

        console.log(`Successfully generated meta pages for ${mdFiles.length} ${dest} items.`);
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
    }
});
