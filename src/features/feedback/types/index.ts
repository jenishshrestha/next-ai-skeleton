export interface Feedback {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

export interface CreateFeedbackInput {
  name: string;
  message: string;
}
