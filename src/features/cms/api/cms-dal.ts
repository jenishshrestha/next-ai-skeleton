import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Doc, DocMetadata } from '../types';

const CONTENT_PATH = path.join(process.cwd(), 'src/features/cms/content');

export const CMSDAL = {
  /**
   * Get all doc slugs
   */
  async getAllSlugs() {
    if (!fs.existsSync(CONTENT_PATH)) return [];
    const files = fs.readdirSync(CONTENT_PATH);
    return files.filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
  },

  /**
   * Get a single doc by slug
   */
  async getDocBySlug(slug: string): Promise<Doc | null> {
    try {
      const fullPath = path.join(CONTENT_PATH, `${slug}.md`);
      if (!fs.existsSync(fullPath)) return null;

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data as DocMetadata,
        content,
      };
    } catch (error) {
      console.error(`Error reading doc ${slug}:`, error);
      return null;
    }
  },

  /**
   * Get all docs
   */
  async getAllDocs(): Promise<Doc[]> {
    const slugs = await this.getAllSlugs();
    const docs = await Promise.all(
      slugs.map(async (slug) => {
        const doc = await this.getDocBySlug(slug);
        return doc;
      }),
    );

    return docs
      .filter((doc): doc is Doc => doc !== null)
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
      );
  },
};
