'use server';

import path from 'path';
import fs from 'fs';
import { parseMarkdownFile, MarkdownDoc } from '../lib/markdown';

const CONTENT_DIR = path.join(process.cwd(), 'src/features/docs/content');

export async function getDocBySlug(slug: string): Promise<MarkdownDoc | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMarkdownFile(filePath);
}

export async function getAllDocs(): Promise<MarkdownDoc[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => parseMarkdownFile(path.join(CONTENT_DIR, file)));
}
