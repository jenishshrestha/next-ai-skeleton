import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { authClient } from '@/shared/lib/auth-client';
import { ReactNode } from 'react';

interface SocialLoginButtonProps {
  provider: 'github' | 'google';
  isLoading: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}

/**
 * A reusable social login button component.
 * Encapsulates the "Last used" logic and consistent loading styles.
 */
export function SocialLoginButton({
  provider,
  isLoading,
  disabled,
  onClick,
  icon,
  children,
}: SocialLoginButtonProps) {
  const isLastUsed = authClient.getLastUsedLoginMethod() === provider;

  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Logging in...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon}
          {children}
          {isLastUsed && (
            <Badge
              variant="secondary"
              className="h-4 px-1.5 text-[9px] font-bold tracking-wider uppercase"
            >
              Last used
            </Badge>
          )}
        </span>
      )}
    </Button>
  );
}
