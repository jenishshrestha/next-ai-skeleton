import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[350px] space-y-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
