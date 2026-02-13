import { FeedbackForm } from './feedback-form';
import { FeedbackList } from './feedback-list';
import { Suspense } from 'react';

export function FeedbackBoard() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 p-4 md:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Feedback Board</h2>
          <p className="text-muted-foreground text-lg">
            This demo demonstrates **Feature-Driven Design**, **Server Actions**, and **Server
            Components**.
          </p>
        </div>
        <FeedbackForm />
      </div>

      <div className="space-y-4">
        <Suspense fallback={<FeedbackSkeleton />}>
          <FeedbackList />
        </Suspense>
      </div>
    </div>
  );
}

function FeedbackSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-muted mb-4 h-6 w-32 rounded" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-muted h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}
