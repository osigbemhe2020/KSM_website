"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowLeft} from "lucide-react";
import {  Button, Card, CardHeader } from "@/components/membersScreens/memberComponents/DetailsCards";
import { PasswordInput } from "@/components/membersScreens/memberComponents/PasswordInput";
import { toast } from "react-toastify";
import { useResetPassword } from "@/hooks/auth.hook";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const { mutate, isPending } = useResetPassword();

  useEffect(() => {
    if (!token) {
      toast.error('Reset token is missing');
      router.push('/forgot-password');
    }
  }, [token, router]);

  const validateForm = () => {
    if (!password) {
      toast.error('Password is required');
      return false;
    }
    if (!confirmPassword) {
      toast.error('Please confirm your password');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error('Reset token is missing');
      return;
    }

    if (!validateForm()) {
      return;
    }

    mutate({ token, newPassword: password }, {
      onSuccess: (data) => {
        toast.success(data.message || 'Password reset successfully!');
        router.push('/sign-in');
      },
      onError: (error: { message?: string }) => {
        const message = error?.message || 'Failed to reset password';
        toast.error(message);
        if (message.includes('invalid') || message.includes('expired')) {
          setTokenValid(false);
        }
      }
    });
  };

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <Card variant="normal">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-red-600" />
              </div>
              <h2 className="font-serif text-5xl text-foreground mb-6">Invalid or Expired Token</h2>
              <p className="text-sm text-gray-600 mb-6">
                The password reset token is invalid or has expired. Please request a new one.
              </p>
              <Button
                onClick={() => router.push('/member-page/forgot-password')}
                className="w-full"
              >
                Request New Token
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Card variant="normal">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <CardHeader
            title="Reset Password"
            icon={<Lock size={20} />}
          />

          <p className="text-sm text-gray-600 mb-6">
            Enter your new password below. Make sure it&apos;s strong and secure.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PasswordInput
              label="New Password"
              value={password}
              onChange={(value) => {
                if (typeof value === 'string') {
                  setPassword(value);
                } else {
                  setPassword(value.target.value);
                }
              }}
              placeholder="Enter new password"
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(value) => {
                if (typeof value === 'string') {
                  setConfirmPassword(value);
                } else {
                  setConfirmPassword(value.target.value);
                }
              }}
              placeholder="Confirm new password"
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <button
                onClick={() => router.push('/sign-in')}
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;