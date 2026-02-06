
import frontMatter from 'front-matter';

export interface MarkdownContent<T = Record<string, any>> {
  attributes: T;
  body: string;
  slug: string;
}

export async function loadMarkdownFiles<T>(glob: Record<string, () => Promise<unknown>>): Promise<MarkdownContent<T>[]> {
  const contents: MarkdownContent<T>[] = [];

  for (const path in glob) {
    const module = await glob[path]() as string;
    // Vite raw import returns the file content as default export string
    /* @ts-ignore */
    const raw = module.default ? module.default : module;
    
    // Parse frontmatter
    const { attributes, body } = frontMatter<T>(raw);
    
    // Extract slug from filename
    // e.g., /src/content/blog/my-post.md -> my-post
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';

    contents.push({
      attributes,
      body,
      slug
    });
  }

  return contents;
}

export async function getMarkdownFile<T>(glob: Record<string, () => Promise<unknown>>, slug: string): Promise<MarkdownContent<T> | null> {
  // Find key that ends with `${slug}.md`
  const path = Object.keys(glob).find(k => k.endsWith(`${slug}.md`));
  
  if (!path) return null;

  const module = await glob[path]() as string;
  /* @ts-ignore */
  const raw = module.default ? module.default : module;
  const { attributes, body } = frontMatter<T>(raw);

  return {
    attributes,
    body,
    slug
  };
}
