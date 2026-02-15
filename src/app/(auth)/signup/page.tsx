import type { Metadata } from 'next';
import { SignupForm } from '@/features/auth/components/signup-form';

export const metadata: Metadata = {
  title: 'Sign Up | Next AI Skeleton',
  description: 'Create an account to get started with the Next AI Skeleton.',
};

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[350px] space-y-6">
        <SignupForm />
      </div>
    </div>
  );
}
