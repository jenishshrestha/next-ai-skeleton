import Image from 'next/image';
import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="grid h-full lg:grid-cols-2">
      {/* Left: Form Panel */}
      <div className="flex flex-col px-4 py-10 lg:px-8">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[350px] space-y-6">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>

      {/* Right: Image Panel */}
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/login-side.webp"
          alt="Decorative background"
          fill
          className="object-cover dark:brightness-[0.8] dark:grayscale-20"
          priority
        />
      </div>
    </div>
  );
}
