import { getFeedbacks } from '../api/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export async function FeedbackList() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="space-y-4">
      <h3 className="px-1 text-xl font-semibold">Recent Feedback</h3>
      {feedbacks.length === 0 ? (
        <p className="text-muted-foreground px-1">No feedback yet. Be the first!</p>
      ) : (
        feedbacks.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium">{item.name}</CardTitle>
              <p className="text-muted-foreground text-xs">{item.createdAt.toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-foreground/80 text-sm">{item.message}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
