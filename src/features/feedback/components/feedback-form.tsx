'use client';

import { useActionState } from 'react';
import { createFeedback } from '../api/actions';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';

type ActionState = {
  success: boolean;
  error?: string;
};

export function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionState, formData: FormData): Promise<ActionState> => {
      const name = formData.get('name') as string;
      const message = formData.get('message') as string;

      if (!name || !message) {
        return { success: false, error: 'Both fields are required.' };
      }

      await createFeedback({ name, message });
      return { success: true };
    },
    { success: false },
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Share your thoughts</CardTitle>
        <CardDescription>Help us improve the skeleton with your feedback.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="What do you think?"
              required
              disabled={isPending}
            />
          </div>
          {state?.error && <p className="text-destructive text-sm">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Sending...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
