export interface DocMetadata {
  title: string;
  description: string;
  publishedAt: string;
  category?: string;
  author?: {
    name: string;
    image?: string;
  };
}

export interface Doc {
  slug: string;
  metadata: DocMetadata;
  content: string;
}
