"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import { Input, Button, Card, CardHeader } from "@/components/membersScreens/memberComponents/DetailsCards";
import { toast } from "react-toastify";
import { useForgotPassword } from "@/hooks/auth.hook";


const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    mutate({ email }, {
      onSuccess: (data) => {
        toast.success(data.message || "If that email exists, a reset link has been sent");
        router.push("/sign-in");
      },
      onError: (error: { message?: string }) => { 
        const message = error?.message || "Failed to send reset instructions";
        toast.error(message);
      }
    });
  };

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
            title="Forgot Password" 
            icon={<Mail size={20} />}
          />
          
          <p className="text-sm text-gray-600 mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    setEmail(value);
                  } else {
                    setEmail(value.target.value);
                  }
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-[90%]"
            >
              {isPending ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <button
                onClick={() => router.push('/member-page/sign-in')}
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

export default ForgotPasswordPage;
