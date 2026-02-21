import Link from 'next/link';
import { Doc } from '../types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { format } from 'date-fns';

interface ArticleCardProps {
  doc: Doc;
}

export function ArticleCard({ doc }: ArticleCardProps) {
  return (
    <Link href={`/docs/${doc.slug}`}>
      <Card className="hover:border-primary/50 h-full transition-colors">
        <CardHeader>
          <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
            {doc.metadata.category && (
              <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">
                {doc.metadata.category}
              </span>
            )}
            <span>{format(new Date(doc.metadata.publishedAt), 'MMM dd, yyyy')}</span>
          </div>
          <CardTitle className="line-clamp-2">{doc.metadata.title}</CardTitle>
          <CardDescription className="line-clamp-3">{doc.metadata.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
