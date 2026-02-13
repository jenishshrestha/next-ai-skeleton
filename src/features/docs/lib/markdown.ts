import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export interface MarkdownDoc {
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  slug: string;
}

export function parseMarkdownFile(filePath: string): MarkdownDoc {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'AI Agent',
    content: content,
    slug: path.basename(filePath, '.md'),
  };
}
