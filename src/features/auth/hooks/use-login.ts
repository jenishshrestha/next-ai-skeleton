import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { authClient } from '@/shared/lib/auth-client';
import { loginSchema, type LoginFormValues } from '../types/auth-schemas';

/**
 * Custom hook for managing the Login Form logic and state.
 * Encapsulates form handling, auth provider interaction, and side effects.
 */
export function useLogin() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        headers: captchaToken ? { 'x-captcha-response': captchaToken } : {},
        onSuccess: () => {
          setIsRedirecting(true);
          router.push('/dashboard');
        },
      },
    });

    if (error) {
      toast.error(error.message || 'Something went wrong during login');
      return;
    }
  };

  const signInWithGithub = async () => {
    setIsGithubLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      setIsGithubLoading(false);
      console.error('GitHub login failed:', error);
      toast.error('Failed to log in with GitHub');
    }
  };

  const lastMethod = authClient.getLastUsedLoginMethod();

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    signInWithGithub,
    lastMethod,
    setCaptchaToken,
    isLoading: form.formState.isSubmitting || isRedirecting,
    isGithubLoading,
    isRedirecting,
  };
}
