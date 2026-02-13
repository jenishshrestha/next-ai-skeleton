'use server';

import { revalidatePath } from 'next/cache';
import { CreateFeedbackInput, Feedback } from '../types';

// In-memory store for demonstration (resets on server restart)
const feedbackStore: Feedback[] = [
  {
    id: '1',
    name: 'Alice',
    message: 'Love the AI-ready skeleton! Very clean.',
    createdAt: new Date(),
  },
];

export async function getFeedbacks(): Promise<Feedback[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...feedbackStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function createFeedback(input: CreateFeedbackInput) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newFeedback: Feedback = {
    id: Math.random().toString(36).substring(7),
    name: input.name,
    message: input.message,
    createdAt: new Date(),
  };

  feedbackStore.push(newFeedback);

  revalidatePath('/');
  return { success: true };
}
