import { describe, expect, it, mock } from 'bun:test';
import { parseMarkdownFile } from './markdown';

// Mock fs to avoid hitting real disk
mock.module('fs', () => ({
  default: {
    readFileSync: mock((path: string) => {
      if (path.includes('test.md')) {
        return `---
title: Test Title
description: Test Description
date: 2026-02-12
author: Test Author
---
# Main Content`;
      }
      if (path.includes('missing.md')) {
        return '# Just Content';
      }
      return '';
    }),
  },
}));

describe('Markdown CMS Logic', () => {
  it('correctly parses frontmatter and content', () => {
    const result = parseMarkdownFile('/fake/path/test.md');

    expect(result.title).toBe('Test Title');
    expect(result.description).toBe('Test Description');
    expect(result.author).toBe('Test Author');
    expect(result.content.trim()).toBe('# Main Content');
    expect(result.slug).toBe('test');
  });

  it('provides default values for missing frontmatter', () => {
    const result = parseMarkdownFile('/fake/path/missing.md');

    expect(result.title).toBe('Untitled');
    expect(result.author).toBe('AI Agent');
    expect(result.slug).toBe('missing');
  });
});
